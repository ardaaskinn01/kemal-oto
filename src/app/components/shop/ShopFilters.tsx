'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Filter,
  X,
  ShieldCheck,
  Wrench,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { Category } from '../../types/database.types';

interface ShopFiltersProps {
  categories: Category[];
  totalProductsCount: number;
}

export function ShopFilters({ categories, totalProductsCount }: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') || '';
  const currentBrand = searchParams.get('brand') || '';
  const currentQuality = searchParams.get('quality') || '';
  const currentInStock = searchParams.get('inStock') === 'true';
  const currentMinPrice = searchParams.get('minPrice') || '';
  const currentMaxPrice = searchParams.get('maxPrice') || '';
  const currentSearch = searchParams.get('q') || '';

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);

  const brands = [
    { name: 'Opel', label: 'Opel' },
    { name: 'Peugeot', label: 'Peugeot' },
    { name: 'Citroën', label: 'Citroën' },
    { name: 'Chevrolet', label: 'Chevrolet' },
    { name: 'DS Automobiles', label: 'DS Automobiles' },
  ];

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/shop?${params.toString()}`);
  };

  const handlePriceApply = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) params.set('minPrice', minPrice); else params.delete('minPrice');
    if (maxPrice) params.set('maxPrice', maxPrice); else params.delete('maxPrice');
    router.push(`/shop?${params.toString()}`);
    setMobileDrawerOpen(false);
  };

  const clearAllFilters = () => {
    router.push('/shop');
    setMinPrice('');
    setMaxPrice('');
    setMobileDrawerOpen(false);
  };

  const hasActiveFilters = Boolean(
    currentCategory || currentBrand || currentQuality || currentInStock || currentMinPrice || currentMaxPrice || currentSearch
  );

  const FilterContent = () => (
    <div className="bg-white dark:bg-[#111318] border border-gray-200 dark:border-[#2a2d35] rounded-xl p-4 space-y-5 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-[#2a2d35]">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
          <Filter className="w-4 h-4 text-[#E8820C]" />
          <span>Filtreler</span>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Sıfırla
            </button>
          )}
          {mobileDrawerOpen && (
            <button
              onClick={() => setMobileDrawerOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 1. Araç Markası */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">Araç Markası</span>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="brand"
              checked={!currentBrand}
              onChange={() => updateParam('brand', null)}
              className="w-3.5 h-3.5 accent-[#E8820C] cursor-pointer"
            />
            <span className={`text-sm ${!currentBrand ? 'text-[#E8820C] font-medium' : 'text-gray-700 dark:text-gray-300'}`}>
              Tüm Markalar
            </span>
          </label>
          {brands.map((b) => {
            const isSelected = currentBrand.toLowerCase() === b.name.toLowerCase();
            return (
              <label key={b.name} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="brand"
                  checked={isSelected}
                  onChange={() => updateParam('brand', isSelected ? null : b.name)}
                  className="w-3.5 h-3.5 accent-[#E8820C] cursor-pointer"
                />
                <span className={`text-sm ${isSelected ? 'text-[#E8820C] font-medium' : 'text-gray-700 dark:text-gray-300'}`}>
                  {b.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Parça Kalitesi */}
      <div className="pt-3 border-t border-gray-100 dark:border-[#2a2d35] space-y-2">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">Parça Tipi</span>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={currentQuality === 'original'}
              onChange={(e) => updateParam('quality', e.target.checked ? 'original' : null)}
              className="w-3.5 h-3.5 rounded accent-[#E8820C] cursor-pointer"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              Orijinal OEM
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={currentQuality === 'aftermarket'}
              onChange={(e) => updateParam('quality', e.target.checked ? 'aftermarket' : null)}
              className="w-3.5 h-3.5 rounded accent-[#E8820C] cursor-pointer"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-gray-400" />
              A Kalite Muadil
            </span>
          </label>
        </div>
      </div>

      {/* 3. Kategoriler */}
      <div className="pt-3 border-t border-gray-100 dark:border-[#2a2d35] space-y-2">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">Kategori</span>
        <div className="space-y-0.5">
          <button
            type="button"
            onClick={() => updateParam('category', null)}
            className={`w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-sm text-left transition-colors cursor-pointer ${
              !currentCategory
                ? 'text-[#E8820C] font-medium bg-orange-50 dark:bg-[#1a1d23]'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1d23]'
            }`}
          >
            <span>Tüm Kategoriler</span>
            <span className="text-[11px] text-gray-400">({totalProductsCount})</span>
          </button>
          {categories.map((cat) => {
            const isActive = currentCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => updateParam('category', isActive ? null : cat.slug)}
                className={`w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-sm text-left transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#E8820C] font-medium bg-orange-50 dark:bg-[#1a1d23]'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1d23]'
                }`}
              >
                <span className="truncate">{cat.name}</span>
                <span className="text-[11px] text-gray-400 shrink-0 ml-1">({cat.item_count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Stok */}
      <div className="pt-3 border-t border-gray-100 dark:border-[#2a2d35]">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={currentInStock}
            onChange={(e) => updateParam('inStock', e.target.checked ? 'true' : null)}
            className="w-3.5 h-3.5 rounded accent-[#E8820C] cursor-pointer"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Sadece stokta olanlar</span>
        </label>
      </div>

      {/* 5. Fiyat aralığı */}
      <div className="pt-3 border-t border-gray-100 dark:border-[#2a2d35] space-y-2">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">Fiyat Aralığı (₺)</span>
        <form onSubmit={handlePriceApply} className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full border border-gray-200 dark:border-[#2a2d35] bg-white dark:bg-[#0d0f12] text-sm text-gray-900 dark:text-white rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#E8820C] transition-colors"
          />
          <span className="text-gray-300 dark:text-gray-600">—</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full border border-gray-200 dark:border-[#2a2d35] bg-white dark:bg-[#0d0f12] text-sm text-gray-900 dark:text-white rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#E8820C] transition-colors"
          />
          <button
            type="submit"
            className="bg-[#E8820C] hover:bg-[#d4740a] text-white text-xs font-medium px-3 py-2 rounded-lg shrink-0 cursor-pointer transition-colors"
          >
            Ara
          </button>
        </form>
      </div>

      {/* Mobile apply */}
      {mobileDrawerOpen && (
        <div className="pt-3 border-t border-gray-100 dark:border-[#2a2d35]">
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(false)}
            className="w-full bg-[#E8820C] hover:bg-[#d4740a] text-white font-medium py-2.5 rounded-lg text-sm cursor-pointer transition-colors"
          >
            Sonuçları göster
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <div className="lg:hidden flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="flex items-center gap-2 border border-gray-200 dark:border-[#2a2d35] text-gray-700 dark:text-gray-300 px-3.5 py-2 rounded-lg text-sm cursor-pointer hover:border-[#E8820C] hover:text-[#E8820C] transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filtreler{hasActiveFilters ? ' (aktif)' : ''}</span>
        </button>
        {hasActiveFilters && (
          <button type="button" onClick={clearAllFilters} className="text-sm text-red-500 hover:underline cursor-pointer">
            Temizle
          </button>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <FilterContent />
      </aside>

      {/* Mobile drawer overlay */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 flex items-end">
          <div className="w-full max-h-[85vh] overflow-y-auto rounded-t-2xl">
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
}
