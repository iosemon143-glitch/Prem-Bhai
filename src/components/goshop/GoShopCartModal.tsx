import React from 'react';
import { GoShopProduct } from '../../data/goshopData';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';

export interface GoShopCartItem {
  product: GoShopProduct;
  quantity: number;
}

interface GoShopCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: GoShopCartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
  onClear: () => void;
  currency: 'USD' | 'BDT';
}

export const GoShopCartModal: React.FC<GoShopCartModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemove,
  onClear,
  currency,
}) => {
  if (!isOpen) return null;

  const rate = currency === 'BDT' ? 120 : 1;
  const symbol = currency === 'BDT' ? '৳' : '$';

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 ? (currency === 'BDT' ? 120 : 15) : 0;
  const total = subtotal * rate + shipping;

  const handleCheckoutWhatsApp = () => {
    const list = cart
      .map(
        (item) =>
          `• ${item.product.title} (x${item.quantity}) - ${symbol}${(item.product.price * item.quantity * rate).toLocaleString()}`
      )
      .join('\n');

    const msg = encodeURIComponent(
      `Hello GoShop Support,\n\nI want to place an order from GoShop Liquid Glass Store:\n\n${list}\n\nSubtotal: ${symbol}${(subtotal * rate).toLocaleString()}\nShipping: ${symbol}${shipping.toLocaleString()}\nGrand Total: ${symbol}${total.toLocaleString()}\n\nPlease send payment instructions and delivery schedule.`
    );

    window.open(`https://wa.me/8801700123456?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white/95 h-full shadow-2xl flex flex-col justify-between border-l border-white/80 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0071e3]/10 flex items-center justify-center text-[#0071e3]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Your Shopping Bag</h3>
              <p className="text-xs text-slate-500">GoShop Liquid Store</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-24 text-center text-slate-400 space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto text-slate-300 stroke-[1.5]" />
              <p className="text-sm font-bold text-slate-700">Your shopping bag is empty</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explore our pure liquid glass collection and add your favorite gear.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-4 p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60"
              >
                <div className="w-16 h-16 rounded-xl bg-slate-200 overflow-hidden shrink-0 border border-slate-200">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {item.product.title}
                  </h4>
                  <div className="text-xs font-extrabold text-[#0071e3] mt-0.5 tabular-nums">
                    {symbol}{(item.product.price * rate).toLocaleString()}
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQty(item.product.id, -1)}
                      className="w-6 h-6 flex items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-extrabold text-slate-900 tabular-nums px-1">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.product.id, 1)}
                      className="w-6 h-6 flex items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemove(item.product.id)}
                  className="p-2 text-slate-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Order Processing */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50/80 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600 font-medium">
              <div className="flex justify-between">
                <span>Subtotal ({cart.reduce((c, i) => c + i.quantity, 0)} items)</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {symbol}{(subtotal * rate).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Insured Express Delivery</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {symbol}{shipping.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Due</span>
                <span className="text-lg text-[#0071e3] tabular-nums">
                  {symbol}{total.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#0071e3] to-[#5e5ce6] hover:opacity-95 text-white text-xs font-bold rounded-full transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp Direct</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onClear}
                className="w-full py-1.5 text-[11px] font-semibold text-slate-500 hover:text-slate-800"
              >
                Clear Entire Bag
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
