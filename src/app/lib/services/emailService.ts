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
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #94a3b8;">Otomotiv Yedek Parça & Bornova / İzmir Depo</p>
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
              Müşteri Hizmetleri: <strong>0542 292 44 92</strong> | <a href="mailto:info@onlinehizliparca.com" style="color: #ea580c; text-decoration: none;">info@onlinehizliparca.com</a>
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
    const dhlOfficialUrl = `https://www.dhl.com/tr-tr/home/tracking.html?tracking-id=${encodeURIComponent(trackingNumber)}&submit=1`;
    const internalTrackingUrl = `${origin}/orders`;

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

            <h2 style="color: #0f172a; margin-top: 0; font-size: 18px; text-align: center;">Paketiniz DHL Express ile Yola Çıktı</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #334155;">Merhaba <strong>${fullName}</strong>,</p>
            <p style="font-size: 14px; line-height: 1.6; color: #334155;">
              <strong>#${order.id ? order.id.slice(0, 8) : 'KML-98241'}</strong> numaralı siparişiniz depomuzda kontrol edilip özenle paketlendi ve <strong>${carrier}</strong> kuryesine elden teslim edildi.
            </p>

            {/* Direct 1-Click DHL Tracking Card */}
            <div style="background-color: #fff7ed; border: 2px solid #ea580c; border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #9a3412; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
                DHL Express Canlı Kargo Takip Bağlantısı
              </p>
              
              <div style="margin: 16px 0;">
                <a href="${dhlOfficialUrl}" style="background-color: #d40511; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 800; font-size: 15px; display: inline-block; box-shadow: 0 4px 12px rgba(212, 5, 17, 0.25);">
                  📦 Kargomu DHL'de Canlı Takip Et
                </a>
              </div>

              <p style="margin: 10px 0 0 0; font-size: 12px; color: #64748b;">
                Doğrudan Takip Linki: <br/>
                <a href="${dhlOfficialUrl}" style="color: #ea580c; word-break: break-all; font-size: 11px; text-decoration: underline;">
                  ${dhlOfficialUrl}
                </a>
              </p>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px; font-size: 12px; color: #475569; line-height: 1.5; text-align: center;">
              Kargo takip numaranız: <strong style="font-family: monospace; color: #0f172a;">${trackingNumber}</strong> | Dilerseniz sitemizdeki <a href="${internalTrackingUrl}" style="color: #ea580c; font-weight: bold;">Siparişlerim</a> sayfasından da takip edebilirsiniz.
            </div>

            <p style="margin-top: 24px; font-size: 12px; color: #64748b; border-top: 1px solid #f1f5f9; padding-top: 16px; text-align: center;">
              Kemal Oto Müşteri Hizmetleri: <strong>0542 292 44 92</strong> | <a href="mailto:info@onlinehizliparca.com" style="color: #ea580c; text-decoration: none;">info@onlinehizliparca.com</a>
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
