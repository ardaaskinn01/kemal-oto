import React from 'react';
import Link from 'next/link';
import { Wrench, Phone, Mail, MapPin, ShieldCheck, Truck, RefreshCw, CreditCard } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      {/* Advantage Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">DHL Express Hızlı Kargo</h4>
              <p className="text-xs text-slate-400">Otomatik desi optimizasyonu & ertesi gün teslimat</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">%100 Orijinal Uyum</h4>
              <p className="text-xs text-slate-400">Şase no ile %100 parça garantisi</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Kolay İade</h4>
              <p className="text-xs text-slate-400">14 gün koşulsuz iade hakkı</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Güvenli Ödeme</h4>
              <p className="text-xs text-slate-400">256-bit SSL korumalı altyapı</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Brand info */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-white">
              KEMAL<span className="text-orange-500">OTO</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Kemal Oto, Türkiye'nin dört bir yanındaki binek ve ticari araç sahiplerine orijinal yedek parça, madeni yağ ve oto aksesuar çözümleri sunar.
          </p>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Oto Sanayi Sitesi, 2. Blok No:42, Maslak / İstanbul</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-500 shrink-0" />
              <span>0850 300 00 00 / 0212 500 00 00</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-orange-500 shrink-0" />
              <span>destek@kemaloto.com</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-sm mb-4">Hızlı Erişim</h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link href="/shop" className="hover:text-orange-400 transition-colors">
                Tüm Ürünler
              </Link>
            </li>
            <li>
              <Link href="/tracking" className="text-amber-400 hover:text-amber-300 font-bold transition-colors">
                DHL Kargo Takibi
              </Link>
            </li>
            <li>
              <Link href="/shop/categories" className="hover:text-orange-400 transition-colors">
                Kategoriler
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-orange-400 transition-colors">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-orange-400 transition-colors">
                İletişim & Konum
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold text-sm mb-4">Popüler Kategoriler</h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link href="/shop?category=fren-suspansiyon" className="hover:text-orange-400 transition-colors">
                Fren Disk & Balataları
              </Link>
            </li>
            <li>
              <Link href="/shop?category=motor-aktarma" className="hover:text-orange-400 transition-colors">
                Triger Setleri & Filtreler
              </Link>
            </li>
            <li>
              <Link href="/shop?category=aydinlatma-elektrik" className="hover:text-orange-400 transition-colors">
                LED Far & Aydınlatma
              </Link>
            </li>
            <li>
              <Link href="/shop?category=ic-donanim-bakim" className="hover:text-orange-400 transition-colors">
                Motor Yağları & Bakım
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-white font-semibold text-sm mb-4">Müşteri Hizmetleri</h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <span className="block text-slate-400">Pazartesi - Cumartesi</span>
              <span className="text-white font-medium">08:30 - 19:30</span>
            </li>
            <li>
              <span className="block text-slate-400">Şase Numarası İle Sorgulama:</span>
              <span className="text-orange-400 font-medium">+90 530 000 00 00 (WhatsApp)</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Kemal Oto E-Ticaret A.Ş. Tüm Hakları Saklıdır.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Gizlilik Politikası</span>
            <span>•</span>
            <span>Kullanım Koşulları</span>
            <span>•</span>
            <span>KVKK Aydınlatma Metni</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
