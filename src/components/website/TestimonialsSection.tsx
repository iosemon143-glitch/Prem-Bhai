import React from 'react';
import { SiteConfig } from '../../types';
import { Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  config: SiteConfig;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ config }) => {
  if (!config.testimonials || config.testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            {config.testimonialsTitle}
          </h2>
          <p className="mt-2 text-base text-neutral-600">
            {config.lang === 'bn'
              ? 'আমাদের গ্রাহক ও ক্লায়েন্টদের বাস্তবিক অভিজ্ঞতা ও মতামতের প্রতিফলন'
              : 'Direct reflections from founders, operators, and long-standing partners'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {config.testimonials.map((item) => (
            <div
              key={item.id}
              className="p-7 rounded-xl border border-neutral-200 bg-neutral-50/50 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-6 h-6 text-neutral-300 mb-4" />
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-neutral-200/70 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center">
                    {item.avatarText}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900">
                      {item.author}
                    </h4>
                    <p className="text-xs text-neutral-500">
                      {item.role}, {item.company}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-neutral-900 tabular-nums">
                    {item.metric}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
