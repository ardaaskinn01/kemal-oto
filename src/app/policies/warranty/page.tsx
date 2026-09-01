import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, Wrench, CheckCircle2, ChevronRight } from 'lucide-react';

export default function WarrantyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-[#E8820C] transition-colors">Ana Sayfa</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-semibold">Garanti ve Orijinallik Şartları</span>
      </nav>

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E8820C]">
          <Award className="w-4 h-4" />
          <span>Orijinal & A Kalite Muadil Güvencesi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Garanti ve Parça Orijinallik Şartları
        </h1>
        <p className="text-xs text-slate-500">Online Hızlı Parça %100 Üretici Garantisi ve Şasi Doğrulama Taahhüdü</p>
      </div>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">1. Orijinal (OEM) Parça Garantisi</h2>
          <p>
            Online Hızlı Parça stoklarında &quot;Orijinal OEM&quot; etiketiyle sunulan tüm parçalar; <strong>Opel (GM / Stellantis), Peugeot (PSA), Citroën (PSA), Chevrolet (GM) ve DS Automobiles</strong> yetkili distribütörlerinden ve doğrudan fabrika tedarik kanallarından temin edilmektedir. Her orijinal ürün, üretici hologramı ve seri barkodu ile sevk edilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">2. A Kalite Muadil Parça Standartları</h2>
          <p>
            Muadil yedek parçalarımız; Avrupa standartlarına (TÜV, ISO 9001, ECE R90 vb.) sahip, araç üreticilerine OEM üretim yapan dünya markalarından (Bosch, Valeo, Brembo, Filtron, Gates, INA, Sachs vb.) oluşmaktadır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">3. Garanti Süresi ve Kapsamı</h2>
          <p>
            Sitemizden satın alınan tüm elektrik, mekanik ve motor parçaları fatura tarihinden itibaren <strong>12 ay üretici garantisi</strong> altındadır. Üretim veya malzeme kaynaklı kusurlarda birebir değişim veya ücret iadesi uygulanır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">4. Garanti Dışı Haller</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Yetkisiz veya ehliyetsiz kişilerce yapılan hatalı montaj ve işçilik kusurları,</li>
            <li>Aracın fabrika teknik özelliklerine aykırı modifiye ve aşırı zorlama durumları,</li>
            <li>Periyodik bakım zamanı geçirilmiş veya yanlış yağ/sıvı kullanımı sonucu oluşan mekanik hasarlar.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
