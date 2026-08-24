import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '../../types/database.types';
import { ChevronRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group relative h-64 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 flex flex-col justify-end p-6 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300"
    >
      {/* Background Image */}
      <Image
        src={category.image_url}
        alt={category.name}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-40 group-hover:opacity-60"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 space-y-2">
        <span className="inline-block bg-orange-500/20 text-orange-400 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border border-orange-500/30">
          {category.item_count}+ Parça Çeşidi
        </span>
        <h3 className="text-xl font-extrabold text-white group-hover:text-orange-400 transition-colors flex items-center gap-2">
          {category.name}
          <ChevronRight className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
        </h3>
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
