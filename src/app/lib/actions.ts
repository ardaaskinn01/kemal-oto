import { Category, Product } from '../types/database.types';
import { createClient } from '@supabase/supabase-js';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

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
    if (supabase) {
      let query = supabase.from('products').select('*');

      if (options?.featuredOnly) {
        query = query.eq('is_featured', true);
      }
      if (options?.categorySlug) {
        query = query.eq('category_slug', options.categorySlug);
      }

      const { data, error } = await query;

      if (data && !error && data.length > 0) {
        products = data as Product[];
      }
    }
  } catch (e) {
    products = [];
  }

  // Fallback to INITIAL_PRODUCTS when database is empty or not seeded
  if (products.length === 0) {
    products = [...INITIAL_PRODUCTS];
    if (options?.featuredOnly) {
      products = products.filter((p) => p.is_featured);
    }
    if (options?.categorySlug) {
      products = products.filter((p) => p.category_slug === options.categorySlug);
    }
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
        (p.oem_reference_number && p.oem_reference_number.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q) ||
        (p.vehicle_compatibility && p.vehicle_compatibility.some(
          (vc) =>
            vc.brand.toLowerCase().includes(q) ||
            vc.model.toLowerCase().includes(q)
        ))
    );
  }

  // Brand & Model filter (Supporting Opel, Peugeot, Citroën, Chevrolet, DS and Diğer Markalar)
  if (options?.brand) {
    const brandQ = options.brand.toLowerCase().trim();
    const modelQ = options?.model ? options.model.toLowerCase().trim() : '';
    const isOtherBrands = brandQ.includes('diger') || brandQ.includes('diğer');

    products = products.filter((p) => {
      if (isOtherBrands) {
        const brandMatch = p.brand.toLowerCase().includes('diger') || p.brand.toLowerCase().includes('diğer');
        const otherCarCheck = ['fiat', 'renault', 'volkswagen', 'audi', 'seat', 'skoda', 'ford'].some(
          (b) => p.brand.toLowerCase().includes(b) || (p.vehicle_compatibility && p.vehicle_compatibility.some((vc) => vc.brand.toLowerCase().includes(b)))
        );
        if (!brandMatch && !otherCarCheck) return false;
        if (modelQ) {
          return p.vehicle_compatibility && p.vehicle_compatibility.some((vc) => vc.model.toLowerCase().includes(modelQ));
        }
        return true;
      }

      // Direct match on product.brand
      const directBrandMatch = p.brand.toLowerCase().includes(brandQ);
      if (directBrandMatch) {
        if (modelQ) {
          return p.vehicle_compatibility && p.vehicle_compatibility.some((vc) => vc.model.toLowerCase().includes(modelQ));
        }
        return true;
      }

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

  const local = INITIAL_PRODUCTS.find((p) => p.slug === slug);
  return local || null;
}

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'İç Donanım & Periyodik Bakım',
    slug: 'ic-donanim-bakim',
    description: 'Yağ, hava, yakıt, polen filtreleri ve periyodik bakım sarf malzemeleri.',
    image_url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=800',
    icon_name: 'Wrench',
    item_count: 0,
  },
  {
    id: 'cat-2',
    name: 'Fren & Süspansiyon Sistemleri',
    slug: 'fren-suspansiyon',
    description: 'Ön ve arka fren diskleri, balatalar, amortisörler ve helezon yaylar.',
    image_url: 'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?auto=format&fit=crop&q=80&w=800',
    icon_name: 'Disc',
    item_count: 0,
  },
  {
    id: 'cat-3',
    name: 'Motor & Aktarma Organları',
    slug: 'motor-aktarma',
    description: 'Triger setleri, devirdaim pompaları, termostatlar, baskı balata ve şanzıman parçaları.',
    image_url: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=800',
    icon_name: 'Cpu',
    item_count: 0,
  },
  {
    id: 'cat-4',
    name: 'Aydınlatma & Elektrik Aksamı',
    slug: 'aydinlatma-elektrik',
    description: 'Farlar, stop lambaları, sinyal lambaları, sensörler, bujiler ve akü bağlantıları.',
    image_url: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&q=80&w=800',
    icon_name: 'Zap',
    item_count: 0,
  },
  {
    id: 'cat-5',
    name: 'Kaporta & Dış Aksesuar',
    slug: 'kaporta-aksesuar',
    description: 'Tamponlar, çamurluklar, ızgaralar, aynalar ve dış gövde koruma aksesuarları.',
    image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
    icon_name: 'Package',
    item_count: 0,
  },
];

export async function getCategories(): Promise<Category[]> {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return DEFAULT_CATEGORIES;

    // 1. Try fetching from categories table
    const { data: dbCategories, error } = await supabase.from('categories').select('*');
    
    // 2. Fetch products to get accurate live item counts
    const { data: products } = await supabase.from('products').select('category_slug');
    const countMap: Record<string, number> = {};
    const prodsForCount = (products && products.length > 0) ? products : INITIAL_PRODUCTS.map((p) => ({ category_slug: p.category_slug }));
    prodsForCount.forEach((p: { category_slug: string }) => {
      if (p.category_slug) {
        countMap[p.category_slug] = (countMap[p.category_slug] || 0) + 1;
      }
    });

    if (dbCategories && dbCategories.length > 0 && !error) {
      return dbCategories.map((c: Category) => ({
        ...c,
        item_count: countMap[c.slug] ?? c.item_count ?? 0,
      }));
    }

    // 3. If categories table is empty or missing in Supabase, return standard categories with live product counts
    return DEFAULT_CATEGORIES.map((c) => ({
      ...c,
      item_count: countMap[c.slug] || 0,
    }));
  } catch (e) {
    return DEFAULT_CATEGORIES;
  }
}
