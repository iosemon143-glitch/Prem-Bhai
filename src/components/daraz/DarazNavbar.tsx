import React from 'react';
import { PlusCircle, Sliders, Search, Flame, MousePointerClick, Sparkles } from 'lucide-react';
import { DarazAffiliateConfig } from '../../types/daraz';

interface DarazNavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalClicks: number;
  onOpenAddModal: () => void;
  onOpenSettingsModal: () => void;
  affiliateConfig: DarazAffiliateConfig;
  onSwitchMode?: () => void;
}

export const DarazNavbar: React.FC<DarazNavbarProps> = ({
  searchQuery,
  onSearchChange,
  totalClicks,
  onOpenAddModal,
  onOpenSettingsModal,
  affiliateConfig,
  onSwitchMode,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full ios-glass-nav transition-all duration-300">
      {/* Top iOS Ambient Micro Ribbon */}
      <div className="bg-gradient-to-r from-[#f85606] via-[#ff601c] to-[#ff3b30] text-white text-[11px] px-4 sm:px-8 py-1.5 flex items-center justify-between font-semibold shadow-xs">
        <div className="flex items-center gap-2">
          <Flame className="w-3.5 h-3.5 text-amber-200 animate-flame" />
          <span className="tracking-wide">দারাজ অফিসিয়াল অ্যাফিলিয়েট পার্টনার · ১০০% জেনুইন প্রোডাক্টস ও লাইভ ডিলস</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline opacity-90">
            আইডি: <strong className="text-white bg-white/20 px-1.5 py-0.5 rounded font-mono">{affiliateConfig.affiliateId}</strong>
          </span>
          <span className="hidden sm:inline opacity-60">·</span>
          <span className="flex items-center gap-1.5 bg-black/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-white font-bold">
            <MousePointerClick className="w-3 h-3 text-amber-300" />
            <span>দারাজ ক্লিক: {totalClicks}</span>
          </span>
        </div>
      </div>

      {/* Main Liquid Glass Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Lockup: Daraz Deals & Offers BD */}
        <div className="flex items-center gap-3 shrink-0">
          <a href="#" className="flex items-center gap-2.5 group">
            {/* Glowing Rounded Icon */}
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#f85606] to-[#ff6a1f] p-0.5 shadow-md shadow-[#f85606]/25 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center font-black text-xl text-[#f85606]">
                d
              </div>
            </div>

            {/* Typography: Daraz Deals & Offers BD */}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-[#f85606] transition-colors">
                  daraz
                </span>
                <span className="text-xs font-black tracking-wider uppercase bg-gradient-to-r from-[#f85606] to-[#ff3b30] text-white px-2 py-0.5 rounded-md shadow-xs animate-shimmer">
                  Deals & Offers BD
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wide hidden sm:block">
                অফিসিয়াল কমিশন স্টোর ও সেরা ডিসকাউন্ট
              </p>
            </div>
          </a>
        </div>

        {/* Live Search Bar with iOS Liquid Look */}
        <div className="flex-1 max-w-xl relative hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="দারাজ পণ্য, হেডফোন, স্মার্টওয়াচ বা মডেল সার্চ করুন..."
            className="w-full pl-11 pr-10 py-2.5 rounded-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-900 text-xs sm:text-sm font-semibold outline-none transition-all duration-300 border border-slate-200/80 focus:border-[#f85606] focus:ring-4 focus:ring-[#f85606]/15 shadow-inner placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold w-5 h-5 flex items-center justify-center bg-slate-200/80 rounded-full transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Add Product Button */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-gradient-to-r from-[#f85606] to-[#ff5b14] hover:from-[#e04a00] hover:to-[#f85606] text-white font-bold text-xs rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#f85606]/25 active:scale-95 whitespace-nowrap animate-shimmer"
            title="নতুন দারাজ প্রোডাক্ট যোগ করুন"
          >
            <PlusCircle className="w-4 h-4" />
            <span>প্রোডাক্ট যোগ করুন</span>
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettingsModal}
            className="p-2 sm:px-3 sm:py-2 bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 font-semibold text-xs rounded-full transition-colors flex items-center gap-1.5 border border-slate-200/70"
            title="অ্যাফিলিয়েট সেটিংস"
          >
            <Sliders className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden lg:inline">সেটিংস</span>
          </button>
        </div>
      </div>
    </header>
  );
};
