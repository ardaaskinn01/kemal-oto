'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../types/database.types';
import { formatCurrency } from '../../lib/utils';
import { 
  ShoppingCart, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Wrench, 
  Truck, 
  Copy, 
  Check, 
  Navigation,
  Cpu,
  Layers
} from 'lucide-react';
import { useGarage } from '../../contexts/GarageContext';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

// Extract or infer realistic technical specifications for parts masters & mechanics
function getTechnicalSpecs(product: Product) {
  const specs = product.specs || {};
  
  // 1. OEM Part Code
  const oemCode = specs['OEM Kodu'] || product.oem_reference_number || product.part_number;

  // 2. Engine Compatibility (DV6, EP6, EB2, B16DTH, A14NET etc.)
  let engineCode = specs['Motor Uyumluluğu'] || specs['Motor'] || specs['Motor Kodu'] || '';
  if (!engineCode) {
    const text = (product.title + ' ' + (product.technical_description || '') + ' ' + product.description).toLowerCase();
    if (text.includes('1.6 hdi') || text.includes('bluehdi') || text.includes('dv6')) {
      engineCode = 'DV6 (1.6 HDi / BlueHDi)';
    } else if (text.includes('1.5 bluehdi') || text.includes('dv5')) {
      engineCode = 'DV5 (1.5 BlueHDi)';
    } else if (text.includes('1.2 puretech') || text.includes('eb2')) {
      engineCode = 'EB2 (1.2 PureTech)';
    } else if (text.includes('1.6 thp') || text.includes('ep6')) {
      engineCode = 'EP6 (1.6 THP / PureTech)';
    } else if (text.includes('1.6 cdti') || text.includes('b16dth')) {
      engineCode = 'B16DTH / D16DTI (1.6 CDTi)';
    } else if (text.includes('1.4 turbo') || text.includes('a14net')) {
      engineCode = 'A14NET / B14NET (1.4 Turbo)';
    } else if (text.includes('1.6') || text.includes('a16xer')) {
      engineCode = 'A16XER / A16LET (1.6 16V)';
    } else if (text.includes('cruze') || text.includes('f16d4')) {
      engineCode = 'F16D4 / A16XER (1.6 16V)';
    } else {
      engineCode = 'PSA & GM Standart Motorlar';
    }
  }

  // 3. Mounting Position / Direction
  let position = specs['Montaj Yönü'] || specs['Montaj Tarafı'] || specs['Konum'] || '';
  if (!position) {
    const text = (product.title + ' ' + product.category).toLowerCase();
    if (text.includes('ön') && text.includes('sağ')) position = 'Ön Sağ';
    else if (text.includes('ön') && text.includes('sol')) position = 'Ön Sol';
    else if (text.includes('arka') && text.includes('sağ')) position = 'Arka Sağ';
    else if (text.includes('arka') && text.includes('sol')) position = 'Arka Sol';
    else if (text.includes('ön') && text.includes('arka')) position = 'Ön & Arka Aks';
    else if (text.includes('ön')) position = 'Ön Aks (Çift Taraf)';
    else if (text.includes('arka')) position = 'Arka Aks (Çift Taraf)';
    else if (text.includes('filtre') || text.includes('yağ') || text.includes('hava') || text.includes('yakıt')) position = 'Motor Bölmesi';
    else if (text.includes('bobin') || text.includes('buji')) position = 'Silindir Kapağı / Üst';
    else if (text.includes('sensör') || text.includes('tpms')) position = 'Tekerlek / Aks Göbeği';
    else if (text.includes('balata') || text.includes('disk') || text.includes('fren')) position = 'Fren Kaliperi';
    else if (text.includes('debriyaj') || text.includes('volan')) position = 'Şanzıman Girişi';
    else position = 'Şasi & Mekanik Aksam';
  }

  // 4. Quality & Origin
  const isOriginal = product.is_original;
  const qualityBadge = isOriginal 
    ? 'Orijinal PSA / GM (OEM)' 
    : 'A Kalite E-Mark Onaylı Muadil';
  
  const manufacturer = specs['Üretici'] || (isOriginal ? `${product.brand} Orijinal` : 'OEM Eşdeğer Kalite');
  const origin = specs['Menşei'] || (isOriginal ? 'Fransa / Almanya' : 'Avrupa Standartları');

  // 5. Realistic Stock / Shelf Info
  const shelfLocation = product.stock > 4 
    ? 'Merkez Depo Rafı - Aynı Gün Kargo' 
    : product.stock > 0 
      ? `Son ${product.stock} Adet Depo Rafında` 
      : 'Tedarik Sürecinde';

  return {
    oemCode,
    engineCode,
    position,
    isOriginal,
    qualityBadge,
    manufacturer,
    origin,
    shelfLocation
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { activeVehicle, isProductCompatible } = useGarage();
  const { addToCart } = useCart();
  const [copied, setCopied] = useState(false);

  const discountPercent = product.discount_price
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  const compatibility = isProductCompatible(product);
  const technical = getTechnicalSpecs(product);

  const handleCopyOem = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (technical.oemCode) {
      navigator.clipboard.writeText(technical.oemCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="group relative bg-white dark:bg-[#111520] border-2 border-slate-200 dark:border-[#222a3a] rounded-2xl overflow-hidden hover:border-[#E8820C] dark:hover:border-[#E8820C] transition-all flex flex-col shadow-xs hover:shadow-xl">

      {/* Top Badges — Industrial Authority Labels */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-1.5 pointer-events-none">
        <div className="flex flex-wrap gap-1.5 pointer-events-auto">
          {technical.isOriginal ? (
            <span className="bg-slate-900/90 text-amber-400 border border-amber-500/40 text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs backdrop-blur-xs flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span>ORİJİNAL OEM</span>
            </span>
          ) : (
            <span className="bg-slate-900/90 text-slate-200 border border-slate-700 text-[11px] font-semibold px-2 py-0.5 rounded-md shadow-xs backdrop-blur-xs flex items-center gap-1">
              <Layers className="w-3 h-3 text-slate-400" />
              <span>A KALİTE MUADİL</span>
            </span>
          )}
        </div>

        {discountPercent > 0 && (
          <span className="bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs pointer-events-auto">
            -%{discountPercent} İSKONTO
          </span>
        )}
      </div>

      {/* Product Image Area */}
      <Link
        href={`/shop/products/${product.slug}`}
        className="block relative w-full h-44 sm:h-52 bg-slate-50 dark:bg-[#0b0e14] overflow-hidden border-b border-slate-200 dark:border-[#202738]"
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-700">
            <Wrench className="w-10 h-10 stroke-[1.8]" />
          </div>
        )}

        {/* Real-time Dispatch Shelf Pill */}
        <div className="absolute bottom-2 left-2 z-10">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-white/95 dark:bg-slate-900/90 border border-emerald-500/30 px-2 py-0.5 rounded shadow-xs backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="truncate max-w-[190px]">{technical.shelfLocation}</span>
          </span>
        </div>
      </Link>

      {/* Industrial Spec Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
        <div className="space-y-2.5">
          
          {/* Brand & Copyable OEM Part Code */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-[#E8820C] uppercase tracking-wide">
              {product.brand}
            </span>

            {/* Clickable Copy OEM Code Button */}
            <button
              type="button"
              onClick={handleCopyOem}
              title="OEM Kodunu Kopyala"
              className="group/btn inline-flex items-center gap-1 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#18202e] hover:bg-[#E8820C] hover:text-white px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <span className="text-slate-400 group-hover/btn:text-white font-sans text-[10px]">OEM:</span>
              <span className="tracking-tight">{technical.oemCode}</span>
              {copied ? (
                <Check className="w-3 h-3 text-emerald-500 group-hover/btn:text-white stroke-[3]" />
              ) : (
                <Copy className="w-3 h-3 text-slate-400 group-hover/btn:text-white" />
              )}
            </button>
          </div>

          {/* Product Title */}
          <Link href={`/shop/products/${product.slug}`} className="block group/title">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover/title:text-[#E8820C] transition-colors">
              {product.title}
            </h3>
          </Link>

          {/* Master / Usta Technical Details Grid */}
          <div className="bg-slate-50 dark:bg-[#151c28] border border-slate-200 dark:border-[#20293a] rounded-xl p-2.5 space-y-1.5 text-xs">
            {/* Engine Compatibility */}
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <Cpu className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="text-slate-400 text-[11px]">Motor:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate" title={technical.engineCode}>
                {technical.engineCode}
              </span>
            </div>

            {/* Mounting Position */}
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <Navigation className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="text-slate-400 text-[11px]">Konum:</span>
              <span className="font-medium text-slate-700 dark:text-slate-300 truncate">
                {technical.position}
              </span>
            </div>

            {/* Origin & Manufacturer */}
            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200/70 dark:border-[#222c3e] text-slate-500 dark:text-slate-400">
              <span className="truncate max-w-[140px]">Üretici: <strong className="text-slate-700 dark:text-slate-300">{technical.manufacturer}</strong></span>
              <span className="truncate">Menşei: <strong className="text-slate-700 dark:text-slate-300">{technical.origin}</strong></span>
            </div>
          </div>

          {/* Active Vehicle Garage Compatibility */}
          {activeVehicle ? (
            <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg w-full ${
              compatibility.compatible
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
            }`}>
              {compatibility.compatible ? (
                <>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="truncate">{activeVehicle.make} {activeVehicle.model} %100 Uyumlu</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span className="truncate">Seçili Araçla Uyumsuz</span>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E8820C] shrink-0" />
              <span>Sipariş öncesi 17 haneli şasi no ile teyit edilir</span>
            </div>
          )}

        </div>

        {/* Industrial Pricing & Action Button */}
        <div className="pt-3 border-t border-slate-100 dark:border-[#202738] space-y-2.5 mt-auto">
          <div className="flex items-end justify-between gap-2">
            <div>
              {product.discount_price ? (
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400 line-through font-medium">
                      {formatCurrency(product.price)}
                    </span>
                    <span className="text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-1 py-0.2 rounded">
                      İskontolu
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {formatCurrency(product.discount_price)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">KDV Dahil</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">KDV Dahil</span>
                </div>
              )}
            </div>

            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-[#18202e] px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 shrink-0">
              <Truck className="w-3 h-3 text-[#E8820C] shrink-0" />
              <span>Aynı Gün Sevk</span>
            </span>
          </div>

          {/* Add to Cart Action */}
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="w-full flex items-center justify-center gap-2 bg-[#E8820C] hover:bg-[#d07205] text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl transition-all active:scale-[0.99] shadow-xs cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Sepete Ekle</span>
          </button>
        </div>

      </div>
    </div>
  );
}
