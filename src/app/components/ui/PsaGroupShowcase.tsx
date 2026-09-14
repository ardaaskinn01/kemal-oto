'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Award, Sparkles, CheckCircle2 } from 'lucide-react';

interface PsaBrand {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  logo: string;
  badge: string;
  popularModels: string[];
  engineCodes: { name: string; query: string }[];
  accentColor: string;
}

const PSA_BRANDS: PsaBrand[] = [
  {
    name: 'Peugeot',
    slug: 'Peugeot',
    tagline: 'PureTech & BlueHDi Uzmanı',
    description: '208, 308, 2008, 3008, 5008 ve Rifter için %100 orijinal ve A kalite muadil parçalar.',
    logo: '/brands/peugeot.svg',
    badge: 'Stellantis Orijinal',
    popularModels: ['208', '308', '2008', '3008', '5008', 'Rifter'],
    engineCodes: [
      { name: '1.2 PureTech', query: '1.2 PureTech' },
      { name: '1.5 BlueHDi', query: '1.5 BlueHDi' },
      { name: '1.6 HDi', query: '1.6 HDi' },
      { name: '1.6 THP', query: '1.6 THP' },
    ],
    accentColor: 'border-blue-500/30 group-hover:border-blue-500',
  },
  {
    name: 'Citroën',
    slug: 'Citroën',
    tagline: 'Konfor & Yürüyen Aksam',
    description: 'C3, C4, C5 Aircross, Berlingo ve C-Elysée modellerine özel fabrika kodlu yedek parça.',
    logo: '/brands/citroen.svg',
    badge: 'Stellantis Orijinal',
    popularModels: ['C3', 'C4', 'C5 Aircross', 'Berlingo', 'C-Elysée'],
    engineCodes: [
      { name: '1.6 HDi', query: '1.6 HDi' },
      { name: '1.5 BlueHDi', query: '1.5 BlueHDi' },
      { name: '1.2 PureTech', query: '1.2 PureTech' },
      { name: '1.4 HDi', query: '1.4 HDi' },
    ],
    accentColor: 'border-red-500/30 group-hover:border-red-500',
  },
  {
    name: 'Opel',
    slug: 'Opel',
    tagline: 'Alman Mühendisliği · PSA & GM',
    description: 'Astra, Corsa, Insignia, Mokka ve Grandland için 40 yıllık derin stok ve uyum garantisi.',
    logo: '/brands/opel.svg',
    badge: 'PSA & GM Orijinal',
    popularModels: ['Astra (H/J/K/L)', 'Corsa (D/E/F)', 'Insignia (A/B)', 'Mokka', 'Grandland'],
    engineCodes: [
      { name: '1.6 CDTI', query: '1.6 CDTI' },
      { name: '1.4 Turbo', query: '1.4 Turbo' },
      { name: '1.3 CDTI', query: '1.3 CDTI' },
      { name: '1.2 PureTech', query: '1.2 PureTech' },
    ],
    accentColor: 'border-amber-500/30 group-hover:border-amber-500',
  },
  {
    name: 'Chevrolet',
    slug: 'Chevrolet',
    tagline: 'GM & Ecotec / Opel Ortak Platform',
    description: 'Cruze, Aveo, Captiva ve Trax için motor, mekanik ve elektronik GM orijinal stokları.',
    logo: '/brands/chevrolet.svg',
    badge: 'GM / Opel Platformu',
    popularModels: ['Cruze 1.6/1.4T', 'Aveo T300', 'Captiva 2.0D', 'Trax 1.4T', 'Spark'],
    engineCodes: [
      { name: '1.6 Ecotec', query: '1.6' },
      { name: '1.4 Turbo', query: '1.4 Turbo' },
      { name: '2.0 VCDi', query: '2.0' },
      { name: '1.3 CDTI', query: '1.3' },
    ],
    accentColor: 'border-amber-600/30 group-hover:border-amber-600',
  },
  {
    name: 'DS Automobiles',
    slug: 'DS Automobiles',
    tagline: 'Premium Lüks & Orijinal Parça',
    description: 'DS 7 Crossback, DS 4, DS 3 ve DS 9 için yetkili distribütör çıkışlı orijinal parçalar.',
    logo: '/brands/ds.svg',
    badge: 'Stellantis Premium',
    popularModels: ['DS 7 Crossback', 'DS 4', 'DS 3 Crossback', 'DS 9'],
    engineCodes: [
      { name: '1.6 E-Tense', query: 'E-Tense' },
      { name: '1.5 BlueHDi', query: '1.5 BlueHDi' },
      { name: '1.6 PureTech', query: '1.6 PureTech' },
    ],
    accentColor: 'border-purple-500/30 group-hover:border-purple-500',
  },
];

