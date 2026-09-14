'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Filter, 
  Disc, 
  Wrench, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock
} from 'lucide-react';

interface ServicePackage {
  id: string;
  category: string;
  code: string;
  title: string;
  tagline: string;
  specStandard: string;
  items: string[];
  recommendedInterval: string;
  brands: string[];
  href: string;
  colorTheme: {
    border: string;
    badgeBg: string;
    badgeText: string;
  };
}

const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'periyodik-bakim',
    category: 'RUTİN SERVİS BAKIMI',
    code: 'SET-FLT-01',
    title: "Periyodik Bakım Seti (4'lü Filtre + Yağ)",
    tagline: 'Motor ömrünü koruyan eksiksiz filtre ve fabrika onaylı yağ kombinasyonu.',
    specStandard: 'PSA B71 2297 • GM Dexos2 • Euro 6',
    items: [
      'Yağ Filtresi (Orijinal O-Ring Contalı)',
      'Hava Filtresi (Mikron Düzey Emiş Filtresi)',
      'Aktif Karbonlu / Polen Filtresi (Kabin Hava)',
      'Mazot / Benzin Filtresi (Yakıt Koruma)',
      '5W-30 / 0W-20 Tam Sentetik Motor Yağı (5L)',
    ],
    recommendedInterval: 'Her 10.000 - 15.000 KM veya 1 Yıl',
    brands: ['Mann', 'Purflux', 'Bosch', 'Total Ineo', 'Castrol'],
    href: '/shop?category=filtre-bakim',
    colorTheme: {
      border: 'border-amber-500/40 hover:border-amber-500',
      badgeBg: 'bg-amber-500/10 dark:bg-amber-950/40',
      badgeText: 'text-amber-600 dark:text-amber-400',
    },
  },
  {
    id: 'fren-guvenlik',
    category: 'GÜVENLİK & DURUŞ SİSTEMİ',
    code: 'SET-BRK-02',
    title: 'Fren Güvenlik Paketi (Ön/Arka Balata & Disk)',
    tagline: 'Yüksek hızda sıfır ses, minimum toz ve maksimum frenleme performansı.',
    specStandard: 'ECE R90 Onaylı • Karbon Alaşımlı Disk',
    items: [
      'Havalandırmalı Ön Fren Disk Takımı (Sağ + Sol)',
      'Ön Fren Balata Takımı (Akustik Aşınma Uyarılı)',
      'Arka Fren Balatası / Disk Seti',
      'Yüksek Sıcaklık Sentetik Montaj Gresi',
      'DOT 4 Yüksek Isı Fren Hidrolik Yağı',
    ],
    recommendedInterval: 'Her 30.000 - 40.000 KM Kontrolü',
    brands: ['Brembo', 'Bosch', 'Ferodo', 'TRW', 'Valeo'],
    href: '/shop?category=fren-sistemi',
    colorTheme: {
      border: 'border-blue-500/40 hover:border-blue-500',
      badgeBg: 'bg-blue-500/10 dark:bg-blue-950/40',
      badgeText: 'text-blue-600 dark:text-blue-400',
    },
  },
  {
    id: 'agir-bakim',
    category: 'AĞIR MEKANİK BAKIM',
    code: 'SET-TRG-03',
    title: 'Triger Seti & Devirdaim Ağır Bakım',
    tagline: 'Subap ve motor bloğunu koruyan komple triger zincir/kayış ve soğutma seti.',
    specStandard: 'HNBR Güçlendirilmiş Kauçuk • OEM Standart',
    items: [
      'Güçlendirilmiş Triger Kayışı (Özel Diş Profili)',
      'Otomatik Gergi Bilyası & Avara Kasnak Takımı',
      'Metal Kanatçıklı Su Pompası (Devirdaim)',
      'Krank & Eksantrik Yağ Keçeleri',
      'Organik Konsantre Kırmızı / Mavi Antifriz (3L)',
    ],
    recommendedInterval: 'Her 60.000 - 90.000 KM veya 4 Yıl',
    brands: ['Gates', 'Dayco', 'Continental', 'INA', 'Graf'],
    href: '/shop?category=motor-mekanik&q=triger',
    colorTheme: {
      border: 'border-emerald-500/40 hover:border-emerald-500',
      badgeBg: 'bg-emerald-500/10 dark:bg-emerald-950/40',
      badgeText: 'text-emerald-600 dark:text-emerald-400',
    },
  },
];

export function ServicePackagesSection() {
  return (
    <section className="space-y-6">
      
      {/* Header section with technical badge */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-[#222a3a] pb-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-semibold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            <span>Teknik Servis & Hızlı Bakım İstasyonu</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            En Çok Talep Gören <span className="text-[#E8820C]">Komple Bakım Paketleri</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Aracınızın periyodik bakımını yetkili servis standartlarında eksiksiz tamamlayın. Siparişiniz sevk edilmeden önce şasi ile %100 doğrulanır.
          </p>
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E8820C] hover:underline self-start md:self-auto"
        >
          <span>Tüm Bakım Parçalarını Gör</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 3 Technical Package Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {SERVICE_PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className={`group relative flex flex-col justify-between bg-white dark:bg-[#121622] border-2 rounded-2xl p-5 sm:p-6 transition-all duration-200 shadow-xs hover:shadow-xl ${pkg.colorTheme.border}`}
          >
            <div>
              {/* Card Top: Code & Standard */}
              <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-[#1e2536]">
                <span className="text-[11px] font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1b2230] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {pkg.code}
                </span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border border-transparent ${pkg.colorTheme.badgeBg} ${pkg.colorTheme.badgeText}`}>
                  {pkg.specStandard}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-1 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  {pkg.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#E8820C] transition-colors leading-snug">
                  {pkg.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-0.5">
                  {pkg.tagline}
                </p>
              </div>

              {/* Package Content Checklist */}
              <div className="space-y-2 bg-slate-50 dark:bg-[#161c28] p-3.5 rounded-xl border border-slate-200 dark:border-[#202838] mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                  Paket İçeriği:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  {pkg.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Interval & OEM Brands */}
              <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400 mb-5">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Önerilen Periyot: <strong className="text-slate-700 dark:text-slate-200">{pkg.recommendedInterval}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-400">OEM Tedarikçiler:</span>
                  {pkg.brands.map((brand, i) => (
                    <span key={i} className="text-slate-700 dark:text-slate-300 font-semibold bg-white dark:bg-[#1f2736] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-[11px]">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Action Button */}
            <Link
              href={pkg.href}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#E8820C] hover:bg-[#d07205] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <span>Uyumlu Paketi İncele</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>

      {/* Trust reassurance banner */}
      <div className="p-3.5 bg-slate-900 text-white rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Kemal Oto Usta Teyidi:</strong> Bakım paketleri seçtiğiniz marka ve motor koduna göre depomuzdaki orijinal şemayla eşleştirilir.
          </span>
        </div>
        <div className="flex items-center gap-3 text-amber-400 font-bold shrink-0">
          <span>Saat 16:00&apos;ya Kadar Aynı Gün Sevk</span>
        </div>
      </div>

    </section>
  );
}
