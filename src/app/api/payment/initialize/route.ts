import { NextRequest, NextResponse } from 'next/server';
import { iyzicoService } from '@/app/lib/services/iyzicoService';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { order, customer, items, totalAmount } = body;

    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'https://www.onlinehizliparca.com';
    const callbackUrl = `${origin}/api/payment/callback`;

    const orderId = order?.id || `ORD-${Date.now()}`;
    const cleanTotal = totalAmount || order?.total_amount || 100;

    const orderData = {
      id: orderId,
      total_amount: cleanTotal,
      user_id: customer?.id || null,
      first_name: customer?.firstName || 'Müşteri',
      last_name: customer?.lastName || 'Alıcı',
      phone: customer?.phone || '+905422924492',
      email: customer?.email || 'info@onlinehizliparca.com',
      invoice_type: customer?.invoiceType || 'individual',
      company_name: customer?.companyName || null,
      tax_office: customer?.taxOffice || null,
      tax_number: customer?.taxNumber || null,
      vin: customer?.vin || order?.vin || null,
      shipping_address: {
        full_name: `${customer?.firstName || 'Müşteri'} ${customer?.lastName || 'Alıcı'}`,
        contact_name: customer?.companyName || `${customer?.firstName || 'Müşteri'} ${customer?.lastName || 'Alıcı'}`,
        phone: customer?.phone || '+905422924492',
        address: customer?.address || 'Bornova / İzmir',
        city: customer?.city || 'İzmir',
        district: customer?.district || 'Bornova',
        country: 'Turkey',
        zip_code: customer?.zipCode || '35060',
      },
      contact_info: {
        first_name: customer?.firstName || 'Müşteri',
        last_name: customer?.lastName || 'Alıcı',
        email: customer?.email || 'info@onlinehizliparca.com',
        phone: customer?.phone || '+905422924492',
      },
      items: items || [
        {
          id: 'item-1',
          title: 'Oto Yedek Parça',
          category: 'Yedek Parça',
          price: cleanTotal,
        },
      ],
    };

    // 1. Supabase'e Sipariş Taslağını Kaydet (Pending)
    try {
      const supabase = await createClient();
      await supabase.from('orders').upsert({
        id: orderId,
        user_id: customer?.id || null,
        total_amount: cleanTotal,
        payment_status: 'pending',
        shipping_status: 'pending',
        vin: customer?.vin || null,
        invoice_type: customer?.invoiceType || 'individual',
        company_name: customer?.companyName || null,
        tax_office: customer?.taxOffice || null,
        tax_number: customer?.taxNumber || null,
        shipping_address: orderData.shipping_address,
        contact_info: orderData.contact_info,
        items: orderData.items,
        created_at: new Date().toISOString(),
      });
    } catch (dbErr) {
      console.warn('Sipariş taslağı DB kaydı uyarısı:', dbErr);
    }

    // 2. iyzico Ödeme Formunu Başlat
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
    console.error('Payment initialization error:', error);
    return NextResponse.json(
      {
        success: false,
        errorMessage: error?.message || 'Ödeme başlatılırken bir hata oluştu.',
      },
      { status: 500 }
    );
  }
}
