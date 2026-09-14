'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Car,
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Wrench,
  LayoutDashboard,
  LogOut,
  Package,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useGarage } from '../../contexts/GarageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useShippingSettings } from '../../contexts/ShippingSettingsContext';
import { useCart } from '../../contexts/CartContext';
import { ThemeToggle } from '../ui/ThemeToggle';
import { formatCurrency } from '../../lib/utils';
import { Product } from '../../types/database.types';
import { BrandMegaMenu } from './BrandMegaMenu';
import { VEHICLE_CATALOG } from '../../data/vehicleCatalogData';
import { getBrandLogo } from '../../data/brandLogos';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileBrand, setExpandedMobileBrand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { activeVehicle, setIsGarageModalOpen } = useGarage();
  const { user, profile, isAdmin, signOut } = useAuth();
  const { shippingSettings } = useShippingSettings();
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [searchResults, setSearchResults] = useState<Product[]>([]);

  // Debounced search with 280ms delay to prevent lagging on mobile keyboards
  useEffect(() => {
    const q = searchQuery.trim();
    if (q.length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const { supabase } = await import('../../lib/supabaseClient');
        const { data } = await supabase
          .from('products')
          .select('*')
          .eq('is_hidden', false)
          .or(`title.ilike.%${q}%,part_number.ilike.%${q}%,brand.ilike.%${q}%`)
          .limit(6);
        setSearchResults((data as Product[]) || []);
      } catch (e) {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const categories = [
    { name: 'Periyodik Bakım & Filtreler', href: '/shop?category=filtre-bakim' },
    { name: 'Fren & Süspansiyon', href: '/shop?category=fren-sistemi' },
    { name: 'Motor & Triger Aksamı', href: '/shop?category=motor-mekanik' },
    { name: 'Aydınlatma & Elektrik', href: '/shop?category=aydinlatma-elektrik' },
    { name: 'Kaporta & Dış Aksam', href: '/shop?category=kaporta-karoser' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white dark:bg-[#0d1015] border-b border-slate-200 dark:border-[#1e2533] transition-colors">

        {/* 1. Top strip — Kemal Oto EPC Servis Masası */}
        <div className="bg-[#0b0e13] text-slate-300 border-b border-[#1c222e] text-xs py-1.5 px-4 shadow-inner">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5">
            <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
              <span className="inline-flex items-center gap-1.5 font-bold text-white bg-slate-800/90 border border-slate-700/80 px-2 py-0.5 rounded text-[10px] sm:text-[11px] tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Kemal Oto Orijinal & Muadil Parça
              </span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="font-semibold text-slate-300 text-[11px] sm:text-xs">
                Bugün <strong className="text-amber-400">16:00'ya Kadar</strong> Aynı Gün Sevk
              </span>
              <span className="text-slate-500 hidden lg:inline">•</span>
              <span className="text-slate-400 hidden lg:inline text-[11px]">
                Stellantis & GM Orijinal OEM / E-Mark Onaylı Parça
              </span>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 text-xs flex-wrap justify-center">
              {/* 17 Haneli Şasi Doğrulama Butonu */}
              <button
                type="button"
                onClick={() => setIsGarageModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-400 hover:text-amber-300 bg-[#161c27] hover:bg-[#1f2736] border border-amber-500/30 px-2.5 py-0.5 rounded transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>17 Haneli Şasi ile Doğrula</span>
              </button>

              {/* Danışma & WhatsApp Teyit */}
              <a
                href="https://wa.me/905422924492?text=Merhaba%2C%20arac%C4%B1m%C4%B1n%20%C5%9Fasi%20numaras%C4%B1%20ile%20uyumlu%20par%C3%A7a%20dan%C4%B1%C5%9Fmak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300 transition-colors text-[11px] sm:text-xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Şasi Teyit: 0542 292 44 92</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2. Main header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-4">

            {/* Logo & Sub-descriptor */}
            <Link href="/" className="shrink-0 flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-slate-300 dark:border-[#222938] bg-white shadow-sm shrink-0">
                <Image
                  src="/logo.png"
                  alt="Kemal Oto Logo"
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                  Online Hızlı<span className="text-[#E8820C]">Parça</span>
                </span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1 font-mono">
                  Kemal Oto • PSA & GM Dağıtım
                </span>
              </div>
            </Link>

            {/* Search — EPC Technical Console style */}
            <div ref={searchRef} className="hidden md:block flex-1 max-w-xl relative mx-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    setIsSearchOpen(false);
                    window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                className="flex items-center border border-slate-300 dark:border-[#222938] rounded-lg overflow-hidden bg-slate-50 dark:bg-[#131720] focus-within:border-[#E8820C] focus-within:ring-1 focus-within:ring-[#E8820C] transition-all shadow-xs"
              >
                <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0 stroke-[2.5]" />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsSearchOpen(true)}
                  onChange={(e) => { setSearchQuery(e.target.value); setIsSearchOpen(true); }}
                  placeholder="Parça Adı, OEM Kodu (örn: 1611803480) veya Motor Kodu..."
                  className="flex-1 bg-transparent text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 py-2.5 px-3 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#E8820C] hover:bg-[#cf7005] text-white px-5 py-2.5 text-xs sm:text-sm font-black transition-colors shrink-0 cursor-pointer uppercase tracking-wider font-mono"
                >
                  Sorgula
                </button>
              </form>

              {/* Autocomplete dropdown */}
              {isSearchOpen && searchQuery.trim().length >= 2 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-[#131720] border border-slate-200 dark:border-[#222938] rounded-lg shadow-xl z-50 overflow-hidden text-xs">
                  {searchResults.length > 0 ? (
                    <div className="divide-y divide-gray-100 dark:divide-[#1e2533]">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/shop/products/${product.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-[#1a202c] transition-colors"
                        >
                          <div className="w-10 h-10 rounded bg-gray-100 dark:bg-[#1c222e] overflow-hidden relative shrink-0 border border-slate-200 dark:border-slate-800">
                            {product.image_url ? (
                              <Image src={product.image_url} alt={product.title} fill className="object-cover" />
                            ) : (
                              <Wrench className="w-4 h-4 text-gray-400 m-auto mt-3" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-gray-900 dark:text-white truncate">{product.title}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="font-mono text-[11px] font-bold text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.2 rounded border border-amber-200 dark:border-amber-800">
                                OEM: {product.part_number}
                              </span>
                              <span className="text-[10px] text-slate-400 uppercase font-semibold">
                                {product.brand}
                              </span>
                            </div>
                          </div>
                          <span className="text-sm font-black text-gray-900 dark:text-white shrink-0 font-mono">
                            {formatCurrency(product.price)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      <p className="font-bold text-gray-700 dark:text-gray-300">Uygun parça bulunamadı.</p>
                      <p className="text-xs mt-1">OEM referans numarasını veya araç modelini kontrol edin.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-2.5 ml-auto">

              {/* Garaj butonu - Teknik Servis Şasi Rozeti */}
              <button
                type="button"
                onClick={() => setIsGarageModalOpen(true)}
                title={activeVehicle ? `${activeVehicle.make} ${activeVehicle.model}` : 'Aracınızı seçin'}
                className={`hidden sm:flex items-center gap-2 text-xs px-3.5 py-2.5 rounded-lg border transition-colors cursor-pointer font-bold ${
                  activeVehicle
                    ? 'border-emerald-500/80 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30'
                    : 'border-slate-300 dark:border-[#222938] text-slate-700 dark:text-slate-300 hover:border-[#E8820C] hover:text-[#E8820C]'
                }`}
              >
                {activeVehicle ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="max-w-[120px] truncate font-mono">
                      {activeVehicle.make} {activeVehicle.model}
                    </span>
                  </>
                ) : (
                  <>
                    <Car className="w-4 h-4 shrink-0 stroke-[2.5]" />
                    <span className="max-w-[120px] truncate">
                      Şasi / Araç Seç
                    </span>
                  </>
                )}
              </button>

              <ThemeToggle />

              {isAdmin && (
                <Link
                  href="/admin"
                  className="hidden lg:flex items-center gap-1.5 text-xs px-3.5 py-2.5 rounded-xl border-2 border-slate-200 dark:border-[#2a2d35] text-slate-700 dark:text-slate-300 hover:border-[#E8820C] hover:text-[#E8820C] transition-colors font-bold"
                  title="Admin Paneli"
                >
                  <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              )}

              {/* Hesabım */}
              {user ? (
                <div className="flex items-center gap-1">
                  <Link
                    href="/garage"
                    title="Hesabım"
                    className="p-2.5 rounded-xl border-2 border-slate-200 dark:border-[#2a2d35] text-slate-700 dark:text-slate-300 hover:border-[#E8820C] hover:text-[#E8820C] transition-colors"
                  >
                    <User className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="p-2.5 rounded-xl border-2 border-slate-200 dark:border-[#2a2d35] text-slate-400 hover:text-red-500 hover:border-red-300 transition-colors"
                    title="Çıkış Yap"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  title="Giriş Yap"
                  className="p-2.5 rounded-xl border-2 border-slate-200 dark:border-[#2a2d35] text-slate-700 dark:text-slate-300 hover:border-[#E8820C] hover:text-[#E8820C] transition-colors"
                >
                  <User className="w-5 h-5" />
                </Link>
              )}

              {/* Sepet */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E8820C] hover:bg-[#d07205] text-white text-sm sm:text-base font-black transition-all cursor-pointer shadow-sm active:scale-95"
                title="Sepetim"
              >
                <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
                <span className="hidden sm:inline">Sepet</span>
                {totalItems > 0 && (
                  <span className="bg-white text-[#E8820C] text-xs font-black px-2 py-0.5 rounded-full leading-none">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                aria-label="Menü"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="mt-2.5 md:hidden">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`;
              }}
              className="flex border border-gray-200 dark:border-[#2a2d35] rounded-lg overflow-hidden bg-gray-50 dark:bg-[#111318]"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Parça adı veya OEM no..."
                className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 py-2 px-3 focus:outline-none"
              />
              <button type="submit" className="bg-[#E8820C] text-white px-4 flex items-center">
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* 3. Brand Mega Menu & Category Nav */}
        <BrandMegaMenu />

        {/* 4. Mobile drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-[#0d0f12] border-t-2 border-slate-200 dark:border-[#2a2d35] p-5 space-y-5 max-h-[80vh] overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-xs font-black uppercase text-slate-500 tracking-wider">
                  Markalar &amp; Modeller
                </p>
                <span className="text-[11px] font-bold text-[#E8820C]">
                  Markaya basıp alt modelleri açın ↓
                </span>
              </div>
              <div className="space-y-2">
                {VEHICLE_CATALOG.map((b) => {
                  const isExpanded = expandedMobileBrand === b.slug;
                  return (
                    <div
                      key={b.slug}
                      className={`border-2 rounded-xl transition-all overflow-hidden ${
                        isExpanded
                          ? 'border-[#E8820C] bg-orange-50/40 dark:bg-[#141822] shadow-sm'
                          : 'border-slate-200 dark:border-[#2a2d35] bg-slate-50 dark:bg-[#11141c]'
                      }`}
                    >
                      {/* Brand Header — clickable button to toggle accordion */}
                      <button
                        type="button"
                        onClick={() => setExpandedMobileBrand(isExpanded ? null : b.slug)}
                        className="w-full flex items-center justify-between p-3 cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={isExpanded ? 'text-[#E8820C]' : 'text-slate-600 dark:text-slate-400'}>
                            {getBrandLogo(b.brand, 'w-5 h-5')}
                          </span>
                          <span className="font-black text-sm text-slate-900 dark:text-white uppercase">
                            {b.brand}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400 font-mono">
                            ({b.models.length} model)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-[#E8820C]' : ''
                            }`}
                          />
                        </div>
                      </button>

                      {/* Sub-models list when tapped */}
                      {isExpanded && (
                        <div className="p-3 pt-0 border-t border-slate-200/80 dark:border-slate-800 space-y-2">
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-[11px] font-black uppercase text-slate-500">
                              Tüm {b.brand} Modelleri:
                            </span>
                            <Link
                              href={`/shop?brand=${encodeURIComponent(b.brand)}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-xs font-black text-[#E8820C] hover:underline"
                            >
                              Tüm Parçaları Gör →
                            </Link>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                            {b.models.map((m) => (
                              <Link
                                key={m.name}
                                href={`/shop?brand=${encodeURIComponent(b.brand)}&model=${encodeURIComponent(m.name)}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-white hover:bg-[#E8820C] bg-white dark:bg-[#1a1e28] border border-slate-200 dark:border-slate-800 p-2 rounded-lg truncate transition-colors flex flex-col"
                              >
                                <span className="truncate">{m.name}</span>
                                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-normal mt-0.5">
                                  {m.years}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t-2 border-slate-100 dark:border-[#2a2d35] pt-4 space-y-2">
              <p className="text-xs font-black uppercase text-slate-500 tracking-wider mb-2">Kategoriler</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat, i) => (
                  <Link
                    key={i}
                    href={cat.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-slate-50 dark:bg-[#141822] text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#E8820C]"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t-2 border-slate-100 dark:border-[#2a2d35] pt-4 flex items-center justify-between">
              <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                <Package className="w-4 h-4 text-[#E8820C]" />
                <span>Sipariş Takibi</span>
              </Link>
              <a href="tel:05422924492" className="text-sm font-black text-[#E8820C]">
                0542 292 44 92
              </a>
            </div>
          </div>
        )}

      </header>
    </>
  );
}
