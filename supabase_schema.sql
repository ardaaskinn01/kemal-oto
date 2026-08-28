-- =========================================================
-- KEMAL OTO - SUPABASE SQL KURULUM VE VERİTABANI ŞEMASI
-- =========================================================
-- Bu SQL kodlarını Supabase Dashboard -> SQL Editor alanına 
-- yapıştırıp "RUN" butonuna basarak tüm tabloları oluşturabilirsiniz.
-- =========================================================

-- 1. PROFILES TABLOSU (Müşteri ve Admin Rolleri)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT DEFAULT 'Müşteri',
  phone TEXT,
  address TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Güvenlik Politikaları (Profiles)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiller herkes tarafından okunabilir"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Kullanıcılar kendi profilini güncelleyebilir"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Kullanıcılar kendi profilini oluşturabilir"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 2. PRODUCTS TABLOSU (Orijinal / Yan Sanayi & Teknik Açıklama)
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  brand TEXT NOT NULL,
  part_number TEXT NOT NULL,
  oem_reference_number TEXT,
  is_original BOOLEAN DEFAULT true, -- true: Orijinal, false: Yan Sanayi
  part_quality TEXT DEFAULT 'original' CHECK (part_quality IN ('original', 'aftermarket', 'oem')),
  price NUMERIC NOT NULL,
  discount_price NUMERIC,
  stock INTEGER DEFAULT 10,
  weight_kg NUMERIC DEFAULT 1.0,
  image_url TEXT NOT NULL,
  additional_images JSONB DEFAULT '[]'::jsonb,
  description TEXT,
  technical_description TEXT, -- Admin panelden girilen detaylı teknik açıklama
  specs JSONB DEFAULT '{}'::jsonb, -- Key-Value teknik özellikler
  vehicle_compatibility JSONB DEFAULT '[]'::jsonb, -- Uyumlu araçlar listesi
  rating NUMERIC DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Güvenlik Politikaları (Products)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ürünler herkese açıktır"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Sadece adminler ürün ekleyebilir"
  ON public.products FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Sadece adminler ürün güncelleyebilir"
  ON public.products FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Sadece adminler ürün silebilir"
  ON public.products FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 3. ORDERS TABLOSU (Siparişler, Şasi & DHL Takip)
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  total_amount NUMERIC NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  shipping_status TEXT DEFAULT 'pending' CHECK (shipping_status IN ('pending', 'shipped', 'delivered')),
  tracking_number TEXT,
  vin TEXT, -- Şasi Numarası
  vehicle_model TEXT,
  shipping_address JSONB NOT NULL,
  contact_info JSONB,
  items JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Güvenlik Politikaları (Orders)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kullanıcılar kendi siparişlerini görebilir"
  ON public.orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Sipariş oluşturma"
  ON public.orders FOR INSERT
  WITH CHECK (true);

-- 4. SITE_SETTINGS TABLOSU (Kargo Ücretleri ve Site Parametreleri)
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site ayarları herkes tarafından okunabilir"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Sadece adminler site ayarlarını güncelleyebilir"
  ON public.site_settings FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Varsayılan Kargo Ayarları (2500 TL Üzeri Ücretsiz, Altı 150 TL)
INSERT INTO public.site_settings (key, value)
VALUES (
  'shipping_settings',
  '{"cost": 150, "freeThreshold": 2500, "carrier": "DHL Express"}'::jsonb
)
ON CONFLICT (key) DO NOTHING;

-- 5. STORAGE BUCKET (Ürün Görselleri)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Politikaları
CREATE POLICY "Ürün resimleri herkese açık"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'products');

CREATE POLICY "Adminler resim yükleyebilir"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'products');

-- =========================================================
-- KENDİNİZİ ADMIN YAPMAK İÇİN KULLANACAĞINIZ KOMUT:
-- (Siteden üye olduktan sonra aşağıdaki e-posta adresini kendi e-postanızla değiştirip çalıştırın)
-- =========================================================
-- UPDATE public.profiles 
-- SET role = 'admin' 
-- WHERE email = 'ornek@kemaloto.com';
