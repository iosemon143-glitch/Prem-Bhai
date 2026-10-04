import React, { useState } from 'react';
import { SiteConfig } from '../../types';
import { ChevronDown } from 'lucide-react';

interface FAQSectionProps {
  config: SiteConfig;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ config }) => {
  const [openId, setOpenId] = useState<string | null>(config.faqs[0]?.id || null);

  if (!config.faqs || config.faqs.length === 0) return null;

  return (
    <section id="faq" className="py-16 sm:py-20 bg-neutral-50/50 border-b border-neutral-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            {config.lang === 'bn' ? 'সাধারণ জিজ্ঞাসাসমূহ (FAQ)' : 'Frequently Asked Questions'}
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            {config.lang === 'bn'
              ? 'ওয়েবসাইট তৈরি ও সার্ভিস সম্পর্কিত জরুরি কিছু প্রশ্নোত্তর'
              : 'Answers regarding process timelines, tech stacks, and ownership'}
          </p>
        </div>

        <div className="space-y-3">
          {config.faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-neutral-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-neutral-50/80 transition-colors"
                >
                  <span className="text-sm font-bold text-neutral-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
