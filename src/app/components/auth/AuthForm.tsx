'use client';

import React, { useState } from 'react';
import { Mail, Lock, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthFormProps {
  initialMode?: 'login' | 'signup';
}

export function AuthForm({ initialMode = 'login' }: AuthFormProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      alert(`Giriş yapılıyor: ${email}`);
    } else {
      alert(`Hesap oluşturuluyor: ${fullName} (${email})`);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
      {/* Mode Switcher Tabs */}
      <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 mb-8">
        <button
          onClick={() => setMode('login')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
            mode === 'login'
              ? 'bg-orange-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Giriş Yap
        </button>
        <button
          onClick={() => setMode('signup')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
            mode === 'signup'
              ? 'bg-orange-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Üye Ol
        </button>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-white">
          {mode === 'login' ? 'Kemal Oto\'ya Hoş Geldiniz' : 'Yeni Hesap Oluşturun'}
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {mode === 'login'
            ? 'Hesabınıza giriş yaparak siparişlerinizi ve garajınızı yönetin'
            : 'Fırsatlardan yararlanmak için hemen kayıt olun'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Ad Soyad
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ahmet Yılmaz"
                className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            E-Posta Adresi
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@domain.com"
              className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500"
            />
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {mode === 'signup' && (
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Telefon Numarası
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0555 000 00 00"
                className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Şifre
          </label>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500"
            />
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 text-sm transition-all"
        >
          <span>{mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-400">
        <ShieldCheck className="w-4 h-4 text-orange-500" />
        <span>Kişisel verileriniz 256-Bit SSL ile korunmaktadır.</span>
      </div>
    </div>
  );
}
