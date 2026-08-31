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
    <div className="group relative bg-white dark:bg-[#111318] border border-gray-200 dark:border-[#2a2d35] rounded-xl overflow-hidden hover:border-[#E8820C] dark:hover:border-[#E8820C] transition-colors flex flex-col shadow-sm">

      {/* Top badges — no bg, border + colored text only */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-wrap gap-1">
        {product.is_original ? (
          <span className="border border-amber-400/60 text-amber-600 dark:text-amber-400 text-[10px] font-medium px-1.5 py-0.5 rounded bg-white/80 dark:bg-[#111318]/80 backdrop-blur-sm">
            OEM
          </span>
        ) : (
          <span className="border border-gray-300 dark:border-[#2a2d35] text-gray-500 dark:text-gray-400 text-[10px] font-medium px-1.5 py-0.5 rounded bg-white/80 dark:bg-[#111318]/80 backdrop-blur-sm">
            A Kalite
          </span>
        )}
        {discountPercent > 0 && (
          <span className="border border-red-300 text-red-600 dark:text-red-400 text-[10px] font-medium px-1.5 py-0.5 rounded bg-white/80 dark:bg-[#111318]/80 backdrop-blur-sm">
            -%{discountPercent}
          </span>
        )}
      </div>

      {/* Product image */}
      <Link
        href={`/shop/products/${product.slug}`}
        className="block relative w-full h-40 sm:h-44 bg-gray-50 dark:bg-[#0d0f12] overflow-hidden border-b border-gray-100 dark:border-[#2a2d35]"
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-700">
            <Wrench className="w-8 h-8" />
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-3.5 flex-1 flex flex-col gap-2.5">
        <div>
          {/* Brand & OEM */}
          <div className="flex items-center justify-between mb-1.5 gap-2">
            <span className="text-[11px] font-medium text-[#E8820C]">{product.brand}</span>
            <span className="font-mono text-[10px] text-gray-400 dark:text-gray-500 truncate max-w-[110px]">
              {product.part_number}
            </span>
          </div>

          {/* Title */}
          <Link href={`/shop/products/${product.slug}`} className="block">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-[#E8820C] transition-colors">
              {product.title}
            </h3>
          </Link>

          {/* Compatibility — inline, no card box */}
          {activeVehicle ? (
            <div className={`flex items-center gap-1.5 text-[11px] mt-2 ${
              compatibility.compatible
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-amber-600 dark:text-amber-400'
            }`}>
              {compatibility.compatible ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{activeVehicle.make} {activeVehicle.model} ile uyumlu</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Seçili araçla uyumsuz</span>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 shrink-0" />
              <span>Şasi kontrollü teslimat</span>
            </div>
          )}
        </div>

        {/* Price + action */}
        <div className="flex items-end justify-between gap-2 pt-2.5 border-t border-gray-100 dark:border-[#2a2d35] mt-auto">
          <div>
            {product.discount_price ? (
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] text-gray-400 line-through">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-base font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(product.discount_price)}
                </span>
              </div>
            ) : (
              <span className="text-base font-semibold text-gray-900 dark:text-white">
                {formatCurrency(product.price)}
              </span>
            )}
            {/* Aynı Gün Kargo — below price, small green text */}
            <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-500 mt-0.5">
              <Truck className="w-3 h-3 shrink-0" />
              Aynı gün kargo
            </span>
          </div>

          {/* Add to cart — right-aligned, compact, sentence case */}
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 bg-[#E8820C] hover:bg-[#d4740a] text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Sepete ekle</span>
          </button>
        </div>
      </div>
    </div>
  );
}
