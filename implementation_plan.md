# 15 Ürün Vitrin Entegrasyonu, "Diğer Markalar" Desteği ve 8000+ Ürünlük Excel Import Altyapısı

Bu plan; İyzico başvuru onayı için mağaza vitrinine `STOK LİSTE.xlsx` dosyasından seçilen 15 adet gerçek ürünün internet piyasa fiyatları ve telifsiz ürün görselleriyle eklenmesini, bu ürünlerin sepete ekleme ve İyzico ödeme adımlarında çalışmasını, ayrıca sistemdeki 8.000+ parçanın ileride tek tıkla veya CLI ile içeri aktarılabilmesi için gerekli import altyapısının kurulmasını kapsar.

## User Review Required

> [!IMPORTANT]
> **Fiyatlandırma Yaklaşımı:** `STOK LİSTE.xlsx` dosyasında fiyatlar 0 olduğu için, seçilen 15 ürünün her birinin Türkiye internet yedek parça piyasasındaki (Trendyol, Hepsiburada, Sonparça, Akakçe, Cimri vb.) güncel ortalama satış fiyatları taranmış ve atanacaktır.
> **Görsel Yönetimi:** 15 ürün için telifsiz, temiz ve yüksek çözünürlüklü otomotiv parça fotoğrafları projenin `public/images/products/` dizinine yerel olarak kaydedilecek, böylece dış CDN bağlantı kopmaları veya telif riski olmadan hızlı ve güvenle yüklenecektir.

## Proposed Changes

---

### 1. "Diğer Markalar" (Fiat, Renault, VW vb.) Entegrasyonu

Listede yer alan ancak 5 uzmanlık markamız dışında kalan araçlar için "Diğer Markalar" desteği eklenecek:
* [MODIFY] `src/app/data/vehicleCatalogData.ts`: "Diğer Markalar" (Fiat, Renault, Volkswagen, Audi/Seat/Skoda vb.) kataloğa dahil edilecek.
* [MODIFY] `src/app/data/brandLogos.tsx`: "Diğer Markalar" için modern araç/yedek parça ikonu eklenecek.
* [MODIFY] `src/app/components/shop/ShopFilters.tsx`: "Diğer Markalar" filtresiyle uyumlu hale getirilecek.

---

### 2. İyzico Onayı İçin 15 Seçilmiş Gerçek Ürün

Tümü `STOK LİSTE.xlsx` dosyasında pozitif stoğu bulunan (`Kalan Miktar > 0`), orijinal veya A kalite üretici kodlu (Bosch, Delphi, SNR, Hengst, Eurorepar vb.) 15 ürün:

| # | Marka | Stok Kodu | Ürün Adı | Parça Üreticisi | Piyasa Ort. Fiyatı | Stok |
|---|---|---|---|---|---|---|
| 1 | **Opel** | `1208086DELPHİ` | Ateşleme Bobini 1.6 (Astra J / Insignia A) | Delphi GN10234-12B1 | 4.850 TL | 1 |
| 2 | **Opel** | `1010063OEM` | Lastik Basınç Sensörü TPMS (Astra J, Corsa E) | OEM | 850 TL | 6 |
| 3 | **Opel** | `1180016FROWAS` | Motor Kaput Amortisörü (Insignia A) | Frowas | 420 TL | 2 |
| 4 | **Opel / Chevrolet** | `1334065ASPART` | Devirdaim Su Pompası (Astra F/G, Corsa B, Aveo) | Aspart | 1.150 TL | 2 |
| 5 | **Chevrolet** | `1238079DELPHİ` | Emme Havası Sıcaklık Sensörü (Cruze, Aveo, Astra H) | Delphi TS10521 | 550 TL | 1 |
| 6 | **Chevrolet** | `13308302DFG` | Hava Filtre Boğaz Hortumu Körüğü (Cruze 1.6) | DFG | 750 TL | 1 |
| 7 | **Peugeot** | `0831.Q5SNR` | Triger Eksantrik Kayış Seti (206, 306 1.6 16V) | SNR KD459.07 | 1.450 TL | 1 |
| 8 | **Peugeot** | `0024.84SARDES` | Karbonlu Polen Filtresi (Peugeot 306) | Sardes SC572 | 320 TL | 2 |
| 9 | **Peugeot / Citroën** | `1103.N0ABRASSE` | Yağ Soğutucu Eşanjör (Partner, Berlingo 1.9D) | Abrasse | 1.350 TL | 1 |
| 10 | **Citroën** | `1623816280ERP` | Ön Fren Balata Takımı 155mm (C4 Picasso, Berlingo) | Eurorepar | 1.250 TL | 2 |
| 11 | **Citroën** | `1607498680DJ` | Arka Gazlı Amortisör (C4 Aircross) | DJParts | 1.850 TL | 2 |
| 12 | **Citroën** | `1307.YPWIN` | Termostat Yedek Su Depo Hortumu (C2, C3 1.4 HDi) | Wintech | 480 TL | 1 |
| 13 | **DS Automobiles** | `1607083180BOSCH` | Ön Fren Balata Takımı (DS 3, Peugeot 208, Corsa F) | Bosch 0986494564 | 1.550 TL | 1 |
| 14 | **DS Automobiles** | `1609582880BOSCH` | Arka Fren Diski 268mm (DS 4, DS 7, 3008 II) | Bosch 0986479C24 | 1.850 TL | 4 |
| 15 | **Diğer Markalar (VAG)** | `04E115561H-HENGST` | Yağ Filtresi (VW Golf VII, Polo, Audi A3 1.2/1.4 TSI) | Hengst H317W01 | 420 TL | 1 |
| 16 | **Diğer Markalar (Fiat)** | `1444.SQKRAFTVOLL` | Hava Filtresi (Fiat Ducato III, Boxer 2.2/2.3) | Kraftvoll | 460 TL | 2 |

