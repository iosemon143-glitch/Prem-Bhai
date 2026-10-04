import React, { useState, useEffect } from 'react';
import { DarazProduct } from '../../types/daraz';
import { X, Check, Link as LinkIcon, Trash2 } from 'lucide-react';

interface DarazEditProductModalProps {
  product: DarazProduct | null;
  onClose: () => void;
  onUpdateProduct: (product: DarazProduct) => void;
  onDeleteProduct: (id: string) => void;
}

export const DarazEditProductModal: React.FC<DarazEditProductModalProps> = ({
  product,
  onClose,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  const [formData, setFormData] = useState<DarazProduct | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({ ...product });
    }
  }, [product]);

  if (!product || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProduct(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 max-h-[92vh] flex flex-col justify-between overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
          <div>
            <h3 className="text-base font-extrabold text-neutral-900">
              প্রোডাক্ট ও দারাজ লিঙ্ক এডিট করুন
            </h3>
            <p className="text-xs text-neutral-500">
              অ্যাফিলিয়েট লিঙ্ক বা প্রাইস যেকোনো সময় পরিবর্তন করতে পারেন
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-neutral-700 mb-1">পণ্যের নাম</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-900"
            />
          </div>

          <div className="p-3 bg-orange-50 rounded-xl border border-orange-200 space-y-1">
            <label className="block font-bold text-[#d94400] flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5" />
              <span>দারাজ অ্যাফিলিয়েট লিঙ্ক (Daraz URL)</span>
            </label>
            <input
              type="url"
              required
              value={formData.affiliateUrl}
              onChange={(e) => setFormData({ ...formData, affiliateUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-white border border-orange-300 text-neutral-900 font-mono text-[11px]"
            />
            <p className="text-[10px] text-orange-600">
              Buy Now বাটনে ক্লিক করলে গ্রাহক ঠিক এই লিঙ্কে চলে যাবে।
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">অফার মূল্য (৳)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-900 font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-neutral-700 mb-1">আসল মূল্য (৳)</label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-neutral-700 mb-1">ছবির লিঙ্ক (Image URL)</label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-900 font-mono text-[11px]"
            />
          </div>

          <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                onDeleteProduct(formData.id);
                onClose();
              }}
              className="text-red-600 hover:text-red-700 text-xs font-semibold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>ডিলিট করুন</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-[#f85606] hover:bg-[#e04a00] rounded-lg shadow-sm flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>পরিবর্তন সংরক্ষণ করুন</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
