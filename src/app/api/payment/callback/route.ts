import { NextRequest, NextResponse } from 'next/server';
import { iyzicoService } from '@/app/lib/services/iyzicoService';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const token = formData.get('token') as string;

    if (!token) {
      return NextResponse.redirect(new URL('/shop?payment_status=error&message=token_missing', request.url));
    }

    const result = await iyzicoService.retrieveCheckoutFormResult(token);

    if (result.status === 'success' && result.paymentStatus === 'SUCCESS') {
      const orderId = result.basketId || result.conversationId;
      return NextResponse.redirect(
        new URL(`/shop?payment_status=success&order_id=${encodeURIComponent(orderId)}`, request.url),
        303
      );
    } else {
      const errorMsg = encodeURIComponent(result.errorMessage || 'Ödeme tamamlanamadı.');
      return NextResponse.redirect(
        new URL(`/shop?payment_status=failed&message=${errorMsg}`, request.url),
        303
      );
    }
  } catch (error: any) {
    console.error('iyzico callback error:', error);
    return NextResponse.redirect(
      new URL(`/shop?payment_status=error&message=server_error`, request.url),
      303
    );
  }
}
