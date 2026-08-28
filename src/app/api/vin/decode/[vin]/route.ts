import { NextRequest, NextResponse } from 'next/server';
import { decodeVin } from '../../../../lib/services/vinService';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ vin: string }> }
) {
  try {
    const { vin } = await params;

    if (!vin) {
      return NextResponse.json(
        { success: false, error: 'Şasi numarası (VIN) parametresi zorunludur.' },
        { status: 400 }
      );
    }

    const decodeResult = await decodeVin(vin);

    if (!decodeResult.success) {
      return NextResponse.json(decodeResult, { status: 400 });
    }

    return NextResponse.json(decodeResult, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Şasi numarası sorgulanırken beklenmeyen bir hata oluştu.' },
      { status: 500 }
    );
  }
}
