import React from 'react';
import { DhlTracker } from '../components/shipping/DhlTracker';
import { trackDHLShipment } from '../lib/shipping/dhlService';

export const dynamic = 'force-dynamic';

export default async function TrackingPage() {
  const defaultTracking = await trackDHLShipment('DHL-TR-84920194');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-orange-500 font-bold text-xs uppercase tracking-wider">
          Kemal Oto & DHL Express Lojistik
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Sipariş & Kargo Takibi
        </h1>
        <p className="text-xs text-slate-400">
          Otomotiv parçalarınız özel ambalaj ve şase uyum kontrolü sonrası DHL Express güvencesiyle sevk edilmektedir.
        </p>
      </div>

      <DhlTracker initialTracking={defaultTracking} />
    </div>
  );
}
