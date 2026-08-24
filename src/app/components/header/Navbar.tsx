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
  Truck
} from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 text-white text-xs font-semibold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-4">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-4 h-4" /> %100 Orijinal Parça Garantisi
        </span>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:flex items-center gap-1">
          <Truck className="w-4 h-4" /> DHL Express ile 1500 TL Üzeri Ücretsiz Kargo
        </span>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:flex items-center gap-1">
          <PhoneCall className="w-4 h-4" /> Müşteri Destek: 0850 300 00 00
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
              <Wrench className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-white flex items-center">
                KEMAL<span className="text-orange-500">OTO</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-semibold">
                Yedek Parça & Aksesuar
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl relative">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery) {
                  window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`;
                }
              }}
              className="w-full relative"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Parça adı, OEM kodu veya araç modeli ile arayın..."
                className="w-full bg-slate-900/90 text-white placeholder-slate-400 border border-slate-700/80 rounded-full py-2.5 pl-5 pr-12 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors"
                aria-label="Arama yap"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* User & Cart Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors px-3 py-2"
            >
              Tüm Parçalar
            </Link>

            <Link
              href="/tracking"
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-2 rounded-lg transition-colors"
            >
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Kargo Takibi</span>
            </Link>

            <Link
              href="/login"
              className="flex items-center gap-2 text-sm font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2 transition-all"
            >
              <User className="w-4 h-4 text-orange-400" />
              <span className="hidden sm:inline">Giriş Yap</span>
            </Link>

            <Link
              href="/shop"
              className="relative p-2.5 bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 text-orange-400 rounded-lg transition-colors flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline font-semibold text-xs text-white bg-orange-500 px-2 py-0.5 rounded-full">
                0
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 py-4 space-y-3">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery) {
                  window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`;
                }
              }}
              className="relative px-2"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Parça veya OEM arayın..."
                className="w-full bg-slate-900 text-white placeholder-slate-400 border border-slate-700 rounded-lg py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-400"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
            <div className="flex flex-col space-y-2 px-2 pt-2 text-sm font-medium">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-slate-200 hover:text-orange-400"
              >
                Ana Sayfa
              </Link>
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-slate-200 hover:text-orange-400"
              >
                Mağaza & Tüm Parçalar
              </Link>
              <Link
                href="/tracking"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-amber-400 hover:text-amber-300 font-bold flex items-center gap-2"
              >
                <Truck className="w-4 h-4" />
                <span>Kargo Takibi (DHL)</span>
              </Link>
              <Link
                href="/shop/categories"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-slate-200 hover:text-orange-400"
              >
                Kategoriler
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-slate-200 hover:text-orange-400"
              >
                Hakkımızda
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-slate-200 hover:text-orange-400"
              >
                İletişim
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
