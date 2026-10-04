import React, { useState } from 'react';
import { GoShopProduct } from '../../data/goshopData';
import { X, Star, ShoppingBag, ShieldCheck, Check, MessageCircle, Truck } from 'lucide-react';

interface GoShopProductModalProps {
  product: GoShopProduct | null;
  onClose: () => void;
  onAddToCart: (product: GoShopProduct, quantity: number) => void;
  currency: 'USD' | 'BDT';
}

export const GoShopProductModal: React.FC<GoShopProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  currency,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const rate = currency === 'BDT' ? 120 : 1;
  const symbol = currency === 'BDT' ? '৳' : '$';
  const price = (product.price * rate).toLocaleString();
  const originalPrice = (product.originalPrice * rate).toLocaleString();

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hello GoShop, I want to order:\n• Product: ${product.title}\n• Quantity: ${quantity}\n• Total: ${symbol}${(product.price * quantity * rate).toLocaleString()}\n\nPlease confirm availability and payment details.`
    );
    window.open(`https://wa.me/8801700123456?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white/95 rounded-[32px] p-6 sm:p-8 shadow-2xl border border-white/90 overflow-hidden max-h-[92vh] flex flex-col md:flex-row gap-8 overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <div className="w-full aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden bg-slate-100 relative border border-slate-200/80">
            <img
              src={product.imageUrl}
              alt={product.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-extrabold text-[#0071e3] shadow-sm">
                {product.badge}
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs text-slate-600 font-semibold">
            <div className="flex items-center gap-1.5 text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
              <span>Apple-Grade Verified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#0071e3]" />
              <span>Express Dispatch</span>
            </div>
          </div>
        </div>

        {/* Right: Product Info & Actions */}
        <div className="md:w-1/2 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-xs font-bold text-[#0071e3] uppercase tracking-wider mb-1">
              {product.category} · {product.date}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {product.title}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700">
                {product.rating} ({product.reviewCount} customer reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                {symbol}{price}
              </span>
              <span className="text-sm text-slate-400 line-through tabular-nums">
                {symbol}{originalPrice}
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Save {(100 - (product.price / product.originalPrice) * 100).toFixed(0)}%
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {product.description}
            </p>

            {/* Technical Specifications */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                Key Specifications
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                {product.specs.map((spec, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#0071e3] shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Quantity</span>
              <div className="flex items-center gap-3 bg-slate-100 p-1 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center font-bold text-slate-700 shadow-xs hover:bg-slate-200"
                >
                  -
                </button>
                <span className="text-xs font-bold text-slate-900 w-6 text-center tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center font-bold text-slate-700 shadow-xs hover:bg-slate-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Main Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAdd}
                className={`py-3 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 hover:bg-[#0071e3] text-white shadow-md'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="py-3 px-4 rounded-full text-xs font-bold bg-[#0071e3] hover:bg-[#0071e3]/90 text-white shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Buy via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
