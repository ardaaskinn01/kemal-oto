'use client';

import React from 'react';
import { 
  Package, 
  Truck, 
  Users, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  Car, 
  ArrowUpRight 
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const stats = [
    { title: 'Toplam Ürün & Parça', value: '4,130', icon: Package, change: '+12 bu hafta', color: 'text-orange-500' },
    { title: 'Bekleyen Siparişler', value: '18', icon: Truck, change: '6 kargoya hazır', color: 'text-amber-500' },
    { title: 'Kayıtlı Müşteriler', value: '892', icon: Users, change: '+24 yeni üye', color: 'text-emerald-500' },
    { title: 'Aylık Ciro (Tahmini)', value: '₺384,500', icon: DollarSign, change: '+%18 artış', color: 'text-blue-500' },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Admin Genel Bakış</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Kemal Oto mağaza satışları, şasi uyumluluk filtreleri ve sipariş durumları.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-orange-500/20"
          >
            <Package className="w-4 h-4" />
            <span>+ Yeni Parça Ekle</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{stat.title}</span>
                <div className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-950 ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">{stat.change}</span>
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
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Package className="w-5 h-5 text-orange-500" />
              <span>Ürün & Parça Kataloğu</span>
            </h3>
            <Link
              href="/admin/products"
              className="text-xs text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Yönet</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Opel, Peugeot, Citroën, Chevrolet ve DS araçları için tekil ürün girişi yapın, OEM kodları, orijinal/yan sanayi etiketleri ve detaylı teknik açıklamaları kaydedin.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors"
            >
              <span>Parça Listesine Git</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-orange-500" />
            </Link>
          </div>
        </div>

        {/* Order & Shipping Management Box */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-500" />
              <span>Sipariş & Manuel Kargo Girişi</span>
            </h3>
            <Link
              href="/admin/orders"
              className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Yönet</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Depodan çıkan siparişlerin DHL takip kodunu manuel olarak girin; müşteriye doğrudan DHL takip linki içeren Resend e-posta bildirimini otomatik tetikleyin.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors"
            >
              <span>Siparişleri İncele</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-500" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
