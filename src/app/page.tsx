import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts, getCategories } from './lib/actions';
import { ProductCard } from './components/ui/ProductCard';
import { HeroBanner } from './components/ui/HeroBanner';
import { PsaGroupShowcase } from './components/ui/PsaGroupShowcase';
import { 
  ShieldCheck, 
  Truck, 
  Award, 
  Clock, 
  ArrowRight, 
  Wrench, 
  Disc, 
  Zap, 
  CheckCircle2, 
  ChevronRight,
  Filter
} from 'lucide-react';

export const revalidate = 60; // ISR 1 minute

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  const featuredProducts = products.filter(p => p.is_featured);
  const brakeProducts = products.filter(p => p.category === 'Fren Sistemi' || p.category_slug === 'fren-sistemi');
  const maintenanceProducts = products.filter(p => p.category === 'Filtre & Bakım' || p.category_slug === 'filtre-bakim');

  // Real product count per category
  const getCategoryCount = (slug: string) => {
    return products.filter(p => p.category_slug === slug || p.category?.toLowerCase() === slug.toLowerCase()).length;
  };

  const mainCategories = [
    {
      title: 'Periyodik Bakım & Filtre Seti',
      desc: 'Hava, yağ, yakıt, polen filtreleri ve motor yağları',
      icon: Filter,
      slug: 'filtre-bakim',
      popular: ['4\'lü Filtre Bakım Seti', 'Motor Yağı (Dexos2)', 'Yağ Filtresi']
    },
    {
      title: 'Fren Sistemi & Güvenlik',
      desc: 'Ön/arka fren diskleri, balatalar ve hidrolik aksam',
      icon: Disc,
      slug: 'fren-sistemi',
      popular: ['Ön Fren Balata Takımı', 'Hava Kanallı Fren Diski', 'Fren Kaliperi']
    },
    {
      title: 'Motor & Mekanik Parçalar',
      desc: 'Triger setleri, devirdaim, debriyaj ve conta takımları',
      icon: Wrench,
      slug: 'motor-mekanik',
      popular: ['Triger Seti & Devirdaim', 'Eksantrik Mili', 'Termostat']
    },
    {
      title: 'Aydınlatma & Elektrik Aksamı',
      desc: 'Farlar, stop lambaları, sensörler ve beyinler',
      icon: Zap,
      slug: 'aydinlatma-elektrik',
      popular: ['LED Far Komple', 'Arka Stop Lambası', 'Krank Sensörü']
    },
  ];

  const badges = [
    { title: 'PSA Grubu & GM Uzmanı', subtitle: 'Peugeot • Citroën • Opel • Chevrolet • DS' },
    { title: '%100 Uyum Garantisi', subtitle: '17 Haneli Şasi (VIN) ile Kontrol' },
    { title: 'Aynı Gün Kargo', subtitle: 'Saat 16:00\'ya Kadar' },
    { title: '81 İle Hızlı Gönderim', subtitle: 'Anlaşmalı Güvenli Teslimat' },
  ];

  return (
    <div className="pb-16 space-y-12">
      {/* 1. HERO BANNER WITH 4-STEP CAR SELECTOR */}
      <HeroBanner />

      {/* 2. VALUE PROPOSITIONS BAND */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* 3. PSA GROUPE AUTHORITATIVE SHOWCASE (Peugeot, Citroen, Opel, DS, Vauxhall) */}
        <PsaGroupShowcase />

        {/* 4. KATEGORİ REHBERİ */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-gray-200 dark:border-[#2a2d35]">
            <div>
              <span className="text-xs font-bold text-[#E8820C] uppercase tracking-wider block">Yedek Parça Kataloğu</span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Popüler Ana Parça Grupları</h2>
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
                  className="border border-gray-200 dark:border-[#2a2d35] bg-white dark:bg-[#111318] rounded-2xl p-5 flex flex-col justify-between hover:border-[#E8820C] transition-all hover:shadow-md"
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
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E8820C]" />
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

        {/* 5. ÖNE ÇIKAN ÜRÜNLER VİTRİNİ */}
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

        {/* 6. FREN & SÜSPANSİYON VİTRİNİ */}
        {brakeProducts.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-end justify-between pb-3 border-b border-gray-200 dark:border-[#2a2d35]">
              <div>
                <span className="text-xs font-bold text-[#E8820C] uppercase tracking-wider block">Güvenlik & Sürüş</span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Fren Disk, Balata & Süspansiyon</h2>
              </div>
              <Link href="/shop?category=fren-sistemi" className="text-xs font-semibold text-[#E8820C] hover:underline flex items-center gap-1">
                Tümünü Listele <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {brakeProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* 7. PERİYODİK BAKIM VİTRİNİ */}
        {maintenanceProducts.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-end justify-between pb-3 border-b border-gray-200 dark:border-[#2a2d35]">
              <div>
                <span className="text-xs font-bold text-[#E8820C] uppercase tracking-wider block">Düzenli Bakım</span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Filtre & Bakım Setleri</h2>
              </div>
              <Link href="/shop?category=filtre-bakim" className="text-xs font-semibold text-[#E8820C] hover:underline flex items-center gap-1">
                Tümünü Listele <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {maintenanceProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* 8. EXPERT TRUST & CHASSIS VERIFICATION FOOTPRINT */}
        <section className="bg-gray-900 text-white rounded-3xl p-6 sm:p-10 border border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-[#E8820C] uppercase tracking-wider block">
                PSA Grubu Şasi Doğrulama Hizmeti
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Yanlış Parça Siparişi Verme Riskine Son
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xl">
                Otomotiv yedek parçalarında motor kodu, şanzıman türü ve donanım varyasyonları nedeniyle aynı model araçlarda dahi parçalar farklılık gösterebilir. Ruhsatınızdaki 17 haneli şasi numaranızı girdiğinizde siparişiniz depodan çıkmadan önce uzman teknisyenlerimizce fabrika EPC kataloglarından teyit edilir.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#E8820C] hover:bg-[#d4740a] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors shadow-md"
                >
                  <span>WhatsApp ile Ustaya Sor</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="bg-gray-800/50 border border-gray-700/40 p-4 rounded-2xl">
                <ShieldCheck className="w-6 h-6 text-[#E8820C] mb-2" />
                <p className="text-xs font-bold text-white">Şasi Doğrulama</p>
                <p className="text-[11px] text-gray-400 mt-0.5">17 haneli VIN ile %100 uyum</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/40 p-4 rounded-2xl">
                <Truck className="w-6 h-6 text-[#E8820C] mb-2" />
                <p className="text-xs font-bold text-white">Aynı Gün Sevk</p>
                <p className="text-[11px] text-gray-400 mt-0.5">16:00&apos;ya kadar Anlaşmalı Kargo</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/40 p-4 rounded-2xl">
                <Award className="w-6 h-6 text-[#E8820C] mb-2" />
                <p className="text-xs font-bold text-white">PSA Orijinal</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Faturalı & garantili parça</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/40 p-4 rounded-2xl">
                <Clock className="w-6 h-6 text-[#E8820C] mb-2" />
                <p className="text-xs font-bold text-white">Teknik Destek</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Usta desteği 08:30-18:30</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
