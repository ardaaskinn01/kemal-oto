# -*- coding: utf-8 -*-
import os
import json
import urllib.request

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env_file = os.path.join(root, '.env.local')
supabase_url = ''
service_key = ''
with open(env_file, 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            k, v = line.split('=', 1)
            k, v = k.strip(), v.strip().strip('"').strip("'")
            if k == 'NEXT_PUBLIC_SUPABASE_URL':
                supabase_url = v.rstrip('/')
            elif k == 'SUPABASE_SERVICE_ROLE_KEY':
                service_key = v

test_prod = {
    'id': 'prod-test-odeme-1tl',
    'title': 'Sistem Entegrasyon & Test Parçası (1 TL)',
    'slug': 'sistem-entegrasyon-test-parcasi-1-tl',
    'category': 'Aydınlatma & Elektrik Aksamı',
    'category_slug': 'aydinlatma-elektrik',
    'brand': 'Opel',
    'part_number': 'TEST-001',
    'oem_reference_number': 'TEST001',
    'is_original': True,
    'part_quality': 'original',
    'price': 1,
    'discount_price': 1,
    'stock': 999,
    'weight_kg': 0.1,
    'image_url': '/images/placeholder-part.svg',
    'description': 'İyzico canlı 3D Secure ödeme ve sipariş akışını test etmek için 1.00 TL olarak tanımlanmış özel test ürünü.',
    'technical_description': 'Test amaçlı tanımlanmıştır. Satın alım sonrası İyzico panelinden tek tıkla iade edilebilir.',
    'specs': {'Kullanım Amacı': 'Canlı Ödeme Testi', 'Test Tutarı': '1.00 TL', 'Kargo': 'Ücretsiz (0 TL)', 'Desi': '1.0', 'Ağırlık (kg)': '0.1'},
    'vehicle_compatibility': [{'brand': 'Tüm Araçlar', 'model': 'Test Modeli', 'years': 'Tüm Yıllar'}],
    'rating': 5.0,
    'reviews_count': 1,
    'is_featured': True,
    'is_hidden': False
}

endpoint = f'{supabase_url}/rest/v1/products'
headers = {
    'apikey': service_key,
    'Authorization': f'Bearer {service_key}',
    'Content-Type': 'application/json',
    'Prefer': 'resolution=merge-duplicates'
}
req = urllib.request.Request(endpoint, data=json.dumps([test_prod]).encode('utf-8'), headers=headers, method='POST')
with urllib.request.urlopen(req) as resp:
    print('Test ürünü Supabase durum kodu:', resp.status)
