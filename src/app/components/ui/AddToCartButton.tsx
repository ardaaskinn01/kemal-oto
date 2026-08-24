'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
  productTitle: string;
}

export function AddToCartButton({ productTitle }: AddToCartButtonProps) {
  return (
    <button
      type="button"
      onClick={() => alert(`"${productTitle}" sepete eklendi!`)}
      className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-sm font-extrabold px-6 py-4 rounded-xl shadow-xl shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
    >
      <ShoppingCart className="w-5 h-5" />
      <span>Hemen Sepete Ekle</span>
    </button>
  );
}
