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

  const mainBrands = [
    { name: 'Opel', href: '/shop?brand=Opel' },
    { name: 'Peugeot', href: '/shop?brand=Peugeot' },
    { name: 'Citroën', href: '/shop?brand=Citro%C3%ABn' },
    { name: 'Chevrolet', href: '/shop?brand=Chevrolet' },
    { name: 'DS Automobiles', href: '/shop?brand=DS%20Automobiles' },
  ];

  const categories = [
    { name: 'Periyodik Bakım & Filtreler', href: '/shop?category=ic-donanim-bakim' },
    { name: 'Fren & Süspansiyon', href: '/shop?category=fren-suspansiyon' },
    { name: 'Motor & Triger Aksamı', href: '/shop?category=motor-aktarma' },
    { name: 'Soğutma & Isıtma', href: '/shop?category=motor-aktarma' },
    { name: 'Aydınlatma & Elektrik', href: '/shop?category=aydinlatma-elektrik' },
    { name: 'Kaporta & Dış Aksesuar', href: '/shop?category=kaporta-aksesuar' },
    { name: 'İç Donanım & Direksiyon', href: '/shop?category=ic-donanim-bakim' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white dark:bg-[#0d0f12] border-b border-gray-200 dark:border-[#2a2d35] transition-colors">

        {/* 1. Top strip — minimal, text only */}
        <div className="bg-gray-50 dark:bg-[#111318] border-b border-gray-200 dark:border-[#2a2d35] text-xs text-gray-500 dark:text-gray-400 py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span>81 ile aynı gün DHL kargo · Şasi no ile %100 uyum garantisi</span>
            <div className="flex items-center gap-4">
              <a href="tel:05422924492" className="hover:text-[#E8820C] transition-colors font-medium">
                0542 292 44 92
              </a>
            </div>
          </div>
        </div>

        {/* 2. Main header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-4">

            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-gray-200 dark:border-[#2a2d35] bg-white">
                <Image
                  src="/logo.png"
                  alt="Kemal Oto Logo"
                  fill
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <span className="text-base font-bold text-gray-900 dark:text-white tracking-tight leading-none">
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
                className="flex items-center border border-gray-200 dark:border-[#2a2d35] rounded-lg overflow-hidden bg-gray-50 dark:bg-[#111318] focus-within:border-[#E8820C] focus-within:bg-white dark:focus-within:bg-[#1a1d23] transition-colors"
              >
                <Search className="w-4 h-4 text-gray-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsSearchOpen(true)}
                  onChange={(e) => { setSearchQuery(e.target.value); setIsSearchOpen(true); }}
                  placeholder="Parça adı veya OEM no..."
                  className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 py-2.5 px-2.5 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#E8820C] hover:bg-[#d4740a] text-white px-4 py-2.5 text-sm font-semibold transition-colors shrink-0 cursor-pointer"
                >
                  Ara
                </button>
              </form>

              {/* Autocomplete dropdown */}
              {isSearchOpen && searchQuery.trim().length >= 2 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-[#111318] border border-gray-200 dark:border-[#2a2d35] rounded-lg shadow-lg z-50 overflow-hidden text-xs">
                  {searchResults.length > 0 ? (
                    <div className="divide-y divide-gray-100 dark:divide-[#2a2d35]">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/shop/products/${product.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-[#1a1d23] transition-colors"
                        >
                          <div className="w-9 h-9 rounded-md bg-gray-100 dark:bg-[#2a2d35] overflow-hidden relative shrink-0">
                            {product.image_url ? (
                              <Image src={product.image_url} alt={product.title} fill className="object-cover" />
                            ) : (
                              <Wrench className="w-4 h-4 text-gray-400 m-auto mt-2.5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white truncate">{product.title}</p>
                            <p className="text-gray-400 font-mono mt-0.5">OEM: {product.part_number}</p>
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white shrink-0">
                            {formatCurrency(product.price)}
                          </span>
                        </Link>
                      ))}
                      <Link
                        href={`/shop?q=${encodeURIComponent(searchQuery.trim())}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="block text-center p-2.5 text-[#E8820C] font-medium hover:bg-gray-50 dark:hover:bg-[#1a1d23] transition-colors"
                      >
                        Tüm "{searchQuery}" sonuçlarını gör →
                      </Link>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      <p className="font-medium text-gray-700 dark:text-gray-300">Ürün bulunamadı.</p>
                      <p className="text-[11px] mt-1">OEM numarasını veya araç modelini deneyin.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 ml-auto">

              {/* Garaj butonu */}
              <button
                type="button"
                onClick={() => setIsGarageModalOpen(true)}
                title={activeVehicle ? `${activeVehicle.make} ${activeVehicle.model}` : 'Aracınızı seçin'}
                className={`hidden sm:flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border transition-colors cursor-pointer ${
                  activeVehicle
                    ? 'border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30'
                    : 'border-gray-200 dark:border-[#2a2d35] text-gray-600 dark:text-gray-400 hover:border-[#E8820C] hover:text-[#E8820C]'
                }`}
              >
                <Car className="w-4 h-4 shrink-0" />
                <span className="font-medium max-w-[110px] truncate">
                  {activeVehicle ? `${activeVehicle.make} ${activeVehicle.model}` : 'Araç seç'}
                </span>
              </button>

              <ThemeToggle />

              {isAdmin && (
                <Link
                  href="/admin"
                  className="hidden lg:flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-[#2a2d35] text-gray-600 dark:text-gray-400 hover:border-[#E8820C] hover:text-[#E8820C] transition-colors"
                  title="Admin Paneli"
                >
                  <LayoutDashboard className="w-4 h-4" />
                </Link>
              )}

              {/* Hesabım */}
              {user ? (
                <div className="flex items-center gap-1">
                  <Link
                    href="/garage"
                    title="Hesabım"
                    className="p-2 rounded-lg border border-gray-200 dark:border-[#2a2d35] text-gray-600 dark:text-gray-400 hover:border-[#E8820C] hover:text-[#E8820C] transition-colors"
                  >
                    <User className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="p-2 rounded-lg border border-gray-200 dark:border-[#2a2d35] text-gray-400 hover:text-red-500 hover:border-red-300 transition-colors"
                    title="Çıkış Yap"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  title="Giriş Yap"
                  className="p-2 rounded-lg border border-gray-200 dark:border-[#2a2d35] text-gray-600 dark:text-gray-400 hover:border-[#E8820C] hover:text-[#E8820C] transition-colors"
                >
                  <User className="w-4 h-4" />
                </Link>
              )}

              {/* Sepet */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#E8820C] hover:bg-[#d4740a] text-white text-sm font-semibold transition-colors cursor-pointer"
                title="Sepetim"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="text-xs font-bold leading-none">{totalItems}</span>
                )}
              </button>

              {/* Mobile menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                aria-label="Menü"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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

        {/* 3. Category & brand nav bar */}
        <div className="hidden md:block border-t border-gray-100 dark:border-[#1e2128] bg-white dark:bg-[#0d0f12]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-1.5 overflow-x-auto scrollbar-none gap-6">

              {/* Category scroll links */}
              <nav className="flex items-center gap-0.5 overflow-x-auto scrollbar-none">
                {categories.map((cat, idx) => (
                  <Link
                    key={idx}
                    href={cat.href}
                    className="whitespace-nowrap px-3 py-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-[#E8820C] dark:hover:text-[#E8820C] font-medium transition-colors rounded"
                  >
                    {cat.name}
                  </Link>
                ))}
              </nav>

              {/* Brand links — underline text, no pills */}
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-[11px] text-gray-400 mr-1">Marka:</span>
                {mainBrands.map((brand) => (
                  <Link
                    key={brand.name}
                    href={brand.href}
                    className="whitespace-nowrap text-xs text-gray-600 dark:text-gray-400 hover:text-[#E8820C] dark:hover:text-[#E8820C] font-medium underline-offset-2 hover:underline transition-colors px-1.5"
                  >
                    {brand.name}
                  </Link>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* 4. Mobile drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-[#0d0f12] border-t border-gray-100 dark:border-[#2a2d35] p-4 space-y-4">
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase mb-2">Markalar</p>
              <div className="flex flex-wrap gap-2">
                {mainBrands.map((b) => (
                  <Link
                    key={b.name}
                    href={b.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs text-gray-700 dark:text-gray-300 hover:text-[#E8820C] underline-offset-2 hover:underline"
                  >
                    {b.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-[#2a2d35] pt-3 space-y-1">
              <p className="text-[10px] font-semibold text-gray-400 uppercase mb-1">Kategoriler</p>
              {categories.map((cat, i) => (
                <Link
                  key={i}
                  href={cat.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-[#E8820C]"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-100 dark:border-[#2a2d35] pt-3 flex items-center justify-between">
              <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                <Package className="w-4 h-4" />
                <span>Sipariş Takibi</span>
              </Link>
              <a href="tel:05422924492" className="text-sm font-semibold text-[#E8820C]">
                0542 292 44 92
              </a>
            </div>
          </div>
        )}

      </header>
    </>
  );
}
