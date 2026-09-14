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

        // 1. Kargo Entegrasyonu (Test aşamasında devre dışı bırakıldı)
        // const shipmentResult = await createDHLShipment({
        //   orderId,
        //   items: [],
        //   orderTotal: 2500,
        // });

        // 2. Sipariş Durumunu 'paid' Olarak Güncelle (Kargo henüz çıkmadı, 'pending')
        const { data: updatedOrder, error: updateError } = await supabase
          .from('orders')
          .update({
            payment_status: 'paid',
            shipping_status: 'pending',
          })
          .eq('id', orderId)
          .select('*')
          .single();

        if (updateError) {
          console.error('Sipariş güncellenirken DB hatası:', updateError);
        }

        // 3. Müşteri ve Yöneticiye E-posta Onaylarını Gönder (Kargo bildirimi devre dışı)
        if (updatedOrder) {
          await emailService.sendOrderConfirmation(updatedOrder);
          await emailService.sendAdminOrderNotification(updatedOrder);
        } else {
          console.warn('Güncellenen sipariş bulunamadı, fallback bildirim atlanıyor:', orderId);
        }
      } catch (dbErr) {
        console.error('Ödeme sonrası sipariş DB güncelleme / kargo / e-posta hatası:', dbErr);
      }

      // Sipariş Başarılı Sayfasına Yönlendir
      return NextResponse.redirect(
        new URL(`/order-success?order_id=${encodeURIComponent(orderId)}`, request.url),
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
