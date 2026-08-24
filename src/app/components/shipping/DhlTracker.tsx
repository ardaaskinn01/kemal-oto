'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Truck, 
  Package, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { DHLTrackingInfo } from '../../types/shipping.types';

interface DhlTrackerProps {
  initialTracking?: DHLTrackingInfo | null;
}

export function DhlTracker({ initialTracking }: DhlTrackerProps) {
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingData, setTrackingData] = useState<DHLTrackingInfo | null>(initialTracking || null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/shipping/track/${encodeURIComponent(trackingCode.trim())}`);
      const data = await res.json();
      if (data.success && data.tracking) {
        setTrackingData(data.tracking);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Input Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-6">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Otomatik DHL Express API Takip Sistemi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Kargonuzu Anlık Takip Edin
          </h2>
          <p className="text-xs text-slate-400">
            Sipariş numaranızı veya SMS ile iletilen DHL takip kodunu girerek parçanızın anlık konumunu öğrenin.
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="Örn: DHL-TR-84920194 veya KML-98241"
              className="w-full bg-slate-950 text-white border border-slate-700 rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-orange-500 font-mono"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-orange-500/20 text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Sorgulanıyor...</span>
            ) : (
              <>
                <span>Sorgula</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Tracking Result View */}
      {trackingData && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
          
          {/* Header Summary */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-1 rounded tracking-widest font-mono">
                  DHL EXPRESS
                </span>
                <span className="text-slate-400 font-mono text-sm">
                  Takip No: <strong className="text-white">{trackingData.trackingNumber}</strong>
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                {trackingData.statusText}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span>Tahmini Teslimat: <strong className="text-white">{trackingData.estimatedDeliveryDate}</strong></span>
              </div>
            </div>
          </div>

          {/* Package & Optimization Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Kargo Ağırlığı</span>
              <span className="text-base font-bold text-white">{trackingData.packageDetails.weightKg} KG</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Hesaplanan Desi</span>
              <span className="text-base font-bold text-white">{trackingData.packageDetails.desi} Desi</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Paket Türü</span>
              <span className="text-xs font-semibold text-amber-400 truncate block mt-0.5">
                {trackingData.packageDetails.packageType}
              </span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Orijinal Parça Güvencesi</span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Doğrulandı
              </span>
            </div>
          </div>

          {/* Timeline Checkpoints */}
          <div className="space-y-4 pt-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              Gönderi Hareket Geçmişi
            </h4>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {trackingData.checkpoints.map((cp, idx) => (
                <div key={cp.id} className="relative group">
                  {/* Step Dot */}
                  <div
                    className={`absolute -left-6 sm:-left-8 top-1 w-3.5 h-3.5 rounded-full border-2 ${
                      idx === trackingData.checkpoints.length - 1
                        ? 'bg-orange-500 border-white ring-4 ring-orange-500/20'
                        : 'bg-slate-900 border-slate-600'
                    }`}
                  />
                  
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-orange-500" />
                        {cp.location}
                      </span>
                      <span className="text-slate-400 text-[11px] font-mono">{cp.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-300">{cp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
