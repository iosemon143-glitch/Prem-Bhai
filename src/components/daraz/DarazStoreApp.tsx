import React, { useState, useMemo } from 'react';
import { DarazProduct, DarazAffiliateConfig } from '../../types/daraz';
import { INITIAL_DARAZ_PRODUCTS, INITIAL_AFFILIATE_CONFIG } from '../../data/darazProducts';
import { DarazNavbar } from './DarazNavbar';
import { DarazHeroBanner } from './DarazHeroBanner';
import { DarazProductCard } from './DarazProductCard';
import { DarazAddProductModal } from './DarazAddProductModal';
import { DarazEditProductModal } from './DarazEditProductModal';
import { DarazAffiliateSettingsModal } from './DarazAffiliateSettingsModal';
import { DarazRedirectNoticeModal } from './DarazRedirectNoticeModal';
import { Flame, ArrowUpDown, PlusCircle, ShieldCheck, Heart } from 'lucide-react';

interface DarazStoreAppProps {
  onSwitchMode?: () => void;
}

export const DarazStoreApp: React.FC<DarazStoreAppProps> = ({ onSwitchMode }) => {
  const [products, setProducts] = useState<DarazProduct[]>(INITIAL_DARAZ_PRODUCTS);
  const [affiliateConfig, setAffiliateConfig] = useState<DarazAffiliateConfig>(INITIAL_AFFILIATE_CONFIG);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('সব অফার');
  const [sortBy, setSortBy] = useState<'default' | 'discount' | 'priceLow' | 'priceHigh' | 'clicks'>('default');

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<DarazProduct | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [redirectNoticeProduct, setRedirectNoticeProduct] = useState<DarazProduct | null>(null);

  // Total clicks across all affiliate links
  const totalClicks = useMemo(() => {
    return products.reduce((acc, p) => acc + (p.clicksCount || 0), 0);
  }, [products]);

  // Categories list
  const categories = useMemo(() => {
    const set = Array.from(new Set(products.map((p) => p.category)));
    return ['সব অফার', ...set];
  }, [products]);

  // Filtered & Sorted products
  const displayedProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === 'সব অফার' || p.category === selectedCategory;
      return matchSearch && matchCat;
    });

    if (sortBy === 'discount') {
      result.sort((a, b) => {
        const discA = a.discountPercent || ((a.originalPrice - a.price) / a.originalPrice) * 100;
        const discB = b.discountPercent || ((b.originalPrice - b.price) / b.originalPrice) * 100;
        return discB - discA;
      });
    } else if (sortBy === 'priceLow') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHigh') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'clicks') {
      result.sort((a, b) => (b.clicksCount || 0) - (a.clicksCount || 0));
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  // Handle Buy Now (দারাজে কিনুন) - CORE REQUIREMENT
  const handleBuyNow = (product: DarazProduct) => {
    // 1. Increment click count for analytics
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, clicksCount: (p.clicksCount || 0) + 1 } : p
      )
    );

    // 2. Open the user's provided Daraz Affiliate Link in a new tab
    if (product.affiliateUrl) {
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    }

    // 3. Show redirect toast confirmation
    setRedirectNoticeProduct(product);
  };

  // Handle Add Product
  const handleAddProduct = (newProd: DarazProduct) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  // Handle Update Product
  const handleUpdateProduct = (updated: DarazProduct) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  // Handle Delete Product
  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen daraz-liquid-bg text-slate-900 font-sans selection:bg-[#f85606] selection:text-white flex flex-col justify-between">
      {/* Daraz Liquid Glass Navbar */}
      <DarazNavbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalClicks={totalClicks}
        onOpenAddModal={() => setIsAddOpen(true)}
        onOpenSettingsModal={() => setIsSettingsOpen(true)}
        affiliateConfig={affiliateConfig}
        onSwitchMode={onSwitchMode}
      />

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Hero Promotional Banner */}
        <DarazHeroBanner
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Section Heading & Sorting Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#f85606] animate-flame" />
              <span>{selectedCategory}</span>
              <span className="text-xs font-bold text-[#f85606] bg-orange-50 border border-orange-200/80 px-2.5 py-0.5 rounded-full">
                {displayedProducts.length} টি লাইভ অফার
              </span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              পছন্দের পণ্যের নিচে থাকা "Buy Now" বাটনে ক্লিক করে সরাসরি দারাজে গিয়ে সুরক্ষিতভাবে অর্ডার সম্পন্ন করুন।
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 ios-glass-card px-3.5 py-2 rounded-2xl text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-500">সাজান:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer"
              >
                <option value="default">প্রস্তাবিত ক্রম</option>
                <option value="discount">সর্বোচ্চ ছাড় (%)</option>
                <option value="clicks">সবচেয়ে জনপ্রিয়</option>
                <option value="priceLow">কম থেকে বেশি দাম</option>
                <option value="priceHigh">বেশি থেকে কম দাম</option>
              </select>
            </div>

            {/* Quick Add Product Button */}
            <button
              onClick={() => setIsAddOpen(true)}
              className="p-2 sm:px-3 sm:py-2 bg-white/90 hover:bg-white border border-slate-200 text-slate-800 font-bold text-xs rounded-2xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4 text-[#f85606]" />
              <span className="hidden sm:inline">নতুন ডিল</span>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {displayedProducts.length === 0 ? (
          <div className="py-24 text-center ios-glass-card rounded-[32px] p-8 max-w-md mx-auto space-y-3">
            <div className="w-14 h-14 rounded-full bg-orange-50 text-[#f85606] flex items-center justify-center mx-auto">
              <Flame className="w-6 h-6 animate-flame" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">কোনো প্রোডাক্ট পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-500 font-medium">
              অনুগ্রহ করে অন্য কোনো নাম লিখে সার্চ করুন অথবা আপনার পছন্দের নতুন পণ্য যুক্ত করুন।
            </p>
            <button
              onClick={() => setIsAddOpen(true)}
              className="mt-2 inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#f85606] to-[#ff5b14] text-white text-xs font-bold rounded-full shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>নতুন প্রোডাক্ট যোগ করুন</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {displayedProducts.map((product) => (
              <DarazProductCard
                key={product.id}
                product={product}
                onBuyNow={handleBuyNow}
                onEdit={setEditingProduct}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Clean Premium Liquid Glass Footer (No code talk, pure elegant brand presence) */}
      <footer className="mt-20 ios-glass-nav py-10 px-4 sm:px-6 lg:px-8 border-t border-white/90">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#f85606] to-[#ff6a1f] flex items-center justify-center font-black text-white text-sm shadow-xs">
              d
            </div>
            <div>
              <span className="font-extrabold text-slate-800 text-sm block">
                {affiliateConfig.channelName}
              </span>
              <span className="text-[11px] text-slate-400">
                দারাজ অফিসিয়াল পার্টনার প্ল্যাটফর্ম
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <button
              onClick={() => setIsAddOpen(true)}
              className="hover:text-[#f85606] transition-colors font-semibold"
            >
              নতুন প্রোডাক্ট যোগ করুন
            </button>
            <span className="text-slate-300">·</span>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="hover:text-[#f85606] transition-colors font-semibold"
            >
              অ্যাফিলিয়েট সেটিংস
            </button>
            <span className="text-slate-300">·</span>
            <span>© {new Date().getFullYear()} {affiliateConfig.channelName}. সর্বস্বত্ব সংরক্ষিত।</span>
          </div>
        </div>
      </footer>

      {/* Modals & Popups */}
      <DarazAddProductModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddProduct={handleAddProduct}
        defaultAffiliateId={affiliateConfig.affiliateId}
      />

      <DarazEditProductModal
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
      />

      <DarazAffiliateSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={affiliateConfig}
        onSaveConfig={setAffiliateConfig}
      />

      <DarazRedirectNoticeModal
        product={redirectNoticeProduct}
        onClose={() => setRedirectNoticeProduct(null)}
      />
    </div>
  );
};
