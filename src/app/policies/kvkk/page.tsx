import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export default function KvkkPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-[#E8820C] transition-colors">Ana Sayfa</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-semibold">KVKK Aydınlatma Metni & Çerez Politikası</span>
      </nav>

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E8820C]">
          <ShieldCheck className="w-4 h-4" />
          <span>Kişisel Verilerin Korunması Kanunu (6698 Sayılı)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          KVKK Aydınlatma Metni ve Çerez Politikası
        </h1>
        <p className="text-xs text-slate-500">Veri Sorumlusu: Kemal Oto</p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {/* 1. Veri Sorumlusu */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">1. Veri Sorumlusunun Kimliği</h2>
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca kişisel verileriniz; veri sorumlusu sıfatıyla <strong>Kemal Oto - Ferhat Gazan</strong> (Hasan Tahsin Vergi Dairesi, VKN/TCKN: 34861971414, Adres: Mutlubaşlar Plaza, Kemalpaşa Cad. 5. Sanayi Sitesi Pınarbaşı No:344B, 35060 Bornova / İzmir, E-posta: info@onlinehizliparca.com) tarafından aşağıda açıklanan kapsam ve yasal çerçevede işlenmektedir.
          </p>
        </section>

        {/* 2. Kişisel Verilerin İşlenme Amaçları ve Hukuki Sebepleri */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">2. İşlenme Amaçları ve Hukuki Dayanaklar (KVKK Madde 5)</h2>
          <p>
            Kişisel verileriniz, KVKK&apos;nın 5. ve 6. maddelerinde belirtilen şartlara uygun olarak aşağıdaki hukuki dayanaklarla işlenmektedir:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Sözleşmenin Kurulması ve İfası (Madde 5/2-c):</strong> Siparişlerin alınması, şasi numarası (VIN) üzerinden yedek parça uyumluluğunun teknik kontrolü, ürünlerin DHL Express ile sevk edilmesi ve satış sonrası destek hizmetlerinin sunulması.
            </li>
            <li>
              <strong>Hukuki Yükümlülüğün Yerine Getirilmesi (Madde 5/2-ç):</strong> 213 sayılı Vergi Usul Kanunu uyarınca e-Arşiv / e-Fatura düzenlenmesi, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve 6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun kapsamındaki yasal bildirimlerin saklanması.
            </li>
            <li>
              <strong>Bir Hakkın Tesisi, Kullanılması veya Korunması (Madde 5/2-e):</strong> Olası uyuşmazlıklarda tüketici hakem heyetleri ve mahkemeler nezdinde haklarımızın savunulması, cayma ve iade süreçlerinin takibi.
            </li>
            <li>
              <strong>Meşru Menfaat (Madde 5/2-f):</strong> Temel hak ve özgürlüklerinize zarar vermemek kaydıyla, bilgi güvenliği süreçlerinin yürütülmesi, platform performansının ve müşteri deneyiminin iyileştirilmesi.
            </li>
          </ul>
        </section>

        {/* 3. Yurt Dışına Veri Aktarımı */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">3. Kişisel Verilerin Yurt Dışına Aktarımı (KVKK Madde 9)</h2>
          <p>
            Online Hızlı Parça, ziyaretçilerine kesintisiz, güvenli ve modern bir e-ticaret deneyimi sunabilmek amacıyla küresel ölçekte kabul görmüş, yüksek güvenlikli bulut altyapılarından faydalanmaktadır. Bu doğrultuda verileriniz:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111318]">
              <p className="font-bold text-slate-900 dark:text-white">Veri Tabanı & Kimlik Doğrulama</p>
              <p className="text-[11px] text-slate-500 mt-1">
                <strong>Supabase Inc. (ABD / AWS):</strong> Güvenli kullanıcı oturumu, sepet ve sipariş verilerinin saklanması için uçtan uca şifrelenmiş altyapı.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111318]">
              <p className="font-bold text-slate-900 dark:text-white">İşlemsel E-Posta İletimi</p>
              <p className="text-[11px] text-slate-500 mt-1">
                <strong>Resend Inc. (ABD):</strong> Sipariş onayları, fatura iletimleri ve iletişim formu bildirimlerinin gecikmesiz ulaştırılması.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111318]">
              <p className="font-bold text-slate-900 dark:text-white">Web Barındırma & CDN</p>
              <p className="text-[11px] text-slate-500 mt-1">
                <strong>Vercel Inc. (ABD / Global Edge):</strong> Web sitesinin yüksek hızda yayınlanması ve sunucu taraflı güvenli işleme.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111318]">
              <p className="font-bold text-slate-900 dark:text-white">DNS & Siber Güvenlik</p>
              <p className="text-[11px] text-slate-500 mt-1">
                <strong>Cloudflare Inc. (ABD / Anycast):</strong> DDoS koruması, SSL/TLS şifreleme ve kurumsal e-posta yönlendirme katmanı.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Söz konusu hizmet sağlayıcılar uluslararası standartlarda (SOC 2 Type II, ISO 27001, GDPR) veri güvenliği taahhütlerine sahip olup, verileriniz yalnızca platformun teknik işleyişi ve hizmet kalitesinin sürdürülmesi amacıyla sınırlı olarak işlenmektedir.
          </p>
        </section>

        {/* 4. Veri Saklama Süreleri */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">4. Kişisel Verilerin Saklama Süreleri</h2>
          <p>
            Kişisel verileriniz, ilgili yasal mevzuatlarda öngörülen zorunlu süreler veya işleme amacının gerektirdiği müddet boyunca saklanır:
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/60 text-slate-900 dark:text-white font-semibold">
                  <th className="p-2.5 border-b border-slate-200 dark:border-slate-700">Veri Kategorisi</th>
                  <th className="p-2.5 border-b border-slate-200 dark:border-slate-700">Saklama Süresi</th>
                  <th className="p-2.5 border-b border-slate-200 dark:border-slate-700">Yasal Dayanak / Amaç</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-2.5 font-medium">Sipariş, Fatura ve Ödeme Kayıtları</td>
                  <td className="p-2.5 font-semibold text-[#E8820C]">10 Yıl</td>
                  <td className="p-2.5">Türk Ticaret Kanunu (TTK) ve Vergi Usul Kanunu (VUK)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Mesafeli Satış ve Cayma Kayıtları</td>
                  <td className="p-2.5 font-semibold text-[#E8820C]">3 Yıl</td>
                  <td className="p-2.5">6502 Sayılı Tüketicinin Korunması Hakkında Kanun</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">İletişim Formları ve Destek Talepleri</td>
                  <td className="p-2.5 font-semibold text-[#E8820C]">2 Yıl</td>
                  <td className="p-2.5">Hizmet kalitesi ve müşteri uyuşmazlık yönetimi</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Web Trafik ve Güvenlik Logları</td>
                  <td className="p-2.5 font-semibold text-[#E8820C]">2 Yıl</td>
                  <td className="p-2.5">5651 Sayılı İnternet Ortamında Yapılan Yayınlar Kanunu</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Çerez (Cookie) ve Tercih Verileri</td>
                  <td className="p-2.5 font-semibold text-[#E8820C]">Oturum süresince veya azami 1 Yıl</td>
                  <td className="p-2.5">Kullanıcı arayüz tercihleri ve sepet oturumu</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Çerez (Cookie) Kullanımı */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">5. Çerez (Cookie) Türleri ve Yönetimi</h2>
          <p>
            onlinehizliparca.com sitesinde kullanıcı deneyimini sağlamak amacıyla aşağıdaki çerez kategorileri kullanılmaktadır:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Zorunlu Çerezler:</strong> Alışveriş sepetinizin korunması, oturum güvenliğinin sağlanması ve ödeme akışının çalışması için teknik olarak zorunludur; kapatılamaz.</li>
            <li><strong>İşlevsel Çerezler:</strong> Tercih ettiğiniz tema (Açık / Koyu Tema), dil seçimi ve araç filtreleme tercihlerinizin hatırlanmasını sağlar.</li>
            <li><strong>Performans ve Analitik Çerezler:</strong> Sayfa yükleme süreleri ve ziyaretçi etkileşimlerinin anonim istatistiki ölçümünü sağlayarak platform kalitesini artırır.</li>
          </ul>
          <p className="text-xs text-slate-500">
            Dilediğiniz zaman web sitemizin alt bölümünde yer alan Çerez Ayarları panelinden veya tarayıcınızın ayarlarından çerez tercihlerinizi değiştirebilirsiniz.
          </p>
        </section>

        {/* 6. KVKK Kapsamındaki Haklarınız (Madde 11) */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">6. KVKK Kapsamındaki Haklarınız (Madde 11)</h2>
          <p>
            KVKK&apos;nın 11. maddesi uyarınca her ilgili kişi; verilerinin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında verilerin aktarıldığı üçüncü kişileri bilme, eksik/yanlış verilerin düzeltilmesini isteme ve şartları oluştuğunda verilerin silinmesini veya yok edilmesini talep etme haklarına sahiptir.
          </p>
          <p>
            Kanun kapsamındaki taleplerinizi, kimliğinizi tevsik edici belgelerle birlikte <a href="mailto:info@onlinehizliparca.com" className="text-[#E8820C] font-semibold hover:underline">info@onlinehizliparca.com</a> kayıtlı e-posta adresimize yazılı olarak iletebilirsiniz. Başvurularınız en geç 30 (otuz) gün içinde ücretsiz olarak sonuçlandırılacaktır.
          </p>
        </section>
      </div>
    </div>
  );
}
