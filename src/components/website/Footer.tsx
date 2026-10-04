import React from 'react';
import { SiteConfig } from '../../types';

interface FooterProps {
  config: SiteConfig;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  const isBn = config.lang === 'bn';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-400 py-12 sm:py-16 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-neutral-800">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xl font-bold tracking-tight text-white block">
              {config.brandName}
            </span>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              {config.tagline}
            </p>
            <div className="text-xs text-neutral-500 pt-2">
              <span>{config.contactAddress}</span>
              <span className="mx-2">·</span>
              <span>{config.contactPhone}</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-3">
              {isBn ? 'নেভিগেশন' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              {config.sections.services && (
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    {isBn ? 'সেবাসমূহ' : 'Capabilities'}
                  </a>
                </li>
              )}
              {config.sections.portfolio && config.projects.length > 0 && (
                <li>
                  <a href="#portfolio" className="hover:text-white transition-colors">
                    {isBn ? 'পোর্টফোলিও' : 'Case Studies'}
                  </a>
                </li>
              )}
              {config.sections.products && config.products.length > 0 && (
                <li>
                  <a href="#products" className="hover:text-white transition-colors">
                    {isBn ? 'পণ্যসমূহ' : 'Store Catalog'}
                  </a>
                </li>
              )}
              {config.sections.pricing && config.pricingPlans.length > 0 && (
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors">
                    {isBn ? 'প্যাকেজ' : 'Investment Tiers'}
                  </a>
                </li>
              )}
              {config.sections.contact && (
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    {isBn ? 'যোগাযোগ' : 'Inquire'}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Direct Channels */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-3">
              {isBn ? 'যোগাযোগ মাধ্যম' : 'Direct Channels'}
            </h4>
            <div className="space-y-2 text-xs">
              <p>
                <a
                  href={`mailto:${config.contactEmail}`}
                  className="hover:text-white transition-colors"
                >
                  {config.contactEmail}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${config.contactPhone.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {config.contactPhone}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Quiet legal copy */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {currentYear} {config.brandName}. {isBn ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-400 cursor-pointer">
              {isBn ? 'গোপনীয়তা নীতি' : 'Privacy Notice'}
            </span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-neutral-400 cursor-pointer">
              {isBn ? 'সেবার শর্তাবলী' : 'Terms of Service'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
