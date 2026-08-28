import React from 'react';
import { getProductBySlug } from '@/app/lib/actions';
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
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { AddToCartButton } from '@/app/components/ui/AddToCartButton';

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

  const discountPercent = product.discount_price
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back button */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-orange-500 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kataloğa Geri Dön</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Product Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative w-full h-[420px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg dark:shadow-2xl">
            <Image
              src={product.image_url}
              alt={product.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 50vw"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.is_original ? (
                <span className="bg-emerald-600/95 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm">
                  <ShieldCheck className="w-4 h-4" /> %100 Orijinal Parça (OEM)
                </span>
              ) : (
                <span className="bg-amber-600/95 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm">
                  <Wrench className="w-4 h-4" /> A Kalite Yan Sanayi / Muadil
                </span>
              )}

              {discountPercent > 0 && (
                <span className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs font-black px-3 py-1 rounded-md shadow-lg uppercase">
                  %{discountPercent} İndirimli
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Details & Purchasing */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-2">
              <span>Marka: {product.brand}</span>
              <span>•</span>
              <span className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-mono px-2.5 py-1 rounded">
                OEM Kodu: {product.part_number}
              </span>
              {product.oem_reference_number && (
                <span className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono px-2 py-0.5 rounded text-[11px]">
                  Ref: {product.oem_reference_number}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-snug">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-3">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold ml-1.5 text-slate-900 dark:text-white">{product.rating}</span>
              </div>
              <span>({product.reviews_count} müşteri yorumu)</span>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Stokta Var ({product.stock} Adet)
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-center justify-between gap-4 shadow-sm">
            <div>
              {product.discount_price ? (
                <div>
                  <span className="text-xs text-slate-400 line-through block">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    {formatCurrency(product.discount_price)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  {formatCurrency(product.price)}
                </span>
              )}
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">KDV Dahil + DHL ile Güvenli Kargo</span>
            </div>

            <AddToCartButton productTitle={product.title} />
          </div>

          {/* Product Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Genel Ürün Açıklaması</h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              {product.description}
            </p>
          </div>

          {/* Technical Description */}
          {product.technical_description && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileCode2 className="w-4 h-4" />
                <span>Teknik Özellikler ve Montaj Açıklaması</span>
              </h3>
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-orange-200 dark:border-orange-500/30 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {product.technical_description}
              </div>
            </div>
          )}

          {/* Vehicle Compatibility */}
          {product.vehicle_compatibility && product.vehicle_compatibility.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Car className="w-4 h-4 text-orange-500" />
                Uyumlu Araç Modelleri
              </h3>
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2 text-xs">
                {product.vehicle_compatibility.map((vc: { brand: string; model: string; years: string }, idx: number) => (
                  <div key={idx} className="flex items-center justify-between border-b border-slate-200 dark:border-slate-900 pb-2 last:border-0 last:pb-0">
                    <span className="font-semibold text-slate-900 dark:text-white">{vc.brand} {vc.model}</span>
                    <span className="text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">{vc.years}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Specifications Key-Value */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Wrench className="w-4 h-4 text-orange-500" />
                Teknik Parametreler
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(product.specs).map(([key, val]: [string, string]) => (
                  <div key={key} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-slate-500 dark:text-slate-400 block text-[10px]">{key}</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300">
                {product.is_original ? '%100 Orijinal Uyum & 2 Yıl Garanti' : 'A Kalite Muadil & 1 Yıl Garanti'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-orange-500 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300">DHL Express ile Hızlı Kargo</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
