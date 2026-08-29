'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Car, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  Wrench, 
  CheckCircle2, 
  FileText
} from 'lucide-react';
import { VinSearchWidget } from '../vin/VinSearchWidget';

export function HeroBanner() {
  const [activeTab, setActiveTab] = useState<'vin' | 'manual'>('vin');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Primary Focus Brands: Opel, Peugeot, Citroën, Chevrolet, DS
  const brandList = ['Opel', 'Peugeot', 'Citroën', 'Chevrolet', 'DS Automobiles'];

  const modelsMap: Record<string, string[]> = {
    Opel: ['Astra J (2009-2018)', 'Astra K (2015-2021)', 'Corsa E (2014-2019)', 'Corsa F (2019+)', 'Insignia A (2008-2017)', 'Insignia B (2017+)', 'Mokka (2012+)'],
    Peugeot: ['208 (2012+)', '301 (2012+)', '308 (2013+)', '2008 (2019+)', '3008 (2016+)', '5008 (2017+)', 'Rifter (2018+)', 'Partner (2008+)'],
    Citroën: ['C3 (2016+)', 'C4 (2020+)', 'C5 Aircross (2018+)', 'C-Elysée (2012+)', 'Berlingo (2018+)', 'C3 Aircross (2017+)'],
    Chevrolet: ['Cruze 1.6 / 1.4 Turbo (2009-2016)', 'Aveo T300 (2011-2018)', 'Captiva 2.0D (2006-2015)', 'Trax 1.4T (2013-2019)'],
    'DS Automobiles': ['DS 7 Crossback (2018+)', 'DS 4 (2021+)', 'DS 3 Crossback (2019+)'],
  };

  const years = Array.from({ length: 20 }, (_, i) => (2025 - i).toString());

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBrand) {
      alert('Lütfen bir araç markası seçiniz.');
      return;
    }
    window.location.href = `/shop?brand=${encodeURIComponent(selectedBrand)}&model=${encodeURIComponent(selectedModel)}&year=${encodeURIComponent(selectedYear)}`;
  };

  return (
    <section className="bg-slate-100/70 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 transition-colors py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Orijinal & Muadil Garantili Yedek Parça</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Aracınıza Birebir Uyumlu <br className="hidden sm:inline" />
              <span className="text-orange-600 dark:text-orange-500">Doğru Parçayı</span> Şasiden Bulun
            </h1>

            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
              Opel, Peugeot, Citroën, Chevrolet ve DS araçlarınız için 17 haneli şasi numarasını girin; periyodik bakım, fren, motor ve mekanik parçaları hatasız eşleştirin.
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                Şasi Kontrollü Sevk
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                DHL Express
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                Bornova 5. Sanayi Depo
              </span>
            </div>
          </div>

          {/* Right Column: High-Utility Selector Card */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-7 rounded-2xl shadow-sm">
              
              {/* Tab Selector */}
              <div className="flex border-b border-slate-200 dark:border-slate-800 mb-5 gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('vin')}
                  className={`pb-3 px-3 sm:px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'vin'
                      ? 'border-orange-600 text-orange-600 dark:text-orange-500'
                      : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Şasi No (VIN)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('manual')}
                  className={`pb-3 px-3 sm:px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'manual'
                      ? 'border-orange-600 text-orange-600 dark:text-orange-500'
                      : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Car className="w-4 h-4 shrink-0" />
                  <span>Araç Seçerek Ara</span>
                </button>
              </div>

              {activeTab === 'vin' ? (
                <div className="space-y-3">
                  <VinSearchWidget compact={true} />

                  <div className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <FileText className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>Şasi numarası ruhsatınızın <strong>(E)</strong> bendinde yazan 17 haneli koddur.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleManualSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Brand Select */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Marka
                    </label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => {
                        setSelectedBrand(e.target.value);
                        setSelectedModel('');
                      }}
                      className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-orange-600"
                    >
                      <option value="">Marka Seçiniz</option>
                      {brandList.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Model Select */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Model / Motor
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      disabled={!selectedBrand}
                      className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-orange-600 disabled:opacity-50"
                    >
                      <option value="">Model Seçiniz</option>
                      {selectedBrand &&
                        modelsMap[selectedBrand]?.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Year Select */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Model Yılı
                    </label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-orange-600"
                    >
                      <option value="">Yıl Seçiniz</option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit button */}
                  <div className="sm:col-span-3 pt-1">
                    <button
                      type="submit"
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>Uyumlu Parçaları Listele</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
