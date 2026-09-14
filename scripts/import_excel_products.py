# -*- coding: utf-8 -*-
"""
Online Hızlı Parça - Excel Stok Listesi İçe Aktarma & Senkronizasyon Aracı
STOK LİSTE.xlsx dosyasındaki 8.700+ parçayı analiz eder, kategorize eder,
araç uyumluluklarını çıkarır ve JSON/SQL/Supabase formatlarında dışa aktarır.

Kullanım:
  python scripts/import_excel_products.py --dry-run
  python scripts/import_excel_products.py --export-sql supabase_seed_products.sql
  python scripts/import_excel_products.py --export-json products_dump.json
  python scripts/import_excel_products.py --upload
"""

import sys
import os
import re
import json
import argparse
import unicodedata
from collections import Counter

try:
    import openpyxl
except ImportError:
    print("HATA: 'openpyxl' modülü bulunamadı. Lütfen 'pip install openpyxl' çalıştırın.")
    sys.exit(1)


# Türkçe karakter temizleme ve URL slug üretimi
def slugify(text: str) -> str:
    text = text.replace('İ', 'i').replace('I', 'i').replace('ı', 'i')
    text = text.replace('ğ', 'g').replace('Ğ', 'g')
    text = text.replace('ü', 'u').replace('Ü', 'u')
    text = text.replace('ş', 's').replace('Ş', 's')
    text = text.replace('ö', 'o').replace('Ö', 'o')
    text = text.replace('ç', 'c').replace('Ç', 'c')
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
    text = re.sub(r'[^\w\s-]', '', text.lower()).strip()
    return re.sub(r'[-\s]+', '-', text)


# Kategori Eşleştirme Sözlüğü
CATEGORY_MAP = {
    'FİLTRE': ('İç Donanım & Periyodik Bakım', 'ic-donanim-bakim'),
    'POLEN': ('İç Donanım & Periyodik Bakım', 'ic-donanim-bakim'),
    'HAVA': ('İç Donanım & Periyodik Bakım', 'ic-donanim-bakim'),
    'YAĞ': ('İç Donanım & Periyodik Bakım', 'ic-donanim-bakim'),
    'FREN': ('Fren & Süspansiyon Sistemleri', 'fren-suspansiyon'),
    'BALATA': ('Fren & Süspansiyon Sistemleri', 'fren-suspansiyon'),
    'DİSK': ('Fren & Süspansiyon Sistemleri', 'fren-suspansiyon'),
    'AMORTİSÖR': ('Fren & Süspansiyon Sistemleri', 'fren-suspansiyon'),
    'SÜSPANSİYON': ('Fren & Süspansiyon Sistemleri', 'fren-suspansiyon'),
    'MOTOR': ('Motor & Aktarma Organları', 'motor-aktarma'),
    'TRİGER': ('Motor & Aktarma Organları', 'motor-aktarma'),
    'DEVRİDAİM': ('Motor & Aktarma Organları', 'motor-aktarma'),
    'DEVİRDAİM': ('Motor & Aktarma Organları', 'motor-aktarma'),
    'CONTA': ('Motor & Aktarma Organları', 'motor-aktarma'),
    'PİSTON': ('Motor & Aktarma Organları', 'motor-aktarma'),
    'DEBRİYAJ': ('Motor & Aktarma Organları', 'motor-aktarma'),
    'ŞANZIMAN': ('Motor & Aktarma Organları', 'motor-aktarma'),
    'ATEŞLEME': ('Aydınlatma & Elektrik Aksamı', 'aydinlatma-elektrik'),
    'BOBİN': ('Aydınlatma & Elektrik Aksamı', 'aydinlatma-elektrik'),
    'BUJİ': ('Aydınlatma & Elektrik Aksamı', 'aydinlatma-elektrik'),
    'ELEKTRİK': ('Aydınlatma & Elektrik Aksamı', 'aydinlatma-elektrik'),
    'AYDINLATMA': ('Aydınlatma & Elektrik Aksamı', 'aydinlatma-elektrik'),
    'FAR': ('Aydınlatma & Elektrik Aksamı', 'aydinlatma-elektrik'),
    'STOP': ('Aydınlatma & Elektrik Aksamı', 'aydinlatma-elektrik'),
    'KAPORTA': ('Kaporta & Dış Aksesuar', 'kaporta-aksesuar'),
    'TAMPON': ('Kaporta & Dış Aksesuar', 'kaporta-aksesuar'),
    'ÇAMURLUK': ('Kaporta & Dış Aksesuar', 'kaporta-aksesuar'),
    'AYNA': ('Kaporta & Dış Aksesuar', 'kaporta-aksesuar'),
    'İÇ TRİM': ('Kaporta & Dış Aksesuar', 'kaporta-aksesuar')
}

