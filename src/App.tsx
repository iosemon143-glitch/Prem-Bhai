import React, { useState } from 'react';
import { DarazStoreApp } from './components/daraz/DarazStoreApp';
import { GoShopApp } from './components/goshop/GoShopApp';
import { SiteConfig, TemplateType, ViewportMode, ThemeColor, Language, CartItem, ProductItem, PricingPlan } from './types';
import { TEMPLATES } from './data/templates';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/website/HeroSection';
import { CapabilitiesSection } from './components/website/CapabilitiesSection';
import { PortfolioSection } from './components/website/PortfolioSection';
import { StoreSection } from './components/website/StoreSection';
import { PricingSection } from './components/website/PricingSection';
import { TestimonialsSection } from './components/website/TestimonialsSection';
import { FAQSection } from './components/website/FAQSection';
import { ContactSection } from './components/website/ContactSection';
import { Footer } from './components/website/Footer';
import { CartDrawer } from './components/website/CartDrawer';
import { ReservationModal } from './components/website/ReservationModal';
import { BuilderToolbar } from './components/builder/BuilderToolbar';
import { BuilderSidebar } from './components/builder/BuilderSidebar';
import { ExportModal } from './components/builder/ExportModal';
import { Sparkles, ShoppingBag } from 'lucide-react';

