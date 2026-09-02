import React from 'react';
import Link from 'next/link';
import { Category } from '../../types/database.types';
import { 
  ChevronRight, 
  Wrench, 
  Disc, 
  Cpu, 
  Zap, 
  Package, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

// Güvenilir yerel ikon eşleştirmesi
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'ic-donanim-bakim': Wrench,
  'fren-suspansiyon': Disc,
  'motor-aktarma': Cpu,
  'aydinlatma-elektrik': Zap,
  'kaporta-aksesuar': Package,
};

export function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = iconMap[category.slug] || Sparkles;

  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group border-2 border-slate-200 dark:border-[#2a2d35] bg-white dark:bg-[#111318] rounded-2xl p-6 hover:border-[#E8820C] transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-[#E8820C] flex items-center justify-center shrink-0 group-hover:bg-[#E8820C] group-hover:text-white transition-all shadow-sm">
            <IconComponent className="w-7 h-7 stroke-[2.5]" />
          </div>
          {category.item_count > 0 ? (
            <span className="text-xs font-mono font-black text-[#E8820C] bg-orange-50 dark:bg-orange-950/50 px-2.5 py-1 rounded-lg border border-orange-200 dark:border-orange-800/60">
              {category.item_count} Parça
            </span>
          ) : (
            <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-[#1e2128] px-2.5 py-1 rounded-lg">
              Kategori
            </span>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-[#E8820C] transition-colors leading-snug mb-2">
          {category.name}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="pt-4 mt-5 border-t-2 border-slate-100 dark:border-[#1e2128] flex items-center justify-between text-sm font-black text-[#E8820C]">
        <span>Parçaları Listele</span>
        <ArrowRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-1.5 transition-transform" />
      </div>
    </Link>
  );
}
