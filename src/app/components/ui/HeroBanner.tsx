'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Car, ShieldCheck, Truck, Wrench, CheckCircle2, FileText, ArrowRight, Award } from 'lucide-react';
import { VinSearchWidget } from '../vin/VinSearchWidget';

export function HeroBanner() {
  const [activeTab, setActiveTab] = useState<'manual' | 'vin'>('manual');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedEngine, setSelectedEngine] = useState('');

  const brandList = ['Peugeot', 'Citroën', 'Opel', 'Chevrolet', 'DS Automobiles'];

  const modelsMap: Record<string, string[]> = {
    Peugeot: ['208 (2012+)', '301 (2012+)', '308 (2013+)', '2008 (2019+)', '3008 (2016+)', '5008 (2017+)', 'Rifter (2018+)', 'Partner (2008+)'],
    Citroën: ['C3 (2016+)', 'C4 (2020+)', 'C5 Aircross (2018+)', 'C-Elysée (2012+)', 'Berlingo (2018+)', 'C3 Aircross (2017+)'],
    Opel: ['Astra J (2009-2018)', 'Astra K (2015-2021)', 'Astra L (2021+)', 'Corsa E (2014-2019)', 'Corsa F (2019+)', 'Insignia A (2008-2017)', 'Insignia B (2017+)', 'Mokka (2012+)', 'Grandland (2017+)'],
    Chevrolet: ['Cruze 1.6 / 1.4 Turbo (2009-2016)', 'Aveo T300 (2011-2018)', 'Captiva 2.0D (2006-2015)', 'Trax 1.4T (2013-2019)', 'Spark (2010+)'],
    'DS Automobiles': ['DS 7 Crossback (2018+)', 'DS 4 (2021+)', 'DS 3 Crossback (2019+)', 'DS 9 (2020+)'],
  };

  const engineMap: Record<string, string[]> = {
    Peugeot: ['1.2 PureTech Benzinli', '1.5 BlueHDi Dizel', '1.6 HDi / e-HDi Dizel', '1.6 THP Benzinli', 'Elektrikli (e-208 / e-2008)'],
    Citroën: ['1.2 PureTech Benzinli', '1.5 BlueHDi Dizel', '1.6 HDi Dizel', '1.6 VTi Benzinli', 'Elektrikli (ë-C4)'],
    Opel: ['1.2 Turbo Benzinli', '1.3 CDTI Dizel', '1.4 Benzinli / Turbo', '1.5 CDTI / D Dizel', '1.6 CDTI Dizel', '2.0 CDTI Dizel'],
    Chevrolet: ['1.2 16V Benzinli', '1.4 Turbo Benzinli', '1.6 16V Ecotec Benzinli', '2.0 VCDi Dizel'],
    'DS Automobiles': ['1.2 PureTech Benzinli', '1.5 BlueHDi Dizel', '1.6 E-TENSE Şarj Edilebilir Hibrit'],
  };

  const years = Array.from({ length: 22 }, (_, i) => (2026 - i).toString());

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBrand) {
      alert('Lütfen bir araç markası seçiniz.');
      return;
    }
    window.location.href = `/shop?brand=${encodeURIComponent(selectedBrand)}&model=${encodeURIComponent(selectedModel)}&year=${encodeURIComponent(selectedYear)}&engine=${encodeURIComponent(selectedEngine)}`;
  };

  const quickBrandLogos = [
    { name: 'Peugeot', logo: '/brands/peugeot.svg' },
    { name: 'Citroën', logo: '/brands/citroen.svg' },
    { name: 'Opel', logo: '/brands/opel.svg' },
    { name: 'Chevrolet', logo: '/brands/chevrolet.svg' },
    { name: 'DS Automobiles', logo: '/brands/ds.svg' },
  ];

  return (
    <section className="bg-[#f7f8fa] dark:bg-[#0d0f12] border-b border-gray-200 dark:border-[#2a2d35] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left column */}
          <div className="lg:col-span-5 space-y-5 pt-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E8820C] uppercase tracking-wider mb-2">
                <Award className="w-4 h-4" />
                <span>PSA Grubu & Stellantis Uzmanlığı</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
                Aracınıza %100 Uyumlu<br />
                <span className="text-[#E8820C]">Orijinal & Muadil</span> Parçalar
              </h1>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
              <strong>Peugeot, Citroën, Opel, Chevrolet ve DS Automobiles</strong> araçlarınız için motor, periyodik bakım, fren, süspansiyon ve kaporta parçalarını 17 haneli şasi numaranızla hatasız eşleştirin.
            </p>

            {/* PSA 5 Brands Quick Logo Pill Bar */}
            <div className="p-3 bg-white dark:bg-[#141820] border border-gray-200 dark:border-[#262d3d] rounded-2xl space-y-2 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                Uzman Olduğumuz Marka Ailesi:
              </span>
              <div className="flex items-center justify-between gap-2">
                {quickBrandLogos.map((b) => (
                  <button
                    key={b.name}
                    type="button"
                    onClick={() => {
                      setSelectedBrand(b.name);
                      setSelectedModel('');
                      setSelectedEngine('');
                      setActiveTab('manual');
                    }}
                    className={`flex-1 flex flex-col items-center justify-center p-2 rounded-xl border transition-all cursor-pointer ${
                      selectedBrand === b.name
                        ? 'border-[#E8820C] bg-[#E8820C]/10 text-[#E8820C]'
                        : 'border-transparent hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50 dark:bg-[#1c222e] text-gray-700 dark:text-gray-300'
                    }`}
                    title={`${b.name} Parçaları`}
                  >
                    <div className="relative w-6 h-6 flex items-center justify-center mb-1">
                      <Image
                        src={b.logo}
                        alt={b.name}
                        width={22}
                        height={22}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[10px] font-bold truncate max-w-[50px]">{b.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trust list */}
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E8820C] shrink-0" />
                <span>%100 Uyum Garantisi — Uzman Şasi (VIN) Kontrolü</span>
              </li>
              <li className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#E8820C] shrink-0" />
                <span>Saat 16:00&apos;ya Kadar Aynı Gün Hızlı Kargo</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E8820C] shrink-0" />
                <span>12 Ay Üretici Garantisi & 14 Gün Koşulsuz İade</span>
              </li>
            </ul>
          </div>

          {/* Right column — Search Tabs */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#111318] border border-gray-200 dark:border-[#2a2d35] rounded-3xl p-5 sm:p-7 shadow-sm">

              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-[#2a2d35] mb-5">
                <button
                  type="button"
                  onClick={() => setActiveTab('manual')}
                  className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'manual'
                      ? 'border-[#E8820C] text-[#E8820C]'
                      : 'border-transparent text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Car className="w-4 h-4" />
                  <span>Araç Seçerek Parça Bul</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('vin')}
                  className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'vin'
                      ? 'border-[#E8820C] text-[#E8820C]'
                      : 'border-transparent text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>17 Haneli Şasi (VIN) ile Sorgula</span>
                </button>
              </div>

              {activeTab === 'manual' ? (
                <form onSubmit={handleManualSearch} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Marka Seçimi */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                        1. Araç Markası
                      </label>
                      <select
                        value={selectedBrand}
                        onChange={(e) => {
                          setSelectedBrand(e.target.value);
                          setSelectedModel('');
                          setSelectedEngine('');
                        }}
                        className="w-full bg-slate-50 dark:bg-[#0d0f12] border border-gray-300 dark:border-[#2a2d35] rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:border-[#E8820C]"
                      >
                        <option value="">Marka Seçiniz</option>
                        {brandList.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    {/* Model Seçimi */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                        2. Araç Modeli & Kasa
                      </label>
                      <select
                        value={selectedModel}
                        disabled={!selectedBrand}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-[#0d0f12] border border-gray-300 dark:border-[#2a2d35] rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:border-[#E8820C] disabled:opacity-50"
                      >
                        <option value="">{selectedBrand ? 'Model Seçiniz' : 'Önce Marka Seçin'}</option>
                        {selectedBrand && modelsMap[selectedBrand]?.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>

                    {/* Model Yılı */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                        3. Üretim Yılı
                      </label>
                      <select
                        value={selectedYear}
                        disabled={!selectedModel}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-[#0d0f12] border border-gray-300 dark:border-[#2a2d35] rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:border-[#E8820C] disabled:opacity-50"
                      >
                        <option value="">Tüm Yıllar</option>
                        {years.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>

                    {/* Motor Tipi */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                        4. Motor Hacmi / Yakıt
                      </label>
                      <select
                        value={selectedEngine}
                        disabled={!selectedBrand}
                        onChange={(e) => setSelectedEngine(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-[#0d0f12] border border-gray-300 dark:border-[#2a2d35] rounded-xl px-3.5 py-2.5 text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:border-[#E8820C] disabled:opacity-50"
                      >
                        <option value="">Tüm Motorlar</option>
                        {selectedBrand && engineMap[selectedBrand]?.map((eng) => (
                          <option key={eng} value={eng}>{eng}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#E8820C] hover:bg-[#d4740a] text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer uppercase tracking-wider"
                  >
                    <Search className="w-4 h-4" />
                    <span>Uyumlu Parçaları Listele</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="space-y-3">
                  <VinSearchWidget />
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
