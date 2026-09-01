import React from 'react';
import Link from 'next/link';
import { FileText, ChevronRight, Building2, UserCheck } from 'lucide-react';

export default function DistanceSalesAgreementPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-[#E8820C] transition-colors">Ana Sayfa</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-semibold">Mesafeli Satış Sözleşmesi</span>
      </nav>

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E8820C]">
          <FileText className="w-4 h-4" />
          <span>Bireysel & Kurumsal Satış Şartları</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Mesafeli Satış Sözleşmesi ve Ön Bilgilendirme Formu
        </h1>
        <p className="text-xs text-slate-500">6502 Sayılı Tüketicinin Korunması Kanunu & 6102 Sayılı Türk Ticaret Kanunu Hükümleri</p>
      </div>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-6 leading-relaxed">
        {/* 1. Satıcı Bilgileri */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">1. Satıcı Bilgileri</h2>
          <div className="bg-slate-50 dark:bg-[#111318] p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-xs">
            <p><strong>Satıcı / Platform:</strong> Online Hızlı Parça (Kemal Oto Yedek Parça)</p>
            <p><strong>Adres:</strong> MUTLUBAŞLAR PLAZA, KEMALPAŞA CADDESİ, 5.SANAYİ SİTESİ PINARBAŞI NO:344B, 35060 Bornova/İzmir</p>
            <p><strong>Telefon:</strong> 0542 292 44 92</p>
            <p><strong>E-Posta:</strong> info@onlinehizliparca.com</p>
            <p><strong>Mersis No:</strong> 0549098231400018</p>
          </div>
        </section>

        {/* 2. Sözleşmenin Konusu ve Kapsamı */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">2. Sözleşmenin Konusu ve Satış Türleri</h2>
          <p>
            İşbu Sözleşme, Alıcı&apos;nın Satıcı&apos;ya ait <strong>onlinehizliparca.com</strong> internet sitesinden elektronik ortamda siparişini yaptığı oto yedek parça ve aksesuarların satışı, teslimi ve faturalandırılması ile ilgili hak ve yükümlülükleri düzenler.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111318]">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white mb-1">
                <UserCheck className="w-4 h-4 text-[#E8820C]" />
                <span>A) Bireysel (Tüketici) Satışlar</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                6502 Sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği&apos;ne tabidir. TCKN zorunluluğu yoktur; fatura e-Arşiv olarak iletilir. 14 gün koşulsuz cayma hakkı geçerlidir.
              </p>
            </div>
            <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111318]">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white mb-1">
                <Building2 className="w-4 h-4 text-[#E8820C]" />
                <span>B) Kurumsal (Ticari) Satışlar</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                6102 Sayılı Türk Ticaret Kanunu (TTK) hükümlerine tabidir. Vergi dairesi ve VKN ile kurumsal fatura düzenlenir. İadelerde kurumsal iade faturası düzenlenmesi zorunludur.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Teslimat ve Kargo */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">3. Teslimat ve Kargo Koşulları</h2>
          <p>
            Siparişler, anlaşmalı kargo kuruluşumuz olan <strong>DHL Express</strong> aracılığıyla Alıcı&apos;nın belirttiği adrese sevk edilir. Saat 16:00&apos;ya kadar verilen siparişler aynı gün kargoya teslim edilir. Sitemizde belirtilen kargo baremleri uyarınca, 2.500 TL ve üzeri siparişlerde kargo ücretsizdir.
          </p>
        </section>

        {/* 4. Cayma Hakkı ve İade Esasları */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">4. Cayma Hakkı ve İade Şartları</h2>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
            <li>
              <strong>Bireysel Alıcılar:</strong> Malın teslim alındığı tarihten itibaren <strong>14 gün</strong> içerisinde hiçbir gerekçe göstermeksizin cayma hakkını kullanabilir.
            </li>
            <li>
              <strong>Kurumsal Alıcılar:</strong> TTK hükümleri uyarınca teslim alınan ticari emtianın muayenesi sonrasında ayıplı veya hatalı parçaların iadesinde Alıcı firmanın <strong>İade Faturası</strong> düzenlemesi mevzuat gereği zorunludur.
            </li>
            <li>
              <strong>İade Koşulu:</strong> İade edilecek parçanın montajının denenmemiş/yapılmamış olması, elektrik/elektronik aksamların soketlerinin takılmamış olması ve orijinal kutu/ambalaj bütünlüğünün korunmuş olması gerekmektedir.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
