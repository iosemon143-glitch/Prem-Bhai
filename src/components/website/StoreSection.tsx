import React, { useState } from 'react';
import { SiteConfig, ProductItem } from '../../types';
import { COLOR_THEMES } from '../../data/templates';
import { ShoppingCart, Star, Check } from 'lucide-react';

interface StoreSectionProps {
  config: SiteConfig;
  onAddToCart: (product: ProductItem) => void;
}

export const StoreSection: React.FC<StoreSectionProps> = ({ config, onAddToCart }) => {
  const [addedId, setAddedId] = useState<string | null>(null);
  const theme = COLOR_THEMES[config.themeColor] || COLOR_THEMES.amber;
  const isBn = config.lang === 'bn';
  const currencySymbol = isBn ? '৳' : '$';

  if (!config.products || config.products.length === 0) return null;

  const handleAdd = (product: ProductItem) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1400);
  };

  return (
    <section id="products" className="py-16 sm:py-20 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            {config.productsTitle}
          </h2>
          <p className="mt-2 text-base text-neutral-600">
            {config.productsSubtitle}
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {config.products.map((product) => (
            <div
              key={product.id}
              className="group bg-neutral-50/50 rounded-xl border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              {/* Product Visual */}
              <div className="relative aspect-4/3 bg-neutral-100 overflow-hidden border-b border-neutral-200/70">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />

                {/* Badge if available */}
                {product.badge && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-xs text-[11px] font-bold text-neutral-900 rounded shadow-xs">
                    {product.badge}
                  </div>
                )}

                {/* Rating */}
                <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-neutral-900/80 backdrop-blur-xs text-white text-[11px] font-medium rounded flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="tabular-nums">{product.rating}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                    {product.category}
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 mt-1">
                    {product.name}
                  </h3>

                  <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Pricing & Add to Cart */}
                <div className="mt-5 pt-3 border-t border-neutral-200/60 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-neutral-900 tabular-nums">
                      {currencySymbol}{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-neutral-400 line-through tabular-nums">
                        {currencySymbol}{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAdd(product)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      addedId === product.id
                        ? 'bg-emerald-600 text-white'
                        : `text-white ${theme.primary} ${theme.primaryHover} shadow-xs`
                    }`}
                  >
                    {addedId === product.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{isBn ? 'যোগ হয়েছে' : 'Added'}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>{isBn ? 'কার্টে নিন' : 'Add to Cart'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
