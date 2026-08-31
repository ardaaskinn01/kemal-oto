import React from 'react';
import { getCategories, getProducts } from '../lib/actions';
import { ProductCard } from '../components/ui/ProductCard';
import { ShopFilters } from '../components/shop/ShopFilters';
import { ShopSortSelect } from '../components/shop/ShopSortSelect';
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
        
        {/* 1. Page header */}
        {(vinFilter || brandFilter) ? (
          <div className="border border-gray-200 dark:border-[#2a2d35] bg-white dark:bg-[#111318] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs text-[#E8820C] font-medium mb-0.5">Araç Filtresi Aktif</p>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                {brandFilter} {modelFilter} için uyumlu parçalar
              </h2>
              {vinFilter && (
                <span className="font-mono text-xs text-gray-400 mt-0.5 block">VIN: {vinFilter}</span>
              )}
            </div>
            <Link
              href="/shop"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 border border-gray-200 dark:border-[#2a2d35] px-3 py-1.5 rounded-lg transition-colors shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Filtreyi temizle
            </Link>
          </div>
        ) : (
          <div className="border-b border-gray-100 dark:border-[#2a2d35] pb-4">
            <p className="text-xs text-[#E8820C] font-medium mb-0.5">Yedek Parça Kataloğu</p>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {currentCatObj ? currentCatObj.name : 'Tüm Yedek Parçalar'}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Opel, Peugeot, Citroën, Chevrolet ve DS araçları için şasi uyum garantili parçalar
            </p>
          </div>
        )}

        {/* 2. Sort bar */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-white">{products.length}</span> parça listeleniyor
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Sırala:</span>
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
              <div className="border border-gray-200 dark:border-[#2a2d35] bg-white dark:bg-[#111318] rounded-xl p-10 text-center space-y-3">
                <Search className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto" />
                <div>
                  <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                    Uygun parça bulunamadı
                  </h3>
                  <p className="text-sm text-gray-400 max-w-md mx-auto mt-1 leading-relaxed">
                    Arama teriminizi değiştirin veya <strong className="text-gray-600 dark:text-gray-300">0542 292 44 92</strong> numaralı hattı arayın.
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1.5 bg-[#E8820C] hover:bg-[#d4740a] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Filtreleri temizle
                </Link>
              </div>
            )}
          </main>

        </div>
      </div>
    </>
  );
}
