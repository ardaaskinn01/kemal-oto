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
            <p><strong>Satıcı / Platform:</strong> Online Hızlı Parça (Kemal Oto - Ferhat Gazan)</p>
            <p><strong>Vergi Dairesi:</strong> Hasan Tahsin Vergi Dairesi (İzmir)</p>
            <p><strong>Vergi / Mükellef No:</strong> 34861971414</p>
            <p><strong>Adres:</strong> MUTLUBAŞLAR PLAZA, KEMALPAŞA CADDESİ, 5.SANAYİ SİTESİ PINARBAŞI NO:344B, 35060 Bornova/İzmir</p>
            <p><strong>Telefon:</strong> 0542 292 44 92</p>
            <p><strong>E-Posta:</strong> info@onlinehizliparca.com</p>
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

        {/* 3. Siparişin Kurulması ve Teyit Mekanizması */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">3. Sözleşmenin Kurulması ve Sipariş Teyidi</h2>
          <p>
            Alıcı tarafından internet sitesi üzerinden sipariş formunun doldurulması ve ödeme işleminin başarıyla tamamlanması anında işbu Mesafeli Satış Sözleşmesi taraflar arasında kurulmuş kabul edilir.
          </p>
          <p>
            Sözleşmenin kurulmasını takiben Satıcı, sipariş özetini, toplam bedeli (ürün bedeli, vergiler ve varsa kargo ücreti dâhil) ve işbu sözleşme koşullarını Alıcı&apos;nın beyan ettiği e-posta adresine <strong>kalıcı veri saklayıcısı (e-posta)</strong> aracılığıyla gecikmeksizin iletir. Tüketici, sipariş vermeden önce ön bilgilendirme formunu ve mesafeli satış sözleşmesini elektronik ortamda okuyup teyit ettiğini kabul ve beyan eder.
          </p>
        </section>

        {/* 4. Teslimat ve Kargo */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">4. Teslimat ve Kargo Koşulları</h2>
          <p>
            Siparişler, anlaşmalı kargo kuruluşumuz olan <strong>DHL Express</strong> aracılığıyla Alıcı&apos;nın belirttiği adrese sevk edilir. Saat 16:00&apos;ya kadar verilen siparişler aynı gün kargoya teslim edilir. Sitemizde belirtilen kargo baremleri uyarınca, 2.500 TL ve üzeri siparişlerde kargo ücretsizdir. Teslimat, sipariş onayından itibaren yasal 30 günlük süreyi aşmamak kaydıyla gerçekleştirilir.
          </p>
        </section>

        {/* 5. Cayma Hakkı ve İade Esasları */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">5. Cayma Hakkı ve İade Şartları</h2>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
            <li>
              <strong>Bireysel Alıcılar:</strong> Malın teslim alındığı tarihten itibaren <strong>14 gün</strong> içerisinde hiçbir gerekçe göstermeksizin ve cezai şart ödemeksizin cayma hakkını kullanabilir. Cayma hakkı bildirimi, bu süre içinde yazılı olarak veya kalıcı veri saklayıcısıyla (e-posta yoluyla info@onlinehizliparca.com adresine) yapılmalıdır.
            </li>
            <li>
              <strong>Kurumsal Alıcılar:</strong> TTK hükümleri uyarınca teslim alınan ticari emtianın muayenesi sonrasında ayıplı veya hatalı parçaların iadesinde Alıcı firmanın mevzuat gereği <strong>İade Faturası</strong> düzenlemesi zorunludur.
            </li>
            <li>
              <strong>İade Kargo Süreci:</strong> Tüketici cayma hakkını kullandığı tarihten itibaren 10 gün içinde malı Satıcı&apos;nın anlaşmalı kargo firması (DHL Express) ile geri göndermelidir. Ayıplı mal veya hatalı gönderim durumlarında iade kargo ücreti Satıcı&apos;ya aittir. Keyfi cayma hallerinde iade kargo prosedürü anlaşmalı kargo kodu üzerinden yürütülür.
            </li>
          </ul>
        </section>

        {/* 6. Cayma Hakkının Kullanılamayacağı Durumlar (Madde 15) */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">6. Cayma Hakkının İstisnaları (Madde 15)</h2>
          <p>
            Mesafeli Sözleşmeler Yönetmeliği&apos;nin 15. maddesi uyarınca taraflarca aksi kararlaştırılmadıkça, tüketici aşağıdaki sözleşmelerde cayma hakkını kullanamaz:
          </p>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-xs space-y-2 text-amber-900 dark:text-amber-200">
            <p className="font-bold text-amber-800 dark:text-amber-300">Otomotiv Yedek Parça Sektörüne Özgü İstisnalar:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan, özel olarak yurt dışından ithal edilen veya özel üretilen siparişler (örneğin araca özel fabrika siparişli parçalar).</li>
              <li>Tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu unsurları açılmış olan ve montajı denenmiş, soketlerine takılmış, yeniden satılabilirlik vasfını kaybetmiş elektrik/elektronik oto parçaları (sensörler, beyinler, buji/bobin üniteleri vb.).</li>
              <li>Montaj işlemi esnasında cıvata, vida, yuva veya diş izi oluşmuş, çizilmiş veya orijinal ambalajı kullanılamaz hale gelmiş ürünler.</li>
            </ul>
          </div>
        </section>

        {/* 7. Örnek Cayma Formu (EK-2) */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">7. Örnek Cayma Formu (Mesafeli Sözleşmeler Yönetmeliği EK-2)</h2>
          <p className="text-xs text-slate-500">
            Cayma hakkınızı kullanmak için aşağıdaki formu kopyalayıp doldurarak <strong className="text-slate-900 dark:text-white">info@onlinehizliparca.com</strong> adresine iletebilir veya ürünle birlikte yazılı olarak sevk edebilirsiniz.
          </p>
          <div className="bg-slate-50 dark:bg-[#111318] p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-[11px] sm:text-xs leading-relaxed space-y-2 text-slate-800 dark:text-slate-200">
            <div className="border-b border-slate-200 dark:border-slate-700 pb-2 mb-2 font-sans font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>CAYMA HAKKI BİLDİRİM FORMU</span>
              <span className="text-[10px] text-[#E8820C] uppercase tracking-wider font-normal">Yönetmelik Ek-2 Formatı</span>
            </div>
            <p><strong>Kime:</strong> Kemal Oto (Ferhat Gazan) / info@onlinehizliparca.com</p>
            <p><strong>Adres:</strong> MUTLUBAŞLAR PLAZA, KEMALPAŞA CAD. 5.SANAYİ SİTESİ NO:344B, 35060 Bornova/İzmir</p>
            <div className="border-t border-dashed border-slate-300 dark:border-slate-700 my-2 pt-2 space-y-1">
              <p>- Bu formla aşağıdaki malların satışına veya hizmetlerin sunulmasına ilişkin sözleşmeden cayma hakkımı kullandığımı beyan ederim.</p>
              <p>- <strong>Sipariş Tarihi veya Teslim Tarihi:</strong> [___/___/202_]</p>
              <p>- <strong>Sipariş Numarası / Fatura No:</strong> [________________________]</p>
              <p>- <strong>Cayma Hakkına Konu Mal/Hizmet Adı:</strong> [________________________]</p>
              <p>- <strong>Tüketicinin Adı ve Soyadı:</strong> [________________________]</p>
              <p>- <strong>Tüketicinin Adresi:</strong> [________________________]</p>
              <p>- <strong>Tüketicinin Telefonu ve E-postası:</strong> [________________________]</p>
              <p>- <strong>Tarih:</strong> [___/___/202_]</p>
              <p>- <strong>Tüketicinin İmzası (Sadece kâğıt üzerinde sunulması halinde):</strong></p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
