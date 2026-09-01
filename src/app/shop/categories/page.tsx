import React from 'react';
import { getCategories } from '../../lib/actions';
import { CategoryCard } from '../../components/ui/CategoryCard';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      
      {/* Breadcrumb & Header */}
      <div className="border-b border-gray-200 dark:border-[#2a2d35] pb-4">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
          <Link href="/" className="hover:text-[#E8820C] transition-colors">Ana Sayfa</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-700 dark:text-gray-200 font-medium">Kategoriler</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Yedek Parça Kategorileri
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Opel, Peugeot, Citroën, Chevrolet ve DS grubu araçlarınızın tüm aksam ve donanım kategorileri
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
}
