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
  ExternalLink 
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

  const dhlOfficialUrl = trackingData?.trackingNumber
    ? `https://www.dhl.com/tr-tr/home/tracking.html?tracking-id=${encodeURIComponent(trackingData.trackingNumber)}&submit=1`
    : 'https://www.dhl.com/tr-tr/home/tracking.html';

  return (
    <div className="space-y-6">
      {/* Search Input Box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm transition-colors">
        <div className="max-w-2xl mx-auto text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 text-orange-700 dark:text-orange-400 text-xs font-bold px-3 py-1 rounded-md">
            <Truck className="w-3.5 h-3.5" />
            <span>Kemal Oto & DHL Express Takip Portalı</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Kargonuzu Anlık Takip Edin
          </h2>
          <p className="text-xs text-slate-500">
            E-posta ile iletilen DHL takip numaranızı girerek parçanızın güncel konumunu öğrenin.
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="Örn: DHL-TR-84920194"
              className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-xs sm:text-sm focus:outline-none focus:border-orange-600 font-mono uppercase"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span>Sorgulanıyor...</span>
            ) : (
              <>
                <span>Sorgula</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Tracking Result View */}
      {trackingData && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-6 shadow-sm">
          
          {/* Header Summary */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-slate-950 font-bold text-xs px-2 py-0.5 rounded font-mono">
                  DHL EXPRESS
                </span>
                <span className="text-slate-500 font-mono text-xs">
                  Takip No: <strong className="text-slate-900 dark:text-white">{trackingData.trackingNumber}</strong>
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                {trackingData.statusText}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={dhlOfficialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <span>DHL Resmi Sitesinde Gör</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="bg-slate-50 dark:bg-slate-950 p-2 px-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-orange-600" />
                <span>Tahmini Teslimat: <strong className="text-slate-900 dark:text-white">{trackingData.estimatedDeliveryDate}</strong></span>
              </div>
            </div>
          </div>

          {/* Package Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 block">Kargo Ağırlığı</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{trackingData.packageDetails.weightKg} KG</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 block">Hesaplanan Desi</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{trackingData.packageDetails.desi} Desi</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 block">Paket Türü</span>
              <span className="text-xs font-semibold text-slate-900 dark:text-white truncate block mt-0.5">
                {trackingData.packageDetails.packageType}
              </span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 block">Şasi Uyum Güvencesi</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Doğrulandı
              </span>
            </div>
          </div>

          {/* Timeline Checkpoints */}
          <div className="space-y-3 pt-1">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-orange-600" />
              Gönderi Hareket Geçmişi
            </h4>

            <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-slate-200 dark:before:bg-slate-800">
              {trackingData.checkpoints.map((cp, idx) => (
                <div key={cp.id} className="relative">
                  <div
                    className={`absolute -left-6 top-1 w-2.5 h-2.5 rounded-full border-2 ${
                      idx === trackingData.checkpoints.length - 1
                        ? 'bg-orange-600 border-white ring-2 ring-orange-600/30'
                        : 'bg-white dark:bg-slate-900 border-slate-400'
                    }`}
                  />
                  
                  <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-0.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-orange-600" />
                        {cp.location}
                      </span>
                      <span className="text-slate-400 text-[10px] font-mono">{cp.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">{cp.description}</p>
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
