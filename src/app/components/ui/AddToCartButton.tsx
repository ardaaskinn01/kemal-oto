'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, CreditCard, Loader2, X, ShieldCheck } from 'lucide-react';
import { Product } from '../../types/database.types';
import { useCart } from '../../contexts/CartContext';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formHtml, setFormHtml] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Simple customer form
  const [customer, setCustomer] = useState({
    firstName: 'Müşteri',
    lastName: 'Alıcı',
    email: 'musteri@onlinehizliparca.com',
    phone: '+905422924492',
    address: 'MUTLUBAŞLAR PLAZA, KEMALPAŞA CAD. NO:344B',
    city: 'İzmir',
    district: 'Bornova',
  });

  const priceToPay = product.discount_price || product.price;

  const handleStartPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setFormHtml(null);

    try {
      const res = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order: {
            id: `ORD-QUICK-${Date.now()}`,
            total_amount: priceToPay,
            vin: null,
          },
          customer,
          totalAmount: priceToPay,
          items: [
            {
              id: product.id,
              title: product.title,
              category: product.category,
              price: priceToPay,
            },
          ],
        }),
      });

      const data = await res.json();

      if (data.success && data.checkoutFormContent) {
        setFormHtml(data.checkoutFormContent);
        // Execute the iyzico script inside the container
        setTimeout(() => {
          const container = document.getElementById('iyzipay-checkout-form');
          if (container) {
            const scripts = container.getElementsByTagName('script');
            for (let i = 0; i < scripts.length; i++) {
              const script = document.createElement('script');
              script.type = 'text/javascript';
              if (scripts[i].src) {
                script.src = scripts[i].src;
              } else {
                script.innerHTML = scripts[i].innerHTML;
              }
              document.body.appendChild(script);
            }
          }
        }, 100);
      } else {
        setErrorMessage(data.errorMessage || 'iyzico formu yüklenemedi. Lütfen API Key ayarlarınızı kontrol edin.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Ödeme servisine bağlanırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs sm:text-sm font-black px-6 py-3.5 rounded-xl shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <CreditCard className="w-4 h-4" />
          <span>Hemen Satın Al</span>
        </button>

        <button
          type="button"
          onClick={() => addToCart(product)}
          className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 transition-all cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Sepete Ekle</span>
        </button>
      </div>

      {/* iyzico Checkout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
              <div className="flex items-center gap-3">
                <div className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-transparent shrink-0">
                  <Image
                    src="/images/iyzico/iyzico_ile_ode_colored_horizontal.svg"
                    alt="iyzico ile Öde"
                    width={110}
                    height={16}
                    unoptimized
                    className="h-4.5 w-auto object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Güvenli Ödeme Portalı
                  </h3>
                  <p className="text-[11px] text-slate-500">256-Bit SSL Korumalı 3D Secure Ödeme</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setFormHtml(null);
                  setErrorMessage(null);
                }}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
              
              {/* Product Summary */}
              <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block truncate max-w-xs">{product.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono">OEM: {product.part_number}</span>
                </div>
                <span className="text-sm font-black text-orange-600 dark:text-orange-400">
                  {priceToPay} TL
                </span>
              </div>

              {errorMessage && (
                <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl text-xs text-red-700 dark:text-red-300">
                  <strong>Ödeme Hatası:</strong> {errorMessage}
                </div>
              )}

              {!formHtml ? (
                <form onSubmit={handleStartPayment} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Ad</label>
                      <input
                        type="text"
                        required
                        value={customer.firstName}
                        onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Soyad</label>
                      <input
                        type="text"
                        required
                        value={customer.lastName}
                        onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">E-Posta</label>
                      <input
                        type="email"
                        required
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Telefon</label>
                      <input
                        type="text"
                        required
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Teslimat Adresi</label>
                    <textarea
                      rows={2}
                      required
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 disabled:opacity-50 cursor-pointer uppercase tracking-wide"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>iyzico Ödeme Ekranı Hazırlanıyor...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Ödemeye Geç ({priceToPay} TL)</span>
                      </>
                    )}
                  </button>

                  {/* iyzico & Card Brands Banner */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-2 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>iyzico ile 256-Bit SSL Korumalı Güvenli Ödeme</span>
                    </div>
                    <div className="block dark:hidden">
                      <Image
                        src="/images/iyzico/logo_band_colored.svg"
                        alt="iyzico ile Öde - Visa, MasterCard, Troy, American Express"
                        width={280}
                        height={22}
                        unoptimized
                        className="h-5 w-auto object-contain"
                      />
                    </div>
                    <div className="hidden dark:block">
                      <Image
                        src="/images/iyzico/logo_band_white.svg"
                        alt="iyzico ile Öde - Visa, MasterCard, Troy, American Express"
                        width={280}
                        height={22}
                        unoptimized
                        className="h-5 w-auto object-contain"
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      Visa, MasterCard, Troy ve Amex ile Peşin / Taksitli Güvenli Ödeme
                    </p>
                  </div>
                </form>
              ) : (
                <div id="iyzipay-checkout-form" className="responsive min-h-[300px]">
                  <div dangerouslySetInnerHTML={{ __html: formHtml }} />
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
