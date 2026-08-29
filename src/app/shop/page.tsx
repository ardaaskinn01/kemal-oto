import React from 'react';
import { getCategories, getProducts } from '../lib/actions';
import { ProductCard } from '../components/ui/ProductCard';
import Link from 'next/link';
import { Filter, SlidersHorizontal, Check, ShieldCheck, Car, X } from 'lucide-react';

interface ShopPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    brand?: string;
    model?: string;
    year?: string;
    vin?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const searchQuery = params.q || '';
  const categorySlug = params.category || '';
  const brandFilter = params.brand || '';
  const modelFilter = params.model || '';
  const vinFilter = params.vin || '';

  const products = await getProducts({
    searchQuery,
    categorySlug,
    brand: brandFilter,
    model: modelFilter,
    vin: vinFilter,
  });

  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* VIN / Vehicle Active Filter Banner */}
      {(vinFilter || brandFilter) && (
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-500/30 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase text-emerald-800 dark:text-emerald-400">
                  Şasi & Araç Filtresi Aktif
                </span>
                {vinFilter && (
                  <span className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                    VIN: {vinFilter}
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {brandFilter} {modelFilter} İçin Uyumlu Parçalar
              </h2>
            </div>
          </div>

          <div>
            <Link
              href="/shop"
              className="bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 border border-slate-300 dark:border-slate-700 font-semibold"
            >
              <X className="w-3.5 h-3.5" />
              <span>Filtreyi Temizle</span>
            </Link>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Yedek Parça Kataloğu</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {searchQuery ? `"${searchQuery}" arama sonuçları` : 'Opel, Peugeot, Citroën, Chevrolet ve DS grubu parçaları'}
          </p>
        </div>
        <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
          Toplam <strong>{products.length}</strong> ürün listeleniyor
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar Filters */}
        <aside className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-4">
            
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs border-b border-slate-200 dark:border-slate-800 pb-2.5">
              <Filter className="w-3.5 h-3.5 text-orange-600" />
              <span>Kategoriler</span>
            </div>

            <ul className="space-y-1 text-xs">
              <li>
                <Link
                  href={vinFilter ? `/shop?vin=${vinFilter}&brand=${brandFilter}&model=${modelFilter}` : '/shop'}
                  className={`flex items-center justify-between py-2 px-2.5 rounded-lg transition-colors ${
                    !categorySlug
                      ? 'bg-orange-600 text-white font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>Tüm Kategoriler</span>
                  {!categorySlug && <Check className="w-3.5 h-3.5" />}
                </Link>
              </li>
              {categories.map((cat) => {
                const isActive = categorySlug === cat.slug;
                const filterUrl = vinFilter
                  ? `/shop?category=${cat.slug}&vin=${vinFilter}&brand=${brandFilter}&model=${modelFilter}`
                  : `/shop?category=${cat.slug}`;

                return (
                  <li key={cat.id}>
                    <Link
                      href={filterUrl}
                      className={`flex items-center justify-between py-2 px-2.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-orange-600 text-white font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[10px] opacity-75">({cat.item_count})</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Brand filter list */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <span className="font-bold text-slate-900 dark:text-white block text-[11px]">Markalar:</span>
              <div className="flex flex-wrap gap-1.5">
                {['Opel', 'Peugeot', 'Citroën', 'Chevrolet', 'DS Automobiles'].map((b) => (
                  <Link
                    key={b}
                    href={`/shop?brand=${encodeURIComponent(b)}`}
                    className="bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 px-2 py-1 rounded text-[11px] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 transition-colors"
                  >
                    {b}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Right Main Product List */}
        <main className="lg:col-span-3">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 text-center space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Aradığınız kriterlere uygun parça bulunamadı.</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Arama terimini değiştirebilir veya 0542 292 44 92 numaralı hattımızdan şasi no ile parça teyidi alabilirsiniz.
              </p>
              <Link
                href="/shop"
                className="inline-block bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Filtreleri Sıfırla
              </Link>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
