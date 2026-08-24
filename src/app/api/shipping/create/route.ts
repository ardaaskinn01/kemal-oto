import { NextRequest, NextResponse } from 'next/server';
import { createDHLShipment } from '../../../lib/shipping/dhlService';
import { CreateShipmentPayload } from '../../../types/shipping.types';

export async function POST(req: NextRequest) {
  try {
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
      { success: false, message: error?.message || 'DHL Kargo oluşturulurken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
