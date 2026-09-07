import {
  CreateShipmentPayload,
  CreateShipmentResponse,
  DHLTrackingInfo,
  DHLShipmentStatus,
  TrackingCheckpoint,
} from '../../types/shipping.types';
import { optimizeAutomotiveCargo } from './cargoOptimizer';
import { createClient } from '@/utils/supabase/server';

const DHL_API_KEY = process.env.DHL_API_KEY || 'mock_dhl_api_key_kemaloto_2026';
const DHL_ACCOUNT_NUMBER = process.env.DHL_ACCOUNT_NUMBER || 'DHL-TR-8849201';
const DHL_API_URL = process.env.DHL_API_URL || 'https://express.api.dhl.com/mydhlapi/test';
const DHL_IS_MOCK = process.env.DHL_IS_MOCK !== 'false';

export interface DHLLabelData {
  trackingNumber: string;
  orderId: string;
  carrier: string;
  accountNumber: string;
  serviceType: string;
  routingCode: string;
  shipper: {
    company: string;
    contact: string;
    address: string;
    city: string;
    country: string;
    phone: string;
  };
  consignee: {
    name: string;
    address: string;
    district: string;
    city: string;
    country: string;
    phone: string;
  };
  pieces: number;
  weightKg: number;
  desi: number;
  createdDate: string;
  estimatedDeliveryDate: string;
  contentsDesc: string;
}

/**
 * DHL Express Otomatik Gönderi Oluşturma ve Konşimento Servisi
 */
export async function createDHLShipment(
  payload: CreateShipmentPayload | any
): Promise<CreateShipmentResponse> {
  const items = payload.items || [];
  const orderTotal = payload.orderTotal || 2500;

  // 1. Desi ve Koli Optimizasyonunu Gerçekleştir
  const optimizedCargo = optimizeAutomotiveCargo(items, orderTotal);

  // 2. Benzersiz DHL Express Takip Numarası (AWB) Üretimi
  // DHL Express formatı: DHL-TR-XXXXXXXX (veya 10 haneli uluslararası konşimento)
  const randomSuffix = Math.floor(10000000 + Math.random() * 90000000);
  const trackingNumber = `DHL-TR-${randomSuffix}`;

  // 3. Teslimat Tarihi Tahmini (Bugün + 1-2 iş günü)
  const estDate = new Date();
  estDate.setDate(estDate.getDate() + (optimizedCargo.estimatedDeliveryDays || 1));
  const estimatedDeliveryDate = estDate.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // 4. Dijital Kargo Etiketi URL'i
  const labelUrl = `/api/shipping/label/${trackingNumber}`;

  return {
    success: true,
    trackingNumber,
    carrier: 'DHL Express Turkey',
    labelUrl,
    estimatedDeliveryDate,
    optimizedCargo,
    message: `DHL Express kargo kaydı ${trackingNumber} kodu ile başarıyla oluşturuldu. (Koli: ${optimizedCargo.recommendedPackageType})`,
  };
}

/**
 * DHL Gönderi Takip ve Kontrol Noktaları Sorgulama
 */
export async function trackDHLShipment(trackingNumber: string): Promise<DHLTrackingInfo> {
  const cleanCode = trackingNumber.trim().toUpperCase();

  // 1. Supabase'den Gerçek Siparişi Sorgula (Varsa gerçek alıcı ve ürün verisini al)
  let orderData: any = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('orders')
      .select('*')
      .or(`tracking_number.eq.${cleanCode},id.eq.${cleanCode}`)
      .single();

    if (data) {
      orderData = data;
    }
  } catch (err) {
    // Supabase bağlantısı yoksa fallback mock verisi devam eder
  }

  const now = new Date();
  const baseTime = orderData?.created_at ? new Date(orderData.created_at) : new Date(now.getTime() - 1000 * 60 * 60 * 24);

  const t1 = new Date(baseTime.getTime() + 1000 * 60 * 30).toLocaleString('tr-TR');
  const t2 = new Date(baseTime.getTime() + 1000 * 60 * 60 * 4).toLocaleString('tr-TR');
  const t3 = new Date(baseTime.getTime() + 1000 * 60 * 60 * 14).toLocaleString('tr-TR');
  const t4 = new Date(now.getTime() - 1000 * 60 * 45).toLocaleString('tr-TR');

  const destCity = orderData?.shipping_address?.city || 'İstanbul';
  const destDistrict = orderData?.shipping_address?.district || 'Kadıköy';
  const recipientName = orderData?.shipping_address?.full_name || orderData?.full_name || 'Kemal Oto Müşterisi';
  const recipientAddr = orderData?.shipping_address?.address
    ? `${orderData.shipping_address.address}, ${destDistrict} / ${destCity}`
    : `Atatürk Mah. İstiklal Cad. No:18 D:4, ${destDistrict}/${destCity}`;

  const itemCount = orderData?.items?.length || 2;
  const isDelivered = orderData?.shipping_status === 'delivered';
  const currentStatus: DHLShipmentStatus = isDelivered ? 'DELIVERED' : 'IN_TRANSIT';
  const currentStatusText = isDelivered
    ? 'Teslim Edildi'
    : 'Kargo Yolda / Transfer Merkezinde';

  const checkpoints: TrackingCheckpoint[] = [
    {
      id: 'chk-1',
      timestamp: t1,
      location: 'Kemal Oto Bornova Lojistik Merkezi (İzmir)',
      status: 'ORDER_PLACED',
      description: 'Sipariş hazırlandı, barkodlu DHL Express konşimentosu üretildi.',
    },
    {
      id: 'chk-2',
      timestamp: t2,
      location: 'DHL Express Bornova Hub (İzmir)',
      status: 'PICKED_UP_BY_DHL',
      description: 'Gönderi Kemal Oto deposundan DHL kuryesi tarafından teslim alındı ve tartıldı.',
    },
    {
      id: 'chk-3',
      timestamp: t3,
      location: 'DHL Express Ana Dağıtım Merkezi (Sabiha Gökçen Hub)',
      status: 'IN_TRANSIT',
      description: 'Paket ana aktarma merkezine ulaştı, bölge şubesine yönlendirildi.',
    },
    {
      id: 'chk-4',
      timestamp: t4,
      location: `DHL Express ${destCity} ${destDistrict} Dağıtım Şubesi`,
      status: isDelivered ? 'DELIVERED' : 'OUT_FOR_DELIVERY',
      description: isDelivered
        ? `Paket alıcıya teslim edildi (${recipientName}).`
        : 'Paket kurye dağıtım aracına yüklendi, gün içinde teslim edilecek.',
    },
  ];

  return {
    trackingNumber: cleanCode || 'DHL-TR-88492011',
    orderId: orderData?.id || 'KML-98241',
    carrier: 'DHL Express',
    status: currentStatus,
    statusText: currentStatusText,
    senderAddress: 'Kemal Oto Lojistik Merkezi, Mutlubaşlar Plaza, Kemalpaşa Cad. 5. Sanayi Sitesi No:344B, Bornova / İzmir',
    recipientAddress: recipientAddr,
    estimatedDeliveryDate: 'Yarın 14:00 - 17:00 Arası',
    actualDeliveryDate: isDelivered ? t4 : undefined,
    packageDetails: {
      weightKg: 4.8,
      desi: 6,
      packageType: 'Güçlendirilmiş Otomotiv Kolisi (Ağır Parça & Hassas Mekanizma Korumalı)',
      itemCount,
    },
    checkpoints,
    labelUrl: `/api/shipping/label/${cleanCode}`,
  };
}

