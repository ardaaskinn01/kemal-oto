'use client';

import React, { useState } from 'react';
import { Search, Car, ShieldCheck, Truck, ArrowRight } from 'lucide-react';

export function HeroBanner() {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const brands = ['Volkswagen', 'BMW', 'Mercedes-Benz', 'Audi', 'Ford', 'Renault', 'Fiat', 'Toyota'];
  const modelsMap: Record<string, string[]> = {
    Volkswagen: ['Golf', 'Passat', 'Polo', 'Tiguan'],
    BMW: ['3 Serisi', '5 Serisi', '1 Serisi', 'X5'],
    'Mercedes-Benz': ['C-Serisi', 'E-Serisi', 'A-Serisi'],
    Audi: ['A3', 'A4', 'A6', 'Q5'],
    Ford: ['Focus', 'Fiesta', 'Courier'],
    Renault: ['Clio', 'Megane', 'Fluence'],
    Fiat: ['Egea', 'Doblo', 'Fiorino'],
    Toyota: ['Corolla', 'Yaris', 'Hilux'],
  };

  const years = Array.from({ length: 25 }, (_, i) => (2026 - i).toString());

  const handleVehicleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBrand) {
      alert('Lütfen en az bir araç markası seçiniz.');
      return;
    }
    window.location.href = `/shop?brand=${encodeURIComponent(selectedBrand)}&model=${encodeURIComponent(selectedModel)}&year=${encodeURIComponent(selectedYear)}`;
  };

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden border-b border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Information */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full text-xs text-orange-400 font-semibold shadow-inner">
              <Car className="w-4 h-4 text-orange-500" />
              <span>Orijinal & Garanti Sertifikalı Oto Parçaları</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Aracınız İçin <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                Tam Uyumlu Parça
              </span> Bulun
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Kemal Oto stoklarında yer alan 50.000+ motor, fren, kaporta ve elektrik aksam parçası arasından şase numarası veya araç modelinize özel tam uyumlu ürünü hemen sipariş verin.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-300 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                Şase No İle %100 Uyum
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-orange-500" />
                Aynı Gün Hızlı Kargo
              </span>
            </div>
          </div>

          {/* Right Column: Vehicle Compatibility Selector Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-xl relative">
              
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Garajınıza Araç Ekleyin</h2>
                  <p className="text-xs text-slate-400">Aracınızı seçin, sadece uyumlu parçaları görün</p>
                </div>
              </div>

              <form onSubmit={handleVehicleSearch} className="space-y-4">
                {/* Brand Select */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Araç Markası
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => {
                      setSelectedBrand(e.target.value);
                      setSelectedModel('');
                    }}
                    className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    <option value="">-- Marka Seçin --</option>
                    {brands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Model Select */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Araç Modeli
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    disabled={!selectedBrand}
                    className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-orange-500 disabled:opacity-50 transition-colors"
                  >
                    <option value="">-- Model Seçin --</option>
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Model Yılı
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    <option value="">-- Yıl Seçin --</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full mt-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 text-sm transition-all duration-300 active:scale-[0.98]"
                >
                  <Search className="w-4 h-4" />
                  <span>Uyumlu Parçaları Listele</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
