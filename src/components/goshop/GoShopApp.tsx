import React, { useState, useMemo } from 'react';
import { GOSHOP_PRODUCTS, GoShopProduct } from '../../data/goshopData';
import { GoShopNavbar } from './GoShopNavbar';
import { GoShopHero } from './GoShopHero';
import { GoShopProductGrid } from './GoShopProductGrid';
import { GoShopProductModal } from './GoShopProductModal';
import { GoShopCartModal, GoShopCartItem } from './GoShopCartModal';
import { GoShopXmlModal } from './GoShopXmlModal';
import { GoShopAddProductModal } from './GoShopAddProductModal';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

interface GoShopAppProps {
  onSwitchMode?: () => void;
}

export const GoShopApp: React.FC<GoShopAppProps> = ({ onSwitchMode }) => {
  const [products, setProducts] = useState<GoShopProduct[]>(GOSHOP_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [selectedProduct, setSelectedProduct] = useState<GoShopProduct | null>(null);
  const [cart, setCart] = useState<GoShopCartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isXmlModalOpen, setIsXmlModalOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'BDT'>('USD');

  // Categories list
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return ['All Products', ...cats];
  }, [products]);

  // Real-time search and category filtering
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'All Products' || p.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [products, searchQuery, selectedCategory]);

  // Cart actions
  const handleAddToCart = (product: GoShopProduct, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as GoShopCartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleAddProduct = (newProd: GoShopProduct) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen goshop-body-bg text-slate-900 font-sans selection:bg-[#0071e3] selection:text-white flex flex-col justify-between">
      {/* GoShop Sticky Liquid Glass Header */}
      <GoShopNavbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenXmlModal={() => setIsXmlModalOpen(true)}
        onOpenAddProduct={() => setIsAddProductOpen(true)}
        currency={currency}
        onToggleCurrency={() => setCurrency(currency === 'USD' ? 'BDT' : 'USD')}
        onSwitchMode={onSwitchMode}
      />

      {/* Main Container */}
      <main className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-10 space-y-10 flex-1">
        {/* Hero Section */}
        <GoShopHero
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Section title & count */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {selectedCategory}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Showing {filteredProducts.length} authentic liquid glass items
            </p>
          </div>

          <button
            onClick={() => setIsXmlModalOpen(true)}
            className="text-xs font-bold text-[#0071e3] hover:text-[#5e5ce6] flex items-center gap-1 transition-colors"
          >
            <span>Get Blogger XML</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Grid */}
        <GoShopProductGrid
          products={filteredProducts}
          onSelectProduct={setSelectedProduct}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          currency={currency}
        />
      </main>

      {/* Liquid Glass Footer */}
      <footer className="mt-16 liquid-glass border-t border-white/80 py-10 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-bolt-lightning text-[#0071e3] text-lg"></i>
            <span className="font-extrabold text-slate-800 text-sm">GoShop Liquid Glass Store</span>
            <span>·</span>
            <span>Ultra-Premium Blogger & React Theme</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsXmlModalOpen(true)}
              className="hover:text-[#0071e3] transition-colors"
            >
              Blogger Theme Source
            </button>
            <span className="text-slate-300">·</span>
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="hover:text-[#0071e3] transition-colors"
            >
              Publish New Drop
            </button>
            <span className="text-slate-300">·</span>
            <span>© {new Date().getFullYear()} GoShop. Pure Liquid Glass.</span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <GoShopProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        currency={currency}
      />

      <GoShopCartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveFromCart}
        onClear={handleClearCart}
        currency={currency}
      />

      <GoShopXmlModal
        isOpen={isXmlModalOpen}
        onClose={() => setIsXmlModalOpen(false)}
      />

      <GoShopAddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};
