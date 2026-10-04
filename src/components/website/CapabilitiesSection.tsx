import React from 'react';
import { SiteConfig } from '../../types';
import { COLOR_THEMES } from '../../data/templates';
import { ArrowUpRight } from 'lucide-react';

interface CapabilitiesSectionProps {
  config: SiteConfig;
  onSelectService?: (title: string) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  config,
  onSelectService,
}) => {
  const theme = COLOR_THEMES[config.themeColor] || COLOR_THEMES.indigo;

  if (!config.services || config.services.length === 0) return null;

  return (
    <section id="services" className="py-16 sm:py-20 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            {config.servicesTitle}
          </h2>
          <p className="mt-2 text-base text-neutral-600">
            {config.servicesSubtitle}
          </p>
        </div>

        {/* Editorial Numbered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {config.services.map((service) => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-xl border border-neutral-200 hover:border-neutral-300 bg-neutral-50/40 hover:bg-white hover:shadow-md transition-all"
            >
              <div>
                {/* Number & Metric Header */}
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-sm font-bold text-neutral-400 font-mono tracking-wider">
                    {service.number}
                  </span>
                  {service.metric && (
                    <div className="text-right">
                      <span className={`text-base font-bold tabular-nums ${theme.textAccent}`}>
                        {service.metric}
                      </span>
                      {service.metricLabel && (
                        <span className="block text-[11px] text-neutral-500">
                          {service.metricLabel}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Service Title */}
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-neutral-800 transition-colors">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Zero-Pill Unboxed Metadata Tags */}
              <div className="mt-6 pt-4 border-t border-neutral-200/60 flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-500">
                  {service.tags.map((tag, idx) => (
                    <React.Fragment key={tag}>
                      <span>{tag}</span>
                      {idx < service.tags.length - 1 && (
                        <span aria-hidden="true" className="text-neutral-300">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {onSelectService && (
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors"
                    aria-label={`Select ${service.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
