import crypto from 'crypto';

function formatPrice(price: any): string {
  if ((typeof price !== 'number' && typeof price !== 'string') || !isFinite(Number(price))) {
    return String(price);
  }
  const resultPrice = parseFloat(String(price)).toString();
  if (!resultPrice.includes('.')) {
    return `${resultPrice}.0`;
  }
  return resultPrice;
}

function generateRandomString(size = 8): string {
  return `${process.hrtime()[0]}${Math.random().toString().slice(2, 2 + size)}`;
}

function generateAuthorizationHeaderV2(
  apiKey: string,
  secretKey: string,
  path: string,
  body: any,
  randomString: string
): string {
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(randomString + path + JSON.stringify(body))
    .digest('hex');

  const authorizationParams = [
    `apiKey:${apiKey}`,
    `randomKey:${randomString}`,
    `signature:${signature}`,
  ];

  return `IYZWSv2 ${Buffer.from(authorizationParams.join('&')).toString('base64')}`;
}

export class IyzicoService {
  private get baseUrl(): string {
    const raw = process.env.IYZICO_BASE_URL || 'https://api.iyzipay.com';
    return raw.replace(/\/+$/, '');
  }

  private get apiKey(): string {
    return process.env.IYZICO_API_KEY || '';
  }

  private get secretKey(): string {
    return process.env.IYZICO_SECRET_KEY || '';
  }

  /**
   * İyzico REST API çağrısı yapar (Next.js serverless uyumlu, harici kütüphane bağımsız)
   */
  private async postRequest(path: string, payload: any): Promise<any> {
    const randomKey = generateRandomString(8);
    const authHeader = generateAuthorizationHeaderV2(
      this.apiKey,
      this.secretKey,
      path,
      payload,
      randomKey
    );

    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-iyzi-rnd': randomKey,
        'x-iyzi-client-version': 'iyzipay-node-2.0.69',
        Authorization: authHeader,
      },
      body: JSON.stringify(payload),
    });

    return await res.json();
  }

  /**
   * İyzico Checkout Formunu Başlatır (3D Secure Destekli)
   */
  async initializeCheckoutForm(order: any, callbackUrl: string): Promise<any> {
    const priceFormatted = formatPrice(order.total_amount || 100);

    const requestPayload = {
      locale: 'tr',
      conversationId: order.id || `conv-${Date.now()}`,
      price: priceFormatted,
      paidPrice: priceFormatted,
      currency: 'TRY',
      basketId: order.id || `bsk-${Date.now()}`,
      paymentGroup: 'PRODUCT',
      callbackUrl: callbackUrl,
      enabledInstallments: [2, 3, 6, 9, 12],
      buyer: {
        id: order.user_id || 'guest-user',
        name: order.contact_info?.first_name || order.first_name || 'Müşteri',
        surname: order.contact_info?.last_name || order.last_name || 'Alıcı',
        gsmNumber: order.contact_info?.phone || order.phone || '+905422924492',
        email: order.contact_info?.email || order.email || 'info@onlinehizliparca.com',
        identityNumber: order.tax_number || '11111111111',
        lastLoginDate: '2026-01-01 12:00:00',
        registrationAddress: order.shipping_address?.address || 'Bornova',
        registrationDate: '2026-01-01 12:00:00',
        ip: order.ip || '85.85.85.85',
        city: order.shipping_address?.city || 'İzmir',
        country: order.shipping_address?.country || 'Turkey',
        zipCode: order.shipping_address?.zip_code || '35060',
      },
      shippingAddress: {
        contactName:
          order.invoice_type === 'corporate' && order.company_name
            ? order.company_name
            : `${order.contact_info?.first_name || order.first_name || 'Müşteri'} ${order.contact_info?.last_name || order.last_name || 'Alıcı'}`,
        city: order.shipping_address?.city || 'İzmir',
        country: order.shipping_address?.country || 'Turkey',
        address: order.shipping_address?.address || 'Bornova / İzmir',
        zipCode: order.shipping_address?.zip_code || '35060',
      },
      billingAddress: {
        contactName:
          order.invoice_type === 'corporate' && order.company_name
            ? `${order.company_name} (V.D: ${order.tax_office || '-'} V.No: ${order.tax_number || '-'})`
            : `${order.contact_info?.first_name || order.first_name || 'Müşteri'} ${order.contact_info?.last_name || order.last_name || 'Alıcı'}`,
        city: order.shipping_address?.city || 'İzmir',
        country: order.shipping_address?.country || 'Turkey',
        address: order.shipping_address?.address || 'Bornova / İzmir',
        zipCode: order.shipping_address?.zip_code || '35060',
      },
      basketItems: order.items?.map((item: any) => ({
        id: item.product_id || item.id || 'item-1',
        name: item.title || item.product_name || 'Oto Yedek Parça',
        category1: item.category || 'Otomotiv',
        itemType: 'PHYSICAL',
        price: formatPrice(item.price || 100),
      })) || [
        {
          id: 'item-sample',
          name: 'Otomotiv Parçası',
          category1: 'Yedek Parça',
          itemType: 'PHYSICAL',
          price: '100.0',
        },
      ],
    };

    return await this.postRequest('/payment/iyzipos/checkoutform/initialize/auth/ecom', requestPayload);
  }

  /**
   * İyzico Ödeme Sonucunu Token ile Sorgular
   */
  async retrieveCheckoutFormResult(token: string): Promise<any> {
    const requestPayload = {
      locale: 'tr',
      token: token,
    };

    return await this.postRequest('/payment/iyzipos/checkoutform/auth/ecom/detail', requestPayload);
  }
}

export const iyzicoService = new IyzicoService();
