import React, { useState } from 'react';
import { PageId, ServiceCategory, ServiceItem } from '../types';
import { SERVICES } from '../data/servicesData';
import { trackQuoteCtaClick, trackServiceSelect } from '../utils/analytics';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Car,
  ChevronRight,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
  Droplets,
  Layers,
  Wrench,
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onSelectServiceForQuote: (serviceId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onSelectServiceForQuote }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');

  const filteredServices =
    activeCategory === 'all'
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  const handleRequestQuote = (svc: ServiceItem) => {
    trackServiceSelect(svc.id, svc.name, svc.category);
    trackQuoteCtaClick('services_page_card', 'Request a Quote', svc.id);
    onSelectServiceForQuote(svc.id);
    onNavigate('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 py-8">
      {/* 1. Services Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#009E89] uppercase tracking-wider">
            <span>Tailored Automotive Treatments</span>
            <span aria-hidden="true">·</span>
            <span>Mobile Service in Adelaide</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#151A20] tracking-tight">
            Our Mobile Detailing Services
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Every package is executed with pH-balanced chemicals, filtered spot-free water, and scratch-minimising techniques brought directly to your location in Adelaide.
          </p>

          {/* Transparent Pricing Policy Notice (Per user requirement: do not invent actual prices) */}
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-950 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <strong>Transparent Quotation Policy:</strong> Automotive detailing is not a one-size-fits-all commodity. Because time and chemistry requirements depend on your vehicle’s physical dimensions, paint condition, and interior soiling, we provide transparent, obligation-free customized quotes. Click <strong>"Request a Quote"</strong> on any service below to receive your exact estimate.
            </div>
          </div>
        </div>

        {/* 2. Interactive Category Filter (Clean segmented buttons) */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider mr-2 shrink-0">
            Filter View:
          </span>
          {[
            { id: 'all', label: 'All Services' },
            { id: 'exterior', label: 'Exterior Detailing' },
            { id: 'interior', label: 'Interior Detailing' },
            { id: 'full', label: 'Full Detailing' },
            { id: 'addons', label: 'Premium Add-ons' },
          ].map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-[#151A20] text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Detailed Service Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {filteredServices.map((svc) => (
          <article
            key={svc.id}
            id={svc.id}
            className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Card Header Banner */}
            <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#009E89]">
                  <span>{svc.category.toUpperCase()} PACKAGE</span>
                  {svc.popular && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-600 font-semibold">Most Popular Choice</span>
                    </>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151A20] tracking-tight">
                  {svc.name}
                </h2>
                <p className="text-sm text-slate-600 italic">{svc.tagline}</p>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2 shrink-0">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Est. Time: <strong>{svc.estimatedDuration}</strong></span>
                </div>
                <button
                  onClick={() => handleRequestQuote(svc)}
                  className="px-5 py-2.5 rounded-lg bg-[#00BFA6] text-[#151A20] font-bold text-xs hover:bg-[#00D4B8] active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Service Description
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {svc.fullDescription}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Potential Benefits for Adelaide Drivers
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {svc.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-[#009E89] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <strong className="text-slate-900">Ideal For:</strong> {svc.idealFor}
                </div>
              </div>

              {/* Right: What's Included */}
              <div className="lg:col-span-5 bg-slate-50/60 p-6 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    What's Included
                  </h3>
                  <span className="text-xs text-slate-500">{svc.inclusions.length} Steps</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700">
                  {svc.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00BFA6] shrink-0 mt-1.5"></span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-slate-200">
                  <button
                    onClick={() => handleRequestQuote(svc)}
                    className="w-full py-3 rounded-lg bg-[#151A20] text-white font-bold text-xs hover:bg-[#00BFA6] hover:text-[#151A20] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Request a Quote for {svc.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* 4. Frequently Asked Questions (Mobile Detailing Logistics in Adelaide) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-3xl space-y-3 mb-8">
          <div className="text-xs font-bold text-[#009E89] uppercase tracking-wider">
            Common Inquiries
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151A20] tracking-tight">
            Frequently Asked Questions About Mobile Detailing
          </h2>
          <p className="text-sm text-slate-600">
            Everything you need to know about preparing for our mobile unit arrival in Adelaide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#009E89]" />
              Do I need to supply water or power?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our mobile detailing van is equipped with onboard pure water tanks and silent generator power. However, if a standard outdoor garden tap or standard 240V power point is easily accessible at your premises, we are happy to connect to reduce environmental generator noise.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#009E89]" />
              How are quotes calculated without fixed price tags?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fixed "flat-rate" prices often force operators to cut corners or rush jobs. Our tailored quote considers your vehicle's exact body size (hatchback vs 7-seater 4WD), interior soiling severity (e.g., heavy pet hair or red sand), and desired protection level, ensuring fair, honest pricing.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#009E89]" />
              What happens if it rains in Adelaide on my booking day?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If you have a sheltered carport, double garage, or underground workplace parking, we can detail comfortably in any weather. For exposed open driveways during stormy weather, we reschedule your booking to the next available dry day at no cancellation fee.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#009E89]" />
              Can you detail my car while I am at work?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Yes, this is one of our most popular options for busy corporate clients in the Adelaide CBD, Norwood, and commercial business parks. Simply provide key access or meet us at arrival; we detail the vehicle throughout your work day and return the keys when completed.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Closing Quote Prompt */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="p-8 rounded-2xl bg-[#151A20] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Ready to restore your car's cleanliness?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Submit a quick enquiry with your vehicle model and preferred service for a fast, tailored quote.
            </p>
          </div>
          <button
            onClick={() => {
              trackQuoteCtaClick('services_bottom', 'Request a Free Quote');
              onNavigate('contact');
            }}
            className="px-6 py-3.5 rounded-lg bg-[#00BFA6] text-[#151A20] font-bold text-sm hover:bg-[#00D4B8] active:scale-[0.98] transition-all whitespace-nowrap shadow-md"
          >
            Request a Free Quote
          </button>
        </div>
      </section>
    </div>
  );
};
