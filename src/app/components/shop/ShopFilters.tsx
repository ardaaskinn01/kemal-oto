'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  X, 
  SlidersHorizontal, 
  Car, 
  Cpu, 
  Layers, 
  Package, 
  Truck, 
  Check, 
  ChevronDown, 
  Wrench,
  RotateCcw
} from 'lucide-react';
import { Category } from '../../types/database.types';
import { VEHICLE_CATALOG } from '../../data/vehicleCatalogData';

interface ShopFiltersProps {
  categories: Category[];
  totalProductsCount: number;
}

const COMMON_ENGINES = [
  { code: 'DV6', label: '1.6 HDi / BlueHDi (DV6)' },
  { code: 'DV5', label: '1.5 BlueHDi (DV5)' },
  { code: 'EB2', label: '1.2 PureTech (EB2)' },
  { code: 'EP6', label: '1.6 THP / PureTech (EP6)' },
  { code: 'B16DTH', label: '1.6 CDTi (B16DTH)' },
  { code: 'A14NET', label: '1.4 Turbo (A14NET)' },
  { code: 'A16XER', label: '1.6 16V (A16XER / F16D4)' },
];

export function ShopFilters({ categories, totalProductsCount }: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') || '';
  const currentBrand = searchParams.get('brand') || '';
  const currentModel = searchParams.get('model') || '';
  const currentEngine = searchParams.get('engine') || '';
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
    { name: 'Diğer Markalar', label: 'Diğer Markalar' },
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

  const activeFilterCount = [
    currentCategory,
    currentBrand,
    currentModel,
    currentEngine,
    currentQuality,
    currentInStock ? 'stock' : null,
    currentMinPrice || currentMaxPrice ? 'price' : null,
    currentSearch
  ].filter(Boolean).length;

  const FilterContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full bg-white dark:bg-[#111520] text-sm">

      {/* Filter Header — Technical Service Desk Style */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-200 dark:border-[#222a3a] bg-slate-50 dark:bg-[#151a26] shrink-0">
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-[#E8820C]" />
          <span className="font-bold text-slate-900 dark:text-white text-sm">
            Katalog Filtreleri
          </span>
          {activeFilterCount > 0 && (
            <span className="bg-[#E8820C] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs font-bold text-[#E8820C] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Sıfırla</span>
            </button>
          )}
          {isMobile && (
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Filters Body */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-[#1f2738] scrollbar-thin">

        {/* ── Araç Markası ── */}
        <div className="p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-[#E8820C]" />
              <span>Araç Markası</span>
            </span>
            {currentBrand && (
              <button
                type="button"
                onClick={() => updateParam('brand', null)}
                className="text-[11px] text-slate-400 hover:text-[#E8820C] font-medium"
              >
                Kaldır
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {brands.map((b) => {
              const isSelected = currentBrand.toLowerCase() === b.name.toLowerCase();
              return (
                <button
                  key={b.name}
                  type="button"
                  onClick={() => updateParam('brand', isSelected ? null : b.name)}
                  className={`text-left px-2.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer border ${
                    isSelected
                      ? 'bg-orange-50 dark:bg-orange-950/40 text-[#E8820C] border-[#E8820C] font-bold shadow-xs'
                      : 'bg-slate-50/80 dark:bg-[#161c28] border-slate-200 dark:border-[#222a3a] text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span className="truncate">{b.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#E8820C] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Model & Kasa (Marka Seçiliyse Açılır) ── */}
        {selectedBrandCatalog && (
          <div className="p-4 space-y-2.5 bg-orange-50/30 dark:bg-orange-950/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E8820C] flex items-center gap-1.5">
                <span>●</span>
                <span>{currentBrand} Modelleri</span>
              </span>
              {currentModel && (
                <button
                  type="button"
                  onClick={() => updateParam('model', null)}
                  className="text-[11px] text-slate-400 hover:text-[#E8820C]"
                >
                  Tümü
                </button>
              )}
            </div>

            <div className="max-h-48 overflow-y-auto pr-1 space-y-1 scrollbar-thin">
              <button
                type="button"
                onClick={() => updateParam('model', null)}
                className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer flex items-center justify-between ${
                  !currentModel
                    ? 'bg-[#E8820C] text-white font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1a2130]'
                }`}
              >
                <span>Tüm {currentBrand} Modelleri</span>
                {!currentModel && <Check className="w-3.5 h-3.5" />}
              </button>

              {selectedBrandCatalog.models.map((m) => {
                const isSelected = currentModel?.toLowerCase() === m.name.toLowerCase();
                return (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => updateParam('model', isSelected ? null : m.name)}
                    className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#E8820C] text-white font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1a2130]'
                    }`}
                  >
                    <span className="truncate">{m.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Parça Grubu / Kategori ── */}
        <div className="p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-[#E8820C]" />
              <span>Parça Grubu / Kategori</span>
            </span>
            {currentCategory && (
              <button
                type="button"
                onClick={() => updateParam('category', null)}
                className="text-[11px] text-slate-400 hover:text-[#E8820C]"
              >
                Tümü
              </button>
            )}
          </div>

          <div className="max-h-56 overflow-y-auto pr-1 space-y-1 scrollbar-thin">
            <button
              type="button"
              onClick={() => updateParam('category', null)}
              className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer flex items-center justify-between ${
                !currentCategory
                  ? 'bg-[#E8820C] text-white font-bold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1a2130]'
              }`}
            >
              <span>Tüm Parça Grupları</span>
              {!currentCategory && <Check className="w-3.5 h-3.5" />}
            </button>

            {categories.map((cat) => {
              const isSelected = currentCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => updateParam('category', isSelected ? null : cat.slug)}
                  className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#E8820C] text-white font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1a2130]'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  {cat.item_count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                      isSelected 
                        ? 'bg-white/20 text-white' 
                        : 'bg-slate-100 dark:bg-[#18202e] text-slate-500 dark:text-slate-400'
                    }`}>
                      {cat.item_count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Motor Kodu / Tipi ── */}
        <div className="p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#E8820C]" />
              <span>Motor Kodu / Tipi</span>
            </span>
            {currentEngine && (
              <button
                type="button"
                onClick={() => updateParam('engine', null)}
                className="text-[11px] text-slate-400 hover:text-[#E8820C]"
              >
                Tümü
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {COMMON_ENGINES.map((eng) => {
              const isSelected = currentEngine?.toLowerCase() === eng.code.toLowerCase();
              return (
                <button
                  key={eng.code}
                  type="button"
                  onClick={() => updateParam('engine', isSelected ? null : eng.code)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer font-semibold ${
                    isSelected
                      ? 'bg-[#E8820C] text-white border-[#E8820C] shadow-xs'
                      : 'bg-slate-50 dark:bg-[#161c28] border-slate-200 dark:border-[#222a3a] text-slate-700 dark:text-slate-300 hover:border-slate-400'
                  }`}
                >
                  {eng.code}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Parça Kalite Standardı ── */}
        <div className="p-4 space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#E8820C]" />
            <span>Kalite Standardı</span>
          </span>

          <div className="space-y-1">
            {[
              { value: null, label: 'Tümü (Orijinal & Muadil)' },
              { value: 'original', label: 'Orijinal PSA / Opel (OEM)' },
              { value: 'aftermarket', label: 'A Kalite Onaylı Muadil' },
            ].map((opt) => {
              const isSelected = currentQuality === (opt.value ?? '');
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => updateParam('quality', opt.value)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-orange-50 dark:bg-orange-950/40 text-[#E8820C] font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1a2130]'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                    isSelected ? 'border-[#E8820C]' : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#E8820C]" />}
                  </span>
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 6. Stok & Depo ── */}
        <div className="p-4 space-y-2">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={currentInStock}
              onChange={() => updateParam('inStock', currentInStock ? null : 'true')}
              className="w-4 h-4 rounded border-slate-300 text-[#E8820C] focus:ring-[#E8820C] cursor-pointer"
            />
            <div className="text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                Sadece Merkez Depo Stokları
              </span>
              <span className="text-[11px] text-slate-400">
                16:00&apos;ya kadar aynı gün sevk edilecekler
              </span>
            </div>
          </label>
        </div>

        {/* ── 7. Fiyat Aralığı ── */}
        <div className="p-4 space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Fiyat Aralığı (TL)
          </span>
          <form onSubmit={handlePriceApply} className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min ₺"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0d1017] border border-slate-200 dark:border-[#222a3a] rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#E8820C]"
              />
              <span className="text-slate-400">–</span>
              <input
                type="number"
                placeholder="Max ₺"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0d1017] border border-slate-200 dark:border-[#222a3a] rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#E8820C]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-[#E8820C] dark:hover:bg-[#E8820C] dark:hover:text-white py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Fiyatı Uygula
            </button>
          </form>
        </div>

      </div>

      {/* Sticky Mobile Drawer Footer */}
      {isMobile && (
        <div className="p-4 border-t border-slate-200 dark:border-[#222a3a] bg-white dark:bg-[#111520] flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={clearAllFilters}
            className="flex-1 py-3 text-center text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-[#1a2130] rounded-xl hover:bg-slate-200 transition-colors"
          >
            Sıfırla
          </button>
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(false)}
            className="flex-[2] py-3 text-center text-xs font-bold text-white bg-[#E8820C] hover:bg-[#d07205] rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Sonuçları Gör ({totalProductsCount})
          </button>
        </div>
      )}

    </div>
  );

  return (
    <>
      {/* Mobile Drawer Trigger Bar */}
      <div className="lg:hidden flex items-center justify-between gap-3 mb-4">
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-[#111520] border-2 border-slate-200 dark:border-[#222a3a] text-slate-800 dark:text-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs active:scale-[0.99] cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#E8820C]" />
          <span>Katalog Filtreleri</span>
          {activeFilterCount > 0 && (
            <span className="bg-[#E8820C] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>

        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="px-3 py-2.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-[#E8820C] underline cursor-pointer shrink-0"
          >
            Temizle
          </button>
        )}
      </div>

      {/* Desktop Sidebar (Fixed Card) */}
      <aside className="hidden lg:block">
        <div className="border-2 border-slate-200 dark:border-[#222a3a] rounded-2xl overflow-hidden shadow-xs">
          <FilterContent isMobile={false} />
        </div>
      </aside>

      {/* Mobile Bottom Sheet Drawer */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer Container */}
          <div className="relative z-10 w-full max-h-[88vh] flex flex-col bg-white dark:bg-[#111520] rounded-t-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200">
            {/* Grab Bar */}
            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto my-2.5 shrink-0" />
            <FilterContent isMobile={true} />
          </div>
        </div>
      )}
    </>
  );
}
