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

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  useEffect(() => {
    const q = searchQuery.trim();
    if (q.length >= 2) {
      const fetchLiveSearch = async () => {
        try {
          const { supabase } = await import('../../lib/supabaseClient');
          const { data } = await supabase
            .from('products')
            .select('*')
            .or(`title.ilike.%${q}%,part_number.ilike.%${q}%,brand.ilike.%${q}%`)
            .limit(5);
          setSearchResults((data as Product[]) || []);
        } catch (e) {
          setSearchResults([]);
        }
      };
      fetchLiveSearch();
    } else {
      setSearchResults([]);
    }
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
      <header className="sticky top-0 z-40 bg-white dark:bg-[#0d0f12] border-b border-gray-200 dark:border-[#2a2d35] transition-colors">

        {/* 1. Top strip — PSA Authority */}
        <div className="bg-gray-50 dark:bg-[#111318] border-b border-gray-200 dark:border-[#2a2d35] text-xs text-gray-500 dark:text-gray-400 py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              <strong className="text-[#E8820C]">PSA Grubu & GM</strong> (Peugeot • Citroën • Opel • Chevrolet • DS) Yedek Parça Merkezi
            </span>
            <div className="flex items-center gap-4">
              <a href="tel:05422924492" className="hover:text-[#E8820C] transition-colors font-semibold">
                Destek: 0542 292 44 92
              </a>
            </div>
          </div>
        </div>

        {/* 2. Main header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-4">

            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-slate-200 dark:border-[#2a2d35] bg-white shadow-sm">
                <Image
                  src="/logo.png"
                  alt="Kemal Oto Logo"
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>
              <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                Online Hızlı<span className="text-[#E8820C]">Parça</span>
              </span>
            </Link>

            {/* Search — centered, flex-1 */}
            <div ref={searchRef} className="hidden md:block flex-1 max-w-xl relative mx-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    setIsSearchOpen(false);
                    window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                className="flex items-center border-2 border-slate-300 dark:border-[#2a2d35] rounded-xl overflow-hidden bg-slate-50 dark:bg-[#111318] focus-within:border-[#E8820C] focus-within:bg-white dark:focus-within:bg-[#1a1d23] transition-all shadow-sm"
              >
                <Search className="w-5 h-5 text-slate-400 ml-3.5 shrink-0 stroke-[2.5]" />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsSearchOpen(true)}
                  onChange={(e) => { setSearchQuery(e.target.value); setIsSearchOpen(true); }}
                  placeholder="Parça adı veya OEM parça numarası ara..."
                  className="flex-1 bg-transparent text-sm sm:text-base font-medium text-slate-900 dark:text-white placeholder-slate-400 py-3 px-3 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#E8820C] hover:bg-[#d4740a] text-white px-6 py-3 text-sm sm:text-base font-extrabold transition-colors shrink-0 cursor-pointer uppercase tracking-wider"
                >
                  Ara
                </button>
              </form>

              {/* Autocomplete dropdown */}
              {isSearchOpen && searchQuery.trim().length >= 2 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-[#111318] border-2 border-slate-200 dark:border-[#2a2d35] rounded-xl shadow-xl z-50 overflow-hidden text-xs">
                  {searchResults.length > 0 ? (
                    <div className="divide-y divide-gray-100 dark:divide-[#2a2d35]">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/shop/products/${product.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center gap-3 p-3.5 hover:bg-gray-50 dark:hover:bg-[#1a1d23] transition-colors"
                        >
                          <div className="w-11 h-11 rounded-lg bg-gray-100 dark:bg-[#2a2d35] overflow-hidden relative shrink-0">
                            {product.image_url ? (
                              <Image src={product.image_url} alt={product.title} fill className="object-cover" />
                            ) : (
                              <Wrench className="w-5 h-5 text-gray-400 m-auto mt-3" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-gray-900 dark:text-white truncate">{product.title}</p>
                            <p className="text-gray-400 font-mono mt-0.5 font-semibold">OEM: {product.part_number}</p>
                          </div>
                          <span className="text-base font-black text-gray-900 dark:text-white shrink-0">
                            {formatCurrency(product.price)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      <p className="font-bold text-gray-700 dark:text-gray-300">Ürün bulunamadı.</p>
                      <p className="text-xs mt-1">OEM numarasını veya araç modelini deneyin.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2.5 ml-auto">

              {/* Garaj butonu */}
              <button
                type="button"
                onClick={() => setIsGarageModalOpen(true)}
                title={activeVehicle ? `${activeVehicle.make} ${activeVehicle.model}` : 'Aracınızı seçin'}
                className={`hidden sm:flex items-center gap-2 text-xs sm:text-sm px-4 py-2.5 rounded-xl border-2 transition-colors cursor-pointer font-bold ${
                  activeVehicle
                    ? 'border-emerald-500 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30'
                    : 'border-slate-200 dark:border-[#2a2d35] text-slate-700 dark:text-slate-300 hover:border-[#E8820C] hover:text-[#E8820C]'
                }`}
              >
                <Car className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 stroke-[2.5]" />
                <span className="max-w-[120px] truncate">
                  {activeVehicle ? `${activeVehicle.make} ${activeVehicle.model}` : 'Araç Seç'}
                </span>
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
              <p className="text-xs font-black uppercase text-slate-500 tracking-wider mb-2.5">
                Markalar & Modeller
              </p>
              <div className="space-y-3">
                {VEHICLE_CATALOG.map((b) => (
                  <div key={b.slug} className="border-2 border-slate-200 dark:border-[#2a2d35] rounded-xl p-3 bg-slate-50 dark:bg-[#141822]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-sm text-slate-900 dark:text-white uppercase">{b.brand}</span>
                      <Link
                        href={`/shop?brand=${encodeURIComponent(b.brand)}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-xs font-bold text-[#E8820C] hover:underline"
                      >
                        Tümü →
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-slate-200 dark:border-slate-800">
                      {b.models.slice(0, 8).map((m) => (
                        <Link
                          key={m.name}
                          href={`/shop?brand=${encodeURIComponent(b.brand)}&model=${encodeURIComponent(m.name)}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xs text-slate-700 dark:text-slate-300 hover:text-[#E8820C] p-1 truncate"
                        >
                          {m.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
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
