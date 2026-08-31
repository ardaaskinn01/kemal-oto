'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Filter, 
  X, 
  Check, 
  ShieldCheck, 
  Wrench, 
  ChevronDown, 
  RotateCcw,
  SlidersHorizontal,
  Tag
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
  const currentVin = searchParams.get('vin') || '';
  const currentSearch = searchParams.get('q') || '';

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);

  const brands = [
    { name: 'Opel', label: 'Opel' },
    { name: 'Peugeot', label: 'Peugeot' },
    { name: 'Citroën', label: 'Citroën' },
    { name: 'Chevrolet', label: 'Chevrolet' },
    { name: 'DS Automobiles', label: 'DS' },
  ];

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/shop?${params.toString()}`);
  };

  const handlePriceApply = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) params.set('minPrice', minPrice);
    else params.delete('minPrice');

    if (maxPrice) params.set('maxPrice', maxPrice);
    else params.delete('maxPrice');

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

  return (
    <>
      {/* Mobile Filter Trigger Button */}
      <div className="lg:hidden flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-sm mb-4">
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="flex items-center gap-2 bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-black shadow-sm active:scale-95 transition-transform cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 stroke-[2.5]" />
          <span>FİLTRELERİ AÇ ({hasActiveFilters ? 'Aktif Filtre Var' : 'Tümü'})</span>
        </button>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1 hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Temizle</span>
          </button>
        )}
      </div>

      {/* Filter Sidebar Container (Desktop & Drawer content) */}
      <aside className={`space-y-5 ${mobileDrawerOpen ? 'fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto flex flex-col justify-end' : 'hidden lg:block'}`}>
        
        <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-5 shadow-sm max-h-[90vh] overflow-y-auto ${mobileDrawerOpen ? 'w-full max-w-lg mx-auto shadow-2xl animate-in slide-in-from-bottom duration-300' : ''}`}>
          
          {/* Drawer Mobile Header */}
          {mobileDrawerOpen && (
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Filtreleme Menüsü</h3>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Header & Clear Button */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-sm">
              <Filter className="w-4 h-4 text-amber-500" />
              <span>Detaylı Parça Filtresi</span>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-[11px] font-extrabold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Sıfırla</span>
              </button>
            )}
          </div>

          {/* 1. Markalar (Opel, Peugeot, Citroën, Chevrolet, DS) */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Araç Markası
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => updateParam('brand', null)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                  !currentBrand
                    ? 'bg-amber-400 border-amber-400 text-slate-950 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400'
                }`}
              >
                Tüm Markalar
              </button>
              {brands.map((b) => {
                const isSelected = currentBrand.toLowerCase() === b.name.toLowerCase();
                return (
                  <button
                    key={b.name}
                    type="button"
                    onClick={() => updateParam('brand', isSelected ? null : b.name)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400 border-amber-400 text-slate-950 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400'
                    }`}
                  >
                    {b.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Parça Kalite Tipi (Orijinal OEM vs A Kalite Muadil) */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Parça Kalite Tipi
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => updateParam('quality', currentQuality === 'original' ? null : 'original')}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  currentQuality === 'original'
                    ? 'bg-slate-950 text-amber-400 border-amber-400 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="block font-black text-[11px]">ORİJİNAL OEM</span>
                  <span className="text-[9px] opacity-75 font-normal">Fabrika Çıkışlı</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => updateParam('quality', currentQuality === 'aftermarket' ? null : 'aftermarket')}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  currentQuality === 'aftermarket'
                    ? 'bg-slate-950 text-amber-400 border-amber-400 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <Wrench className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="block font-black text-[11px]">A KALİTE MUADİL</span>
                  <span className="text-[9px] opacity-75 font-normal">Sertifikalı Parça</span>
                </div>
              </button>
            </div>
          </div>

          {/* 3. Kategoriler Ağacı */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Yedek Parça Kategorileri
            </span>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => updateParam('category', null)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  !currentCategory
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>Tüm Kategoriler</span>
                <span className="text-[10px] opacity-75">({totalProductsCount})</span>
              </button>

              {categories.map((cat) => {
                const isActive = currentCategory === cat.slug;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => updateParam('category', isActive ? null : cat.slug)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 font-black'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-[10px] opacity-75">({cat.item_count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Stok Durumu Checkbox */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <label className="flex items-center gap-2.5 text-xs font-extrabold text-slate-800 dark:text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={currentInStock}
                onChange={(e) => updateParam('inStock', e.target.checked ? 'true' : null)}
                className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400 cursor-pointer"
              />
              <span>Sadece Stoktakileri Göster</span>
            </label>
          </div>

          {/* 5. Fiyat Aralığı (Min - Max) */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Fiyat Aralığı (TL)
            </span>
            <form onSubmit={handlePriceApply} className="flex items-center gap-2">
              <input
                type="number"
                placeholder="En Az"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-400"
              />
              <span className="text-slate-400 font-bold">-</span>
              <input
                type="number"
                placeholder="En Çok"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-3 py-2 rounded-xl text-xs transition-colors shrink-0 cursor-pointer"
              >
                Uygula
              </button>
            </form>
          </div>

          {/* Drawer Apply Button for Mobile */}
          {mobileDrawerOpen && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black py-3 rounded-xl text-xs uppercase"
              >
                Sonuçları Göster
              </button>
            </div>
          )}

        </div>
      </aside>
    </>
  );
}
