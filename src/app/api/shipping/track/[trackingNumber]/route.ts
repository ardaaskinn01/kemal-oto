import { NextRequest, NextResponse } from 'next/server';
import { trackDHLShipment } from '../../../../lib/shipping/dhlService';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ trackingNumber: string }> }
) {
  try {
    const { trackingNumber } = await params;

    if (!trackingNumber) {
      return NextResponse.json(
        { success: false, message: 'Kargo takip numarası gereklidir.' },
        { status: 400 }
      );
    }

    const trackingData = await trackDHLShipment(trackingNumber);

    return NextResponse.json(
      { success: true, tracking: trackingData },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || 'Kargo takip sorgulanamadı.' },
      { status: 500 }
    );
  }
}
