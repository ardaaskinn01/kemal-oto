'use client';

import React from 'react';
import { useGarage } from '../contexts/GarageContext';
import { 
  Car, 
  Plus, 
  ShieldCheck, 
  CheckCircle2, 
  Trash2, 
  ArrowRight, 
  Wrench, 
  Check, 
  Sparkles 
} from 'lucide-react';
import Link from 'next/link';

export default function GaragePage() {
  const { 
    savedVehicles, 
    activeVehicle, 
    removeVehicle, 
    setActiveVehicle, 
    setIsGarageModalOpen 
  } = useGarage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 text-orange-600 dark:text-orange-400 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Car className="w-3.5 h-3.5" />
            <span>Garaj Araç Yönetim Merkezi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Garajım & Kayıtlı Araçlarım
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Araçlarınızı garajınıza ekleyerek mağazadaki on binlerce parça arasından sadece sizin aracınıza %100 uyanları anında görüntüleyin.
          </p>
        </div>

        <button
          onClick={() => setIsGarageModalOpen(true)}
          className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-orange-500/20 text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Araç / Şasi Ekle</span>
        </button>
      </div>

      {/* Active Vehicle Hero Card */}
      {activeVehicle && (
        <div className="bg-gradient-to-r from-white via-orange-50/30 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border-2 border-orange-500/40 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-500/30 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Şu Anda Seçili Aktif Araç
                </span>
                {activeVehicle.vin && (
                  <span className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-mono text-xs px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800">
                    VIN: {activeVehicle.vin}
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {activeVehicle.make} {activeVehicle.model} ({activeVehicle.year})
              </h2>

              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-lg">
                Site genelinde arama yaparken veya kategorileri incelerken bu araca ait parçalar otomatik olarak önceliklendirilir.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/shop?brand=${encodeURIComponent(activeVehicle.make)}&model=${encodeURIComponent(activeVehicle.model)}&year=${encodeURIComponent(activeVehicle.year)}`}
                className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-lg shadow-orange-500/20 text-xs sm:text-sm flex items-center gap-2 transition-all"
              >
                <Wrench className="w-4 h-4" />
                <span>Uyumlu Tüm Parçaları Listele</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Saved Vehicles Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Kayıtlı Araçlar</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-800">
              {savedVehicles.length} Araç
            </span>
          </h3>
        </div>

        {savedVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedVehicles.map((vehicle) => {
              const isActive = activeVehicle?.id === vehicle.id;
              return (
                <div
                  key={vehicle.id}
                  className={`bg-white dark:bg-slate-900 border rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all ${
                    isActive
                      ? 'border-emerald-500/50 shadow-lg dark:shadow-emerald-500/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                        {vehicle.make}
                      </span>
                      {isActive ? (
                        <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Aktif
                        </span>
                      ) : (
                        <button
                          onClick={() => setActiveVehicle(vehicle)}
                          className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
                        >
                          Seçili Yap
                        </button>
                      )}
                    </div>

                    <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                      {vehicle.model}
                    </h4>

                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                        Yıl: {vehicle.year}
                      </span>
                      {vehicle.vin && (
                        <span className="bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                          Şasi: {vehicle.vin.slice(0, 8)}...
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                    <Link
                      href={`/shop?brand=${encodeURIComponent(vehicle.make)}&model=${encodeURIComponent(vehicle.model)}&year=${encodeURIComponent(vehicle.year)}`}
                      onClick={() => setActiveVehicle(vehicle)}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-center transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Parçaları Gör</span>
                      <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
                    </Link>

                    <button
                      onClick={() => removeVehicle(vehicle.id)}
                      className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors border border-transparent"
                      title="Garajdan Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center mx-auto">
              <Car className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white">Garajınızda Araç Bulunmuyor</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                Aracınızı şasi numaranızla veya marka/model seçerek ekleyin, aracınıza %100 uyan filtreler otomatik uygulansın.
              </p>
            </div>
            <button
              onClick={() => setIsGarageModalOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-lg shadow-orange-500/20"
            >
              Hemen İlk Aracınızı Ekleyin
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
