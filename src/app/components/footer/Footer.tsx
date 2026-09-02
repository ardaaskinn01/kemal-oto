'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Wrench, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0d0f12] text-gray-500 dark:text-gray-500 border-t border-gray-200 dark:border-[#2a2d35] transition-colors">

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

        {/* Brand info */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-gray-200 dark:border-[#2a2d35] bg-white">
              <Image
                src="/logo.png"
                alt="Kemal Oto Logo"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <span className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
              Online Hızlı<span className="text-[#E8820C]">Parça</span>
            </span>
          </Link>

          <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
            Kemal Oto güvencesiyle Opel, Peugeot, Citroën, Chevrolet ve DS grubu araçlar için orijinal ve A kalite muadil yedek parça çözümleri.
          </p>

          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#E8820C] shrink-0 mt-0.5" />
              <span>Mutlubaşlar Plaza, Kemalpaşa Cad. 5.Sanayi Sitesi No:344B, 35060 Bornova / İzmir</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#E8820C] shrink-0" />
              <a href="tel:05422924492" className="hover:text-[#E8820C] transition-colors">0542 292 44 92</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#E8820C] shrink-0" />
              <a href="mailto:info@onlinehizliparca.com" className="hover:text-[#E8820C] transition-colors">info@onlinehizliparca.com</a>
            </div>
          </div>
        </div>

        {/* Hızlı Erişim */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Hızlı Erişim</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/garage" className="hover:text-[#E8820C] transition-colors">Garajım &amp; Araçlarım</Link></li>
            <li><Link href="/shop" className="hover:text-[#E8820C] transition-colors">Tüm Ürünler</Link></li>
            <li><Link href="/orders" className="hover:text-[#E8820C] transition-colors">Sipariş Takibi</Link></li>
            <li><Link href="/shop/categories" className="hover:text-[#E8820C] transition-colors">Kategoriler</Link></li>
            <li><Link href="/about" className="hover:text-[#E8820C] transition-colors">Hakkımızda</Link></li>
            <li><Link href="/contact" className="hover:text-[#E8820C] transition-colors">İletişim &amp; Destek</Link></li>
          </ul>
        </div>

        {/* Politikalar */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Politikalar</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/policies/privacy" className="hover:text-[#E8820C] transition-colors">Gizlilik ve Güvenlik</Link></li>
            <li><Link href="/policies/terms" className="hover:text-[#E8820C] transition-colors">Kullanım Koşulları</Link></li>
            <li><Link href="/policies/kvkk" className="hover:text-[#E8820C] transition-colors">KVKK &amp; Çerez</Link></li>
            <li><Link href="/policies/distance-sales" className="hover:text-[#E8820C] transition-colors">Mesafeli Satış</Link></li>
            <li><Link href="/policies/returns" className="hover:text-[#E8820C] transition-colors">Teslimat &amp; İade</Link></li>
            <li><Link href="/policies/warranty" className="hover:text-[#E8820C] transition-colors">Garanti &amp; Orijinallik</Link></li>
            <li>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('openCookieSettings'));
                  }
                }}
                className="text-left text-slate-500 hover:text-[#E8820C] transition-colors text-xs inline-flex items-center gap-1"
              >
                <span>🍪 Çerez Tercihleri</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Markalar */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Markalar</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shop?brand=Opel" className="hover:text-[#E8820C] transition-colors">Opel</Link></li>
            <li><Link href="/shop?brand=Peugeot" className="hover:text-[#E8820C] transition-colors">Peugeot</Link></li>
            <li><Link href="/shop?brand=Citroën" className="hover:text-[#E8820C] transition-colors">Citroën</Link></li>
            <li><Link href="/shop?brand=Chevrolet" className="hover:text-[#E8820C] transition-colors">Chevrolet</Link></li>
            <li><Link href="/shop?brand=DS%20Automobiles" className="hover:text-[#E8820C] transition-colors">DS Automobiles</Link></li>
            <li className="pt-1">
              <span className="text-xs text-gray-400 block mb-0.5">WhatsApp Destek</span>
              <a
                href="https://wa.me/905422924492"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#E8820C] transition-colors"
              >
                0542 292 44 92
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar — centered, no side links */}
      <div className="border-t border-gray-200/50 dark:border-[#2a2d35]/50 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Online Hızlı Parça (Kemal Oto). Tüm Hakları Saklıdır.</p>
        </div>
      </div>

    </footer>
  );
}