---

### 3. Ürün Veri Kaynağı & Actions Entegrasyonu

* [NEW] `src/app/data/initialProducts.ts`: Yukarıdaki 15+ ürünün eksiksiz `Product` nesneleri, açıklamaları, teknik özellikleri, OEM kodları, fiyatları ve görsel yolları ile tanımlanması.
* [MODIFY] `src/app/lib/actions.ts`: `getProducts()` ve `getProductBySlug()` fonksiyonlarında, Supabase tablosu henüz doldurulmamışsa veya boşsa bu gerçek ürün verilerini sunacak şekilde hibrit/fallback mimarisinin devreye alınması (böylece Supabase hazır olmasa bile site asla boş kalmaz, İyzico denetçisi girdiğinde ürünler hemen listelenir).
* [MODIFY] `src/app/shop/products/[slug]/page.tsx`: Ürün detay sayfalarında bu ürünlerin doğru SEO, stok, görsel ve teknik uyumluluk verilerini göstermesi.

---

### 4. 8000+ Ürün İçin Arka Plan Import Sistemi

İleride tek bir komutla tüm Excel'i Supabase'e aktarabileceğiniz script altyapısı:
* [NEW] `scripts/importExcelProducts.ts`:
  * `STOK LİSTE.xlsx` dosyasını baştan sona okur.
  * Stok kodunu, parça adını, grubunu, üreticisini ve kalan miktarını parse eder.
  * Başlık ve kod içerisinden araba markasını (Opel, Peugeot, Citroën, Chevrolet, DS veya Diğer) tespit eder.
  * Otomatik SEO slug, kategori eşlemesi ve araç uyumluluk dizisi (`vehicle_compatibility`) oluşturur.
  * Çıktıyı doğrudan Supabase'e yükleyebilir (`--upload`) ya da tek seferlik içe aktarma için hazır bir `seed_products.sql` / `products_dump.json` dosyası olarak üretebilir.
* [MODIFY] `package.json`: `npm run import:excel` script kısayolu eklenmesi.

---

### 5. Görsel Varlıkları

* `public/images/products/`: 15 ürün için parça türüne uygun profesyonel, temiz görsel dosyalarının indirilip/üretilip yerel olarak kaydedilmesi.

---

## Verification Plan

### Otomatik Testler & Derleme
* `npm run build`: Next.js Turbopack derlemesinin, yeni eklenen ürün sayfalarının ve TypeScript tiplerinin hatasız derlendiğini doğrulama.

### Manuel Doğrulama
1. **Vitrin & Katalog**: `http://localhost:3000/shop` adresine gidip 15 ürünün listelendiğini, fotoğraflarının ve TL fiyatlarının düzgün göründüğünü kontrol etme.
2. **Marka Filtreleri**:
   * Opel seçildiğinde Opel ürünlerinin gelmesi,
   * Peugeot seçildiğinde Peugeot ürünlerinin gelmesi,
   * Chevrolet seçildiğinde Chevrolet ürünlerinin gelmesi,
   * Diğer Markalar seçildiğinde Fiat/VW ürünlerinin filtrelenmesi.
3. **Ürün Detayı**: Bir ürüne tıklayıp `slug` sayfasını, parça numarasını, OEM numarasını ve araç uyumluluk listesini inceleme.
4. **Sepet & İyzico Testi**: Bir ürünü sepete ekleyip "Hemen Satın Al" veya sepet drawer'ından ödeme formunu açarak ürün adı ve tutarının İyzico formuna doğru iletildiğini test etme.
5. **Excel Import Scripti**: `npm run import:excel -- --dry-run` komutunu çalıştırarak 8.794 ürünün başarıyla parse edildiğini ve raporlandığını doğrulama.
