import React from 'react';
import Link from 'next/link';
import { FileText, CheckCircle2, ChevronRight } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-orange-600 transition-colors">Ana Sayfa</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-semibold">Kullanım Koşulları & Üyelik Sözleşmesi</span>
      </nav>

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400">
          <FileText className="w-4 h-4" />
          <span>Yasal Metinler & Şartlar</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Kullanım Koşulları ve Üyelik Sözleşmesi
        </h1>
        <p className="text-xs text-slate-500">Son Güncelleme: Ocak 2026</p>
      </div>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">1. Taraflar ve Sözleşmenin Konusu</h2>
          <p>
            İşbu Kullanım Koşulları ve Üyelik Sözleşmesi (&quot;Sözleşme&quot;), Kemal Oto (&quot;Kemal Oto&quot;) ile <Link href="https://kemaloto.com" className="text-orange-600 hover:underline">kemaloto.com</Link> sitesine üye olan veya site üzerinden sipariş oluşturan kullanıcı (&quot;Müşteri / Üye&quot;) arasında akdedilmiştir.
          </p>
        </section>

        {/* 2. Hizmet Kapsamı */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">2. Sunulan Hizmetin Kapsamı</h2>
          <p>
            Online Hızlı Parça platformu; Opel, Peugeot, Citroën, Chevrolet ve DS grubu araç sahiplerine yönelik orijinal ve muadil yedek parça satışı, şasi numarası (VIN) üzerinden uyumluluk doğrulama ve kargo takip hizmeti sunmaktadır.
          </p>
        </section>

        {/* 3. Fikri Mülkiyet */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">3. Fikri Mülkiyet Hakları</h2>
          <p>
            kemaloto.com sitesinde yer alan tüm yazılımlar, tasarım bileşenleri, ürün açıklamaları, logolar ve veri tabanı Kemal Oto&apos;ya aittir. İzinsiz kopyalanamaz, çoğaltılamaz veya ticari amaçla kullanılamaz.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">4. Parça Uyumluluğu ve Şasi (VIN) Sorumluluğu</h2>
          <p>
            Otomotiv yedek parçalarında araç şasi numarası, motor kodu ve donanım varyasyonlarına göre uyumluluk farklılık gösterebilir. Kemal Oto; şasi numarası ile teyit edilen parçaların birebir uyumunu garanti eder. Şasi numarası belirtilmeksizin verilen siparişlerde doğabilecek uyumsuzluk hallerinde 14 günlük iade ve değişim prosedürümüz işletilmektedir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">4. Fikri ve Sınai Mülkiyet Hakları</h2>
          <p>
            kemaloto.com sitesinde yer alan tüm yazılımlar, tasarım bileşenleri, ürün açıklamaları, logolar ve veri tabanı Kemal Oto A.Ş.&apos;ye aittir. İzinsiz kopyalanamaz, çoğaltılamaz veya ticari amaçla kullanılamaz.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">5. Yürürlük ve Uyuşmazlıklar</h2>
          <p>
            Sözleşmenin uygulanmasından doğabilecek her türlü uyuşmazlığın çözümünde İstanbul (Çağlayan) Mahkemeleri ve İcra Daireleri yetkilidir.
          </p>
        </section>
      </div>
    </div>
  );
}
