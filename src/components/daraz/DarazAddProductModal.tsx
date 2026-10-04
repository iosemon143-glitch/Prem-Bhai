import React, { useState } from 'react';
import { DarazProduct } from '../../types/daraz';
import { X, Plus, Image as ImageIcon, Link as LinkIcon, ShieldCheck, Sparkles } from 'lucide-react';

interface DarazAddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: DarazProduct) => void;
  defaultAffiliateId: string;
}

export const DarazAddProductModal: React.FC<DarazAddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
  defaultAffiliateId,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'গ্যাজেট ও অডিও',
    price: 750,
    originalPrice: 1200,
    imageUrl: '/src/assets/images/daraz_tws_earbuds_1791113011680.jpg',
    affiliateUrl: `https://click.daraz.com.bd/e/_C8EwX6?aff_sub=${defaultAffiliateId}`,
    features: 'অরিজিনাল দারাজ প্রোডাক্ট, ফাস্ট ডেলিভারি, ফুল ওয়ারেন্টি',
    isDarazMall: true,
    freeShipping: true,
  });

  if (!isOpen) return null;

  const presetImages = [
    { label: 'TWS ইয়ারবাডস', url: '/src/assets/images/daraz_tws_earbuds_1791113011680.jpg' },
    { label: 'পাওয়ার ব্যাংক', url: '/src/assets/images/daraz_fast_powerbank_1791113025980.jpg' },
    { label: 'স্মার্ট ওয়াচ', url: '/src/assets/images/goshop_glass_watch_1791112511774.jpg' },
    { label: 'হেডফোন', url: '/src/assets/images/goshop_spatial_audio_1791112525423.jpg' },
    { label: 'স্মার্টফোন', url: '/src/assets/images/goshop_sleek_phone_1791112538452.jpg' },
    { label: 'লেদার ওয়ালেট', url: '/src/assets/images/store_product_showcase_1791109979183.jpg' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const discount = Math.round(
      ((Number(formData.originalPrice) - Number(formData.price)) / Number(formData.originalPrice)) * 100
    );

    const newProd: DarazProduct = {
      id: `daraz_prod_${Date.now()}`,
      title: formData.title,
      category: formData.category,
      price: Number(formData.price) || 500,
      originalPrice: Number(formData.originalPrice) || Number(formData.price),
      discountPercent: discount > 0 ? discount : undefined,
      imageUrl: formData.imageUrl,
      affiliateUrl: formData.affiliateUrl || 'https://www.daraz.com.bd/',
      rating: 4.8,
      reviewsCount: 1,
      soldCount: 'নতুন অফার',
      isDarazMall: formData.isDarazMall,
      freeShipping: formData.freeShipping,
      features: formData.features.split(',').map((f) => f.trim()).filter(Boolean),
      clicksCount: 0,
    };

    onAddProduct(newProd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-neutral-200 max-h-[92vh] flex flex-col justify-between overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
          <div>
            <h3 className="text-base font-extrabold text-neutral-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#f85606] text-white flex items-center justify-center text-xs font-black">
                d
              </span>
              <span>নতুন দারাজ প্রোডাক্ট যোগ করুন</span>
            </h3>
            <p className="text-xs text-neutral-500">
              ছবি ও দারাজ অ্যাফিলিয়েট লিঙ্ক দিয়ে পণ্যটি আপনার ওয়েবসাইটে যুক্ত করুন
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          {/* Product Title */}
          <div>
            <label className="block font-bold text-neutral-700 mb-1">
              পণ্যের নাম (Product Name) *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="যেমন: Wireless Earbuds with LED Display Battery"
              className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#f85606]"
            />
          </div>

          {/* Daraz Affiliate URL (THE KEY FIELD) */}
          <div className="p-3 bg-orange-50/80 rounded-xl border border-orange-200/90 space-y-1.5">
            <label className="block font-bold text-[#d94400] flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5" />
              <span>আপনার দারাজ অ্যাফিলিয়েট লিঙ্ক (Daraz Link) *</span>
            </label>
            <input
              type="url"
              required
              value={formData.affiliateUrl}
              onChange={(e) => setFormData({ ...formData, affiliateUrl: e.target.value })}
              placeholder="https://click.daraz.com.bd/e/_xxxxx অথবা দারাজ পণ্যের লিঙ্ক"
              className="w-full px-3 py-2 rounded-lg bg-white border border-orange-300 text-neutral-900 font-mono text-[11px] focus:outline-none focus:ring-2 focus:ring-[#f85606]"
            />
            <p className="text-[11px] text-orange-700 font-medium">
              💡 গ্রাহক "Buy Now" বাটনে ক্লিক করলে ঠিক এই লিঙ্কে চলে যাবে এবং বিক্রি হলে আপনি কমিশন পাবেন।
            </p>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                দারাজ অফার মূল্য (৳ Deal Price) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-900 font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                আসল মূল্য (৳ Original Price)
              </label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-900"
              />
            </div>
          </div>

          {/* Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">ক্যাটাগরি</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-900"
              >
                <option value="গ্যাজেট ও অডিও">গ্যাজেট ও অডিও</option>
                <option value="মোবাইল এক্সেসরিজ">মোবাইল এক্সেসরিজ</option>
                <option value="স্মার্ট ওয়াচ">স্মার্ট ওয়াচ</option>
                <option value="স্মার্টফোন">স্মার্টফোন</option>
                <option value="ফ্যাশন ও লাইফস্টাইল">ফ্যাশন ও লাইফস্টাইল</option>
                <option value="হোম ও কিচেন">হোম ও কিচেন</option>
              </select>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <label className="flex items-center gap-1.5 cursor-pointer font-bold text-neutral-700">
                <input
                  type="checkbox"
                  checked={formData.isDarazMall}
                  onChange={(e) => setFormData({ ...formData, isDarazMall: e.target.checked })}
                  className="rounded text-[#f85606] focus:ring-[#f85606]"
                />
                <span>Daraz Mall</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer font-bold text-neutral-700">
                <input
                  type="checkbox"
                  checked={formData.freeShipping}
                  onChange={(e) => setFormData({ ...formData, freeShipping: e.target.checked })}
                  className="rounded text-[#f85606] focus:ring-[#f85606]"
                />
                <span>Free Delivery</span>
              </label>
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block font-bold text-neutral-700 mb-1">
              প্রধান ফিচার বা অফার নোট (কমা দিয়ে আলাদা করুন)
            </label>
            <input
              type="text"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="যেমন: দ্রুত ডেলিভারি, ১ বছর ওয়ারেন্টি, অরিজিনাল প্রোডাক্ট"
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-900"
            />
          </div>

          {/* Product Image Choice */}
          <div>
            <label className="block font-bold text-neutral-700 mb-1">
              প্রোডাক্ট ছবি নির্বাচন বা ছবির লিঙ্ক
            </label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="ছবির লিংক পেস্ট করুন..."
              className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 text-neutral-900 font-mono text-[11px] mb-2"
            />

            <div className="grid grid-cols-6 gap-2">
              {presetImages.map((p) => (
                <button
                  type="button"
                  key={p.url}
                  onClick={() => setFormData({ ...formData, imageUrl: p.url })}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    formData.imageUrl === p.url
                      ? 'border-[#f85606] ring-2 ring-[#f85606]/30 scale-105'
                      : 'border-neutral-200 opacity-60 hover:opacity-100'
                  }`}
                  title={p.label}
                >
                  <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-neutral-200 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#f85606] hover:bg-[#e04a00] rounded-lg shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>প্রোডাক্ট যোগ করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
