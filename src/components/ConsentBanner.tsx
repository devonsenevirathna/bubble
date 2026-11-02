import React, { useState, useEffect } from 'react';
import { getConsentStatus, setConsentStatus } from '../utils/analytics';
import { ConsentStatus } from '../types';
import { ShieldCheck, Cookie } from 'lucide-react';

export const ConsentBanner: React.FC = () => {
  const [status, setStatus] = useState<ConsentStatus>('pending');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const current = getConsentStatus();
    setStatus(current);
    if (current === 'pending') {
      // Show banner after brief delay
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible || status !== 'pending') return null;

  const handleChoice = (choice: 'granted' | 'denied') => {
    setConsentStatus(choice);
    setStatus(choice);
    setIsVisible(false);
  };

  return (
    <aside
      aria-label="Cookie and Analytics Consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-40 bg-[#151A20] text-white p-4 rounded-xl shadow-2xl border border-slate-700/80 animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-[#00BFA6]/20 text-[#00BFA6] shrink-0 mt-0.5">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              Analytics & Privacy Notice
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            We use privacy-friendly Google Analytics 4 to evaluate user experience and optimize our Adelaide mobile detailing service. We never collect or store your name, email, or telephone in analytics cookies.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => handleChoice('granted')}
              className="px-3.5 py-1.5 text-xs font-semibold bg-[#00BFA6] text-[#151A20] rounded-lg hover:bg-[#00D4B8] transition-colors focus:ring-2 focus:ring-[#00BFA6]"
            >
              Accept Analytics
            </button>
            <button
              onClick={() => handleChoice('denied')}
              className="px-3.5 py-1.5 text-xs font-semibold bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1">
        <ShieldCheck className="w-3.5 h-3.5 text-[#00BFA6]" />
        <span>Compliant with Australian Privacy Principles (APPs).</span>
      </div>
    </aside>
  );
};
