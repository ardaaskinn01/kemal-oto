'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cookie, X, Check, Settings2, ChevronDown, ChevronUp } from 'lucide-react';

interface CookiePreferences {
  essential: boolean; // Always true
  functional: boolean;
  analytics: boolean;
}

export function CookieConsentBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    functional: true,
    analytics: true,
  });

  useEffect(() => {
    // Check if user already made a decision
    try {
      const storedConsent = localStorage.getItem('cookie_consent');
      if (!storedConsent) {
        // Small delay for smooth entry
        const timer = setTimeout(() => setIsOpen(true), 1200);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(storedConsent);
        if (parsed.preferences) {
          setPreferences(parsed.preferences);
        }
      }
    } catch (e) {
      setIsOpen(true);
    }

    // Listen for custom event if user clicks "Çerez Ayarları" from Footer
    const handleOpenCookies = () => {
      setShowSettings(true);
      setIsOpen(true);
    };
    window.addEventListener('openCookieSettings', handleOpenCookies);
    return () => window.removeEventListener('openCookieSettings', handleOpenCookies);
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(
        'cookie_consent',
        JSON.stringify({
          accepted: true,
          date: new Date().toISOString(),
          preferences: prefs,
        })
      );
    } catch (e) {}
    setIsOpen(false);
  };

  const handleAcceptAll = () => {
    const all = { essential: true, functional: true, analytics: true };
    setPreferences(all);
    saveConsent(all);
  };

  const handleRejectNonEssential = () => {
    const onlyEssential = { essential: true, functional: false, analytics: false };
    setPreferences(onlyEssential);
    saveConsent(onlyEssential);
  };

  const handleSaveCustom = () => {
    saveConsent(preferences);
  };

  if (!isOpen) return null;

  return (
    <aside
      aria-label="Çerez İzin Bildirimi"
      className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-lg z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-white/95 dark:bg-[#121418]/95 backdrop-blur-md p-5 sm:p-6 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E8820C]/10 dark:bg-[#E8820C]/20 flex items-center justify-center text-[#E8820C] shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
                Çerez ve Gizlilik Tercihleriniz
              </h3>
              <p className="text-[11px] text-slate-500">6698 Sayılı KVKK Uyarınca Aydınlatma</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Bildirimi Kapat"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Sitemizin güvenli çalışması, sepetinizin korunması ve araç şasi eşleştirme deneyiminizin kesintisiz sürmesi için zorunlu çerezler kullanıyoruz. Detaylar için{' '}
          <Link href="/policies/kvkk" className="text-[#E8820C] font-semibold underline hover:text-[#d07205]">
            KVKK ve Çerez Politikamızı
          </Link>{' '}
          inceleyebilirsiniz.
        </p>

        {/* Detailed Settings Toggle */}
        {showSettings && (
          <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            {/* Essential */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1d24] border border-slate-200/60 dark:border-slate-800/80">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Zorunlu Çerezler</span>
                <span className="text-[11px] text-slate-500">Sepet, oturum ve güvenlik altyapısı (Kapatılamaz).</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                Aktif
              </span>
            </div>

            {/* Functional */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1d24] border border-slate-200/60 dark:border-slate-800/80">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">İşlevsel Çerezler</span>
                <span className="text-[11px] text-slate-500">Tema (Gece/Gündüz) ve araç garaj tercihleri.</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.functional}
                onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                className="w-4 h-4 accent-[#E8820C] rounded cursor-pointer"
              />
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#1a1d24] border border-slate-200/60 dark:border-slate-800/80">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Analitik ve Performans</span>
                <span className="text-[11px] text-slate-500">Anonim hız ve sayfa deneyimi ölçümleri.</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                className="w-4 h-4 accent-[#E8820C] rounded cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAcceptAll}
              className="px-3 py-2 text-xs font-bold rounded-xl bg-[#E8820C] hover:bg-[#d07205] text-white transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Tümünü Kabul Et</span>
            </button>
            <button
              onClick={handleRejectNonEssential}
              className="px-3 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            >
              Yalnızca Zorunlular
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>{showSettings ? 'Ayarları Gizle' : 'Tercihleri Özelleştir'}</span>
              {showSettings ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {showSettings && (
              <button
                onClick={handleSaveCustom}
                className="text-[11px] font-bold text-[#E8820C] hover:underline"
              >
                Seçimleri Kaydet
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
