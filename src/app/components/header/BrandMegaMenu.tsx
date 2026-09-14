'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, ArrowRight, X, Cpu, Layers, ShieldCheck } from 'lucide-react';
import { VEHICLE_CATALOG } from '../../data/vehicleCatalogData';
import { getBrandLogo } from '../../data/brandLogos';
import { useGarage } from '../../contexts/GarageContext';

// Concept A: Teknik Servis Motor Aileleri ve EPC Kırılımları
const BRAND_TECHNICAL_DATA: Record<string, {
  engineFamilies: { name: string; code: string; query: string }[];
  tagline: string;
}> = {
  Opel: {
    tagline: 'Alman Mühendisliği • GM & Stellantis Platformu',
    engineFamilies: [
      { name: '1.6 CDTI Dizel', code: 'B16DTH / B16DTL', query: '1.6 CDTI' },
      { name: '1.4 Turbo Benzin', code: 'A14NET / B14NET', query: '1.4 Turbo' },
      { name: '1.2 PureTech Turbo', code: 'EB2 / F12SHR', query: '1.2 PureTech' },
      { name: '1.3 CDTI Ecotec', code: 'Z13DTH / A13DTE', query: '1.3 CDTI' },
      { name: '1.6 Ecotec 16V', code: 'Z16XER / A16XER', query: '1.6' },
      { name: '2.0 CDTI BiTurbo', code: 'A20DTH / B20DTH', query: '2.0 CDTI' },
    ],
  },
  Peugeot: {
    tagline: 'PSA Grubu Orijinal & E-Mark Onaylı Parçalar',
    engineFamilies: [
      { name: '1.5 BlueHDi Dizel', code: 'DV5 / YHZ', query: '1.5 BlueHDi' },
      { name: '1.6 BlueHDi / HDi', code: 'DV6 / 9HP / 9HD', query: '1.6 HDi' },
      { name: '1.2 PureTech Benzin', code: 'EB2 / HNZ', query: '1.2 PureTech' },
      { name: '1.6 THP Turbo Benzin', code: 'EP6 / 5G02', query: '1.6 THP' },
      { name: '2.0 BlueHDi Dizel', code: 'DW10 / AH01', query: '2.0 BlueHDi' },
    ],
  },
  Citroën: {
    tagline: 'PSA Konfor & Süspansiyon Teknolojisi',
    engineFamilies: [
      { name: '1.6 HDi / e-HDi', code: 'DV6C / DV6DTED', query: '1.6 HDi' },
      { name: '1.5 BlueHDi Euro 6.2', code: 'DV5RD / DV5RC', query: '1.5 BlueHDi' },
      { name: '1.2 PureTech Benzin', code: 'EB2DT / EB2F', query: '1.2 PureTech' },
      { name: '1.4 HDi Dizel', code: 'DV4TD', query: '1.4 HDi' },
    ],
  },
  Chevrolet: {
    tagline: 'General Motors (GM) Orijinal Uyumlu Parçalar',
    engineFamilies: [
      { name: '1.6 16V Ecotec', code: 'F16D4 / LDE', query: '1.6' },
      { name: '1.4 Turbo Ecotec', code: 'A14NET / LUJ', query: '1.4 Turbo' },
      { name: '2.0 VCDi Dizel', code: 'Z20D1 / LLW', query: '2.0' },
      { name: '1.3 CDTI Dizel', code: 'LDV', query: '1.3' },
    ],
  },
  'DS Automobiles': {
    tagline: 'Stellantis Premium Fransız Parça Ağı',
    engineFamilies: [
      { name: '1.6 E-Tense Hybrid', code: 'EP6FADTX', query: 'E-Tense' },
      { name: '1.5 BlueHDi Dizel', code: 'DV5RC', query: '1.5 BlueHDi' },
      { name: '1.6 PureTech 180/225', code: 'EP6FADTXHP', query: '1.6 PureTech' },
    ],
  },
};

function BrandMegaMenuInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlBrand = searchParams.get('brand') || '';
  const { setIsGarageModalOpen } = useGarage();

  const [activeBrandSlug, setActiveBrandSlug] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Desktop hover handler
  const handleMouseEnter = (brandSlug: string) => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setActiveBrandSlug(brandSlug);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      timeoutRef.current = setTimeout(() => setActiveBrandSlug(null), 200);
    }
  };

  // Click handler (works seamlessly on mobile touch and desktop click)
  const handleBrandClick = (e: React.MouseEvent, brandSlug: string) => {
    if (activeBrandSlug === brandSlug) {
      setActiveBrandSlug(null);
    } else {
      setActiveBrandSlug(brandSlug);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveBrandSlug(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const currentBrandData = VEHICLE_CATALOG.find((b) => b.slug === activeBrandSlug);
  const techData = activeBrandSlug ? BRAND_TECHNICAL_DATA[activeBrandSlug] : null;

  return (
    <div
      ref={menuRef}
      onMouseLeave={handleMouseLeave}
      className="relative border-t border-slate-200 dark:border-[#1e2533] bg-white dark:bg-[#0d1015]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between overflow-x-auto scrollbar-none py-0.5">

          {/* Brand Tabs — horizontal scrollable with technical styling */}
          <div className="flex items-center shrink-0 min-w-max">
            {VEHICLE_CATALOG.map((b) => {
              const isSelectedInUrl = urlBrand.toLowerCase() === b.brand.toLowerCase();
              const isActive = activeBrandSlug === b.slug;
              const isHighlighted = isSelectedInUrl || isActive;

              return (
                <div key={b.slug} onMouseEnter={() => handleMouseEnter(b.slug)} className="relative">
                  <button
                    type="button"
                    onClick={(e) => handleBrandClick(e, b.slug)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-2.5 text-xs sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-b-2 whitespace-nowrap font-mono ${
                      isSelectedInUrl
                        ? 'border-[#E8820C] text-[#E8820C] bg-orange-50/80 dark:bg-[#1a1712] shadow-inner font-black'
                        : isActive
                        ? 'border-[#E8820C] text-[#E8820C] bg-orange-50/50 dark:bg-[#161c27]'
                        : 'border-transparent text-slate-700 dark:text-slate-300 hover:text-[#E8820C] dark:hover:text-[#E8820C] hover:bg-slate-50 dark:hover:bg-[#131720]'
                    }`}
                  >
                    <span className={`shrink-0 ${isHighlighted ? 'text-[#E8820C]' : 'text-slate-400 dark:text-slate-500'}`}>
                      {getBrandLogo(b.brand, "w-4 h-4")}
                    </span>
                    <span>{b.brand}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isActive ? 'rotate-180 text-[#E8820C]' : 'opacity-50'
                    }`} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* All parts catalog link */}
          <Link
            href="/shop"
            className="text-xs font-mono font-bold text-[#E8820C] hover:underline flex items-center gap-1 shrink-0 ml-3 hidden sm:flex"
          >
            <span>Tüm Parçalar</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>
      </div>

      {/* Dropdown drawer for Sub-models & Motor Families */}
      {activeBrandSlug && currentBrandData && (
        <div
          onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
          className="absolute left-0 right-0 top-full z-50 bg-white dark:bg-[#0f131a] border-b-2 border-[#E8820C] shadow-2xl animate-in fade-in slide-in-from-top-1 duration-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">

            {/* Header row: Brand badge, Tagline & Action shortcuts */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200 dark:border-[#1e2533]">
              <div className="flex items-center gap-2.5">
                <span className="text-[#E8820C] shrink-0">{getBrandLogo(currentBrandData.brand, "w-6 h-6")}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white uppercase tracking-tight font-mono">
                      {currentBrandData.brand} Yedek Parçaları
                    </span>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono font-bold px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                      {currentBrandData.models.length} Kasa Kodu
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {techData?.tagline || `${currentBrandData.country} • ${currentBrandData.group}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => { setActiveBrandSlug(null); setIsGarageModalOpen(true); }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 hover:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/60 px-3 py-1.5 rounded-md transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Şasi ile Doğrula</span>
                </button>

                <Link
                  href={`/shop?brand=${encodeURIComponent(currentBrandData.brand)}`}
                  onClick={() => setActiveBrandSlug(null)}
                  className="text-xs font-black text-[#E8820C] hover:underline flex items-center gap-1 font-mono"
                >
                  Tüm {currentBrandData.brand} Parçaları
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </Link>

                <button
                  type="button"
                  onClick={() => setActiveBrandSlug(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-md cursor-pointer ml-1"
                  title="Kapat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content Layout: 2 Columns on Desktop (Left: Engine Families, Right: Kasa/Model Grid) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              
              {/* Left Column: Popular Engine Families (Teknik Motor Aileleri) */}
              {techData && techData.engineFamilies.length > 0 && (
                <div className="lg:col-span-4 space-y-2 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-[#1e2533] pb-3 lg:pb-0 lg:pr-4">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    <Cpu className="w-3.5 h-3.5 text-amber-500" />
                    <span>Popüler Motor Kodları</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5">
                    {techData.engineFamilies.map((eng) => (
                      <Link
                        key={eng.code}
                        href={`/shop?brand=${encodeURIComponent(currentBrandData.brand)}&q=${encodeURIComponent(eng.query)}`}
                        onClick={() => setActiveBrandSlug(null)}
                        className="group flex items-center justify-between p-2 rounded-md border border-slate-200 dark:border-[#1e2533] bg-slate-50 dark:bg-[#141822] hover:border-[#E8820C] hover:bg-orange-50/40 dark:hover:bg-orange-950/20 transition-all cursor-pointer"
                      >
                        <div className="min-w-0 pr-2">
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#E8820C] truncate">
                            {eng.name}
                          </p>
                          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 truncate">
                            {eng.code}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono font-semibold text-slate-400 group-hover:text-[#E8820C] shrink-0">
                          Parçaları Gör →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Right Column: Chassis Models Grid (EPC Kasa Kodları) */}
              <div className={`${techData ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-2`}>
                <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-500" />
                    <span>Kasa Kodları & Alt Modeller</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-normal lowercase">
                    tıkladığınız model filtrelenir
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-1.5 max-h-[50vh] md:max-h-[320px] overflow-y-auto pr-1 scrollbar-thin">
                  {currentBrandData.models.map((model) => (
                    <Link
                      key={model.name}
                      href={`/shop?brand=${encodeURIComponent(currentBrandData.brand)}&model=${encodeURIComponent(model.name)}`}
                      onClick={() => setActiveBrandSlug(null)}
                      className="group flex flex-col p-2 rounded-md border border-slate-200 dark:border-[#1e2533] bg-slate-50 dark:bg-[#141822] hover:border-[#E8820C] hover:bg-orange-50/40 dark:hover:bg-orange-950/20 transition-all cursor-pointer"
                    >
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#E8820C] transition-colors leading-tight truncate">
                        {model.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5 truncate">
                        {model.years}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer Trust Bar */}
            <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-[#1e2533] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Kemal Oto Parça Uyum Güvencesi: Tüm parçalar araç katalog standartlarına göre doğrulanır.
              </span>
              <span className="font-mono text-slate-500">
                81 İl Hızlı Kargo • Şasi ile Uyum Garantisi
              </span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export function BrandMegaMenu() {
  return (
    <Suspense fallback={<div className="h-11 border-t border-slate-200 dark:border-[#1e2533]" />}>
      <BrandMegaMenuInner />
    </Suspense>
  );
}
