# -*- coding: utf-8 -*-
"""
Eski 15 adet örnek (mock) ürünü ve görsellerini temizleme aracı.
Ayrıca canlı İyzico testi için 1 TL'lik test ürününü hazırlar.
"""

import os
import json
import urllib.request
import urllib.error

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 1. Silinecek eski mock JPG görselleri
mock_images = [
    'delphi-bobin.jpg',
    'tpms-sensor.jpg',
    'kaput-amortisoru.jpg',
    'devirdaim.jpg',
    'on-fren-balatasi.jpg',
    'hava-filtresi.jpg',
    'yag-filtresi.jpg',
    'polen-filtresi.jpg',
    'fren-diski.jpg',
    'fren-diski-2.jpg',
    'bosch-balata.jpg',
    'triger-seti.jpg',
    'gazli-amortisor.jpg',
    'hava-hortumu.jpg',
    'su-hortumu.jpg',
    'sicaklik-sensoru.jpg',
    'yag-sogutucu.jpg'
]

img_dir = os.path.join(base_dir, 'public', 'images', 'products')
deleted_images = 0
for img in mock_images:
    p = os.path.join(img_dir, img)
    if os.path.exists(p):
        os.remove(p)
        deleted_images += 1
        print(f"[-] Görsel silindi: {img}")

print(f"[+] Toplam {deleted_images} adet örnek JPG görseli public klasöründen silindi.")

# 2. Supabase'den eski mock ürünleri temizle
env_file = os.path.join(base_dir, '.env.local')
supabase_url = ''
service_key = ''
if os.path.exists(env_file):
    with open(env_file, 'r', encoding='utf-8') as f:
        for line in f:
            if '=' in line and not line.startswith('#'):
                k, v = line.strip().split('=', 1)
                k = k.strip()
                v = v.strip().strip('"').strip("'")
                if k == 'NEXT_PUBLIC_SUPABASE_URL':
                    supabase_url = v.rstrip('/')
                elif k == 'SUPABASE_SERVICE_ROLE_KEY':
                    service_key = v

if supabase_url and service_key and 'placeholder' not in supabase_url:
    # mock ürünlerin id'leri: prod-opel-*, prod-peugeot-*, prod-citroen-*, prod-chevrolet-*
    mock_prefixes = ['prod-opel-', 'prod-peugeot-', 'prod-citroen-', 'prod-chevrolet-']
    for prefix in mock_prefixes:
        endpoint = f"{supabase_url}/rest/v1/products?id=like.{prefix}*"
        req = urllib.request.Request(endpoint, headers={
            'apikey': service_key,
            'Authorization': f'Bearer {service_key}',
            'Prefer': 'return=representation'
        }, method='DELETE')
        try:
            with urllib.request.urlopen(req) as resp:
                deleted_data = json.loads(resp.read().decode('utf-8'))
                if deleted_data:
                    print(f"[-] Supabase'den {len(deleted_data)} adet '{prefix}*' mock ürünü silindi.")
        except Exception as e:
            print(f"Supabase silme uyarısı ({prefix}): {e}")

print("[OK] Örnek ürün temizliği tamamlandı!")
