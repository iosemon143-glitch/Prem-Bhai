import React, { useState } from 'react';
import { SiteConfig, PricingPlan } from '../../types';
import { COLOR_THEMES } from '../../data/templates';
import { Check } from 'lucide-react';

interface PricingSectionProps {
  config: SiteConfig;
  onSelectPlan: (plan: PricingPlan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ config, onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const theme = COLOR_THEMES[config.themeColor] || COLOR_THEMES.indigo;
  const isBn = config.lang === 'bn';
  const currencySymbol = isBn ? '৳' : '$';

  if (!config.pricingPlans || config.pricingPlans.length === 0) return null;

  return (
    <section id="pricing" className="py-16 sm:py-20 bg-neutral-50/50 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            {config.pricingTitle}
          </h2>
          <p className="mt-2 text-base text-neutral-600">
            {config.pricingSubtitle}
          </p>

          {/* Billing Switcher */}
          <div className="mt-6 inline-flex items-center p-1 bg-neutral-200/70 rounded-lg">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${
                !isAnnual
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {isBn ? 'স্ট্যান্ডার্ড প্রজেক্ট' : 'Monthly / Standard'}
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                isAnnual
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <span>{isBn ? 'বাৎসরিক / প্যাকেজ' : 'Annual / Retainer'}</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {config.pricingPlans.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-xl p-7 transition-all ${
                  isPopular
                    ? 'bg-white border-2 border-neutral-900 shadow-lg md:-translate-y-1'
                    : 'bg-white border border-neutral-200 shadow-xs hover:border-neutral-300'
                }`}
              >
                {/* Popular Indicator */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                    {isBn ? 'সবচেয়ে জনপ্রিয়' : 'Most Popular Choice'}
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500 leading-normal min-h-[32px]">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mt-5 pb-5 border-b border-neutral-100 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-neutral-900 tabular-nums">
                      {currencySymbol}{price.toLocaleString()}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {isAnnual
                        ? (isBn ? '/বাৎসরিক প্যাকেজ' : '/year billed annually')
                        : (isBn ? '/প্রজেক্ট বেসিক' : '/starting package')}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="mt-6 space-y-3 text-xs text-neutral-600">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plan Action CTA */}
                <div className="mt-8 pt-4">
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-2.5 px-4 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                      isPopular
                        ? `text-white ${theme.primary} ${theme.primaryHover} shadow-xs`
                        : 'text-neutral-800 bg-neutral-100 hover:bg-neutral-200'
                    }`}
                  >
                    {plan.ctaText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
