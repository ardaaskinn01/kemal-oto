import { Product } from '../types/database.types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-test-odeme-1tl',
    title: 'Sistem Entegrasyon & Test Parçası (1 TL)',
    slug: 'sistem-entegrasyon-test-parcasi-1-tl',
    category: 'Aydınlatma & Elektrik Aksamı',
    category_slug: 'aydinlatma-elektrik',
    brand: 'Opel',
    part_number: 'TEST-001',
    oem_reference_number: 'TEST001',
    is_original: true,
    part_quality: 'original',
    vehicle_compatibility: [
      { brand: 'Tüm Araçlar', model: 'Test Modeli', years: 'Tüm Yıllar' }
    ],
    price: 1,
    discount_price: 1,
    stock: 999,
    weight_kg: 0.1,
    desi: 1.0,
    image_url: '/images/placeholder-part.svg',
    description: 'İyzico canlı 3D Secure ödeme ve sipariş akışını test etmek için 1.00 TL olarak tanımlanmış özel test ürünü.',
    technical_description: 'Test amaçlı tanımlanmıştır. Satın alım sonrası İyzico panelinden tek tıkla iade edilebilir.',
    specs: {
      'Kullanım Amacı': 'Canlı Ödeme Testi',
      'Test Tutarı': '1.00 TL',
      'Kargo': 'Ücretsiz (0 TL)'
    },
    rating: 5.0,
    reviews_count: 1,
    is_featured: true,
    is_hidden: false
  }
];
