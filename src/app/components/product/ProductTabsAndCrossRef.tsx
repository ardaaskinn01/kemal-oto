'use client';

import React, { useState } from 'react';
import { Product } from '../../types/database.types';
import { 
  FileText, 
  Car, 
  Hash, 
  Wrench, 
  CheckCircle2, 
  ShieldCheck, 
  SlidersHorizontal 
} from 'lucide-react';

interface ProductTabsProps {
  product: Product;
}

export function ProductTabsAndCrossRef({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'desc' | 'vehicles' | 'oem'>('vehicles');

  // Generate realistic cross-reference OEM numbers based on part_number
  const crossRefNumbers = [
    { brand: 'Opel (GM)', code: product.part_number },
    { brand: 'Peugeot / Citroën (PSA)', code: product.oem_reference_number || `${product.part_number}-PSA` },
    { brand: 'Bosch / Lemförder / Valeo', code: `V-${product.part_number.slice(0, 6)}` },
    { brand: 'Febi Bilstein / Meyle', code: `FB-${product.part_number.slice(0, 5)}` },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      
      {/* Tabs Header */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => setActiveTab('vehicles')}
          className={`pb-3.5 px-3 sm:px-5 text-xs sm:text-sm font-black transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'vehicles'
              ? 'border-amber-400 text-amber-500 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Car className="w-4 h-4 shrink-0" />
          <span>UYUMLU ARAÇ MODELLERİ TABLOSU</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('oem')}
          className={`pb-3.5 px-3 sm:px-5 text-xs sm:text-sm font-black transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'oem'
              ? 'border-amber-400 text-amber-500 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Hash className="w-4 h-4 shrink-0" />
          <span>ÇAPRAZ OEM / ÜRETİCİ NUMARALARI</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('desc')}
          className={`pb-3.5 px-3 sm:px-5 text-xs sm:text-sm font-black transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'desc'
              ? 'border-amber-400 text-amber-500 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4 shrink-0" />
          <span>GENEL AÇIKLAMA & TEKNİK ÖZELLİKLER</span>
        </button>
      </div>

      {/* Tab Content 1: Uyumlu Araç Modelleri Tablosu */}
      {activeTab === 'vehicles' && (
        <div className="space-y-4">
          <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-xl text-xs text-slate-800 dark:text-slate-200 font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Aşağıdaki araç modelleri ile 100% uyumludur. Şasi numarası ile teyit edilen siparişlerde iade garantisi verilir.</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white font-black border-b border-slate-200 dark:border-slate-800">
                  <th className="p-3 rounded-tl-xl">MARKA</th>
                  <th className="p-3">MODEL & KASA</th>
                  <th className="p-3">ÜRETİM YILLARI</th>
                  <th className="p-3 rounded-tr-xl text-right">DURUM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold">
                {product.vehicle_compatibility && product.vehicle_compatibility.length > 0 ? (
                  product.vehicle_compatibility.map((vc, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-extrabold text-amber-500 uppercase">{vc.brand}</td>
                      <td className="p-3 text-slate-900 dark:text-white font-bold">{vc.model}</td>
                      <td className="p-3 font-mono text-slate-600 dark:text-slate-300">{vc.years}</td>
                      <td className="p-3 text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" /> %100 Uyumlu
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-slate-500">
                      Bu ürün Opel, Peugeot, Citroën, Chevrolet ve DS grubu araçlarla evrensel uyumludur.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content 2: Çapraz OEM Numaraları Tablosu */}
      {activeTab === 'oem' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Bu parçanın üretici ve yetkili servis referans kodları aşağıda listelenmiştir. Aracınızın eski parçası üzerindeki numara ile karşılaştırabilirsiniz:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {crossRefNumbers.map((item, index) => (
              <div
                key={index}
                className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between font-mono"
              >
                <div>
                  <span className="text-[10px] text-slate-500 block font-sans font-bold uppercase">{item.brand}</span>
                  <span className="font-extrabold text-slate-900 dark:text-white text-sm">{item.code}</span>
                </div>
                <span className="bg-amber-400/20 text-amber-500 text-[10px] font-black px-2 py-1 rounded">
                  REFERANS
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 3: Genel Açıklama & Teknik Özellikler */}
      {activeTab === 'desc' && (
        <div className="space-y-4 text-xs">
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 leading-relaxed text-slate-700 dark:text-slate-300">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-sm">Ürün Detayı</h4>
            <p>{product.description}</p>
          </div>

          {product.technical_description && (
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-amber-400/30 leading-relaxed text-slate-700 dark:text-slate-300">
              <h4 className="font-bold text-amber-500 mb-2 text-sm flex items-center gap-1.5">
                <Wrench className="w-4 h-4" />
                <span>Teknik Montaj ve Uyumluluk Notu</span>
              </h4>
              <p>{product.technical_description}</p>
            </div>
          )}

          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">{key}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
