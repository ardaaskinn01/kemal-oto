'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  Sparkles
} from 'lucide-react';
import { useGarage } from '../../contexts/GarageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useShippingSettings } from '../../contexts/ShippingSettingsContext';
import { GarageModal } from '../garage/GarageModal';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { activeVehicle, setIsGarageModalOpen } = useGarage();
  const { user, profile, isAdmin, signOut } = useAuth();
  const { shippingSettings } = useShippingSettings();

  const subCategories = [
    { name: 'Periyodik Bakım', href: '/shop?category=ic-donanim-bakim' },
    { name: 'Fren Sistemi', href: '/shop?category=fren-suspansiyon' },
    { name: 'Motor & Triger', href: '/shop?category=motor-aktarma' },
    { name: 'Ön Takım & Süspansiyon', href: '/shop?category=fren-suspansiyon' },
    { name: 'Aydınlatma & Elektrik', href: '/shop?category=aydinlatma-elektrik' },
    { name: 'Kaporta & Aksam', href: '/shop?category=kaporta-aksesuar' },
    { name: 'Opel', href: '/shop?brand=Opel', isBrand: true },
    { name: 'Peugeot', href: '/shop?brand=Peugeot', isBrand: true },
    { name: 'Citroën', href: '/shop?brand=Citro%C3%ABn', isBrand: true },
    { name: 'Chevrolet', href: '/shop?brand=Chevrolet', isBrand: true },
    { name: 'DS', href: '/shop?brand=DS%20Automobiles', isBrand: true },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">

        {/* 1. Top Utility Strip */}
        <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 text-xs py-1.5 px-3 sm:px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[11px] truncate">
              <MapPin className="w-3.5 h-3.5 text-orange-600 dark:text-orange-500 shrink-0" />
              <span className="truncate">Maslak Oto Sanayi • Depodan Hızlı Sevk</span>
            </div>

            <div className="hidden md:flex items-center gap-4 text-[11px] font-medium shrink-0">
              <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                <Truck className="w-3.5 h-3.5 text-orange-600 dark:text-orange-500" />
                {shippingSettings.freeThreshold} TL Üzeri Ücretsiz Kargo
              </span>
              <span>•</span>
              <a href="tel:08503000000" className="flex items-center gap-1 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                <PhoneCall className="w-3.5 h-3.5 text-orange-600 dark:text-orange-500" />
                <span>0850 300 00 00 / Destek</span>
              </a>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link href="/tracking" className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 flex items-center gap-1 whitespace-nowrap">
                <Truck className="w-3 h-3 text-orange-600 shrink-0" />
                <span>Kargom Nerede?</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 2. Main Navigation */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
          <div className="flex items-center justify-between gap-2 sm:gap-6">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-orange-600 text-white flex items-center justify-center font-black shadow-sm shrink-0">
                <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
                  KEMAL<span className="text-orange-600">OTO</span>
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-wider text-slate-500 uppercase font-semibold mt-0.5">
                  Oto Yedek Parça
                </span>
              </div>
            </Link>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery) {
                    window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                className="w-full flex rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 overflow-hidden focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 transition-all"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Parça adı, OEM referans numarası veya şasi no ile arayın..."
                  className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm py-2.5 pl-4 pr-3 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-5 flex items-center justify-center font-bold text-xs transition-colors shrink-0 cursor-pointer"
                  aria-label="Ara"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Action Tools */}
            <div className="flex items-center gap-1 sm:gap-2.5">

              {/* Garage Vehicle Button */}
              <button
                type="button"
                onClick={() => setIsGarageModalOpen(true)}
                title={activeVehicle ? `Aktif Araç: ${activeVehicle.make} ${activeVehicle.model}` : 'Araç Seç'}
                className={`flex items-center gap-1.5 text-xs font-semibold p-2 sm:px-3 sm:py-2 rounded-lg border transition-all cursor-pointer ${activeVehicle
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
              >
                <Car className={`w-4 h-4 shrink-0 ${activeVehicle ? 'text-emerald-600 dark:text-emerald-400' : 'text-orange-600'}`} />
                {activeVehicle ? (
                  <div className="hidden sm:flex flex-col text-left leading-tight">
                    <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">Aracım:</span>
                    <span className="truncate max-w-[80px] lg:max-w-[110px] text-slate-900 dark:text-white font-bold">
                      {activeVehicle.make} {activeVehicle.model}
                    </span>
                  </div>
                ) : (
                  <span className="hidden sm:inline">Araç Seç</span>
                )}
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Admin Button */}
              {isAdmin && (
                <Link
                  href="/admin"
                  className="bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40 text-xs font-bold p-2 sm:px-2.5 sm:py-2 rounded-lg transition-all flex items-center gap-1.5"
                  title="Admin Paneli"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden lg:inline">Admin</span>
                </Link>
              )}

              {/* User Profile */}
              {user ? (
                <div className="flex items-center gap-1">
                  <Link
                    href="/garage"
                    className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2 sm:px-2.5 sm:py-1.5 flex flex-col text-left text-xs"
                    title="Hesabım"
                  >
                    <span className="hidden sm:inline text-[10px] text-slate-500">Hesabım</span>
                    <span className="hidden sm:inline font-semibold text-slate-900 dark:text-white truncate max-w-[70px]">
                      {profile?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                    </span>
                    <User className="w-4 h-4 text-orange-600 sm:hidden" />
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="p-2 text-slate-500 hover:text-red-600 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg transition-colors"
                    title="Çıkış"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-orange-600 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2 sm:px-3 sm:py-2 transition-all"
                  title="Giriş Yap"
                >
                  <User className="w-4 h-4 text-orange-600 shrink-0" />
                  <span className="hidden sm:inline">Giriş</span>
                </Link>
              )}

              {/* Cart */}
              <Link
                href="/shop"
                className="relative p-2 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-500/30 hover:bg-orange-100 text-orange-700 dark:text-orange-400 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                title="Sepet"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-bold text-orange-700 dark:text-orange-300">
                  Sepet (0)
                </span>
                <span className="sm:hidden text-[10px] font-extrabold bg-orange-600 text-white rounded-full w-4 h-4 flex items-center justify-center -ml-0.5">
                  0
                </span>
              </Link>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white focus:outline-none shrink-0"
                aria-label="Menüyü Aç"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* 3. Sub-Category Navigation Bar (Clean E-Commerce Standard) */}
        <div className="hidden md:block bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between text-xs font-semibold overflow-x-auto py-2.5 scrollbar-none gap-6">
              <Link
                href="/shop/categories"
                className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 font-bold shrink-0 hover:underline"
              >
                <Menu className="w-3.5 h-3.5" />
                <span>Tüm Kategoriler</span>
              </Link>

              <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 shrink-0" />

              <div className="flex items-center gap-5 shrink-0">
                {subCategories.map((cat, i) => (
                  <Link
                    key={i}
                    href={cat.href}
                    className={`transition-colors whitespace-nowrap ${cat.isBrand
                        ? 'font-bold text-slate-900 dark:text-white hover:text-orange-600'
                        : 'text-slate-600 dark:text-slate-300 hover:text-orange-600'
                      }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 py-4 px-4 space-y-3 bg-white dark:bg-slate-950">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery) {
                  window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`;
                }
              }}
              className="flex rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 overflow-hidden"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Parça adı veya OEM ara..."
                className="w-full bg-transparent text-slate-900 dark:text-white text-xs py-2 px-3 focus:outline-none"
              />
              <button type="submit" className="bg-orange-600 text-white px-3">
                <Search className="w-4 h-4" />
              </button>
            </form>

            <div className="flex flex-col space-y-2 text-xs font-semibold pt-2">
              <Link href="/garage" onClick={() => setMobileMenuOpen(false)} className="py-2 text-emerald-600 font-bold flex items-center gap-2">
                <Car className="w-4 h-4" />
                <span>Garajım & Araçlarım</span>
              </Link>
              <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-700 dark:text-slate-200">
                Tüm Ürünler
              </Link>
              <Link href="/shop/categories" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-700 dark:text-slate-200">
                Kategoriler
              </Link>
              <Link href="/tracking" onClick={() => setMobileMenuOpen(false)} className="py-2 text-orange-600 font-bold">
                Kargo Takibi (DHL)
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-700 dark:text-slate-200">
                İletişim & Maslak Depo
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Garage Modal */}
      <GarageModal />
    </>
  );
}
