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
  FileText,
  Fuel,
  Sparkles,
  Zap
} from 'lucide-react';
import { VinSearchWidget } from '../vin/VinSearchWidget';

export function HeroBanner() {
  const [activeTab, setActiveTab] = useState<'vin' | 'manual'>('manual');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedEngine, setSelectedEngine] = useState('');

  // Primary Focus Brands: Opel, Peugeot, Citroën, Chevrolet, DS
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
    <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white border-b border-slate-800 py-8 sm:py-12 relative overflow-hidden">

      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-bold text-amber-400">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              <span>Türkiye&apos;nin Hızlı Yedek Parça Portalı</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
              Aracınıza %100 Uyumlu <br />
              <span className="text-amber-400">Doğru Yedek Parçayı</span> Anında Bulun
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Opel, Peugeot, Citroën, Chevrolet ve DS araçlarınız için marka/model seçin veya 17 haneli şasi numaranızla hatasız eşleştirin. Tüm siparişler uzman ekibimizce şasi doğrulaması yapılarak kargolanır.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2.5 text-xs font-bold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>%100 Uyum Garantisi</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2.5 text-xs font-bold text-slate-200">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Aynı Gün Hızlı Kargo</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2.5 text-xs font-bold text-slate-200">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Orijinal & A Kalite</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2.5 text-xs font-bold text-slate-200">
                <Wrench className="w-4 h-4 text-amber-400 shrink-0" />
                <span>40 Yıllık Tecrübe</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Utility 4-Step Selector Card (OnlineYedekParça Style) */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/90 border-2 border-slate-800 p-5 sm:p-7 rounded-2xl shadow-2xl backdrop-blur-md">
              
              {/* Tab Selector Header */}
              <div className="flex border-b border-slate-800 mb-6 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('manual')}
                  className={`pb-3 px-4 text-xs font-black transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                    activeTab === 'manual'
                      ? 'border-amber-400 text-amber-400 text-sm'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Car className="w-4 h-4 shrink-0" />
                  <span>ARACINI SEÇEREK BUL</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('vin')}
                  className={`pb-3 px-4 text-xs font-black transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                    activeTab === 'vin'
                      ? 'border-amber-400 text-amber-400 text-sm'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>17 HANELİ ŞASİ NO (VIN)</span>
                </button>
              </div>

              {activeTab === 'vin' ? (
                <div className="space-y-4">
                  <VinSearchWidget compact={true} />

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-2.5 text-xs text-slate-300">
                    <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Şasi numaranızı araç ruhsatınızın <strong>(E)</strong> maddesinde veya ön cam alt kısmında bulabilirsiniz.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleManualSearch} className="space-y-4">
                  
                  {/* 4 Step Grid Dropdowns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* 1. Marka */}
                    <div>
                      <label className="block text-[11px] font-black uppercase text-amber-400 tracking-wider mb-1.5 flex items-center gap-1">
                        <span>1. Marka Seçiniz</span>
                      </label>
                      <select
                        value={selectedBrand}
                        onChange={(e) => {
                          setSelectedBrand(e.target.value);
                          setSelectedModel('');
                          setSelectedEngine('');
                        }}
                        className="w-full bg-slate-950 text-white border border-slate-700 rounded-xl py-3 px-3.5 text-xs font-bold focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="">-- Tüm Markalar --</option>
                        {brandList.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 2. Model */}
                    <div>
                      <label className="block text-[11px] font-black uppercase text-amber-400 tracking-wider mb-1.5 flex items-center gap-1">
                        <span>2. Model Seçiniz</span>
                      </label>
                      <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        disabled={!selectedBrand}
                        className="w-full bg-slate-950 text-white border border-slate-700 rounded-xl py-3 px-3.5 text-xs font-bold focus:outline-none focus:border-amber-400 disabled:opacity-40 transition-colors"
                      >
                        <option value="">-- Model Seçiniz --</option>
                        {selectedBrand &&
                          modelsMap[selectedBrand]?.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* 3. Yıl */}
                    <div>
                      <label className="block text-[11px] font-black uppercase text-amber-400 tracking-wider mb-1.5">
                        3. Model Yılı
                      </label>
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full bg-slate-950 text-white border border-slate-700 rounded-xl py-3 px-3.5 text-xs font-bold focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="">-- Tüm Yıllar --</option>
                        {years.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 4. Motor / Yakıt Tipi */}
                    <div>
                      <label className="block text-[11px] font-black uppercase text-amber-400 tracking-wider mb-1.5">
                        4. Motor & Hacim
                      </label>
                      <select
                        value={selectedEngine}
                        onChange={(e) => setSelectedEngine(e.target.value)}
                        disabled={!selectedBrand}
                        className="w-full bg-slate-950 text-white border border-slate-700 rounded-xl py-3 px-3.5 text-xs font-bold focus:outline-none focus:border-amber-400 disabled:opacity-40 transition-colors"
                      >
                        <option value="">-- Motor Tipi Seçiniz --</option>
                        {selectedBrand &&
                          engineMap[selectedBrand]?.map((eng) => (
                            <option key={eng} value={eng}>
                              {eng}
                            </option>
                          ))}
                      </select>
                    </div>

                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.99] cursor-pointer shadow-lg shadow-amber-400/20"
                    >
                      <Search className="w-4 h-4 stroke-[3]" />
                      <span>UYUMLU YEDEK PARÇALARI LİSTELE</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
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
