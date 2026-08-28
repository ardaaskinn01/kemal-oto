'use client';

import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Loader2, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, profile, loading, isAdmin } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        <span className="text-xs text-slate-400">Yetkiler denetleniyor...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
        <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto" />
        <h3 className="text-xl font-bold text-white">Giriş Yapmanız Gerekiyor</h3>
        <p className="text-xs text-slate-400">
          Bu sayfaya erişebilmek için lütfen müşteri veya yönetici hesabınızla giriş yapınız.
        </p>
        <Link
          href="/login"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all"
        >
          Giriş Ekranına Git
        </Link>
      </div>
    );
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="max-w-md mx-auto my-16 bg-slate-900 border border-red-900/50 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
        <ShieldAlert className="w-12 h-12 text-red-500 mx-auto" />
        <h3 className="text-xl font-bold text-white">Yönetici Yetkisi Gerekli</h3>
        <p className="text-xs text-slate-400">
          Bu alana yalnızca Kemal Oto yönetici (Admin) yetkisine sahip kullanıcılar erişebilir.
        </p>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 text-left">
          <strong>Kullanıcı:</strong> {user.email} <br />
          <strong>Mevcut Rol:</strong> {profile?.role || 'customer'}
        </div>
        <Link
          href="/"
          className="inline-block bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all border border-slate-700"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