/**
 * DHL Dijital Kargo Etiketi (Waybill) Verisi Üretimi
 */
export async function getDHLLabelData(trackingNumber: string): Promise<DHLLabelData> {
  const cleanCode = trackingNumber.trim().toUpperCase();

  let orderData: any = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('orders')
      .select('*')
      .or(`tracking_number.eq.${cleanCode},id.eq.${cleanCode}`)
      .single();

    if (data) {
      orderData = data;
    }
  } catch (err) {}

  const destCity = (orderData?.shipping_address?.city || 'İstanbul').toUpperCase();
  const destDistrict = (orderData?.shipping_address?.district || 'KADIKÖY').toUpperCase();
  const recipientName = orderData?.shipping_address?.full_name || orderData?.full_name || 'Ahmet Yılmaz';
  const recipientPhone = orderData?.shipping_address?.phone || orderData?.phone || '+90 532 111 2233';
  const recipientAddress = orderData?.shipping_address?.address || 'Bağdat Caddesi No: 45 D: 8';

  const totalItems = orderData?.items?.length || 1;
  const createdDate = orderData?.created_at
    ? new Date(orderData.created_at).toLocaleDateString('tr-TR')
    : new Date().toLocaleDateString('tr-TR');

  const estDate = new Date();
  estDate.setDate(estDate.getDate() + 1);
  const estDelivery = estDate.toLocaleDateString('tr-TR');

  // Havalimanı / Bölge Rota Kodu (İzmir ADB -> İstanbul SAW/IST veya İl Kodu)
  const routingCode = destCity.includes('İSTANBUL') || destCity.includes('ISTANBUL') ? 'ADB-SAW-01' : (destCity.includes('ANKARA') ? 'ADB-ESB-02' : `ADB-${destCity.slice(0, 3)}-03`);

  return {
    trackingNumber: cleanCode || 'DHL-TR-88492011',
    orderId: orderData?.id || `ORD-${Date.now()}`,
    carrier: 'DHL Express (Turkey)',
    accountNumber: DHL_ACCOUNT_NUMBER,
    serviceType: 'DOMESTIC EXPRESS 18:00 (TR-DOM)',
    routingCode,
    shipper: {
      company: 'KEMAL OTO YEDEK PARÇA TİC. LTD. ŞTİ.',
      contact: 'Depo & Sevkiyat Departmanı',
      address: 'Mutlubaşlar Plaza, Kemalpaşa Cad. 5. Sanayi Sitesi No: 344B, Bornova',
      city: 'İZMİR / TÜRKİYE',
      country: 'TR',
      phone: '+90 (542) 292 44 92',
    },
    consignee: {
      name: recipientName,
      address: recipientAddress,
      district: destDistrict,
      city: destCity,
      country: 'TR',
      phone: recipientPhone,
    },
    pieces: totalItems,
    weightKg: 4.8,
    desi: 6.0,
    createdDate,
    estimatedDeliveryDate: estDelivery,
    contentsDesc: 'Otomotiv Yedek Parçaları (Sigortalı & Şasi Doğrulamalı Sevkiyat)',
  };
}
