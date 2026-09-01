import React from 'react';
import Link from 'next/link';
import { HeroBanner } from './components/ui/HeroBanner';
import { ProductCard } from './components/ui/ProductCard';
import { getCategories, getProducts } from './lib/actions';
import {
  ChevronRight,
  ShieldCheck,
  Truck,
  Award,
  Clock,
  ArrowRight,
  Phone,
} from 'lucide-react';

export default async function HomePage() {
  const categories = await getCategories();
  const allProducts = await getProducts({});
  const featuredProducts = allProducts.filter((p) => p.is_featured);
  const brakeProducts = allProducts.filter((p) => p.category_slug === 'fren-suspansiyon');

  // Supabase'den gelen gerçek kategori sayıları
  const getCategoryCount = (slug: string) => {
    const cat = categories.find((c) => c.slug === slug);
    return cat ? cat.item_count : 0;
  };

  const mainCategories = [
    {
      title: 'Periyodik Bakım & Filtre',
      desc: 'Hava, yağ, yakıt ve polen filtreleri, orijinal motor yağları',
      slug: 'ic-donanim-bakim',
      popular: ['Filtre Bakım Seti', 'Motor Yağı', 'Buji Takımı']
    },
    {
      title: 'Fren & Süspansiyon',
      desc: 'Ön/arka diskler, balatalar, amortisörler ve salıncaklar',
      slug: 'fren-suspansiyon',
      popular: ['Ön Fren Balatası', 'Hava Kanallı Disk', 'Z-Rot Takımı']
    },
    {
      title: 'Motor & Triger Seti',
      desc: 'Eksantrik kayış kitleri, devirdaim, kasnak ve contalar',
      slug: 'motor-aktarma',
      popular: ['Triger Seti + Devirdaim', 'Termostat Gövdesi', 'Külbütör Kapağı']
    },
    {
      title: 'Aydınlatma & Elektrik',
      desc: 'Far üniteleri, stop lambaları, sinyal, sensör ve marş',
      slug: 'aydinlatma-elektrik',
      popular: ['LED Far Komple', 'Arka Stop Lambası', 'Krank Sensörü']
    },
  ];

  const popularBrands = [
    {
      name: 'Opel',
      slug: 'Opel',
      origin: 'Alman Mühendisliği · PSA/GM',
      models: ['Astra (H, J, K, L)', 'Corsa (D, E, F)', 'Insignia (A, B)', 'Mokka', 'Grandland'],
      highlight: 'Astra & Corsa Uyumlu Stoklar'
    },
    {
      name: 'Peugeot',
      slug: 'Peugeot',
      origin: 'Stellantis Orijinal',
      models: ['208', '308', '2008', '3008', '5008', 'Rifter', 'Partner'],
      highlight: 'BlueHDi & PureTech Uyumlu'
    },
    {
      name: 'Citroën',
      slug: 'Citroën',
      origin: 'Stellantis Orijinal',
      models: ['C3', 'C4', 'C5 Aircross', 'Berlingo', 'C-Elysée'],
      highlight: 'Konfor & Süspansiyon Parçaları'
    },
    {
      name: 'Chevrolet',
      slug: 'Chevrolet',
      origin: 'GM Yetkili Stok',
      models: ['Cruze 1.6 / 1.4T', 'Aveo T300', 'Captiva 2.0D', 'Trax'],
      highlight: 'Orijinal GM Parça Garantisi'
    },
    {
      name: 'DS Automobiles',
      slug: 'DS Automobiles',
      origin: 'Premium Stellantis Grubu',
      models: ['DS 7 Crossback', 'DS 4', 'DS 3 Crossback', 'DS 9'],
      highlight: 'Prestij & Orijinal Parça'
    },
  ];

  const badges = [
    { title: '40 Yıllık Tecrübe', subtitle: 'Kemal Oto Güvencesi' },
    { title: '%100 Uyum Garantisi', subtitle: 'Şasi (VIN) ile Kontrol' },
    { title: 'Aynı Gün Kargo', subtitle: 'Saat 16:00\'ya Kadar' },
    { title: '81 İle Gönderim', subtitle: 'Hızlı & Güvenli Teslimat' },
  ];

  return (
    <div className="pb-16 space-y-12">
      <HeroBanner />

      {/* Badges Band (No mock numbers, pure value propositions) */}
      <div className="bg-[#E8820C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-orange-400/40">
            {badges.map((b, i) => (
              <div key={i} className="py-4 px-4 sm:px-8 text-center">
                <span className="text-sm sm:text-base font-bold text-white block leading-tight">{b.title}</span>
                <span className="text-orange-100 text-xs mt-0.5 block font-medium">{b.subtitle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

        {/* 1. KATEGORİ REHBERİ */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-gray-200 dark:border-[#2a2d35]">
            <div>
              <span className="text-xs font-bold text-[#E8820C] uppercase tracking-wider block">Yedek Parça Kataloğu</span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Popüler Ana Gruplar</h2>
            </div>
            <Link href="/shop/categories" className="text-xs font-semibold text-[#E8820C] hover:underline flex items-center gap-1">
              Tüm Kategorileri Listele ({categories.length}) <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mainCategories.map((cat, i) => {
              const count = getCategoryCount(cat.slug);
              return (
                <div
                  key={i}
                  className="border border-gray-200 dark:border-[#2a2d35] bg-white dark:bg-[#111318] rounded-lg p-4 flex flex-col justify-between hover:border-[#E8820C] transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white leading-snug">
                        {cat.title}
                      </h3>
                      {count > 0 && (
                        <span className="text-[10px] font-mono font-medium text-[#E8820C] bg-orange-50 dark:bg-orange-950/40 px-1.5 py-0.5 rounded shrink-0">
                          {count} Parça
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
                      {cat.desc}
                    </p>

                    <div className="space-y-1 mb-4 pt-2 border-t border-gray-100 dark:border-[#1e2128]">
                      <span className="text-[10px] font-semibold text-gray-400 block uppercase">Örnek Parçalar:</span>
                      <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-0.5">
                        {cat.popular.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 truncate">
                            <span className="w-1 h-1 rounded-full bg-[#E8820C]" />
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className="mt-auto pt-3 border-t border-gray-100 dark:border-[#1e2128] text-xs font-semibold text-[#E8820C] hover:text-[#d4740a] flex items-center justify-between group"
                  >
                    <span>Grubu İncele</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. MARKA PARÇA DİZİNİ */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-gray-200 dark:border-[#2a2d35]">
            <div>
              <span className="text-xs font-bold text-[#E8820C] uppercase tracking-wider block">Uzmanlık Alanımız</span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Araç Marka Merkezleri</h2>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Ruhsat şasi numarası ile %100 birebir doğrulama
            </span>
          </div>

          <div className="border border-gray-200 dark:border-[#2a2d35] rounded-lg bg-white dark:bg-[#111318] divide-y divide-gray-100 dark:divide-[#1e2128] overflow-hidden">
            {popularBrands.map((brand, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-gray-50/70 dark:hover:bg-[#15181e] transition-colors"
              >
                {/* Brand Title & Origin */}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">{brand.name}</h3>
                    <span className="text-xs text-gray-400 font-medium">Yedek Parçaları</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{brand.origin}</p>
                </div>

                {/* Action Link */}
                <div className="shrink-0 flex items-center">
                  <Link
                    href={`/shop?brand=${encodeURIComponent(brand.slug)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#E8820C] hover:bg-[#d4740a] px-4 py-2 rounded transition-colors shadow-sm"
                  >
                    <span>{brand.name} Parçaları</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. ÖNE ÇIKAN ÜRÜNLER VİTRİNİ */}
        {featuredProducts.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-end justify-between pb-3 border-b border-gray-200 dark:border-[#2a2d35]">
              <div>
                <span className="text-xs font-bold text-[#E8820C] uppercase tracking-wider block">Hızlı Gönderim</span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Çok Satan Parçalar</h2>
              </div>
              <Link href="/shop" className="text-xs font-semibold text-[#E8820C] hover:underline flex items-center gap-1">
                Tüm Ürünleri Gör <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* 4. FREN & SÜSPANSİYON VİTRİNİ */}
        {brakeProducts.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-end justify-between pb-3 border-b border-gray-200 dark:border-[#2a2d35]">
              <div>
                <span className="text-xs font-bold text-[#E8820C] uppercase tracking-wider block">Güvenlik & Sürüş</span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Fren Disk, Balata & Süspansiyon</h2>
              </div>
              <Link href="/shop?category=fren-suspansiyon" className="text-xs font-semibold text-[#E8820C] hover:underline flex items-center gap-1">
                Tüm Fren Parçaları <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {brakeProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* 5. KURUMSAL BİLGİ & ÇÖZÜM HATTI */}
        <section>
          <div className="bg-gray-900 dark:bg-[#111318] rounded-xl border border-gray-800 dark:border-[#2a2d35] p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-3">
                <span className="text-xs font-bold text-[#E8820C] uppercase tracking-wider">Kemal Oto Doğrulama Sistemi</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Aracınıza yanlış parça alma riskine son verin
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xl">
                  Siparişinizi vermeden önce veya verdikten sonra 17 haneli şasi numaranızı (VIN) girin; uzman ekibimiz orijinal fabrika parça kataloglarından (PSA ServiceBox / GM EPC) teyit ederek siparişinizi hatasız sevk etsin.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 bg-[#E8820C] hover:bg-[#d4740a] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded transition-colors"
                  >
                    Parça Kataloğunu Aç
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="tel:05422924492"
                    className="inline-flex items-center gap-2 border border-gray-700 text-gray-200 hover:text-white hover:border-gray-500 text-xs sm:text-sm font-medium px-4 py-2.5 rounded transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    0542 292 44 92
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                <div className="bg-gray-800/50 dark:bg-[#1a1d23] border border-gray-700/40 dark:border-[#2a2d35] p-3.5 rounded">
                  <ShieldCheck className="w-5 h-5 text-[#E8820C] mb-1.5" />
                  <p className="text-xs font-bold text-white">Şasi Doğrulama</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">17 haneli VIN ile %100 uyum</p>
                </div>
                <div className="bg-gray-800/50 dark:bg-[#1a1d23] border border-gray-700/40 dark:border-[#2a2d35] p-3.5 rounded">
                  <Truck className="w-5 h-5 text-[#E8820C] mb-1.5" />
                  <p className="text-xs font-bold text-white">Aynı Gün Sevk</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">16:00&apos;ya kadar DHL Express</p>
                </div>
                <div className="bg-gray-800/50 dark:bg-[#1a1d23] border border-gray-700/40 dark:border-[#2a2d35] p-3.5 rounded">
                  <Award className="w-5 h-5 text-[#E8820C] mb-1.5" />
                  <p className="text-xs font-bold text-white">PSA & GM Orijinal</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Faturalı & garantili parça</p>
                </div>
                <div className="bg-gray-800/50 dark:bg-[#1a1d23] border border-gray-700/40 dark:border-[#2a2d35] p-3.5 rounded">
                  <Clock className="w-5 h-5 text-[#E8820C] mb-1.5" />
                  <p className="text-xs font-bold text-white">Teknik Destek</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Usta desteği 08:30-18:30</p>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
