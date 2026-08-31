'use client';

import React, { useEffect, useState } from 'react';
import { 
  Package, 
  Truck, 
  Users, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  Car, 
  ArrowUpRight,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import { formatCurrency } from '../lib/utils';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    productsCount: 0,
    pendingOrdersCount: 0,
    customersCount: 0,
    totalRevenue: 0,
    loading: true,
  });

  useEffect(() => {
    fetchLiveStats();
  }, []);

  const fetchLiveStats = async () => {
    try {
      // 1. Fetch real products count
      const { count: prodCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      // 2. Fetch real pending orders count
      const { count: ordersCount, data: orderData } = await supabase
        .from('orders')
        .select('*');

      // 3. Fetch real customers count
      const { count: custCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      let calculatedRevenue = 0;
      let pendingCount = 0;

      if (orderData && orderData.length > 0) {
        orderData.forEach((ord: any) => {
          if (ord.total_amount) {
            calculatedRevenue += Number(ord.total_amount);
          }
          if (ord.status === 'pending' || ord.status === 'processing') {
            pendingCount++;
          }
        });
      }

      setStats({
        productsCount: prodCount || 0,
        pendingOrdersCount: pendingCount || (ordersCount || 0),
        customersCount: custCount || 0,
        totalRevenue: calculatedRevenue,
        loading: false,
      });
    } catch (err) {
      console.warn('Canlı istatistikler çekilirken hata oluştu, varsayılan gösteriliyor.');
      setStats({
        productsCount: 0,
        pendingOrdersCount: 0,
        customersCount: 0,
        totalRevenue: 0,
        loading: false,
      });
    }
  };

  const statCards = [
    { 
      title: 'Toplam Ürün & Parça', 
      value: stats.loading ? '...' : (stats.productsCount > 0 ? stats.productsCount.toLocaleString('tr-TR') : 'Canlı Veri Bekleniyor'), 
      icon: Package, 
      change: stats.productsCount > 0 ? 'Veritabanında Kayıtlı' : 'Henüz Ürün Eklenmedi', 
      color: 'text-amber-500' 
    },
    { 
      title: 'Bekleyen Siparişler', 
      value: stats.loading ? '...' : stats.pendingOrdersCount.toLocaleString('tr-TR'), 
      icon: Truck, 
      change: stats.pendingOrdersCount > 0 ? 'Kargoya Hazırlanacak' : 'Aktif Bekleyen Yok', 
      color: 'text-amber-500' 
    },
    { 
      title: 'Kayıtlı Müşteriler', 
      value: stats.loading ? '...' : stats.customersCount.toLocaleString('tr-TR'), 
      icon: Users, 
      change: stats.customersCount > 0 ? 'Toplam Üye Sayısı' : 'Kayıtlı Üye Yok', 
      color: 'text-emerald-500' 
    },
    { 
      title: 'Toplam Ciro', 
      value: stats.loading ? '...' : formatCurrency(stats.totalRevenue), 
      icon: DollarSign, 
      change: stats.totalRevenue > 0 ? 'Tamamlanan Siparişler' : 'Canlı Sipariş Bekleniyor', 
      color: 'text-blue-500' 
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Admin Genel Bakış</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Online Hızlı Parça canlı mağaza satışları, veritabanı stokları ve gerçek sipariş durumları.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-400/20"
          >
            <Package className="w-4 h-4 stroke-[2.5]" />
            <span>+ Yeni Parça Ekle</span>
          </Link>
        </div>
      </div>

      {/* Live Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{stat.title}</span>
                <div className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-950 ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1 font-semibold">{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Product Management Box */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-500" />
              <span>Ürün & Parça Kataloğu Yönetimi</span>
            </h3>
            <Link
              href="/admin/products"
              className="text-xs text-amber-500 hover:underline flex items-center gap-1 font-bold"
            >
              <span>Yönet</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Opel, Peugeot, Citroën, Chevrolet ve DS araçları için veritabanına tekil ürün girişi yapın, OEM kodları, orijinal/muadil etiketleri ve teknik detay açıklamalarını canlı olarak kaydedin.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-900 dark:text-white text-xs font-black px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors"
            >
              <span>Canlı Parça Ekle / Yönet</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-500" />
            </Link>
          </div>
        </div>

        {/* Order & Shipping Management Box */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-500" />
              <span>Sipariş & Manuel Kargo Yönetimi</span>
            </h3>
            <Link
              href="/admin/orders"
              className="text-xs text-amber-500 hover:underline flex items-center gap-1 font-bold"
            >
              <span>Yönet</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Gelen gerçek siparişlerin DHL takip kodunu girin; müşteriye doğrudan 1 tıkla kargo takip linki içeren otomatik e-posta bildirimini tetikleyin.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-900 dark:text-white text-xs font-black px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors"
            >
              <span>Gerçek Siparişleri İncele</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-500" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
