import React from 'react';
import { PageId } from '../types';
import { trackQuoteCtaClick } from '../utils/analytics';
import { ASSET_IMAGES } from '../assets/images';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  HeartHandshake,
  Droplets,
  Layers,
  ArrowRight,
  BookOpen,
  MapPin,
  Car,
  FileCheck,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const handleQuoteCta = () => {
    trackQuoteCtaClick('about_page_cta', 'Request a Free Quote');
    onNavigate('contact');
  };

  return (
    <div className="space-y-16 py-8">
      {/* 1. Header / Hero Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#009E89] uppercase tracking-wider">
            <span>Customer-Focused Mobile Care</span>
            <span aria-hidden="true">·</span>
            <span>Adelaide, South Australia</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#151A20] tracking-tight">
            About Bubble & Squeak Mobile Car Detailing
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed">
            Founded on a simple realization: vehicle owners take pride in clean cars, but modern Adelaide professionals and working families rarely have spare hours to spend driving to an industrial detailing workshop.
          </p>
        </div>
      </section>

      {/* 2. Business Concept & The Mobile Convenience Advantage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-bold text-[#009E89] uppercase tracking-wider">
              The Mobile Advantage
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151A20] tracking-tight">
              Why We Bring the Detailing Studio to Your Location
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Traditional car detailing requires booking weeks in advance, driving through heavy Adelaide traffic, organizing return transport or waiting in uncomfortable waiting rooms, and losing half your weekend.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Bubble & Squeak re-engineers this experience. We bring a fully self-contained vehicle detailing system directly to your private driveway, residential garage, or workplace parking space. You carry on with your meetings, family time, or weekend relaxation while we restore your vehicle to immaculate showroom condition.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-teal-50 text-[#009E89] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-700">
                  <strong className="text-slate-900 block">Zero Travel Time for Customers:</strong> Your day proceeds uninterrupted while professional car detailing takes place steps away.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-teal-50 text-[#009E89] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-700">
                  <strong className="text-slate-900 block">One-on-One Vehicle Care:</strong> Unlike high-volume automated conveyor washes, each vehicle receives our undivided attention.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-teal-50 text-[#009E89] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-700">
                  <strong className="text-slate-900 block">Tailored to Adelaide Driving Realities:</strong> Solutions formulated for red dust, coastal sea spray, and intense South Australian sun UV exposure.
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900">
              <img
                src={ASSET_IMAGES.interior}
                alt="Close-up of vehicle cabin undergoing meticulous interior detailing with fine detailing brushes and vacuum extraction"
                className="w-full h-auto object-cover"
                loading="lazy"
                width="1280"
                height="720"
              />
              <div className="p-4 bg-[#151A20] text-xs text-slate-300 flex items-center justify-between">
                <span>Precision interior air vent dusting and leather care</span>
                <span className="text-[#00BFA6] font-semibold">Meticulous Detail</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission, Brand Values, and Quality Standards */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-bold text-[#009E89] uppercase tracking-wider">
              Our Guiding Principles
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151A20] tracking-tight">
              Mission & Brand Values
            </h2>
            <p className="text-sm text-slate-600">
              The fundamental standards behind every vehicle we detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Value 1 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-[#009E89]">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">1. Paint Preservation Over Speed</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We reject harsh automated brushes and acidic degreasers that accelerate clear coat degradation. We use gentle pH-neutral snow foams, filtered water, clean microfibres, and two-bucket methods designed to eliminate wash-induced micro-scratches.
              </p>
            </div>

            {/* Value 2 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-[#009E89]">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">2. Respect for Customer Time</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Punctuality is a core brand pillar. We arrive within confirmed booking windows, communicate transparently before arrival, and finish within realistic time estimates so your schedule is never compromised.
              </p>
            </div>

            {/* Value 3 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-[#009E89]">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">3. Honest, Transparent Quotations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We believe in straightforward pricing based on confirmed vehicle size, surface condition, and customer expectations. We do not invent arbitrary quotes or push unnecessary services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Ethical Marketing & Authenticity Statement (Per academic prompt rules) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-slate-100 border border-slate-200 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#151A20] text-white">
              <FileCheck className="w-5 h-5 text-[#00BFA6]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Ethical Marketing & Academic Project Integrity
              </h3>
              <p className="text-xs text-slate-500">
                Transparent communication policy strictly avoiding invented credentials
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-700 leading-relaxed space-y-2">
            <p>
              In alignment with Australian Consumer Law and our university project guidelines:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>
                <strong>No Fabricated History or Certifications:</strong> We do not invent fake business founding dates, fabricated industry awards, or unverified accreditation badges.
              </li>
              <li>
                <strong>Realistic Quotations:</strong> Because detailing outcomes depend on existing paint oxidation, stain severity, and vehicle dimensions, all quotes are customized and reviewed before confirmation.
              </li>
              <li>
                <strong>Responsible Operations:</strong> We use eco-friendly wash formulas and capture waste runoff responsibly to protect Adelaide stormwater drains and local waterways.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Adelaide Local Service Commitment & Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="p-8 rounded-2xl bg-[#151A20] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-[#00BFA6] uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Serving Greater Adelaide
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Experience the Convenience of Mobile Car Detailing
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              From the coast of Glenelg to the foothills of Burnside, we bring professional automotive care directly to your location.
            </p>
          </div>
          <button
            onClick={handleQuoteCta}
            className="px-6 py-3.5 rounded-lg bg-[#00BFA6] text-[#151A20] font-bold text-sm hover:bg-[#00D4B8] active:scale-[0.98] transition-all whitespace-nowrap shadow-md"
          >
            Request a Free Quote
          </button>
        </div>
      </section>
    </div>
  );
};
