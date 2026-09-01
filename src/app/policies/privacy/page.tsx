import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, ChevronRight } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-[#E8820C] transition-colors">Ana Sayfa</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-semibold">Gizlilik ve Güvenlik Politikası</span>
      </nav>

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E8820C]">
          <Lock className="w-4 h-4" />
          <span>Yasal Metinler & Güvenlik</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Gizlilik ve Güvenlik Politikası
        </h1>
        <p className="text-xs text-slate-500">Son Güncelleme: 2026</p>
      </div>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-6 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">1. Genel Bilgilendirme ve Amaç</h2>
          <p>
            Online Hızlı Parça (&quot;Online Hızlı Parça&quot;) olarak, çevrim içi mağazamız (<Link href="https://www.onlinehizliparca.com" className="text-[#E8820C] hover:underline">onlinehizliparca.com</Link>) üzerinden alışveriş yapan bireysel ve kurumsal müşterilerimizin kişisel ve ticari verilerinin gizliliğine ve güvenliğine en üst düzeyde önem vermekteyiz. Bu Gizlilik Politikası, web sitemizi kullanırken toplanan, işlenen ve saklanan verilerin niteliğini, işlenme amaçlarını ve haklarınızı açıklamaktadır.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">2. Toplanan Müşteri ve Sipariş Verileri</h2>
          <p>
            onlinehizliparca.com üzerinden sipariş oluştururken veya hesap yönetimi esnasında fatura türüne (Bireysel veya Kurumsal) göre aşağıdaki veriler toplanmaktadır:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Bireysel Müşteriler İçin:</strong> Ad, soyad, e-posta adresi, telefon numarası, teslimat ve fatura adresi. <em>(Bireysel müşterilerimizden T.C. kimlik numarası talep edilmemekte; e-Arşiv faturalar yürürlükteki mevzuat uyarınca doğrudan ad, soyad ve adres bilgileriyle düzenlenmektedir.)</em></li>
            <li><strong>Kurumsal Müşteriler İçin:</strong> Şirket ticari unvanı, vergi dairesi, vergi kimlik numarası (VKN), yetkili irtibat kişisi, kurumsal fatura adresi, telefon ve kurumsal e-posta adresi.</li>
            <li><strong>Araç ve Şasi Bilgileri:</strong> İsteğe bağlı olarak girilen 17 haneli araç şasi numarası (VIN), marka, model ve motor bilgisi (yalnızca yedek parça uyum doğrulaması için kullanılır).</li>
            <li><strong>İşlem ve Ödeme Bilgileri:</strong> Satın alınan parçalar, sipariş tutarı, kargo takip kodları ve ödeme durumu.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">3. Ödeme ve Kart Güvenliği (256-Bit SSL & 3D Secure)</h2>
          <p>
            Online Hızlı Parça, kredi kartı ve banka kartı bilgilerinizi kesinlikle kendi sunucularında saklamaz. Sitemiz üzerinden gerçekleştirilen tüm ödeme işlemleri, BDDK lisanslı ve uluslararası PCI-DSS Level 1 güvenlik sertifikasına sahip <strong>İyzico / Güvenli Ödeme Altyapısı</strong> üzerinden 256-Bit SSL şifreleme ve 3D Secure güvenli doğrulama protokolü ile doğrudan banka sistemlerine iletilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">4. Veri Paylaşımı ve Bildirimler</h2>
          <p>
            Toplanan verileriniz, yasal zorunluluklar haricinde üçüncü şahıslara kesinlikle satılmaz veya ticari amaçla devredilmez. Bilgileriniz yalnızca siparişinizin tamamlanması, yasal e-fatura/e-arşiv faturanızın düzenlenmesi ve siparişinizin anlaşmalı lojistik kuruluşumuz (<strong>DHL Express</strong>) ile sevk edilmesi amacıyla işlenir. Tüm sipariş durumları ve fatura nüshaları SMS gönderimi yapılmaksızın yalnızca e-posta yoluyla iletilir.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">5. İletişim ve Haklarınız</h2>
          <p>
            Kişisel veya kurumsal verilerinizin işlenmesine ilişkin her türlü soru ve talepleriniz için <a href="mailto:info@onlinehizliparca.com" className="text-[#E8820C] font-semibold hover:underline">info@onlinehizliparca.com</a> e-posta adresimizden veya <strong>0542 292 44 92</strong> destek hattımızdan bize ulaşabilirsiniz.
          </p>
        </section>
      </div>
    </div>
  );
}
