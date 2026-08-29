import React from 'react';
import Link from 'next/link';
import { HeroBanner } from './components/ui/HeroBanner';
import { CategoryCard } from './components/ui/CategoryCard';
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
  Car
} from 'lucide-react';
import Image from 'next/image';

export default async function HomePage() {
  const categories = await getCategories();
  const allProducts = await getProducts({});
  const featuredProducts = allProducts.filter((p) => p.is_featured);
  const maintenanceProducts = allProducts.filter((p) => p.category_slug === 'ic-donanim-bakim' || p.category_slug === 'motor-aktarma');
  const brakeProducts = allProducts.filter((p) => p.category_slug === 'fren-suspansiyon');

  // Quick Category Shortcuts (OnlineYedekParca Style)
  const quickCategories = [
    { title: 'Periyodik Bakım Setleri', icon: Droplets, slug: 'ic-donanim-bakim', tag: 'Filtre + Yağ' },
    { title: 'Fren Disk & Balata', icon: Disc, slug: 'fren-suspansiyon', tag: 'Ön / Arka' },
    { title: 'Triger & Motor Aksamı', icon: Cpu, slug: 'motor-aktarma', tag: 'Zincir & Kayış' },
    { title: 'Termostat & Soğutma', icon: Wrench, slug: 'motor-aktarma', tag: 'Devirdaim & Radyatör' },
    { title: 'Aydınlatma & Far', icon: Zap, slug: 'aydinlatma-elektrik', tag: 'LED Far & Stop' },
    { title: 'Ön Takım & Salıncak', icon: Layers, slug: 'fren-suspansiyon', tag: 'Amortisör & Z-Rot' },
  ];

  // Brand Hubs
  const popularBrands = [
    { name: 'Opel', slug: 'Opel', models: 'Astra • Corsa • Insignia • Mokka', logoText: 'OPEL', color: 'border-amber-500/40 hover:border-amber-500' },
    { name: 'Peugeot', slug: 'Peugeot', models: '208 • 308 • 2008 • 3008 • 5008', logoText: 'PEUGEOT', color: 'border-blue-500/40 hover:border-blue-500' },
    { name: 'Citroën', slug: 'Citroën', models: 'C3 • C4 • C5 Aircross • Berlingo', logoText: 'CITROËN', color: 'border-red-500/40 hover:border-red-500' },
    { name: 'Chevrolet', slug: 'Chevrolet', models: 'Cruze • Aveo • Captiva • Trax', logoText: 'CHEVROLET', color: 'border-orange-500/40 hover:border-orange-500' },
    { name: 'DS Automobiles', slug: 'DS Automobiles', models: 'DS 7 • DS 4 • DS 3 Crossback', logoText: 'DS', color: 'border-amber-400/40 hover:border-amber-400' },
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
                className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center gap-2 hover:border-orange-500 dark:hover:border-orange-500 transition-all shadow-sm hover:shadow-md"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block group-hover:text-orange-500 transition-colors leading-tight">
                    {qc.title}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block mt-0.5">
                    {qc.tag}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 2. Brand Specific Hubs (Opel, Peugeot, Citroen, Chevrolet, DS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Markaya Göre Yedek Parça
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">Orijinal & Muadil Stoklar</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {popularBrands.map((b) => (
            <Link
              key={b.name}
              href={`/shop?brand=${encodeURIComponent(b.slug)}`}
              className={`group bg-white dark:bg-slate-900 border ${b.color} rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all space-y-3`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-slate-900 dark:text-white tracking-wider">
                  {b.logoText}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div>
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400 block mb-1">
                  {b.name} Parçaları
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  {b.models}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured / Best Seller Products (Gerçek Ürün Vitrini) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider block">
              En Çok Satan Parçalar
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              Popüler Yedek Parçalar
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-1 text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
          >
            <span>Tümünü Gör ({allProducts.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Bakım Setleri & Filtreler Showcase (OnlineYedekParca Tarzı) */}
      {maintenanceProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider block">
                  Periyodik Bakım
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                  Filtre Setleri & Motor Bakım Parçaları
                </h3>
              </div>
              <Link
                href="/shop?category=ic-donanim-bakim"
                className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-orange-500 flex items-center gap-1"
              >
                <span>Bakım Ürünlerini Listele</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {maintenanceProducts.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Fren & Süspansiyon Showcase */}
      {brakeProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider block">
                Fren Grubu
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                Fren Disk & Balata Takımları
              </h2>
            </div>
            <Link
              href="/shop?category=fren-suspansiyon"
              className="flex items-center gap-1 text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
            >
              <span>Fren Parçalarını Gör</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brakeProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
