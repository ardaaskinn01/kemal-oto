import { Category, Product } from '../types/database.types';
import { SAMPLE_CATEGORIES, SAMPLE_PRODUCTS } from './utils';

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
  let products = [...SAMPLE_PRODUCTS];

  if (options?.featuredOnly) {
    products = products.filter((p) => p.is_featured);
  }

  if (options?.categorySlug) {
    products = products.filter((p) => p.category_slug === options.categorySlug);
  }

  if (options?.quality) {
    if (options.quality === 'original') {
      products = products.filter((p) => p.is_original);
    } else if (options.quality === 'aftermarket') {
      products = products.filter((p) => !p.is_original);
    }
  }

  if (options?.inStock) {
    products = products.filter((p) => p.stock > 0);
  }

  if (options?.minPrice !== undefined && !isNaN(options.minPrice)) {
    products = products.filter((p) => (p.discount_price || p.price) >= options.minPrice!);
  }

  if (options?.maxPrice !== undefined && !isNaN(options.maxPrice)) {
    products = products.filter((p) => (p.discount_price || p.price) <= options.maxPrice!);
  }

  if (options?.searchQuery) {
    const q = options.searchQuery.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.part_number.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.vehicle_compatibility.some(
          (vc) =>
            vc.brand.toLowerCase().includes(q) ||
            vc.model.toLowerCase().includes(q)
        )
    );
  }

  // Araç Marka/Model veya Şasi Filtresi
  if (options?.brand) {
    const brandQ = options.brand.toLowerCase();
    const modelQ = options?.model ? options.model.toLowerCase() : '';

    products = products.filter((p) => {
      // 1. Evrensel Uyumlu parçalar her zaman uyar
      const hasUniversal = p.vehicle_compatibility.some((vc) =>
        vc.brand.toLowerCase().includes('evrensel')
      );
      if (hasUniversal) return true;

      // 2. Marka ve Model eşleşmesi
      return p.vehicle_compatibility.some((vc) => {
        const brandMatch = vc.brand.toLowerCase().includes(brandQ);
        if (!brandMatch) return false;
        if (modelQ) {
          return vc.model.toLowerCase().includes(modelQ);
        }
        return true;
      });
    });
  }

  // Sıralama Seçenekleri
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
  const product = SAMPLE_PRODUCTS.find((p) => p.slug === slug);
  return product || null;
}

export async function getCategories(): Promise<Category[]> {
  return SAMPLE_CATEGORIES;
}
