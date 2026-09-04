import { Product } from '../types/database.types';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. OPEL - ATEŞLEME BOBİNİ
  {
    id: 'prod-opel-bobin-delphi',
    title: 'Delphi Ateşleme Bobini 1.6 (Astra J / Insignia A / Zafira C)',
    slug: 'delphi-atesleme-bobini-astra-j-insignia-a-1208086',
    category: 'Aydınlatma & Elektrik Aksamı',
    category_slug: 'aydinlatma-elektrik',
    brand: 'Opel',
    part_number: '1208086DELPHİ',
    oem_reference_number: '1208086',
    is_original: true,
    part_quality: 'original',
    vehicle_compatibility: [
      { brand: 'Opel', model: 'Astra J', years: '2009 - 2018' },
      { brand: 'Opel', model: 'Insignia A', years: '2008 - 2017' },
      { brand: 'Opel', model: 'Zafira C Tourer', years: '2011 - 2019' },
      { brand: 'Chevrolet', model: 'Cruze 1.6 / 1.4T / 2.0D', years: '2009 - 2016' }
    ],
    price: 4850,
    discount_price: 4590,
    stock: 1,
    image_url: '/images/products/delphi-bobin.jpg',
    description: 'Opel Astra J ve Insignia A 1.6 (A16XER / A16LET) motorlarla %100 uyumlu orijinal kalitede Delphi ateşleme bobini. Yüksek voltaj direnci ve kararlı ateşleme performansı sunar.',
    technical_description: 'Üretici: Delphi. Parça No: GN10234-12B1. OEM Referans: 1208086 / 55577898. 7 pinli elektrik bağlantı soketi, döküm gövde, OEM standartlarında üretim.',
    specs: {
      'Üretici': 'Delphi',
      'Üretici Kodu': 'GN10234-12B1',
      'OEM Kodu': '1208086 / 55577898',
      'Motor Uyumluluğu': 'A16XER, A16LET, A18XER',
      'Pin Sayısı': '7 Pin',
      'Menşei': 'Almanya'
    },
    rating: 4.9,
    reviews_count: 14,
    is_featured: true,
    weight_kg: 1.2,
    created_at: '2026-09-01T10:00:00Z'
  },

  // 2. OPEL - LASTİK BASINÇ SENSÖRÜ (TPMS)
  {
    id: 'prod-opel-tpms-oem',
    title: 'Orijinal Lastik Basınç Sensörü TPMS 433MHz (Astra J / Corsa E / Insignia A)',
    slug: 'opel-lastik-basinc-sensoru-tpms-astra-j-corsa-e-1010063',
    category: 'Aydınlatma & Elektrik Aksamı',
    category_slug: 'aydinlatma-elektrik',
    brand: 'Opel',
    part_number: '1010063OEM',
    oem_reference_number: '1010063',
    is_original: true,
    part_quality: 'original',
    vehicle_compatibility: [
      { brand: 'Opel', model: 'Astra J', years: '2009 - 2018' },
      { brand: 'Opel', model: 'Corsa E', years: '2014 - 2019' },
      { brand: 'Opel', model: 'Insignia A', years: '2008 - 2017' },
      { brand: 'Opel', model: 'Zafira C Tourer', years: '2011 - 2019' }
    ],
    price: 850,
    discount_price: 790,
    stock: 6,
    image_url: '/images/products/tpms-sensor.jpg',
    description: 'Opel araçlar için orijinal fabrika çıkış standardında 433 MHz TPMS lastik hava basınç sensörü. Metal subap gövdesiyle uzun ömürlü ve kararlı sinyal iletimi sağlar.',
    technical_description: 'Frekans: 433 MHz. OEM Parça Kodu: 1010063 / 13506028. Kutu içeriğinde alüminyum vidalı subap iğnesi ve contası dahildir. Araç beynine otomatik tanıtılabilir.',
    specs: {
      'Üretici': 'OEM / Opel GM',
      'Frekans': '433 MHz',
      'OEM Kodu': '1010063 / 13506028',
      'Subap Tipi': 'Alüminyum Metal Vidalı',
      'Pil Ömrü': '5-7 Yıl'
    },
    rating: 4.8,
    reviews_count: 9,
    is_featured: true,
    weight_kg: 0.1,
    created_at: '2026-09-01T10:00:00Z'
  },

  // 3. OPEL - KAPUT AMORTİSÖRÜ
  {
    id: 'prod-opel-kaput-amortisoru',
    title: 'Frowas Motor Kaput Amortisörü 720mm (Insignia A)',
    slug: 'frowas-motor-kaput-amortisoru-insignia-a-1180016',
    category: 'Kaporta & Dış Aksesuar',
    category_slug: 'kaporta-aksesuar',
    brand: 'Opel',
    part_number: '1180016FROWAS',
    oem_reference_number: '1180016',
    is_original: false,
    part_quality: 'aftermarket',
    vehicle_compatibility: [
      { brand: 'Opel', model: 'Insignia A', years: '2008 - 2017' }
    ],
    price: 420,
    discount_price: 380,
    stock: 2,
    image_url: '/images/products/kaput-amortisoru.jpg',
    description: 'Opel Insignia A modelleri için özel üretilmiş 720mm uzunluğunda ve 180N kaldırma kuvvetine sahip gazlı motor kaput amortisörü.',
    technical_description: 'Uzunluk: 720 mm. İtme Kuvveti: 180 Newton. OEM Referans: 1180016 / 13247012. Dayanıklı korozyon önleyici siyah gövde, krom piston mili.',
    specs: {
      'Üretici': 'Frowas',
      'Üretici Kodu': '3781650001',
      'OEM Kodu': '1180016 / 13247012',
      'Uzunluk': '720 mm',
      'İtme Kuvveti': '180 N'
    },
    rating: 4.7,
    reviews_count: 5,
    is_featured: false,
    weight_kg: 0.4,
    created_at: '2026-09-01T10:00:00Z'
  },

  // 4. OPEL / CHEVROLET - DEVİRDAİM SU POMPASI
  {
    id: 'prod-opel-devirdaim-aspart',
    title: 'Aspart Devirdaim Su Pompası (Astra F/G, Corsa B, Kalos, Aveo 1.2 / 1.4 8V)',
    slug: 'aspart-devirdaim-su-pompasi-astra-corsa-aveo-1334065',
    category: 'Motor & Aktarma Organları',
    category_slug: 'motor-aktarma',
    brand: 'Opel',
    part_number: '1334065ASPART',
    oem_reference_number: '1334065',
    is_original: false,
    part_quality: 'aftermarket',
    vehicle_compatibility: [
      { brand: 'Opel', model: 'Astra F', years: '1991 - 1998' },
      { brand: 'Opel', model: 'Astra G', years: '1998 - 2009' },
      { brand: 'Opel', model: 'Corsa B', years: '1993 - 2000' },
      { brand: 'Chevrolet', model: 'Aveo T250', years: '2006 - 2011' },
      { brand: 'Chevrolet', model: 'Kalos', years: '2002 - 2008' }
    ],
    price: 1150,
    discount_price: 1050,
    stock: 2,
    image_url: '/images/products/devirdaim.jpg',
    description: 'Opel ve Chevrolet 1.2 / 1.4 8V motorlu araçlar için alüminyum gövdeli, yüksek debili devirdaim su pompası. Motor hararetini optimum seviyede tutar.',
    technical_description: 'Üretici: Aspart. Ürün Kodu: 6WPU1186. OEM: 1334065 / 90444079. Kutu içeriğine sızdırmazlık contası dahildir.',
    specs: {
      'Üretici': 'Aspart',
      'Üretici Kodu': '6WPU1186',
      'OEM Kodu': '1334065 / 90444079',
      'Pervane Malzemesi': 'Metal / Alüminyum',
      'Conta': 'Kutuya Dahil'
    },
    rating: 4.8,
    reviews_count: 8,
    is_featured: false,
    weight_kg: 1.1,
    created_at: '2026-09-01T10:00:00Z'
  },

  // 5. CHEVROLET - EMME HAVASI SICAKLIK SENSÖRÜ
  {
    id: 'prod-chevrolet-hava-sicaklik-delphi',
    title: 'Delphi Emme Havası Sıcaklık Sensörü (Cruze, Aveo, Astra H, Corsa D)',
    slug: 'delphi-emme-havasi-sicaklik-sensoru-cruze-aveo-1238079',
    category: 'Aydınlatma & Elektrik Aksamı',
    category_slug: 'aydinlatma-elektrik',
    brand: 'Chevrolet',
    part_number: '1238079DELPHİ',
    oem_reference_number: '1238079',
    is_original: true,
    part_quality: 'original',
    vehicle_compatibility: [
      { brand: 'Chevrolet', model: 'Cruze 1.6 / 1.4T / 2.0D', years: '2009 - 2016' },
      { brand: 'Chevrolet', model: 'Aveo T300', years: '2011 - 2018' },
      { brand: 'Opel', model: 'Astra H', years: '2004 - 2014' },
      { brand: 'Opel', model: 'Corsa D', years: '2006 - 2014' }
    ],
    price: 550,
    discount_price: 495,
    stock: 1,
    image_url: '/images/products/sicaklik-sensoru.jpg',
    description: 'Chevrolet Cruze ve Opel Astra H / Corsa D araçlar için hava debisi ve karışım sıcaklığını ECU ünitesine ileten hassas Delphi sıcaklık sensörü.',
    technical_description: 'Üretici: Delphi. Ürün Kodu: TS10521. OEM: 1238079 / 12129596. Pirinç dişli gövde, 2 pinli bağlantı soketi, NTC termistör teknolojisi.',
    specs: {
      'Üretici': 'Delphi',
      'Üretici Kodu': 'TS10521',
      'OEM Kodu': '1238079 / 12129596',
      'Kutup Sayısı': '2 Kutuplu',
      'Gövde': 'Pirinç Vidalı Diş'
    },
    rating: 5.0,
    reviews_count: 6,
    is_featured: false,
    weight_kg: 0.1,
    created_at: '2026-09-01T10:00:00Z'
  },

  // 6. CHEVROLET - HAVA FİLTRE HORTUMU
  {
    id: 'prod-chevrolet-hava-hortum-dfg',
    title: 'DFG Hava Filtre Boğaz Körük Hortumu (Cruze 1.6 A16XER)',
    slug: 'dfg-hava-filtre-bogaz-hortumu-cruze-1-6-13308302',
    category: 'Motor & Aktarma Organları',
    category_slug: 'motor-aktarma',
    brand: 'Chevrolet',
    part_number: '13308302DFG',
    oem_reference_number: '13308302',
    is_original: false,
    part_quality: 'aftermarket',
    vehicle_compatibility: [
      { brand: 'Chevrolet', model: 'Cruze 1.6 / 1.4T / 2.0D', years: '2009 - 2016' },
      { brand: 'Opel', model: 'Astra J', years: '2009 - 2018' }
    ],
    price: 750,
    discount_price: 680,
    stock: 1,
    image_url: '/images/products/hava-hortumu.jpg',
    description: 'Chevrolet Cruze 1.6 benzinli araçlarda hava filtre kazanı ile gaz kelebeği arasındaki akordiyon tipi esnek hava giriş hortumu.',
    technical_description: 'Üretici: DFG. OEM Parça No: 13308302. Yüksek ısıya ve yağ buharına dayanıklı EPDM kauçuk karışım. Paslanmaz montaj kelepçeleri üzerindedir.',
    specs: {
      'Üretici': 'DFG',
      'OEM Kodu': '13308302',
      'Malzeme': 'Körük Takviyeli EPDM Kauçuk',
      'Uyumlu Motor': '1.6 16V A16XER / F16D4'
    },
    rating: 4.6,
    reviews_count: 4,
    is_featured: false,
    weight_kg: 0.5,
    created_at: '2026-09-01T10:00:00Z'
  },

  // 7. PEUGEOT - TRİGER SETİ
  {
    id: 'prod-peugeot-triger-snr',
    title: 'SNR Triger Kayış & Gergi Rulman Seti (Peugeot 206 / 306 / 106 1.6 TU5JP)',
    slug: 'snr-triger-kayis-seti-peugeot-206-306-0831q5',
    category: 'Motor & Aktarma Organları',
    category_slug: 'motor-aktarma',
    brand: 'Peugeot',
    part_number: '0831.Q5SNR',
    oem_reference_number: '0831.Q5',
    is_original: true,
    part_quality: 'oem',
    vehicle_compatibility: [
      { brand: 'Peugeot', model: '206', years: '1998 - 2012' },
      { brand: 'Peugeot', model: '306', years: '1993 - 2002' },
      { brand: 'Peugeot', model: '106', years: '1991 - 2003' },
      { brand: 'Citroën', model: 'Saxo', years: '1996 - 2004' },
      { brand: 'Citroën', model: 'Xsara', years: '1997 - 2006' }
    ],
    price: 1450,
    discount_price: 1320,
    stock: 1,
    image_url: '/images/products/triger-seti.jpg',
    description: 'PSA Grubu TU5JP 1.6 motorlar için orijinal ekipman üreticisi NTN-SNR marka triger kayışı ve otomatik gergi rulmanı seti (101 diş).',
    technical_description: 'Üretici: NTN-SNR (Fransa). Kod: KD459.07. OEM Referans: 0831.Q5 / 0831.R8. Kayış Diş Sayısı: 101 Diş. Genişlik: 17 mm. 1 adet triger kayışı + 1 adet otomatik gergi bilyası.',
    specs: {
      'Üretici': 'NTN-SNR',
      'Üretici Kodu': 'KD459.07',
      'OEM Kodu': '0831.Q5 / 0831.R8',
      'Diş Sayısı': '101 Diş',
      'Genişlik': '17 mm',
      'Menşei': 'Fransa'
    },
    rating: 4.9,
    reviews_count: 17,
    is_featured: true,
    weight_kg: 0.9,
    created_at: '2026-09-01T10:00:00Z'
  },

  // 8. PEUGEOT - POLEN FİLTRESİ
  {
    id: 'prod-peugeot-polen-sardes',
    title: 'Sardes Karbonlu Polen Filtresi (Peugeot 306)',
    slug: 'sardes-karbonlu-polen-filtresi-peugeot-306-002484',
    category: 'İç Donanım & Periyodik Bakım',
    category_slug: 'ic-donanim-bakim',
    brand: 'Peugeot',
    part_number: '0024.84SARDES',
    oem_reference_number: '0024.84',
    is_original: false,
    part_quality: 'aftermarket',
    vehicle_compatibility: [
      { brand: 'Peugeot', model: '306', years: '1993 - 2002' }
    ],
    price: 320,
    discount_price: 280,
    stock: 2,
    image_url: '/images/products/polen-filtresi.jpg',
    description: 'Peugeot 306 araçların kabin havalandırması için aktif karbonlu polen filtresi. Dışarıdan gelen egzoz gazı, polen, toz ve kötü kokuları etkin filtreler.',
    technical_description: 'Üretici: Sardes Filter. Kod: SC572. OEM: 0024.84 / 6447.L4. Aktif karbon emdirilmiş filtre kağıdı, kenar sızdırmazlık süngeri.',
    specs: {
      'Üretici': 'Sardes',
      'Üretici Kodu': 'SC572',
      'OEM Kodu': '0024.84 / 6447.L4',
      'Filtre Türü': 'Aktif Karbonlu Polen Filtresi',
      'Gövde': 'Sünger Contalı'
    },
    rating: 4.7,
    reviews_count: 7,
    is_featured: false,
    weight_kg: 0.3,
    created_at: '2026-09-01T10:00:00Z'
  },

  // 9. PEUGEOT / CITROËN - YAĞ SOĞUTUCU EŞANJÖR
  {
    id: 'prod-psa-yag-sogutucu-abrasse',
    title: 'Abrasse Motor Yağ Soğutucu Eşanjör (Partner / Berlingo / 206 1.9D DW8)',
    slug: 'abrasse-yag-sogutucu-esanjor-partner-berlingo-dw8-1103n0',
    category: 'Motor & Aktarma Organları',
    category_slug: 'motor-aktarma',
    brand: 'Peugeot',
    part_number: '1103.N0ABRASSE',
    oem_reference_number: '1103.N0',
    is_original: false,
    part_quality: 'aftermarket',
    vehicle_compatibility: [
      { brand: 'Peugeot', model: 'Partner', years: '1996 - 2008' },
      { brand: 'Peugeot', model: '206', years: '1998 - 2012' },
      { brand: 'Citroën', model: 'Berlingo', years: '1996 - 2008' },
      { brand: 'Citroën', model: 'Xsara', years: '1997 - 2006' }
    ],
    price: 1350,
    discount_price: 1220,
    stock: 1,
    image_url: '/images/products/yag-sogutucu.jpg',
    description: 'PSA Grubu DW8 1.9 Dizel motorlar için alüminyum yağ filtresi kütüğü altı yağ soğutucu radyatörü eşanjörü. Yağ sıcaklığını stabilize eder.',
    technical_description: 'Üretici: Abrasse. Kod: BRS-1103N0-PG. OEM: 1103.N0 / 1103.J2. Basınca dayanıklı lehimli alüminyum petek yapı.',
    specs: {
      'Üretici': 'Abrasse',
      'Üretici Kodu': 'BRS-1103N0-PG',
      'OEM Kodu': '1103.N0 / 1103.J2',
      'Malzeme': 'Alüminyum',
      'Motor Uyumu': 'DW8 / DW8B 1.9 Dizel'
    },
    rating: 4.8,
    reviews_count: 5,
    is_featured: false,
    weight_kg: 0.8,
    created_at: '2026-09-01T10:00:00Z'
  },

  // 10. CITROËN - ÖN FREN BALATASI
  {
    id: 'prod-citroen-on-balata-eurorepar',
    title: 'Eurorepar Ön Fren Balata Takımı 155mm (C4 Picasso / Berlingo / Partner Tepee)',
    slug: 'eurorepar-on-fren-balatasi-c4-picasso-berlingo-1623816280',
    category: 'Fren & Süspansiyon Sistemleri',
    category_slug: 'fren-suspansiyon',
    brand: 'Citroën',
    part_number: '1623816280ERP',
    oem_reference_number: '1623816280',
    is_original: true,
    part_quality: 'original',
    vehicle_compatibility: [
      { brand: 'Citroën', model: 'C4 Picasso', years: '2006 - 2013' },
      { brand: 'Citroën', model: 'Berlingo', years: '2008 - 2018' },
      { brand: 'Peugeot', model: 'Partner', years: '2008 - 2018' },
      { brand: 'Citroën', model: 'C4', years: '2010 - 2020' }
    ],
    price: 1250,
    discount_price: 1150,
    stock: 2,
    image_url: '/images/products/on-fren-balatasi.jpg',
    description: 'Stellantis grubunun resmi onaylı Eurorepar markasından 155mm ön disk fren balata takımı. Sessiz frenleme ve düşük toz formülasyonu.',
    technical_description: 'Üretici: Eurorepar (PSA Orijinal Yedek Parça). Kod: 1682310380 / 1623816280. ECE R90 güvenlik onaylı, 4 parçalı ön aks seti.',
    specs: {
      'Üretici': 'Eurorepar (Stellantis)',
      'Üretici Kodu': '1682310380',
      'OEM Kodu': '1623816280 / 4254.A8',
      'Genişlik': '155 mm',
      'Aks': 'Ön Aks Takımı (4 Parça)'
    },
    rating: 4.9,
    reviews_count: 11,
    is_featured: true,
    weight_kg: 1.8,
    created_at: '2026-09-01T10:00:00Z'
  },

  // 11. CITROËN - ARKA GAZLI AMORTİSÖR
  {
    id: 'prod-citroen-arka-amortisor-dj',
    title: 'DJPARTS Arka Gazlı Amortisör (Citroën C4 Aircross / Mitsubishi ASX)',
    slug: 'djparts-arka-gazli-amortisor-c4-aircross-1607498680',
    category: 'Fren & Süspansiyon Sistemleri',
    category_slug: 'fren-suspansiyon',
    brand: 'Citroën',
    part_number: '1607498680DJ',
    oem_reference_number: '1607498680',
    is_original: false,
    part_quality: 'aftermarket',
    vehicle_compatibility: [
      { brand: 'Citroën', model: 'C4 Aircross', years: '2012 - 2017' },
      { brand: 'Peugeot', model: '4008', years: '2012 - 2017' }
    ],
    price: 1850,
    discount_price: 1690,
    stock: 2,
    image_url: '/images/products/gazli-amortisor.jpg',
    description: 'Citroën C4 Aircross SUV araçlar için geliştirilmiş çift borulu gazlı arka süspansiyon amortisörü. Konforlu ve dengeli yol tutuş sağlar.',
    technical_description: 'Üretici: DJPARTS. Parça No: DS3810GT. OEM: 1607498680. Gazlı çift boru sistemi, yüksek mukavemetli montaj burçları.',
    specs: {
      'Üretici': 'DJPARTS',
      'Üretici Kodu': 'DS3810GT',
      'OEM Kodu': '1607498680',
      'Amortisör Tipi': 'Gazlı Çift Boru',
      'Aks': 'Arka Sağ / Sol'
    },
    rating: 4.8,
    reviews_count: 3,
    is_featured: false,
    weight_kg: 2.2,
    created_at: '2026-09-01T10:00:00Z'
  },

  // 12. CITROËN - YEDEK SU DEPO HORTUMU
  {
    id: 'prod-citroen-su-hortum-wintech',
    title: 'Wintech Termostat Yedek Su Depo Hortumu (Citroën C2 / C3 / Peugeot 1007 1.4 HDi)',
    slug: 'wintech-yedek-su-depo-hortumu-c2-c3-1-4-hdi-1307yp',
    category: 'Motor & Aktarma Organları',
    category_slug: 'motor-aktarma',
    brand: 'Citroën',
    part_number: '1307.YPWIN',
    oem_reference_number: '1307.YP',
    is_original: false,
    part_quality: 'aftermarket',
    vehicle_compatibility: [
      { brand: 'Citroën', model: 'C3', years: '2002 - 2016' },
      { brand: 'Citroën', model: 'C2', years: '2003 - 2009' },
      { brand: 'Peugeot', model: '206', years: '2001 - 2010' }
    ],
    price: 480,
    discount_price: 430,
    stock: 1,
    image_url: '/images/products/su-hortumu.jpg',
    description: 'Citroën C2 ve C3 1.4 HDi dizel araçlarda genleşme su deposu ile termostat gövdesi arasındaki özel formlu soğutma suyu tahliye hortumu.',
    technical_description: 'Üretici: Wintech. Kod: WIN0500313. OEM: 1307.YP. Takviyeli kauçuk ve çabuk kilitli plastik rekor soketleri mevcuttur.',
    specs: {
      'Üretici': 'Wintech',
      'Üretici Kodu': 'WIN0500313',
      'OEM Kodu': '1307.YP',
      'Malzeme': 'Kord Bez Takviyeli Kauçuk',
      'Motor': '1.4 HDi DV4TD'
    },
    rating: 4.7,
    reviews_count: 4,
    is_featured: false,
    weight_kg: 0.3,
    created_at: '2026-09-01T10:00:00Z'
  },

  // 13. DS AUTOMOBILES - BOSCH ÖN FREN BALATASI
  {
    id: 'prod-ds-on-balata-bosch',
    title: 'Bosch Ön Fren Balata Takımı 136mm (DS 3 / Peugeot 208 / Corsa F / C3)',
    slug: 'bosch-on-fren-balatasi-ds3-208-corsa-f-1607083180',
    category: 'Fren & Süspansiyon Sistemleri',
    category_slug: 'fren-suspansiyon',
    brand: 'DS Automobiles',
    part_number: '1607083180BOSCH',
    oem_reference_number: '1607083180',
    is_original: true,
    part_quality: 'oem',
    vehicle_compatibility: [
      { brand: 'DS Automobiles', model: 'DS 3', years: '2010 - 2019' },
      { brand: 'Peugeot', model: '208', years: '2012 - 2024' },
      { brand: 'Opel', model: 'Corsa F', years: '2019+' },
      { brand: 'Citroën', model: 'C3', years: '2009 - 2024' }
    ],
    price: 1550,
    discount_price: 1420,
    stock: 1,
    image_url: '/images/products/bosch-balata.jpg',
    description: 'Bosch kalitesiyle üretilmiş ön disk fren balata seti (136 mm). DS 3, Peugeot 208 ve Opel Corsa F araçlar için yüksek ısı dayanımı ve hassas pedal tepkisi sağlar.',
    technical_description: 'Üretici: Robert Bosch GmbH. Kod: 0986494564. OEM Referans: 1607083180 / 4254.C0. ECE-R90 onaylı, aşınma sensörü uyumlu, 4 adet ön balata.',
    specs: {
      'Üretici': 'Bosch',
      'Üretici Kodu': '0986494564',
      'OEM Kodu': '1607083180 / 4254.C0',
      'Genişlik': '136.8 mm',
      'Kalınlık': '19 mm',
      'Menşei': 'Almanya'
    },
    rating: 5.0,
    reviews_count: 19,
    is_featured: true,
    weight_kg: 1.6,
    created_at: '2026-09-01T10:00:00Z'
  },

  // 14. DS AUTOMOBILES - BOSCH ARKA FREN DİSKİ
  {
    id: 'prod-ds-arka-disk-bosch',
    title: 'Bosch Arka Fren Diski 268mm (DS 4 / DS 7 / Peugeot 3008 II / Grandland X)',
    slug: 'bosch-arka-fren-diski-268mm-ds4-ds7-3008-1609582880',
    category: 'Fren & Süspansiyon Sistemleri',
    category_slug: 'fren-suspansiyon',
    brand: 'DS Automobiles',
    part_number: '1609582880BOSCH',
    oem_reference_number: '1609582880',
    is_original: true,
    part_quality: 'oem',
    vehicle_compatibility: [
      { brand: 'DS Automobiles', model: 'DS 4 I', years: '2011 - 2018' },
      { brand: 'DS Automobiles', model: 'DS 7 Crossback', years: '2018+' },
      { brand: 'Peugeot', model: '3008', years: '2016+' },
      { brand: 'Opel', model: 'Grandland / X', years: '2017+' }
    ],
    price: 1850,
    discount_price: 1720,
    stock: 4,
    image_url: '/images/products/fren-diski.jpg',
    description: 'Bosch yüksek karbonlu arka disk fren rotoru (268 mm, 5 bijon). DS 4, DS 7 ve Peugeot 3008 için titreşimsiz, güvenli ve uzun ömürlü frenleme.',
    technical_description: 'Üretici: Bosch. Ürün Kodu: 0986479C24. OEM: 1609582880. Çap: 268 mm, Kalınlık: 12 mm, Bijon Sayısı: 5 Delik. Yüksek karbonlu alaşım döküm.',
    specs: {
      'Üretici': 'Bosch',
      'Üretici Kodu': '0986479C24',
      'OEM Kodu': '1609582880',
      'Dış Çap': '268 mm',
      'Bijon Delik Sayısı': '5',
      'Disk Tipi': 'Dolu / Yüksek Karbonlu'
    },
    rating: 4.9,
    reviews_count: 12,
    is_featured: true,
    weight_kg: 4.8,
    created_at: '2026-09-01T10:00:00Z'
  },

  // 15. DİĞER MARKALAR (VOLKSWAGEN / VAG) - HENGST YAĞ FİLTRESİ
  {
    id: 'prod-diger-yag-filtresi-hengst',
    title: 'Hengst Metal Vidalı Yağ Filtresi (VW Golf VII / Polo / Audi A3 1.2 / 1.4 TSI)',
    slug: 'hengst-yag-filtresi-golf-polo-a3-tsi-04e115561h',
    category: 'İç Donanım & Periyodik Bakım',
    category_slug: 'ic-donanim-bakim',
    brand: 'Diğer Markalar',
    part_number: '04E115561H-HENGST',
    oem_reference_number: '04E115561H',
    is_original: true,
    part_quality: 'oem',
    vehicle_compatibility: [
      { brand: 'Diğer Markalar', model: 'Volkswagen (Golf / Polo / Passat / Caddy)', years: '2012+' },
      { brand: 'Diğer Markalar', model: 'Audi / Seat / Skoda (TSI & TDI)', years: '2012+' }
    ],
    price: 420,
    discount_price: 385,
    stock: 1,
    image_url: '/images/products/yag-filtresi.jpg',
    description: 'Alman Hengst üretimi yüksek verimli sac gövdeli motor yağ filtresi. VAG grubu 1.0, 1.2 ve 1.4 TSI / TFSI yeni nesil motorlarla tam uyumludur.',
    technical_description: 'Üretici: Hengst Filtration (Almanya). Kod: H317W01. OEM: 04E115561H / 04E115561B. Geri akış önleme çekvalfi ve yüksek partikül tutma kapasitesi.',
    specs: {
      'Üretici': 'Hengst',
      'Üretici Kodu': 'H317W01',
      'OEM Kodu': '04E115561H',
      'Filtre Tipi': 'Vidalı Sac Kutu Filtre',
      'Menşei': 'Almanya'
    },
    rating: 5.0,
    reviews_count: 8,
    is_featured: false,
    weight_kg: 0.35,
    created_at: '2026-09-01T10:00:00Z'
  },

  // 16. DİĞER MARKALAR (FIAT / DUCATO) - KRAFTVOLL HAVA FİLTRESİ
  {
    id: 'prod-diger-hava-filtresi-kraftvoll',
    title: 'Kraftvoll Motor Hava Filtresi (Fiat Ducato III / Boxer / Jumper 2.2 HDi / 2.3 JTD)',
    slug: 'kraftvoll-hava-filtresi-ducato-boxer-jumper-1444sq',
    category: 'İç Donanım & Periyodik Bakım',
    category_slug: 'ic-donanim-bakim',
    brand: 'Diğer Markalar',
    part_number: '1444.SQKRAFTVOLL',
    oem_reference_number: '1444.SQ',
    is_original: false,
    part_quality: 'aftermarket',
    vehicle_compatibility: [
      { brand: 'Diğer Markalar', model: 'Fiat (Ducato / Doblo / Fiorino)', years: '2006+' },
      { brand: 'Peugeot', model: 'Boxer', years: '2006+' },
      { brand: 'Citroën', model: 'Jumper', years: '2006+' }
    ],
    price: 460,
    discount_price: 410,
    stock: 2,
    image_url: '/images/products/hava-filtresi.jpg',
    description: 'Fiat Ducato III, Peugeot Boxer ve Citroën Jumper ticari araçlar için silindirik yüksek hava debili motor emme hava filtresi.',
    technical_description: 'Üretici: Kraftvoll. Kod: 06010014. OEM: 1444.SQ / 1359643080. Yüksek mikron filtre kağıdı, poliüretan sızdırmaz conta.',
    specs: {
      'Üretici': 'Kraftvoll',
      'Üretici Kodu': '06010014',
      'OEM Kodu': '1444.SQ / 1359643080',
      'Uyumlu Araç': 'Ducato III / Boxer III 2.2 & 2.3 Dizel',
      'Filtre Tipi': 'Silindirik Hava Filtresi'
    },
    rating: 4.7,
    reviews_count: 6,
    is_featured: false,
    weight_kg: 0.6,
    created_at: '2026-09-01T10:00:00Z'
  }
];
