'use client';

import React, { useState } from 'react';
import { useGarage, GarageVehicle } from '../../contexts/GarageContext';
import { 
  Car, 
  X, 
  Plus, 
  Check, 
  Trash2, 
  ShieldCheck, 
  ArrowRight, 
  Wrench,
  Loader2,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export function GarageModal() {
  const { 
    savedVehicles, 
    activeVehicle, 
    addVehicle, 
    removeVehicle, 
    setActiveVehicle, 
    isGarageModalOpen, 
    setIsGarageModalOpen 
  } = useGarage();

  const [mode, setMode] = useState<'list' | 'add_vin' | 'add_manual'>('list');
  const [vinInput, setVinInput] = useState('');
  const [loadingVin, setLoadingVin] = useState(false);
  const [vinError, setVinError] = useState<string | null>(null);

  // Manual vehicle state
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Primary Focus Brands: Opel, Peugeot, Citroën, Chevrolet, DS
  const brands = ['Opel', 'Peugeot', 'Citroën', 'Chevrolet', 'DS Automobiles', 'Volkswagen', 'Renault', 'Fiat', 'Ford'];
  const modelsMap: Record<string, string[]> = {
    Opel: ['Astra', 'Corsa', 'Insignia', 'Mokka', 'Crossland', 'Grandland', 'Combo', 'Vectra', 'Zafira'],
    Peugeot: ['208', '308', '2008', '3008', '5008', '508', 'Rifter', 'Partner', '206', '207'],
    Citroën: ['C3', 'C4', 'C5 Aircross', 'C-Elysée', 'Berlingo', 'C3 Aircross', 'C4 Cactus'],
    Chevrolet: ['Cruze', 'Aveo', 'Captiva', 'Trax', 'Spark', 'Lacetti'],
    'DS Automobiles': ['DS 7 Crossback', 'DS 4', 'DS 3 Crossback', 'DS 9'],
    Volkswagen: ['Golf', 'Passat', 'Polo', 'Tiguan'],
    Renault: ['Clio', 'Megane', 'Fluence'],
    Fiat: ['Egea', 'Doblo', 'Fiorino'],
    Ford: ['Focus', 'Fiesta', 'Courier'],
  };

  const years = Array.from({ length: 25 }, (_, i) => (2026 - i).toString());

  if (!isGarageModalOpen) return null;

  const handleVinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = vinInput.trim().toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '');

    if (clean.length !== 17) {
      setVinError('Lütfen 17 haneli şasi numaranızı eksiksiz girin.');
      return;
    }

    setLoadingVin(true);
    setVinError(null);

    try {
      const res = await fetch(`/api/vin/decode/${encodeURIComponent(clean)}`);
      const data = await res.json();

      if (data.success && data.vehicle) {
        addVehicle({
          vin: data.vehicle.vin,
          make: data.vehicle.make,
          model: data.vehicle.model,
          year: data.vehicle.modelYear,
          fuelType: data.vehicle.fuelType || data.vehicle.bodyClass,
        });
        setVinInput('');
        setMode('list');
      } else {
        setVinError(data.error || 'Şasi numarası çözümlenemedi.');
      }
    } catch (err) {
      setVinError('Şasi doğrulama servisine bağlanılamadı.');
    } finally {
      setLoadingVin(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBrand || !selectedModel || !selectedYear) {
      alert('Lütfen marka, model ve yıl seçiniz.');
      return;
    }

    addVehicle({
      make: selectedBrand,
      model: selectedModel,
      year: selectedYear,
    });

    setSelectedBrand('');
    setSelectedModel('');
    setSelectedYear('');
    setMode('list');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-600/10 text-orange-600 flex items-center justify-center font-bold">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Garajım / Araçlarım
              </h3>
              <p className="text-xs text-slate-500">Opel, Peugeot, Citroën, Chevrolet ve DS aracınızı ekleyin</p>
            </div>
          </div>
          <button
            onClick={() => setIsGarageModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          
          {/* Navigation / Actions Tab */}
          <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setMode('list')}
              className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                mode === 'list'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Kayıtlı Araçlar ({savedVehicles.length})
            </button>
            <button
              onClick={() => setMode('add_vin')}
              className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                mode === 'add_vin'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>+ Şasi No ile Ekle</span>
            </button>
            <button
              onClick={() => setMode('add_manual')}
              className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                mode === 'add_manual'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              + Manuel Ekle
            </button>
          </div>

          {/* MODE: LIST VEHICLES */}
          {mode === 'list' && (
            <div className="space-y-3">
              {savedVehicles.length > 0 ? (
                <div className="space-y-2.5">
                  {savedVehicles.map((vehicle) => {
                    const isActive = activeVehicle?.id === vehicle.id;
                    return (
                      <div
                        key={vehicle.id}
                        className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isActive
                            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-500/50 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                              {vehicle.make} {vehicle.model}
                            </h4>
                            <span className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs px-2 py-0.5 rounded font-semibold">
                              {vehicle.year}
                            </span>
                            {isActive && (
                              <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-1">
                                <Check className="w-3 h-3" /> Aktif Araç
                              </span>
                            )}
                          </div>
                          {vehicle.vin && (
                            <p className="text-[11px] font-mono text-slate-500">
                              VIN: {vehicle.vin}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/shop?brand=${encodeURIComponent(vehicle.make)}&model=${encodeURIComponent(vehicle.model)}&year=${encodeURIComponent(vehicle.year)}`}
                            onClick={() => {
                              setActiveVehicle(vehicle);
                              setIsGarageModalOpen(false);
                            }}
                            className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1"
                          >
                            <span>Parçaları Gör</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>

                          {!isActive && (
                            <button
                              onClick={() => setActiveVehicle(vehicle)}
                              className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all"
                            >
                              Seç
                            </button>
                          )}

                          <button
                            onClick={() => removeVehicle(vehicle.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                            title="Garajdan Kaldır"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-600/10 text-orange-600 flex items-center justify-center mx-auto">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-sm">Garajınız Henüz Boş</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      Opel, Peugeot, Citroën, Chevrolet veya DS aracınızı ekleyin; birebir montaj uyumlu orijinal ve muadil parçaları otomatik filtreleyelim.
                    </p>
                  </div>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setMode('add_vin')}
                      className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Şasi No ile Ekle</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MODE: ADD WITH VIN */}
          {mode === 'add_vin' && (
            <form onSubmit={handleVinSubmit} className="space-y-3">
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400 block uppercase tracking-wider">
                  Şasi Numarası (VIN) İle Otomatik Ekle
                </span>
                <p className="text-xs text-slate-500">
                  Ruhsatınızdaki 17 haneli şasi numarasını girin, aracınızın fabrika motor ve şasi kodları otomatik algılanıp garajınıza eklensin.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  17 Haneli Şasi Numarası
                </label>
                <input
                  type="text"
                  value={vinInput}
                  onChange={(e) => setVinInput(e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, ''))}
                  maxLength={17}
                  placeholder="17 Haneli Şasi Numarası"
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-xs sm:text-sm tracking-widest uppercase border border-slate-300 dark:border-slate-700 rounded-lg py-2.5 px-3 focus:outline-none focus:border-orange-600"
                />
                {vinError && (
                  <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5 mt-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{vinError}</span>
                  </p>
                )}
              </div>

              <div className="flex gap-2.5 pt-1">
                <button
                  type="submit"
                  disabled={loadingVin || vinInput.length === 0}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  {loadingVin ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Aracınız Sorgulanıyor...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Aracı Doğrula ve Garaja Ekle</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setMode('list')}
                  className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3.5 py-2.5 rounded-lg text-xs font-semibold"
                >
                  İptal
                </button>
              </div>
            </form>
          )}

          {/* MODE: ADD MANUAL */}
          {mode === 'add_manual' && (
            <form onSubmit={handleManualSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Araç Markası
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                    setSelectedModel('');
                  }}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-800 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-orange-600"
                >
                  <option value="">Marka Seçiniz</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Araç Modeli
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={!selectedBrand}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-800 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-orange-600 disabled:opacity-50"
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

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Model Yılı
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-800 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-orange-600"
                >
                  <option value="">Yıl Seçiniz</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Garaja Ekle</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('list')}
                  className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3.5 py-2.5 rounded-lg text-xs font-semibold"
                >
                  İptal
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
