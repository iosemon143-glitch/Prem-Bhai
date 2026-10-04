import React, { useState, useEffect } from 'react';
import { Flame, ShieldCheck, Truck, Zap, Percent, Search, Clock, Sparkles } from 'lucide-react';

interface DarazHeroBannerProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const DarazHeroBanner: React.FC<DarazHeroBannerProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  // Live dynamic countdown timer for flash deals
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="space-y-4">
      {/* Mobile Search Input */}
      <div className="md:hidden relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="দারাজ পণ্য সার্চ করুন..."
          className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/90 border border-slate-200/90 text-slate-900 text-xs font-semibold outline-none shadow-sm focus:border-[#f85606]"
        />
      </div>

      {/* Main Apple-Grade Liquid Glass Hero Pavilion */}
      <div className="relative rounded-[32px] overflow-hidden ios-hero-glass p-6 sm:p-10 lg:p-12 transition-all duration-500">
        {/* Ambient Specular & Flame Light Glow */}
        <div className="absolute top-0 right-0 w-[420px] h-[340px] bg-gradient-to-bl from-[#f85606]/20 via-[#ff6a1f]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-gradient-to-tr from-amber-400/15 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text & CTA */}
          <div className="lg:col-span-8 space-y-4">
            {/* Top Glass Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white text-xs font-bold text-[#f85606] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#f85606] animate-ping" />
              <span>দারাজ মেগা ফ্ল্যাশ সেল ও ক্যাশব্যাক অফার</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12] text-balance">
              সেরা পণ্য কিনুন দারাজ থেকে —{' '}
              <span className="bg-gradient-to-r from-[#f85606] via-[#ff5b14] to-[#ff3b30] bg-clip-text text-transparent">
                সরাসরি ডিসকাউন্ট ও নিশ্চিত ক্যাশ অন ডেলিভারি
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl leading-relaxed">
              পছন্দের পণ্যের ছবির নিচে থাকা <strong className="text-slate-900 font-bold">"Buy Now (দারাজে কিনুন)"</strong> বাটনে ক্লিক করলেই সরাসরি দারাজে চলে যাবেন এবং ১০০% আসল পণ্য দ্রুত ডেলিভারিতে পাবেন।
            </p>

            {/* Three iOS Trust Cards */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-xs flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#f85606] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Daraz Mall</div>
                  <div className="text-[11px] text-slate-500 font-medium">১০০% ভেরিফাইড বিক্রেতা</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-xs flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">হোম ডেলিভারি</div>
                  <div className="text-[11px] text-slate-500 font-medium">ক্যাশ অন ডেলিভারি সুবিধা</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-xs flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Percent className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">সর্বোচ্চ ছাড়</div>
                  <div className="text-[11px] text-slate-500 font-medium">৭০% পর্যন্ত অফার মূল্য</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Live Flash Deals Urgency Card */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-2xl border border-white shadow-xl shadow-[#f85606]/10 space-y-4 text-center">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#f85606]">
                <Flame className="w-4 h-4 animate-flame" />
                <span>আজকের মেগা ডিলস সময়</span>
              </div>

              {/* Countdown Numbers */}
              <div className="flex items-center justify-center gap-2">
                <div className="bg-slate-900 text-white rounded-2xl p-2.5 min-w-[54px] shadow-sm">
                  <span className="text-2xl font-black tabular-nums">{formatNumber(timeLeft.hours)}</span>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">ঘণ্টা</span>
                </div>
                <span className="text-xl font-black text-slate-400">:</span>
                <div className="bg-slate-900 text-white rounded-2xl p-2.5 min-w-[54px] shadow-sm">
                  <span className="text-2xl font-black tabular-nums">{formatNumber(timeLeft.minutes)}</span>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">মিনিট</span>
                </div>
                <span className="text-xl font-black text-slate-400">:</span>
                <div className="bg-[#f85606] text-white rounded-2xl p-2.5 min-w-[54px] shadow-sm">
                  <span className="text-2xl font-black tabular-nums">{formatNumber(timeLeft.seconds)}</span>
                  <span className="block text-[10px] text-orange-200 uppercase font-semibold">সেকেন্ড</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 font-semibold">
                স্টক শেষ হওয়ার আগেই দারাজ থেকে সরাসরি অফার উপভোগ করুন
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Bar: Apple-Style Liquid Glass Segmented Controls */}
      <div className="ios-glass-card p-2 rounded-2xl flex items-center gap-2 overflow-x-auto scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap active:scale-95 ${
                isSelected
                  ? 'bg-gradient-to-r from-[#f85606] to-[#ff5b14] text-white shadow-md shadow-[#f85606]/20'
                  : 'bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 border border-white/80 shadow-xs'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
