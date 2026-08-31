'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { formatCurrency } from '../lib/utils';
import { 
  Package, 
  Truck, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  ShoppingBag,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

interface OrderItem {
  product_id?: string;
  title: string;
  part_number?: string;
  quantity: number;
  price: number;
}

interface UserOrder {
  id: string;
  total_amount: number;
  payment_status: string;
  shipping_status: 'pending' | 'shipped' | 'delivered';
  tracking_number?: string;
  vin?: string;
  vehicle_model?: string;
  items: OrderItem[];
  created_at: string;
}

export default function CustomerOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomerOrders();
  }, [user]);

  const fetchCustomerOrders = async () => {
    setLoading(true);
    try {
      if (user?.email) {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('contact_info->>email', user.email)
          .order('created_at', { ascending: false });

        if (data && !error) {
          setOrders(data as UserOrder[]);
        } else {
          setOrders([]);
        }
      } else {
        setOrders([]);
      }
    } catch (err) {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
          <Package className="w-7 h-7 text-amber-500" />
          Siparişlerim & Kargo Takibi
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Verdiğiniz siparişlerin güncel kargo ve teslimat durumunu canlı olarak bu ekrandan takip edebilirsiniz.
        </p>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center text-slate-500 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto" />
          <p className="text-xs font-bold">Siparişleriniz yükleniyor...</p>
        </div>
      ) : orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => {
            const isShipped = order.shipping_status === 'shipped' || order.shipping_status === 'delivered';

            return (
              <div
                key={order.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-black text-slate-900 dark:text-white">{order.id}</span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {new Date(order.created_at).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                    {order.vin && (
                      <span className="text-[11px] text-slate-500 font-mono block mt-0.5">
                        Şasi: <strong>{order.vin}</strong>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {isShipped ? (
                      <span className="bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-lg flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Kargoya Verildi (DHL Express)
                      </span>
                    ) : (
                      <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-3 py-1 rounded-lg flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Sipariş Hazırlanıyor
                      </span>
                    )}
                  </div>
                </div>

                {/* Items Row */}
                <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between gap-2">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{item.title}</p>
                        {item.part_number && <span className="text-[10px] text-slate-500 font-mono">OEM: {item.part_number}</span>}
                      </div>
                      <span className="font-mono font-extrabold text-slate-700 dark:text-slate-300">
                        {item.quantity}x {formatCurrency(item.price)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Shipping Tracking Direct Link */}
                {isShipped && order.tracking_number && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs pt-3">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="font-bold text-slate-700 dark:text-slate-300">DHL Takip No:</span>
                      <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-950 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                        {order.tracking_number}
                      </span>
                    </div>

                    <a
                      href={`https://www.dhl.com/tr-tr/home/tracking.html?tracking-id=${order.tracking_number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-4 py-2 rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
                    >
                      <span>1 Tıkla DHL Resmi Takip Yap</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-500 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h3 className="text-base font-black text-slate-900 dark:text-white">Henüz Siparişiniz Bulunmuyor</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Aracınız için %100 uyumlu orijinal ve muadil parçaları inceleyip sipariş verebilirsiniz.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-amber-400/20"
          >
            Yedek Parça Kataloğunu İncele
          </Link>
        </div>
      )}
    </div>
  );
}
