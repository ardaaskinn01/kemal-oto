'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Car, ShoppingBag, User } from 'lucide-react';
import { useGarage } from '../../contexts/GarageContext';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

export function MobileBottomBar() {
  const pathname = usePathname();
  const { setIsGarageModalOpen, activeVehicle } = useGarage();
  const { totalItems, setIsCartOpen } = useCart();
  const { user } = useAuth();

  // Hide on admin routes
  if (pathname.startsWith('/admin')) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 border-t border-slate-800 text-white backdrop-blur-md px-2 py-2 shadow-2xl">
      <div className="grid grid-cols-5 gap-1 text-center text-[10px] font-extrabold">
        
        {/* 1. Ana Sayfa */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
            pathname === '/' ? 'text-amber-400 bg-slate-800/80' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Ana Sayfa</span>
        </Link>

        {/* 2. Kategoriler */}
        <Link
          href="/shop/categories"
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
            pathname === '/shop/categories' || pathname.startsWith('/shop') ? 'text-amber-400 bg-slate-800/80' : 'text-slate-400 hover:text-white'
          }`}
        >
          <LayoutGrid className="w-5 h-5 mb-0.5" />
          <span>Kategori</span>
        </Link>

        {/* 3. Araç Seç (Garaj) */}
        <button
          type="button"
          onClick={() => setIsGarageModalOpen(true)}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
            activeVehicle ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Car className={`w-5 h-5 mb-0.5 ${activeVehicle ? 'text-emerald-400 animate-pulse' : ''}`} />
          <span className="truncate max-w-[60px]">
            {activeVehicle ? `${activeVehicle.make}` : 'Araç Seç'}
          </span>
        </button>

        {/* 4. Sepetim */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-amber-400 mb-0.5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-amber-400 text-slate-950 rounded-full w-4 h-4 text-[9px] font-black flex items-center justify-center shadow">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-amber-400">Sepetim</span>
        </button>

        {/* 5. Hesabım */}
        <Link
          href={user ? '/garage' : '/login'}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
            pathname === '/garage' || pathname === '/login' ? 'text-amber-400 bg-slate-800/80' : 'text-slate-400 hover:text-white'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>{user ? 'Hesabım' : 'Giriş'}</span>
        </Link>

      </div>
    </div>
  );
}
