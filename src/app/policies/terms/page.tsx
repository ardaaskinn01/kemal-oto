import React from 'react';
import Link from 'next/link';
import { FileText, ChevronRight } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-[#E8820C] transition-colors">Ana Sayfa</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-semibold">Kullanım Koşulları & Satış Şartları</span>
      </nav>

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E8820C]">
          <FileText className="w-4 h-4" />
          <span>Yasal Metinler & Satış Koşulları</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Kullanım Koşulları ve Üyelik Sözleşmesi
        </h1>
        <p className="text-xs text-slate-500">Son Güncelleme: 2026</p>
      </div>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">1. Taraflar ve Sözleşmenin Konusu</h2>
          <p>
            İşbu Kullanım Koşulları ve Üyelik Sözleşmesi (&quot;Sözleşme&quot;), Online Hızlı Parça (&quot;Online Hızlı Parça&quot;) ile <Link href="https://www.onlinehizliparca.com" className="text-[#E8820C] hover:underline">onlinehizliparca.com</Link> sitesine üye olan veya site üzerinden bireysel ya da kurumsal sipariş oluşturan kullanıcı (&quot;Müşteri / Üye / Alıcı&quot;) arasında akdedilmiştir.
          </p>
        </section>

        {/* 2. Bireysel ve Kurumsal Hizmet Kapsamı */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">2. Bireysel ve Kurumsal Satış Esasları</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Bireysel Satışlar:</strong> Tüketici sıfatıyla alışveriş yapan şahıslara yöneliktir. Bireysel siparişlerde T.C. kimlik numarası zorunluluğu bulunmamakta olup faturalar beyan edilen ad, soyad ve adres bilgileriyle e-Arşiv Fatura formatında düzenlenir.
            </li>
            <li>
              <strong>Kurumsal Satışlar (Oto Servis, Filo, Ticari İşletmeler):</strong> Tüzel kişi veya şahıs şirketi adına verilen siparişlerde Firma Unvanı, Vergi Dairesi ve Vergi Kimlik Numarası (VKN) beyan edilmesi zorunludur. Kurumsal faturalar mükellefiyet durumuna göre e-Fatura veya e-Arşiv Fatura olarak iletilir.
            </li>
          </ul>
        </section>

        {/* 3. Parça Uyumluluğu ve Şasi Doğrulaması */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">3. Parça Uyumluluğu ve Şasi (VIN) Sorumluluğu</h2>
          <p>
            Otomotiv yedek parçalarında araç şasi numarası, motor kodu ve donanım varyasyonlarına göre parçalar farklılık gösterebilir. Online Hızlı Parça, sipariş öncesinde veya sırasında 17 haneli şasi numarası (VIN) beyan edilen tüm siparişlerde birebir parça uyumunu garanti eder. Şasi numarası belirtilmeyen siparişlerde doğabilecek uyumsuzluk hallerinde iade ve değişim prosedürleri işletilmektedir.
          </p>
        </section>

        {/* 4. Fikri Mülkiyet */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">4. Fikri ve Sınai Mülkiyet Hakları</h2>
          <p>
            onlinehizliparca.com sitesinde yer alan tüm yazılımlar, tasarım bileşenleri, ürün açıklamaları, logolar ve veri tabanı Online Hızlı Parça&apos;ya aittir. İzinsiz kopyalanamaz, çoğaltılamaz veya ticari amaçla kullanılamaz.
          </p>
        </section>

        {/* 5. Yürürlük ve Yetkili Mahkeme */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">5. Yürürlük ve Uyuşmazlıklar</h2>
          <p>
            İşbu sözleşmenin uygulanmasından doğabilecek uyuşmazlıklarda; Bireysel tüketiciler için Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri, Kurumsal ticari alıcılar için ise İzmir Mahkemeleri ve İcra Daireleri yetkilidir.
          </p>
        </section>
      </div>
    </div>
  );
}
