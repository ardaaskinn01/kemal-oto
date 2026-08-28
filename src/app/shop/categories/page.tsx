import React from 'react';
import { getCategories } from '../../lib/actions';
import { CategoryCard } from '../../components/ui/CategoryCard';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Yedek Parça Kategorileri</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Aracınızın tüm aksam ve donanım kategorilerine göre hızlı erişim sağlayın.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
}
