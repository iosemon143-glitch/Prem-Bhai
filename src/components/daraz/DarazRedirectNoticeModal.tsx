import React, { useEffect } from 'react';
import { DarazProduct } from '../../types/daraz';
import { ExternalLink, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface DarazRedirectNoticeModalProps {
  product: DarazProduct | null;
  onClose: () => void;
}

export const DarazRedirectNoticeModal: React.FC<DarazRedirectNoticeModalProps> = ({
  product,
  onClose,
}) => {
  useEffect(() => {
    if (product) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-white rounded-2xl p-4 shadow-2xl border-2 border-[#f85606] animate-in slide-in-from-bottom duration-300">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#f85606] shrink-0">
          <Zap className="w-5 h-5 fill-[#f85606]" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#f85606] uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>দারাজে নিয়ে যাওয়া হয়েছে!</span>
          </div>

          <h4 className="text-xs font-bold text-neutral-900 truncate mt-0.5">
            {product.title}
          </h4>

          <p className="text-[11px] text-neutral-600 mt-1 leading-normal">
            নতুন ট্যাবে আপনার নির্ধারিত দারাজ লিঙ্কে পণ্যটি খোলা হয়েছে। অফার মূল্যে ৳{product.price.toLocaleString()} টাকায় সরাসরি অর্ডার সম্পন্ন করুন।
          </p>

          <div className="mt-2 pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-400">
            <span>ট্র্যাকিং লিঙ্ক ভেরিফাইড ✓</span>
            <button
              onClick={onClose}
              className="text-[#f85606] font-bold hover:underline"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
