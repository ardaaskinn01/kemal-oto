import Iyzipay from 'iyzipay';

export class IyzicoService {
  private iyzipay: any;

  constructor() {
    this.iyzipay = new Iyzipay({
      apiKey: process.env.IYZICO_API_KEY || 'sandbox-key',
      secretKey: process.env.IYZICO_SECRET_KEY || 'sandbox-secret',
      uri: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com',
    });
  }

  /**
   * İyzico Checkout Formunu Başlatır (3D Secure Destekli)
   */
  async initializeCheckoutForm(order: any, callbackUrl: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: order.id || 'conv-' + Date.now(),
        price: order.total_amount ? order.total_amount.toString() : '100',
        paidPrice: order.total_amount ? order.total_amount.toString() : '100',
        currency: Iyzipay.CURRENCY.TRY,
        basketId: order.id || 'bsk-' + Date.now(),
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        callbackUrl: callbackUrl,
        enabledInstallments: [2, 3, 6, 9, 12],
        buyer: {
          id: order.user_id || 'guest-user',
          name: order.contact_info?.first_name || order.first_name || 'Kemal',
          surname: order.contact_info?.last_name || order.last_name || 'Müşteri',
          gsmNumber: order.contact_info?.phone || order.phone || '+905550000000',
          email: order.contact_info?.email || order.email || 'musteri@kemaloto.com',
          identityNumber: '11111111111',
          lastLoginDate: '2026-01-01 12:00:00',
          registrationAddress: order.shipping_address?.address || 'İstanbul Maslak',
          registrationDate: '2026-01-01 12:00:00',
          ip: order.ip || '85.85.85.85',
          city: order.shipping_address?.city || 'Istanbul',
          country: order.shipping_address?.country || 'Turkey',
          zipCode: order.shipping_address?.zip_code || '34398',
        },
        shippingAddress: {
          contactName: `${order.contact_info?.first_name || 'Kemal'} ${order.contact_info?.last_name || 'Müşteri'}`,
          city: order.shipping_address?.city || 'Istanbul',
          country: order.shipping_address?.country || 'Turkey',
          address: order.shipping_address?.address || 'Oto Sanayi Maslak No:42',
          zipCode: order.shipping_address?.zip_code || '34398',
        },
        billingAddress: {
          contactName: `${order.contact_info?.first_name || 'Kemal'} ${order.contact_info?.last_name || 'Müşteri'}`,
          city: order.shipping_address?.city || 'Istanbul',
          country: order.shipping_address?.country || 'Turkey',
          address: order.shipping_address?.address || 'Oto Sanayi Maslak No:42',
          zipCode: order.shipping_address?.zip_code || '34398',
        },
        basketItems: order.items?.map((item: any) => ({
          id: item.product_id || item.id || 'item-1',
          name: item.title || item.product_name || 'Oto Yedek Parça',
          category1: item.category || 'Otomotiv',
          itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
          price: (item.price || 100).toString(),
        })) || [
          {
            id: 'item-sample',
            name: 'Otomotiv Parçası',
            category1: 'Yedek Parça',
            itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
            price: '100',
          },
        ],
      };

      this.iyzipay.checkoutFormInitialize.create(request, (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * İyzico Ödeme Sonucunu Token ile Sorgular
   */
  async retrieveCheckoutFormResult(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.iyzipay.checkoutForm.retrieve(
        {
          locale: Iyzipay.LOCALE.TR,
          token: token,
        },
        (err: any, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }
}

export const iyzicoService = new IyzicoService();
