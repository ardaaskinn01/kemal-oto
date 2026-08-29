'use client';

import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useShippingSettings } from '../../contexts/ShippingSettingsContext';
import { formatCurrency } from '../../lib/utils';
import { 
  ShoppingBag, 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Truck, 
  CreditCard, 
  ShieldCheck,
  Loader2 
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, subtotal, totalItems, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const { shippingSettings } = useShippingSettings();

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [formHtml, setFormHtml] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Customer checkout info
  const [customer, setCustomer] = useState({
    firstName: 'Kemal',
    lastName: 'Müşteri',
    email: 'musteri@kemaloto.com',
    phone: '+905422924492',
    address: 'MUTLUBAŞLAR PLAZA, KEMALPAŞA CAD. NO:344B',
    city: 'İzmir',
    district: 'Bornova',
  });

  const isFreeShipping = subtotal >= shippingSettings.freeThreshold;
  const shippingFee = cart.length === 0 ? 0 : isFreeShipping ? 0 : shippingSettings.cost;
  const grandTotal = subtotal + shippingFee;
  const amountToFreeShipping = Math.max(0, shippingSettings.freeThreshold - subtotal);

  if (!isCartOpen) return null;

  const handleStartCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingPayment(true);
    setErrorMessage(null);
    setFormHtml(null);

    try {
      const res = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order: {
            id: `ORD-${Date.now()}`,
            total_amount: grandTotal,
          },
          customer,
          totalAmount: grandTotal,
          items: cart.map((item) => ({
            id: item.product.id,
            title: item.product.title,
            category: item.product.category,
            price: item.product.discount_price || item.product.price,
          })),
        }),
      });

      const data = await res.json();

      if (data.success && data.checkoutFormContent) {
        setFormHtml(data.checkoutFormContent);
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
      setLoadingPayment(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Alışveriş Sepetim</h3>
                <p className="text-xs text-slate-500">{totalItems} adet ürün</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="p-3.5 bg-orange-50 dark:bg-orange-950/30 border-b border-orange-200 dark:border-orange-500/20 text-xs">
            <div className="flex items-center gap-2 text-orange-800 dark:text-orange-300 font-semibold mb-1.5">
              <Truck className="w-4 h-4 shrink-0 text-orange-600" />
              {isFreeShipping ? (
                <span>Tebrikler! Siparişinizde <strong>Kargo Ücretsiz (DHL Express)</strong></span>
              ) : (
                <span>Ücretsiz kargo için <strong>{formatCurrency(amountToFreeShipping)}</strong> daha ürün ekleyin</span>
              )}
            </div>
            <div className="w-full bg-orange-200 dark:bg-orange-950 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-orange-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / shippingSettings.freeThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="p-4 sm:p-5 overflow-y-auto flex-1 divide-y divide-slate-100 dark:divide-slate-800/80">
            {cart.length > 0 ? (
              cart.map((item) => {
                const itemPrice = item.product.discount_price || item.product.price;
                return (
                  <div key={item.product.id} className="py-3.5 flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden shrink-0">
                      <Image src={item.product.image_url} alt={item.product.title} fill className="object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {item.product.title}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-mono block">OEM: {item.product.part_number}</span>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-950">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-900 dark:text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                          {formatCurrency(itemPrice * item.quantity)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                      title="Sepetten Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Sepetiniz Boş</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Aracınız için uyumlu orijinal ve muadil parçaları inceleyip sepete ekleyin.
                  </p>
                </div>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="bg-orange-600 text-white font-bold px-4 py-2 rounded-lg text-xs hover:bg-orange-700"
                >
                  Ürünleri İncele
                </Link>
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Ara Toplam:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>DHL Express Kargo:</span>
                  <span>{isFreeShipping ? <strong className="text-emerald-600">Ücretsiz</strong> : formatCurrency(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>Toplam Tutar:</span>
                  <span className="text-orange-600 dark:text-orange-400">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCheckoutModalOpen(true)}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Sepeti Onayla & iyzico ile Öde</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Checkout Modal with iyzico */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    iyzico Güvenli Ödeme
                    <span className="bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                      SANDBOX TEST
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-500">Toplam: {formatCurrency(grandTotal)} (KDV + Kargo Dahil)</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setCheckoutModalOpen(false);
                  setFormHtml(null);
                  setErrorMessage(null);
                }}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
              {errorMessage && (
                <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl text-xs text-red-700 dark:text-red-300">
                  <strong>Ödeme Hatası:</strong> {errorMessage}
                </div>
              )}

              {!formHtml ? (
                <form onSubmit={handleStartCheckout} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Adınız *</label>
                      <input
                        type="text"
                        required
                        value={customer.firstName}
                        onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Soyadınız *</label>
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
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">E-Posta *</label>
                      <input
                        type="email"
                        required
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Telefon *</label>
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
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Teslimat Adresi *</label>
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
                    disabled={loadingPayment}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 disabled:opacity-50 cursor-pointer"
                  >
                    {loadingPayment ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>iyzico Ödeme Ekranı Açılıyor...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Ödeme Formunu Başlat ({formatCurrency(grandTotal)})</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div id="iyzipay-checkout-form" className="responsive min-h-[320px]">
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
