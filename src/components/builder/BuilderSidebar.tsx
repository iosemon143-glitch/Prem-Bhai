import React, { useState } from 'react';
import { SiteConfig, SectionVisibility } from '../../types';
import {
  X,
  Type,
  Layers,
  Settings2,
  Sparkles,
  Phone,
  Eye,
  EyeOff,
  Check,
  Plus,
  Trash2,
} from 'lucide-react';

interface BuilderSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onChangeConfig: (newConfig: SiteConfig) => void;
  onApplyPreset: (presetKey: string) => void;
}

export const BuilderSidebar: React.FC<BuilderSidebarProps> = ({
  isOpen,
  onClose,
  config,
  onChangeConfig,
  onApplyPreset,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'sections' | 'presets' | 'contact'>('content');
  const isBn = config.lang === 'bn';

  if (!isOpen) return null;

  const handleTextChange = (field: keyof SiteConfig, val: any) => {
    onChangeConfig({
      ...config,
      [field]: val,
    });
  };

  const toggleSection = (sec: keyof SectionVisibility) => {
    onChangeConfig({
      ...config,
      sections: {
        ...config.sections,
        [sec]: !config.sections[sec],
      },
    });
  };

  const handleAddService = () => {
    const newService = {
      id: `s_${Date.now()}`,
      number: `0${config.services.length + 1}`,
      title: isBn ? 'নতুন কাস্টম সেবা' : 'New Bespoke Service',
      description: isBn
        ? 'আপনার সেবার বিস্তারিত বিবরণ এখানে লিখুন।'
        : 'Detailed overview of your newly added offering.',
      tags: ['Custom', 'Specialty'],
      metric: '+100%',
      metricLabel: isBn ? 'মান বৃদ্ধি' : 'Quality Metric',
    };
    onChangeConfig({
      ...config,
      services: [...config.services, newService],
    });
  };

  const handleRemoveService = (id: string) => {
    onChangeConfig({
      ...config,
      services: config.services.filter((s) => s.id !== id),
    });
  };

  return (
    <aside className="fixed top-12 right-0 bottom-0 w-80 sm:w-96 bg-white border-l border-neutral-200 z-50 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70">
        <div>
          <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
            <Settings2 className="w-4 h-4 text-indigo-600" />
            <span>{isBn ? 'ওয়েবসাইট এডিটর ও মেকার' : 'Website Studio Editor'}</span>
          </h3>
          <p className="text-[11px] text-neutral-500">
            {isBn ? 'রিয়েল-টাইমে পরিবর্তন করুন' : 'Live visual customization'}
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-md transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tab navigation */}
      <div className="flex border-b border-neutral-200 bg-white text-xs">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-2.5 px-2 text-center font-semibold border-b-2 transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'content'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>{isBn ? 'টেক্সট' : 'Copy'}</span>
        </button>
        <button
          onClick={() => setActiveTab('sections')}
          className={`flex-1 py-2.5 px-2 text-center font-semibold border-b-2 transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'sections'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{isBn ? 'সেকশন' : 'Sections'}</span>
        </button>
        <button
          onClick={() => setActiveTab('presets')}
          className={`flex-1 py-2.5 px-2 text-center font-semibold border-b-2 transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'presets'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isBn ? 'প্রিসেট' : 'Presets'}</span>
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`flex-1 py-2.5 px-2 text-center font-semibold border-b-2 transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'contact'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>{isBn ? 'যোগাযোগ' : 'Contact'}</span>
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
        {activeTab === 'content' && (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                {isBn ? 'ওয়েবসাইটের নাম (Brand Name)' : 'Brand Name'}
              </label>
              <input
                type="text"
                value={config.brandName}
                onChange={(e) => handleTextChange('brandName', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                {isBn ? 'ট্যাগলাইন (Tagline)' : 'Tagline'}
              </label>
              <input
                type="text"
                value={config.tagline}
                onChange={(e) => handleTextChange('tagline', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="pt-2 border-t border-neutral-200">
              <label className="block font-semibold text-neutral-700 mb-1">
                {isBn ? 'হিরো কিকার (ছোট হেডলাইন)' : 'Hero Kicker'}
              </label>
              <input
                type="text"
                value={config.heroKicker}
                onChange={(e) => handleTextChange('heroKicker', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                {isBn ? 'মূল হেডলাইন (Main Headline)' : 'Hero Headline'}
              </label>
              <textarea
                rows={2}
                value={config.heroHeadline}
                onChange={(e) => handleTextChange('heroHeadline', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                {isBn ? 'বর্ণনা (Description)' : 'Hero Description'}
              </label>
              <textarea
                rows={3}
                value={config.heroDescription}
                onChange={(e) => handleTextChange('heroDescription', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  {isBn ? 'প্রধান বাটন (Primary CTA)' : 'Primary CTA'}
                </label>
                <input
                  type="text"
                  value={config.heroCtaPrimary}
                  onChange={(e) => handleTextChange('heroCtaPrimary', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 text-neutral-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  {isBn ? 'সেকেন্ডারি বাটন' : 'Secondary CTA'}
                </label>
                <input
                  type="text"
                  value={config.heroCtaSecondary}
                  onChange={(e) => handleTextChange('heroCtaSecondary', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 text-neutral-900"
                />
              </div>
            </div>

            {/* Services Editor list */}
            {config.services.length > 0 && (
              <div className="pt-3 border-t border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-neutral-700">
                    {isBn ? 'সেবা তালিকা' : 'Services List'} ({config.services.length})
                  </span>
                  <button
                    onClick={handleAddService}
                    className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800"
                  >
                    <Plus className="w-3 h-3" />
                    <span>{isBn ? 'সেবা যোগ করুন' : 'Add'}</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {config.services.map((serv, idx) => (
                    <div
                      key={serv.id}
                      className="p-2 bg-neutral-50 rounded border border-neutral-200 flex items-center justify-between gap-2"
                    >
                      <input
                        type="text"
                        value={serv.title}
                        onChange={(e) => {
                          const updated = [...config.services];
                          updated[idx] = { ...serv, title: e.target.value };
                          handleTextChange('services', updated);
                        }}
                        className="flex-1 bg-white px-2 py-1 text-xs border border-neutral-300 rounded"
                      />
                      <button
                        onClick={() => handleRemoveService(serv.id)}
                        className="text-neutral-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'sections' && (
          <div className="space-y-3">
            <p className="text-neutral-500 mb-2">
              {isBn
                ? 'আপনার ওয়েবসাইটে কোন কোন অংশ দৃশ্যমান থাকবে তা নির্ধারণ করুন:'
                : 'Control which sections are rendered on your live site:'}
            </p>

            {(Object.keys(config.sections) as (keyof SectionVisibility)[]).map((sec) => {
              const labels: Record<string, { bn: string; en: string }> = {
                hero: { bn: 'হিরো ব্যানার (Hero Section)', en: 'Hero Section' },
                services: { bn: 'সেবাসমূহ / ফিচার্স', en: 'Capabilities / Services' },
                portfolio: { bn: 'পোর্টফোলিও ও কেস স্টাডি', en: 'Selected Work / Case Studies' },
                products: { bn: 'প্রোডাক্ট শপ / ক্যাটালগ', en: 'Store Products' },
                metrics: { bn: 'প্রভাব ও পরিসংখ্যান (Proof)', en: 'Quantitative Metrics' },
                pricing: { bn: 'মূল্য তালিকা / প্যাকেজ', en: 'Pricing Plans' },
                testimonials: { bn: 'ক্লায়েন্ট রিভিউ ও ফিডব্যাক', en: 'Client Testimonials' },
                faq: { bn: 'সাধারণ প্রশ্নোত্তর (FAQ)', en: 'FAQ Section' },
                contact: { bn: 'যোগাযোগ ও ফর্ম (Contact)', en: 'Contact & Lead Capture' },
              };

              const isVisible = config.sections[sec];

              return (
                <div
                  key={sec}
                  onClick={() => toggleSection(sec)}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                    isVisible
                      ? 'bg-neutral-50 border-neutral-300 text-neutral-900'
                      : 'bg-white border-neutral-200 text-neutral-400 opacity-60'
                  }`}
                >
                  <span className="font-semibold">
                    {isBn ? labels[sec]?.bn || sec : labels[sec]?.en || sec}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {isVisible ? (
                      <Eye className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-neutral-400" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'presets' && (
          <div className="space-y-3">
            <p className="text-neutral-500 mb-2">
              {isBn
                ? 'এক ক্লিকে আপনার পছন্দসই ইন্ডাস্ট্রির ওয়েবসাইট তৈরি করুন:'
                : 'Instantly populate your website with authentic Bangladeshi and global domain templates:'}
            </p>

            <button
              onClick={() => onApplyPreset('agency_dhaka')}
              className="w-full text-left p-3 rounded-lg border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              <div className="font-bold text-neutral-900">
                {isBn ? '🚀 ঢাকা ডিজিটাল এজেন্সী' : '🚀 Dhaka Tech Agency'}
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">
                {isBn
                  ? 'ওয়েব ও অ্যাপ ডেভেলপমেন্ট এজেন্সি সাইট'
                  : 'Full-stack software and growth marketing studio'}
              </p>
            </button>

            <button
              onClick={() => onApplyPreset('portfolio_dev')}
              className="w-full text-left p-3 rounded-lg border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              <div className="font-bold text-neutral-900">
                {isBn ? '💼 সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার পোর্টফোলিও' : '💼 Staff Software Engineer Portfolio'}
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">
                {isBn
                  ? 'ব্যক্তিগত দক্ষতা, লাইভ প্রজেক্ট ও হায়ার কনসালটেশন'
                  : 'Personal brand, verified metrics and client booking'}
              </p>
            </button>

            <button
              onClick={() => onApplyPreset('leather_shop')}
              className="w-full text-left p-3 rounded-lg border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              <div className="font-bold text-neutral-900">
                {isBn ? '👜 খাঁটি চামড়ার অনলাইন শপ' : '👜 Artisan Leather & Goods Store'}
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">
                {isBn
                  ? 'পণ্য ক্যাটালগ, কার্ট ও হোয়াটসঅ্যাপ অর্ডার সিস্টেম'
                  : 'Direct-to-consumer commerce with WhatsApp checkout'}
              </p>
            </button>

            <button
              onClick={() => onApplyPreset('bistro_cafe')}
              className="w-full text-left p-3 rounded-lg border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              <div className="font-bold text-neutral-900">
                {isBn ? '☕ গুরমে ক্যাফে ও ডাইনিং' : '☕ Artisan Coffee & Bistro'}
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">
                {isBn
                  ? 'রেস্তোরাঁর খাবার মেন্যু ও ইনস্ট্যান্ট টেবিল বুকিং'
                  : 'Culinary tasting menu and live reservation request'}
              </p>
            </button>

            <button
              onClick={() => onApplyPreset('saas_startup')}
              className="w-full text-left p-3 rounded-lg border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              <div className="font-bold text-neutral-900">
                {isBn ? '⚡ ক্লাউড অটোমেশন ও SaaS' : '⚡ Cloud Workflow SaaS'}
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">
                {isBn
                  ? 'টুলস অটোমেশন, ইন্টারেক্টিভ প্রাইসিং ও ফ্রি ট্রায়াল'
                  : 'Product mechanics, ROI metrics, and evaluation tiers'}
              </p>
            </button>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                {isBn ? 'ইমেইল এড্রেস' : 'Email Address'}
              </label>
              <input
                type="email"
                value={config.contactEmail}
                onChange={(e) => handleTextChange('contactEmail', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                {isBn ? 'ফোন / হোয়াটসঅ্যাপ' : 'Phone / WhatsApp'}
              </label>
              <input
                type="text"
                value={config.contactPhone}
                onChange={(e) => handleTextChange('contactPhone', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                {isBn ? 'ঠিকানা / শহর' : 'Physical Address / City'}
              </label>
              <input
                type="text"
                value={config.contactAddress}
                onChange={(e) => handleTextChange('contactAddress', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-neutral-900"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs">
        <span className="text-neutral-500">
          {isBn ? 'সব পরিবর্তন অটো-সেভ হচ্ছে' : 'Changes applied live'}
        </span>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-lg"
        >
          {isBn ? 'সম্পন্ন' : 'Done'}
        </button>
      </div>
    </aside>
  );
};
