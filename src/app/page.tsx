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
  ArrowRight,
  Disc,
  Cpu,
  Zap,
  Droplets,
  Layers,
  Car,
  Award,
  CreditCard
} from 'lucide-react';

export default async function HomePage() {
  const categories = await getCategories();
  const allProducts = await getProducts({});
  const featuredProducts = allProducts.filter((p) => p.is_featured);
  const brakeProducts = allProducts.filter((p) => p.category_slug === 'fren-suspansiyon');

  const quickCategories = [
    { title: 'Periyodik Bakım Setleri', icon: Droplets, slug: 'ic-donanim-bakim', tag: 'Filtre + Yağ' },
    { title: 'Fren Disk & Balata', icon: Disc, slug: 'fren-suspansiyon', tag: 'Ön / Arka' },
    { title: 'Triger & Motor', icon: Cpu, slug: 'motor-aktarma', tag: 'Kayış & Devirdaim' },
    { title: 'Termostat & Soğutma', icon: Wrench, slug: 'motor-aktarma', tag: 'Radyatör' },
    { title: 'Aydınlatma & Far', icon: Zap, slug: 'aydinlatma-elektrik', tag: 'LED & Stop' },
    { title: 'Ön Takım & Salıncak', icon: Layers, slug: 'fren-suspansiyon', tag: 'Amortisör' },
  ];

  const popularBrands = [
    { name: 'Opel', slug: 'Opel', models: ['Astra', 'Corsa', 'Insignia', 'Mokka'], badge: 'GM & PSA' },
    { name: 'Peugeot', slug: 'Peugeot', models: ['208', '308', '2008', '3008'], badge: 'Stellantis' },
    { name: 'Citroën', slug: 'Citroën', models: ['C3', 'C4', 'C5 Aircross', 'Berlingo'], badge: 'Stellantis' },
    { name: 'Chevrolet', slug: 'Chevrolet', models: ['Cruze', 'Aveo', 'Captiva'], badge: 'GM' },
    { name: 'DS Automobiles', slug: 'DS Automobiles', models: ['DS 7', 'DS 4', 'DS 3'], badge: 'Prestij' },
  ];

  return (
    <div className="space-y-10 pb-16">
      <HeroBanner />

      {/* 1. Quick category row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {quickCategories.map((qc, i) => {
            const Icon = qc.icon;
            return (
              <Link
                key={i}
                href={`/shop?category=${qc.slug}`}
                className="group flex items-center gap-2.5 p-3 rounded-lg border border-gray-200 dark:border-[#2a2d35] bg-white dark:bg-[#111318] hover:border-[#E8820C] hover:text-[#E8820C] transition-colors"
              >
                <Icon className="w-4 h-4 text-gray-400 group-hover:text-[#E8820C] shrink-0 transition-colors" />
                <div className="min-w-0">
                  <span className="text-xs font-medium text-gray-800 dark:text-gray-200 group-hover:text-[#E8820C] block truncate transition-colors leading-tight">
                    {qc.title}
                  </span>
                  <span className="text-[10px] text-gray-400 block truncate">{qc.tag}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 2. Brand hubs — white card, no dark bg */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-gray-200 dark:border-[#2a2d35] rounded-xl overflow-hidden bg-white dark:bg-[#111318]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-[#2a2d35]">
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-[#E8820C]" />
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Marka Merkezleri</h2>
              <span className="text-xs text-gray-400">— Opel, Peugeot, Citroën, Chevrolet & DS</span>
            </div>
            <span className="text-xs text-gray-400">%100 Şasi Uyum Garantisi</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 dark:divide-[#2a2d35]">
            {popularBrands.map((b) => (
              <Link
                key={b.name}
                href={`/shop?brand=${encodeURIComponent(b.slug)}`}
                className="group p-4 hover:bg-gray-50 dark:hover:bg-[#1a1d23] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#E8820C] transition-colors">
                    {b.name}
                  </h3>
                  <span className="text-[10px] text-gray-400 border border-gray-200 dark:border-[#2a2d35] px-1.5 py-0.5 rounded">
                    {b.badge}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {b.models.map((m, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-[#2a2d35] px-1.5 py-0.5 rounded"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                <span className="text-xs text-[#E8820C] font-medium group-hover:underline underline-offset-2">
                  Parçaları gör →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured products */}
      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100 dark:border-[#2a2d35]">
            <div>
              <p className="text-xs font-medium text-[#E8820C] mb-0.5">Vitrin</p>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Çok Satan Parçalar
              </h2>
            </div>
            <Link href="/shop" className="text-xs font-medium text-[#E8820C] hover:underline underline-offset-2 flex items-center gap-1">
              Tüm ürünleri gör <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 4. Brake products */}
      {brakeProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100 dark:border-[#2a2d35]">
            <div>
              <p className="text-xs font-medium text-[#E8820C] mb-0.5">Güvenli Sürüş</p>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Fren Disk, Balata & Süspansiyon
              </h2>
            </div>
            <Link href="/shop?category=fren-suspansiyon" className="text-xs font-medium text-[#E8820C] hover:underline underline-offset-2 flex items-center gap-1">
              Tüm fren parçaları <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {brakeProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 5. Trust bar — no blur, no neon, clean border */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-gray-200 dark:border-[#2a2d35] rounded-xl bg-white dark:bg-[#111318] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-[#2a2d35]">

            <div className="flex items-start gap-3 p-5">
              <ShieldCheck className="w-5 h-5 text-[#E8820C] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">%100 Şasi Doğrulaması</h4>
                <p className="text-xs text-gray-500 leading-relaxed">17 haneli VIN ile parça uyumu teyit edilir.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-5">
              <Truck className="w-5 h-5 text-[#E8820C] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">Aynı Gün Kargo</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Saat 16:00&apos;ya kadar DHL Express ile sevk.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-5">
              <Award className="w-5 h-5 text-[#E8820C] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">Orijinal & Muadil Garantisi</h4>
                <p className="text-xs text-gray-500 leading-relaxed">PSA/GM onaylı, faturalı A kalite parçalar.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-5">
              <CreditCard className="w-5 h-5 text-[#E8820C] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">iyzico Güvenli Ödeme</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Tüm kartlara taksit, 14 gün iade hakkı.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
