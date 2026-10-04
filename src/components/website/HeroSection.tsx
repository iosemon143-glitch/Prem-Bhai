import React, { useState } from 'react';
import { SiteConfig } from '../../types';
import { COLOR_THEMES } from '../../data/templates';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  config: SiteConfig;
  onPrimaryCta: () => void;
  onSecondaryCta: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onPrimaryCta,
  onSecondaryCta,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const theme = COLOR_THEMES[config.themeColor] || COLOR_THEMES.indigo;
  const isBn = config.lang === 'bn';

  return (
    <section className="relative overflow-hidden bg-neutral-50/60 pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typographic Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Zero-Pill Kicker with subtle separator */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-neutral-500">
              <span className={theme.textAccent}>{config.heroKicker.split('·')[0]?.trim()}</span>
              {config.heroKicker.includes('·') && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{config.heroKicker.split('·')[1]?.trim()}</span>
                </>
              )}
            </div>

            {/* Headline with balanced wrapping */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.15] text-balance max-w-2xl">
              {config.heroHeadline}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl">
              {config.heroDescription}
            </p>

            {/* Dual CTA Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onPrimaryCta}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white ${theme.primary} ${theme.primaryHover} rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap`}
              >
                <span>{config.heroCtaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onSecondaryCta}
                className="inline-flex items-center justify-center px-5 py-3.5 text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-300 rounded-lg transition-colors whitespace-nowrap"
              >
                {config.heroCtaSecondary}
              </button>
            </div>

            {/* Adjacent Trust Proof Points */}
            <div className="pt-4 border-t border-neutral-200/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-neutral-900 tabular-nums">
                  {isBn ? '১০০%' : '100%'}
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">
                  {isBn ? 'রেসপন্সিভ ও অপ্টিমাইজড' : 'Responsive Standard'}
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-neutral-900 tabular-nums">
                  {isBn ? '২৪-৪৮' : '24-48h'}
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">
                  {isBn ? 'ঘণ্টায় ড্রাফট ডেলিভারি' : 'Initial Draft Delivery'}
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-neutral-900 tabular-nums">
                  {isBn ? '৪.৯ ★' : '4.9 ★'}
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">
                  {isBn ? 'ক্লায়েন্ট সন্তুষ্টি' : 'Verified Quality Score'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset with Fallback */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm aspect-16/10">
              {/* Fallback container */}
              {(!imageLoaded || imageError) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-600">
                  <Sparkles className="w-8 h-8 text-neutral-400 mb-2" />
                  <p className="text-xs font-semibold text-neutral-700 text-center">
                    {config.brandName}
                  </p>
                  <p className="text-[11px] text-neutral-500 text-center mt-1">
                    {config.tagline}
                  </p>
                </div>
              )}

              {/* Main Image */}
              {!imageError && (
                <img
                  src={config.heroImage}
                  alt={config.heroHeadline}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              )}

              {/* Clean caption card overlay */}
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-white/90 backdrop-blur-md rounded-lg border border-neutral-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium text-neutral-800 truncate">
                    {isBn ? 'লাইভ প্রিভিউ ও প্রোডাকশন রেডি' : 'Production Grade & Live Verified'}
                  </span>
                </div>
                <span className="text-[11px] text-neutral-500 shrink-0">
                  {config.template.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
