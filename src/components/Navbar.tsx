import React, { useState } from 'react';
import { PageId } from '../types';
import { trackQuoteCtaClick } from '../utils/analytics';
import { Sparkles, Menu, X, Activity, BookOpen, MapPin, Phone } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenGA4Debugger: () => void;
  onOpenMarketingStrategy: () => void;
  eventCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenGA4Debugger,
  onOpenMarketingStrategy,
  eventCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact & Quote' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuoteCta = () => {
    trackQuoteCtaClick('navbar_primary', 'Get a Free Quote');
    onNavigate('contact');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#151A20] border-b border-slate-800 text-white shadow-md">
      {/* Top Academic & Location Banner */}
      <div className="bg-[#0E1217] border-b border-slate-800/80 px-4 py-1.5 text-[11px] text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#00BFA6]" />
              Mobile Service across Metropolitan Adelaide, SA
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">
              Mon–Sat 7:30 AM – 6:00 PM
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenMarketingStrategy}
              className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Open Digital Marketing Strategy Dossier"
            >
              <BookOpen className="w-3 h-3 text-[#00BFA6]" />
              <span className="hidden xs:inline">Project</span> Strategy Dossier
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={onOpenGA4Debugger}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Inspect Real-time GA4 Events"
            >
              <Activity className="w-3 h-3 text-[#00BFA6]" />
              <span>GA4 Inspector</span>
              {eventCount > 0 && (
                <span className="px-1 py-0.2 text-[10px] bg-[#00BFA6] text-[#151A20] font-bold rounded">
                  {eventCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFA6] rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-lg bg-[#00BFA6] flex items-center justify-center text-[#151A20] font-extrabold shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-[#151A20]" />
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
                <span>Bubble & Squeak</span>
              </div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Mobile Car Detailing · Adelaide
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm font-semibold transition-all py-1.5 border-b-2 ${
                    isActive
                      ? 'text-white border-[#00BFA6]'
                      : 'text-slate-300 hover:text-white border-transparent hover:border-slate-500'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Primary CTA and Phone info */}
          <div className="hidden lg:flex items-center gap-5">
            <div className="text-right">
              <span className="block text-[11px] text-slate-400 font-medium">Adelaide Mobile Service</span>
              <span className="text-xs font-semibold text-slate-200">Doorstep & Workplace</span>
            </div>
            <button
              onClick={handleQuoteCta}
              className="px-5 py-2.5 rounded-lg font-bold text-sm bg-[#00BFA6] text-[#151A20] hover:bg-[#00D4B8] active:scale-[0.98] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFA6]"
            >
              Get a Free Quote
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleQuoteCta}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#00BFA6] text-[#151A20]"
            >
              Quote
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFA6]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#151A20] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-semibold transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-white text-[#00BFA6]'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#00BFA6]"></span>}
                </button>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={handleQuoteCta}
              className="w-full py-3 rounded-lg font-bold text-center bg-[#00BFA6] text-[#151A20] hover:bg-[#00D4B8] transition-colors"
            >
              Get a Free Quote
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMarketingStrategy();
                }}
                className="flex-1 py-2 text-xs font-medium text-slate-300 bg-slate-800/80 rounded-lg text-center"
              >
                Strategy Dossier
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGA4Debugger();
                }}
                className="flex-1 py-2 text-xs font-medium text-slate-300 bg-slate-800/80 rounded-lg text-center"
              >
                GA4 Inspector ({eventCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
