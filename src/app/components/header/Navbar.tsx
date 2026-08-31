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
  PhoneCall,
  ShieldCheck,
  Wrench,
  Truck,
  LayoutDashboard,
  LogOut,
  MapPin,
  ChevronDown,
  Sparkles,
  Package,
  Tag,
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import { useGarage } from '../../contexts/GarageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useShippingSettings } from '../../contexts/ShippingSettingsContext';
import { useCart } from '../../contexts/CartContext';
import { ThemeToggle } from '../ui/ThemeToggle';
import { SAMPLE_PRODUCTS, formatCurrency } from '../../lib/utils';
import { Product } from '../../types/database.types';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { activeVehicle, setIsGarageModalOpen } = useGarage();
  const { user, profile, isAdmin, signOut } = useAuth();
  const { shippingSettings } = useShippingSettings();
  const { totalItems, setIsCartOpen } = useCart();

  // Close search suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for instant autocomplete
  const searchResults: Product[] = searchQuery.trim().length >= 2
    ? SAMPLE_PRODUCTS.filter((p) => {
        const q = searchQuery.toLowerCase().trim();
        return (
          p.title.toLowerCase().includes(q) ||
          p.part_number.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.vehicle_compatibility.some(
            (vc) => vc.brand.toLowerCase().includes(q) || vc.model.toLowerCase().includes(q)
          )
        );
      }).slice(0, 5)
    : [];

  const mainBrands = [
    { name: 'Opel', href: '/shop?brand=Opel', color: 'border-yellow-400 text-yellow-600 bg-yellow-50 dark:bg-yellow-950/30' },
    { name: 'Peugeot', href: '/shop?brand=Peugeot', color: 'border-blue-400 text-blue-600 bg-blue-50 dark:bg-blue-950/30' },
    { name: 'Citroën', href: '/shop?brand=Citro%C3%ABn', color: 'border-red-400 text-red-600 bg-red-50 dark:bg-red-950/30' },
    { name: 'Chevrolet', href: '/shop?brand=Chevrolet', color: 'border-amber-500 text-amber-700 bg-amber-50 dark:bg-amber-950/30' },
    { name: 'DS', href: '/shop?brand=DS%20Automobiles', color: 'border-purple-400 text-purple-600 bg-purple-50 dark:bg-purple-950/30' },
  ];

  const categories = [
    { name: 'İç Donanım & Periyodik Bakım', href: '/shop?category=ic-donanim-bakim', icon: Sparkles },
    { name: 'Fren & Süspansiyon Sistemleri', href: '/shop?category=fren-suspansiyon', icon: SlidersHorizontal },
    { name: 'Motor & Aktarma Organları', href: '/shop?category=motor-aktarma', icon: Wrench },
    { name: 'Aydınlatma & Elektrik Aksamı', href: '/shop?category=aydinlatma-elektrik', icon: Tag },
    { name: 'Kaporta & Dış Aksesuarlar', href: '/shop?category=kaporta-aksesuar', icon: Package },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors shadow-sm">

        {/* 1. Top Utility Strip (Duyuru & Kurumsal Bilgi Bandı) */}
        <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-3 sm:px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 text-[11px] font-medium truncate">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Truck className="w-3.5 h-3.5 shrink-0" />
                <span>81 İle Aynı Gün Kargo</span>
              </span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="hidden sm:flex items-center gap-1 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Şasi Numarası ile %100 Uyum Garantisi</span>
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-medium shrink-0">
              <a href="tel:05422924492" className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors">
                <PhoneCall className="w-3.5 h-3.5" />
                <span className="font-bold">0542 292 44 92 / Destek Hattı</span>
              </a>
              <span className="hidden md:inline text-slate-700">•</span>
              <Link href="/orders" className="hidden md:flex items-center gap-1 text-slate-300 hover:text-white transition-colors">
                <Package className="w-3.5 h-3.5 text-amber-400" />
                <span>Kargo & Sipariş Takibi</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 2. Main E-Commerce Header (Yüksek Yoğunluklu Logo, Canlı Arama, Araç & Sepet) */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-3 sm:gap-6">

            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-400/20 group-hover:scale-105 transition-transform">
                <Wrench className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white leading-none">
                  ONLINE HIZLI <span className="text-amber-500 font-extrabold">PARÇA</span>
                </span>
                <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-0.5">
                  Kemal Oto Güvencesiyle
                </span>
              </div>
            </Link>

            {/* Live Autocomplete Search Bar (Desktop) */}
            <div ref={searchRef} className="hidden md:block flex-1 max-w-2xl relative">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    setIsSearchOpen(false);
                    window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                className="w-full flex rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 overflow-hidden focus-within:border-amber-400 focus-within:bg-white dark:focus-within:bg-slate-950 transition-all shadow-inner"
              >
                <div className="flex-1 flex items-center px-3.5">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onFocus={() => setIsSearchOpen(true)}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchOpen(true);
                    }}
                    placeholder="Parça adı, OEM referans numarası veya araç modeli ile arayın..."
                    className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm py-2.5 pl-2.5 pr-3 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 px-6 font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>ARA</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </form>

              {/* Instant Search Results Autocomplete Dropdown */}
              {isSearchOpen && searchQuery.trim().length >= 2 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden text-xs">
                  <div className="p-2 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 font-bold text-slate-500 flex justify-between items-center text-[11px]">
                    <span>ARAMA SONUÇLARI SUGGESTIONS</span>
                    <span>{searchResults.length} Ürün Bulundu</span>
                  </div>

                  {searchResults.length > 0 ? (
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/shop/products/${product.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden relative shrink-0 border border-slate-200 dark:border-slate-700">
                            {product.image_url ? (
                              <Image
                                src={product.image_url}
                                alt={product.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <Wrench className="w-5 h-5 text-slate-400 m-auto mt-2.5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-900 dark:text-white truncate">
                              {product.title}
                            </p>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                              <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-amber-600 dark:text-amber-400 font-bold">
                                OEM: {product.part_number}
                              </span>
                              <span>•</span>
                              <span>{product.brand}</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-black text-slate-900 dark:text-white text-sm">
                              {formatCurrency(product.price)}
                            </span>
                          </div>
                        </Link>
                      ))}

                      <Link
                        href={`/shop?q=${encodeURIComponent(searchQuery.trim())}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="block text-center p-2.5 bg-amber-400/10 hover:bg-amber-400/20 text-slate-900 dark:text-amber-400 font-bold transition-colors text-xs"
                      >
                        Tüm &quot;{searchQuery}&quot; sonuçlarını göster →
                      </Link>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-slate-500">
                      <p className="font-semibold text-slate-700 dark:text-slate-300">Aramanızla eşleşen ürün bulunamadı.</p>
                      <p className="text-[11px] mt-1">Lütfen OEM numarasını veya araç modelini kontrol edip tekrar deneyin.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Header Right Action Tools */}
            <div className="flex items-center gap-2 sm:gap-3">

              {/* Garage Vehicle Button (OnlineYedekParça Style) */}
              <button
                type="button"
                onClick={() => setIsGarageModalOpen(true)}
                title={activeVehicle ? `Seçili Araç: ${activeVehicle.make} ${activeVehicle.model}` : 'Aracınızı Seçin'}
                className={`flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                  activeVehicle
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-300 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-amber-400'
                }`}
              >
                <Car className={`w-4 h-4 shrink-0 ${activeVehicle ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`} />
                <div className="hidden sm:flex flex-col text-left leading-tight">
                  <span className="text-[9px] text-slate-500 uppercase font-extrabold tracking-wider">
                    {activeVehicle ? 'SEÇİLİ ARAÇ' : 'ARACINIZI SEÇİN'}
                  </span>
                  <span className="truncate max-w-[100px] lg:max-w-[130px] font-extrabold text-slate-900 dark:text-white">
                    {activeVehicle ? `${activeVehicle.make} ${activeVehicle.model}` : 'GARAJ EKLE'}
                  </span>
                </div>
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Admin Access (If Admin) */}
              {isAdmin && (
                <Link
                  href="/admin"
                  className="bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold p-2 sm:px-2.5 sm:py-2 rounded-xl hover:bg-amber-500/20 transition-all flex items-center gap-1.5"
                  title="Admin Paneli"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden lg:inline">Admin</span>
                </Link>
              )}

              {/* Account / Login */}
              {user ? (
                <div className="flex items-center gap-1">
                  <Link
                    href="/garage"
                    className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 flex flex-col text-left text-xs hover:border-slate-300 dark:hover:border-slate-700"
                    title="Hesabım"
                  >
                    <span className="text-[9px] text-slate-500 font-extrabold uppercase">Hesabım</span>
                    <span className="font-extrabold text-slate-900 dark:text-white truncate max-w-[80px]">
                      {profile?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                    </span>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="p-2 text-slate-400 hover:text-red-600 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors"
                    title="Çıkış Yap"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-amber-500 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 transition-all"
                  title="Giriş Yap"
                >
                  <User className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="hidden sm:inline">Giriş Yap</span>
                </Link>
              )}

              {/* Cart Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-3.5 py-2 rounded-xl transition-transform active:scale-95 flex items-center gap-2 shrink-0 shadow-md shadow-amber-400/20 cursor-pointer"
                title="Sepetim"
              >
                <ShoppingBag className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                <span className="hidden sm:inline text-xs font-black tracking-wide">
                  SEPET ({totalItems})
                </span>
                <span className="sm:hidden text-[10px] font-extrabold bg-slate-950 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              </button>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 focus:outline-none"
                aria-label="Menüyü Aç"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar (Only visible on small screens) */}
          <div className="mt-2.5 md:hidden">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`;
                }
              }}
              className="flex rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 overflow-hidden"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Parça no veya araç ara..."
                className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-xs py-2 px-3 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-amber-400 text-slate-950 px-4 font-bold text-xs flex items-center justify-center"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* 3. Mega Menu & Brand Category Bar (onlineyedekparca.com Visual Style) */}
        <div className="hidden md:block bg-slate-100 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between text-xs font-bold py-2 overflow-x-auto scrollbar-none gap-4">

              {/* Category Dropdown Trigger */}
              <div className="relative">
                <button
                  onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                  className="flex items-center gap-2 bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 px-3.5 py-1.5 rounded-lg font-extrabold hover:opacity-95 transition-opacity cursor-pointer"
                >
                  <Menu className="w-4 h-4" />
                  <span>TÜM KATEGORİLER</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoryMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {categoryMenuOpen && (
                  <div
                    onMouseLeave={() => setCategoryMenuOpen(false)}
                    className="absolute left-0 top-full mt-1 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 py-2 divide-y divide-slate-100 dark:divide-slate-800"
                  >
                    {categories.map((cat, idx) => {
                      const IconComponent = cat.icon;
                      return (
                        <Link
                          key={idx}
                          href={cat.href}
                          onClick={() => setCategoryMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-amber-400/10 hover:text-amber-600 dark:hover:text-amber-400 font-bold transition-colors"
                        >
                          <IconComponent className="w-4 h-4 text-amber-500" />
                          <span>{cat.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Brand Selector Badges (Opel, Peugeot, Citroën, Chevrolet, DS) */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider mr-1">Markalar:</span>
                {mainBrands.map((brand) => (
                  <Link
                    key={brand.name}
                    href={brand.href}
                    className={`px-3 py-1 rounded-lg border text-xs font-black transition-all hover:scale-105 ${brand.color}`}
                  >
                    {brand.name}
                  </Link>
                ))}
              </div>

              {/* Quick Links */}
              <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300 shrink-0 text-[11px] font-bold">
                <Link href="/shop?category=ic-donanim-bakim" className="hover:text-amber-500 transition-colors">
                  Periyodik Bakım Setleri
                </Link>
                <span>•</span>
                <Link href="/shop?category=fren-suspansiyon" className="hover:text-amber-500 transition-colors">
                  Fren & Balata
                </Link>
                <span>•</span>
                <Link href="/shop?category=motor-aktarma" className="hover:text-amber-500 transition-colors">
                  Triger & Motor
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* 4. Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 p-4 space-y-4">
            <div className="space-y-2">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase">Araç Markaları</p>
              <div className="grid grid-cols-3 gap-2">
                {mainBrands.map((b) => (
                  <Link
                    key={b.name}
                    href={b.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-center rounded-lg border text-xs font-bold bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                  >
                    {b.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase mb-1">Kategoriler</p>
              {categories.map((cat, i) => (
                <Link
                  key={i}
                  href={cat.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-amber-500"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <Link
                href="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
              >
                <Package className="w-4 h-4 text-amber-500" />
                <span>Sipariş Takibi</span>
              </Link>
              <a
                href="tel:05422924492"
                className="text-xs font-bold text-amber-500 flex items-center gap-1"
              >
                <PhoneCall className="w-4 h-4" />
                <span>0542 292 44 92</span>
              </a>
            </div>
          </div>
        )}

      </header>
    </>
  );
}
