'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../types/database.types';
import { formatCurrency } from '../../lib/utils';
import { Star, ShoppingCart, Car } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discountPercent = product.discount_price
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  return (
    <div className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {discountPercent > 0 && (
          <span className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-[11px] font-black px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider">
            %{discountPercent} İndirim
          </span>
        )}
        {product.is_featured && (
          <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
            Çok Satan
          </span>
        )}
      </div>

      {/* OEM / Part Code Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className="bg-slate-950/80 backdrop-blur-sm border border-slate-800 text-slate-300 text-[10px] font-mono font-medium px-2 py-1 rounded-md">
          {product.part_number}
        </span>
      </div>

      {/* Image Section */}
      <Link href={`/shop/products/${product.slug}`} className="block relative w-full h-48 bg-slate-950 overflow-hidden">
        <Image
          src={product.image_url}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
      </Link>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-semibold text-orange-400 uppercase tracking-wider">{product.brand}</span>
            <span className="text-slate-400 text-[11px] truncate max-w-[120px]">{product.category}</span>
          </div>

          {/* Title */}
          <Link href={`/shop/products/${product.slug}`} className="block group-hover:text-orange-400 transition-colors">
            <h3 className="text-white font-semibold text-sm line-clamp-2 leading-snug mb-2">
              {product.title}
            </h3>
          </Link>

          {/* Vehicle Compatibility Preview */}
          {product.vehicle_compatibility && product.vehicle_compatibility.length > 0 && (
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-3 bg-slate-950/50 px-2.5 py-1.5 rounded-lg border border-slate-800/80">
              <Car className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate">
                {product.vehicle_compatibility[0].brand} {product.vehicle_compatibility[0].model}
              </span>
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs text-slate-400 mb-4">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold ml-1 text-white text-xs">{product.rating}</span>
            </div>
            <span>({product.reviews_count} değerlendirme)</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            {product.discount_price ? (
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 line-through">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-lg font-black text-white">
                  {formatCurrency(product.discount_price)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-black text-white">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => alert(`"${product.title}" sepete eklendi!`)}
            className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-95 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Sepete Ekle</span>
          </button>
        </div>

      </div>
    </div>
  );
}
