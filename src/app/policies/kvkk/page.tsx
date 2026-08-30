import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText, ChevronRight } from 'lucide-react';

export default function KvkkPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-orange-600 transition-colors">Ana Sayfa</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-semibold">KVKK Aydınlatma Metni & Çerez Politikası</span>
      </nav>

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Kişisel Verilerin Korunması Kanunu (6698 Sayılı)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          KVKK Aydınlatma Metni ve Çerez Politikası
        </h1>
        <p className="text-xs text-slate-500">Veri Sorumlusu: Kemal Oto A.Ş.</p>
      </div>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">1. Veri Sorumlusunun Kimliği</h2>
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla Kemal Oto A.Ş. (&quot;Şirket&quot;) tarafından aşağıda açıklanan kapsamda işlenmektedir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">2. Kişisel Verilerin İşlenme Amaçları</h2>
          <p>
            Kişisel verileriniz, KVKK&apos;nın 5. ve 6. maddelerinde belirtilen şartlara uygun olarak aşağıdaki amaçlarla işlenmektedir:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>E-ticaret faaliyetlerinin yürütülmesi, siparişlerin alınması, faturalandırılması ve elden teslim / DHL Express ile sevk edilmesi,</li>
            <li>Araç şasi numarası (VIN) üzerinden yedek parça uyumluluğunun teknik olarak teyit edilmesi,</li>
            <li>Müşteri destek, garanti süreçleri ve iade taleplerinin yönetilmesi,</li>
            <li>Yasal ve idari yükümlülüklerin (Gelir İdaresi Başkanlığı, Tüketici Kanunu vb.) eksiksiz yerine getirilmesi.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">3. Çerez (Cookie) Kullanımı</h2>
          <p>
            kemaloto.com sitesinde kullanıcı deneyimini iyileştirmek, sepet durumunu hatırlamak ve tema tercihinizi (Açık / Koyu Tema) saklamak amacıyla zorunlu ve işlevsel çerezler kullanılmaktadır. Tarayıcı ayarlarınız üzerinden çerez tercihlerinizi dilediğiniz zaman değiştirebilirsiniz.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">4. KVKK Kapsamındaki Haklarınız (Madde 11)</h2>
          <p>
            KVKK&apos;nın 11. maddesi uyarınca her ilgili kişi; verilerinin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacına uygun kullanılıp kullanılmadığını öğrenme, verilerin düzeltilmesini veya silinmesini talep etme haklarına sahiptir.
          </p>
          <p>
            Başvurularınızı <a href="mailto:info@onlinehizliparca.com" className="text-orange-600 font-semibold hover:underline">info@onlinehizliparca.com</a> adresine iletebilirsiniz.
          </p>
        </section>
      </div>
    </div>
  );
}
