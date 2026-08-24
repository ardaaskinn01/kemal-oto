import React from 'react';
import { Wrench, Award, Users, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-orange-500 font-bold text-xs uppercase tracking-wider">
          40 Yıllık Tecrübe & Güven
        </span>
        <h1 className="text-4xl font-black text-white">Kemal Oto Hakkında</h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          Kemal Oto, Türkiye genelinde binek, hafif ticari ve ağır vasıta araçlar için orijinal ve A kalite muadil yedek parça tedariği sağlayan öncü otomotiv çözümleri merkezidir.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <span className="text-3xl font-black text-orange-500 block">50.000+</span>
          <span className="text-xs text-slate-400 font-medium">Stoktaki Parça Çeşidi</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <span className="text-3xl font-black text-amber-500 block">%100</span>
          <span className="text-xs text-slate-400 font-medium">Orijinal Uyum Garantisi</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <span className="text-3xl font-black text-orange-500 block">150K+</span>
          <span className="text-xs text-slate-400 font-medium">Mutlu Sürücü & Servis</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <span className="text-3xl font-black text-amber-500 block">81 İle</span>
          <span className="text-xs text-slate-400 font-medium">Aynı Gün Hızlı Gönderim</span>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white">Vizyonumuz</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Otomotiv yedek parça sektöründe en teknolojik, en şeffaf ve şase numarasına dayalı hatasız parça bulma altyapısını sunarak araç sahiplerinin ve tamir servislerinin ilk tercihi olmak.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white">Misyonumuz</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Dünyanın en seçkin üreticilerinin ürettiği yüksek güvenlik standartlarına sahip orijinal ve kaliteli yedek parçaları en uygun fiyat politikası ve koşulsuz iade güvencesiyle müşterilerimize ulaştırmak.
          </p>
        </div>
      </div>
    </div>
  );
}
