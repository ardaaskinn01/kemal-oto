import React from 'react';
import { getCategories, getProducts } from '../lib/actions';
import { ProductCard } from '../components/ui/ProductCard';
import { ShopFilters } from '../components/shop/ShopFilters';
import { ShopSortSelect } from '../components/shop/ShopSortSelect';
import { getBrandLogo } from '../data/brandLogos';
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* 1. Breadcrumb & Brand Hero Header (Matches reference image) */}
        {brandFilter ? (
          <div className="space-y-4 pb-4 border-b border-slate-200 dark:border-[#2a2d35]">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Link href="/" className="hover:text-[#E8820C] transition-colors">Anasayfa</Link>
              <span>›</span>
              <Link href={`/shop?brand=${encodeURIComponent(brandFilter)}`} className="text-slate-700 dark:text-slate-300 font-bold hover:text-[#E8820C]">
                {brandFilter.toUpperCase()}
              </Link>
              {modelFilter && (
                <>
                  <span>›</span>
                  <span className="text-[#E8820C] font-black">{modelFilter.toUpperCase()}</span>
                </>
              )}
            </nav>

            {/* Brand Emblem & Title Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                {getBrandLogo(brandFilter) ? (
                  <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#151922] border-2 border-slate-200 dark:border-[#2a2d35] flex items-center justify-center text-slate-900 dark:text-white p-2.5 shadow-sm shrink-0">
                    {getBrandLogo(brandFilter, "w-10 h-10 text-slate-900 dark:text-white")}
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-[#E8820C]/10 border-2 border-[#E8820C]/30 flex items-center justify-center text-[#E8820C] shrink-0">
                    <Car className="w-8 h-8" />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    {brandFilter} {modelFilter && <span className="text-[#E8820C]">{modelFilter}</span>}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold mt-0.5">
                    {products.length.toLocaleString('tr-TR')} Ürün Listeleniyor
                  </p>
                </div>
              </div>

              {/* Active filter pills */}
              <div className="flex flex-wrap items-center gap-2">
                {modelFilter && (
                  <Link
                    href={`/shop?brand=${encodeURIComponent(brandFilter)}`}
                    className="flex items-center gap-1.5 bg-orange-100 dark:bg-orange-950/50 text-[#E8820C] text-xs font-bold px-3 py-1.5 rounded-full border border-orange-200 dark:border-orange-800 hover:bg-orange-200 transition-colors"
                  >
                    <span>{modelFilter}</span>
                    <X className="w-3.5 h-3.5" />
                  </Link>
                )}
                {categorySlug && (
                  <Link
                    href={`/shop?brand=${encodeURIComponent(brandFilter)}${modelFilter ? '&model=' + encodeURIComponent(modelFilter) : ''}`}
                    className="flex items-center gap-1.5 bg-slate-100 dark:bg-[#1a1d23] text-slate-700 dark:text-slate-300 text-xs font-bold px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 hover:border-[#E8820C] hover:text-[#E8820C] transition-colors"
                  >
                    <span>{currentCatObj?.name || categorySlug}</span>
                    <X className="w-3.5 h-3.5" />
                  </Link>
                )}
                <Link
                  href="/shop"
                  className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors ml-1"
                >
                  Tümünü Temizle
                </Link>
              </div>
            </div>

            {/* In-brand search form (Matches reference image) */}
            <form method="GET" action="/shop" className="flex items-center max-w-xl">
              <input type="hidden" name="brand" value={brandFilter} />
              {modelFilter && <input type="hidden" name="model" value={modelFilter} />}
              {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="q"
                  defaultValue={searchQuery}
                  placeholder={`${brandFilter} içinde parça ara (örn: fren balatası, filtre)...`}
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#111318] border-2 border-r-0 border-slate-200 dark:border-[#2a2d35] rounded-l-xl text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#E8820C]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#E8820C] hover:bg-[#d4740a] text-white px-6 py-2.5 rounded-r-xl text-sm font-black transition-colors cursor-pointer shrink-0"
              >
                Ara
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-slate-200 dark:border-[#2a2d35]">
            <div>
              <p className="text-xs text-[#E8820C] font-black uppercase tracking-wider mb-0.5">Yedek Parça Kataloğu</p>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {currentCatObj ? currentCatObj.name : 'Tüm Yedek Parçalar'}
              </h1>
            </div>
            {categorySlug && (
              <Link href="/shop" className="flex items-center gap-1 bg-slate-100 dark:bg-[#1a1d23] text-slate-700 dark:text-slate-300 text-xs font-bold px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 hover:border-[#E8820C] hover:text-[#E8820C] transition-colors self-start sm:self-auto">
                {currentCatObj?.name || categorySlug} <X className="w-3 h-3" />
              </Link>
            )}
          </div>
        )}

        {/* 2. Sort / count bar */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            <span className="font-black text-slate-900 dark:text-white">{products.length}</span> parça bulundu
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-400">Sırala:</span>
            <form method="GET" action="/shop">
              {searchQuery && <input type="hidden" name="q" value={searchQuery} />}
              {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
              {brandFilter && <input type="hidden" name="brand" value={brandFilter} />}
              {modelFilter && <input type="hidden" name="model" value={modelFilter} />}
              {qualityFilter && <input type="hidden" name="quality" value={qualityFilter} />}
              {inStockFilter && <input type="hidden" name="inStock" value="true" />}
              {params.minPrice && <input type="hidden" name="minPrice" value={params.minPrice} />}
              {params.maxPrice && <input type="hidden" name="maxPrice" value={params.maxPrice} />}
              <ShopSortSelect sortFilter={sortFilter} />
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
              <div className="border border-slate-200 dark:border-[#2a2d35] bg-white dark:bg-[#111318] rounded-xl p-12 text-center space-y-4">
                <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
                <div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                    Uygun parça bulunamadı
                  </h3>
                  <p className="text-sm text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
                    Arama teriminizi değiştirin veya <strong className="text-slate-600 dark:text-slate-300">0542 292 44 92</strong> numaralı hattı arayın.
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1.5 bg-[#E8820C] hover:bg-[#d4740a] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Filtreleri Temizle
                </Link>
              </div>
            )}
          </main>

        </div>
      </div>
    </>
  );
}
