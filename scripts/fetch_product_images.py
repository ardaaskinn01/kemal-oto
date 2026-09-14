# -*- coding: utf-8 -*-
"""
Kemal Oto - Otomotiv Yedek Parça Görsel İndirme & Optimizasyon Aracı
STOK LİSTE.xlsx dosyasındaki OEM ve üretici parça kodlarını tarar,
güvenilir kaynaklardan telifsiz/filigransız stüdyo görsellerini çeker,
WebP olarak 800x800 kare formatında optimize edip kaydeder ve
kullanıcı doğrulaması için görsel bir HTML raporu oluşturur.

Kullanım:
    python scripts/fetch_product_images.py --limit 50
    python scripts/fetch_product_images.py --limit 100 --start 0
"""

import os
import sys
import re
import time
import json
import argparse
import urllib.parse
import urllib.request
from io import BytesIO
from PIL import Image

# Windows konsolunda UTF-8 cikti destegi
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

try:
    import openpyxl
except ImportError:
    print("HATA: 'openpyxl' modulu yuklu degil. Lutfen 'pip install openpyxl' calistirin.")
    sys.exit(1)


# Telifli / filigranlı veya alakasız sitelerin kara listesi
BLACKLIST_DOMAINS = [
    'sahibinden.com', 'letgo.com', 'shutterstock.com', 'alamy.com',
    'gettyimages.com', 'istockphoto.com', 'dreamstime.com', '123rf.com',
    'freepik.com', 'pinterest.com', 'facebook.com', 'instagram.com',
    'youtube.com', 'tiktok.com', 'reddit.com', 'twitter.com', 'x.com',
    'watermark', 'stock-photo', 'clipart'
]

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'public', 'images', 'products')
REPORT_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'image_verification_report.html')


def extract_clean_oem(raw_code: str, brand: str = "") -> str:
    """
    Excel'deki Stok Kodu formatindan temiz OEM kodunu cikarir.
    Ornekler:
      '="0024.84SARDES"'    -> '002484'
      '="0111.ATKONEKS-SET"'-> '0111AT'
      '="0113.92GLYCO"'     -> '011392'
      '="1611803480"'       -> '1611803480'
      '="0118.G4"'          -> '0118G4'
    """
    code = raw_code.replace('=', '').replace('"', '').replace("'", '').strip()
    
    # Bilinen marka soneklerini kaldir
    brands_to_strip = [
        'SARDES', 'GLYCO', 'KONEKS', 'KING', 'KOLBEN', 'KOLBENSCHMIDT',
        'OTOCONTA', 'OTO CONTA', 'CORTECO', 'VICTOR REINZ', 'REINZ',
        'DAYCO', 'GATES', 'BOSCH', 'VALEO', 'DELPHI', 'FEBI', 'SWAG',
        'MAHLE', 'HENGST', 'MANN', 'LUK', 'SACHS', 'SNR', 'SKF',
        'PEUGEOT', 'CITROEN', 'OPEL', 'CHEVROLET'
    ]
    if brand:
        brands_to_strip.insert(0, brand.strip().upper())

    for b in brands_to_strip:
        b_clean = re.sub(r'[^A-Za-z0-9]', '', b).upper()
        if b_clean and code.upper().endswith(b_clean):
            code = code[:-len(b_clean)].rstrip('-._ ')
            break

    # Diger bilinen ekleri temizle
    code = re.sub(r'(-SET|-TAKIM|-STD|-TK)$', '', code, flags=re.IGNORECASE)
    
    # Noktalari ve tireleri temizle
    clean = re.sub(r'[^A-Za-z0-9]', '', code).upper()
    return clean if clean else re.sub(r'[^A-Za-z0-9]', '', raw_code).upper()


