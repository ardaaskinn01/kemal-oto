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
      className="group border border-gray-200 dark:border-[#2a2d35] bg-white dark:bg-[#111318] rounded-xl p-5 hover:border-[#E8820C] transition-all flex flex-col justify-between shadow-sm"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-11 h-11 rounded-lg bg-orange-50 dark:bg-orange-950/30 text-[#E8820C] flex items-center justify-center shrink-0 group-hover:bg-[#E8820C] group-hover:text-white transition-colors">
            <IconComponent className="w-5 h-5 stroke-[2]" />
          </div>
          {category.item_count > 0 ? (
            <span className="text-[11px] font-mono font-semibold text-[#E8820C] bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded">
              {category.item_count} Parça
            </span>
          ) : (
            <span className="text-[10px] font-semibold text-gray-400 bg-gray-100 dark:bg-[#1e2128] px-2 py-0.5 rounded">
              Kategori
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#E8820C] transition-colors leading-snug mb-1.5">
          {category.name}
        </h3>

        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-gray-100 dark:border-[#1e2128] flex items-center justify-between text-xs font-semibold text-[#E8820C]">
        <span>Parçaları Listele</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
