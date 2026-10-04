import React from 'react';
import { DarazProduct } from '../../types/daraz';
import { ExternalLink, Star, ShieldCheck, Truck, Edit3, Trash2, ShoppingBag } from 'lucide-react';

interface DarazProductCardProps {
  product: DarazProduct;
  onBuyNow: (product: DarazProduct) => void;
  onEdit: (product: DarazProduct) => void;
  onDelete: (id: string) => void;
}

export const DarazProductCard: React.FC<DarazProductCardProps> = ({
  product,
  onBuyNow,
  onEdit,
  onDelete,
}) => {
  const discount =
    product.discountPercent ||
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="group ios-glass-card rounded-[28px] overflow-hidden flex flex-col justify-between transition-all duration-400">
      {/* Product Image Section with Zoom */}
      <div className="relative aspect-4/3 bg-slate-100 overflow-hidden border-b border-white/60">
        <img
          src={product.imageUrl}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
        />

        {/* Daraz Mall Glass Badge */}
        {product.isDarazMall && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#d94400]/95 backdrop-blur-md text-white text-[10px] font-black rounded-lg shadow-sm flex items-center gap-1 uppercase tracking-wider">
            <ShieldCheck className="w-3 h-3 text-white" />
            <span>Mall</span>
          </div>
        )}

        {/* Glowing Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-gradient-to-r from-[#f85606] to-[#ff3b30] text-white text-[11px] font-black rounded-lg shadow-md shadow-[#f85606]/30">
            -{discount}%
          </div>
        )}

        {/* Free Shipping Pill */}
        {product.freeShipping && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-md text-emerald-700 text-[10px] font-bold rounded-lg flex items-center gap-1 shadow-xs border border-white">
            <Truck className="w-3 h-3 text-emerald-600" />
            <span>ফ্রি ডেলিভারি</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Category */}
          <div className="text-[11px] font-extrabold text-[#f85606] uppercase tracking-wider mb-1">
            {product.category}
          </div>

          {/* Product Name (Product এর নাম) */}
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug line-clamp-2 group-hover:text-[#f85606] transition-colors duration-300">
            {product.title}
          </h3>

          {/* Rating & Social Proof */}
          <div className="flex items-center gap-2 mt-2 text-xs font-semibold">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 text-[11px]">
              {product.reviewsCount} রিভিউ
            </span>
            {product.soldCount && (
              <>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500 text-[11px]">
                  {product.soldCount}
                </span>
              </>
            )}
          </div>

          {/* Key Features Bullets */}
          {product.features && product.features.length > 0 && (
            <ul className="mt-3 space-y-1 text-xs text-slate-600 font-medium">
              {product.features.slice(0, 2).map((feat, i) => (
                <li key={i} className="flex items-center gap-2 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f85606] shrink-0" />
                  <span className="truncate">{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pricing Area */}
        <div className="pt-3 border-t border-slate-200/60">
          <div className="flex items-baseline gap-2.5">
            <span className="text-2xl sm:text-3xl font-black text-[#f85606] tabular-nums tracking-tight">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs sm:text-sm text-slate-400 line-through tabular-nums font-semibold">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* THE MAIN "BUY NOW" BUTTON (নামের নিচে Buy Now Button) */}
        <div className="pt-1">
          <button
            onClick={() => onBuyNow(product)}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-[#f85606] via-[#ff5b14] to-[#ff3b30] hover:from-[#e04a00] hover:to-[#f85606] text-white font-black text-sm rounded-2xl shadow-lg shadow-[#f85606]/25 hover:shadow-xl hover:shadow-[#f85606]/35 active:scale-98 transition-all duration-300 flex items-center justify-center gap-2 animate-shimmer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buy Now (দারাজে কিনুন)</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Clean Owner Controls (Subtle & Elegant) */}
        <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100">
          <span className="text-[11px] font-semibold text-slate-400">
            দারাজে ক্লিক: <strong className="text-slate-700">{product.clicksCount}</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(product)}
              className="p-1.5 rounded-full hover:bg-orange-50 text-slate-400 hover:text-[#f85606] transition-colors"
              title="লিঙ্ক বা দাম এডিট করুন"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="p-1.5 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
              title="প্রোডাক্ট মুছুন"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