export default function App() {
  const [appMode, setAppMode] = useState<'daraz' | 'goshop' | 'sitecraft'>('daraz');

  // SiteCraft Studio States
  const [template, setTemplate] = useState<TemplateType>('ecommerce');
  const [lang, setLang] = useState<Language>('bn');
  const [themeColor, setThemeColor] = useState<ThemeColor>('indigo');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedScope, setSelectedScope] = useState<string>('Website Development');

  // Active configuration initialized from selected template & language
  const [config, setConfig] = useState<SiteConfig>(() => ({
    ...TEMPLATES.ecommerce.bn,
    themeColor: 'indigo',
  }));

  // Handle template selection
  const handleSelectTemplate = (newTemplate: TemplateType) => {
    setTemplate(newTemplate);
    const base = TEMPLATES[newTemplate][lang];
    setConfig({
      ...base,
      themeColor,
    });
  };

  // Handle language switch
  const handleToggleLang = (newLang?: Language) => {
    const nextLang = newLang || (lang === 'bn' ? 'en' : 'bn');
    setLang(nextLang);
    const base = TEMPLATES[template][nextLang];
    setConfig((prev) => ({
      ...base,
      themeColor: prev.themeColor,
      sections: prev.sections,
    }));
  };

  // Handle color change
  const handleChangeColor = (newColor: ThemeColor) => {
    setThemeColor(newColor);
    setConfig((prev) => ({
      ...prev,
      themeColor: newColor,
    }));
  };

  // Reset to template defaults
  const handleReset = () => {
    const base = TEMPLATES[template][lang];
    setConfig({
      ...base,
      themeColor,
    });
  };

  // Presets applicator
  const handleApplyPreset = (presetKey: string) => {
    if (presetKey === 'agency_dhaka') {
      handleSelectTemplate('agency');
      setThemeColor('indigo');
    } else if (presetKey === 'portfolio_dev') {
      handleSelectTemplate('portfolio');
      setThemeColor('slate');
    } else if (presetKey === 'leather_shop') {
      handleSelectTemplate('ecommerce');
      setThemeColor('amber');
    } else if (presetKey === 'bistro_cafe') {
      handleSelectTemplate('restaurant');
      setThemeColor('rose');
    } else if (presetKey === 'saas_startup') {
      handleSelectTemplate('saas');
      setThemeColor('cyan');
    }
  };

  // Cart operations
  const handleAddToCart = (product: ProductItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // CTA navigation triggers
  const handlePrimaryCta = () => {
    if (config.template === 'restaurant') {
      setIsReservationOpen(true);
    } else if (config.template === 'ecommerce') {
      const prodSec = document.getElementById('products');
      if (prodSec) {
        prodSec.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const contactSec = document.getElementById('contact');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSecondaryCta = () => {
    if (config.sections.portfolio && config.projects.length > 0) {
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
    } else if (config.sections.services) {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    } else if (config.sections.products) {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedScope(`${plan.name} Package`);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const cartTotalCount = cart.reduce((c, i) => c + i.quantity, 0);

  // Viewport container width styling
  const getViewportContainerClass = () => {
    if (viewportMode === 'mobile') {
      return 'max-w-[390px] mx-auto my-6 border-8 border-neutral-800 rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[844px] bg-white ring-1 ring-neutral-900/10';
    }
    if (viewportMode === 'tablet') {
      return 'max-w-[768px] mx-auto my-6 border-8 border-neutral-800 rounded-2xl shadow-2xl overflow-hidden min-h-[1024px] bg-white ring-1 ring-neutral-900/10';
    }
    return 'w-full bg-white';
  };

  // If in Daraz Affiliate Store mode (Primary Default)
  if (appMode === 'daraz') {
    return (
      <div className="relative">
        <DarazStoreApp onSwitchMode={() => setAppMode('goshop')} />
      </div>
    );
  }

  // If in GoShop mode, render the GoShop Liquid Glass Store
  if (appMode === 'goshop') {
    return (
      <div className="relative">
        {/* Banner to switch to Daraz Affiliate Store */}
        <div className="bg-[#f85606] text-white text-xs px-4 py-2 flex items-center justify-between shadow-xs sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-white text-[#f85606] flex items-center justify-center font-black text-xs">d</span>
            <span className="font-bold">দারাজ অ্যাফিলিয়েট কমিশন স্টোর মোড প্রস্তুত রয়েছে!</span>
          </div>
          <button
            onClick={() => setAppMode('daraz')}
            className="px-3 py-1 bg-white text-[#f85606] font-bold rounded-full hover:bg-orange-50 transition-colors shadow-xs"
          >
            দারাজ স্টোরে ফিরুন &rarr;
          </button>
        </div>
        <GoShopApp onSwitchMode={() => setAppMode('sitecraft')} />
      </div>
    );
  }

  // SiteCraft Studio Mode
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col text-neutral-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Return to Daraz / GoShop Banner */}
      <div className="bg-[#f85606] text-white text-xs px-4 py-2 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-md bg-white text-[#f85606] flex items-center justify-center font-black text-xs">d</span>
          <span className="font-bold">দারাজ অ্যাফিলিয়েট কমিশন স্টোর মোড চালু রয়েছে</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAppMode('daraz')}
            className="px-3 py-1 bg-white text-[#f85606] font-bold rounded-full hover:bg-orange-50 transition-colors shadow-xs"
          >
            দারাজ স্টোরে যান &rarr;
          </button>
          <button
            onClick={() => setAppMode('goshop')}
            className="px-3 py-1 bg-black/20 text-white font-bold rounded-full hover:bg-black/30 transition-colors"
          >
            GoShop লিকুইড গ্লাস
          </button>
        </div>
      </div>

      {/* Studio Top Toolbar */}
      <BuilderToolbar
        currentTemplate={template}
        onSelectTemplate={handleSelectTemplate}
        viewportMode={viewportMode}
        onChangeViewport={setViewportMode}
        currentColor={themeColor}
        onChangeColor={handleChangeColor}
        lang={lang}
        onToggleLang={() => handleToggleLang()}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onOpenExport={() => setIsExportOpen(true)}
        onReset={handleReset}
      />

      {/* Main Website View Container */}
      <div className="flex-1 flex justify-center overflow-x-hidden">
        <div className={`transition-all duration-300 flex flex-col ${getViewportContainerClass()}`}>
          {/* Header Navigation */}
          <HeaderNav
            config={config}
            cartCount={cartTotalCount}
            onOpenCart={() => setIsCartOpen(true)}
            onToggleBuilder={() => setIsSidebarOpen(!isSidebarOpen)}
            isBuilderOpen={isSidebarOpen}
            onLanguageChange={handleToggleLang}
            onContactClick={handlePrimaryCta}
          />

          {/* Website Content Sections */}
          <main className="flex-1">
            {config.sections.hero && (
              <HeroSection
                config={config}
                onPrimaryCta={handlePrimaryCta}
                onSecondaryCta={handleSecondaryCta}
              />
            )}

            {config.sections.services && (
              <CapabilitiesSection
                config={config}
                onSelectService={(serviceTitle) => {
                  setSelectedScope(serviceTitle);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            )}

            {config.sections.portfolio && config.projects.length > 0 && (
              <PortfolioSection config={config} />
            )}

            {config.sections.products && config.products.length > 0 && (
              <StoreSection config={config} onAddToCart={handleAddToCart} />
            )}

            {config.sections.pricing && config.pricingPlans.length > 0 && (
              <PricingSection config={config} onSelectPlan={handleSelectPlan} />
            )}

            {config.sections.testimonials && (
              <TestimonialsSection config={config} />
            )}

            {config.sections.faq && <FAQSection config={config} />}

            {config.sections.contact && (
              <ContactSection config={config} selectedScope={selectedScope} />
            )}
          </main>

          <Footer config={config} />
        </div>
      </div>

      {/* Builder Visual Customizer Drawer */}
      <BuilderSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        config={config}
        onChangeConfig={setConfig}
        onApplyPreset={handleApplyPreset}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveFromCart}
        onClear={handleClearCart}
        config={config}
      />

      {/* Restaurant Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        config={config}
      />

      {/* Single-File HTML5 Exporter Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        config={config}
      />
    </div>
  );
}
