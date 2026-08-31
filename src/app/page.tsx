import React from 'react';
import Link from 'next/link';
import { HeroBanner } from './components/ui/HeroBanner';
import { ProductCard } from './components/ui/ProductCard';
import { getCategories, getProducts } from './lib/actions';
import { 
  ChevronRight, 
  Wrench, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  ArrowRight,
  Disc,
  Cpu,
  Zap,
  Droplets,
  Layers,
  PhoneCall,
  Car,
  RotateCcw,
  CheckCircle2,
  PackageCheck,
  Award,
  CreditCard
} from 'lucide-react';
import Image from 'next/image';

export default async function HomePage() {
  const categories = await getCategories();
  const allProducts = await getProducts({});
  const featuredProducts = allProducts.filter((p) => p.is_featured);
  const maintenanceProducts = allProducts.filter(
    (p) => p.category_slug === 'ic-donanim-bakim' || p.category_slug === 'motor-aktarma'
  );
  const brakeProducts = allProducts.filter((p) => p.category_slug === 'fren-suspansiyon');

  // Quick Category Shortcuts (OnlineYedekParca Standard)
  const quickCategories = [
    { title: 'Periyodik Bakım Setleri', icon: Droplets, slug: 'ic-donanim-bakim', tag: 'Filtre + Yağ Setleri' },
    { title: 'Fren Disk & Balata', icon: Disc, slug: 'fren-suspansiyon', tag: 'Ön / Arka Setler' },
    { title: 'Triger & Motor Aksamı', icon: Cpu, slug: 'motor-aktarma', tag: 'Kayış & Devirdaim' },
    { title: 'Termostat & Soğutma', icon: Wrench, slug: 'motor-aktarma', tag: 'Devirdaim & Radyatör' },
    { title: 'Aydınlatma & Far', icon: Zap, slug: 'aydinlatma-elektrik', tag: 'LED Far & Stop' },
    { title: 'Ön Takım & Salıncak', icon: Layers, slug: 'fren-suspansiyon', tag: 'Amortisör & Z-Rot' },
  ];



  // Brand Hubs with model pills and specific badge attributes
  const popularBrands = [
    { 
      name: 'Opel', 
      slug: 'Opel', 
      models: ['Astra', 'Corsa', 'Insignia', 'Mokka', 'Grandland'], 
      badgeText: 'GM & PSA Orijinal',
      badgeBg: 'bg-amber-400/10 text-amber-400 border-amber-400/30' 
    },
    { 
      name: 'Peugeot', 
      slug: 'Peugeot', 
      models: ['208', '308', '2008', '3008', '5008'], 
      badgeText: 'Stellantis Grubu',
      badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30' 
    },
    { 
      name: 'Citroën', 
      slug: 'Citroën', 
      models: ['C3', 'C4', 'C5 Aircross', 'Berlingo'], 
      badgeText: 'Orijinal & Muadil',
      badgeBg: 'bg-red-500/10 text-red-400 border-red-500/30' 
    },
    { 
      name: 'Chevrolet', 
      slug: 'Chevrolet', 
      models: ['Cruze', 'Aveo', 'Captiva', 'Trax'], 
      badgeText: 'GM Orijinal Stok',
      badgeBg: 'bg-amber-500/10 text-amber-500 border-amber-500/30' 
    },
    { 
      name: 'DS Automobiles', 
      slug: 'DS Automobiles', 
      models: ['DS 7', 'DS 4', 'DS 3 Crossback'], 
      badgeText: 'Prestij Grubu',
      badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30' 
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner with Vehicle Selector & VIN Widget */}
      <HeroBanner />

      {/* 1. Quick Category Icon Grid (OnlineYedekParca Standard) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickCategories.map((qc, i) => {
            const Icon = qc.icon;
            return (
              <Link
                key={i}
                href={`/shop?category=${qc.slug}`}
                className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center gap-2 hover:border-amber-400 dark:hover:border-amber-400 transition-all shadow-sm hover:shadow-md"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-400/10 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white block group-hover:text-amber-500 transition-colors leading-tight">
                    {qc.title}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold block mt-0.5">
                    {qc.tag}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 2. Popüler Araç Bakım Setleri Showcase (Special Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4 fill-amber-400" />
                <span>Özel Avantajlı Paketler</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Popüler Araç Bakım Setleri & Filtre Paketi
              </h2>
            </div>
            <Link
              href="/shop?category=ic-donanim-bakim"
              className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black px-4 py-2 rounded-xl transition-all self-start sm:self-auto"
            >
              <span>TÜM BAKIM SETLERİ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {maintenanceProducts.length > 0 ? (
              maintenanceProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-slate-400 text-xs">
                <p className="font-extrabold text-white text-sm">Henüz Bakım Paketi Eklenmedi</p>
                <p className="mt-1">Admin panelinden tekil veya toplu yedek parça girişi yapabilirsiniz.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Marka Merkezleri (Sleek Automotive Brand Hub Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                <Car className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">MARKA MERKEZLERİ</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Opel, Peugeot, Citroën, Chevrolet & DS Stokları
                </h2>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-bold bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              %100 Şasi Uyum Garantisi
            </span>
          </div>

          {/* Brand Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {popularBrands.map((b) => (
              <Link
                key={b.name}
                href={`/shop?brand=${encodeURIComponent(b.slug)}`}
                className="group bg-slate-950/80 border border-slate-800 hover:border-amber-400/80 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 relative overflow-hidden"
              >
                {/* Brand Card Top Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded border uppercase font-mono ${b.badgeBg}`}>
                      {b.badgeText}
                    </span>
                    <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </div>

                  <div>
                    <h3 className="text-base font-black text-white group-hover:text-amber-400 transition-colors">
                      {b.name} Yedek Parça
                    </h3>
                  </div>

                  {/* Model Pills */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {b.models.map((m, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-900 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-800"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-bold group-hover:text-white transition-colors">
                  <span>Stoktan Teslim</span>
                  <span className="text-amber-400 font-black">Parçaları Gör →</span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Öne Çıkan Ürünler Vitrini */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <span className="text-[11px] text-amber-500 uppercase font-black tracking-wider block">Vitrin</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Çok Satan Orijinal & Muadil Parçalar
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-extrabold text-amber-500 hover:underline flex items-center gap-1"
          >
            <span>TÜM ÜRÜNLERİ GÖR</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Fren & Süspansiyon Vitrini */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <span className="text-[11px] text-amber-500 uppercase font-black tracking-wider block">Güvenli Sürüş</span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Fren Disk, Balata & Süspansiyon Parçaları
            </h2>
          </div>
          <Link
            href="/shop?category=fren-suspansiyon"
            className="text-xs font-extrabold text-amber-500 hover:underline flex items-center gap-1"
          >
            <span>TÜM FREN PARÇALARI</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {brakeProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Kurumsal Güven Barı (Sleek High-Contrast Trust Feature Bar) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Background Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-800 relative z-10">
            
            {/* Feature 1 */}
            <div className="flex items-start gap-4 pt-4 md:pt-0 md:px-4 first:pt-0 first:px-0">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-lg shadow-amber-400/20">
                <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <span className="bg-amber-400/10 text-amber-400 text-[10px] font-black px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                  UZMAN TEYİDİ
                </span>
                <h4 className="font-black text-white text-sm sm:text-base">
                  %100 Şasi Doğrulaması
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Siparişiniz kargolanmadan önce 17 haneli VIN ile birebir parça uyumu teyit edilir.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4 pt-4 md:pt-0 md:px-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-lg shadow-amber-400/20">
                <Truck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                  81 İLE TESLİMAT
                </span>
                <h4 className="font-black text-white text-sm sm:text-base">
                  Aynı Gün Kargo
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Saat 16:00&apos;ya kadar verilen siparişler aynı gün DHL Express ile sevk edilir.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4 pt-4 md:pt-0 md:px-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-lg shadow-amber-400/20">
                <Award className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <span className="bg-blue-500/10 text-blue-400 text-[10px] font-black px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                  YETKİLİ DİSTRİBÜTÖR
                </span>
                <h4 className="font-black text-white text-sm sm:text-base">
                  Orijinal & Muadil Garantisi
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Orijinal PSA/GM ve faturalı A kalite muadil yedek parça güvencesi.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-4 pt-4 md:pt-0 md:px-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-lg shadow-amber-400/20">
                <CreditCard className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <span className="bg-slate-800 text-slate-300 text-[10px] font-black px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                  256-BIT SSL
                </span>
                <h4 className="font-black text-white text-sm sm:text-base">
                  iyzico Güvenli Ödeme
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Tüm kredi kartlarına taksit imkanı ve 14 gün koşulsuz iade hakkı.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
