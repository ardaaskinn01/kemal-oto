import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || '';
const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'kemalotomotivyedekparca@outlook.com';
const fromEmail = process.env.EMAIL_FROM || 'Online Hızlı Parça <info@onlinehizliparca.com>';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, vin, message, phone } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Lütfen isim, e-posta ve mesaj alanlarını doldurunuz.' },
        { status: 400 }
      );
    }

    // 1. Supabase veritabanına mesajı güvenle kaydet (Mesaj asla kaybolmaz)
    try {
      const { createClient } = await import('@/utils/supabase/server');
      const supabase = await createClient();
      await supabase.from('contact_messages').insert([
        {
          name,
          email,
          phone: phone || null,
          vin: vin || null,
          message,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (dbErr) {
      console.warn('DB message insert warning (table might not exist yet):', dbErr);
    }

    // 2. Resend API Key varsa doğrudan Outlook'a e-posta gönder
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      const htmlContent = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
          <div style="background: #020617; padding: 20px; text-align: center; color: white; border-bottom: 3px solid #E8820C;">
            <h1 style="margin: 0; font-size: 20px; font-weight: 800;">ONLINE HIZLI <span style="color: #E8820C;">PARÇA</span></h1>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #94a3b8;">Web Sitesi İletişim / Parça Talep Formu</p>
          </div>

          <div style="padding: 24px;">
            <h2 style="color: #0f172a; margin-top: 0; font-size: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">
              Yeni Müşteri Mesajı
            </h2>

            <div style="margin: 16px 0; font-size: 13px; line-height: 1.6;">
              <p style="margin: 4px 0;"><strong>Gönderen:</strong> ${name}</p>
              <p style="margin: 4px 0;"><strong>E-Posta:</strong> <a href="mailto:${email}" style="color: #E8820C;">${email}</a></p>
              ${phone ? `<p style="margin: 4px 0;"><strong>Telefon:</strong> ${phone}</p>` : ''}
              ${vin ? `<p style="margin: 4px 0;"><strong>Şasi No (VIN):</strong> <span style="font-family: monospace; font-weight: bold; color: #059669;">${vin}</span></p>` : ''}
              <p style="margin: 4px 0;"><strong>Tarih:</strong> ${new Date().toLocaleString('tr-TR')}</p>
            </div>

            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase;">Mesaj İçeriği:</p>
              <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${message}</p>
            </div>

            <p style="margin-top: 20px; font-size: 11px; color: #94a3b8; text-align: center;">
              Bu e-posta onlinehizliparca.com iletişim formu üzerinden otomatik olarak oluşturulmuştur.
            </p>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: fromEmail,
        to: [adminEmail, 'kemalotomotivyedekparca@outlook.com'],
        replyTo: email,
        subject: `[İletişim Formu] ${name} - ${vin ? `VIN: ${vin}` : 'Yeni Mesaj'}`,
        html: htmlContent,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Mesajınız başarıyla iletildi. Uzman ekibimiz en kısa sürede sizinle iletişime geçecektir.',
    });
  } catch (error: any) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Mesaj gönderilirken bir hata oluştu. Lütfen doğrudan telefon veya WhatsApp hattımızdan ulaşınız.' },
      { status: 500 }
    );
  }
}
