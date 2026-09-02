'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X, SlidersHorizontal } from 'lucide-react';
import { Category } from '../../types/database.types';
import { VEHICLE_CATALOG } from '../../data/vehicleCatalogData';

interface ShopFiltersProps {
  categories: Category[];
  totalProductsCount: number;
}

export function ShopFilters({ categories, totalProductsCount }: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') || '';
  const currentBrand = searchParams.get('brand') || '';
  const currentModel = searchParams.get('model') || '';
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

  // Get vehicle models for the currently selected brand
  const selectedBrandCatalog = currentBrand
    ? VEHICLE_CATALOG.find((b) => b.brand.toLowerCase() === currentBrand.toLowerCase())
    : null;

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    // When changing brand, clear model
    if (key === 'brand') params.delete('model');
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
    <div className="bg-white dark:bg-[#111318] rounded-xl border border-slate-200 dark:border-[#2a2d35] overflow-hidden text-sm">

      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-[#2a2d35] bg-slate-50 dark:bg-[#141822]">
        <span className="font-black text-slate-900 dark:text-white text-sm">Filtrele</span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs font-bold text-[#E8820C] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            Temizle
          </button>
        )}
        {mobileDrawerOpen && (
          <button onClick={() => setMobileDrawerOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ── Görseldeki gibi: Marka Seçiliyse En Üstte Kategori Modelleri ── */}
      {selectedBrandCatalog ? (
        <div className="border-b border-slate-100 dark:border-[#2a2d35]">
          <div className="px-4 pt-4 pb-1">
            <span className="text-xs font-black uppercase tracking-wider text-[#E8820C] block">
              Kategoriler
            </span>
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase mt-1 tracking-tight">
              {currentBrand}
            </h3>
          </div>
          <ul className="max-h-72 overflow-y-auto py-1 scrollbar-thin">
            <li>
              <button
                type="button"
                onClick={() => updateParam('model', null)}
                className={`w-full text-left px-4 py-1.5 text-xs font-bold transition-colors cursor-pointer uppercase ${
                  !currentModel
                    ? 'text-[#E8820C] bg-orange-50 dark:bg-orange-950/30 font-black'
                    : 'text-slate-700 dark:text-slate-300 hover:text-[#E8820C]'
                }`}
              >
                TÜM {currentBrand.toUpperCase()} MODELLERİ
              </button>
            </li>
            {selectedBrandCatalog.models.map((m) => {
              const isSelected = currentModel?.toLowerCase() === m.name.toLowerCase();
              return (
                <li key={m.name}>
                  <button
                    type="button"
                    onClick={() => updateParam('model', isSelected ? null : m.name)}
                    className={`w-full text-left px-4 py-1.5 text-xs transition-colors cursor-pointer uppercase flex items-center justify-between ${
                      isSelected
                        ? 'text-[#E8820C] bg-orange-50 dark:bg-orange-950/40 font-black'
                        : 'text-slate-700 dark:text-slate-300 hover:text-[#E8820C] font-semibold'
                    }`}
                  >
                    <span>{m.name}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#E8820C]" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      {/* ── Parça Kategorileri ── */}
      <div className="border-b border-slate-100 dark:border-[#2a2d35]">
        <div className="px-4 pt-4 pb-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {currentBrand ? 'Parça Grubu' : 'Kategoriler'}
          </span>
        </div>
        <ul className="max-h-56 overflow-y-auto py-1 scrollbar-thin">
          <li>
            <button
              type="button"
              onClick={() => updateParam('category', null)}
              className={`w-full text-left px-4 py-2 flex items-center justify-between transition-colors cursor-pointer ${
                !currentCategory
                  ? 'text-[#E8820C] font-bold bg-orange-50 dark:bg-orange-950/30'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1a1d23] font-medium'
              }`}
            >
              <span>Tüm Gruplar</span>
              {!currentCategory && <span className="w-1.5 h-1.5 rounded-full bg-[#E8820C] shrink-0" />}
            </button>
          </li>
          {categories.map((cat) => {
            const isSelected = currentCategory === cat.slug;
            return (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => updateParam('category', isSelected ? null : cat.slug)}
                  className={`w-full text-left px-4 py-2 flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'text-[#E8820C] font-bold bg-orange-50 dark:bg-orange-950/30'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1a1d23] font-medium'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  {cat.item_count > 0 && (
                    <span className={`text-xs font-mono shrink-0 ml-2 px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-orange-100 dark:bg-orange-900/60 text-[#E8820C]'
                        : 'bg-slate-100 dark:bg-[#1e2128] text-slate-500 dark:text-slate-400'
                    }`}>
                      {cat.item_count}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── Markalar ── */}
      <div className="border-b border-slate-100 dark:border-[#2a2d35]">
        <div className="px-4 pt-4 pb-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Araç Markası
          </span>
        </div>
        <ul>
          <li>
            <button
              type="button"
              onClick={() => updateParam('brand', null)}
              className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors cursor-pointer ${
                !currentBrand
                  ? 'text-[#E8820C] font-bold bg-orange-50 dark:bg-orange-950/30'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1a1d23] font-medium'
              }`}
            >
              <span className={`w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center ${!currentBrand ? 'border-[#E8820C] bg-[#E8820C]' : 'border-slate-300 dark:border-slate-600'}`}>
                {!currentBrand && <span className="text-white text-[9px] font-black">✓</span>}
              </span>
              <span>Tüm Markalar</span>
            </button>
          </li>
          {brands.map((b) => {
            const isSelected = currentBrand.toLowerCase() === b.name.toLowerCase();
            return (
              <li key={b.name}>
                <button
                  type="button"
                  onClick={() => updateParam('brand', isSelected ? null : b.name)}
                  className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors cursor-pointer ${
                    isSelected
                      ? 'text-[#E8820C] font-bold bg-orange-50 dark:bg-orange-950/30'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1a1d23] font-medium'
                  }`}
                >
                  <span className={`w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center ${isSelected ? 'border-[#E8820C] bg-[#E8820C]' : 'border-slate-300 dark:border-slate-600'}`}>
                    {isSelected && <span className="text-white text-[9px] font-black">✓</span>}
                  </span>
                  <span>{b.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>


      {/* ── Parça Tipi ── */}
      <div className="border-b border-slate-100 dark:border-[#2a2d35]">
        <div className="px-4 pt-4 pb-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Parça Tipi
          </span>
        </div>
        <ul>
          {[
            { value: null, label: 'Tümü' },
            { value: 'original', label: 'Orijinal OEM' },
            { value: 'aftermarket', label: 'A Kalite Muadil' },
          ].map((opt) => {
            const isSelected = currentQuality === (opt.value ?? '');
            return (
              <li key={opt.label}>
                <button
                  type="button"
                  onClick={() => updateParam('quality', opt.value)}
                  className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors cursor-pointer ${
                    isSelected
                      ? 'text-[#E8820C] font-bold bg-orange-50 dark:bg-orange-950/30'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1a1d23] font-medium'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${isSelected ? 'border-[#E8820C]' : 'border-slate-300 dark:border-slate-600'}`}>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-[#E8820C] block" />}
                  </span>
                  <span>{opt.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── Stok ── */}
      <div className="border-b border-slate-100 dark:border-[#2a2d35]">
        <div className="px-4 pt-4 pb-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Stok Durumu</span>
        </div>
        <div className="px-4 pb-3">
          <label className="flex items-center gap-3 cursor-pointer py-1">
            <span className={`w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center ${currentInStock ? 'border-[#E8820C] bg-[#E8820C]' : 'border-slate-300 dark:border-slate-600'}`}
              onClick={() => updateParam('inStock', currentInStock ? null : 'true')}>
              {currentInStock && <span className="text-white text-[9px] font-black">✓</span>}
            </span>
            <span
              onClick={() => updateParam('inStock', currentInStock ? null : 'true')}
              className="text-slate-700 dark:text-slate-300 font-medium cursor-pointer select-none"
            >
              Sadece Stokta Olanlar
            </span>
          </label>
        </div>
      </div>

      {/* ── Fiyat Aralığı ── */}
      <div>
        <div className="px-4 pt-4 pb-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Fiyat Aralığı (TL)</span>
        </div>
        <form onSubmit={handlePriceApply} className="px-4 pb-4 space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#0d0f12] border border-slate-200 dark:border-[#2a2d35] rounded-lg px-3 py-2 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:border-[#E8820C] placeholder-slate-400"
            />
            <span className="text-slate-300 dark:text-slate-600 font-bold">–</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#0d0f12] border border-slate-200 dark:border-[#2a2d35] rounded-lg px-3 py-2 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:border-[#E8820C] placeholder-slate-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#E8820C] hover:bg-[#d4740a] text-white py-2.5 rounded-lg text-sm font-black transition-colors cursor-pointer"
          >
            Uygula
          </button>
        </form>
      </div>

    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <div className="lg:hidden flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="flex items-center gap-2 border-2 border-slate-200 dark:border-[#2a2d35] text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-xl text-sm font-bold cursor-pointer hover:border-[#E8820C] hover:text-[#E8820C] transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filtreler{hasActiveFilters ? ' (aktif)' : ''}</span>
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <FilterContent />
      </aside>

      {/* Mobile drawer overlay */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 flex items-end">
          <div className="w-full max-h-[90vh] overflow-y-auto rounded-t-2xl">
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
}
