import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || 're_mock_api_key_kemaloto_2026';
const fromEmail = process.env.EMAIL_FROM || 'Kemal Oto <bilgi@kemaloto.com>';

export class EmailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(resendApiKey);
  }

  /**
   * Müşteriye Sipariş Onay E-postası Gönderimi
   */
  async sendOrderConfirmation(order: any) {
    if (!order?.contact_info?.email && !order?.email && !order?.shipping_address?.email) {
      console.warn('Order confirmation email skipped: No email provided.');
      return null;
    }

    const email = order.contact_info?.email || order.email || order.shipping_address?.email;
    const fullName = order.shipping_address?.full_name || order.full_name || 'Değerli Müşterimiz';

    try {
      const htmlContent = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
          <div style="background: #020617; padding: 24px; text-align: center; color: white; border-bottom: 3px solid #ea580c;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">KEMAL <span style="color: #ea580c;">OTO</span></h1>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #94a3b8;">Otomotiv Yedek Parça & Maslak Depo</p>
          </div>

          <div style="padding: 24px;">
            <h2 style="color: #0f172a; margin-top: 0; font-size: 18px;">Siparişiniz Alındı</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #334155;">Merhaba <strong>${fullName}</strong>,</p>
            <p style="font-size: 14px; line-height: 1.6; color: #334155;">Siparişiniz sisteme kaydedildi ve şasi/parça uyumu kontrol edilerek depoda hazırlanmaya başlandı.</p>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">Sipariş Özeti</h3>
              <p style="margin: 6px 0; font-size: 13px;"><strong>Sipariş No:</strong> #${order.id ? order.id.slice(0, 8) : 'KML-98241'}</p>
              <p style="margin: 6px 0; font-size: 13px;"><strong>Toplam Tutar:</strong> <span style="font-weight: bold; color: #ea580c;">${order.total_amount || 0} TRY</span></p>
              ${order.vin ? `<p style="margin: 6px 0; font-size: 13px;"><strong>Şasi Numarası (VIN):</strong> <span style="font-family: monospace; color: #059669; font-weight: bold;">${order.vin}</span></p>` : ''}
              ${order.vehicle_model ? `<p style="margin: 6px 0; font-size: 13px;"><strong>Araç:</strong> ${order.vehicle_model}</p>` : ''}
            </div>

            <div style="background: #fff7ed; border-left: 4px solid #ea580c; padding: 12px; border-radius: 4px; margin: 20px 0; font-size: 13px; color: #9a3412; line-height: 1.5;">
              <strong>Kargo Süreci:</strong> Parçanız depomuzda paketlenip DHL Express kuryesine teslim edildiğinde takip numaranızı içeren bilgilendirme e-postası alacaksınız.
            </div>

            <p style="margin-top: 24px; font-size: 12px; color: #64748b; border-top: 1px solid #f1f5f9; padding-top: 16px;">
              Müşteri Hizmetleri: <strong>0850 300 00 00</strong> | <a href="mailto:destek@kemaloto.com" style="color: #ea580c; text-decoration: none;">destek@kemaloto.com</a>
            </p>
          </div>
        </div>
      `;

      const data = await this.resend.emails.send({
        from: fromEmail,
        to: email,
        subject: `Sipariş Onayı #${order.id ? order.id.slice(0, 8) : 'KML-98241'} - Kemal Oto`,
        html: htmlContent,
      });

      return data;
    } catch (error) {
      console.error('Failed to send order confirmation email:', error);
      return null;
    }
  }

  /**
   * Müşteriye DHL Kargo Takip Bildirimi Gönderimi (Manuel Takip Kodu Girişinde Çalışır)
   */
  async sendShippingNotification(
    order: any, 
    trackingNumber: string, 
    origin = 'https://kemaloto.com', 
    carrier = 'DHL Express'
  ) {
    const email = order.contact_info?.email || order.email || order.shipping_address?.email;
    if (!email) {
      console.warn('Shipping notification skipped: No customer email found.');
      return null;
    }

    const fullName = order.shipping_address?.full_name || order.full_name || 'Değerli Müşterimiz';
    const dhlOfficialUrl = `https://www.dhl.com/tr-tr/home/tracking/tracking-express.html?submit=1&tracking-id=${encodeURIComponent(trackingNumber)}`;
    const internalTrackingUrl = `${origin}/tracking?code=${encodeURIComponent(trackingNumber)}`;

    try {
      const htmlContent = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
          <div style="background: #020617; padding: 24px; text-align: center; color: white; border-bottom: 3px solid #ea580c;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">KEMAL <span style="color: #ea580c;">OTO</span></h1>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #94a3b8;">Sipariş Kargo & Gönderi Bildirimi</p>
          </div>

          <div style="padding: 24px;">
            <div style="text-align: center; margin-bottom: 16px;">
              <span style="background-color: #ecfdf5; color: #059669; font-weight: 700; font-size: 12px; padding: 4px 12px; border-radius: 6px; border: 1px solid #a7f3d0; text-transform: uppercase;">
                Siparişiniz Kargoya Verildi
              </span>
            </div>

            <h2 style="color: #0f172a; margin-top: 0; font-size: 18px; text-align: center;">Paketiniz DHL Express ile Sevk Edildi</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #334155;">Merhaba <strong>${fullName}</strong>,</p>
            <p style="font-size: 14px; line-height: 1.6; color: #334155;">
              <strong>#${order.id ? order.id.slice(0, 8) : 'KML-98241'}</strong> numaralı siparişiniz paketlendi ve <strong>${carrier}</strong> kuryesine elden teslim edildi.
            </p>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 18px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold;">Kargo Takip Numarası</p>
              <p style="margin: 0; font-size: 20px; font-family: monospace; font-weight: 800; color: #ea580c; letter-spacing: 1px;">
                ${trackingNumber}
              </p>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #059669; font-weight: 600;">Taşıyıcı: ${carrier}</p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px; margin: 24px 0; text-align: center;">
              <a href="${dhlOfficialUrl}" style="background: #d40511; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 13px; display: block;">
                DHL Resmi Sitesinde Takip Et
              </a>

              <a href="${internalTrackingUrl}" style="background: #020617; color: #ffffff !important; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 12px; display: block; margin-top: 6px;">
                Kemal Oto Takip Panelinde Görüntüle
              </a>
            </div>

            <div style="background: #f1f5f9; padding: 10px; border-radius: 6px; font-size: 12px; color: #475569; line-height: 1.5;">
              Kargo durumunuz kurye aktarma merkezine ulaştığında birkaç saat içerisinde DHL sisteminde güncellenecektir.
            </div>

            <p style="margin-top: 24px; font-size: 12px; color: #64748b; border-top: 1px solid #f1f5f9; padding-top: 16px; text-align: center;">
              Kemal Oto Müşteri Hizmetleri: <strong>0850 300 00 00</strong> | <a href="mailto:destek@kemaloto.com" style="color: #ea580c; text-decoration: none;">destek@kemaloto.com</a>
            </p>
          </div>
        </div>
      `;

      const data = await this.resend.emails.send({
        from: fromEmail,
        to: email,
        subject: `Siparişiniz Kargoya Verildi (Takip No: ${trackingNumber}) - Kemal Oto`,
        html: htmlContent,
      });

      return data;
    } catch (error) {
      console.error('Failed to send shipping notification email:', error);
      return null;
    }
  }

  /**
   * Yöneticiye Yeni Sipariş Bildirimi
   */
  async sendAdminOrderNotification(order: any) {
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'bilgi@kemaloto.com';

    try {
      const data = await this.resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        subject: `Yeni Sipariş Alındı #${order.id ? order.id.slice(0, 8) : 'KML-98241'} - Kemal Oto`,
        html: `<p>Yeni sipariş: <strong>${order.total_amount} TRY</strong>. Müşteri: ${order.shipping_address?.full_name || 'Müşteri'}</p>`,
      });
      return data;
    } catch (error) {
      console.error('Failed to send admin order notification:', error);
      return null;
    }
  }
}

export const emailService = new EmailService();
