'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-orange-500 font-bold text-xs uppercase tracking-wider">
          7/24 Kesintisiz İletişim
        </span>
        <h1 className="text-4xl font-black text-white">Bizimle İletişime Geçin</h1>
        <p className="text-slate-300 text-sm">
          Şase numarası ile parça sorgulama, montaj desteği veya toplu siparişleriniz için uzman ekibimiz hazır.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Müşteri Destek Hattı</h3>
              <p className="text-xs text-slate-400 mt-1">0850 300 00 00 / 0212 500 00 00</p>
              <p className="text-xs text-orange-400 font-semibold mt-1">WhatsApp Destek: +90 530 000 00 00</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">E-Posta Adresimiz</h3>
              <p className="text-xs text-slate-400 mt-1">destek@kemaloto.com</p>
              <p className="text-xs text-slate-400">kurumsal@kemaloto.com</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Merkez Mağaza & Depo</h3>
              <p className="text-xs text-slate-400 mt-1">
                Oto Sanayi Sitesi, 2. Blok No:42, Maslak / İstanbul
              </p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Çalışma Saatleri</h3>
              <p className="text-xs text-slate-400 mt-1">Hafta İçi & Cumartesi: 08:30 - 19:30</p>
              <p className="text-xs text-slate-400">Pazar: Kapalı (Online Destek Aktif)</p>
            </div>
          </div>
        </div>

        {/* Right Column: Message Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-bold text-white">Mesaj Gönderin</h2>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert('Mesajınız Kemal Oto ekibine başarıyla iletildi!');
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Adınız Soyadınız</label>
                <input
                  type="text"
                  required
                  placeholder="Ahmet Yılmaz"
                  className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">E-Posta Adresiniz</label>
                <input
                  type="email"
                  required
                  placeholder="ornek@domain.com"
                  className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Şase Numarası / Araç Bilgisi (Opsiyonel)</label>
              <input
                type="text"
                placeholder="Örn: WVWZZZ3CZWE123456"
                className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-orange-500 font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Mesajınız</label>
              <textarea
                rows={4}
                required
                placeholder="Parça sorgulama veya talebinizi yazın..."
                className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-orange-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Mesajı Gönder</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
