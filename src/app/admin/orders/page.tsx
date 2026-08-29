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

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'KML-ORD-9281',
    total_amount: 6890,
    payment_status: 'paid',
    shipping_status: 'pending',
    vin: 'VF3M4DV5RC812948',
    vehicle_model: 'Peugeot 3008 1.5 BlueHDi (2020)',
    shipping_address: {
      full_name: 'Ahmet Yılmaz',
      phone: '0532 555 12 34',
      address: 'Barbaros Bulvarı No:12 D:4 Beşiktaş',
      city: 'İstanbul',
      district: 'Beşiktaş',
    },
    contact_info: {
      email: 'ahmet.yilmaz@example.com',
      phone: '0532 555 12 34',
    },
    items: [
      {
        product_id: 'prod-peugeot-1',
        title: 'Peugeot 3008 / 5008 1.5 BlueHDi Orijinal 8mm Eksantrik Zincir Kiti',
        part_number: 'PSA-1638159880',
        quantity: 1,
        price: 6890,
      },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: 'KML-ORD-8841',
    total_amount: 6190,
    payment_status: 'paid',
    shipping_status: 'shipped',
    tracking_number: 'DHL-TR-84920194',
    vin: 'W0L0AHL3582019284',
    vehicle_model: 'Opel Astra J 1.6 CDTI (2016)',
    shipping_address: {
      full_name: 'Mehmet Demir',
      phone: '0544 333 44 55',
      address: 'Çankaya Cad. No:88',
      city: 'Ankara',
      district: 'Çankaya',
    },
    contact_info: {
      email: 'mehmet.demir@example.com',
      phone: '0544 333 44 55',
    },
    items: [
      {
        product_id: 'prod-opel-1',
        title: 'Opel Astra J 1.6 CDTI Orijinal Triger Zincir Seti',
        part_number: 'GM-55588383-TRG',
        quantity: 1,
        price: 6190,
      },
    ],
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'shipped'>('all');
  
  // Tracking number input state keyed by orderId
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});
  const [shippingLoading, setShippingLoading] = useState<Record<string, boolean>>({});
  const [notification, setNotification] = useState<{ id: string; message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && data.length > 0 && !error) {
        setOrders(data as Order[]);
      }
    } catch (err) {
      console.warn('Veritabanına bağlanılamadı, örnek siparişler gösteriliyor.');
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
          customerEmail: order.contact_info?.email,
          customerName: order.shipping_address.full_name,
          vin: order.vin,
          vehicleModel: order.vehicle_model,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Update local state
        setOrders((prev) =>
          prev.map((o) =>
            o.id === order.id
              ? { ...o, shipping_status: 'shipped', tracking_number: trackingCode }
              : o
          )
        );

        setNotification({
          id: order.id,
          message: `Sipariş ${order.id} kargoya verildi ve müşteriye (${order.contact_info?.email}) DHL takip linkli mail gönderildi!`,
          type: 'success',
        });
      } else {
        setNotification({
          id: order.id,
          message: data.error || 'İşlem başarısız oldu.',
          type: 'error',
        });
      }
    } catch (err) {
      setNotification({
        id: order.id,
        message: 'Kargo API servisine bağlanılamadı.',
        type: 'error',
      });
    } finally {
      setShippingLoading((prev) => ({ ...prev, [order.id]: false }));
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (activeFilter === 'pending') return o.shipping_status === 'pending';
    if (activeFilter === 'shipped') return o.shipping_status === 'shipped';
    return true;
  });

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Sipariş & DHL Kargo Yönetimi</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Parçalar kargoya elden teslim edildiğinde takip kodunu girin, müşteriye otomatik takip linkli mail gitsin.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
              activeFilter === 'all'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Tümü ({orders.length})
          </button>
          <button
            onClick={() => setActiveFilter('pending')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
              activeFilter === 'pending'
                ? 'bg-amber-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Hazırlanıyor ({orders.filter((o) => o.shipping_status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveFilter('shipped')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
              activeFilter === 'shipped'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Kargolandı ({orders.filter((o) => o.shipping_status === 'shipped').length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order) => {
          const isShipped = order.shipping_status === 'shipped';
          const isPending = order.shipping_status === 'pending';
          const isShippingThis = shippingLoading[order.id];

          return (
            <div
              key={order.id}
              className={`bg-white dark:bg-slate-900 border rounded-3xl p-6 sm:p-8 space-y-6 transition-all shadow-sm ${
                isShipped
                  ? 'border-emerald-300 dark:border-emerald-500/40 bg-emerald-50/20 dark:bg-slate-900'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Card Header: Order ID, Date, Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                    isShipped
                      ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      : 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400'
                  }`}>
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-black text-slate-900 dark:text-white">{order.id}</span>
                      <span className="text-xs text-slate-500">
                        {new Date(order.created_at).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                    {order.vin && (
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        Şasi: {order.vin} ({order.vehicle_model || 'Araç'})
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-300 dark:border-emerald-500/30">
                    Ödeme Alındı (İyzico)
                  </span>

                  {isShipped ? (
                    <span className="bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <Check className="w-3.5 h-3.5" /> Kargoya Verildi
                    </span>
                  ) : (
                    <span className="bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-black px-3 py-1 rounded-full border border-amber-300 dark:border-amber-500/40 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Sipariş Hazırlanıyor
                    </span>
                  )}
                </div>
              </div>

              {/* Order Content Grid: Address & Products */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Shipping Address */}
                <div className="lg:col-span-5 space-y-2 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                    Teslimat Adresi & Müşteri
                  </span>
                  <p className="font-semibold text-slate-900 dark:text-white">{order.shipping_address.full_name}</p>
                  <p className="text-slate-600 dark:text-slate-300">{order.shipping_address.phone}</p>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    {order.shipping_address.address}, {order.shipping_address.district}/{order.shipping_address.city}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                    E-Posta: {order.contact_info?.email}
                  </p>
                </div>

                {/* Items */}
                <div className="lg:col-span-7 space-y-2 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    <span>Sipariş Edilen Parçalar</span>
                    <span className="text-orange-600 dark:text-orange-400 font-black text-sm">
                      {formatCurrency(order.total_amount)}
                    </span>
                  </div>

                  <div className="divide-y divide-slate-200 dark:divide-slate-800/80 pt-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                          <span className="text-[10px] text-slate-500 font-mono">OEM: {item.part_number}</span>
                        </div>
                        <span className="font-bold text-slate-700 dark:text-slate-300">{item.quantity} x {formatCurrency(item.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Notification Banner for this Order */}
              {notification && notification.id === order.id && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    notification.type === 'success'
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40'
                      : 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-500/40'
                  }`}
                >
                  {notification.type === 'success' ? (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                  )}
                  <span>{notification.message}</span>
                </div>
              )}

              {/* ======================================================== */}
              {/* SHIPPING CONTROLS: MANDATORY TRACKING CODE INPUT */}
              {/* ======================================================== */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {isPending && (
                  <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="DHL Takip No Giriniz (Örn: DHL-TR-982410293)"
                        value={trackingInputs[order.id] || ''}
                        onChange={(e) =>
                          setTrackingInputs({ ...trackingInputs, [order.id]: e.target.value.toUpperCase() })
                        }
                        className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-xs border border-slate-300 dark:border-slate-700 rounded-xl py-3 px-4 focus:outline-none focus:border-orange-500 placeholder:text-slate-400 placeholder:font-sans"
                      />
                    </div>

                    <button
                      type="button"
                      disabled={isShippingThis}
                      onClick={() => handleShipOrder(order)}
                      className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isShippingThis ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Kargo Bildirimi Gönderiliyor...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Kargoya Ver & Müşteriyi Bilgilendir</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {isShipped && order.tracking_number && (
                  <div className="flex flex-wrap items-center justify-between w-full gap-3 bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-2xl border border-emerald-300 dark:border-emerald-500/30">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-slate-900 dark:text-white">DHL Takip Kodu:</span>
                      <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-white dark:bg-slate-950 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/30">
                        {order.tracking_number}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <a
                        href={`https://www.dhl.com/tr-tr/home/tracking.html?tracking-id=${encodeURIComponent(
                          order.tracking_number
                        )}&submit=1`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-orange-600 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>DHL Resmi Takip</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href={`/tracking?code=${encodeURIComponent(order.tracking_number)}`}
                        className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-3 py-1.5 rounded-xl font-semibold"
                      >
                        Site İçi Takip
                      </a>
                    </div>
                  </div>
                )}

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
