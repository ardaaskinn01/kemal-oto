'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { 
  Truck, 
  Search, 
  Check, 
  Send, 
  ExternalLink, 
  Clock, 
  Package, 
  FileText, 
  AlertCircle,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

interface OrderItem {
  product_id: string;
  title: string;
  part_number: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  total_amount: number;
  payment_status: 'pending' | 'paid' | 'failed';
  shipping_status: 'pending' | 'shipped' | 'delivered';
  tracking_number?: string;
  vin?: string;
  vehicle_model?: string;
  shipping_address: {
    full_name: string;
    phone: string;
    address: string;
    city: string;
    district?: string;
  };
  contact_info?: {
    email: string;
    phone: string;
  };
  items: OrderItem[];
  created_at: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'shipped'>('all');
  
  // Tracking number input state keyed by orderId
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});
  const [shippingLoading, setShippingLoading] = useState<Record<string, boolean>>({});
  const [notification, setNotification] = useState<{ id: string; message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && !error) {
        setOrders(data as Order[]);
      } else {
        setOrders([]);
      }
    } catch (err) {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleShipOrder = async (order: Order) => {
    const trackingCode = (trackingInputs[order.id] || '').trim();

    if (!trackingCode) {
      setNotification({
        id: order.id,
        message: 'Lütfen DHL Kargo Takip Numarasını giriniz. (Zorunludur)',
        type: 'error',
      });
      return;
    }

    setShippingLoading((prev) => ({ ...prev, [order.id]: true }));
    setNotification(null);

    try {
      const res = await fetch('/api/admin/orders/ship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          trackingNumber: trackingCode,
          customerEmail: order.contact_info?.email || 'musteri@onlinehizliparca.com',
          customerName: order.shipping_address?.full_name || 'Müşteri',
          items: order.items,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setNotification({
          id: order.id,
          message: 'DHL Takip Kodu kaydedildi ve müşteriye bilgilendirme e-postası başarıyla gönderildi!',
          type: 'success',
        });
        fetchOrders();
      } else {
        setNotification({
          id: order.id,
          message: data.error || 'Takip kodu kaydedilirken bir hata oluştu.',
          type: 'error',
        });
      }
    } catch (err: any) {
      setNotification({
        id: order.id,
        message: err.message || 'Servis bağlantı hatası.',
        type: 'error',
      });
    } finally {
      setShippingLoading((prev) => ({ ...prev, [order.id]: false }));
    }
  };

  const filteredOrders = orders.filter((ord) => {
    if (activeFilter === 'pending') return ord.shipping_status === 'pending';
    if (activeFilter === 'shipped') return ord.shipping_status === 'shipped';
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <Truck className="w-7 h-7 text-amber-500" />
            Sipariş & Manuel Kargo Yönetimi
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Gelen gerçek siparişlerin durumunu takip edin ve DHL Express kargo takip kodunu girerek müşterileri anında bilgilendirin.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold px-3.5 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-800 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Yenile</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 text-xs font-bold">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-amber-400 text-slate-950 font-black'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Tüm Siparişler ({orders.length})
        </button>
        <button
          onClick={() => setActiveFilter('pending')}
          className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            activeFilter === 'pending'
              ? 'bg-amber-400 text-slate-950 font-black'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Bekleyenler ({orders.filter((o) => o.shipping_status === 'pending').length})
        </button>
        <button
          onClick={() => setActiveFilter('shipped')}
          className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            activeFilter === 'shipped'
              ? 'bg-amber-400 text-slate-950 font-black'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Kargolananlar ({orders.filter((o) => o.shipping_status === 'shipped').length})
        </button>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center text-slate-500 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto" />
          <p className="text-xs font-bold">Siparişler yükleniyor...</p>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isShipped = order.shipping_status === 'shipped';
            const currentNotification = notification?.id === order.id ? notification : null;

            return (
              <div
                key={order.id}
                className={`bg-white dark:bg-slate-900 border rounded-3xl p-5 sm:p-6 space-y-4 transition-all shadow-sm ${
                  isShipped ? 'border-emerald-300 dark:border-emerald-500/30' : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3.5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold shrink-0 ${
                      isShipped ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-400/10 text-amber-500'
                    }`}>
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black text-slate-900 dark:text-white">{order.id}</span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {new Date(order.created_at).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                      {order.vin && (
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono block mt-0.5">
                          Şasi: <strong>{order.vin}</strong> {order.vehicle_model && `(${order.vehicle_model})`}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-black px-2.5 py-1 rounded-lg">
                      Ödeme Alındı (iyzico)
                    </span>
                    {isShipped ? (
                      <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <Check className="w-3 h-3" /> Kargoya Verildi
                      </span>
                    ) : (
                      <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Sipariş Hazırlanıyor
                      </span>
                    )}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Customer Info */}
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                      TESLİMAT ADRESİ & MÜŞTERİ
                    </span>
                    <p className="font-extrabold text-slate-900 dark:text-white">{order.shipping_address?.full_name}</p>
                    <p className="text-slate-600 dark:text-slate-400">{order.shipping_address?.phone}</p>
                    <p className="text-slate-600 dark:text-slate-400">{order.shipping_address?.address}, {order.shipping_address?.district}/{order.shipping_address?.city}</p>
                    {order.contact_info?.email && (
                      <p className="text-slate-500 font-mono text-[11px] pt-1">E-Posta: {order.contact_info.email}</p>
                    )}
                  </div>

                  {/* Items List */}
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                      <span>SİPARİŞ EDİLEN PARÇALAR</span>
                      <span className="text-amber-500 font-extrabold text-xs">{formatCurrency(order.total_amount)}</span>
                    </div>

                    <div className="divide-y divide-slate-200 dark:divide-slate-800/80">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="py-2 flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 dark:text-white truncate">{item.title}</p>
                            <span className="text-[10px] text-slate-500 font-mono">OEM: {item.part_number}</span>
                          </div>
                          <span className="font-mono font-extrabold text-slate-700 dark:text-slate-300 shrink-0">
                            {item.quantity}x {formatCurrency(item.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* DHL Tracking Input Form */}
                <div className="pt-2">
                  {!isShipped ? (
                    <div className="flex flex-col sm:flex-row gap-2.5 items-center">
                      <input
                        type="text"
                        placeholder="DHL Takip No Giriniz (Örn: DHL-TR-982410293)"
                        value={trackingInputs[order.id] || ''}
                        onChange={(e) =>
                          setTrackingInputs({ ...trackingInputs, [order.id]: e.target.value })
                        }
                        className="w-full sm:flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs font-mono font-bold uppercase focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="button"
                        onClick={() => handleShipOrder(order)}
                        disabled={shippingLoading[order.id]}
                        className="w-full sm:w-auto bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50 shrink-0"
                      >
                        {shippingLoading[order.id] ? (
                          <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Kargoya Ver & Müşteriyi Bilgilendir</span>
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-700 dark:text-slate-300">DHL Takip Kodu:</span>
                        <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-950 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                          {order.tracking_number}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-bold text-amber-500">
                        <a
                          href={`https://www.dhl.com/tr-tr/home/tracking.html?tracking-id=${order.tracking_number}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline flex items-center gap-1"
                        >
                          <span>DHL Resmi Takip</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}

                  {currentNotification && (
                    <div
                      className={`mt-2 p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                        currentNotification.type === 'success'
                          ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                          : 'bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400'
                      }`}
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{currentNotification.message}</span>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-500 flex items-center justify-center mx-auto">
            <Package className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h3 className="text-base font-black text-slate-900 dark:text-white">Henüz Alınmış Bir Sipariş Bulunmuyor</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Siteniz üzerinden yeni bir sipariş verildiğinde veya ödeme tamamlandığında tüm detaylar bu ekranda canlı olarak listelenecektir.
          </p>
        </div>
      )}
    </div>
  );
}