# Marka ve Model Tespiti
BRAND_KEYWORDS = {
    'Opel': [
        'ASTRA', 'CORSA', 'VECTRA', 'INSIGNIA', 'ZAFIRA', 'MOKKA', 'CROSSLAND', 
        'GRANDLAND', 'COMBO', 'MERIVA', 'TIGRA', 'OMEGA', 'ANTARA', 'CALIBRA'
    ],
    'Peugeot': [
        '106', '205', '206', '207', '208', '301', '306', '307', '308', '406', 
        '407', '508', '2008', '3008', '5008', 'PARTNER', 'BOXER', 'EXPERT', 'BIPPER', 'RCZ', 'RIFTER'
    ],
    'Citroën': [
        'C1', 'C2', 'C3', 'C4', 'C5', 'BERLINGO', 'NEMO', 'JUMPER', 'JUMPY', 
        'ELYSEE', 'C-ELYSEE', 'XSARA', 'SAXO', 'PICASSO', 'CACTUS', 'AIRCROSS'
    ],
    'Chevrolet': [
        'CRUZE', 'AVEO', 'CAPTIVA', 'SPARK', 'LACETTI', 'KALOS', 'TRAX', 'EPICA', 'REZZO'
    ],
    'DS Automobiles': [
        'DS3', 'DS4', 'DS5', 'DS7', 'DS 3', 'DS 4', 'DS 7', 'DS9'
    ],
    'Diğer Markalar': [
        'DUCATO', 'DOBLO', 'FIORINO', 'TRAFIC', 'MASTER', 'GOLF', 'POLO', 'PASSAT', 'CADDY', 'OCTAVIA', 'LEON', 'A3', 'FOCUS', 'TRANSIT'
    ]
}


def detect_brand_and_models(title: str, code: str, mfg: str):
    text = f"{code} {title} {mfg}".upper()
    
    detected_brands = []
    detected_models = []
    
    # 1. Önce 5 uzmanlık markasını kontrol et
    for brand, models in BRAND_KEYWORDS.items():
        if brand == 'Diğer Markalar':
            continue
        found_models = []
        for m in models:
            pattern = r'\b' + re.escape(m) + r'\b'
            if re.search(pattern, text):
                found_models.append(m)
        if found_models or brand.upper() in text:
            detected_brands.append(brand)
            detected_models.extend([{'brand': brand, 'model': m, 'years': 'Tüm Yıllar'} for m in found_models])
            
    # 2. Eğer hiçbir ana marka bulunamadıysa 'Diğer Markalar' kontrolü yap
    if not detected_brands:
        for m in BRAND_KEYWORDS['Diğer Markalar']:
            if re.search(r'\b' + re.escape(m) + r'\b', text):
                detected_brands.append('Diğer Markalar')
                detected_models.append({'brand': 'Diğer Markalar', 'model': m, 'years': 'Tüm Yıllar'})
                break
                
    # 3. Hala marka yoksa ama PSA motor kodu varsa
    if not detected_brands:
        if any(k in text for k in ['DV4', 'DV6', 'DW10', 'DW8', 'TU3', 'TU5', 'EP6', 'EB2', 'PURETECH', 'HDI']):
            detected_brands = ['Peugeot', 'Citroën']
            detected_models = [{'brand': 'Peugeot', 'model': '1.4/1.6 HDi & PureTech', 'years': 'Tüm Yıllar'}]
        else:
            detected_brands = ['Diğer Markalar']
            detected_models = [{'brand': 'Diğer Markalar', 'model': 'Evrensel Uyumlu', 'years': 'Tüm Yıllar'}]

    primary_brand = detected_brands[0]
    return primary_brand, detected_models


