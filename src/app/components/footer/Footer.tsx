import React from 'react';
import Link from 'next/link';
import { Wrench, Phone, Mail, MapPin, ShieldCheck, Truck, RefreshCw, CreditCard } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 transition-colors">
      {/* Advantage Banner */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-amber-400/10 text-amber-500 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold text-sm">DHL Express Hızlı Kargo</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">2500 TL üzeri ücretsiz teslimat</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-amber-400/10 text-amber-500 dark:text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold text-sm">%100 Şasi Uyumu</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">17 haneli VIN ile parça garantisi</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-amber-400/10 text-amber-500 dark:text-amber-400 flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold text-sm">Kolay Değişim & İade</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">14 gün koşulsuz iade hakkı</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-amber-400/10 text-amber-500 dark:text-amber-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold text-sm">İyzico Güvenli Ödeme</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">256-bit SSL korumalı altyapı</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

        {/* Brand info */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Wrench className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              ONLINE HIZLI <span className="text-amber-500 font-extrabold">PARÇA</span>
            </span>
          </Link>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
            Online Hızlı Parça; Kemal Oto güvencesiyle Opel, Peugeot, Citroën, Chevrolet ve DS grubu binek ve ticari araç sahiplerine orijinal ve A kalite muadil yedek parça çözümleri sunar.
          </p>
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>MUTLUBAŞLAR PLAZA, KEMALPAŞA CADDESİ, 5.SANAYİ SİTESİ PINARBAŞI NO:344B, 35060 Bornova/İzmir</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <a href="tel:05422924492" className="hover:text-amber-500">0542 292 44 92</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-500 shrink-0" />
              <a href="mailto:info@onlinehizliparca.com" className="hover:text-amber-500">info@onlinehizliparca.com</a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-slate-900 dark:text-white font-bold text-sm mb-4">Hızlı Erişim</h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link href="/garage" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">
                Garajım & Araçlarım
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-orange-600 transition-colors">
                Tüm Ürünler
              </Link>
            </li>
            <li>
              <Link href="/orders" className="text-orange-700 dark:text-orange-400 font-bold hover:underline">
                Siparişlerim & Kargo Takibi
              </Link>
            </li>
            <li>
              <Link href="/shop/categories" className="hover:text-orange-600 transition-colors">
                Kategoriler
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-orange-600 transition-colors">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-amber-500 transition-colors">
                İletişim & Destek
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies & Legal Texts */}
        <div>
          <h3 className="text-slate-900 dark:text-white font-bold text-sm mb-4">Kurumsal & Politikalar</h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link href="/policies/privacy" className="hover:text-orange-600 transition-colors">
                Gizlilik ve Güvenlik
              </Link>
            </li>
            <li>
              <Link href="/policies/terms" className="hover:text-orange-600 transition-colors">
                Kullanım Koşulları
              </Link>
            </li>
            <li>
              <Link href="/policies/kvkk" className="hover:text-orange-600 transition-colors">
                KVKK & Çerez Politikası
              </Link>
            </li>
            <li>
              <Link href="/policies/distance-sales" className="hover:text-orange-600 transition-colors">
                Mesafeli Satış Sözleşmesi
              </Link>
            </li>
            <li>
              <Link href="/policies/returns" className="hover:text-orange-600 transition-colors">
                Teslimat ve İade Şartları
              </Link>
            </li>
            <li>
              <Link href="/policies/warranty" className="hover:text-orange-600 transition-colors">
                Garanti & Orijinallik
              </Link>
            </li>
          </ul>
        </div>

        {/* Priority Brands & Support */}
        <div>
          <h3 className="text-slate-900 dark:text-white font-bold text-sm mb-4">Öncelikli Markalar</h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/shop?brand=Opel" className="hover:text-orange-600 transition-colors">
                Opel Parçaları
              </Link>
            </li>
            <li>
              <Link href="/shop?brand=Peugeot" className="hover:text-orange-600 transition-colors">
                Peugeot Parçaları
              </Link>
            </li>
            <li>
              <Link href="/shop?brand=Citroën" className="hover:text-orange-600 transition-colors">
                Citroën Parçaları
              </Link>
            </li>
            <li>
              <Link href="/shop?brand=Chevrolet" className="hover:text-orange-600 transition-colors">
                Chevrolet Parçaları
              </Link>
            </li>
            <li>
              <Link href="/shop?brand=DS%20Automobiles" className="hover:text-orange-600 transition-colors">
                DS Automobiles
              </Link>
            </li>
            <li className="pt-2">
              <span className="block text-slate-500 text-[11px]">WhatsApp Destek Hattı:</span>
              <a href="https://wa.me/905422924492" target="_blank" rel="noopener noreferrer" className="text-slate-900 dark:text-white font-bold text-xs hover:text-orange-600">0542 292 44 92</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 dark:border-slate-900 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Online Hızlı Parça (Kemal Oto A.Ş.). Tüm Hakları Saklıdır.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/policies/privacy" className="hover:text-orange-600 transition-colors">
              Gizlilik Politikası
            </Link>
            <span>•</span>
            <Link href="/policies/terms" className="hover:text-orange-600 transition-colors">
              Kullanım Koşulları
            </Link>
            <span>•</span>
            <Link href="/policies/kvkk" className="hover:text-orange-600 transition-colors">
              KVKK Aydınlatma Metni
            </Link>
            <span>•</span>
            <Link href="/policies/distance-sales" className="hover:text-orange-600 transition-colors">
              Mesafeli Satış
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
