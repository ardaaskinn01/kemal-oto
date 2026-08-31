import React from 'react';
import { getProductBySlug, getProducts } from '@/app/lib/actions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatCurrency } from '@/app/lib/utils';
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  Car, 
  CheckCircle2, 
  Wrench, 
  ArrowLeft,
  FileCode2,
  Sparkles,
  Award,
  RotateCcw,
  ShoppingCart,
  Package
} from 'lucide-react';
import Link from 'next/link';
import { AddToCartButton } from '@/app/components/ui/AddToCartButton';
import { ProductVinCheck } from '@/app/components/product/ProductVinCheck';
import { ProductTabsAndCrossRef } from '@/app/components/product/ProductTabsAndCrossRef';
import { ProductCard } from '@/app/components/ui/ProductCard';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts({});
  // Frequently bought together / Related products
  const relatedProducts = allProducts.filter(
    (p) => p.id !== product.id && (p.category_slug === product.category_slug || p.brand === product.brand)
  ).slice(0, 4);

  const discountPercent = product.discount_price
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Navigation Breadcrumb & Back button */}
      <div className="flex items-center justify-between">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Yedek Parça Kataloğuna Dön</span>
        </Link>
        <span className="text-xs text-slate-500 font-mono hidden sm:inline">
          Kategori: {product.category}
        </span>
      </div>

      {/* Main Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* Left Column: Product Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative w-full h-80 sm:h-96 lg:h-[450px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1200px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <Wrench className="w-12 h-12" />
              </div>
            )}

            {/* Badges on Image */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 max-w-[90%] z-10">
              {product.is_original ? (
                <span className="bg-slate-950 text-amber-400 border border-amber-400/40 text-xs font-black px-3 py-1.5 rounded-xl shadow-lg uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" /> %100 ORİJİNAL OEM
                </span>
              ) : (
                <span className="bg-slate-900 text-slate-100 border border-slate-700 text-xs font-black px-3 py-1.5 rounded-xl shadow-lg uppercase tracking-wider flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-amber-400" /> A KALİTE MUADİL
                </span>
              )}

              {discountPercent > 0 && (
                <span className="bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg uppercase animate-pulse">
                  %{discountPercent} İNDİRİM
                </span>
              )}
            </div>

            <div className="absolute bottom-4 left-4 z-10">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black px-3 py-1 rounded-lg backdrop-blur-md flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" /> Aynı Gün Kargo (16:00 &apos;ya Kadar)
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Interactive VIN Verification & Purchase Box */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            {/* Brand, OEM Number & Reference */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-black text-amber-500 uppercase tracking-wider mb-2">
              <span>{product.brand}</span>
              <span>•</span>
              <span className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-mono px-2.5 py-1 rounded-lg text-xs">
                OEM: {product.part_number}
              </span>
              {product.oem_reference_number && (
                <span className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono px-2 py-1 rounded-lg text-[11px]">
                  Ref: {product.oem_reference_number}
                </span>
              )}
            </div>

            {/* Product Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white leading-snug">
              {product.title}
            </h1>

            {/* Sub-Badges Bar: Stock & Warranty */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-extrabold ml-1 text-slate-900 dark:text-white">{product.rating}</span>
                <span className="text-[11px] text-slate-500 ml-1">({product.reviews_count} değerlendirme)</span>
              </div>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 shrink-0" /> Stokta Hazır ({product.stock} Adet)
              </span>
              <span>•</span>
              <span className="text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                {product.is_original ? '2 Yıl Garanti' : '1 Yıl Garanti'}
              </span>
            </div>
          </div>

          {/* Interactive VIN / Şasi Check Widget (OnlineYedekParça Signature Feature) */}
          <ProductVinCheck product={product} />

          {/* Pricing & Add To Cart Box */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">FİYAT</span>
              {product.discount_price ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {formatCurrency(product.discount_price)}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    {formatCurrency(product.price)}
                  </span>
                </div>
              ) : (
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {formatCurrency(product.price)}
                </span>
              )}
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 font-semibold">
                KDV Dahil • Ücretsiz Kargo
              </span>
            </div>

            <div className="w-full sm:w-auto">
              <AddToCartButton product={product} />
            </div>
          </div>

          {/* Trust Value Badges */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] font-bold text-slate-700 dark:text-slate-300">
            <div className="bg-slate-100 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Şasi Doğrulamalı</span>
            </div>
            <div className="bg-slate-100 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Bugün Kargoda</span>
            </div>
            <div className="bg-slate-100 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-blue-500 shrink-0" />
              <span>14 Gün İade</span>
            </div>
          </div>

        </div>

      </div>

      {/* Zengin Tablar: Uyumlu Araç Modelleri Tablosu, Çapraz OEM Numaraları ve Genel Açıklama */}
      <ProductTabsAndCrossRef product={product} />

      {/* Bu Ürünle Birlikte Sık Alınanlar & Benzer Ürünler Slider/Grid */}
      {relatedProducts.length > 0 && (
        <section className="pt-6 space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Bu Ürünle Birlikte Sık Alınanlar & Benzer Parçalar
              </h2>
            </div>
            <Link href="/shop" className="text-xs font-extrabold text-amber-500 hover:underline">
              Tüm Kataloğu Gör →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
