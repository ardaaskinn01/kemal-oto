'use client';

import React from 'react';
import { MapPin, Phone, Mail, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-orange-600 dark:text-orange-500 font-bold text-xs uppercase tracking-wider">
          Müşteri Hizmetleri & Teknik Destek
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Bizimle İletişime Geçin</h1>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
          Şase numarası ile parça sorgulama, montaj desteği veya siparişleriniz için uzman ekibimiz hazır.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl flex items-start gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-orange-600/10 text-orange-600 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-slate-900 dark:text-white font-bold text-sm">Müşteri Destek Hattı</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                <a href="tel:05422924492" className="hover:text-orange-600 font-semibold text-slate-700 dark:text-slate-200">0542 292 44 92</a>
              </p>
              <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold mt-1">
                <a href="https://wa.me/905422924492" target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp Destek: 0542 292 44 92</a>
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl flex items-start gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-slate-900 dark:text-white font-bold text-sm">E-Posta Adresimiz</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                <a href="mailto:info@onlinehizliparca.com" className="hover:text-orange-600 font-semibold text-slate-700 dark:text-slate-200">
                  info@onlinehizliparca.com
                </a>
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl flex items-start gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-orange-600/10 text-orange-600 flex items-center justify-center shrink-0">
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
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-2xl space-y-5 shadow-sm">
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Mesaj Gönderin</h2>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert('Mesajınız Kemal Oto ekibine başarıyla iletildi!');
            }}
            className="space-y-3.5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Adınız Soyadınız</label>
                <input
                  type="text"
                  required
                  placeholder="Adınız Soyadınız"
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg py-2.5 px-3 text-xs sm:text-sm focus:outline-none focus:border-orange-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">E-Posta Adresiniz</label>
                <input
                  type="email"
                  required
                  placeholder="E-posta adresiniz"
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg py-2.5 px-3 text-xs sm:text-sm focus:outline-none focus:border-orange-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Şase Numarası / Araç Bilgisi (Opsiyonel)</label>
              <input
                type="text"
                placeholder="17 Haneli Şasi Numarası"
                className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg py-2.5 px-3 text-xs sm:text-sm focus:outline-none focus:border-orange-600 font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Mesajınız</label>
              <textarea
                rows={4}
                required
                placeholder="Talep ettiğiniz parça veya sormak istediğiniz konuyu yazınız..."
                className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg py-2.5 px-3 text-xs sm:text-sm focus:outline-none focus:border-orange-600 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Mesajı Gönder</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
