import React, { useState } from 'react';
import { DarazAffiliateConfig } from '../../types/daraz';
import { X, Check, HelpCircle, ExternalLink, Sliders, DollarSign, Award } from 'lucide-react';

interface DarazAffiliateSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: DarazAffiliateConfig;
  onSaveConfig: (newConfig: DarazAffiliateConfig) => void;
}

export const DarazAffiliateSettingsModal: React.FC<DarazAffiliateSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [form, setForm] = useState<DarazAffiliateConfig>({ ...config });
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(form);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-neutral-200 max-h-[92vh] flex flex-col justify-between overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f85606] flex items-center justify-center font-bold">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-neutral-900">
                দারাজ অ্যাফিলিয়েট সেটিংস ও গাইড
              </h3>
              <p className="text-xs text-neutral-500">
                কমিশন ট্র্যাকিং আইডি এবং দারাজ পার্টনার নির্দেশিকা
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* How it works info box */}
        <div className="my-4 p-4 rounded-xl bg-orange-50 border border-orange-200 text-xs text-neutral-800 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-[#d94400]">
            <Award className="w-4 h-4 text-[#f85606]" />
            <span>দারাজ অ্যাফিলিয়েট থেকে কীভাবে কমিশন পাবেন?</span>
          </div>
          <ol className="list-decimal list-inside space-y-1.5 text-neutral-700 leading-relaxed">
            <li>দারাজের অফিসিয়াল <strong>Daraz Affiliate Program</strong> বা <strong>Daraz App</strong> থেকে পছন্দের পণ্যের লিংক কপি করুন।</li>
            <li>সেখান থেকে তৈরি হওয়া আপনার রেফারেল/অ্যাফিলিয়েট লিংকটি এই ওয়েবসাইটের প্রোডাক্টে বসান।</li>
            <li>ভিজিটর যখন আপনার ওয়েবসাইটের <strong>"Buy Now (দারাজে কিনুন)"</strong> বাটনে ক্লিক করে দারাজে গিয়ে অর্ডার করবে, দারাজ আপনাকে স্বয়ংক্রিয়ভাবে কমিশন জমা করবে!</li>
          </ol>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-neutral-700 mb-1">
              আপনার দারাজ অ্যাফিলিয়েট আইডি / সাব-আইডি (Affiliate SubID)
            </label>
            <input
              type="text"
              required
              value={form.affiliateId}
              onChange={(e) => setForm({ ...form, affiliateId: e.target.value })}
              placeholder="e.g. emon_deals"
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 font-mono"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              যেকোনো নতুন প্রোডাক্ট যোগ করার সময় এই আইডি ট্র্যাকিং প্যারামিটার হিসেবে স্বয়ংক্রিয়ভাবে বসবে।
            </p>
          </div>

          <div>
            <label className="block font-bold text-neutral-700 mb-1">
              ওয়েবসাইটের নাম / চ্যানেলের নাম
            </label>
            <input
              type="text"
              value={form.channelName}
              onChange={(e) => setForm({ ...form, channelName: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-neutral-300"
            />
          </div>

          <div>
            <label className="block font-bold text-neutral-700 mb-1">
              হোয়াটসঅ্যাপ হেল্পলাইন (কাস্টমার ইনকোয়ারি সাপোর্ট)
            </label>
            <input
              type="text"
              value={form.whatsappContact}
              onChange={(e) => setForm({ ...form, whatsappContact: e.target.value })}
              placeholder="01700-000000"
              className="w-full px-3 py-2 rounded-lg border border-neutral-300"
            />
          </div>

          <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
            <a
              href="https://www.daraz.com.bd"
              target="_blank"
              rel="noreferrer"
              className="text-[#f85606] hover:underline font-bold flex items-center gap-1 text-[11px]"
            >
              <span>দারাজ বাংলাদেশ ভিজিট করুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-lg"
              >
                বন্ধ করুন
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-[#f85606] hover:bg-[#e04a00] rounded-lg shadow-sm flex items-center gap-1.5"
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>সংরক্ষিত হয়েছে!</span>
                  </>
                ) : (
                  <span>সেটিংস সেভ করুন</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
