'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Package, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id') || '';
  const { clearCart } = useCart();
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    // Ödeme başarılı sayfasına ulaşıldığında sepeti temizle
    if (!cleared) {
      clearCart();
      try {
        localStorage.removeItem('kemal_oto_cart');
      } catch (e) {}
      setCleared(true);
    }
  }, [clearCart, cleared]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-white dark:bg-[#111318] border border-gray-200 dark:border-[#2a2d35] rounded-3xl p-6 sm:p-8 text-center shadow-xl space-y-6">
        
        {/* Başarı İkonu */}
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 animate-in zoom-in">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        {/* Başlık ve Açıklama */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Siparişiniz Başarıyla Alındı!
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ödemeniz İyzico 3D Secure ile güvenli bir şekilde tamamlandı. Siparişiniz hazırlanmak üzere sistemimize kaydedildi.
          </p>
        </div>

        {/* Sipariş No Kutusu */}
        {orderId && (
          <div className="p-4 bg-gray-50 dark:bg-[#16181f] border border-gray-200 dark:border-[#2a2d35] rounded-2xl flex items-center justify-between">
            <div className="text-left">
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
                Sipariş Numarası
              </span>
              <span className="text-sm font-mono font-bold text-gray-900 dark:text-white">
                {orderId}
              </span>
            </div>
            <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full border border-emerald-300 dark:border-emerald-800">
              Ödendi
            </span>
          </div>
        )}

        {/* Bilgilendirme Bandı */}
        <div className="p-3.5 bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40 rounded-2xl flex items-center gap-3 text-left">
          <ShieldCheck className="w-6 h-6 text-[#E8820C] shrink-0" />
          <p className="text-xs text-gray-700 dark:text-gray-300">
            Sipariş detaylarınız ve faturanız e-posta adresinize gönderilmiştir.
          </p>
        </div>

        {/* Aksiyon Butonları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link
            href="/orders"
            className="w-full py-3 px-4 rounded-xl border border-gray-300 dark:border-[#2a2d35] text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1f222a] flex items-center justify-center gap-2 transition-colors"
          >
            <Package className="w-4 h-4" />
            <span>Siparişlerimi Gör</span>
          </Link>
          <Link
            href="/shop"
            className="w-full py-3 px-4 rounded-xl bg-[#E8820C] hover:bg-[#d4740a] text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Alışverişe Dön</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Yükleniyor...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
