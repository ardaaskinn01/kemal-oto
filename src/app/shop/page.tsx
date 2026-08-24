import React from 'react';
import { getCategories, getProducts } from '../lib/actions';
import { ProductCard } from '../components/ui/ProductCard';
import Link from 'next/link';
import { Filter, SlidersHorizontal, Check } from 'lucide-react';

interface ShopPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    brand?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const searchQuery = params.q || '';
  const categorySlug = params.category || '';
  const brandFilter = params.brand || '';

  const products = await getProducts({
    searchQuery,
    categorySlug,
  });

  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Yedek Parça Kataloğu</h1>
          <p className="text-xs text-slate-400 mt-1">
            {searchQuery ? `"${searchQuery}" için arama sonuçları` : 'Tüm araç modelleri için orijinal parça listesi'}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-800">
          <SlidersHorizontal className="w-4 h-4 text-orange-500" />
          <span>Toplam {products.length} ürün bulundu</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar Filters */}
        <aside className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            
            <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-slate-800 pb-3">
              <Filter className="w-4 h-4 text-orange-500" />
              <span>Kategoriye Göre Filtrele</span>
            </div>

            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/shop"
                  className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${
                    !categorySlug
                      ? 'bg-orange-500 text-white font-bold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>Tüm Kategoriler</span>
                  {!categorySlug && <Check className="w-4 h-4" />}
                </Link>
              </li>
              {categories.map((cat) => {
                const isActive = categorySlug === cat.slug;
                return (
                  <li key={cat.id}>
                    <Link
                      href={`/shop?category=${cat.slug}`}
                      className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-orange-500 text-white font-bold'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[10px] opacity-75">({cat.item_count})</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Brand notice */}
            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
              <span className="font-semibold text-white block">Stoktaki Popüler Markalar:</span>
              <div className="flex flex-wrap gap-1.5">
                {['Brembo', 'Bosch', 'Osram', 'Sachs', 'Liqui Moly', 'Valeo', 'NGK'].map((b) => (
                  <span key={b} className="bg-slate-950 px-2 py-1 rounded border border-slate-800 text-[10px] text-slate-300">
                    {b}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Right Main Product List */}
        <main className="lg:col-span-3 space-y-6">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
              <h3 className="text-xl font-bold text-white">Aradığınız kriterlere uygun parça bulunamadı.</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Arama terimini değiştirebilir veya 0850 300 00 00 numaralı destek hattımızdan şase no ile sorgulatabilirsiniz.
              </p>
              <Link
                href="/shop"
                className="inline-block bg-orange-500 text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors"
              >
                Filtreleri Temizle
              </Link>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
