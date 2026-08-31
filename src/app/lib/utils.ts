import { Category, Product } from '../types/database.types';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 2,
  }).format(amount);
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Clean empty arrays (Mock data removed)
export const SAMPLE_CATEGORIES: Category[] = [];
export const SAMPLE_PRODUCTS: Product[] = [];
