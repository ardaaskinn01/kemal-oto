'use client';

import React, { useState } from 'react';
import { Search, Car, ShieldCheck, Truck, Wrench, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { VinSearchWidget } from '../vin/VinSearchWidget';

export function HeroBanner() {
  const [activeTab, setActiveTab] = useState<'vin' | 'manual'>('manual');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedEngine, setSelectedEngine] = useState('');

  const brandList = ['Opel', 'Peugeot', 'Citroën', 'Chevrolet', 'DS Automobiles'];

  const modelsMap: Record<string, string[]> = {
    Opel: ['Astra J (2009-2018)', 'Astra K (2015-2021)', 'Corsa E (2014-2019)', 'Corsa F (2019+)', 'Insignia A (2008-2017)', 'Insignia B (2017+)', 'Mokka (2012+)'],
    Peugeot: ['208 (2012+)', '301 (2012+)', '308 (2013+)', '2008 (2019+)', '3008 (2016+)', '5008 (2017+)', 'Rifter (2018+)', 'Partner (2008+)'],
    Citroën: ['C3 (2016+)', 'C4 (2020+)', 'C5 Aircross (2018+)', 'C-Elysée (2012+)', 'Berlingo (2018+)', 'C3 Aircross (2017+)'],
    Chevrolet: ['Cruze 1.6 / 1.4 Turbo (2009-2016)', 'Aveo T300 (2011-2018)', 'Captiva 2.0D (2006-2015)', 'Trax 1.4T (2013-2019)'],
    'DS Automobiles': ['DS 7 Crossback (2018+)', 'DS 4 (2021+)', 'DS 3 Crossback (2019+)'],
  };

  const engineMap: Record<string, string[]> = {
    Opel: ['1.3 CDTI Dizel', '1.4 Benzinli / Turbo', '1.6 CDTI Dizel', '1.6 Benzinli', '2.0 CDTI Dizel'],
    Peugeot: ['1.2 PureTech Benzinli', '1.5 BlueHDi Dizel', '1.6 HDi / e-HDi Dizel', '1.6 THP Benzinli'],
    Citroën: ['1.2 PureTech Benzinli', '1.5 BlueHDi Dizel', '1.6 HDi Dizel', '1.6 VTi Benzinli'],
    Chevrolet: ['1.2 16V Benzinli', '1.4 Turbo Benzinli', '1.6 16V Benzinli', '2.0 VCDi Dizel'],
    'DS Automobiles': ['1.2 PureTech Benzinli', '1.5 BlueHDi Dizel', '1.6 E-TENSE Hibrit'],
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

  return (
    <section className="bg-[#f7f8fa] dark:bg-[#0d0f12] border-b border-gray-200 dark:border-[#2a2d35] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left column */}
          <div className="lg:col-span-5 space-y-5 pt-2">
            <div>
              <p className="text-sm font-medium text-[#E8820C] mb-2">Kemal Oto — 40 Yıllık Uzmanlık</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                Aracınıza uyumlu<br />
                <span className="text-[#E8820C]">doğru yedek parçayı</span> bulun
              </h1>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Opel, Peugeot, Citroën, Chevrolet ve DS araçlarınız için marka/model seçin
              veya 17 haneli şasi numaranızla hatasız eşleştirin.
            </p>

            {/* Trust list — inline, no card boxes */}
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-[#E8820C] shrink-0" />
                <span>%100 Uyum Garantisi — Uzman şasi kontrolü</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                <Truck className="w-4 h-4 text-[#E8820C] shrink-0" />
                <span>Aynı Gün DHL Kargo — Saat 16:00'ya kadar</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                <ShieldCheck className="w-4 h-4 text-[#E8820C] shrink-0" />
                <span>Orijinal & A Kalite — PSA / GM garantili</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                <Wrench className="w-4 h-4 text-[#E8820C] shrink-0" />
                <span>40 Yıllık Tecrübe — Kemal Oto güvencesi</span>
              </li>
            </ul>
          </div>

          {/* Right column — clean card, no glassmorphism */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#1a1d23] border border-gray-200 dark:border-[#2a2d35] rounded-xl p-5 sm:p-6 shadow-sm">

              {/* Tabs — underline style, no bg */}
              <div className="flex border-b border-gray-200 dark:border-[#2a2d35] mb-5">
                <button
                  type="button"
                  onClick={() => setActiveTab('manual')}
                  className={`flex items-center gap-2 pb-3 px-1 mr-6 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'manual'
                      ? 'border-[#E8820C] text-[#E8820C]'
                      : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  <Car className="w-4 h-4" />
                  Araç seçerek bul
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('vin')}
                  className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'vin'
                      ? 'border-[#E8820C] text-[#E8820C]'
                      : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  Şasi No (VIN) ile sorgula
                </button>
              </div>

              {activeTab === 'vin' ? (
                <div className="space-y-4">
                  <VinSearchWidget compact={true} />
                  <div className="flex items-start gap-2.5 text-xs text-gray-400 bg-gray-50 dark:bg-[#111318] border border-gray-100 dark:border-[#2a2d35] rounded-lg p-3">
                    <FileText className="w-4 h-4 text-[#E8820C] shrink-0 mt-0.5" />
                    <span>Şasi numaranızı araç ruhsatının <strong className="text-gray-600 dark:text-gray-300">(E)</strong> hanesinde veya ön cam alt kısmında bulabilirsiniz.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleManualSearch} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                        Marka
                      </label>
                      <select
                        value={selectedBrand}
                        onChange={(e) => { setSelectedBrand(e.target.value); setSelectedModel(''); setSelectedEngine(''); }}
                        className="w-full border border-gray-200 dark:border-[#2a2d35] rounded-lg py-2.5 px-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-[#111318] focus:outline-none focus:border-[#E8820C] transition-colors"
                      >
                        <option value="">Tüm Markalar</option>
                        {brandList.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                        Model
                      </label>
                      <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        disabled={!selectedBrand}
                        className="w-full border border-gray-200 dark:border-[#2a2d35] rounded-lg py-2.5 px-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-[#111318] focus:outline-none focus:border-[#E8820C] disabled:opacity-40 transition-colors"
                      >
                        <option value="">Model seçin</option>
                        {selectedBrand && modelsMap[selectedBrand]?.map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                        Model Yılı
                      </label>
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full border border-gray-200 dark:border-[#2a2d35] rounded-lg py-2.5 px-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-[#111318] focus:outline-none focus:border-[#E8820C] transition-colors"
                      >
                        <option value="">Tüm Yıllar</option>
                        {years.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                        Motor & Hacim
                      </label>
                      <select
                        value={selectedEngine}
                        onChange={(e) => setSelectedEngine(e.target.value)}
                        disabled={!selectedBrand}
                        className="w-full border border-gray-200 dark:border-[#2a2d35] rounded-lg py-2.5 px-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-[#111318] focus:outline-none focus:border-[#E8820C] disabled:opacity-40 transition-colors"
                      >
                        <option value="">Motor tipi seçin</option>
                        {selectedBrand && engineMap[selectedBrand]?.map((eng) => <option key={eng} value={eng}>{eng}</option>)}
                      </select>
                    </div>

                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#E8820C] hover:bg-[#d4740a] text-white font-semibold py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    Uyumlu parçaları listele
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
