# -*- coding: utf-8 -*-
"""
Kemal Oto - Kargo Desi & Ağırlık (Kütle) Otomasyonu
STOK LİSTE.xlsx ve excelProducts.json içerisindeki tüm 8.785 ürünü
otomotiv parça grubu matrisine göre analiz eder, tahmini ağırlık (kg)
ve koli hacim desi değerini hesaplayarak veritabanına ve JSON'a işler.
"""

import os
import sys
import json
import re
import time
import urllib.request
import urllib.error

# Windows konsolunda UTF-8 çıktı desteği
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass


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


def calculate_weight_and_desi(title: str, group: str, subgroup: str) -> tuple[float, float]:
    """
    Parça adı, stok grubu ve alt grubuna göre gerçekçi ağırlık (kg) ve kargo desi değerini döndürür.
    (weight_kg, desi)
    """
    t = f" {title.upper()} "
    g = group.upper().strip()
    sg = subgroup.upper().strip()

    # 1. BÜYÜK HACİMLİ / ÖZEL KAPORTA PARÇALARI
    if 'TAMPON' in t:
        return 4.5, 30.0
    if any(k in t for k in ['KAPUT', 'MOTOR KAPUTU']):
        return 12.0, 40.0
    if any(k in t for k in ['ÇAMURLUK', 'CAMURLUK']):
        return 5.0, 20.0
    if any(k in t for k in ['KAPI ', 'ÖN KAPI', 'ARKA KAPI']):
        return 15.0, 35.0
    if any(k in t for k in ['BAGAJ KAPAĞI', 'BAGAJ KAPAGI']):
        return 10.0, 25.0
    if any(k in t for k in ['ÖN PANEL', 'ON PANEL', 'PANEL COMP', 'TRAVERS']):
        return 8.0, 18.0
    if any(k in t for k in ['MARŞBİYEL', 'MARSPIYEL']):
        return 4.0, 15.0
    if 'DAVLUMBAZ' in t:
        return 1.2, 8.0

    # 2. SOĞUTMA & RADYATÖRLER
    if any(k in t for k in ['RADYATÖR', 'RADYATOR', 'INTERCOOLER', 'KONDANSER', 'KLİMA RADYATÖRÜ']):
        return 4.5, 16.0
    if 'FAN DAVLUMBAZ' in t or 'FAN MOTOR' in t or sg == 'FAN MOTOR':
        return 3.5, 10.0
    if 'YEDEK SU DEPO' in t or sg == 'YEDEK SU DEPO':
        return 0.8, 5.0

    # 3. AYDINLATMA & AYNALAR
    if any(k in t for k in ['FAR CAMI', 'SİNYAL', 'SIS FARI', 'SİS FARI']):
        return 0.8, 3.0
    if any(k in t for k in ['ÖN FAR', 'FAR SAĞ', 'FAR SOL', 'FAR ']):
        return 3.2, 8.0
    if any(k in t for k in ['STOP', 'ARKA LAMBA']):
        return 1.8, 5.0
    if any(k in t for k in ['AYNA', 'DİKİZ AYNA']):
        return 1.5, 4.0

    # 4. FREN SİSTEMİ
    if any(k in t for k in ['FREN DİSK', 'FREN DISK', 'DİSK ÖN', 'DİSK ARKA']) or sg == 'DİSK':
        return 7.5, 3.0
    if 'KAMPANA' in t:
        return 6.0, 3.0
    if any(k in t for k in ['BALATA', 'FREN BALATASI']) or sg == 'BALATA':
        return 2.2, 2.0
    if 'FREN MERKEZ' in t or 'FREN LİMİTÖR' in t:
        return 1.5, 2.0
    if 'FREN VAKUM' in t or 'WESTINGHOUSE':
        if 'WESTINGHOUSE' in t:
            return 4.0, 8.0

    # 5. SÜSPANSİYON & YÜRÜYEN AKSAM
    if any(k in t for k in ['AMORTİSÖR', 'AMORTISOR']) and not any(k in t for k in ['KAPUT', 'BAGAJ']):
        return 4.2, 4.0
    if any(k in t for k in ['HELEZON', 'YAY ']):
        return 3.8, 4.0
    if any(k in t for k in ['KAPUT AMORTİSÖR', 'BAGAJ AMORTİSÖR']):
        return 0.4, 1.0
    if any(k in t for k in ['AKS KOMPLE', 'AKS MİLİ']) or (sg == 'AKS' and 'KOMPLE' in t):
        return 6.5, 6.0
    if 'AKS KAFASI' in t or 'İÇ AKS' in t:
        return 2.4, 2.0
    if any(k in t for k in ['SALINCAK', 'TRAVERS']):
        return 3.8, 5.0
    if any(k in t for k in ['DİREKSİYON KUTU', 'DIREKSIYON KUTU']):
        return 8.5, 12.0
    if any(k in t for k in ['DİREKSİYON POMPA', 'DIREKSIYON POMPA']):
        return 3.5, 4.0
    if any(k in t for k in ['PORYA', 'TEKER RULMAN']) or sg == 'TEKER RULMAN':
        return 2.6, 2.0
    if any(k in t for k in ['ROT BAŞI', 'ROT MİLİ', 'ROTİL', 'Z ROT', 'ASKI ROT']):
        return 0.7, 1.0

    # 6. DEBRİYAJ & AKTARMA
    if 'VOLAN' in t:
        return 11.0, 5.0
    if any(k in t for k in ['DEBRİYAJ SET', 'DEBRIYAJ SET', 'BASKI BALATA']) or (g == 'DEBRİYAJ' and 'SET' in t):
        return 6.5, 5.0
    if any(k in t for k in ['DEBRİYAJ BİLYA', 'DEBRIYAJ RULMAN', 'HİDROLİK BİLYA']):
        return 0.8, 2.0
    if 'DEBRİYAJ ÇATAL' in t or 'DEBRİYAJ TEL':
        return 0.6, 2.0

    # 7. MOTOR PARÇALARI & AĞIR MEKANİK
    if 'TURBO' in t or sg == 'TURBO':
        return 7.5, 6.0
    if any(k in t for k in ['SİLİNDİR KAPAK', 'SILINDIR KAPAK']):
        return 14.0, 12.0
    if any(k in t for k in ['KRANK', 'KRANK MİLİ']):
        return 13.0, 8.0
    if any(k in t for k in ['EKSANTRİK', 'EKSANTRIK']):
        return 4.5, 4.0
    if any(k in t for k in ['PİSTON', 'PISTON', 'GÖMLEK', 'SEKMAN']) or sg == 'PİSTON':
        return 3.5, 3.0
    if any(k in t for k in ['DEVİRDAİM', 'DEVIRDAIM', 'SU POMPASI']) or sg == 'DEVİRDAİM':
        return 1.6, 3.0
    if any(k in t for k in ['YAĞ POMPASI', 'YAG POMPASI']):
        return 2.2, 3.0
    if any(k in t for k in ['TRİGER SET', 'TRIGER SET', 'ZİNCİR SET']) or sg == 'TRİGER SET':
        return 2.2, 3.0
    if any(k in t for k in ['MOTOR TAKOZ', 'ŞANZIMAN TAKOZ', 'SANZIMAN TAKOZ']) or sg == 'MOTOR TAKOZ':
        return 2.2, 3.0
    if any(k in t for k in ['YAĞ SOĞUTUCU', 'YAG SOGUTUCU']):
        return 1.5, 3.0
    if any(k in t for k in ['KASNAK', 'KRANK KASNAĞI']):
        return 2.2, 2.0
    if any(k in t for k in ['MANİFOLD', 'MANIFOLD']):
        return 4.5, 8.0
    if any(k in t for k in ['TERMOSTAT', 'TERMOSTAT GÖVDE']) or sg == 'TERMOSTAT':
        return 0.6, 2.0
    if any(k in t for k in ['SUBAP', 'SÜBAP', 'GAYD']) or sg == 'SUBAP':
        return 0.8, 2.0
    if any(k in t for k in ['KÜLBÜTÖR', 'KULBUTOR']):
        return 2.5, 4.0
    if any(k in t for k in ['KARTEL', 'YAĞ KARTERİ']):
        return 3.5, 6.0

    # 8. FİLTRELER
    if any(k in t for k in ['HAVA FİLTRE', 'HAVA FILTRE']) or sg == 'HAVA FİLTRE':
        return 0.5, 4.0
    if any(k in t for k in ['YAĞ FİLTRE', 'YAG FILTRE']) or sg == 'YAĞ FİLTRE':
        return 0.3, 1.0
    if any(k in t for k in ['POLEN FİLTRE', 'POLEN FILTRE']):
        return 0.2, 2.0
    if any(k in t for k in ['YAKIT FİLTRE', 'MAZOT FİLTRE', 'BENZİN FİLTRE']) or sg == 'MAZOT FİLTRE':
        return 0.4, 2.0

    # 9. HORTUM VE BORULAR
    if any(k in t for k in ['RADYATÖR HORTUM', 'TURBO HORTUM', 'HAVA HORTUM', 'SU HORTUM']) or sg == 'HORTUM' or g == 'HORTUM':
        return 0.6, 3.0
    if 'SU BORU' in t:
        return 0.8, 3.0

    # 10. ELEKTRİK, ATEŞLEME & MÜŞÜRLER
    if any(k in t for k in ['MARŞ MOTOR', 'MARS MOTOR']):
        return 4.2, 4.0
    if any(k in t for k in ['ALTERNATÖR', 'ALTERNATÖR', 'ŞARJ DİNAMO', 'SARJ DINAMO']):
        return 5.8, 5.0
    if any(k in t for k in ['ATEŞLEME BOBİN', 'BOBİN', 'BOBIN']):
        return 0.8, 2.0
    if any(k in t for k in ['BUJİ', 'BUJI', 'KIZDIRMA']):
        return 0.3, 1.0
    if any(k in t for k in ['MÜŞÜR', 'MUSUR', 'SENSÖR', 'SENSOR', 'RÖLE', 'ROLE', 'KLİPS', 'SIGORTA']):
        return 0.15, 1.0
    if any(k in t for k in ['CAM KRİKO', 'CAM KRIKO']):
        return 2.2, 5.0
    if any(k in t for k in ['SİLECEK', 'SILECEK']) or g == 'SİLECEK':
        return 0.5, 2.0

    # 11. CONTA VE KEÇE
    if any(k in t for k in ['CONTA', 'TAKIM CONTA', 'KAPAK CONTA']) or sg == 'CONTA':
        return 0.4, 2.0
    if any(k in t for k in ['KEÇE', 'KECE', 'ORING', 'O-RING']):
        return 0.1, 1.0

    # 12. ALT GRUP DESTEĞİ
    sg_map = {
        'SÜSPANSİYON': (3.5, 4.0),
        'CONTA': (0.3, 2.0),
        'HORTUM': (0.6, 3.0),
        'BALATA': (2.2, 2.0),
        'AYDINLATMA': (2.5, 6.0),
        'MOTOR TAKOZ': (2.2, 3.0),
        'TERMOSTAT': (0.6, 2.0),
        'HAVA FİLTRE': (0.5, 4.0),
        'AKS': (5.5, 5.0),
        'DEVİRDAİM': (1.6, 3.0),
        'V KAYIŞ': (0.3, 1.0),
        'DİSK': (7.5, 3.0),
        'YEDEK SU DEPO': (0.8, 5.0),
        'TEKER RULMAN': (2.5, 2.0),
        'YAĞ FİLTRE': (0.3, 1.0),
        'V KAYIŞ GERGİ': (0.9, 2.0),
        'RADYATÖR': (4.5, 16.0),
        'MAZOT FİLTRE': (0.4, 2.0),
        'SOGUTMA': (1.5, 3.0),
        'TRİGER SET': (2.2, 3.0),
        'SUBAP': (0.8, 2.0),
        'TURBO': (7.5, 6.0),
        'DIŞ DİKİZ AYNA': (1.5, 4.0),
        'PİSTON': (3.5, 3.0),
        'FAN MOTOR': (3.5, 10.0),
    }
    if sg in sg_map:
        return sg_map[sg]

    # 13. STOK GRUBU DESTEĞİ
    g_map = {
        'MOTOR': (2.0, 3.0),
        'ALT TAKIM': (2.5, 3.0),
        'SOĞUTMA': (1.5, 3.0),
        'ELEKTRİK': (0.8, 2.0),
        'KAPORTA': (4.0, 12.0),
        'FREN GRUBU': (3.0, 3.0),
        'FİLTRE': (0.4, 2.0),
        'DEBRİYAJ': (5.0, 4.0),
        'HORTUM': (0.6, 3.0),
        'KAYIŞ': (0.4, 1.0),
        'ATEŞLEME': (0.5, 1.0),
        'SİLECEK': (0.5, 2.0),
        'YAKIT': (1.0, 2.0),
        'İÇ TRİM': (1.0, 3.0),
    }
    if g in g_map:
        return g_map[g]

    # Standart otomotiv küçük parça varsayılanı
    return 1.0, 2.0


