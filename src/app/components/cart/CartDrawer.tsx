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
  Loader2,
  Building2,
  UserCheck
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

  // Customer checkout info (Individual / Corporate)
  const [customer, setCustomer] = useState({
    invoiceType: 'individual' as 'individual' | 'corporate',
    firstName: '',
    lastName: '',
    companyName: '',
    taxOffice: '',
    taxNumber: '',
    email: '',
    phone: '',
    address: '',
    city: 'İzmir',
    district: 'Bornova',
    vin: '', // Optional VIN input
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

    // Form Validations
    if (customer.invoiceType === 'corporate') {
      if (!customer.companyName.trim()) {
        setErrorMessage('Lütfen şirket / firma unvanını giriniz.');
        setLoadingPayment(false);
        return;
      }
      if (!customer.taxOffice.trim()) {
        setErrorMessage('Lütfen vergi dairesini giriniz.');
        setLoadingPayment(false);
        return;
      }
      if (!customer.taxNumber.trim() || customer.taxNumber.trim().length < 10) {
        setErrorMessage('Lütfen geçerli bir Vergi Numarası (VKN) giriniz.');
        setLoadingPayment(false);
        return;
      }
    }

    try {
      const res = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order: {
            id: `ORD-${Date.now()}`,
            total_amount: grandTotal,
            vin: customer.vin || null,
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
      <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in">
        <div className="w-full max-w-md bg-white dark:bg-[#111318] border-l border-gray-200 dark:border-[#2a2d35] h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-[#2a2d35] flex items-center justify-between bg-gray-50 dark:bg-[#0d0f12]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#E8820C] text-white flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Alışveriş Sepetim</h3>
                <p className="text-xs text-gray-500 font-medium">{totalItems} adet parça</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a1d23]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="p-3 bg-gray-900 text-white text-xs border-b border-gray-800">
            <div className="flex items-center gap-2 text-orange-400 font-bold mb-1">
              <Truck className="w-4 h-4 shrink-0" />
              {isFreeShipping ? (
                <span>Tebrikler! Siparişinizde <strong>Kargo Ücretsiz</strong></span>
              ) : (
                <span>Ücretsiz kargo için <strong>{formatCurrency(amountToFreeShipping)}</strong> daha ürün ekleyin</span>
              )}
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#E8820C] h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / shippingSettings.freeThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Expert Chassis Verification Notice Banner */}
          <div className="p-3 bg-orange-50 dark:bg-orange-950/30 border-b border-orange-100 dark:border-[#2a2d35] flex items-center gap-2.5 text-xs font-semibold text-gray-800 dark:text-gray-200">
            <ShieldCheck className="w-5 h-5 text-[#E8820C] shrink-0" />
            <p className="leading-tight">
              Siparişiniz sevk edilmeden önce <strong className="text-[#E8820C]">uzman ekibimizce şasi kontrolü</strong> yapılacaktır.
            </p>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-gray-100 dark:divide-[#1e2128]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-[#1a1d23] flex items-center justify-center text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-gray-800 dark:text-gray-200">Sepetiniz Boş</h4>
                <p className="text-xs text-gray-400 max-w-xs">
                  Aracınıza uyumlu yedek parçaları kataloğumuzdan seçip sepetinize ekleyebilirsiniz.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 bg-[#E8820C] hover:bg-[#d4740a] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                >
                  Alışverişe Başla
                </Link>
              </div>
            ) : (
              cart.map((item) => {
                const price = item.product.discount_price || item.product.price;
                return (
                  <div key={item.product.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-[#2a2d35] bg-gray-50 dark:bg-[#0d0f12] shrink-0">
                      {item.product.image_url ? (
                        <Image
                          src={item.product.image_url}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <ShoppingBag className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[10px] font-bold text-[#E8820C] uppercase truncate">{item.product.brand}</span>
                        <span className="text-[10px] font-mono text-gray-400 truncate">{item.product.part_number}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-1">
                        {item.product.title}
                      </h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-bold text-gray-900 dark:text-white">
                          {formatCurrency(price * item.quantity)}
                        </span>

                        <div className="flex items-center border border-gray-200 dark:border-[#2a2d35] rounded-md overflow-hidden bg-white dark:bg-[#1a1d23]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-[#252a33] text-gray-600 dark:text-gray-300"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-gray-800 dark:text-gray-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-[#252a33] text-gray-600 dark:text-gray-300"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-200 dark:border-[#2a2d35] bg-gray-50 dark:bg-[#0d0f12] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-500 dark:text-gray-400 font-medium">
                  <span>Ara Toplam:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400 font-medium">
                  <span>DHL Express Kargo:</span>
                  <span>{isFreeShipping ? <strong className="text-emerald-600 dark:text-emerald-400 font-bold">Ücretsiz Kargo</strong> : formatCurrency(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-[#2a2d35]">
                  <span>Toplam Tutar:</span>
                  <span className="text-[#E8820C]">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCheckoutModalOpen(true)}
                className="w-full bg-[#E8820C] hover:bg-[#d4740a] text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer uppercase tracking-wide"
              >
                <CreditCard className="w-4 h-4 stroke-[2.5]" />
                <span>Sepeti Onayla & Ödemeye Geç</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Checkout Modal: Individual / Corporate Invoice System & iyzico 3D Secure */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-[#111318] border border-gray-200 dark:border-[#2a2d35] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-[#2a2d35] flex items-center justify-between bg-gray-900 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E8820C] text-white flex items-center justify-center font-bold">
                  <CreditCard className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    iyzico Güvenli Ödeme
                  </h3>
                  <p className="text-[11px] text-orange-400 font-medium">Toplam: {formatCurrency(grandTotal)} (KDV Dahil)</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setCheckoutModalOpen(false);
                  setFormHtml(null);
                  setErrorMessage(null);
                }}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
              {errorMessage && (
                <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl text-xs font-semibold text-red-700 dark:text-red-300">
                  <strong>Hata:</strong> {errorMessage}
                </div>
              )}

              {!formHtml ? (
                <form onSubmit={handleStartCheckout} className="space-y-4">
                  
                  {/* Fatura Türü Seçimi (Bireysel vs Kurumsal) */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                      Fatura Türü
                    </label>
                    <div className="grid grid-cols-2 gap-2 bg-gray-100 dark:bg-[#1a1d23] p-1 rounded-xl border border-gray-200 dark:border-[#2a2d35]">
                      <button
                        type="button"
                        onClick={() => setCustomer({ ...customer, invoiceType: 'individual' })}
                        className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          customer.invoiceType === 'individual'
                            ? 'bg-white dark:bg-[#0d0f12] text-[#E8820C] shadow-sm border border-gray-200/50 dark:border-[#2a2d35]'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        <UserCheck className="w-4 h-4" />
                        <span>Bireysel Fatura</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCustomer({ ...customer, invoiceType: 'corporate' })}
                        className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          customer.invoiceType === 'corporate'
                            ? 'bg-white dark:bg-[#0d0f12] text-[#E8820C] shadow-sm border border-gray-200/50 dark:border-[#2a2d35]'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        <Building2 className="w-4 h-4" />
                        <span>Kurumsal Fatura</span>
                      </button>
                    </div>
                  </div>

                  {/* Kurumsal Fatura Alanları */}
                  {customer.invoiceType === 'corporate' && (
                    <div className="p-3.5 bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40 rounded-xl space-y-3 animate-in fade-in">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                          Şirket / Firma Unvanı *
                        </label>
                        <input
                          type="text"
                          required
                          value={customer.companyName}
                          onChange={(e) => setCustomer({ ...customer, companyName: e.target.value })}
                          placeholder="Örn: ABC Otomotiv Servis San. ve Tic. Ltd. Şti."
                          className="w-full bg-white dark:bg-[#0d0f12] border border-gray-300 dark:border-[#2a2d35] rounded-lg p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#E8820C]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                            Vergi Dairesi *
                          </label>
                          <input
                            type="text"
                            required
                            value={customer.taxOffice}
                            onChange={(e) => setCustomer({ ...customer, taxOffice: e.target.value })}
                            placeholder="Örn: Bornova V.D."
                            className="w-full bg-white dark:bg-[#0d0f12] border border-gray-300 dark:border-[#2a2d35] rounded-lg p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#E8820C]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                            Vergi No (VKN / 10 Hane) *
                          </label>
                          <input
                            type="text"
                            maxLength={10}
                            required
                            value={customer.taxNumber}
                            onChange={(e) => setCustomer({ ...customer, taxNumber: e.target.value.replace(/\D/g, '') })}
                            placeholder="Örn: 1234567890"
                            className="w-full bg-white dark:bg-[#0d0f12] border border-gray-300 dark:border-[#2a2d35] rounded-lg p-2.5 text-xs font-mono text-gray-900 dark:text-white focus:outline-none focus:border-[#E8820C]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Yetkili / Bireysel Kişi Bilgileri */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        {customer.invoiceType === 'corporate' ? 'Yetkili Adı *' : 'Adınız *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={customer.firstName}
                        onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}
                        className="w-full bg-white dark:bg-[#0d0f12] border border-gray-300 dark:border-[#2a2d35] rounded-lg p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#E8820C]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        {customer.invoiceType === 'corporate' ? 'Yetkili Soyadı *' : 'Soyadınız *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={customer.lastName}
                        onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })}
                        className="w-full bg-white dark:bg-[#0d0f12] border border-gray-300 dark:border-[#2a2d35] rounded-lg p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#E8820C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">E-Posta Adresi *</label>
                      <input
                        type="email"
                        required
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        placeholder="fatura@ornek.com"
                        className="w-full bg-white dark:bg-[#0d0f12] border border-gray-300 dark:border-[#2a2d35] rounded-lg p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#E8820C]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Telefon *</label>
                      <input
                        type="tel"
                        required
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        placeholder="0542 292 44 92"
                        className="w-full bg-white dark:bg-[#0d0f12] border border-gray-300 dark:border-[#2a2d35] rounded-lg p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#E8820C]"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      {customer.invoiceType === 'corporate' ? 'Şirket / Fatura & Teslimat Adresi *' : 'Teslimat & Fatura Adresi *'}
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      placeholder="Mahalle, cadde, sokak, bina ve kapı no..."
                      className="w-full bg-white dark:bg-[#0d0f12] border border-gray-300 dark:border-[#2a2d35] rounded-lg p-2.5 text-xs text-gray-900 dark:text-white resize-none focus:outline-none focus:border-[#E8820C]"
                    />
                  </div>

                  {/* Optional VIN Input Banner */}
                  <div className="p-3 bg-gray-50 dark:bg-[#1a1d23] border border-gray-200 dark:border-[#2a2d35] rounded-xl space-y-1">
                    <label className="block text-xs font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#E8820C] shrink-0" />
                      <span>Araç Şasi Numarası (VIN / 17 Hane - İsteğe Bağlı)</span>
                    </label>
                    <input
                      type="text"
                      maxLength={17}
                      value={customer.vin}
                      onChange={(e) => setCustomer({ ...customer, vin: e.target.value.toUpperCase() })}
                      placeholder="Örn: W0L0AHL359281XXXX"
                      className="w-full bg-white dark:bg-[#0d0f12] border border-gray-300 dark:border-[#2a2d35] rounded-lg p-2 font-mono text-xs font-bold uppercase focus:outline-none focus:border-[#E8820C]"
                    />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                      Ruhsatınızdaki 17 haneli şasi numarasını girerseniz, kargo çıkmadan %100 parça uyum teyidi yapılır.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loadingPayment}
                    className="w-full bg-[#E8820C] hover:bg-[#d4740a] text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer uppercase tracking-wide transition-colors"
                  >
                    {loadingPayment ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>iyzico Ödeme Ekranı Hazırlanıyor...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                        <span>Ödemeye Geç ({formatCurrency(grandTotal)})</span>
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
