import React from 'react';
import { Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface GoShopHeroProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const GoShopHero: React.FC<GoShopHeroProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Mobile Search Bar */}
      <div className="md:hidden relative">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-[#0071e3] text-sm"></i>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products, posts..."
          className="w-full pl-11 pr-4 py-2.5 rounded-full border border-white/90 bg-white/90 text-slate-900 text-xs font-semibold outline-none shadow-sm focus:border-[#0071e3]"
        />
      </div>

      {/* Hero Section Container */}
      <section className="rounded-[32px] p-8 sm:p-12 lg:p-16 relative overflow-hidden liquid-glass">
        {/* Subtle decorative glowing orb */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#0071e3]/20 to-[#5e5ce6]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-white/90 text-xs font-bold text-[#0071e3] shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GoShop Liquid Glass 2026 Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] text-balance">
            Exclusive Collection.{' '}
            <span className="bg-gradient-to-r from-[#0071e3] to-[#5e5ce6] bg-clip-text text-transparent">
              Pure Liquid Glass.
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
            Explore our latest authentic posts, drops, and elite performance gear designed with unmatched Apple-grade aesthetics and absolute smoothness.
          </p>

          {/* Value Badges */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0071e3]" />
              <span>100% Genuine Authenticated</span>
            </div>
            <span className="text-slate-300">·</span>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#0071e3]" />
              <span>Express 24-48h Delivery</span>
            </div>
            <span className="text-slate-300">·</span>
            <div className="flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-[#0071e3]" />
              <span>7-Day Return Guarantee</span>
            </div>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap shadow-xs ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 border border-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