def search_images(query: str, max_candidates: int = 10) -> list:
    """
    Arama motoru uzerinden gorsel URL'lerini ceker ve kara listedekileri eler.
    """
    url = "https://yandex.com/images/search?text=" + urllib.parse.quote(query)
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    })
    
    try:
        html = urllib.request.urlopen(req, timeout=12).read().decode('utf-8')
        # &quot;img_href&quot;:&quot;https://...&quot;
        raw_urls = re.findall(r'&quot;img_href&quot;:&quot;([^&]+)&quot;', html)
        if not raw_urls:
            raw_urls = re.findall(r'"url":"(https?://[^"]+\.(?:jpg|jpeg|png|webp))"', html)

        candidates = []
        for u in raw_urls:
            u_clean = u.replace('\\/', '/')
            u_lower = u_clean.lower()
            
            # Kara liste filtresi (filigran/telif siteleri)
            if any(bad in u_lower for bad in BLACKLIST_DOMAINS):
                continue
            
            # Gecerli gorsel uzantisi
            if any(ext in u_lower for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                candidates.append(u_clean)
                if len(candidates) >= max_candidates:
                    break
        return candidates
    except Exception:
        return []


def download_and_optimize(image_url: str, output_path: str) -> bool:
    """
    Gorseli indirir, boyutunu kontrol eder, kare canvas'a (800x800) yerlestirir ve WebP olarak kaydeder.
    """
    req = urllib.request.Request(image_url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
    })
    
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            content_type = resp.headers.get('Content-Type', '')
            if 'image' not in content_type and not any(ext in image_url.lower() for ext in ['.jpg', '.png', '.webp', '.jpeg']):
                return False
            img_data = resp.read()

        img = Image.open(BytesIO(img_data))
        
        # Cok kucuk / piksel piksel ikonlari (thumbnail) kabul etme
        if img.width < 250 or img.height < 250:
            return False

        # RGBA / Palette modunu RGB'ye cevir (beyaz arka planla)
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1])
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')

        # 800x800 kare canvas olustur ve ortala (E-ticaret katalog standardi)
        target_size = (800, 800)
        img.thumbnail(target_size, Image.Resampling.LANCZOS)
        
        canvas = Image.new('RGB', target_size, (255, 255, 255))
        offset = ((target_size[0] - img.width) // 2, (target_size[1] - img.height) // 2)
        canvas.paste(img, offset)

        # WebP olarak kaydet
        canvas.save(output_path, 'WEBP', quality=85, method=6)
        return True

    except Exception:
        return False


def generate_html_report(results: list, output_html_path: str):
    """
    Kullanicinin indirilen tum gorselleri tarayicida yan yana dogrulayabilmesi icin HTML raporu olusturur.
    """
    total = len(results)
    success_count = sum(1 for r in results if r['status'] == 'SUCCESS')
    missing_count = total - success_count
    success_rate = round((success_count / total) * 100, 1) if total > 0 else 0

    rows_html = ""
    for r in results:
        status_badge = (
            '<span style="background:#10b981;color:white;padding:3px 8px;border-radius:6px;font-weight:bold;font-size:11px;">BAŞARILI</span>'
            if r['status'] == 'SUCCESS' else
            '<span style="background:#ef4444;color:white;padding:3px 8px;border-radius:6px;font-weight:bold;font-size:11px;">BULUNAMADI</span>'
        )

        img_tag = (
            f'<a href="{r["img_rel_path"]}" target="_blank">'
            f'<img src="{r["img_rel_path"]}" style="width:120px;height:120px;object-fit:contain;border:1px solid #e2e8f0;border-radius:8px;background:white;" />'
            f'</a>'
            if r['status'] == 'SUCCESS' else
            '<div style="width:120px;height:120px;display:flex;align-items:center;justify-content:center;background:#f1f5f9;border:1px dashed #cbd5e1;border-radius:8px;color:#94a3b8;font-size:11px;text-align:center;">Görsel Yok<br>(Placeholder)</div>'
        )

        rows_html += f"""
        <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:10px;text-align:center;font-weight:bold;color:#64748b;">{r['row']}</td>
            <td style="padding:10px;text-align:center;">{img_tag}</td>
            <td style="padding:10px;font-family:monospace;font-weight:bold;color:#0f172a;">
                {r['oem_code']}
                <div style="font-size:10px;color:#64748b;font-family:sans-serif;">{r['raw_code']}</div>
            </td>
            <td style="padding:10px;font-weight:600;color:#1e293b;font-size:13px;">
                {r['title']}
                <div style="font-size:11px;color:#64748b;margin-top:2px;">Kategori: {r['group']}</div>
            </td>
            <td style="padding:10px;font-size:12px;">
                <strong>{r['brand']}</strong>
                <div style="color:#64748b;font-family:monospace;">{r['model']}</div>
            </td>
            <td style="padding:10px;text-align:center;">{status_badge}</td>
        </tr>
        """

    html = f"""<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>Kemal Oto - Görsel İndirme Doğrulama Raporu</title>
    <style>
        body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }}
        .container {{ max-width: 1100px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); overflow: hidden; }}
        .header {{ background: #0f172a; color: white; padding: 24px 32px; display: flex; justify-content: space-between; align-items: center; }}
        .stats {{ display: flex; gap: 24px; padding: 20px 32px; background: #f1f5f9; border-bottom: 1px solid #e2e8f0; }}
        .stat-box {{ background: white; padding: 12px 20px; border-radius: 10px; border: 1px solid #cbd5e1; }}
        .stat-value {{ font-size: 22px; font-weight: 800; color: #E8820C; }}
        .stat-label {{ font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: bold; }}
        table {{ width: 100%; border-collapse: collapse; text-align: left; }}
        th {{ background: #f8fafc; padding: 12px 10px; font-size: 11px; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; border-bottom: 2px solid #e2e8f0; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div>
                <h1 style="margin:0;font-size:20px;font-weight:800;">Kemal Oto • Parça Görsel Doğrulama Masası</h1>
                <p style="margin:4px 0 0 0;font-size:12px;color:#94a3b8;">Excel Stok Listesi Otomatik Görsel İndirme & Kalite Kontrol Raporu</p>
            </div>
            <div style="font-size:12px;background:#E8820C;padding:6px 14px;border-radius:8px;font-weight:bold;">
                Pilot Test: {total} Parça
            </div>
        </div>

        <div class="stats">
            <div class="stat-box">
                <div class="stat-value">{total}</div>
                <div class="stat-label">Toplam Taranan</div>
            </div>
            <div class="stat-box">
                <div class="stat-value" style="color:#10b981;">{success_count}</div>
                <div class="stat-label">Başarıyla İndirilen</div>
            </div>
            <div class="stat-box">
                <div class="stat-value" style="color:#ef4444;">{missing_count}</div>
                <div class="stat-label">Bulunamayan (Placeholder)</div>
            </div>
            <div class="stat-box">
                <div class="stat-value">%{success_rate}</div>
                <div class="stat-label">Başarı Oranı</div>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th style="width:40px;text-align:center;">#</th>
                    <th style="width:140px;text-align:center;">İndirilen Görsel</th>
                    <th style="width:160px;">OEM Kodu (Dosya Adı)</th>
                    <th>Ürün Adı & Grubu</th>
                    <th style="width:150px;">Marka / Üretici Kodu</th>
                    <th style="width:100px;text-align:center;">Durum</th>
                </tr>
            </thead>
            <tbody>
                {rows_html}
            </tbody>
        </table>
    </div>
</body>
</html>
"""
    with open(output_html_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"\n[OK] Dogrulama Raporu Basariyla Olusturuldu: {output_html_path}", flush=True)


def main():
    parser = argparse.ArgumentParser(description="Kemal Oto Urun Gorseli Indirme Araci")
    parser.add_argument('--limit', type=int, default=50, help="Islenecek urun sayisi (Varsayilan: 50)")
    parser.add_argument('--start', type=int, default=1, help="Baslangic satiri (Varsayilan: 1)")
    parser.add_argument('--excel', type=str, default='STOK LİSTE.xlsx', help="Excel dosya yolu")
    parser.add_argument('--concurrency', type=int, default=4, help="Eşzamanlı iş parçacığı sayısı (Varsayılan: 4)")
    args = parser.parse_args()

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    if not os.path.exists(args.excel):
        print(f"HATA: '{args.excel}' dosyasi bulunamadi!")
        sys.exit(1)

    print(f"[*] '{args.excel}' yukleniyor...", flush=True)
    wb = openpyxl.load_workbook(args.excel, read_only=True)
    sheet = wb.active

    items = []
    for i, row in enumerate(sheet.iter_rows(values_only=True)):
        if i == 0:
            continue
        if i < args.start:
            continue
        if len(items) >= args.limit:
            break

        raw_code = str(row[0] or '').strip()
        title = str(row[1] or '').strip()
        group = str(row[2] or '').strip()
        brand = str(row[8] or '').strip()
        model = str(row[9] or '').strip() if row[9] is not None else ''

        clean_oem = extract_clean_oem(raw_code, brand)

        items.append({
            'row': i,
            'raw_code': raw_code,
            'oem_code': clean_oem,
            'title': title,
            'group': group,
            'brand': brand,
            'model': model
        })

    print(f"\n[+] {len(items)} adet parca taranacak (Satir {args.start} - {args.start + len(items) - 1})", flush=True)
    print(f"[+] Hedef Klasor: {OUTPUT_DIR}", flush=True)
    print(f"[+] Eşzamanlı İndirme: {args.concurrency} iş parçacığı", flush=True)
    print("-" * 75, flush=True)

    def process_item(item):
        oem = item['oem_code']
        filename = f"{oem}.webp"
        filepath = os.path.join(OUTPUT_DIR, filename)
        rel_path = f"../public/images/products/{filename}"

        # Önceden indirilmiş mi kontrol et
        if os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
            return {
                **item,
                'status': 'SUCCESS',
                'filepath': filepath,
                'img_rel_path': rel_path,
                'note': 'ZATEN MEVCUT'
            }

        clean_title = re.sub(r'(STD|TEPE.*|BOY:.*|[0-9]+,[0-9]+mm)', '', item['title']).strip()
        
        queries = []
        if item['model'] and len(item['model']) >= 3:
            queries.append(f"{item['brand']} {item['model']} {clean_title}")
        queries.append(f"{oem} {item['brand']} {clean_title}")
        queries.append(f"{oem} peugeot citroen opel")

        success = False
        for q in queries:
            candidates = search_images(q, max_candidates=5)
            for c_url in candidates:
                if download_and_optimize(c_url, filepath):
                    success = True
                    break
            if success:
                break
            time.sleep(0.3)

        if success:
            file_size_kb = round(os.path.getsize(filepath) / 1024, 1)
            return {
                **item,
                'status': 'SUCCESS',
                'filepath': filepath,
                'img_rel_path': rel_path,
                'note': f"INDIRILDI ({file_size_kb} KB)"
            }
        else:
            return {
                **item,
                'status': 'NOT_FOUND',
                'filepath': None,
                'img_rel_path': None,
                'note': 'BULUNAMADI'
            }

    from concurrent.futures import ThreadPoolExecutor, as_completed
    results = []
    completed_count = 0
    total_items = len(items)

    with ThreadPoolExecutor(max_workers=args.concurrency) as executor:
        future_to_item = {executor.submit(process_item, item): item for item in items}
        for future in as_completed(future_to_item):
            res = future.result()
            results.append(res)
            completed_count += 1
            status_tag = f"[{res['status']}]" if res['status'] == 'SUCCESS' else "[NOT_FOUND]"
            sys.stdout.write(f"\r[{completed_count}/{total_items}] Satır {res['row']}: {res['oem_code']} {status_tag} {res['note'][:25]}")
            sys.stdout.flush()

    print("\n" + "-" * 75, flush=True)
    # Satır numarasına göre sırala
    results.sort(key=lambda x: x['row'])

    # HTML Doğrulama Raporu Oluştur
    generate_html_report(results, REPORT_FILE)


if __name__ == '__main__':
    main()
