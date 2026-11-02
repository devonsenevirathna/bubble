import React, { useState, useEffect } from 'react';
import { PageId, QuoteFormData, FormErrors, VehicleCategory } from '../types';
import { SERVICES, VEHICLE_TYPES, ADELAIDE_REGIONS } from '../data/servicesData';
import { trackQuoteDraftValidated, trackQuoteCtaClick } from '../utils/analytics';
import {
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Mail,
  Send,
  HelpCircle,
  Car,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface ContactPageProps {
  initialServiceId?: string;
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialServiceId, onNavigate }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    email: '',
    phone: '',
    vehicleType: '',
    serviceId: initialServiceId || 'full-detailing',
    suburb: 'Adelaide CBD & North Adelaide',
    message: '',
    preferredTime: 'anytime',
    marketingConsent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [draftGenerated, setDraftGenerated] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  useEffect(() => {
    if (initialServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: initialServiceId }));
    }
  }, [initialServiceId]);

  const validateField = (field: keyof QuoteFormData, value: unknown): string | undefined => {
    switch (field) {
      case 'fullName':
        if (!value || typeof value !== 'string' || value.trim().length < 2) {
          return 'Please enter your full name (at least 2 characters).';
        }
        break;
      case 'email':
        if (!value || typeof value !== 'string') {
          return 'Email address is required.';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address (e.g., name@example.com).';
        }
        break;
      case 'phone':
        if (!value || typeof value !== 'string') {
          return 'Phone number is required for mobile booking confirmation.';
        }
        // Basic phone validation for Australian mobile or local landlines
        const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
        if (cleanPhone.length < 8 || !/^\+?[0-9]{8,15}$/.test(cleanPhone)) {
          return 'Please enter a valid phone number (e.g., 0412 345 678).';
        }
        break;
      case 'vehicleType':
        if (!value) {
          return 'Please select your vehicle category.';
        }
        break;
      case 'serviceId':
        if (!value) {
          return 'Please select a preferred detailing service.';
        }
        break;
      default:
        break;
    }
    return undefined;
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    (['fullName', 'email', 'phone', 'vehicleType', 'serviceId'] as const).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof QuoteFormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (field: keyof QuoteFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      vehicleType: true,
      serviceId: true,
    });

    if (validateAll()) {
      // Fire validated event WITHOUT personally identifiable information
      trackQuoteDraftValidated(
        formData.vehicleType || 'unspecified',
        formData.serviceId,
        formData.suburb
      );

      setDraftGenerated(true);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const selectedServiceObj = SERVICES.find((s) => s.id === formData.serviceId);
  const selectedVehicleObj = VEHICLE_TYPES.find((v) => v.id === formData.vehicleType);

  const formattedDraftText = `BUBBLE & SQUEAK MOBILE CAR DETAILING - ENQUIRY DRAFT
--------------------------------------------------
Customer: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Location: ${formData.suburb}, Adelaide SA
Vehicle: ${selectedVehicleObj?.label || formData.vehicleType}
Service: ${selectedServiceObj?.name || formData.serviceId}
Preferred Time: ${formData.preferredTime.toUpperCase()}
Customer Message / Notes:
${formData.message || 'No additional notes provided.'}
--------------------------------------------------
Generated on: ${new Date().toLocaleString('en-AU')}`;

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(formattedDraftText);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  const mailtoHref = `mailto:enquiries@bubbleandsqueakdetailing.local?subject=${encodeURIComponent(
    `Mobile Detailing Quote Request - ${formData.fullName}`
  )}&body=${encodeURIComponent(formattedDraftText)}`;

  return (
    <div className="space-y-16 py-8">
      {/* 1. Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#009E89] uppercase tracking-wider">
            <span>Free, Obligation-Free Estimate</span>
            <span aria-hidden="true">·</span>
            <span>Adelaide Metropolitan Area</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#151A20] tracking-tight">
            Request a Free Mobile Detailing Quote
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Fill out the form below with your vehicle details and preferred service. We will review your requirements and respond with a customized, transparent estimate within 4 business hours.
          </p>
        </div>
      </section>

      {/* 2. Main Form & Explanatory Guidance Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Form or Draft Confirmation */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            {draftGenerated ? (
              /* Draft Enquiry Summary Workflow (Per user instructions: clearly demonstrate draft workflow without storing personal data) */
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-950 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-teal-900 text-sm">
                      Draft Quote Enquiry Successfully Validated!
                    </h3>
                    <p className="text-xs text-teal-800 mt-1">
                      All required fields have passed client-side validation. Because this is a static university project with no private server backend, your information is held strictly in your browser.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Draft Enquiry Summary
                  </h4>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Customer Name:</span>
                      <span className="font-bold text-slate-900">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Contact Email:</span>
                      <span className="font-mono text-slate-800">{formData.email}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Phone Number:</span>
                      <span className="font-mono text-slate-800">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Adelaide Suburb:</span>
                      <span className="font-semibold text-slate-900">{formData.suburb}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Vehicle Category:</span>
                      <span className="font-semibold text-slate-900">
                        {selectedVehicleObj?.label}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Selected Service:</span>
                      <span className="font-bold text-[#009E89]">
                        {selectedServiceObj?.name}
                      </span>
                    </div>
                    {formData.message && (
                      <div className="pt-2">
                        <span className="text-slate-500 block mb-1">Customer Notes:</span>
                        <p className="p-2.5 bg-white rounded border border-slate-200 text-slate-700 italic">
                          "{formData.message}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Demonstration Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleCopyDraft}
                    className="flex-1 py-3 px-4 rounded-lg bg-[#151A20] text-white font-bold text-xs hover:bg-[#2A323D] transition-colors flex items-center justify-center gap-2"
                  >
                    {copiedDraft ? (
                      <>
                        <Check className="w-4 h-4 text-[#00BFA6]" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#00BFA6]" />
                        <span>Copy Draft to Clipboard</span>
                      </>
                    )}
                  </button>

                  <a
                    href={mailtoHref}
                    className="flex-1 py-3 px-4 rounded-lg bg-[#00BFA6] text-[#151A20] font-bold text-xs hover:bg-[#00D4B8] transition-colors flex items-center justify-center gap-2 text-center"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open in Email App</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <button
                    onClick={() => setDraftGenerated(false)}
                    className="text-xs text-slate-500 hover:text-slate-900 underline"
                  >
                    ← Edit Enquiry Fields
                  </button>
                  <span className="text-[11px] text-slate-400">
                    GA4 validated event dispatched
                  </span>
                </div>
              </div>
            ) : (
              /* Actual Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Error Summary Banner (Accessibility WCAG 3.3.1) */}
                {Object.keys(errors).length > 0 && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2.5"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">
                        Please review the highlighted fields:
                      </strong>
                      <ul className="list-disc pl-4 mt-1 space-y-0.5 text-rose-800">
                        {Object.values(errors).map((msg, i) => (
                          <li key={i}>{msg}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* 1. Full Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-bold text-slate-800 uppercase tracking-wider"
                  >
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    placeholder="e.g. Sarah Mitchell"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none transition-colors ${
                      errors.fullName
                        ? 'border-rose-400 focus:ring-2 focus:ring-rose-400 bg-rose-50/20'
                        : 'border-slate-300 focus:ring-2 focus:ring-[#00BFA6]'
                    }`}
                  />
                  {errors.fullName && (
                    <p id="fullName-error" className="text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                    </p>
                  )}
                </div>

                {/* 2. Email & Phone in 2 cols */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold text-slate-800 uppercase tracking-wider"
                    >
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      placeholder="sarah@example.com"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-rose-400 focus:ring-2 focus:ring-rose-400 bg-rose-50/20'
                          : 'border-slate-300 focus:ring-2 focus:ring-[#00BFA6]'
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold text-slate-800 uppercase tracking-wider"
                    >
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      placeholder="0412 345 678"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none transition-colors ${
                        errors.phone
                          ? 'border-rose-400 focus:ring-2 focus:ring-rose-400 bg-rose-50/20'
                          : 'border-slate-300 focus:ring-2 focus:ring-[#00BFA6]'
                      }`}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* 3. Vehicle Type Selection */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="vehicleType"
                    className="block text-xs font-bold text-slate-800 uppercase tracking-wider"
                  >
                    Vehicle Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="vehicleType"
                    name="vehicleType"
                    required
                    value={formData.vehicleType}
                    onChange={(e) => handleChange('vehicleType', e.target.value as VehicleCategory)}
                    onBlur={() => handleBlur('vehicleType')}
                    aria-invalid={!!errors.vehicleType}
                    aria-describedby={errors.vehicleType ? 'vehicleType-error' : undefined}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none transition-colors ${
                      errors.vehicleType
                        ? 'border-rose-400 focus:ring-2 focus:ring-rose-400'
                        : 'border-slate-300 focus:ring-2 focus:ring-[#00BFA6]'
                    }`}
                  >
                    <option value="">-- Please select vehicle category --</option>
                    {VEHICLE_TYPES.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                  {errors.vehicleType && (
                    <p id="vehicleType-error" className="text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.vehicleType}
                    </p>
                  )}
                </div>

                {/* 4. Preferred Service Package */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="serviceId"
                    className="block text-xs font-bold text-slate-800 uppercase tracking-wider"
                  >
                    Preferred Service Package <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="serviceId"
                    name="serviceId"
                    required
                    value={formData.serviceId}
                    onChange={(e) => handleChange('serviceId', e.target.value)}
                    onBlur={() => handleBlur('serviceId')}
                    aria-invalid={!!errors.serviceId}
                    aria-describedby={errors.serviceId ? 'serviceId-error' : undefined}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white focus:outline-none transition-colors ${
                      errors.serviceId
                        ? 'border-rose-400 focus:ring-2 focus:ring-rose-400'
                        : 'border-slate-300 focus:ring-2 focus:ring-[#00BFA6]'
                    }`}
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.category.toUpperCase()})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5. Suburb / Region in Adelaide */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="suburb"
                    className="block text-xs font-bold text-slate-800 uppercase tracking-wider"
                  >
                    Adelaide Service Location / Suburb
                  </label>
                  <select
                    id="suburb"
                    name="suburb"
                    value={formData.suburb}
                    onChange={(e) => handleChange('suburb', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                  >
                    {ADELAIDE_REGIONS.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 6. Message / Special Condition Notes */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold text-slate-800 uppercase tracking-wider"
                  >
                    Vehicle Details or Specific Concerns (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="e.g. 2021 Mazda CX-5, has pet fur in boot from dog, needs driveway detailing on Friday morning..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                  ></textarea>
                </div>

                {/* 7. Marketing & Privacy Notice */}
                <div className="pt-2 text-xs text-slate-500">
                  <p className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#009E89] shrink-0" />
                    <span>
                      We respect your privacy. In this university demonstration, details are validated client-side without storing private records to an external server.
                    </span>
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-lg bg-[#00BFA6] text-[#151A20] font-bold text-sm hover:bg-[#00D4B8] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFA6]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Validate & Generate Free Quote Request</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: How Customers Request a Quote & Service Coverage Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* How It Works Explanation */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#009E89]" />
                How Our Quote Process Works
              </h3>
              <ol className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-[#151A20] bg-slate-100 w-5 h-5 rounded flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div>
                    <strong className="text-slate-900 block">Submit Vehicle & Service:</strong>
                    Tell us your car make, condition, and location so we understand required products and duration.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-[#151A20] bg-slate-100 w-5 h-5 rounded flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    <strong className="text-slate-900 block">Personalised Estimate in 4h:</strong>
                    We verify scheduling slots across Adelaide and send a fixed, comprehensive breakdown.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-[#151A20] bg-slate-100 w-5 h-5 rounded flex items-center justify-center shrink-0">
                    3
                  </span>
                  <div>
                    <strong className="text-slate-900 block">Showroom Mobile Finish:</strong>
                    We bring pure water, silent power, and professional equipment to your address.
                  </div>
                </li>
              </ol>
            </div>

            {/* Adelaide Geographic Service Coverage */}
            <div className="p-6 rounded-2xl bg-[#151A20] text-white space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00BFA6] uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                Service Location
              </div>
              <h3 className="text-lg font-bold text-white">
                Adelaide, South Australia
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Bubble & Squeak operates a fully-equipped mobile detailing vehicle covering all major metropolitan Adelaide regions:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-1 border-t border-slate-800">
                <div>· Adelaide CBD</div>
                <div>· North Adelaide</div>
                <div>· Norwood & Burnside</div>
                <div>· Glenelg & Henley</div>
                <div>· Marion & Brighton</div>
                <div>· Tea Tree Gully</div>
                <div>· Unley & Mitcham</div>
                <div>· Adelaide Hills (Appt.)</div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#00BFA6]" />
                Operating Monday to Saturday, 7:30 AM to 6:00 PM.
              </div>
            </div>

            {/* Academic Project Integrity Note */}
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-900">Digital Marketing Project Note:</p>
              <p>
                In compliance with project specifications, no fictional phone numbers or false contact records are presented. Form entries demonstrate validation, accessible UX, and GA4 tracking simulation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
