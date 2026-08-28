import React from 'react';
import { DhlTracker } from '../components/shipping/DhlTracker';
import { trackDHLShipment } from '../lib/shipping/dhlService';

export const dynamic = 'force-dynamic';

interface TrackingPageProps {
  searchParams: Promise<{
    code?: string;
  }>;
}

export default async function TrackingPage({ searchParams }: TrackingPageProps) {
  const params = await searchParams;
  const trackingCode = params.code || 'DHL-TR-84920194';
  const defaultTracking = await trackDHLShipment(trackingCode);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-orange-600 dark:text-orange-500 font-bold text-xs uppercase tracking-wider">
          Kemal Oto & DHL Express Lojistik
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Sipariş & Kargo Takibi
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Otomotiv parçalarınız uzman kontrolü sonrası elden DHL Express kuryesine teslim edilir. Takip numaranızla gönderinizi canlı takip edebilirsiniz.
        </p>
      </div>

      <DhlTracker initialTracking={defaultTracking} />
    </div>
  );
}
