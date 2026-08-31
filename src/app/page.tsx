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
  Award
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

  // Maintenance Kits Showcase (OnlineYedekParca Style)
  const maintenanceKits = [
    {
      title: 'Opel Astra J 1.3 CDTI 4\'lü Filtre & Yağ Bakım Seti',
      brand: 'Opel',
      engine: '1.3 CDTI Dizel',
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
      badge: 'Orijinal PSA/GM Yağlı',
      price: '1.850 ₺',
      href: '/shop?brand=Opel&q=bakim+seti'
    },
    {
      title: 'Peugeot 3008 1.5 BlueHDi Periyodik Filtre Seti',
      brand: 'Peugeot',
      engine: '1.5 BlueHDi Dizel',
      image: 'https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&w=600&q=80',
      badge: 'Euro 6 Tam Uyumlu',
      price: '2.100 ₺',
      href: '/shop?brand=Peugeot&q=bakim+seti'
    },
    {
      title: 'Citroën C3 1.2 PureTech Periyodik Yağ & Filtre Seti',
      brand: 'Citroën',
      engine: '1.2 PureTech Benzinli',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
      badge: 'Fabrika Dolum Standartı',
      price: '1.650 ₺',
      href: '/shop?brand=Citro%C3%ABn&q=bakim+seti'
    },
    {
      title: 'Chevrolet Cruze 1.6 16V Filtre & Buji Bakım Paketi',
      brand: 'Chevrolet',
      engine: '1.6 16V Benzinli / LPG',
      image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80',
      badge: 'GM Orijinal Buji Dahil',
      price: '1.450 ₺',
      href: '/shop?brand=Chevrolet&q=bakim+seti'
    }
  ];

  // Brand Hubs (Opel, Peugeot, Citroën, Chevrolet, DS)
  const popularBrands = [
    { name: 'Opel', slug: 'Opel', models: 'Astra • Corsa • Insignia • Mokka', color: 'border-yellow-400/60 hover:border-yellow-400 bg-yellow-500/5' },
    { name: 'Peugeot', slug: 'Peugeot', models: '208 • 308 • 2008 • 3008 • 5008', color: 'border-blue-400/60 hover:border-blue-400 bg-blue-500/5' },
    { name: 'Citroën', slug: 'Citroën', models: 'C3 • C4 • C5 Aircross • Berlingo', color: 'border-red-400/60 hover:border-red-400 bg-red-500/5' },
    { name: 'Chevrolet', slug: 'Chevrolet', models: 'Cruze • Aveo • Captiva • Trax', color: 'border-amber-500/60 hover:border-amber-500 bg-amber-500/5' },
    { name: 'DS Automobiles', slug: 'DS Automobiles', models: 'DS 7 • DS 4 • DS 3 Crossback', color: 'border-purple-400/60 hover:border-purple-400 bg-purple-500/5' },
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
            {maintenanceKits.map((kit, idx) => (
              <Link
                key={idx}
                href={kit.href}
                className="group bg-slate-950/80 border border-slate-800 hover:border-amber-400/80 rounded-2xl p-4 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-slate-900 border border-slate-800">
                    <Image
                      src={kit.image}
                      alt={kit.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow">
                      {kit.badge}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide block mb-1">
                    {kit.brand} • {kit.engine}
                  </span>
                  <h3 className="text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-amber-400 transition-colors">
                    {kit.title}
                  </h3>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Paket Fiyatı</span>
                  <span className="text-base font-black text-amber-400">{kit.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Markaya Göre Hizli Erişim Vitrini (Opel, Peugeot, Citroën, Chevrolet, DS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Marka Merkezleri (Orijinal & Muadil Stoklar)
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-bold hidden sm:inline">Şasi Uyum Garantili Parçalar</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {popularBrands.map((b) => (
            <Link
              key={b.name}
              href={`/shop?brand=${encodeURIComponent(b.slug)}`}
              className={`group bg-white dark:bg-slate-900 border ${b.color} rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all space-y-3`}
            >
              <div>
                <span className="text-base font-black text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors flex items-center justify-between">
                  <span>{b.name} Yedek Parça</span>
                  <ChevronRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {b.models}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                <span>Stoktan Gönderim</span>
                <span>İncele →</span>
              </div>
            </Link>
          ))}
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

      {/* 6. Kurumsal GüvenUnsurları (OnlineYedekParca Standard Value Proposition) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                %100 Şasi Doğrulaması
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                Siparişiniz çıkmadan şasiden birebir teyit edilir.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-500 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                81 İle Aynı Gün Kargo
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                Saat 16:00&apos;ya kadar verilen siparişler aynı gün sevk edilir.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-500 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                Orijinal & A Kalite Garantisi
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                Orijinal PSA/GM ve faturalı muadil marka güvencesi.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-500 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                14 Gün Kolay İade
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                Açılmamış ambalajda sorunsuz iade ve değişim hakkı.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
