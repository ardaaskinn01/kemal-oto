import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, ChevronRight } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-orange-600 transition-colors">Ana Sayfa</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-semibold">Gizlilik ve Güvenlik Politikası</span>
      </nav>

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400">
          <Lock className="w-4 h-4" />
          <span>Yasal Metinler & Güvenlik</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Gizlilik ve Güvenlik Politikası
        </h1>
        <p className="text-xs text-slate-500">Son Güncelleme: Ocak 2026</p>
      </div>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">1. Genel Bilgilendirme ve Amaç</h2>
          <p>
            Kemal Oto A.Ş. (&quot;Kemal Oto&quot;) olarak, çevrim içi mağazamız (<Link href="https://kemaloto.com" className="text-orange-600 hover:underline">kemaloto.com</Link>) üzerinden alışveriş yapan müşterilerimizin ve ziyaretçilerimizin kişisel verilerinin gizliliğine ve güvenliğine en üst düzeyde önem vermekteyiz. Bu Gizlilik Politikası, web sitemizi kullanırken toplanan, işlenen ve saklanan verilerin niteliğini, işlenme amaçlarını ve haklarınızı açıklamaktadır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">2. Toplanan Kişisel Veriler</h2>
          <p>
            Kemal Oto üzerinden sipariş oluştururken, üye olurken veya şasi numarasıyla parça sorgularken aşağıdaki veriler toplanabilmektedir:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, T.C. kimlik numarası (fatura zorunluluğu durumunda).</li>
            <li><strong>İletişim Bilgileri:</strong> E-posta adresi, teslimat ve fatura adresi (SMS ile pazarlama veya bildirim yapılmamaktadır, tüm sipariş ve kargo süreçleri e-posta ile iletilir).</li>
            <li><strong>Araç & Şasi Bilgileri:</strong> 17 haneli araç şasi numarası (VIN), marka, model, motor kodu ve üretim yılı (parça uyum teyidi amacıyla).</li>
            <li><strong>İşlem ve Sipariş Bilgileri:</strong> Satın alınan parçalar, sipariş geçmişi, kargo takip kodları ve ödeme durumu.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">3. Ödeme ve Kart Güvenliği (256-Bit SSL)</h2>
          <p>
            Kemal Oto, kredi kartı ve banka kartı bilgilerinizi kesinlikle kendi sunucularında saklamaz. Sitemiz üzerinden gerçekleştirilen tüm ödeme işlemleri, BDDK lisanslı ve uluslararası PCI-DSS Level 1 güvenlik sertifikasına sahip <strong>İyzico / Güvenli Ödeme Altyapısı</strong> üzerinden 256-Bit SSL şifreleme ve 3D Secure güvenli doğrulama protokolü ile doğrudan banka sistemlerine iletilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">4. Kişisel Verilerin Paylaşımı</h2>
          <p>
            Toplanan kişisel verileriniz, yasal zorunluluklar hariç olmak üzere üçüncü şahıslara satılmaz veya ticari amaçla devredilmez. Verileriniz yalnızca siparişinizin tamamlanması ve teslimatı amacıyla anlaşmalı lojistik iş ortaklarımız (<strong>DHL Express</strong>), e-fatura entegrasyon sağlayıcılarımız ve yasal merciler ile paylaşılmaktadır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">5. İletişim ve Haklarınız</h2>
          <p>
            Kişisel verilerinizin işlenmesine ilişkin her türlü soru ve talepleriniz için <a href="mailto:info@onlinehizliparca.com" className="text-orange-600 font-semibold hover:underline">info@onlinehizliparca.com</a> e-posta adresimizden bize ulaşabilirsiniz.
          </p>
        </section>
      </div>
    </div>
  );
}
