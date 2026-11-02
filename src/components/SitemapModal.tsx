import React, { useState } from 'react';
import { X, FileCode, Check, Copy, Globe } from 'lucide-react';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({ isOpen, onClose }) => {
  const [copiedType, setCopiedType] = useState<'sitemap' | 'robots' | null>(null);

  if (!isOpen) return null;

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Bubble & Squeak Mobile Car Detailing - Adelaide SA -->
  <url>
    <loc>https://username.github.io/bubble-and-squeak-detailing/</loc>
    <lastmod>2026-11-02</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://username.github.io/bubble-and-squeak-detailing/#services</loc>
    <lastmod>2026-11-02</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://username.github.io/bubble-and-squeak-detailing/#contact</loc>
    <lastmod>2026-11-02</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://username.github.io/bubble-and-squeak-detailing/#about</loc>
    <lastmod>2026-11-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

  const robotsTxt = `# Robots.txt for Bubble & Squeak Mobile Car Detailing Adelaide
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /draft/

# Canonical Sitemap URL
Sitemap: https://username.github.io/bubble-and-squeak-detailing/sitemap.xml`;

  const copyToClipboard = (text: string, type: 'sitemap' | 'robots') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sitemap-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl rounded-xl bg-white shadow-2xl border border-slate-200 overflow-hidden text-slate-800 my-8">
        <div className="flex items-center justify-between px-6 py-4 bg-[#151A20] text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#00BFA6]/20 text-[#00BFA6]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 id="sitemap-modal-title" className="text-lg font-bold text-white tracking-tight">
                SEO Sitemap & Robots.txt
              </h2>
              <p className="text-xs text-slate-400">
                Static XML sitemap and search engine crawler directives for GitHub Pages
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close sitemap modal"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* sitemap.xml */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-[#009E89]" />
                sitemap.xml (Public Root)
              </span>
              <button
                onClick={() => copyToClipboard(sitemapXml, 'sitemap')}
                className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                {copiedType === 'sitemap' ? (
                  <span className="flex items-center gap-1 text-emerald-600">
                    <Check className="w-3.5 h-3.5" /> Copied XML!
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Copy className="w-3.5 h-3.5" /> Copy sitemap.xml
                  </span>
                )}
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono overflow-x-auto max-h-44 leading-relaxed">
              {sitemapXml}
            </pre>
          </div>

          {/* robots.txt */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-[#009E89]" />
                robots.txt (Crawler Directives)
              </span>
              <button
                onClick={() => copyToClipboard(robotsTxt, 'robots')}
                className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                {copiedType === 'robots' ? (
                  <span className="flex items-center gap-1 text-emerald-600">
                    <Check className="w-3.5 h-3.5" /> Copied robots.txt!
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Copy className="w-3.5 h-3.5" /> Copy robots.txt
                  </span>
                )}
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono overflow-x-auto max-h-36 leading-relaxed">
              {robotsTxt}
            </pre>
          </div>

          <p className="text-xs text-slate-500">
            Note: Place these files in the <code className="px-1 py-0.5 bg-slate-100 rounded text-slate-700 font-mono">/public</code> folder prior to final export for GitHub Pages so they are copied directly into the build root.
          </p>
        </div>

        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#151A20] text-white text-xs font-medium rounded-lg hover:bg-[#2A323D] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
