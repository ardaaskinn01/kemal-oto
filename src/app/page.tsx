import React from 'react';
import Link from 'next/link';
import { HeroBanner } from './components/ui/HeroBanner';
import { CategoryCard } from './components/ui/CategoryCard';
import { ProductCard } from './components/ui/ProductCard';
import { getCategories, getProducts } from './lib/actions';
import { ChevronRight, Wrench, ShieldCheck, Headphones, Zap } from 'lucide-react';

export default async function HomePage() {
  const categories = await getCategories();
  const featuredProducts = await getProducts({ featuredOnly: true });

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner with Vehicle Selector */}
      <HeroBanner />

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-orange-500 font-bold text-xs uppercase tracking-wider">
              Geniş Parça Kataloğu
            </span>
            <h2 className="text-3xl font-black text-white mt-1">Öne Çıkan Kategoriler</h2>
          </div>
          <Link
            href="/shop/categories"
            className="flex items-center gap-1 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            Tüm Kategoriler
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-orange-500 font-bold text-xs uppercase tracking-wider">
              En Çok Tercih Edilenler
            </span>
            <h2 className="text-3xl font-black text-white mt-1">Çok Satan Yedek Parçalar</h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-1 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            Tüm Parçaları Gör
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Kemal Oto Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-orange-500 font-bold text-xs uppercase tracking-wider">
              Neden Kemal Oto?
            </span>
            <h2 className="text-3xl font-black text-white mt-2">
              Aracınız İçin En Güvenilir Çözüm Ortağınız
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              40 yılı aşkın otomotiv tecrübesiyle aracınızın ihtiyaç duyduğu parçaları en hızlı ve en güvenli şekilde kapınıza getiriyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-950/60 border border-slate-800 p-6 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Şase No Doğrulaması</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Yanlış parça alma riskine son. Uzman teknisyenlerimiz şase numaranız üzerinden %100 uyumlu parçayı doğrular.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 p-6 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Işık Hızında Teslimat</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Stoktan hemen teslim imkanıyla siparişleriniz aynı gün kargoya verilir, sanayi bekleme süreniz kısalır.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 p-6 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">7/24 Teknik Destek</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Montaj, parça uyumu veya parça kodları hakkında aklınıza takılan her soruda usta ekibimiz yanınızda.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