# Görseller dizini
IMAGES_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'public', 'images', 'products')


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


def detect_category(group: str, subgrp: str, title: str):
    combined = f"{group} {subgrp} {title}".upper()
    for kw, cat_info in CATEGORY_MAP.items():
        if kw in combined:
            return cat_info
    return ('Motor & Aktarma Organları', 'motor-aktarma')


def parse_excel(file_path: str):
    print(f"[*] '{file_path}' açılıyor...")
    wb = openpyxl.load_workbook(file_path, data_only=True)
    sheet = wb.active
    total_rows = sheet.max_row
    print(f"[*] Toplam {total_rows - 1} satır veri bulundu. İşleniyor...")
    
    products = []
    brand_stats = Counter()
    category_stats = Counter()
    stock_count = 0
    images_found_count = 0
    
    slug_counts = Counter()

    for r in range(2, total_rows + 1):
        code = str(sheet.cell(r, 1).value or '').strip()
        title = str(sheet.cell(r, 2).value or '').strip()
        group = str(sheet.cell(r, 3).value or '').strip()
        subgroup = str(sheet.cell(r, 4).value or '').strip()
        qty = sheet.cell(r, 6).value or 0
        mfg = str(sheet.cell(r, 9).value or '').strip()
        mfg_code = str(sheet.cell(r, 10).value or '').strip()
        
        if not code or not title:
            continue
            
        try:
            qty_num = int(float(qty))
        except (ValueError, TypeError):
            qty_num = 0
            
        if qty_num > 0:
            stock_count += 1
            
        brand, models = detect_brand_and_models(title, code, mfg)
        category_name, category_slug = detect_category(group, subgroup, title)
        
        brand_stats[brand] += 1
        category_stats[category_name] += 1
        
        # Orijinal mi Yan Sanayi mi?
        is_original = any(k in mfg.upper() for k in ['OPEL GM', 'PEUGEOT', 'CITROEN', 'PSA', 'CHEVROLET', 'OEM', 'GENUINE'])
        part_quality = 'original' if is_original else ('oem' if any(k in mfg.upper() for k in ['BOSCH', 'DELPHI', 'VALEO', 'SNR', 'LUK', 'HENGST', 'SACHS']) else 'aftermarket')
        
        # Temiz OEM kodu
        clean_oem = extract_clean_oem(code, mfg)

        # Görsel kontrolü (mevcut WebP var mı?)
        img_filename = f"{clean_oem}.webp"
        img_path = os.path.join(IMAGES_DIR, img_filename)
        if os.path.exists(img_path):
            image_url = f"/images/products/{img_filename}"
            images_found_count += 1
        else:
            image_url = ""

        # Benzersiz slug
        base_slug = slugify(f"{brand}-{title}-{code}")[:80]
        slug_counts[base_slug] += 1
        if slug_counts[base_slug] > 1:
            slug = f"{base_slug}-{slug_counts[base_slug]}"
        else:
            slug = base_slug

        from assign_desi_and_weight import calculate_weight_and_desi
        weight_kg, desi = calculate_weight_and_desi(title, group, subgroup)

        # Ürün Nesnesi (Fiyat 0, açıklamalar boş, is_hidden=True)
        prod = {
            'id': f"prod-{slugify(code)}-{r}",
            'title': title,
            'slug': slug,
            'category': category_name,
            'category_slug': category_slug,
            'brand': brand,
            'part_number': code,
            'oem_reference_number': clean_oem,
            'is_original': is_original,
            'part_quality': part_quality,
            'vehicle_compatibility': models,
            'price': 0, # Fiyatlar sonra girilecek, şu an 0
            'discount_price': None,
            'stock': qty_num,
            'weight_kg': round(weight_kg, 2),
            'desi': round(desi, 1),
            'image_url': image_url, # Varsa mevcut görsel, yoksa boş
            'description': "", # Kullanıcı talebi doğrultusunda boş
            'technical_description': "", # Boş
            'specs': {
                'Üretici': mfg or 'Belirtilmemiş',
                'Üretici Parça Kodu': mfg_code or code,
                'Stok Grubu': group,
                'Alt Grup': subgroup,
                'Desi': str(round(desi, 1)),
                'Ağırlık (kg)': str(round(weight_kg, 2))
            },
            'rating': 5.0,
            'reviews_count': 0,
            'is_featured': False,
            'is_hidden': True # Vitrinde gizli (fiyat ve açıklamalar tamamlanana kadar)
        }
        products.append(prod)

    print(f"\n[+] İşlem Tamamlandı: {len(products)} ürün başarıyla modellendi.")
    print(f"[+] Pozitif Stoklu Ürün Sayısı: {stock_count}")
    print(f"[+] Mevcut Görsel Eşleşen Ürün Sayısı: {images_found_count}")
    print("\n--- Marka Dağılımı ---")
    for b, count in brand_stats.most_common():
        print(f"  {b}: {count} ürün (%{round(count/len(products)*100, 1)})")
        
    print("\n--- Kategori Dağılımı ---")
    for c, count in category_stats.most_common():
        print(f"  {c}: {count} ürün (%{round(count/len(products)*100, 1)})")
        
    return products


