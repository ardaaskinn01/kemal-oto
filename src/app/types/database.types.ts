export type PartQuality = 'original' | 'aftermarket' | 'oem';

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  category_slug: string;
  brand: string;
  part_number: string;
  oem_reference_number?: string;
  is_original: boolean; // true: Orijinal Parça, false: Yan Sanayi / Muadil
  part_quality: PartQuality;
  vehicle_compatibility: {
    brand: string;
    model: string;
    years: string;
  }[];
  price: number;
  discount_price?: number;
  stock: number;
  image_url: string;
  additional_images?: string[];
  description: string;
  technical_description?: string; // Admin panelinden girilen detaylı teknik açıklama
  specs: Record<string, string>;
  rating: number;
  reviews_count: number;
  is_featured?: boolean;
  weight_kg?: number;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  icon_name: string;
  item_count: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  address?: string;
  role: 'customer' | 'admin';
  avatar_url?: string;
  created_at?: string;
}

export interface Order {
  id: string;
  user_id: string;
  created_at: string;
  total_amount: number;
  payment_status: 'pending' | 'paid' | 'failed';
  shipping_status: 'pending' | 'shipped' | 'delivered';
  tracking_number?: string;
  vin?: string;
  vehicle_model?: string;
  shipping_address: {
    full_name: string;
    phone: string;
    address: string;
    city: string;
    district?: string;
    country?: string;
    zip_code?: string;
  };
  contact_info?: {
    email: string;
    phone: string;
    first_name?: string;
    last_name?: string;
  };
  items: {
    product_id: string;
    title: string;
    part_number?: string;
    price: number;
    quantity: number;
    is_original?: boolean;
  }[];
}
