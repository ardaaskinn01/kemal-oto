'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Car, ShieldCheck, Truck, Wrench, CheckCircle2, FileText, ArrowRight, Award, Cpu, FileCheck } from 'lucide-react';
import { VinSearchWidget } from '../vin/VinSearchWidget';
import { getBrandLogo } from '../../data/brandLogos';

export function HeroBanner() {
  const [activeTab, setActiveTab] = useState<'manual' | 'vin'>('manual');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedEngine, setSelectedEngine] = useState('');

  const brandList = ['Peugeot', 'Citroën', 'Opel', 'Chevrolet', 'DS Automobiles'];

  const modelsMap: Record<string, string[]> = {
    Peugeot: ['208 (I / II)', '301', '308 (I / II / III)', '2008 (I / II)', '3008 (I / II)', '5008 (I / II)', 'Rifter', 'Partner Tepee'],
    Citroën: ['C3 (I / II / III)', 'C4 (I / II / III)', 'C5 Aircross', 'C-Elysée', 'Berlingo (II / III)', 'C3 Aircross'],
    Opel: ['Astra J (2009-2018)', 'Astra K (2015-2021)', 'Astra H (2004-2014)', 'Corsa D / E / F', 'Insignia A / B', 'Mokka / Mokka X', 'Grandland / X', 'Combo C / D / E'],
    Chevrolet: ['Cruze 1.6 / 1.4 Turbo', 'Aveo T300 / T250', 'Captiva 2.0D / 2.2D', 'Trax 1.4T / 1.6', 'Spark 1.0 / 1.2'],
    'DS Automobiles': ['DS 7 Crossback', 'DS 4 (I / II)', 'DS 3 Crossback', 'DS 9'],
  };

  const engineMap: Record<string, string[]> = {
    Peugeot: ['1.2 PureTech (EB2 / HNZ / HNV)', '1.5 BlueHDi (DV5 / YHZ)', '1.6 HDi / BlueHDi (DV6 / 9HP)', '1.6 THP (EP6 / 5G02)', '2.0 BlueHDi (DW10)'],
    Citroën: ['1.2 PureTech (EB2DT / EB2F)', '1.5 BlueHDi (DV5RD / DV5RC)', '1.6 HDi / e-HDi (DV6C)', '1.4 HDi (DV4TD)', '2.0 BlueHDi (DW10)'],
    Opel: ['1.6 CDTI (B16DTH / B16DTL)', '1.4 Turbo (A14NET / B14NET)', '1.2 PureTech Turbo (F12SHR)', '1.3 CDTI (Z13DTH / A13DTE)', '1.6 Ecotec 16V (Z16XER)', '2.0 CDTI (A20DTH / B20DTH)'],
    Chevrolet: ['1.6 16V Ecotec (F16D4 / LDE)', '1.4 Turbo (A14NET / LUJ)', '2.0 VCDi Dizel (Z20D1 / LLW)', '1.3 CDTI Dizel (LDV)'],
    'DS Automobiles': ['1.6 E-TENSE Şarj Edilebilir Hibrit', '1.5 BlueHDi (DV5RC)', '1.6 PureTech 180 / 225 (EP6FADTX)'],
  };

  const years = Array.from({ length: 24 }, (_, i) => (2026 - i).toString());

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBrand) {
      alert('Lütfen ruhsat marka bilginizi seçiniz.');
      return;
    }
    window.location.href = `/shop?brand=${encodeURIComponent(selectedBrand)}&model=${encodeURIComponent(selectedModel)}&year=${encodeURIComponent(selectedYear)}&engine=${encodeURIComponent(selectedEngine)}`;
  };

  const quickBrandLogos = [
    { name: 'Peugeot', desc: 'PureTech & BlueHDi' },
    { name: 'Citroën', desc: 'HDi & Aircross' },
    { name: 'Opel', desc: 'CDTI & Ecotec Turbo' },
    { name: 'Chevrolet', desc: 'Cruze, Aveo, Captiva' },
    { name: 'DS Automobiles', desc: 'E-Tense & PureTech' },
  ];

  return (
    <section className="bg-slate-100/70 dark:bg-[#0b0e13] border-b border-slate-200 dark:border-[#1a2130] py-8 sm:py-12 bg-service-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* Left column — Authority and quick brand picker */}
          <div className="lg:col-span-5 space-y-5 pt-1">
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Ruhsat & Şasi Eşleşme Güvencesi</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.12] tracking-tight">
                Aracınıza Birebir Uyumlu<br />
                <span className="text-[#E8820C]">Orijinal & Muadil</span> Parçalar
              </h1>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
              <strong>Peugeot, Citroën, Opel, Chevrolet ve DS</strong> grubunda yanlış parça riskine son verin. Araç ruhsatınızdaki motor ve kasa koduyla katalog parçalarını hatasız filtreleyin.
            </p>

            {/* Specialized Brand Cards with technical motor context */}
            <div className="p-3.5 bg-white dark:bg-[#121620] border border-slate-300 dark:border-[#202738] rounded-xl space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Uzman Parça Dağıtımı:
                </span>
                <span className="text-xs text-amber-500 font-bold">
                  Stellantis & GM Grubu
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {quickBrandLogos.map((b) => {
                  const isSelected = selectedBrand === b.name;
                  return (
                    <button
                      key={b.name}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          setSelectedBrand('');
                          setSelectedModel('');
                        } else {
                          setSelectedBrand(b.name);
                          setSelectedModel('');
                          setSelectedEngine('');
                          setActiveTab('manual');
                          if (window.innerWidth < 768) {
                            const formEl = document.getElementById('manual-search-form');
                            if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }
                      }}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#E8820C] bg-orange-50/80 dark:bg-orange-950/30 text-[#E8820C] shadow-xs'
                          : 'border-slate-200 dark:border-[#1e2533] hover:border-slate-400 dark:hover:border-slate-600 bg-slate-50/80 dark:bg-[#161c28] text-slate-700 dark:text-slate-200'
                      }`}
                      title={`${b.name} Parçaları`}
                    >
                      <div className="relative w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center mb-1">
                        {getBrandLogo(b.name, "w-5 h-5 sm:w-6 sm:h-6")}
                      </div>
                      <span className="text-xs font-bold truncate max-w-full">{b.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Sub-models Drawer */}
              {selectedBrand && modelsMap[selectedBrand] && (
                <div className="pt-2.5 border-t border-slate-200 dark:border-[#1e2533] animate-in fade-in duration-150">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase flex items-center gap-1.5">
                      <span className="text-amber-500">●</span> {selectedBrand} Modelleri:
                    </span>
                    <a
                      href={`/shop?brand=${encodeURIComponent(selectedBrand)}`}
                      className="text-xs font-bold text-[#E8820C] hover:underline"
                    >
                      Tüm Parçaları Gör →
                    </a>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 max-h-40 overflow-y-auto pr-1 scrollbar-thin">
                    {modelsMap[selectedBrand].map((mod) => (
                      <a
                        key={mod}
                        href={`/shop?brand=${encodeURIComponent(selectedBrand)}&model=${encodeURIComponent(mod)}`}
                        className="text-left text-xs font-medium px-2 py-1 rounded bg-slate-100 dark:bg-[#1a2130] hover:bg-[#E8820C] hover:text-white text-slate-700 dark:text-slate-300 transition-colors truncate border border-slate-200/60 dark:border-slate-800"
                      >
                        {mod}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Technical Verification List */}
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 stroke-[2.5]" />
                <span><strong>Sipariş Öncesi Şasi Doğrulaması:</strong> Uzmanlarımız parça kodunu teyit eder.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#E8820C] shrink-0 stroke-[2.5]" />
                <span><strong>16:00&apos;ya Kadar Aynı Gün Sevk:</strong> 81 ile anlaşmalı hızlı kargo.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-amber-500 shrink-0 stroke-[2.5]" />
                <span><strong>Garantili & Faturalı:</strong> Orijinal OEM ve E-Mark onaylı A kalite muadil parçalar.</span>
              </li>
            </ul>
          </div>

          {/* Right column — Clean Modern Vehicle Selector */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#121622] border-2 border-slate-200 dark:border-[#222938] rounded-2xl shadow-xl overflow-hidden">

              {/* Selector Top Header */}
              <div className="bg-[#0b0e14] text-white px-5 py-4 border-b border-[#1f2636] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E8820C]/15 text-[#E8820C] border border-[#E8820C]/30 flex items-center justify-center shrink-0">
                    <Car className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-black tracking-tight text-white">
                      Hızlı Araç & Uyumlu Parça Seçimi
                    </h2>
                    <p className="text-xs text-slate-400">
                      Aracınızı seçin, %100 uyumlu parçaları saniyeler içinde listeleyin
                    </p>
                  </div>
                </div>

                {/* Tab switchers */}
                <div className="flex items-center bg-[#171e2c] p-1 rounded-xl border border-slate-800 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab('manual')}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'manual'
                        ? 'bg-[#E8820C] text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Car className="w-3.5 h-3.5" />
                    <span>Araç Seçimi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('vin')}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'vin'
                        ? 'bg-[#E8820C] text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Şasi No (VIN)</span>
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-5 sm:p-7">
                {activeTab === 'manual' ? (
                  <form id="manual-search-form" onSubmit={handleManualSearch} className="space-y-4">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                      {/* Marka Seçimi */}
                      <div className="bg-slate-50 dark:bg-[#161c28] border border-slate-200 dark:border-[#222a3a] rounded-xl p-3">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide mb-1.5">
                          1. Araç Markası
                        </label>
                        <select
                          value={selectedBrand}
                          onChange={(e) => {
                            setSelectedBrand(e.target.value);
                            setSelectedModel('');
                            setSelectedEngine('');
                          }}
                          className="w-full bg-white dark:bg-[#0d1017] border border-slate-300 dark:border-[#222938] rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#E8820C]"
                        >
                          <option value="">Marka Seçiniz...</option>
                          {brandList.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>

                      {/* Model & Kasa */}
                      <div className="bg-slate-50 dark:bg-[#161c28] border border-slate-200 dark:border-[#222a3a] rounded-xl p-3">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide mb-1.5">
                          2. Model & Kasa
                        </label>
                        <select
                          value={selectedModel}
                          disabled={!selectedBrand}
                          onChange={(e) => setSelectedModel(e.target.value)}
                          className="w-full bg-white dark:bg-[#0d1017] border border-slate-300 dark:border-[#222938] rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#E8820C] disabled:opacity-50"
                        >
                          <option value="">{selectedBrand ? 'Model Seçiniz...' : 'Önce Marka Seçiniz'}</option>
                          {selectedBrand && modelsMap[selectedBrand]?.map((m) => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      </div>

                      {/* Model Yılı */}
                      <div className="bg-slate-50 dark:bg-[#161c28] border border-slate-200 dark:border-[#222a3a] rounded-xl p-3">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide mb-1.5">
                          3. Model Yılı
                        </label>
                        <select
                          value={selectedYear}
                          disabled={!selectedModel}
                          onChange={(e) => setSelectedYear(e.target.value)}
                          className="w-full bg-white dark:bg-[#0d1017] border border-slate-300 dark:border-[#222938] rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#E8820C] disabled:opacity-50"
                        >
                          <option value="">Tüm Yıllar</option>
                          {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                      </div>

                      {/* Motor & Yakıt */}
                      <div className="bg-slate-50 dark:bg-[#161c28] border border-slate-200 dark:border-[#222a3a] rounded-xl p-3">
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide mb-1.5">
                          4. Motor & Yakıt Tipi
                        </label>
                        <select
                          value={selectedEngine}
                          disabled={!selectedBrand}
                          onChange={(e) => setSelectedEngine(e.target.value)}
                          className="w-full bg-white dark:bg-[#0d1017] border border-slate-300 dark:border-[#222938] rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#E8820C] disabled:opacity-50"
                        >
                          <option value="">Tüm Motorlar</option>
                          {selectedBrand && engineMap[selectedBrand]?.map((eng) => (
                            <option key={eng} value={eng}>{eng}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Submit Action Button */}
                    <button
                      type="submit"
                      className="w-full bg-[#E8820C] hover:bg-[#d07205] text-white font-extrabold py-3.5 px-6 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer tracking-wide"
                    >
                      <Search className="w-4 h-4 stroke-[2.5]" />
                      <span>Uyumlu Parçaları Listele</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 pt-1 gap-1">
                      <span>✓ Seçilen parçalar sevk edilmeden önce uzmanlarımızca kontrol edilir</span>
                      <button
                        type="button"
                        onClick={() => setActiveTab('vin')}
                        className="text-[#E8820C] hover:underline font-bold self-start sm:self-auto"
                      >
                        Şasi Numaranız var mı? Buraya tıklayın →
                      </button>
                    </div>

                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-700 dark:text-amber-400 font-medium">
                      <strong>17 Haneli Şasi No Doğrulaması:</strong> Ruhsatınızda yer alan 17 haneli şasi (VIN) numaranızı girerek fabrika çıkış donanımınıza %100 uyumlu parçaları otomatik olarak listeleyin.
                    </div>
                    <VinSearchWidget />
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

