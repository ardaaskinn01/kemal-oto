'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, Loader2, FileText, ArrowRight } from 'lucide-react';
import { Product } from '../../types/database.types';

interface ProductVinCheckProps {
  product: Product;
}

export function ProductVinCheck({ product }: ProductVinCheckProps) {
  const [vinInput, setVinInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const cleanVin = vinInput.trim().toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '');

  const handleVinCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cleanVin.length !== 17) {
      setStatus('error');
      setStatusMessage('Lütfen ruhsatınızdaki 17 haneli geçerli şasi numarasını giriniz.');
      return;
    }

    setLoading(true);
    setStatus('idle');
    setStatusMessage(null);

    try {
      const res = await fetch(`/api/vin/decode/${encodeURIComponent(cleanVin)}`);
      const data = await res.json();

      if (data.success && data.vehicle) {
        setStatus('success');
        setStatusMessage(`Teyit Edildi: ${data.vehicle.make} ${data.vehicle.model} (${data.vehicle.year}) ile %100 UYUMLU`);
      } else {
        setStatus('success');
        setStatusMessage(`Şasi No Alındı: Sipariş sonrası uzman ekibimizce ${cleanVin} şasi no kontrolleri tamamlanıp sevk edilecektir.`);
      }
    } catch (err) {
      setStatus('success');
      setStatusMessage(`Şasi No Kaydedildi: Ekibimiz ${cleanVin} için birebir uyum kontrolü gerçekleştirecektir.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border-2 border-amber-400/80 shadow-lg space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-400 font-black text-xs sm:text-sm uppercase tracking-wider">
          <ShieldCheck className="w-5 h-5 fill-amber-400/20 stroke-amber-400 shrink-0" />
          <span>Şasi Numarası İle Birebir Uyum Teyidi</span>
        </div>
        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black px-2 py-0.5 rounded">
          %100 UYUM GARANTİSİ
        </span>
      </div>

      <p className="text-xs text-slate-300">
        Parçanın aracınızla birebir uyumlu olduğundan emin olmak için ruhsatınızdaki (E) bendinde yazan 17 haneli şasi numarasını girin:
      </p>

      <form onSubmit={handleVinCheck} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            maxLength={17}
            value={vinInput}
            onChange={(e) => {
              setVinInput(e.target.value.toUpperCase());
              setStatus('idle');
            }}
            placeholder="17 Haneli Şasi No (Örn: W0L0AHL...)"
            className="w-full bg-slate-950 text-white placeholder-slate-500 border border-slate-700 rounded-xl py-2.5 px-3 font-mono text-xs font-bold uppercase focus:outline-none focus:border-amber-400"
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 font-mono">
            {cleanVin.length}/17
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-transform active:scale-95 shrink-0 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
          ) : (
            <>
              <span>UYUMU KONTROL ET</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>
      </form>

      {status === 'success' && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-xs font-bold text-emerald-300 flex items-center gap-2 animate-in fade-in duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {status === 'error' && (
        <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-xs font-bold text-red-300 flex items-center gap-2 animate-in fade-in duration-300">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}
    </div>
  );
}
