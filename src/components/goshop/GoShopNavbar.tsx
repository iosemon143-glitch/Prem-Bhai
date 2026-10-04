import React from 'react';
import { ShoppingBag, FileCode2, PlusCircle, LayoutGrid } from 'lucide-react';

interface GoShopNavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenXmlModal: () => void;
  onOpenAddProduct: () => void;
  currency: 'USD' | 'BDT';
  onToggleCurrency: () => void;
  onSwitchMode?: () => void;
}

export const GoShopNavbar: React.FC<GoShopNavbarProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  onOpenXmlModal,
  onOpenAddProduct,
  currency,
  onToggleCurrency,
  onSwitchMode,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between gap-4 liquid-glass border-b border-white/60">
      {/* Brand Logo */}
      <a href="#" className="flex items-center gap-3 text-decoration-none group">
        <i className="fa-solid fa-bolt-lightning text-[#0071e3] text-2xl animate-pulse-icon"></i>
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#0071e3] to-[#5e5ce6] bg-clip-text text-transparent">
          GoShop
        </span>
      </a>

      {/* Live Search Input */}
      <div className="flex-1 max-w-[540px] relative hidden md:block">
        <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-[#0071e3] text-base"></i>
        <input
          id="liveSearchInput"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search elite products, posts..."
          className="w-full pl-12 pr-6 py-3 rounded-full border border-white/90 bg-white/85 text-slate-900 text-sm font-semibold outline-none transition-all duration-300 shadow-inner focus:bg-white focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/15 placeholder:text-slate-400"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full w-5 h-5 flex items-center justify-center"
          >
            ×
          </button>
        )}
      </div>

      {/* Right Actions & Badges */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Live Store Pill Badge from Template */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 font-bold text-xs text-[#0071e3]">
          <i className="fa-solid fa-fire-flame-curved text-[#ff3b30]"></i>
          <span>Live Store</span>
        </div>

        {/* Currency Switcher */}
        <button
          onClick={onToggleCurrency}
          className="px-2.5 py-1.5 rounded-full bg-white/80 hover:bg-white border border-slate-200 text-xs font-bold text-slate-700 transition-colors shadow-xs"
          title="Toggle Currency"
        >
          {currency === 'USD' ? '$ USD' : '৳ BDT'}
        </button>

        {/* Add Product Button */}
        <button
          onClick={onOpenAddProduct}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white border border-slate-200 text-xs font-semibold text-slate-800 transition-all shadow-xs"
          title="Add New Product to Store"
        >
          <PlusCircle className="w-3.5 h-3.5 text-[#0071e3]" />
          <span className="hidden lg:inline">Add Product</span>
        </button>

        {/* Blogger XML Code Exporter */}
        <button
          onClick={onOpenXmlModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0071e3] hover:bg-[#0071e3]/90 text-white text-xs font-bold transition-all shadow-sm"
          title="View & Download Blogger XML Template"
        >
          <FileCode2 className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Blogger XML</span>
        </button>

        {/* Cart Trigger */}
        <button
          onClick={onOpenCart}
          className="relative p-2.5 rounded-full bg-white/90 hover:bg-white border border-slate-200 text-slate-800 transition-all shadow-xs"
          aria-label="View Shopping Cart"
        >
          <ShoppingBag className="w-4 h-4 text-[#0071e3]" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 text-[11px] font-bold text-white bg-gradient-to-r from-[#0071e3] to-[#5e5ce6] rounded-full px-1 shadow-sm animate-bounce">
              {cartCount}
            </span>
          )}
        </button>

        {/* Switch to SiteCraft Studio if requested */}
        {onSwitchMode && (
          <button
            onClick={onSwitchMode}
            className="hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold transition-all shadow-xs"
            title="Switch to Multi-Template Studio"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Studio Mode</span>
          </button>
        )}
      </div>
    </header>
  );
};
