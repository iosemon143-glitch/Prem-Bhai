import React from 'react';
import { GoShopProduct } from '../../data/goshopData';
import { ShoppingBag, Star, ArrowRight, Calendar } from 'lucide-react';

interface GoShopProductGridProps {
  products: GoShopProduct[];
  onSelectProduct: (product: GoShopProduct) => void;
  onAddToCart: (product: GoShopProduct) => void;
  currency: 'USD' | 'BDT';
}

export const GoShopProductGrid: React.FC<GoShopProductGridProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  currency,
}) => {
  const rate = currency === 'BDT' ? 120 : 1;
  const symbol = currency === 'BDT' ? '৳' : '$';

  if (products.length === 0) {
    return (
      <div className="py-24 text-center liquid-glass rounded-3xl p-8 max-w-xl mx-auto space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <i className="fa-solid fa-magnifying-glass text-2xl"></i>
        </div>
        <h3 className="text-xl font-bold text-slate-800">No matching products found</h3>
        <p className="text-sm text-slate-500">
          Try adjusting your search query or switching categories above.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="realPostsGrid">
      {products.map((product) => {
        const formattedPrice = (product.price * rate).toLocaleString();
        const formattedOriginal = (product.originalPrice * rate).toLocaleString();

        return (
          <div
            key={product.id}
            className="product-card liquid-glass-card searchable-item group rounded-3xl p-6 flex flex-col justify-between cursor-pointer"
            onClick={() => onSelectProduct(product)}
          >
            {/* Image Container with Zoom */}
            <div className="w-full h-[270px] rounded-2xl overflow-hidden bg-slate-200 relative mb-5">
              <img
                src={product.imageUrl}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Top Badge */}
              {product.badge && (
                <div className="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[11px] font-extrabold text-[#0071e3] shadow-sm">
                  {product.badge}
                </div>
              )}

              {/* Price & Rating Badge */}
              <div className="absolute bottom-3 right-3 px-3 py-1 bg-slate-900/85 backdrop-blur-md rounded-full text-white text-xs font-bold flex items-center gap-1.5 shadow-sm">
                <span>{symbol}{formattedPrice}</span>
                <span className="text-slate-400">·</span>
                <span className="flex items-center gap-0.5 text-amber-300 text-[11px]">
                  <Star className="w-3 h-3 fill-amber-300" />
                  {product.rating}
                </span>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Category metadata */}
                <div className="text-xs font-bold text-[#0071e3] uppercase tracking-wider mb-1">
                  {product.category}
                </div>

                {/* Post Title */}
                <h3 className="post-title-text text-xl font-extrabold text-slate-900 mb-2 leading-snug group-hover:text-[#0071e3] transition-colors line-clamp-1">
                  {product.title}
                </h3>

                {/* Post Snippet */}
                <p className="product-snippet text-sm text-slate-500 font-medium leading-relaxed mb-4 line-clamp-2">
                  {product.snippet}
                </p>
              </div>

              {/* Footer */}
              <div className="product-footer flex items-center justify-between pt-4 border-t border-slate-200/60 mt-auto">
                <span className="post-date text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <i className="fa-regular fa-calendar-days text-slate-400"></i>
                  <span>{product.date}</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="p-2.5 rounded-full bg-slate-100 hover:bg-[#0071e3] text-slate-700 hover:text-white transition-colors"
                    title="Add to Shopping Bag"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    className="read-more-btn bg-slate-900 hover:bg-[#0071e3] text-white px-5 py-2.5 rounded-full text-xs font-bold inline-flex items-center gap-2 transition-all shadow-xs group-hover:bg-[#0071e3] group-hover:shadow-lg group-hover:shadow-[#0071e3]/20"
                  >
                    <span>View Details</span>
                    <i className="fa-solid fa-arrow-right text-[11px]"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