def export_to_json(products, output_path):
    print(f"\n[*] JSON formatinda '{output_path}' dosyasina aktariliyor...")
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
    print(f"[BASARILI] {len(products)} adet urun '{output_path}' dosyasina kaydedildi!")


def export_to_sql(products, output_path):
    print(f"\n[*] Supabase SQL formatinda '{output_path}' dosyasina aktariliyor...")
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("-- Online Hizli Parca - Supabase Products Seed\n")
        f.write("-- Toplam Urun: " + str(len(products)) + "\n\n")
        
        batch_size = 100
        for i in range(0, len(products), batch_size):
            batch = products[i:i + batch_size]
            f.write("INSERT INTO public.products (id, title, slug, category, category_slug, brand, part_number, oem_reference_number, is_original, part_quality, price, stock, image_url, description, technical_description, specs, vehicle_compatibility, rating, reviews_count, is_featured, is_hidden) VALUES\n")
            
            val_lines = []
            for p in batch:
                title_esc = p['title'].replace("'", "''")
                slug_esc = p['slug'].replace("'", "''")
                cat_esc = p['category'].replace("'", "''")
                desc_esc = (p.get('description') or '').replace("'", "''")
                tech_desc_esc = (p.get('technical_description') or '').replace("'", "''")
                specs_json = json.dumps(p['specs'], ensure_ascii=False).replace("'", "''")
                vc_json = json.dumps(p['vehicle_compatibility'], ensure_ascii=False).replace("'", "''")
                
                line = f"  ('{p['id']}', '{title_esc}', '{slug_esc}', '{cat_esc}', '{p['category_slug']}', '{p['brand']}', '{p['part_number']}', '{p['oem_reference_number']}', {str(p['is_original']).lower()}, '{p['part_quality']}', {p['price']}, {p['stock']}, '{p['image_url']}', '{desc_esc}', '{tech_desc_esc}', '{specs_json}'::jsonb, '{vc_json}'::jsonb, {p['rating']}, {p['reviews_count']}, {str(p['is_featured']).lower()}, {str(p['is_hidden']).lower()})"
                val_lines.append(line)
                
            f.write(",\n".join(val_lines))
            f.write("\nON CONFLICT (id) DO UPDATE SET stock = EXCLUDED.stock, price = EXCLUDED.price, is_hidden = EXCLUDED.is_hidden, image_url = EXCLUDED.image_url;\n\n")
            
    print(f"[BASARILI] SQL Seed dosyasi basariyla olusturuldu: {output_path}")


def main():
    parser = argparse.ArgumentParser(description="STOK LİSTE.xlsx İçe Aktarma Aracı")
    parser.add_argument('--file', default='STOK LİSTE.xlsx', help="Excel dosya yolu")
    parser.add_argument('--dry-run', action='store_true', help="Sadece analiz et ve raporla")
    parser.add_argument('--export-json', type=str, help="JSON çıktısı oluştur")
    parser.add_argument('--export-sql', type=str, help="Supabase SQL seed dosyası oluştur")
    parser.add_argument('--upload', action='store_true', help="Supabase veritabanına doğrudan yükle")
    
    args = parser.parse_args()
    
    if not os.path.exists(args.file):
        print(f"HATA: '{args.file}' bulunamadı.")
        sys.exit(1)
        
    products = parse_excel(args.file)
    
    if args.export_json:
        export_to_json(products, args.export_json)
        
    if args.export_sql:
        export_to_sql(products, args.export_sql)
        
