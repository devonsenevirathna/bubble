import React from 'react';
import { PageId } from '../types';
import { trackQuoteCtaClick } from '../utils/analytics';
import { Sparkles, MapPin, Clock, ShieldCheck, ExternalLink, Activity, BookOpen, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenGA4Debugger: () => void;
  onOpenMarketingStrategy: () => void;
  onOpenSitemap: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenGA4Debugger,
  onOpenMarketingStrategy,
  onOpenSitemap,
}) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0E1217] text-slate-300 border-t border-slate-800 text-sm">
      {/* Upper Footer: Academic & Digital Marketing Disclosure */}
      <div className="bg-[#151A20] border-b border-slate-800/80 px-4 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00BFA6]"></span>
            <span>
              <strong>Academic Project Context:</strong> Developed for digital marketing university curriculum demonstration (SEO, CRO, GA4 & WCAG 2.2 AA).
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMarketingStrategy}
              className="text-[#00BFA6] hover:underline flex items-center gap-1 font-medium"
            >
              <BookOpen className="w-3.5 h-3.5" />
              View Marketing Strategy Dossier
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={onOpenGA4Debugger}
              className="text-[#00BFA6] hover:underline flex items-center gap-1 font-medium"
            >
              <Activity className="w-3.5 h-3.5" />
              GA4 Live Inspector
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Positioning */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#00BFA6] flex items-center justify-center text-[#151A20] font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Bubble & Squeak
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Adelaide’s customer-focused mobile car detailing service. We bring professional equipment, spot-free water, and showroom-grade care directly to your home or office.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  trackQuoteCtaClick('footer_primary', 'Request a Quote');
                  handleNav('contact');
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-[#00BFA6] text-[#151A20] font-bold text-xs hover:bg-[#00D4B8] transition-colors"
              >
                Request a Free Quote
              </button>
            </div>
          </div>

          {/* Col 2: Navigation & Detailing Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Detailing Services
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#00BFA6] transition-colors"
                >
                  Exterior Car Detailing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#00BFA6] transition-colors"
                >
                  Interior Car Detailing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#00BFA6] transition-colors"
                >
                  Full Car Detailing Package
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#00BFA6] transition-colors"
                >
                  Premium Specialist Add-ons
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#00BFA6] transition-colors"
                >
                  About Our Mobile Philosophy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Adelaide Service Areas */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#00BFA6]" />
              Adelaide Coverage
            </h3>
            <p className="text-xs text-slate-400">
              Mobile fully-equipped unit travelling throughout:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>· Adelaide CBD & North Adelaide</li>
              <li>· Eastern Suburbs (Norwood, Burnside)</li>
              <li>· Western Suburbs (Glenelg, Henley Beach)</li>
              <li>· Southern Suburbs (Marion, Mitcham)</li>
              <li>· Northern Suburbs (Tea Tree Gully, Mawson)</li>
              <li>· Adelaide Hills (By appointment)</li>
            </ul>
          </div>

          {/* Col 4: Service Hours & Compliance */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#00BFA6]" />
              Service Hours
            </h3>
            <div className="text-xs text-slate-400 space-y-1">
              <p className="text-white font-medium">Monday – Saturday:</p>
              <p>7:30 AM – 6:00 PM</p>
              <p className="text-white font-medium pt-1">Sunday & Public Holidays:</p>
              <p>Available by advance booking</p>
            </div>
            <div className="pt-2 text-xs text-slate-500 border-t border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00BFA6]" />
                <span>Zero unverified claims policy</span>
              </div>
              <p className="text-[11px] leading-tight">
                All quotes are customized based on vehicle dimensions, surface condition, and location.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Technical Links */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Bubble & Squeak Mobile Car Detailing · Adelaide, South Australia. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenSitemap}
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#00BFA6]" />
              Sitemap & Robots.txt
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('contact')}
              className="hover:text-white transition-colors"
            >
              Privacy Notice
            </button>
            <span>·</span>
            <button
              onClick={onOpenMarketingStrategy}
              className="hover:text-white transition-colors"
            >
              Academic Portfolio Rationale
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
