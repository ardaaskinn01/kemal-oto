'use client';

import React from 'react';
import Image from 'next/image';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Wrench, 
  Package, 
  ShoppingBag, 
  ArrowLeft, 
  LayoutDashboard, 
  ShieldCheck, 
  LogOut, 
  Truck, 
  Settings 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from '../components/ui/ThemeToggle';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { profile, signOut } = useAuth();

  const navItems = [
    { href: '/admin', label: 'Genel Bakış', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Ürün & Parça Yönetimi', icon: Package },
    { href: '/admin/orders', label: 'Sipariş & Kargo Yönetimi', icon: Truck },
    { href: '/admin/settings', label: 'Kargo & Site Ayarları', icon: Settings },
  ];

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row transition-colors">
        
        {/* Admin Sidebar */}
        <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 p-4 md:p-6 flex flex-col justify-between shrink-0 shadow-sm">
          <div className="space-y-4 md:space-y-6">
            
            {/* Brand & ThemeToggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-800 bg-white shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Kemal Oto"
                    fill
                    className="object-contain p-0.5"
                  />
                </div>
                <div>
                  <span className="font-black text-base md:text-lg text-slate-900 dark:text-white">KEMAL OTO</span>
                  <span className="block text-[9px] md:text-[10px] text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider">
                    Yönetim Paneli
                  </span>
                </div>
              </div>
              <ThemeToggle />
            </div>

            {/* Admin Profile Pill */}
            <div className="bg-slate-50 dark:bg-slate-950 p-2.5 md:p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="truncate">
                <span className="text-slate-900 dark:text-white font-semibold block truncate">{profile?.full_name || 'Yönetici'}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate block">{profile?.email}</span>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 md:gap-3 px-3 md:px-3.5 py-2 md:py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 md:shrink ${
                      isActive
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden md:block pt-6 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Mağazaya Dön</span>
            </Link>

            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </aside>

        {/* Main Admin Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-x-hidden min-w-0">
          {children}
        </main>

      </div>
    </ProtectedRoute>
  );
}
