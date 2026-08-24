import { Category, Product } from '../types/database.types';
import { SAMPLE_CATEGORIES, SAMPLE_PRODUCTS } from './utils';

export async function getProducts(options?: {
  categorySlug?: string;
  searchQuery?: string;
  featuredOnly?: boolean;
}): Promise<Product[]> {
  let products = [...SAMPLE_PRODUCTS];

  if (options?.featuredOnly) {
    products = products.filter((p) => p.is_featured);
  }

  if (options?.categorySlug) {
    products = products.filter((p) => p.category_slug === options.categorySlug);
  }

  if (options?.searchQuery) {
    const q = options.searchQuery.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.part_number.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
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
