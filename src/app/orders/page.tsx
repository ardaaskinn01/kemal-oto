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
  ShieldCheck, 
  ExternalLink, 
  Search, 
  ArrowRight,
  FileText,
  AlertCircle,
  ShoppingBag
} from 'lucide-react';
import Link from 'next/link';
import { DhlTracker } from '../components/shipping/DhlTracker';

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

// Sample orders for instant preview/demo
const DEMO_ORDERS: UserOrder[] = [
  {
    id: 'KML-ORD-9281',
    total_amount: 6890,
    payment_status: 'paid',
    shipping_status: 'shipped',
    tracking_number: 'DHL-TR-84920194',
    vin: 'VF3M4DV5RC812948',
    vehicle_model: 'Peugeot 3008 1.5 BlueHDi (2020)',
    items: [
      {
        title: 'Peugeot 3008 / 5008 1.5 BlueHDi Orijinal 8mm Eksantrik Zincir Kiti',
        part_number: 'PSA-1638159880',
        quantity: 1,
        price: 6890,
      },
    ],
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'KML-ORD-8841',
    total_amount: 2450,
    payment_status: 'paid',
    shipping_status: 'pending',
    vin: 'W0L0AHL3582019284',
    vehicle_model: 'Opel Astra J 1.6 CDTI (2016)',
    items: [
      {
        title: 'Opel Astra J / K Periyodik 4 Parça Bakım Filtre Seti',
        part_number: 'OPL-FLT-SET',
        quantity: 1,
        price: 2450,
      },
    ],
    created_at: new Date().toISOString(),
  },
];

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<UserOrder[]>(DEMO_ORDERS);
  const [loading, setLoading] = useState(false);
  const [activeTrackingCode, setActiveTrackingCode] = useState<string | null>(null);
  const [manualQuery, setManualQuery] = useState('');

  useEffect(() => {
    if (user) {
      fetchUserOrders();
    }
  }, [user]);

  const fetchUserOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (data && data.length > 0 && !error) {
        setOrders(data as UserOrder[]);
      }
    } catch (e) {
      console.warn('Siparişler yüklenirken demo verisi kullanılıyor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold px-3 py-1 rounded-full mb-2 border border-orange-200 dark:border-orange-500/20">
            <Package className="w-3.5 h-3.5" />
            <span>Müşteri Hesap Merkezi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Siparişlerim & Kargo Takibi
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Geçmiş siparişlerinizi, faturalarınızı ve kargo transfer durumlarını bu alandan canlı takip edebilirsiniz.
          </p>
        </div>

        <Link
          href="/shop"
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shrink-0"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Alışverişe Devam Et</span>
        </Link>
      </div>

      {/* Manual Order / Tracking Code Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 rounded-2xl shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (manualQuery.trim()) {
              setActiveTrackingCode(manualQuery.trim());
            }
          }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={manualQuery}
              onChange={(e) => setManualQuery(e.target.value)}
              placeholder="Sipariş No (Örn: KML-ORD-9281) veya Kargo Kodu ile sorgula..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm focus:outline-none focus:border-orange-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-slate-900 hover:bg-black dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
          >
            <span>Sorgula</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Dynamic Live Tracker Popup / View if active */}
      {activeTrackingCode && (
        <div className="bg-orange-50/50 dark:bg-slate-900 border-2 border-orange-500/40 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-orange-200 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-orange-600" />
              <span>Canlı Kargo Durumu: <strong className="font-mono">{activeTrackingCode}</strong></span>
            </h3>
            <button
              onClick={() => setActiveTrackingCode(null)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              Kapat ✕
            </button>
          </div>
          <DhlTracker />
        </div>
      )}

      {/* Orders List */}
      <div className="space-y-5">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>Son Siparişleriniz</span>
          <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-mono">
            {orders.length}
          </span>
        </h2>

        {orders.map((order) => {
          const isShipped = order.shipping_status === 'shipped';

          return (
            <div
              key={order.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              {/* Top Summary Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono font-black text-sm text-slate-900 dark:text-white">
                    #{order.id}
                  </span>
                  <span className="text-xs text-slate-500">
                    {new Date(order.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  {order.vin && (
                    <span className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-mono px-2 py-0.5 rounded">
                      VIN: {order.vin}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-500/30">
                    Ödeme Başarılı
                  </span>

                  {isShipped ? (
                    <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Truck className="w-3 h-3" /> Kargoya Verildi
                    </span>
                  ) : (
                    <span className="bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-amber-300 dark:border-amber-500/30">
                      <Clock className="w-3 h-3" /> Hazırlanıyor
                    </span>
                  )}
                </div>
              </div>

              {/* Items in this Order */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between gap-4 text-xs">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                      {item.part_number && (
                        <span className="text-[10px] text-slate-500 font-mono">OEM Kodu: {item.part_number}</span>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 block">
                        {item.quantity} Adet x {formatCurrency(item.price)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Bottom Footer: Total Price & Tracking Action */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs">
                  <span className="text-slate-500">Toplam Tutar: </span>
                  <strong className="text-base font-black text-slate-900 dark:text-white">
                    {formatCurrency(order.total_amount)}
                  </strong>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {order.tracking_number ? (
                    <button
                      type="button"
                      onClick={() => setActiveTrackingCode(order.tracking_number!)}
                      className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Kargoyu Canlı Takip Et ({order.tracking_number})</span>
                    </button>
                  ) : (
                    <span className="text-xs text-slate-500 italic flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Depoda hazırlanıyor, kargo kodu henüz atanmadı.
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
