import React, { useState } from 'react';
import { SiteConfig } from '../../types';
import { X, Copy, Check, Download, FileCode2, Globe } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, config }) => {
  const [copied, setCopied] = useState(false);
  const isBn = config.lang === 'bn';

  if (!isOpen) return null;

  // Generate clean standalone HTML
  const generateStandaloneHTML = () => {
    const isAgency = config.template === 'agency';
    const isEcom = config.template === 'ecommerce';

    return `<!DOCTYPE html>
<html lang="${config.lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.brandName} - ${config.tagline}</title>
  <meta name="description" content="${config.heroDescription.replace(/"/g, '&quot;')}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: 'Plus Jakarta Sans', 'Hind Siliguri', sans-serif; }
  </style>
</head>
<body class="bg-white text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">

  <!-- Header -->
  <header class="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <a href="#" class="text-xl font-bold tracking-tight text-neutral-900">${config.brandName}</a>
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
        ${config.sections.services ? `<a href="#services" class="hover:text-neutral-900 transition-colors">${isBn ? 'সেবাসমূহ' : 'Capabilities'}</a>` : ''}
        ${config.sections.portfolio && config.projects.length > 0 ? `<a href="#portfolio" class="hover:text-neutral-900 transition-colors">${isBn ? 'পোর্টফোলিও' : 'Case Studies'}</a>` : ''}
        ${config.sections.products && config.products.length > 0 ? `<a href="#products" class="hover:text-neutral-900 transition-colors">${isBn ? 'পণ্যসমূহ' : 'Catalog'}</a>` : ''}
        ${config.sections.pricing && config.pricingPlans.length > 0 ? `<a href="#pricing" class="hover:text-neutral-900 transition-colors">${isBn ? 'প্যাকেজ' : 'Pricing'}</a>` : ''}
        <a href="#contact" class="hover:text-neutral-900 transition-colors">${isBn ? 'যোগাযোগ' : 'Contact'}</a>
      </nav>
      <a href="#contact" class="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-sm">
        ${config.heroCtaPrimary}
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-16 lg:py-24 bg-neutral-50/60 border-b border-neutral-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-6">
      <div class="text-xs font-bold uppercase tracking-wider text-indigo-600">
        ${config.heroKicker}
      </div>
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
        ${config.heroHeadline}
      </h1>
      <p class="text-lg text-neutral-600 leading-relaxed">
        ${config.heroDescription}
      </p>
      <div class="pt-4 flex items-center justify-center gap-4">
        <a href="#contact" class="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm rounded-lg shadow-sm">
          ${config.heroCtaPrimary}
        </a>
        <a href="#services" class="px-5 py-3.5 bg-white border border-neutral-300 hover:bg-neutral-100 text-neutral-800 font-medium text-sm rounded-lg">
          ${config.heroCtaSecondary}
        </a>
      </div>
    </div>
  </section>

  <!-- Services / Capabilities -->
  ${
    config.sections.services && config.services.length > 0
      ? `
  <section id="services" class="py-16 sm:py-20 bg-white border-b border-neutral-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mb-12">
        <h2 class="text-3xl font-extrabold text-neutral-900">${config.servicesTitle}</h2>
        <p class="text-neutral-600 mt-2">${config.servicesSubtitle}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${config.services
          .map(
            (s) => `
        <div class="p-6 rounded-xl border border-neutral-200 bg-neutral-50/40">
          <div class="text-xs font-mono font-bold text-neutral-400 mb-2">${s.number}</div>
          <h3 class="text-lg font-bold text-neutral-900">${s.title}</h3>
          <p class="text-sm text-neutral-600 mt-2">${s.description}</p>
          ${s.metric ? `<div class="mt-4 pt-3 border-t border-neutral-200 text-xs font-bold text-indigo-600">${s.metric} · ${s.metricLabel || ''}</div>` : ''}
        </div>`
          )
          .join('')}
      </div>
    </div>
  </section>`
      : ''
  }

  <!-- Contact Section -->
  <section id="contact" class="py-16 sm:py-20 bg-neutral-50/80 border-b border-neutral-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-extrabold text-neutral-900">${config.contactTitle}</h2>
          <p class="text-neutral-600 mt-2">${config.contactSubtitle}</p>
          <div class="mt-6 space-y-3 text-sm text-neutral-700">
            <p><strong>ইমেইল:</strong> <a href="mailto:${config.contactEmail}" class="underline">${config.contactEmail}</a></p>
            <p><strong>ফোন/হোয়াটসঅ্যাপ:</strong> <a href="tel:${config.contactPhone.replace(/\s+/g, '')}" class="underline">${config.contactPhone}</a></p>
            <p><strong>ঠিকানা:</strong> ${config.contactAddress}</p>
          </div>
        </div>
        <div class="bg-white p-8 rounded-xl border border-neutral-200 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900 mb-4">${isBn ? 'ইনকোয়ারি পাঠান' : 'Direct Inquiry'}</h3>
          <form onsubmit="alert('${isBn ? 'ধন্যবাদ! আপনার বার্তা গ্রহণ করা হয়েছে।' : 'Thank you! Your inquiry was sent.'}'); return false;" class="space-y-4 text-xs">
            <div>
              <label class="block font-semibold mb-1">${isBn ? 'নাম' : 'Name'}</label>
              <input type="text" required class="w-full px-3 py-2 border rounded-lg" placeholder="${isBn ? 'আপনার নাম' : 'Your name'}">
            </div>
            <div>
              <label class="block font-semibold mb-1">${isBn ? 'ইমেইল' : 'Email'}</label>
              <input type="email" required class="w-full px-3 py-2 border rounded-lg" placeholder="email@domain.com">
            </div>
            <div>
              <label class="block font-semibold mb-1">${isBn ? 'বার্তা' : 'Message'}</label>
              <textarea rows="3" required class="w-full px-3 py-2 border rounded-lg" placeholder="${isBn ? 'আপনার প্রজেক্টের বর্ণনা...' : 'Project brief...'}"></textarea>
            </div>
            <button type="submit" class="w-full py-2.5 px-4 bg-neutral-900 text-white font-bold rounded-lg hover:bg-neutral-800">
              ${isBn ? 'বার্তা পাঠান' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-neutral-900 text-neutral-400 py-10">
    <div class="max-w-7xl mx-auto px-4 text-center text-xs space-y-2">
      <p class="text-white font-bold text-sm">${config.brandName}</p>
      <p>© ${new Date().getFullYear()} ${config.brandName}. ${isBn ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}</p>
    </div>
  </footer>

</body>
</html>`;
  };

  const code = generateStandaloneHTML();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${config.brandName.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'website'}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-7 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                {isBn ? 'ওয়েবসাইট কোড এক্সপোর্ট ও ডাউনলোড' : 'Export & Download Website'}
              </h3>
              <p className="text-xs text-neutral-500">
                {isBn
                  ? 'স্ট্যান্ডঅ্যালোন প্রোডাকশন-রেডি HTML5 + Tailwind CSS'
                  : 'Standalone, responsive, production-ready static HTML5 bundle'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="my-4 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 flex items-start gap-3 text-xs text-neutral-600">
          <Globe className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
          <div>
            <span className="font-bold text-neutral-900">
              {isBn ? 'কীভাবে লাইভ করবেন?' : 'Where can you host this?'}
            </span>
            <p className="mt-0.5 leading-relaxed text-neutral-600">
              {isBn
                ? 'এই কোডটি সরাসরি ডাউনলোড করে GitHub Pages, Vercel, Netlify অথবা আপনার যেকোনো cPanel হোস্টিং-এ index.html হিসেবে আপলোড করলেই সাইটটি লাইভ হয়ে যাবে!'
                : 'Download this single-file bundle and host it instantly for free on GitHub Pages, Vercel, Netlify, or any cPanel hosting server.'}
            </p>
          </div>
        </div>

        {/* Code Preview Box */}
        <div className="flex-1 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-xs font-mono text-neutral-300 relative">
          <pre className="h-48 sm:h-64 overflow-y-auto whitespace-pre text-[11px] leading-relaxed select-all">
            {code}
          </pre>
        </div>

        {/* Actions */}
        <div className="mt-5 pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          <span className="text-neutral-500 text-center sm:text-left">
            {isBn ? 'সাইজ: ~৬ KB (অতিরিক্ত কোনো ডিপেন্ডেন্সি নেই)' : 'Size: ~6 KB standalone'}
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 font-semibold transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">{isBn ? 'কপি হয়েছে!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{isBn ? 'কোড কপি করুন' : 'Copy Code'}</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-bold transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>{isBn ? 'index.html ডাউনলোড' : 'Download index.html'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
