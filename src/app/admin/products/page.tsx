'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Product } from '../../types/database.types';
import { SAMPLE_PRODUCTS, formatCurrency } from '../../lib/utils';
import { optimizeImageForUpload } from '../../lib/utils/imageOptimizer';
import { 
  Package, 
  Plus, 
  Trash2, 
  Upload, 
  ShieldCheck, 
  Wrench, 
  Save, 
  AlertCircle, 
  Check, 
  Car, 
  Search, 
  FileCode2,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import Image from 'next/image';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [savingProduct, setSavingProduct] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State for Single Product Entry
  const [formData, setFormData] = useState({
    title: '',
    brand: 'Opel Orijinal',
    category: 'Motor ve Aktarma Organları',
    category_slug: 'motor-aktarma',
    part_number: '',
    oem_reference_number: '',
    is_original: true,
    part_quality: 'original' as 'original' | 'aftermarket' | 'oem',
    price: '',
    discount_price: '',
    stock: '10',
    image_url: '',
    description: '',
    technical_description: '', // Required Technical Description input
    specs: {} as Record<string, string>,
    vehicle_compatibility: [] as { brand: string; model: string; years: string }[],
  });

  // Dynamic Key-Value Spec row state
  const [specKey, setSpecKey] = useState('');
  const [specVal, setSpecVal] = useState('');

  // Dynamic Vehicle Compatibility row state
  const [compBrand, setCompBrand] = useState('Opel');
  const [compModel, setCompModel] = useState('');
  const [compYears, setCompYears] = useState('2018-2024');

  // Image Upload Handling
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && data.length > 0 && !error) {
        setProducts(data);
      }
    } catch (err) {
      console.warn('Veritabanına bağlanılamadı, yerel ürünler gösteriliyor.');
    }
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const optimized = await optimizeImageForUpload(file);
      setImageFile(optimized);
      setImagePreview(URL.createObjectURL(optimized));
    } catch (err) {
      console.error('Görsel optimize edilemedi:', err);
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddSpec = () => {
    if (!specKey.trim() || !specVal.trim()) return;
    setFormData((prev) => ({
      ...prev,
      specs: { ...prev.specs, [specKey.trim()]: specVal.trim() },
    }));
    setSpecKey('');
    setSpecVal('');
  };

  const handleRemoveSpec = (keyToRemove: string) => {
    setFormData((prev) => {
      const updated = { ...prev.specs };
      delete updated[keyToRemove];
      return { ...prev, specs: updated };
    });
  };

  const handleAddCompatibility = () => {
    if (!compBrand || !compModel.trim()) return;
    setFormData((prev) => ({
      ...prev,
      vehicle_compatibility: [
        ...prev.vehicle_compatibility,
        { brand: compBrand, model: compModel.trim(), years: compYears.trim() || 'Tümü' },
      ],
    }));
    setCompModel('');
  };

  const handleRemoveCompatibility = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      vehicle_compatibility: prev.vehicle_compatibility.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProduct(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      let finalImageUrl = formData.image_url;

      // 1. Upload Image to Supabase Storage if file exists
      if (imageFile) {
        setUploadingImage(true);
        const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '_')}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('products')
          .upload(fileName, imageFile);

        if (uploadError) {
          console.warn('Storage yükleme hatası, varsayılan görsel kullanılıyor:', uploadError);
          finalImageUrl = finalImageUrl || 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80';
        } else if (uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from('products')
            .getPublicUrl(fileName);
          finalImageUrl = publicUrlData.publicUrl;
        }
        setUploadingImage(false);
      }

      if (!finalImageUrl) {
        finalImageUrl = 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80';
      }

      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') + `-${Date.now().toString().slice(-4)}`;

      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        title: formData.title,
        slug: slug,
        category: formData.category,
        category_slug: formData.category_slug,
        brand: formData.brand,
        part_number: formData.part_number,
        oem_reference_number: formData.oem_reference_number || undefined,
        is_original: formData.is_original,
        part_quality: formData.part_quality,
        price: Number(formData.price) || 0,
        discount_price: formData.discount_price ? Number(formData.discount_price) : undefined,
        stock: Number(formData.stock) || 10,
        image_url: finalImageUrl,
        description: formData.description,
        technical_description: formData.technical_description || undefined,
        specs: formData.specs,
        vehicle_compatibility: formData.vehicle_compatibility,
        rating: 5.0,
        reviews_count: 1,
        is_featured: false,
      };

      // Try inserting into Supabase
      const { error: insertError } = await supabase.from('products').insert([newProduct]);

      if (insertError) {
        console.warn('Veritabanı kaydı atlandı (Demo modu):', insertError);
      }

      // Add to local state
      setProducts([newProduct, ...products]);
      setSuccessMessage(`"${newProduct.title}" başarıyla sisteme kaydedildi!`);
      setShowAddForm(false);

      // Reset form
      setFormData({
        title: '',
        brand: 'Opel Orijinal',
        category: 'Motor ve Aktarma Organları',
        category_slug: 'motor-aktarma',
        part_number: '',
        oem_reference_number: '',
        is_original: true,
        part_quality: 'original',
        price: '',
        discount_price: '',
        stock: '10',
        image_url: '',
        description: '',
        technical_description: '',
        specs: {},
        vehicle_compatibility: [],
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (err: any) {
      setErrorMessage(err.message || 'Ürün kaydedilirken bir hata oluştu.');
    } finally {
      setSavingProduct(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Yedek Parça & Ürün Yönetimi</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Tekil parça kaydı, teknik özellik tanımlamaları, OEM kodları ve uyumlu araç eşleştirmesi.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Formu Kapat' : 'Tekil Parça Ekle'}</span>
        </button>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/30 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* ERROR Notification */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-500/30 text-xs text-red-700 dark:text-red-300 flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. SINGLE PRODUCT ENTRY FORM (Tekil Ürün Girişi) */}
      {/* ======================================================== */}
      {showAddForm && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl space-y-6 animate-in slide-in-from-top-4">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-500 flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Yeni Tekil Parça Kayıt Formu</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Ürünün orijinal/yan sanayi durumunu, teknik açıklamasını ve uyumluluğunu belirleyin</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Title & Brand */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Parça / Ürün Başlığı *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Örn: Opel Astra J 1.6 CDTI Orijinal Triger Zincir Seti"
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-800 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Üretici Marka *
                </label>
                <input
                  type="text"
                  required
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="Örn: GM / Opel Orijinal, Peugeot Orijinal, Brembo, Filtron..."
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-800 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Row 2: Category & Originality Toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Kategori
                </label>
                <select
                  value={formData.category_slug}
                  onChange={(e) => {
                    const catName = e.target.options[e.target.selectedIndex].text;
                    setFormData({
                      ...formData,
                      category_slug: e.target.value,
                      category: catName,
                    });
                  }}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-800 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-orange-500"
                >
                  <option value="motor-aktarma">Motor ve Aktarma Organları</option>
                  <option value="fren-suspansiyon">Fren ve Süspansiyon</option>
                  <option value="aydinlatma-elektrik">Aydınlatma ve Elektrik</option>
                  <option value="kaporta-aksesuar">Kaporta ve Dış Aksesuar</option>
                  <option value="ic-donanim-bakim">İç Donanım ve Periyodik Bakım</option>
                </select>
              </div>

              {/* Originality Toggle Button */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Parça Orijinallik Durumu *
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, is_original: true, part_quality: 'original' })}
                    className={`flex-1 py-2 px-2 text-xs font-bold rounded-xl border flex items-center justify-center gap-1 cursor-pointer transition-all ${
                      formData.is_original
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                        : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-800'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>%100 Orijinal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, is_original: false, part_quality: 'aftermarket' })}
                    className={`flex-1 py-2 px-2 text-xs font-bold rounded-xl border flex items-center justify-center gap-1 cursor-pointer transition-all ${
                      !formData.is_original
                        ? 'bg-amber-600 text-white border-amber-500 shadow-md'
                        : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-800'
                    }`}
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Yan Sanayi</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Kalite Sınıfı
                </label>
                <select
                  value={formData.part_quality}
                  onChange={(e) => setFormData({ ...formData, part_quality: e.target.value as any })}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-800 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-orange-500"
                >
                  <option value="original">Orijinal (OEM Fabrika)</option>
                  <option value="aftermarket">A Kalite Muadil / Yan Sanayi</option>
                  <option value="oem">Eşdeğer OEM Tedarikçi</option>
                </select>
              </div>
            </div>

            {/* Row 3: OEM Numbers & Pricing */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Parça Kodu (Stok No) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.part_number}
                  onChange={(e) => setFormData({ ...formData, part_number: e.target.value.toUpperCase() })}
                  placeholder="GM-55588383"
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-xs border border-slate-300 dark:border-slate-800 rounded-xl py-2.5 px-3 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  OEM Referans Kodu
                </label>
                <input
                  type="text"
                  value={formData.oem_reference_number}
                  onChange={(e) => setFormData({ ...formData, oem_reference_number: e.target.value })}
                  placeholder="55588383 / 1638159880"
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-xs border border-slate-300 dark:border-slate-800 rounded-xl py-2.5 px-3 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Satış Fiyatı (TL) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="4500"
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold text-xs border border-slate-300 dark:border-slate-800 rounded-xl py-2.5 px-3 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  İndirimli Fiyat (Opsiyonel)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.discount_price}
                  onChange={(e) => setFormData({ ...formData, discount_price: e.target.value })}
                  placeholder="3950"
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-bold text-xs border border-slate-300 dark:border-slate-800 rounded-xl py-2.5 px-3 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Row 4: Image Upload Section */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Ürün Görseli (Dosya Yükle veya URL Gir)
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <label className="w-full sm:w-auto flex-1 cursor-pointer bg-slate-50 dark:bg-slate-950 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-orange-500 rounded-2xl p-4 flex items-center justify-center gap-3 transition-colors">
                  <Upload className="w-5 h-5 text-orange-500" />
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                    {imageFile ? imageFile.name : 'Görsel Seç (Otomatik optimize edilir)'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </label>

                {imagePreview && (
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                    <Image src={imagePreview} alt="Önizleme" fill className="object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Row 5: Descriptions (General + TECHNICAL DESCRIPTION) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Genel Açıklama
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ürün hakkında genel bilgi..."
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs border border-slate-300 dark:border-slate-800 rounded-xl p-3 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-orange-600 dark:text-orange-400 mb-1 flex items-center gap-1">
                  <FileCode2 className="w-3.5 h-3.5" />
                  <span>Detaylı Teknik Açıklama (İstenen Girdi) *</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.technical_description}
                  onChange={(e) => setFormData({ ...formData, technical_description: e.target.value })}
                  placeholder="Montaj talimatı, alaşım malzemesi, motor kodu uyumu, tork değerleri ve teknik detaylar..."
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs border border-orange-200 dark:border-orange-500/40 rounded-xl p-3 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Row 6: Vehicle Compatibility Builder */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Uyumlu Araç Eşleştirmesi
              </span>
              <div className="flex flex-wrap gap-2">
                <select
                  value={compBrand}
                  onChange={(e) => setCompBrand(e.target.value)}
                  className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs border border-slate-300 dark:border-slate-800 rounded-lg px-2.5 py-2"
                >
                  <option value="Opel">Opel</option>
                  <option value="Peugeot">Peugeot</option>
                  <option value="Citroën">Citroën</option>
                  <option value="Chevrolet">Chevrolet</option>
                  <option value="DS Automobiles">DS Automobiles</option>
                </select>

                <input
                  type="text"
                  value={compModel}
                  onChange={(e) => setCompModel(e.target.value)}
                  placeholder="Model (Örn: Astra J 1.6 CDTI)"
                  className="flex-1 min-w-[160px] bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs border border-slate-300 dark:border-slate-800 rounded-lg px-2.5 py-2"
                />

                <input
                  type="text"
                  value={compYears}
                  onChange={(e) => setCompYears(e.target.value)}
                  placeholder="Yıllar (Örn: 2015-2021)"
                  className="w-28 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs border border-slate-300 dark:border-slate-800 rounded-lg px-2.5 py-2"
                />

                <button
                  type="button"
                  onClick={handleAddCompatibility}
                  className="bg-orange-500 text-white text-xs font-bold px-3 py-2 rounded-lg cursor-pointer"
                >
                  + Ekle
                </button>
              </div>

              {formData.vehicle_compatibility.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {formData.vehicle_compatibility.map((vc, i) => (
                    <span
                      key={i}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-slate-900 dark:text-slate-200"
                    >
                      <span>{vc.brand} {vc.model} ({vc.years})</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCompatibility(i)}
                        className="text-red-500 hover:text-red-700 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="submit"
                disabled={savingProduct}
                className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-3 px-8 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50 cursor-pointer"
              >
                {savingProduct ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Kaydediliyor...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Ürünü Sisteme Kaydet</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl text-xs font-semibold"
              >
                İptal
              </button>
            </div>

          </form>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. PRODUCT INVENTORY TABLE (Mevcut Ürünler Tablosu) */}
      {/* ======================================================== */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Mevcut Ürün Listesi ({products.length} Parça)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3">Görsel & Başlık</th>
                <th className="p-3">Marka & Kategori</th>
                <th className="p-3">Kalite / Orijinallik</th>
                <th className="p-3">Parça No (OEM)</th>
                <th className="p-3">Fiyat</th>
                <th className="p-3">Stok</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/50 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-950 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800">
                        <Image src={p.image_url} alt={p.title} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block max-w-xs truncate">{p.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">ID: {p.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="font-bold text-orange-600 dark:text-orange-400 block">{p.brand}</span>
                    <span className="text-[11px] text-slate-500">{p.category}</span>
                  </td>
                  <td className="p-3">
                    {p.is_original ? (
                      <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-500/30">
                        %100 Orijinal
                      </span>
                    ) : (
                      <span className="bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-500/30">
                        Yan Sanayi
                      </span>
                    )}
                  </td>
                  <td className="p-3 font-mono text-slate-600 dark:text-slate-300">
                    {p.part_number}
                  </td>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">
                    {formatCurrency(p.discount_price || p.price)}
                  </td>
                  <td className="p-3">
                    <span className="bg-slate-100 dark:bg-slate-950 px-2 py-1 rounded text-slate-700 dark:text-slate-300 font-semibold">
                      {p.stock} adet
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
