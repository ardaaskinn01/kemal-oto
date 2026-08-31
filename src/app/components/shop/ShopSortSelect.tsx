'use client';

import React from 'react';

interface ShopSortSelectProps {
  sortFilter: string;
}

export function ShopSortSelect({ sortFilter }: ShopSortSelectProps) {
  return (
    <select
      name="sort"
      defaultValue={sortFilter}
      onChange={(e) => {
        const form = e.target.closest('form');
        if (form) form.submit();
      }}
      className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-extrabold focus:outline-none focus:border-amber-400 cursor-pointer"
    >
      <option value="popular">Popülerliğe Göre</option>
      <option value="price_asc">Fiyat: Düşükten Yükseğe</option>
      <option value="price_desc">Fiyat: Yüksekten Düşüğe</option>
      <option value="newest">En Yeniler</option>
    </select>
  );
}
