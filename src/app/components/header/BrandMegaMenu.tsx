'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { VEHICLE_CATALOG } from '../../data/vehicleCatalogData';
import { getBrandLogo } from '../../data/brandLogos';

function BrandMegaMenuInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlBrand = searchParams.get('brand') || '';

  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (brandSlug: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredBrand(brandSlug);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setHoveredBrand(null), 200);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setHoveredBrand(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const currentBrandData = VEHICLE_CATALOG.find((b) => b.slug === hoveredBrand);

  return (
    <div
      ref={menuRef}
      onMouseLeave={handleMouseLeave}
      className="relative hidden md:block border-t border-slate-200 dark:border-[#2a2d35] bg-white dark:bg-[#0d0f12]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Brand Tabs */}
          <div className="flex items-center">
            {VEHICLE_CATALOG.map((b) => {
              const isSelectedInUrl = urlBrand.toLowerCase() === b.brand.toLowerCase();
              const isHovered = hoveredBrand === b.slug;
              const isHighlighted = isSelectedInUrl || isHovered;

              return (
                <div key={b.slug} onMouseEnter={() => handleMouseEnter(b.slug)} className="relative">
                  <Link
                    href={`/shop?brand=${encodeURIComponent(b.brand)}`}
                    onClick={() => setHoveredBrand(null)}
                    className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                      isSelectedInUrl
                        ? 'border-[#E8820C] text-[#E8820C] bg-orange-50/80 dark:bg-[#19140f] shadow-inner font-black'
                        : isHovered
                        ? 'border-[#E8820C] text-[#E8820C] bg-orange-50/50 dark:bg-[#161922]'
                        : 'border-transparent text-slate-700 dark:text-slate-300 hover:text-[#E8820C] dark:hover:text-[#E8820C] hover:bg-slate-50 dark:hover:bg-[#151921]'
                    }`}
                  >
                    <span className={`shrink-0 ${isHighlighted ? 'text-[#E8820C]' : 'text-slate-400 dark:text-slate-500'}`}>
                      {getBrandLogo(b.brand, "w-4 h-4")}
                    </span>
                    <span>{b.brand}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isHovered ? 'rotate-180 text-[#E8820C]' : 'opacity-50'
                    }`} />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* All parts link */}
          <Link
            href="/shop"
            className="text-xs font-black text-[#E8820C] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Tüm Parçalar</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>
      </div>

      {/* Dropdown drawer */}
      {hoveredBrand && currentBrandData && (
        <div
          onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
          className="absolute left-0 right-0 top-full z-50 bg-white dark:bg-[#0d0f12] border-b-2 border-[#E8820C] shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">

            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className="text-[#E8820C] shrink-0">{getBrandLogo(currentBrandData.brand, "w-6 h-6")}</span>
                <div>
                  <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    {currentBrandData.brand}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 ml-2 font-medium">
                    {currentBrandData.models.length} model — {currentBrandData.country} · {currentBrandData.group}
                  </span>
                </div>
              </div>
              <Link
                href={`/shop?brand=${encodeURIComponent(currentBrandData.brand)}`}
                onClick={() => setHoveredBrand(null)}
                className="text-xs font-black text-[#E8820C] hover:underline flex items-center gap-1"
              >
                Tüm {currentBrandData.brand} Parçaları
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
            </div>

            {/* Flat model grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1.5">
              {currentBrandData.models.map((model) => (
                <Link
                  key={model.name}
                  href={`/shop?brand=${encodeURIComponent(currentBrandData.brand)}&model=${encodeURIComponent(model.name)}`}
                  onClick={() => setHoveredBrand(null)}
                  className="group flex flex-col px-2.5 py-2 rounded-lg border border-slate-200/60 dark:border-[#1e2330] bg-slate-50/80 dark:bg-[#111520] hover:border-[#E8820C] hover:bg-orange-50/40 dark:hover:bg-orange-950/20 transition-all"
                >
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#E8820C] transition-colors leading-tight truncate">
                    {model.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-600 mt-0.5 truncate">
                    {model.years}
                  </span>
                </Link>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export function BrandMegaMenu() {
  return (
    <Suspense fallback={<div className="hidden md:block h-11 border-t border-slate-200 dark:border-[#2a2d35]" />}>
      <BrandMegaMenuInner />
    </Suspense>
  );
}
