import { NextRequest, NextResponse } from 'next/server';
import { iyzicoService } from '@/app/lib/services/iyzicoService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { order, customer, items, totalAmount } = body;

    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const callbackUrl = `${origin}/api/payment/callback`;

    const orderData = {
      id: order?.id || `ORD-${Date.now()}`,
      total_amount: totalAmount || order?.total_amount || 100,
      user_id: customer?.id || 'guest',
      first_name: customer?.firstName || 'Kemal',
      last_name: customer?.lastName || 'Müşteri',
      phone: customer?.phone || '+905422924492',
      email: customer?.email || 'destek@kemaloto.com',
      shipping_address: {
        address: customer?.address || 'MUTLUBAŞLAR PLAZA, Bornova',
        city: customer?.city || 'İzmir',
        country: 'Turkey',
        zip_code: customer?.zipCode || '35060',
      },
      items: items || [
        {
          id: 'item-1',
          title: 'Oto Yedek Parça',
          category: 'Yedek Parça',
          price: totalAmount || 100,
        },
      ],
    };

    const result = await iyzicoService.initializeCheckoutForm(orderData, callbackUrl);

    if (result.status === 'success') {
      return NextResponse.json({
        success: true,
        token: result.token,
        checkoutFormContent: result.checkoutFormContent,
        paymentPageUrl: result.paymentPageUrl,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          errorMessage: result.errorMessage || 'iyzico formu başlatılamadı.',
          errorCode: result.errorCode,
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('iyzico initialize error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Ödeme başlatılırken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
