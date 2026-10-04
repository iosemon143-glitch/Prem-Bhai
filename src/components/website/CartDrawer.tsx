import React from 'react';
import { CartItem, SiteConfig } from '../../types';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
  onClear: () => void;
  config: SiteConfig;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemove,
  onClear,
  config,
}) => {
  if (!isOpen) return null;

  const isBn = config.lang === 'bn';
  const currencySymbol = isBn ? '৳' : '$';

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const delivery = subtotal > 0 ? (isBn ? 80 : 10) : 0;
  const total = subtotal + delivery;

  const handleWhatsAppCheckout = () => {
    const itemList = cart
      .map(
        (item) =>
          `• ${item.product.name} (x${item.quantity}) - ${currencySymbol}${item.product.price * item.quantity}`
      )
      .join('\n');

    const message = encodeURIComponent(
      `হ্যালো ${config.brandName},\nআমি নিচের পণ্যগুলো অর্ডার করতে চাই:\n\n${itemList}\n\nসাবটোটাল: ${currencySymbol}${subtotal}\nডেলিভারি চার্জ: ${currencySymbol}${delivery}\nসর্বমোট: ${currencySymbol}${total}\n\nদয়া করে অর্ডারটি কনফার্ম করুন।`
    );

    const phoneClean = config.contactPhone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phoneClean || '8801999554433'}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-neutral-800" />
            <h3 className="text-base font-bold text-neutral-900">
              {isBn ? 'আপনার শপিং ব্যাগ' : 'Shopping Cart'}
            </h3>
            <span className="text-xs text-neutral-500 tabular-nums">
              ({cart.reduce((c, i) => c + i.quantity, 0)})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 text-center text-neutral-500 space-y-2">
              <ShoppingBag className="w-10 h-10 text-neutral-300 mx-auto" />
              <p className="text-sm font-medium">
                {isBn ? 'আপনার ব্যাগ বর্তমানে খালি' : 'Your cart is currently empty'}
              </p>
              <p className="text-xs text-neutral-400">
                {isBn
                  ? 'পণ্য দেখতে স্টোর সেকশন ঘুরে আসুন'
                  : 'Explore catalog items and add them to order'}
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-3.5 p-3 rounded-lg border border-neutral-200/80 bg-neutral-50/50"
              >
                <div className="w-16 h-16 rounded-md bg-neutral-200 overflow-hidden shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-neutral-900 truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-xs font-semibold text-neutral-700 mt-0.5 tabular-nums">
                    {currencySymbol}{item.product.price.toLocaleString()}
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQty(item.product.id, -1)}
                      className="w-6 h-6 flex items-center justify-center rounded border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-neutral-900 tabular-nums px-1">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.product.id, 1)}
                      className="w-6 h-6 flex items-center justify-center rounded border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemove(item.product.id)}
                  className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-neutral-200 bg-neutral-50 space-y-3">
            <div className="space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>{isBn ? 'সাবটোটাল' : 'Subtotal'}</span>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  {currencySymbol}{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{isBn ? 'ডেলিভারি চার্জ' : 'Shipping'}</span>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  {currencySymbol}{delivery.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                <span>{isBn ? 'সর্বমোট' : 'Estimated Total'}</span>
                <span className="tabular-nums">
                  {currencySymbol}{total.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>
                  {isBn ? 'হোয়াটসঅ্যাপে সরাসরি অর্ডার কনফার্ম করুন' : 'Confirm via WhatsApp'}
                </span>
              </button>

              <button
                onClick={onClear}
                className="w-full py-1.5 text-[11px] font-medium text-neutral-500 hover:text-neutral-800"
              >
                {isBn ? 'ব্যাগ খালি করুন' : 'Clear Cart'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
