'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../types/database.types';
import { formatCurrency } from '../../lib/utils';
import { ShoppingCart, CheckCircle2, AlertTriangle, ShieldCheck, Wrench, Truck, Sparkles } from 'lucide-react';
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
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-amber-400 dark:hover:border-amber-400 transition-all flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-0.5">
      
      {/* Top Left Badges: Quality & Discount */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-wrap gap-1 max-w-[70%]">
        {product.is_original ? (
          <span className="bg-slate-950 text-amber-400 border border-amber-400/40 text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-amber-400" /> ORİJİNAL OEM
          </span>
        ) : (
          <span className="bg-slate-800 text-slate-100 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
            <Wrench className="w-3 h-3 text-amber-400" /> A KALİTE MUADİL
          </span>
        )}

        {discountPercent > 0 && (
          <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-md animate-pulse">
            -%{discountPercent}
          </span>
        )}
      </div>

      {/* Top Right: Stock Status ("Aynı Gün Kargo") */}
      <div className="absolute top-2.5 right-2.5 z-10">
        <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[9px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1 backdrop-blur-sm">
          <Truck className="w-2.5 h-2.5" /> Aynı Gün Kargo
        </span>
      </div>

      {/* Product Image */}
      <Link href={`/shop/products/${product.slug}`} className="block relative w-full h-44 sm:h-48 bg-slate-50 dark:bg-slate-950 overflow-hidden border-b border-slate-100 dark:border-slate-800/80">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <Wrench className="w-8 h-8" />
          </div>
        )}
      </Link>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand, OEM Number & Vin Check Tag */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1.5 gap-2">
            <span className="font-extrabold text-amber-500 uppercase tracking-wide">{product.brand}</span>
            <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate max-w-[120px]">
              OEM: {product.part_number}
            </span>
          </div>

          {/* Title */}
          <Link href={`/shop/products/${product.slug}`} className="block group-hover:text-amber-500 transition-colors">
            <h3 className="text-slate-900 dark:text-white font-bold text-xs sm:text-sm line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* Garage Vehicle Compatibility Indicator */}
          {activeVehicle ? (
            <div
              className={`flex items-center gap-1.5 text-[10px] font-bold mt-2.5 px-2.5 py-1 rounded-lg border ${
                compatibility.compatible
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/40'
              }`}
            >
              {compatibility.compatible ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{activeVehicle.make} {activeVehicle.model} (%100 UYUMLU)</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">Seçili Aracınızla Uyumsuz</span>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 mt-2">
              <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
              <span className="truncate">Şasi Kontrollü Güvenli Teslimat</span>
            </div>
          )}
        </div>

        {/* Price & Action */}
        <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <div>
            {product.discount_price ? (
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] text-slate-400 line-through">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {formatCurrency(product.discount_price)}
                </span>
              </div>
            ) : (
              <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-extrabold px-3 py-2 rounded-xl transition-all shadow-md shadow-amber-400/20 active:scale-95 cursor-pointer shrink-0"
          >
            <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>SEPETE EKLE</span>
          </button>
        </div>

      </div>
    </div>
  );
}
