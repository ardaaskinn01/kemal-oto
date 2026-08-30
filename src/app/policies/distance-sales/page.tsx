import React from 'react';
import Link from 'next/link';
import { FileText, ChevronRight } from 'lucide-react';

export default function DistanceSalesAgreementPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-orange-600 transition-colors">Ana Sayfa</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-semibold">Mesafeli Satış Sözleşmesi</span>
      </nav>

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400">
          <FileText className="w-4 h-4" />
          <span>6502 Sayılı Tüketicinin Korunması Kanunu</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Mesafeli Satış Sözleşmesi ve Ön Bilgilendirme Formu
        </h1>
        <p className="text-xs text-slate-500">Standart E-Ticaret Satış Hükümleri</p>
      </div>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">1. Satıcı Bilgileri</h2>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-xs">
            <p><strong>Unvan:</strong> Kemal Oto Otomotiv San. ve Tic. A.Ş.</p>
            <p><strong>Adres:</strong> MUTLUBAŞLAR PLAZA, KEMALPAŞA CADDESİ, 5.SANAYİ SİTESİ PINARBAŞI NO:344B, 35060 Bornova/İzmir</p>
            <p><strong>Telefon:</strong> 0542 292 44 92</p>
            <p><strong>E-Posta:</strong> info@onlinehizliparca.com</p>
            <p><strong>Mersis No:</strong> 0549098231400018</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">2. Sözleşmenin Konusu ve Kapsamı</h2>
          <p>
            İşbu Sözleşme, Alıcı&apos;nın Satıcı&apos;ya ait kemaloto.com internet sitesinden elektronik ortamda siparişini yaptığı oto yedek parça ve aksesuarların satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerini kapsar.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">3. Teslimat ve Kargo Ücreti</h2>
          <p>
            Siparişler, anlaşmalı kargo kuruluşu olan <strong>DHL Express</strong> aracılığıyla Alıcı&apos;nın belirttiği teslimat adresine sevk edilir. Sitemizde belirtilen kargo baremleri uyarınca, 2.500 TL ve üzeri siparişlerde kargo ücreti Satıcı tarafından karşılanır; 2.500 TL altındaki siparişlerde güncel kargo ücreti sipariş toplamına eklenir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">4. Cayma Hakkı (İade Koşulları)</h2>
          <p>
            Alıcı, hiçbir gerekçe göstermeksizin ve cezai şart ödemeksizin, malın teslim alındığı tarihten itibaren <strong>14 (on dört) gün</strong> içerisinde cayma hakkını kullanabilir. İade edilecek parçanın montajının yapılmamış, ambalajının hasar görmemiş ve orijinal kutusunun bozulmamış olması gerekmektedir.
          </p>
        </section>
      </div>
    </div>
  );
}
