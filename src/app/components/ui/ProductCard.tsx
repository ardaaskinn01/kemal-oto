'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../types/database.types';
import { formatCurrency } from '../../lib/utils';
import { ShoppingCart, CheckCircle2, AlertTriangle, ShieldCheck, Wrench } from 'lucide-react';
import { useGarage } from '../../contexts/GarageContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { activeVehicle, isProductCompatible } = useGarage();

  const discountPercent = product.discount_price
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  const compatibility = isProductCompatible(product);

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-orange-500/80 transition-all flex flex-col justify-between shadow-sm hover:shadow-md">
      
      {/* Top Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-1 max-w-[65%]">
        {product.is_original ? (
          <span className="bg-emerald-700 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1">
            <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> OEM
          </span>
        ) : (
          <span className="bg-slate-700 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1">
            <Wrench className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Muadil
          </span>
        )}

        {discountPercent > 0 && (
          <span className="bg-red-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
            -%{discountPercent}
          </span>
        )}
      </div>

      {/* OEM Number Tag */}
      <div className="absolute top-2 right-2 z-10">
        <span className="bg-white/95 dark:bg-slate-950/95 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded truncate max-w-[100px] block">
          {product.part_number}
        </span>
      </div>

      {/* Product Image */}
      <Link href={`/shop/products/${product.slug}`} className="block relative w-full h-40 sm:h-44 bg-slate-50 dark:bg-slate-950 overflow-hidden border-b border-slate-100 dark:border-slate-800/80">
        <Image
          src={product.image_url}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </Link>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
            <span className="font-bold text-orange-600 dark:text-orange-400 uppercase">{product.brand}</span>
            <span className="truncate max-w-[110px]">{product.category}</span>
          </div>

          {/* Title */}
          <Link href={`/shop/products/${product.slug}`} className="block group-hover:text-orange-600 transition-colors">
            <h3 className="text-slate-900 dark:text-white font-semibold text-xs sm:text-sm line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* Garage Vehicle Compatibility Indicator */}
          {activeVehicle ? (
            <div
              className={`flex items-center gap-1 text-[10px] font-medium mt-2 px-2 py-1 rounded border ${
                compatibility.compatible
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-500/30'
              }`}
            >
              {compatibility.compatible ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span className="truncate font-semibold">{activeVehicle.make} {activeVehicle.model} ile %100 Uyumlu</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                  <span className="truncate">Seçili Aracınızla Uyumsuz</span>
                </>
              )}
            </div>
          ) : (
            product.vehicle_compatibility && product.vehicle_compatibility.length > 0 && (
              <span className="inline-block text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-full mt-1.5">
                Uyum: {product.vehicle_compatibility[0].brand} {product.vehicle_compatibility[0].model}
              </span>
            )
          )}
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            {product.discount_price ? (
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400 line-through">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-base font-extrabold text-slate-900 dark:text-white">
                  {formatCurrency(product.discount_price)}
                </span>
              </div>
            ) : (
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => alert(`"${product.title}" sepete eklendi!`)}
            className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Sepete Ekle</span>
          </button>
        </div>

      </div>
    </div>
  );
}
