import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, Wrench, ChevronRight } from 'lucide-react';

export default function WarrantyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-orange-600 transition-colors">Ana Sayfa</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-semibold">Garanti ve Orijinallik Politikası</span>
      </nav>

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Kalite & Güvence Standartları</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Garanti ve Orijinallik Politikası
        </h1>
        <p className="text-xs text-slate-500">Kemal Oto %100 Üretici Garantisi ve Şasi Doğrulama Taahhüdü</p>
      </div>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">1. Orijinal OEM Parça Güvencesi</h2>
          <p>
            Kemal Oto stoklarında &quot;Orijinal OEM&quot; etiketiyle sunulan tüm parçalar; <strong>Opel (GM / Stellantis), Peugeot (PSA), Citroën (PSA), Chevrolet (GM) ve DS Automobiles</strong> yetkili distribütörlerinden ve doğrudan fabrika tedarik kanallarından temin edilmektedir. Her orijinal ürün, üretici hologramı ve seri barkodu ile sevk edilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">2. A Kalite Muadil Parça Standartları</h2>
          <p>
            &quot;A Kalite Muadil&quot; olarak etiketlenen ürünler; Bosch, Brembo, Mahle, Valeo, Sachs, Febi Bilstein, Filtron, Gates ve Dayco gibi uluslararası OEM üreticisi unvanına sahip dünya lideri markaların parçalarıdır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">3. Garanti Kapsamı ve Süresi</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Tüm mekanik ve motor parçaları, yetkili servis veya uzman oto servislerinde montaj yapılması koşuluyla <strong>12 ila 24 ay</strong> üretici garantisi altındadır.</li>
            <li>Üretim veya malzeme hatası tespit edilen parçalar, teknik inceleme raporu akabinde birebir yenisiyle değiştirilir.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
