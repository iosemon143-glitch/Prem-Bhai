import React, { useState } from 'react';
import { GoShopProduct } from '../../data/goshopData';
import { X, Plus, Sparkles } from 'lucide-react';

interface GoShopAddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: GoShopProduct) => void;
}

export const GoShopAddProductModal: React.FC<GoShopAddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Mobile & Flagships',
    price: 299,
    originalPrice: 350,
    snippet: '',
    description: '',
    imageUrl: '/src/assets/images/goshop_sleek_phone_1791112538452.jpg',
    specs: 'Liquid Glass Frame, 48-Hour Battery, Fast Wireless Charge',
    badge: 'New Release',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newProd: GoShopProduct = {
      id: `prod_${Date.now()}`,
      title: formData.title,
      category: formData.category,
      price: Number(formData.price) || 99,
      originalPrice: Number(formData.originalPrice) || Number(formData.price) * 1.2,
      snippet: formData.snippet || 'High-performance luxury gear crafted with pure liquid glass ergonomics.',
      description: formData.description || formData.snippet,
      imageUrl: formData.imageUrl,
      rating: 5.0,
      reviewCount: 1,
      date: 'Oct 04, 2026',
      badge: formData.badge,
      specs: formData.specs.split(',').map((s) => s.trim()).filter(Boolean),
      inStock: true,
    };

    onAddProduct(newProd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-white/90 max-h-[90vh] flex flex-col justify-between overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#0071e3]/10 text-[#0071e3]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Add Product to GoShop</h3>
              <p className="text-xs text-slate-500">Publish a new item directly to your liquid glass feed</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Product Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Vision Spatial Glass Pro"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
              >
                <option value="Mobile & Flagships">Mobile & Flagships</option>
                <option value="Wearables">Wearables</option>
                <option value="Audio">Audio</option>
                <option value="Artisan Gear">Artisan Gear</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Badge Tag</label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g. Limited Edition"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Price ($ USD)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Original Price ($ USD)</label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Short Snippet</label>
            <textarea
              rows={2}
              required
              value={formData.snippet}
              onChange={(e) => setFormData({ ...formData, snippet: e.target.value })}
              placeholder="Highlight summary appearing on the product card..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Specifications (comma separated)</label>
            <input
              type="text"
              value={formData.specs}
              onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
              placeholder="e.g. Titanium Chassis, Wireless Fast Charge, Sapphire Crystal"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
            />
          </div>

          {/* Preset Image Chooser */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Choose Product Photo</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { url: '/src/assets/images/goshop_sleek_phone_1791112538452.jpg', name: 'Phone' },
                { url: '/src/assets/images/goshop_glass_watch_1791112511774.jpg', name: 'Watch' },
                { url: '/src/assets/images/goshop_spatial_audio_1791112525423.jpg', name: 'Audio' },
                { url: '/src/assets/images/store_product_showcase_1791109979183.jpg', name: 'Artisan' },
              ].map((img) => (
                <button
                  type="button"
                  key={img.url}
                  onClick={() => setFormData({ ...formData, imageUrl: img.url })}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    formData.imageUrl === img.url
                      ? 'border-[#0071e3] ring-2 ring-[#0071e3]/30 scale-105'
                      : 'border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#0071e3] hover:bg-[#0071e3]/90 rounded-full shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publish Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
