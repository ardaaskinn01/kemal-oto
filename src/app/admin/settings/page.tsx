'use client';

import React, { useState } from 'react';
import { useShippingSettings } from '../../contexts/ShippingSettingsContext';
import { 
  Truck, 
  Save, 
  Check, 
  Sparkles, 
  Info, 
  CreditCard,
  Percent,
  Settings,
  Loader2
} from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

export default function AdminSettingsPage() {
  const { shippingSettings, updateShippingSettings, loading } = useShippingSettings();

  const [cost, setCost] = useState(shippingSettings.cost.toString());
  const [freeThreshold, setFreeThreshold] = useState(shippingSettings.freeThreshold.toString());
  const [carrier, setCarrier] = useState(shippingSettings.carrier || 'DHL Express');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync state if context loads
  React.useEffect(() => {
    setCost(shippingSettings.cost.toString());
    setFreeThreshold(shippingSettings.freeThreshold.toString());
    setCarrier(shippingSettings.carrier || 'DHL Express');
  }, [shippingSettings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    const success = await updateShippingSettings({
      cost: Number(cost) || 150,
      freeThreshold: Number(freeThreshold) || 2500,
      carrier: carrier.trim() || 'DHL Express',
    });

    setSaving(false);
    if (success) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Kargo & Site Ayarları</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Kargo ücreti, ücretsiz kargo eşik limiti ve taşıyıcı firma parametrelerini yönetin.
          </p>
        </div>
      </div>

      {/* Success Notification */}
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/30 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Kargo ve site ayarları başarıyla güncellendi! Tüm sitede anında aktif edildi.</span>
        </div>
      )}

      {/* Current Preview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-1 shadow-sm">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold">Mevcut Kargo Ücreti</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white">{formatCurrency(shippingSettings.cost)}</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{formatCurrency(shippingSettings.freeThreshold)} altı siparişlerde</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-500/30 rounded-2xl p-5 space-y-1 shadow-sm">
          <span className="text-[11px] text-emerald-700 dark:text-emerald-400 block font-semibold">Ücretsiz Kargo Limiti</span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{formatCurrency(shippingSettings.freeThreshold)}+</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Bu tutar üzeri kargo bedava</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-1 shadow-sm">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-semibold">Anlaşmalı Taşıyıcı</span>
          <span className="text-xl font-black text-amber-600 dark:text-amber-400 truncate block">{shippingSettings.carrier}</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Elden teslimat & bildirim</span>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-500 flex items-center justify-center font-bold">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Kargo Ücretlendirme Formu</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Değerleri değiştirip kaydettiğinizde sepette ve ödemede anında geçerli olur</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Free Threshold */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
                Ücretsiz Kargo Eşik Tutarı (TL) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min="0"
                  value={freeThreshold}
                  onChange={(e) => setFreeThreshold(e.target.value)}
                  placeholder="2500"
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold text-base border border-slate-300 dark:border-slate-700 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  TL ve Üzeri
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Müşteri sepeti bu tutara ulaştığında kargo ücreti <strong>0 TL (Ücretsiz)</strong> olarak hesaplanır.
              </p>
            </div>

            {/* Standard Shipping Cost */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
                Standart Kargo Ücreti (TL) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min="0"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="150"
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold text-base border border-slate-300 dark:border-slate-700 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  TL
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Belirlenen limitin altındaki siparişlerde sepete eklenecek kargo bedeli (Örn: <strong>150 TL</strong>).
              </p>
            </div>

            {/* Carrier Name */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
                Kargo Taşıyıcı Firma Adı
              </label>
              <input
                type="text"
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                placeholder="DHL Express"
                className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-orange-500"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Müşteriye giden e-postalarda ve takip ekranlarında görünecek resmi kargo firması unvanı.
              </p>
            </div>

          </div>

          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-300">
            <Info className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
            <span>
              Kargo ücretini değiştirdiğinizde Navbar'daki <em>"2500 TL Üzeri Ücretsiz Kargo"</em> duyurusu ve sepet hesaplayıcıları anında güncellenir.
            </span>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-3.5 px-8 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Ayarlar Kaydediliyor...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Kargo Ayarlarını Kaydet</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
