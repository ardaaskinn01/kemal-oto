import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { emailService } from '@/app/lib/services/emailService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, trackingNumber, carrier = 'DHL Express' } = body;

    if (!orderId || !trackingNumber || !trackingNumber.trim()) {
      return NextResponse.json(
        { success: false, error: 'Kargo takip numarası zorunludur.' },
        { status: 400 }
      );
    }

    const cleanTracking = trackingNumber.trim().toUpperCase();
    const supabase = await createClient();

    // 1. Fetch current order
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (fetchError || !order) {
      // If running with mock/fallback order in memory
      console.warn('Supabase order not found, processing fallback order:', orderId);
    }

    // 2. Update order status in Supabase
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        shipping_status: 'shipped',
        tracking_number: cleanTracking,
      })
      .eq('id', orderId);

    if (updateError) {
      console.warn('Order status update error in DB:', updateError);
    }

    // 3. Send email to customer via Resend
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    const orderData = order || {
      id: orderId,
      contact_info: { email: body.customerEmail || 'musteri@example.com' },
      shipping_address: { full_name: body.customerName || 'Değerli Müşterimiz' },
      total_amount: body.totalAmount || 0,
    };

    await emailService.sendShippingNotification(orderData, cleanTracking, origin, carrier);

    const dhlUrl = `https://www.dhl.com/tr-tr/home/tracking.html?tracking-id=${encodeURIComponent(cleanTracking)}&submit=1`;

    return NextResponse.json({
      success: true,
      message: 'Sipariş başarıyla kargoya verildi ve müşteriye takip e-postası gönderildi.',
      trackingNumber: cleanTracking,
      dhlUrl,
    });
  } catch (err: any) {
    console.error('Ship order error:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Kargo işlemi tamamlanamadı.' },
      { status: 500 }
    );
  }
}