def main():
    load_env()
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    json_path = os.path.join(base_dir, 'src', 'app', 'data', 'excelProducts.json')

    if not os.path.exists(json_path):
        print(f"HATA: '{json_path}' bulunamadı.")
        sys.exit(1)

    print(f"[*] '{json_path}' okunuyor...")
    with open(json_path, 'r', encoding='utf-8') as f:
        products = json.load(f)

    print(f"[*] Toplam {len(products)} ürün analiz ediliyor...")

    desi_distribution = {}
    weight_distribution = {}

    for p in products:
        title = p.get('title', '')
        specs = p.get('specs', {})
        group = specs.get('Stok Grubu', '')
        subgroup = specs.get('Alt Grup', '')

        weight_kg, desi = calculate_weight_and_desi(title, group, subgroup)

        p['weight_kg'] = round(weight_kg, 2)
        p['desi'] = round(desi, 1)
        p['specs']['Desi'] = str(p['desi'])
        p['specs']['Ağırlık (kg)'] = str(p['weight_kg'])

        # Görsel eşleme (mevcut WebP kontrolü)
        oem = p.get('oem_reference_number') or ''
        if oem:
            img_file = f"{oem}.webp"
            img_full = os.path.join(base_dir, 'public', 'images', 'products', img_file)
            if os.path.exists(img_full) and os.path.getsize(img_full) > 1000:
                p['image_url'] = f"/images/products/{img_file}"

        # İstatistik
        d_bucket = int(desi)
        desi_distribution[d_bucket] = desi_distribution.get(d_bucket, 0) + 1

    # JSON dosyasını güncelle
    print(f"[*] '{json_path}' güncelleniyor...")
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
    print(f"[BASARILI] {len(products)} ürünün kargo desi ve ağırlık bilgisi JSON dosyasına kaydedildi!")

    print("\n--- Desi Dağılımı Özeti ---")
    for d in sorted(desi_distribution.keys()):
        count = desi_distribution[d]
        print(f"  {d} Desi: {count} ürün (%{round(count/len(products)*100, 1)})")

    # Supabase'e Toplu Güncelleme
    supabase_url = os.environ.get('NEXT_PUBLIC_SUPABASE_URL', '').rstrip('/')
    service_role_key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY', '')

    if supabase_url and service_role_key and 'placeholder' not in supabase_url:
        print(f"\n[*] Supabase veritabanına desi & ağırlık bilgileri güncelleniyor...")
        endpoint = f"{supabase_url}/rest/v1/products"
        headers = {
            "apikey": service_role_key,
            "Authorization": f"Bearer {service_role_key}",
            "Content-Type": "application/json",
            "Prefer": "resolution=merge-duplicates"
        }

        # 1. Önce 'desi' sütununun veritabanında var olup olmadığını test et
        test_payload = json.dumps([{
            'id': products[0]['id'],
            'weight_kg': products[0]['weight_kg'],
            'desi': products[0]['desi'],
            'specs': products[0]['specs']
        }]).encode('utf-8')

        req = urllib.request.Request(endpoint, data=test_payload, headers=headers, method='POST')
        has_desi_column = True
        try:
            with urllib.request.urlopen(req) as resp:
                pass
        except urllib.error.HTTPError as e:
            if e.code == 400:
                has_desi_column = False
                print("[BİLGİ] 'desi' sütunu Supabase tablosunda henüz yok, veriler 'weight_kg' ve 'specs' (Desi) olarak aktarılacak.")
                print("       (Dilerseniz Supabase SQL editöründe 'ALTER TABLE public.products ADD COLUMN IF NOT EXISTS desi NUMERIC DEFAULT 2.0;' çalıştırabilirsiniz)")

        batch_size = 200
        total = len(products)
        updated = 0

        for i in range(0, total, batch_size):
            batch = products[i:i + batch_size]
            items_to_update = []
            for p in batch:
                row = dict(p)
                if not has_desi_column and 'desi' in row:
                    del row['desi']
                items_to_update.append(row)

            payload = json.dumps(items_to_update).encode('utf-8')
            
            # Yeniden deneme mekanizması (SSL / ağ dalgalanmaları için)
            success = False
            for attempt in range(3):
                req = urllib.request.Request(endpoint, data=payload, headers=headers, method='POST')
                try:
                    with urllib.request.urlopen(req) as resp:
                        if resp.status in [200, 201]:
                            updated += len(batch)
                            sys.stdout.write(f"\r  Supabase Güncellendi: {updated} / {total} (%{round(updated/total*100, 1)})")
                            sys.stdout.flush()
                            success = True
                            break
                except urllib.error.HTTPError as e:
                    err_body = e.read().decode('utf-8')
                    print(f"\n[HATA] Supabase HTTP {e.code}: {err_body}")
                    break
                except Exception as e:
                    if attempt == 2:
                        print(f"\n[UYARI] 3 deneme sonrası atlandı: {e}")
                    time.sleep(1.0)

        print(f"\n\n[TEBRİKLER] Supabase üzerinde {updated} ürünün desi ve ağırlık verisi saniyeler içinde başarıyla güncellendi!")


if __name__ == '__main__':
    main()
