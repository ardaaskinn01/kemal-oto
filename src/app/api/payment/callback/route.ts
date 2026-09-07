import { NextRequest, NextResponse } from 'next/server';
import { iyzicoService } from '@/app/lib/services/iyzicoService';
import { createClient } from '@/utils/supabase/server';
import { emailService } from '@/app/lib/services/emailService';
import { createDHLShipment } from '@/app/lib/shipping/dhlService';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const token = formData.get('token') as string;

    if (!token) {
      return NextResponse.redirect(new URL('/shop?payment_status=error&message=token_missing', request.url));
    }

    const result = await iyzicoService.retrieveCheckoutFormResult(token);
    const orderId = result.basketId || result.conversationId;

    if (result.status === 'success' && result.paymentStatus === 'SUCCESS') {
      try {
        const supabase = await createClient();

        // 1. Otomatik DHL Kargo Konşimentosu ve Takip Numarası Oluştur
        const shipmentResult = await createDHLShipment({
          orderId,
          items: [],
          orderTotal: 2500,
        });

        // 2. Sipariş Durumunu 'paid' ve 'shipped' (DHL ile Kargoya Verildi) Olarak Güncelle
        const { data: updatedOrder, error: updateError } = await supabase
          .from('orders')
          .update({
            payment_status: 'paid',
            payment_method: 'iyzico_credit_card',
            payment_id: result.paymentId || token,
            shipping_status: 'shipped',
            tracking_number: shipmentResult.trackingNumber,
            carrier: 'DHL Express',
          })
          .eq('id', orderId)
          .select('*')
          .single();

        if (updateError) {
          console.error('Sipariş güncellenirken DB hatası:', updateError);
        }

        // 3. Müşteri ve Yöneticiye E-posta Onaylarını ve DHL Kargo Takip Bildirimini Gönder
        const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'https://www.onlinehizliparca.com';
        if (updatedOrder) {
          await emailService.sendOrderConfirmation(updatedOrder);
          await emailService.sendAdminOrderNotification(updatedOrder);
          await emailService.sendShippingNotification(updatedOrder, shipmentResult.trackingNumber, origin, 'DHL Express');
        } else {
          console.warn('Güncellenen sipariş bulunamadı, fallback bildirim atlanıyor:', orderId);
        }
      } catch (dbErr) {
        console.error('Ödeme sonrası sipariş DB güncelleme / kargo / e-posta hatası:', dbErr);
      }

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