def load_env():
    """ .env.local veya .env dosyasındaki ortam değişkenlerini okur """
    env_files = ['.env.local', '.env']
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    for ef in env_files:
        p = os.path.join(root, ef)
        if os.path.exists(p):
            with open(p, 'r', encoding='utf-8') as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#') and '=' in line:
                        k, v = line.split('=', 1)
                        k = k.strip()
                        v = v.strip().strip('"').strip("'")
                        if k not in os.environ:
                            os.environ[k] = v


def upload_to_supabase(products):
    load_env()
    supabase_url = os.environ.get('NEXT_PUBLIC_SUPABASE_URL', '').rstrip('/')
    service_role_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')

    if not supabase_url or 'placeholder' in supabase_url:
        print("HATA: 'NEXT_PUBLIC_SUPABASE_URL' geçerli değil. Lütfen .env.local dosyanızı kontrol edin.")
        return

    if not service_role_key:
        print("\nHATA: 'SUPABASE_SERVICE_ROLE_KEY' bulunamadı.")
        print("Lütfen .env.local dosyanıza 'SUPABASE_SERVICE_ROLE_KEY=...' satırını ekleyin.")
        return

    import urllib.request
    import urllib.error

    endpoint = f"{supabase_url}/rest/v1/products"
    headers = {
        "apikey": service_role_key,
        "Authorization": f"Bearer {service_role_key}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
    }

    print(f"\n[*] Supabase veritabanına yükleme başlatılıyor ({endpoint})...")
    print(f"[*] Toplam yüklenecek ürün: {len(products)}")

    batch_size = 200
    total = len(products)
    success_count = 0

    for i in range(0, total, batch_size):
        batch = products[i:i + batch_size]
        payload = json.dumps(batch).encode('utf-8')
        
        req = urllib.request.Request(endpoint, data=payload, headers=headers, method='POST')
        try:
            with urllib.request.urlopen(req) as resp:
                if resp.status in [200, 201]:
                    success_count += len(batch)
                    sys.stdout.write(f"\r  Yüklendi: {success_count} / {total} (%{round(success_count/total*100, 1)})")
                    sys.stdout.flush()
        except urllib.error.HTTPError as e:
            err_body = e.read().decode('utf-8')
            print(f"\n[HATA] Supabase HTTP {e.code}: {err_body}")
            print("İpucu: 'is_hidden' sütununun Supabase'de var olduğundan emin olun.")
            return
        except Exception as e:
            print(f"\n[HATA] Beklenmeyen hata: {e}")
            return

    print(f"\n\n[TEBRİKLER] {success_count} adet ürün Supabase veritabanına başarıyla yüklendi!")


def main():
    load_env()
    parser = argparse.ArgumentParser(description="STOK LİSTE.xlsx İçe Aktarma Aracı")
    parser.add_argument('--file', default='STOK LİSTE.xlsx', help="Excel dosya yolu")
    parser.add_argument('--dry-run', action='store_true', help="Sadece analiz et ve raporla")
    parser.add_argument('--export-json', type=str, help="JSON çıktısı oluştur")
    parser.add_argument('--export-sql', type=str, help="Supabase SQL seed dosyası oluştur")
    parser.add_argument('--upload', action='store_true', help="Supabase veritabanına doğrudan yükle")
    
    args = parser.parse_args()
    
    if not os.path.exists(args.file):
        print(f"HATA: '{args.file}' bulunamadı.")
        sys.exit(1)
        
    products = parse_excel(args.file)
    
    if args.export_json:
        export_to_json(products, args.export_json)
        
    if args.export_sql:
        export_to_sql(products, args.export_sql)
        
    if args.upload:
        upload_to_supabase(products)
            
    if not (args.export_json or args.export_sql or args.upload) and not args.dry_run:
        print("\nİpucu: Komutu '--dry-run', '--export-sql dosya.sql' veya '--export-json dosya.json' ile çalıştırabilirsiniz.")


if __name__ == '__main__':
    main()
