import React from 'react';
import { getCategories, getProducts } from '../lib/actions';
import { ProductCard } from '../components/ui/ProductCard';
import { ShopFilters } from '../components/shop/ShopFilters';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  Filter, 
  SlidersHorizontal, 
  Check, 
  ShieldCheck, 
  Car, 
  X, 
  ArrowUpDown,
  Search,
  Wrench,
  Truck,
  RotateCcw
} from 'lucide-react';

interface ShopPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    brand?: string;
    model?: string;
    year?: string;
    vin?: string;
    quality?: string;
    inStock?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  }>;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.onlinehizliparca.com';

// Dynamic Catalog Metadata for SEO
export async function generateMetadata({ searchParams }: ShopPageProps): Promise<Metadata> {
  const params = await searchParams;
  const brand = params.brand || '';
  const category = params.category || '';
  const q = params.q || '';

  let title = 'Yedek Parça Kataloğu | Opel, Peugeot, Citroën, Chevrolet, DS';
  if (brand && category) {
    title = `${brand} ${category} Yedek Parçaları | Online Hızlı Parça`;
  } else if (brand) {
    title = `${brand} Yedek Parçaları & Aksesuarları | Online Hızlı Parça`;
  } else if (q) {
    title = `"${q}" Arama Sonuçları | Online Hızlı Parça`;
  }

  const description = `${brand || 'Opel, Peugeot, Citroën, Chevrolet, DS'} araçlar için %100 uyumlu orijinal OEM ve A kalite muadil yedek parçalar. 81 il aynı gün hızlı kargo ve şasi no ile doğrulama.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/shop`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/shop`,
      siteName: 'Online Hızlı Parça',
    },
  };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const searchQuery = params.q || '';
  const categorySlug = params.category || '';
  const brandFilter = params.brand || '';
  const modelFilter = params.model || '';
  const vinFilter = params.vin || '';
  const qualityFilter = params.quality || '';
  const inStockFilter = params.inStock === 'true';
  const minPriceFilter = params.minPrice ? parseFloat(params.minPrice) : undefined;
  const maxPriceFilter = params.maxPrice ? parseFloat(params.maxPrice) : undefined;
  const sortFilter = params.sort || 'popular';

  const products = await getProducts({
    searchQuery,
    categorySlug,
    brand: brandFilter,
    model: modelFilter,
    vin: vinFilter,
    quality: qualityFilter,
    inStock: inStockFilter,
    minPrice: minPriceFilter,
    maxPrice: maxPriceFilter,
    sort: sortFilter,
  });

  const categories = await getCategories();
  const currentCatObj = categories.find((c) => c.slug === categorySlug);

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Yedek Parça Kataloğu',
        item: `${baseUrl}/shop`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* 1. VIN / Vehicle Active Filter Banner & Şasi Sorgulama Bandı */}
        {(vinFilter || brandFilter) ? (
          <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0">
                <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black uppercase text-amber-400 tracking-wider">
                    Şasi & Araç Filtresi Aktif
                  </span>
                  {vinFilter && (
                    <span className="bg-slate-950 text-slate-200 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-700 font-bold">
                      VIN: {vinFilter}
                    </span>
                  )}
                </div>
                <h2 className="text-base sm:text-lg font-black text-white">
                  {brandFilter} {modelFilter} İçin Uyumlu Yedek Parçalar
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/shop"
                className="bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 font-extrabold border border-slate-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Filtreyi Temizle</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Standard Header Banner for Shop Page */
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 text-white rounded-2xl p-5 sm:p-7 border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-widest block mb-1">
                ONLINE YEDEK PARÇA KATALOĞU
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                {currentCatObj ? currentCatObj.name : 'Tüm Yedek Parçalar & Bakım Ürünleri'}
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Opel, Peugeot, Citroën, Chevrolet ve DS araçları için 100% şasi uyum garantili parçalar
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800 text-xs text-slate-300 font-bold shrink-0">
              <Truck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>81 İle Aynı Gün Kargo</span>
            </div>
          </div>
        )}

        {/* 2. Sorting & Listing Top Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <span>Toplam <strong className="text-amber-500 font-black text-sm">{products.length}</strong> adet parça listeleniyor</span>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            <span className="text-slate-500 font-bold text-[11px] whitespace-nowrap">Sıralama:</span>
            <form method="GET" action="/shop" className="flex items-center">
              {searchQuery && <input type="hidden" name="q" value={searchQuery} />}
              {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
              {brandFilter && <input type="hidden" name="brand" value={brandFilter} />}
              {modelFilter && <input type="hidden" name="model" value={modelFilter} />}
              {qualityFilter && <input type="hidden" name="quality" value={qualityFilter} />}
              {inStockFilter && <input type="hidden" name="inStock" value="true" />}
              {params.minPrice && <input type="hidden" name="minPrice" value={params.minPrice} />}
              {params.maxPrice && <input type="hidden" name="maxPrice" value={params.maxPrice} />}

              <select
                name="sort"
                defaultValue={sortFilter}
                // @ts-ignore
                onChange={(e) => e.target.form?.submit()}
                className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-extrabold focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="popular">Popülerliğe Göre</option>
                <option value="price_asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price_desc">Fiyat: Yüksekten Düşüğe</option>
                <option value="newest">En Yeniler</option>
              </select>
            </form>
          </div>
        </div>

        {/* 3. Main Catalog Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          <ShopFilters categories={categories} totalProductsCount={products.length} />

          <main className="lg:col-span-3">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 sm:p-14 text-center space-y-4 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-amber-400/10 text-amber-500 flex items-center justify-center mx-auto">
                  <Search className="w-7 h-7 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    Aradığınız Kriterlere Uygun Parça Bulunamadı
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                    Lütfen arama terimini değiştirin veya <strong>0542 292 44 92</strong> Müşteri Destek hattımızı arayarak ruhsat şasi numaranızla parça teyidi alın.
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black px-5 py-2.5 rounded-xl transition-all shadow-md shadow-amber-400/20"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>TÜM FİLTRELERİ SIFIRLA</span>
                </Link>
              </div>
            )}
          </main>

        </div>
      </div>
    </>
  );
}
