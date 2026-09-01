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
    accentColor: 'border-purple-500/30 group-hover:border-purple-500',
  },
];

export function PsaGroupShowcase() {
  return (
    <section className="space-y-6">
      {/* Header Banner - PSA Groupe & GM Authority */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b0e14] via-[#111622] to-[#0d1117] border border-[#232936] p-6 sm:p-8 md:p-10 shadow-xl">
        {/* Subtle background glow effect */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#E8820C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#E8820C]/15 border border-[#E8820C]/30 text-[#E8820C] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Uzmanlık Alanımız: PSA Grubu (Stellantis) & GM</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Sadece Uzman Olduğumuz Markaların <span className="text-[#E8820C]">Orijinal & Garantili</span> Parçaları
            </h2>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Online Hızlı Parça olarak odağımızı dağıtmıyor; yalnızca <strong>Peugeot, Citroën, Opel, Chevrolet ve DS Automobiles</strong> araçlarına hizmet veriyoruz. 40 yıllık birikimimiz ve şasi teyidimizle aracınıza %100 doğru parçayı ulaştırıyoruz.
            </p>
          </div>

          {/* Mini Trust Stats */}
          <div className="grid grid-cols-2 gap-3 shrink-0 sm:min-w-[280px]">
            <div className="bg-[#161c28]/80 border border-[#263145] p-3.5 rounded-2xl">
              <span className="text-xl font-black text-white block">5 Marka</span>
              <span className="text-[11px] text-gray-400 font-medium">PSA & GM Derin Stok</span>
            </div>
            <div className="bg-[#161c28]/80 border border-[#263145] p-3.5 rounded-2xl">
              <span className="text-xl font-black text-[#E8820C] block">%100 Uyum</span>
              <span className="text-[11px] text-gray-400 font-medium">17 Haneli Şasi Teyidi</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Brand Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {PSA_BRANDS.map((brand) => (
          <Link
            key={brand.slug}
            href={`/shop?brand=${encodeURIComponent(brand.slug)}`}
            className={`group relative flex flex-col justify-between bg-white dark:bg-[#111318] border border-gray-200 dark:border-[#232936] rounded-2xl p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${brand.accentColor}`}
          >
            <div>
              {/* Brand Top: Logo & Badge */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-xl bg-gray-50 dark:bg-[#181c24] border border-gray-200/60 dark:border-[#2a3140] p-2 flex items-center justify-center text-gray-800 dark:text-white group-hover:scale-105 transition-transform">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} Logo`}
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>

                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-gray-100 dark:bg-[#1a202c] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#2d3748]">
                  {brand.badge}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-lg font-black text-gray-900 dark:text-white group-hover:text-[#E8820C] transition-colors">
                {brand.name}
              </h3>
              <p className="text-xs font-bold text-[#E8820C] mb-2">
                {brand.tagline}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed mb-4">
                {brand.description}
              </p>

              {/* Popular Model Pills */}
              <div className="flex flex-wrap gap-1 mb-4">
                {brand.popularModels.slice(0, 4).map((mod, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-[#181c24] px-2 py-0.5 rounded"
                  >
                    {mod}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-3 border-t border-gray-100 dark:border-[#1e2330] flex items-center justify-between text-xs font-bold text-[#E8820C]">
              <span>Parçaları Listele</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
