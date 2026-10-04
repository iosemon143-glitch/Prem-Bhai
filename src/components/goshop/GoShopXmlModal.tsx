import React, { useState } from 'react';
import { GOSHOP_BLOGGER_XML_TEMPLATE } from '../../data/goshopData';
import { X, Copy, Check, Download, FileCode2, HelpCircle } from 'lucide-react';

interface GoShopXmlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoShopXmlModal: React.FC<GoShopXmlModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(GOSHOP_BLOGGER_XML_TEMPLATE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([GOSHOP_BLOGGER_XML_TEMPLATE], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'GoShop_Liquid_Glass_Blogger_Theme.xml';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-white/90 max-h-[92vh] flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#0071e3]/10 text-[#0071e3]">
              <FileCode2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                GoShop Ultra-Premium Liquid Glass XML Theme
              </h3>
              <p className="text-xs text-slate-500">
                Full valid Blogger / Blogspot XML template ready for instant upload
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Installation Instruction Banner */}
        <div className="my-4 p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-xs text-slate-700 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-[#0071e3] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-extrabold text-[#0071e3]">How to install in Blogger:</span>
            <ol className="list-decimal list-inside space-y-0.5 text-slate-600 font-medium">
              <li>Click <strong>Download .xml File</strong> below.</li>
              <li>Open your <strong>Blogger Dashboard</strong> (<a href="https://blogger.com" target="_blank" rel="noreferrer" className="underline text-[#0071e3]">blogger.com</a>).</li>
              <li>Go to <strong>Theme</strong> menu in the left sidebar.</li>
              <li>Click the small arrow next to the orange <strong>Customize</strong> button.</li>
              <li>Click <strong>Restore</strong> &rarr; <strong>Upload</strong> and select the downloaded <code>.xml</code> file!</li>
            </ol>
          </div>
        </div>

        {/* Code Preview */}
        <div className="flex-1 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs font-mono text-slate-300 relative shadow-inner">
          <div className="absolute top-2 right-4 text-[10px] text-slate-500 uppercase tracking-widest">
            Blogger XML 1.0 Strict
          </div>
          <pre className="h-56 sm:h-72 overflow-y-auto whitespace-pre text-[11px] leading-relaxed select-all">
            {GOSHOP_BLOGGER_XML_TEMPLATE}
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          <span className="text-slate-500 text-center sm:text-left font-medium">
            Standard Blogger tags: &lt;b:skin&gt;, &lt;b:section&gt;, &lt;b:widget&gt;, &lt;b:loop&gt;
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold transition-all shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy XML Code</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0071e3] to-[#5e5ce6] hover:opacity-95 text-white font-bold transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download .xml File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
