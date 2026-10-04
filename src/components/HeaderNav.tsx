import React, { useState } from 'react';
import { SiteConfig } from '../types';
import { COLOR_THEMES } from '../data/templates';
import { Globe, SlidersHorizontal, ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderNavProps {
  config: SiteConfig;
  cartCount: number;
  onOpenCart: () => void;
  onToggleBuilder: () => void;
  isBuilderOpen: boolean;
  onLanguageChange: (lang: 'bn' | 'en') => void;
  onContactClick: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  config,
  cartCount,
  onOpenCart,
  onToggleBuilder,
  isBuilderOpen,
  onLanguageChange,
  onContactClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = COLOR_THEMES[config.themeColor] || COLOR_THEMES.indigo;
  const isBn = config.lang === 'bn';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 hover:opacity-80 transition-opacity truncate"
          >
            {config.brandName}
          </a>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
          {config.sections.services && (
            <a href="#services" className="hover:text-neutral-900 transition-colors">
              {isBn ? 'সেবাসমূহ' : 'Capabilities'}
            </a>
          )}
          {config.sections.portfolio && config.projects.length > 0 && (
            <a href="#portfolio" className="hover:text-neutral-900 transition-colors">
              {isBn ? 'পোর্টফোলিও' : 'Selected Work'}
            </a>
          )}
          {config.sections.products && config.products.length > 0 && (
            <a href="#products" className="hover:text-neutral-900 transition-colors">
              {isBn ? 'প্রোডাক্টস' : 'Catalog'}
            </a>
          )}
          {config.sections.pricing && config.pricingPlans.length > 0 && (
            <a href="#pricing" className="hover:text-neutral-900 transition-colors">
              {isBn ? 'প্যাকেজ' : 'Pricing'}
            </a>
          )}
          {config.sections.testimonials && (
            <a href="#testimonials" className="hover:text-neutral-900 transition-colors">
              {isBn ? 'রিভিউ' : 'Testimonials'}
            </a>
          )}
          {config.sections.faq && (
            <a href="#faq" className="hover:text-neutral-900 transition-colors">
              {isBn ? 'জিজ্ঞাসা' : 'FAQ'}
            </a>
          )}
          {config.sections.contact && (
            <a href="#contact" className="hover:text-neutral-900 transition-colors">
              {isBn ? 'যোগাযোগ' : 'Contact'}
            </a>
          )}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          {/* Language Switcher */}
          <button
            onClick={() => onLanguageChange(isBn ? 'en' : 'bn')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200/80 rounded-md transition-colors"
            title={isBn ? 'Switch to English' : 'বাংলায় দেখুন'}
          >
            <Globe className="w-3.5 h-3.5 text-neutral-500" />
            <span>{isBn ? 'EN' : 'বাংলা'}</span>
          </button>

          {/* Cart Icon if ecommerce */}
          {config.template === 'ecommerce' && (
            <button
              onClick={onOpenCart}
              className="relative p-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] text-[10px] font-bold text-white bg-amber-600 rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Builder Drawer Toggle */}
          <button
            onClick={onToggleBuilder}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${
              isBuilderOpen
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                : 'bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isBn ? 'কাস্টমাইজ ও মেকার' : 'Customizer'}</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={onContactClick}
            className={`hidden sm:inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white ${theme.primary} ${theme.primaryHover} rounded-md transition-colors shadow-sm whitespace-nowrap`}
          >
            <span>{config.heroCtaPrimary}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-3 space-y-2">
          {config.sections.services && (
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              {isBn ? 'সেবাসমূহ' : 'Capabilities'}
            </a>
          )}
          {config.sections.portfolio && config.projects.length > 0 && (
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              {isBn ? 'পোর্টফোলিও' : 'Selected Work'}
            </a>
          )}
          {config.sections.products && config.products.length > 0 && (
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              {isBn ? 'প্রোডাক্টস' : 'Catalog'}
            </a>
          )}
          {config.sections.pricing && config.pricingPlans.length > 0 && (
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              {isBn ? 'প্যাকেজ' : 'Pricing'}
            </a>
          )}
          {config.sections.testimonials && (
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              {isBn ? 'রিভিউ' : 'Testimonials'}
            </a>
          )}
          {config.sections.contact && (
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900"
            >
              {isBn ? 'যোগাযোগ' : 'Contact'}
            </a>
          )}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onContactClick();
            }}
            className={`w-full mt-2 py-2 px-3 text-xs font-semibold text-white ${theme.primary} rounded-md text-center`}
          >
            {config.heroCtaPrimary}
          </button>
        </div>
      )}
    </header>
  );
};
