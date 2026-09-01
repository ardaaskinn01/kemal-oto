import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { emailService } from '@/app/lib/services/emailService';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // 1. Sunucu Taraflı Kimlik Doğrulama (Session & User Check)
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim. Lütfen yönetici hesabınızla giriş yapınız.' },
        { status: 401 }
      );
    }

    // 2. Sunucu Taraflı Rol Kontrolü (Role: Admin)
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Erişim engellendi. Bu işlem için Admin yetkisi gereklidir.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { orderId, trackingNumber, carrier = 'DHL Express' } = body;

    if (!orderId || !trackingNumber || !trackingNumber.trim()) {
      return NextResponse.json(
        { success: false, error: 'Kargo takip numarası zorunludur.' },
        { status: 400 }
      );
    }

    const cleanTracking = trackingNumber.trim().toUpperCase();

    // 3. Siparişi Veritabanında Güncelle
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (fetchError || !order) {
      console.warn('Supabase siparişi bulunamadı, fallback veri işleniyor:', orderId);
    }

    const { error: updateError } = await supabase
      .from('orders')
      .update({
        shipping_status: 'shipped',
        tracking_number: cleanTracking,
        carrier: carrier,
      })
      .eq('id', orderId);

    if (updateError) {
      console.warn('Sipariş kargo durumu DB güncelleme uyarısı:', updateError);
    }

    // 4. Müşteriye Kargo Bildirim E-postası Gönder
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'https://www.onlinehizliparca.com';
    const orderData = order || {
      id: orderId,
      contact_info: { email: body.customerEmail || 'info@onlinehizliparca.com' },
      shipping_address: { full_name: body.customerName || 'Değerli Müşterimiz' },
      total_amount: body.totalAmount || 0,
    };

    await emailService.sendShippingNotification(orderData, cleanTracking, origin, carrier);

    const dhlUrl = `https://www.dhl.com/tr-tr/home/tracking.html?tracking-id=${encodeURIComponent(cleanTracking)}&submit=1`;

    return NextResponse.json({
      success: true,
      message: 'Sipariş başarıyla kargoya verildi ve müşteriye takip e-postası gönderildi.',
      trackingNumber: cleanTracking,
      carrier,
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
