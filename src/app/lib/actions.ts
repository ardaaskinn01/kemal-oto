import { Category, Product } from '../types/database.types';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

export async function getProducts(options?: {
  categorySlug?: string;
  searchQuery?: string;
  featuredOnly?: boolean;
  brand?: string;
  model?: string;
  vin?: string;
  quality?: string;
  inStock?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}): Promise<Product[]> {
  let products: Product[] = [];

  try {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    let query = supabase.from('products').select('*');

    if (options?.featuredOnly) {
      query = query.eq('is_featured', true);
    }
    if (options?.categorySlug) {
      query = query.eq('category_slug', options.categorySlug);
    }

    const { data, error } = await query;

    if (data && !error) {
      products = data as Product[];
    }
  } catch (e) {
    products = [];
  }

  // Quality filter
  if (options?.quality) {
    if (options.quality === 'original') {
      products = products.filter((p) => p.is_original);
    } else if (options.quality === 'aftermarket') {
      products = products.filter((p) => !p.is_original);
    }
  }

  // Stock filter
  if (options?.inStock) {
    products = products.filter((p) => p.stock > 0);
  }

  // Min / Max Price filter
  if (options?.minPrice !== undefined && !isNaN(options.minPrice)) {
    products = products.filter((p) => (p.discount_price || p.price) >= options.minPrice!);
  }
  if (options?.maxPrice !== undefined && !isNaN(options.maxPrice)) {
    products = products.filter((p) => (p.discount_price || p.price) <= options.maxPrice!);
  }

  // Search query filter
  if (options?.searchQuery) {
    const q = options.searchQuery.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.part_number.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.vehicle_compatibility && p.vehicle_compatibility.some(
          (vc) =>
            vc.brand.toLowerCase().includes(q) ||
            vc.model.toLowerCase().includes(q)
        ))
    );
  }

  // Brand & Model filter (Matching for Opel, Peugeot, Citroën, Chevrolet, DS)
  if (options?.brand) {
    const brandQ = options.brand.toLowerCase().trim();
    const modelQ = options?.model ? options.model.toLowerCase().trim() : '';

    products = products.filter((p) => {
      // Direct match on product.brand
      const directBrandMatch = p.brand.toLowerCase().includes(brandQ);
      if (directBrandMatch) return true;

      // Match vehicle_compatibility array
      if (p.vehicle_compatibility && p.vehicle_compatibility.length > 0) {
        const hasUniversal = p.vehicle_compatibility.some((vc) =>
          vc.brand.toLowerCase().includes('evrensel')
        );
        if (hasUniversal) return true;

        return p.vehicle_compatibility.some((vc) => {
          const brandMatch = vc.brand.toLowerCase().includes(brandQ) || brandQ.includes(vc.brand.toLowerCase());
          if (!brandMatch) return false;
          if (modelQ) {
            return vc.model.toLowerCase().includes(modelQ);
          }
          return true;
        });
      }

      return false;
    });
  }

  // Sorting
  if (options?.sort) {
    if (options.sort === 'price_asc') {
      products.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price));
    } else if (options.sort === 'price_desc') {
      products.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price));
    } else if (options.sort === 'newest') {
      products.reverse();
    } else if (options.sort === 'popular') {
      products.sort((a, b) => (b.reviews_count || 0) - (a.reviews_count || 0));
    }
  }

  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data } = await supabase.from('products').select('*').eq('slug', slug).single();
      if (data) return data as Product;
    }
  } catch (e) {}

  return null;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data } = await supabase.from('categories').select('*');
      if (data && data.length > 0) return data as Category[];
    }
  } catch (e) {}

  return [];
}
