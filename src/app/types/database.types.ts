export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  category_slug: string;
  brand: string;
  part_number: string;
  vehicle_compatibility: {
    brand: string;
    model: string;
    years: string;
  }[];
  price: number;
  discount_price?: number;
  stock: number;
  image_url: string;
  description: string;
  specs: Record<string, string>;
  rating: number;
  reviews_count: number;
  is_featured?: boolean;
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
}

export interface Order {
  id: string;
  user_id: string;
  created_at: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: {
    product_id: string;
    title: string;
    price: number;
    quantity: number;
  }[];
}
