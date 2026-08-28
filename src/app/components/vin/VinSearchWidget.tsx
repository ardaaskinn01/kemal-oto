'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Car, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Info, 
  Loader2 
} from 'lucide-react';
import { DecodedVehicleInfo } from '../../types/vin.types';

interface VinSearchWidgetProps {
  onVehicleDecoded?: (vehicle: DecodedVehicleInfo) => void;
  compact?: boolean;
}

export function VinSearchWidget({ onVehicleDecoded, compact = false }: VinSearchWidgetProps) {
  const [vinInput, setVinInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [decodedVehicle, setDecodedVehicle] = useState<DecodedVehicleInfo | null>(null);

  const cleanVin = vinInput.trim().toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '');
    if (val.length <= 17) {
      setVinInput(val);
      setError(null);
      if (val.length === 17 && !decodedVehicle) {
        triggerVinDecode(val);
      }
    }
  };

  const triggerVinDecode = async (vinToQuery: string) => {
    if (vinToQuery.length !== 17) {
      setError('Lütfen 17 haneli geçerli bir şasi numarası giriniz.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/vin/decode/${encodeURIComponent(vinToQuery)}`);
      const data = await res.json();

      if (data.success && data.vehicle) {
        setDecodedVehicle(data.vehicle);
        if (onVehicleDecoded) {
          onVehicleDecoded(data.vehicle);
        }
      } else {
        setError(data.error || 'Şasi numarası doğrulanamadı.');
      }
    } catch (err) {
      setError('Şasi sorgulama servisine bağlanılamadı. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerVinDecode(cleanVin);
  };

  return (
    <div className={`w-full ${compact ? '' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden'}`}>
      {!compact && (
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-600/10 text-orange-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                17 Haneli Şasi No (VIN) İle Parça Bul
                <span className="bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/20">
                  %100 Uyum
                </span>
              </h3>
              <p className="text-xs text-slate-500">Ruhsatınızdaki 17 haneli şasi numarasını girin</p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-500 bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800 font-mono">
            {cleanVin.length} / 17 Karakter
          </span>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleFormSubmit} className="space-y-3">
        <div>
          <div className="relative">
            <input
              type="text"
              value={vinInput}
              onChange={handleInputChange}
              placeholder="Örn: W0L0AHL3582123456"
              maxLength={17}
              className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-sm tracking-widest uppercase border border-slate-300 dark:border-slate-700 rounded-lg py-2.5 pl-10 pr-20 focus:outline-none focus:border-orange-600 transition-all placeholder:text-slate-400 placeholder:tracking-normal placeholder:font-sans"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-slate-400">
                {cleanVin.length}/17
              </span>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5 mt-2 bg-red-50 dark:bg-red-950/40 p-2.5 rounded-lg border border-red-200 dark:border-red-900/50">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </p>
          )}
        </div>

        {/* Action Button */}
        <div>
          <button
            type="submit"
            disabled={loading || cleanVin.length === 0}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 px-5 rounded-lg flex items-center justify-center gap-2 text-xs transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Şasi Çözümleniyor...</span>
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                <span>Şasiyi Çözümle & Parçaları Getir</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Decoded Vehicle Card Result */}
      {decodedVehicle && (
        <div className="mt-4 bg-slate-50 dark:bg-slate-950 border border-emerald-300 dark:border-emerald-500/30 rounded-xl p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 uppercase font-bold tracking-wider block">
                  Araç Doğrulandı
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {decodedVehicle.make} {decodedVehicle.model} ({decodedVehicle.modelYear})
                </h4>
              </div>
            </div>
            <span className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px] px-2 py-0.5 rounded">
              VIN: {decodedVehicle.vin}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block">Marka</span>
              <strong className="text-slate-900 dark:text-white">{decodedVehicle.make}</strong>
            </div>
            <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block">Model & Yıl</span>
              <strong className="text-slate-900 dark:text-white">{decodedVehicle.model} / {decodedVehicle.modelYear}</strong>
            </div>
            <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block">Gövde / Yakıt</span>
              <strong className="text-slate-900 dark:text-white">{decodedVehicle.fuelType || decodedVehicle.bodyClass || 'Binek'}</strong>
            </div>
            <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block">Üretim Yeri</span>
              <strong className="text-orange-600">{decodedVehicle.plantCountry || 'Avrupa'}</strong>
            </div>
          </div>

          <div className="pt-1">
            <a
              href={`/shop?vin=${encodeURIComponent(decodedVehicle.vin)}&brand=${encodeURIComponent(decodedVehicle.make)}&model=${encodeURIComponent(decodedVehicle.model)}`}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <Car className="w-3.5 h-3.5" />
              <span>Bu Araca Özel Uyumlu Parçaları Listele</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Info footer */}
      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
        <Info className="w-3.5 h-3.5 text-orange-600 shrink-0" />
        <span>Şasi numarası araç ruhsatınızın (E) bendinde yer alır.</span>
      </div>
    </div>
  );
}
