import React from 'react';
import { TemplateType, ViewportMode, ThemeColor, Language } from '../../types';
import { COLOR_THEMES } from '../../data/templates';
import {
  Monitor,
  Tablet,
  Smartphone,
  SlidersHorizontal,
  Code2,
  RotateCcw,
  Sparkles,
  Palette,
  ExternalLink,
} from 'lucide-react';

interface BuilderToolbarProps {
  currentTemplate: TemplateType;
  onSelectTemplate: (template: TemplateType) => void;
  viewportMode: ViewportMode;
  onChangeViewport: (mode: ViewportMode) => void;
  currentColor: ThemeColor;
  onChangeColor: (color: ThemeColor) => void;
  lang: Language;
  onToggleLang: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenExport: () => void;
  onReset: () => void;
}

export const BuilderToolbar: React.FC<BuilderToolbarProps> = ({
  currentTemplate,
  onSelectTemplate,
  viewportMode,
  onChangeViewport,
  currentColor,
  onChangeColor,
  lang,
  onToggleLang,
  isSidebarOpen,
  onToggleSidebar,
  onOpenExport,
  onReset,
}) => {
  const isBn = lang === 'bn';

  const templates: { id: TemplateType; nameBn: string; nameEn: string }[] = [
    { id: 'agency', nameBn: 'এজেন্সি ও বিজনেস', nameEn: 'Agency & Tech' },
    { id: 'portfolio', nameBn: 'ব্যক্তিগত পোর্টফোলিও', nameEn: 'Portfolio & Dev' },
    { id: 'ecommerce', nameBn: 'ই-কমার্স শপ', nameEn: 'E-Commerce Store' },
    { id: 'restaurant', nameBn: 'রেস্তোরাঁ ও ক্যাফে', nameEn: 'Restaurant & Cafe' },
    { id: 'saas', nameBn: 'ক্লাউড স্টার্টআপ', nameEn: 'SaaS Software' },
  ];

  const colors: ThemeColor[] = ['indigo', 'emerald', 'amber', 'rose', 'slate', 'cyan'];

  return (
    <div className="bg-neutral-900 text-white border-b border-neutral-800 text-xs px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50 shadow-md">
      {/* Left: Studio Branding & Template Selector */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 font-bold tracking-tight text-white pr-2 border-r border-neutral-700">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>SiteCraft</span>
          <span className="text-[10px] font-medium text-neutral-400">
            {isBn ? 'স্টুডিও' : 'Studio'}
          </span>
        </div>

        {/* Template Selector Tabs */}
        <div className="flex items-center gap-1 bg-neutral-800 p-0.5 rounded-lg overflow-x-auto max-w-full">
          {templates.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => onSelectTemplate(tpl.id)}
              className={`px-2.5 py-1 rounded-md font-medium transition-all whitespace-nowrap ${
                currentTemplate === tpl.id
                  ? 'bg-neutral-700 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {isBn ? tpl.nameBn : tpl.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Middle: Device Viewport Emulation */}
      <div className="hidden lg:flex items-center gap-1 bg-neutral-800 p-0.5 rounded-lg">
        <button
          onClick={() => onChangeViewport('desktop')}
          className={`p-1.5 rounded-md transition-colors ${
            viewportMode === 'desktop'
              ? 'bg-neutral-700 text-white'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
          title="Desktop View (1440px)"
        >
          <Monitor className="w-4 h-4" />
        </button>
        <button
          onClick={() => onChangeViewport('tablet')}
          className={`p-1.5 rounded-md transition-colors ${
            viewportMode === 'tablet'
              ? 'bg-neutral-700 text-white'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
          title="Tablet View (768px)"
        >
          <Tablet className="w-4 h-4" />
        </button>
        <button
          onClick={() => onChangeViewport('mobile')}
          className={`p-1.5 rounded-md transition-colors ${
            viewportMode === 'mobile'
              ? 'bg-neutral-700 text-white'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
          title="Mobile View (375px)"
        >
          <Smartphone className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Color Palette, Customizer Drawer & Export */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Color Palette Swatches */}
        <div className="flex items-center gap-1.5 pr-2 border-r border-neutral-700">
          <Palette className="w-3.5 h-3.5 text-neutral-400 hidden sm:block" />
          <div className="flex items-center gap-1">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => onChangeColor(c)}
                className={`w-4 h-4 rounded-full transition-transform ${
                  COLOR_THEMES[c].primary
                } ${currentColor === c ? 'scale-125 ring-2 ring-white ring-offset-1 ring-offset-neutral-900' : 'opacity-70 hover:opacity-100'}`}
                title={COLOR_THEMES[c].nameEn}
              />
            ))}
          </div>
        </div>

        {/* Language switch */}
        <button
          onClick={onToggleLang}
          className="px-2 py-1 font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-md transition-colors"
        >
          {isBn ? 'EN' : 'বাংলা'}
        </button>

        {/* Sidebar Toggle */}
        <button
          onClick={onToggleSidebar}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold transition-colors ${
            isSidebarOpen
              ? 'bg-indigo-600 text-white'
              : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isBn ? 'এডিটর' : 'Editor'}</span>
        </button>

        {/* Reset */}
        <button
          onClick={onReset}
          className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
          title={isBn ? 'রিসেট করুন' : 'Reset to template defaults'}
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Export Code Button */}
        <button
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-neutral-100 text-neutral-900 font-bold rounded-md transition-colors shadow-xs"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>{isBn ? 'কোড ডাউনলোড' : 'Export Code'}</span>
        </button>
      </div>
    </div>
  );
};
