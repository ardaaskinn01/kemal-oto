'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../types/database.types';
import { formatCurrency } from '../../lib/utils';
import { ShoppingCart, CheckCircle2, AlertTriangle, ShieldCheck, Wrench, Truck } from 'lucide-react';
import { useGarage } from '../../contexts/GarageContext';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { activeVehicle, isProductCompatible } = useGarage();
  const { addToCart } = useCart();

  const discountPercent = product.discount_price
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  const compatibility = isProductCompatible(product);

  return (
    <div className="group relative bg-white dark:bg-[#111318] border-2 border-slate-200 dark:border-[#2a2d35] rounded-2xl overflow-hidden hover:border-[#E8820C] dark:hover:border-[#E8820C] transition-all flex flex-col shadow-sm hover:shadow-md">

      {/* Top badges — solid, punchy industrial labels */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
        {product.is_original ? (
          <span className="border-2 border-amber-500 bg-amber-500 text-white text-xs font-black px-2.5 py-1 rounded-md shadow-sm">
            ORİJİNAL OEM
          </span>
        ) : (
          <span className="border-2 border-slate-400 dark:border-slate-600 bg-slate-900 text-white text-xs font-black px-2.5 py-1 rounded-md shadow-sm">
            A KALİTE
          </span>
        )}
        {discountPercent > 0 && (
          <span className="border-2 border-red-500 bg-red-500 text-white text-xs font-black px-2 py-1 rounded-md shadow-sm">
            -%{discountPercent}
          </span>
        )}
      </div>

      {/* Product image */}
      <Link
        href={`/shop/products/${product.slug}`}
        className="block relative w-full h-48 sm:h-56 bg-slate-50 dark:bg-[#0d0f12] overflow-hidden border-b-2 border-slate-100 dark:border-[#2a2d35]"
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-700">
            <Wrench className="w-10 h-10 stroke-[2]" />
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
        <div className="space-y-2">
          {/* Brand & OEM */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-black text-[#E8820C] uppercase tracking-wider">{product.brand}</span>
            <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 truncate max-w-[130px]">
              {product.part_number}
            </span>
          </div>

          {/* Title */}
          <Link href={`/shop/products/${product.slug}`} className="block">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-[#E8820C] transition-colors">
              {product.title}
            </h3>
          </Link>

          {/* Compatibility badge */}
          {activeVehicle ? (
            <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg ${
              compatibility.compatible
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
            }`}>
              {compatibility.compatible ? (
                <>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="truncate">{activeVehicle.make} {activeVehicle.model} Uyumlu</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span className="truncate">Seçili Araçla Uyumsuz</span>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#E8820C] shrink-0" />
              <span>17 Haneli Şasi ile Doğrulanır</span>
            </div>
          )}
        </div>

        {/* Price + Full Width Action Button */}
        <div className="pt-3 border-t-2 border-slate-100 dark:border-[#2a2d35] space-y-3 mt-auto">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              {product.discount_price ? (
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 line-through font-semibold">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {formatCurrency(product.discount_price)}
                  </span>
                </div>
              ) : (
                <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
              <Truck className="w-3.5 h-3.5 shrink-0" />
              Aynı Gün
            </span>
          </div>

          {/* Big Chunky Add to cart button */}
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="w-full flex items-center justify-center gap-2 bg-[#E8820C] hover:bg-[#d07205] text-white text-sm sm:text-base font-extrabold py-3 px-4 rounded-xl transition-all active:scale-[0.98] shadow-sm cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Sepete Ekle</span>
          </button>
        </div>
      </div>
    </div>
  );
}
