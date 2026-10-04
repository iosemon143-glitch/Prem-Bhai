import React, { useState } from 'react';
import { SiteConfig } from '../../types';
import { COLOR_THEMES } from '../../data/templates';
import { Mail, Phone, MapPin, CheckCircle2, Send, MessageCircle } from 'lucide-react';

interface ContactSectionProps {
  config: SiteConfig;
  selectedScope?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config, selectedScope }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: selectedScope || 'Website Development',
    budget: 'Standard',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const theme = COLOR_THEMES[config.themeColor] || COLOR_THEMES.indigo;
  const isBn = config.lang === 'bn';

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = isBn ? 'আপনার নাম লিখুন' : 'Name is required';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = isBn ? 'সঠিক ইমেইল এড্রেস দিন' : 'Valid email required';
    }
    if (!formData.message.trim()) {
      errs.message = isBn ? 'আপনার প্রজেক্টের সংক্ষিপ্ত বিবরণ লিখুন' : 'Message is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `হ্যালো ${config.brandName}, আমি ওয়েবসাইট সংক্রান্ত বিষয়ে কথা বলতে চাই। আমার নাম: ${formData.name || 'Visitor'}, সার্ভিস: ${formData.projectType}`
    );
    const phoneClean = config.contactPhone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phoneClean || '8801700123456'}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                {config.contactTitle}
              </h2>
              <p className="mt-2 text-base text-neutral-600">
                {config.contactSubtitle}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-neutral-200/70">
              <a
                href={`mailto:${config.contactEmail}`}
                className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-neutral-50 transition-colors text-neutral-700"
              >
                <Mail className="w-5 h-5 text-neutral-500 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                    {isBn ? 'ইমেইল এড্রেস' : 'Direct Email'}
                  </div>
                  <div className="text-sm font-semibold text-neutral-900 mt-0.5">
                    {config.contactEmail}
                  </div>
                </div>
              </a>

              <a
                href={`tel:${config.contactPhone.replace(/\s+/g, '')}`}
                className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-neutral-50 transition-colors text-neutral-700"
              >
                <Phone className="w-5 h-5 text-neutral-500 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                    {isBn ? 'হোয়াটসঅ্যাপ ও ফোন' : 'Telephone / WhatsApp'}
                  </div>
                  <div className="text-sm font-semibold text-neutral-900 mt-0.5">
                    {config.contactPhone}
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-3.5 p-3 rounded-lg text-neutral-700">
                <MapPin className="w-5 h-5 text-neutral-500 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                    {isBn ? 'অফিস / লোকেশন' : 'Studio Location'}
                  </div>
                  <div className="text-sm font-semibold text-neutral-900 mt-0.5">
                    {config.contactAddress}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isBn ? 'সরাসরি হোয়াটসঅ্যাপে মেসেজ দিন' : 'Direct WhatsApp Chat'}</span>
              </button>
            </div>
          </div>

          {/* Right: Working Interactive Lead Capture Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 bg-neutral-50/70 border border-neutral-200 rounded-2xl">
              {isSubmitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    {isBn ? 'ধন্যবাদ! আপনার বার্তা সফলভাবে পৌঁছেছে' : 'Message Transmitted Successfully'}
                  </h3>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto">
                    {isBn
                      ? 'আমরা আপনার রিকোয়েস্ট পর্যালোচনা করে আগামী ২৪ ঘণ্টার মধ্যে একটি পূর্ণাঙ্গ প্রস্তাবনা পাঠাব।'
                      : 'Our engineering lead will review your submission and reply with a targeted roadmap within 24 hours.'}
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        projectType: 'Website Development',
                        budget: 'Standard',
                        message: '',
                      });
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 transition-colors"
                  >
                    {isBn ? 'আরেকটি বার্তা পাঠান' : 'Submit Another Inquiry'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {isBn ? 'আপনার নাম' : 'Full Name'} *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isBn ? 'যেমন: তানজিম আহমেদ' : 'e.g., Alex Mercer'}
                        className={`w-full px-3.5 py-2 text-xs bg-white rounded-lg border text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 ${
                          errors.name
                            ? 'border-red-400 focus:ring-red-400'
                            : `border-neutral-300 ${theme.ring}`
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {isBn ? 'ইমেইল এড্রেস' : 'Work Email'} *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className={`w-full px-3.5 py-2 text-xs bg-white rounded-lg border text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 ${
                          errors.email
                            ? 'border-red-400 focus:ring-red-400'
                            : `border-neutral-300 ${theme.ring}`
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {isBn ? 'ফোন / হোয়াটসঅ্যাপ নাম্বার' : 'Phone / Mobile'}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+880 1700-000000"
                        className={`w-full px-3.5 py-2 text-xs bg-white rounded-lg border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 ${theme.ring}`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {isBn ? 'প্রজেক্টের ধরন' : 'Project Category'}
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) =>
                          setFormData({ ...formData, projectType: e.target.value })
                        }
                        className={`w-full px-3.5 py-2 text-xs bg-white rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 ${theme.ring}`}
                      >
                        <option value="Website Development">
                          {isBn ? 'নতুন ওয়েবসাইট তৈরি' : 'New Website Build'}
                        </option>
                        <option value="Ecommerce">
                          {isBn ? 'ই-কমার্স ও অনলাইন শপ' : 'E-Commerce Platform'}
                        </option>
                        <option value="Redesign">
                          {isBn ? 'বর্তমান ওয়েবসাইট রি-ডিজাইন' : 'Website Redesign & Speed'}
                        </option>
                        <option value="Custom Web App">
                          {isBn ? 'কাস্টম ওয়েব অ্যাপ্লিকেশন' : 'Bespoke Web Application'}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {isBn ? 'আপনার পরিকল্পনা ও প্রয়োজনীয়তা' : 'Project Brief / Scope'} *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        isBn
                          ? 'আপনার ওয়েবসাইট কেমন হবে, কী কী ফিচার চান তা সংক্ষেপে লিখুন...'
                          : 'Outline your timeline, key requirements, or specific deliverables...'
                      }
                      className={`w-full px-3.5 py-2 text-xs bg-white rounded-lg border text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 ${
                        errors.message
                          ? 'border-red-400 focus:ring-red-400'
                          : `border-neutral-300 ${theme.ring}`
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3 px-4 text-xs font-bold text-white ${theme.primary} ${theme.primaryHover} rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2`}
                  >
                    <span>{isBn ? 'বার্তা পাঠান' : 'Transmit Inquiry'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
