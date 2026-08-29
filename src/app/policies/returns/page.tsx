import React from 'react';
import Link from 'next/link';
import { Truck, RotateCcw, ShieldCheck, ChevronRight } from 'lucide-react';

export default function ReturnsPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-orange-600 transition-colors">Ana Sayfa</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-semibold">Teslimat, İade ve Değişim Koşulları</span>
      </nav>

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400">
          <RotateCcw className="w-4 h-4" />
          <span>Müşteri Hakları & İade Rehberi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Teslimat, İade ve Değişim Koşulları
        </h1>
        <p className="text-xs text-slate-500">Koşulsuz 14 Gün İade ve Güvenli Teslimat Prosedürü</p>
      </div>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">1. Teslimat Süreci (DHL Express)</h2>
          <p>
            Hafta içi saat 16:30&apos;a kadar verilen siparişleriniz, depomuzda araç şasi numaranızla parçanın fiziksel kontrolü yapıldıktan sonra aynı gün paketlenerek anlaşmalı kargo firmamız <strong>DHL Express</strong>&apos;e elden teslim edilir. Kargo takip kodunuz e-posta ile tarafınıza iletilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">2. 14 Gün Koşulsuz İade Hakkı</h2>
          <p>
            Satın aldığınız yedek parçayı, teslim aldığınız tarihten itibaren <strong>14 gün</strong> içerisinde herhangi bir gerekçe belirtmeksizin iade edebilir veya değişim talep edebilirsiniz.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">3. İade Kabul Kriterleri</h2>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <p className="font-semibold text-slate-900 dark:text-white">İadenin onaylanması için aşağıdaki şartlar aranmaktadır:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ürünün araca montajının yapılmamış, denenmemiş ve cıvata/yuva izi bulunmaması gerekmektedir.</li>
              <li>Orijinal üretici kutusu, hologramı ve parça barkodunun zarar görmemiş olması gerekir.</li>
              <li>Elektrik/elektronik sensör ve beyin parçalarında ambalaj güvenlik bandının açılmamış olması gerekmektedir.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">4. İade Ücretinin Geri Ödenmesi</h2>
          <p>
            İade ettiğiniz ürün Bornova/İzmir depomuza ulaştıktan ve teknik ekibimizce kontrol edildikten sonra <strong>2 ila 4 iş günü</strong> içerisinde ödemeniz kartınıza iade edilir.
          </p>
        </section>
      </div>
    </div>
  );
}