export function PsaGroupShowcase() {
  return (
    <section className="space-y-6">
      {/* Header Banner - PSA Groupe & GM Authority */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#090c12] via-[#111622] to-[#0b0e14] border border-[#202738] p-6 sm:p-8 md:p-9 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-semibold uppercase tracking-wider">
              <span>Stellantis & General Motors Yetkili Dağıtım</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Sadece Uzman Olduğumuz Markaların <span className="text-[#E8820C]">Orijinal & Garantili</span> Parçaları
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Online Hızlı Parça olarak odağımızı dağıtmıyor; yalnızca <strong>Peugeot, Citroën, Opel, Chevrolet ve DS Automobiles</strong> araçlarına hizmet veriyoruz. Motor kodu ve şasi teyidiyle aracınıza %100 doğru parçayı ulaştırıyoruz.
            </p>
          </div>

          {/* Mini Trust Stats */}
          <div className="grid grid-cols-2 gap-3 shrink-0 sm:min-w-[280px]">
            <div className="bg-[#141a26]/90 border border-[#222c3e] p-3.5 rounded-xl">
              <span className="text-xl font-bold text-white block">5 Marka</span>
              <span className="text-xs text-gray-400">PSA & GM Derin Stok</span>
            </div>
            <div className="bg-[#141a26]/90 border border-[#222c3e] p-3.5 rounded-xl">
              <span className="text-xl font-bold text-[#E8820C] block">%100 Uyum</span>
              <span className="text-xs text-gray-400">Şasi & Motor Doğrulaması</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Brand Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {PSA_BRANDS.map((brand) => (
          <div
            key={brand.slug}
            className={`group relative flex flex-col justify-between bg-white dark:bg-[#111520] border rounded-2xl p-5 hover:shadow-xl transition-all duration-200 ${brand.accentColor}`}
          >
            <div>
              {/* Brand Top: Logo & Badge */}
              <Link href={`/shop?brand=${encodeURIComponent(brand.slug)}`} className="flex items-center justify-between gap-3 mb-3.5 group/logo">
                <div className="relative w-12 h-12 rounded-xl bg-gray-50 dark:bg-[#161c28] border border-gray-200/60 dark:border-[#263044] p-2 flex items-center justify-center text-gray-800 dark:text-white group-hover/logo:scale-105 transition-transform">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} Logo`}
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>

                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 dark:bg-[#192030] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#2a364d]">
                  {brand.badge}
                </span>
              </Link>

              {/* Title & Tagline */}
              <Link href={`/shop?brand=${encodeURIComponent(brand.slug)}`} className="block group/title">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover/title:text-[#E8820C] transition-colors">
                  {brand.name}
                </h3>
                <p className="text-xs font-semibold text-[#E8820C] mb-2">
                  {brand.tagline}
                </p>
              </Link>

              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-3.5">
                {brand.description}
              </p>

              {/* Popular Model Pills - Clickable and directly opens filtered shop */}
              <div className="space-y-1.5 mb-3">
                <span className="text-xs font-bold uppercase text-slate-400 block tracking-wider">
                  Kasa Kodları:
                </span>
                <div className="flex flex-wrap gap-1">
                  {brand.popularModels.map((mod, i) => (
                    <Link
                      key={i}
                      href={`/shop?brand=${encodeURIComponent(brand.slug)}&model=${encodeURIComponent(mod)}`}
                      className="text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#161c28] hover:bg-[#E8820C] hover:text-white px-2 py-0.5 rounded transition-colors border border-transparent hover:border-[#E8820C]"
                    >
                      {mod}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Engine Code Pills */}
              <div className="space-y-1.5 mb-4">
                <span className="text-xs font-bold uppercase text-amber-500/90 block tracking-wider">
                  Motor Kodları:
                </span>
                <div className="flex flex-wrap gap-1">
                  {brand.engineCodes.map((eng, i) => (
                    <Link
                      key={i}
                      href={`/shop?brand=${encodeURIComponent(brand.slug)}&q=${encodeURIComponent(eng.query)}`}
                      className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500 hover:text-black px-2 py-0.5 rounded transition-colors border border-amber-500/20"
                    >
                      {eng.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <Link
              href={`/shop?brand=${encodeURIComponent(brand.slug)}`}
              className="pt-2.5 border-t border-gray-100 dark:border-[#1e2536] flex items-center justify-between text-xs font-bold text-[#E8820C] hover:underline"
            >
              <span>Tüm {brand.name} Parçaları</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
