import { NextRequest, NextResponse } from 'next/server';
import { createDHLShipment } from '../../../lib/shipping/dhlService';
import { CreateShipmentPayload } from '../../../types/shipping.types';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Sunucu Taraflı Kimlik Doğrulama
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { success: false, message: 'Yetkisiz erişim. Lütfen giriş yapınız.' },
        { status: 401 }
      );
    }

    const body: CreateShipmentPayload = await req.json();

    if (!body || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Geçersiz sipariş veya boş ürün listesi.' },
        { status: 400 }
      );
    }

    const shipmentResult = await createDHLShipment(body);

    return NextResponse.json(shipmentResult, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Kargo oluşturulurken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
