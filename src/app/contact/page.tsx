'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, MessageSquare, CheckCircle2, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vin: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({
          type: 'success',
          message: 'Mesajınız başarıyla iletildi! Uzman ekibimiz en kısa sürede sizinle iletişime geçecektir.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          vin: '',
          message: '',
        });
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Mesaj gönderilemedi. Lütfen tekrar deneyiniz.',
        });
      }
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: 'Bağlantı hatası oluştu. Lütfen WhatsApp veya telefon hattımızdan bize ulaşınız.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[#E8820C] font-bold text-xs uppercase tracking-wider">
          Müşteri Hizmetleri & Teknik Destek
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Bizimle İletişime Geçin</h1>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
          Şasi numarası ile parça sorgulama, montaj desteği veya siparişleriniz için uzman ekibimiz hazır.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#2a2d35] p-5 rounded-2xl flex items-start gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#E8820C] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-slate-900 dark:text-white font-bold text-sm">Müşteri Destek Hattı</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                <a href="tel:05422924492" className="hover:text-[#E8820C] font-semibold text-slate-700 dark:text-slate-200">0542 292 44 92</a>
              </p>
              <p className="text-xs text-[#E8820C] font-semibold mt-1">
                <a href="https://wa.me/905422924492" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  WhatsApp Destek: 0542 292 44 92
                </a>
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#2a2d35] p-5 rounded-2xl flex items-start gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-slate-900 dark:text-white font-bold text-sm">E-Posta Adresimiz</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                <a href="mailto:info@onlinehizliparca.com" className="hover:text-[#E8820C] font-semibold text-slate-700 dark:text-slate-200">
                  info@onlinehizliparca.com
                </a>
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#2a2d35] p-5 rounded-2xl flex items-start gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#E8820C] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-slate-900 dark:text-white font-bold text-sm">Merkez Mağaza & Depo</h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                MUTLUBAŞLAR PLAZA, KEMALPAŞA CADDESİ, 5.SANAYİ SİTESİ PINARBAŞI NO:344B, 35060 Bornova/İzmir
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Message Form */}
        <div className="lg:col-span-7 bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#2a2d35] p-6 sm:p-8 rounded-3xl space-y-5 shadow-sm">
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-5 h-5 text-[#E8820C]" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Bize Mesaj Gönderin</h2>
          </div>

          {status && (
            <div
              className={`p-4 rounded-2xl text-xs font-bold flex items-start gap-2.5 ${
                status.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-800'
              }`}
            >
              {status.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              )}
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Adınız Soyadınız *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Adınız Soyadınız"
                  className="w-full bg-slate-50 dark:bg-[#0d0f12] text-slate-900 dark:text-white border border-slate-300 dark:border-[#2a2d35] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm focus:outline-none focus:border-[#E8820C]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  E-Posta Adresiniz *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ornek@domain.com"
                  className="w-full bg-slate-50 dark:bg-[#0d0f12] text-slate-900 dark:text-white border border-slate-300 dark:border-[#2a2d35] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm focus:outline-none focus:border-[#E8820C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Telefon Numaranız (Opsiyonel)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="05XX XXX XX XX"
                  className="w-full bg-slate-50 dark:bg-[#0d0f12] text-slate-900 dark:text-white border border-slate-300 dark:border-[#2a2d35] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm focus:outline-none focus:border-[#E8820C]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Şasi Numarası / VIN (Opsiyonel)
                </label>
                <input
                  type="text"
                  maxLength={17}
                  value={formData.vin}
                  onChange={(e) => setFormData({ ...formData, vin: e.target.value.toUpperCase() })}
                  placeholder="17 Haneli Şasi No"
                  className="w-full bg-slate-50 dark:bg-[#0d0f12] text-slate-900 dark:text-white border border-slate-300 dark:border-[#2a2d35] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm focus:outline-none focus:border-[#E8820C] font-mono uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Mesajınız / Talep Ettiğiniz Parça *
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Talep ettiğiniz parça, araç model yılı veya sormak istediğiniz konuyu yazınız..."
                className="w-full bg-slate-50 dark:bg-[#0d0f12] text-slate-900 dark:text-white border border-slate-300 dark:border-[#2a2d35] rounded-xl py-2.5 px-3.5 text-xs sm:text-sm focus:outline-none focus:border-[#E8820C] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E8820C] hover:bg-[#d4740a] text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Mesaj Gönderiliyor...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Mesajı Gönder</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
