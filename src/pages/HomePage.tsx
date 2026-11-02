import React from 'react';
import { PageId } from '../types';
import { trackQuoteCtaClick, trackServiceSelect } from '../utils/analytics';
import { ASSET_IMAGES } from '../assets/images';
import { SERVICES } from '../data/servicesData';
import {
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Smile,
  Star,
  MapPin,
  ChevronRight,
  Car,
  Droplets,
  Layers,
  Award,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectServiceForQuote: (serviceId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectServiceForQuote }) => {
  const handlePrimaryQuote = () => {
    trackQuoteCtaClick('hero_primary', 'Get a Free Quote');
    onNavigate('contact');
  };

  const handleExploreServices = () => {
    trackQuoteCtaClick('hero_secondary', 'Explore Our Services');
    onNavigate('services');
  };

  const handleSelectService = (serviceId: string, serviceName: string, category: string) => {
    trackServiceSelect(serviceId, serviceName, category);
    onSelectServiceForQuote(serviceId);
    onNavigate('contact');
  };

  return (
    <div className="space-y-16 md:space-y-24">
      {/* 1. Hero Section */}
      <section className="relative bg-[#151A20] text-white overflow-hidden py-16 md:py-24">
        {/* Subtle background glow/mesh without ugly pills */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#00BFA6_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Unboxed clean metadata kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#00BFA6] tracking-wider uppercase">
                <span>Adelaide Mobile Service</span>
                <span aria-hidden="true">·</span>
                <span>At Your Home or Office</span>
                <span aria-hidden="true">·</span>
                <span>South Australia</span>
              </div>

              {/* Exact required headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Professional Mobile Car Detailing in Adelaide
              </h1>

              {/* Exact required supporting headline */}
              <p className="text-xl sm:text-2xl font-medium text-slate-200">
                We Bring the Shine to You
              </p>

              {/* Descriptive benefit statement */}
              <p className="text-base text-slate-300 max-w-xl leading-relaxed">
                Save hours of travel and weekend queues. Our self-contained mobile detailing unit delivers paint decontamination, swirl-minimising washing, and interior steam extraction directly to your Adelaide driveway or corporate parking space.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={handlePrimaryQuote}
                  className="px-6 py-3.5 rounded-lg bg-[#00BFA6] text-[#151A20] font-bold text-base hover:bg-[#00D4B8] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFA6]"
                >
                  <span>Get a Free Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleExploreServices}
                  className="px-6 py-3.5 rounded-lg bg-white/10 text-white font-semibold text-base hover:bg-white/20 transition-all border border-white/10 flex items-center justify-center gap-2"
                >
                  <span>Explore Our Services</span>
                </button>
              </div>

              {/* Key trust bullets (clean text without pills) */}
              <div className="pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00BFA6] shrink-0" />
                  <span>Self-powered & self-contained water</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00BFA6] shrink-0" />
                  <span>pH-neutral premium chemistry</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00BFA6] shrink-0" />
                  <span>Quotes confirmed within 4 hours</span>
                </div>
              </div>
            </div>

            {/* Right Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-900 group">
                <img
                  src={ASSET_IMAGES.hero}
                  alt="Professional mobile car detailing in an Adelaide driveway showing a freshly detailed sedan with mirror finish paintwork"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                  loading="eager"
                  width="1280"
                  height="720"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151A20]/90 via-transparent to-transparent"></div>

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#151A20]/90 backdrop-blur-md border border-slate-700/60 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">Adelaide Mobile Studio Unit</span>
                      <span className="text-slate-400 text-[11px]">Fully equipped with spot-free water & power</span>
                    </div>
                    <span className="text-[#00BFA6] font-bold">100% Mobile</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Value Propositions Section (Three value propositions) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-bold text-[#009E89] uppercase tracking-wider">
            Why Choose Bubble & Squeak
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151A20] tracking-tight">
            Built Around Your Schedule & Vehicle Integrity
          </h2>
          <p className="text-sm text-slate-600">
            We eliminate the hassle of traditional workshops while elevating the standard of automotive surface care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Prop 1: Convenience */}
          <div className="p-8 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#009E89]">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#151A20]">1. Total Convenience</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              No more rearranging your work day, arranging rides to industrial estates, or wasting Saturday mornings in a queue. We arrive fully equipped at your home, workplace, or private premises across Adelaide.
            </p>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
              Ideal for busy Adelaide corporate professionals and active families.
            </div>
          </div>

          {/* Prop 2: Professional Care */}
          <div className="p-8 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#009E89]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#151A20]">2. Professional Care</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Automatic car washes and rushed hand washes use recycled gritty water and abrasive brushes that cause permanent swirl marks. We use pH-neutral snow foams, filtered water, and two-bucket grit-guarded mitts to preserve your clear coat.
            </p>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
              Paint-safe techniques engineered for Australia’s high UV climate.
            </div>
          </div>

          {/* Prop 3: Attention to Detail */}
          <div className="p-8 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#009E89]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#151A20]">3. Attention to Detail</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              From deep-cleaning inner wheel barrels and door shuts to extracting stubborn dust from air vents and seat seams, we focus on the minute details that transform a vehicle from merely washed to truly detailed.
            </p>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
              Meticulous craftsmanship for sedans, SUVs, 4WDs, and prestige vehicles.
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Detailing Services Preview */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-bold text-[#009E89] uppercase tracking-wider">
                Tailored Vehicle Care
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151A20] tracking-tight">
                Featured Mobile Detailing Packages
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Choose the service package that matches your vehicle's condition and maintenance goals.
              </p>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="text-sm font-bold text-[#151A20] hover:text-[#009E89] flex items-center gap-1 transition-colors self-start md:self-auto"
            >
              <span>View All 4 Service Sections</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.slice(0, 3).map((svc) => (
              <div
                key={svc.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#009E89]">
                      {svc.category} Detail
                    </span>
                    <span className="text-xs text-slate-500">{svc.estimatedDuration}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#151A20]">{svc.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{svc.shortDescription}</p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Key Highlights:</span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {svc.inclusions.slice(0, 3).map((inc, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00BFA6] shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Custom Quotation</span>
                    <span className="text-xs font-bold text-slate-800">Based on vehicle size</span>
                  </div>
                  <button
                    onClick={() => handleSelectService(svc.id, svc.name, svc.category)}
                    className="px-4 py-2 text-xs font-bold bg-[#151A20] text-white rounded-lg hover:bg-[#00BFA6] hover:text-[#151A20] transition-colors"
                  >
                    Request a Quote
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Specialist Add-ons Banner */}
          <div className="mt-8 p-6 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-[#009E89] shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Looking for Pet Hair Extraction or Headlight Polish?
                </h4>
                <p className="text-xs text-slate-600">
                  We offer targeted add-on solutions that can be paired with any detailing booking.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="px-4 py-2 text-xs font-bold text-[#151A20] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
            >
              Explore Add-ons
            </button>
          </div>
        </div>
      </section>

      {/* 4. Three-step Customer Journey */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-bold text-[#009E89] uppercase tracking-wider">
            Simple & Transparent
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151A20] tracking-tight">
            How Our Mobile Service Works
          </h2>
          <p className="text-sm text-slate-600">
            Three simple steps from initial enquiry to enjoying your refreshed vehicle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm relative space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#151A20] text-white flex items-center justify-center font-mono font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-[#151A20]">Choose a Service</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Select between Exterior, Interior, Full Detailing, or specific add-ons based on your vehicle's condition, goals, and budget.
            </p>
            <div className="text-[11px] text-[#009E89] font-medium pt-2">
              Browse transparent inclusions online
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm relative space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#00BFA6] text-[#151A20] flex items-center justify-center font-mono font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-[#151A20]">Request a Booking</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Submit our quick quote form with your vehicle type and Adelaide suburb. We confirm your date, time, and customized quote within 4 business hours.
            </p>
            <div className="text-[11px] text-[#009E89] font-medium pt-2">
              Fast, zero-obligation quotation
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm relative space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#151A20] text-white flex items-center justify-center font-mono font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-bold text-[#151A20]">Enjoy Your Clean Car</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We arrive at your driveway or workplace with all required equipment, water, and power. Inspect your gleaming showroom finish and pay with ease.
            </p>
            <div className="text-[11px] text-[#009E89] font-medium pt-2">
              Zero travel time required on your end
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Testimonials Section (Explicitly labeled as illustrative per brief) */}
      <section className="bg-slate-100/70 py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Transparent Academic Label */}
          <div className="p-3.5 rounded-lg bg-teal-50 border border-teal-200 text-xs text-teal-900 mb-8 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>
                <strong>Academic Integrity Notice:</strong> Customer reviews below are illustrative sample content demonstrating marketing strategy and UX layout until genuine verified Google/Facebook reviews are gathered.
              </span>
            </div>
            <span className="text-[11px] font-mono text-teal-700">Digital Marketing Project</span>
          </div>

          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <div className="text-xs font-bold text-[#009E89] uppercase tracking-wider">
              Customer Perspectives
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151A20] tracking-tight">
              Illustrative Customer Experiences
            </h2>
            <p className="text-sm text-slate-600">
              How our target Adelaide personas benefit from mobile vehicle detailing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "As a lawyer working in the Adelaide CBD, I simply don’t have time on weekends to drive out to a workshop. Bubble & Squeak detailed my Audi right in our office carpark. Came out at 5 PM to an immaculate showroom finish."
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">Sarah M.</span>
                  <span className="text-slate-500 text-[11px]">Burnside · European Sedan</span>
                </div>
                <span className="text-slate-400 text-[11px]">Illustrative Persona</span>
              </div>
            </div>

            {/* Review 2 */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "Our Prado was filled with beach sand from Brighton and snack stains from the kids. The interior steam cleaning removed every single trace of grime and stubborn odours without any chemical smell. Incredibly convenient for our family."
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">David & Megan T.</span>
                  <span className="text-slate-500 text-[11px]">Marion · 7-Seat 4WD</span>
                </div>
                <span className="text-slate-400 text-[11px]">Illustrative Persona</span>
              </div>
            </div>

            {/* Review 3 */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "I’m very particular about swirl marks on dark paint. Their two-bucket technique, iron decontamination, and hydrophobic sealant application exceeded my expectations. Professional care in my own driveway."
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">Julian K.</span>
                  <span className="text-slate-500 text-[11px]">Prospect · Enthusiast Coupe</span>
                </div>
                <span className="text-slate-400 text-[11px]">Illustrative Persona</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Strong Closing Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-2xl bg-[#151A20] text-white p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-xl border border-slate-800">
          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="text-xs font-bold text-[#00BFA6] tracking-wider uppercase">
              Ready for a Showroom Shine?
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Experience Adelaide’s Premier Mobile Detailing at Your Doorstep
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Tell us your vehicle type and Adelaide location. We'll send a clear, tailored quote with zero hidden charges and convenient scheduling.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={handlePrimaryQuote}
                className="px-8 py-3.5 rounded-lg bg-[#00BFA6] text-[#151A20] font-bold text-base hover:bg-[#00D4B8] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Get a Free Quote Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleExploreServices}
                className="px-6 py-3.5 rounded-lg bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors border border-white/10 text-center"
              >
                Explore Service Inclusions
              </button>
            </div>
            <p className="text-xs text-slate-400 pt-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#00BFA6]" />
              Serving Adelaide CBD, Eastern Suburbs, Western Coast, Southern Metro & Hills.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
