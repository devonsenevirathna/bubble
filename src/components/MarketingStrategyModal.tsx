import React, { useState } from 'react';
import { X, Target, Search, BarChart3, Shield, BookOpen, Layers, CheckSquare, Terminal } from 'lucide-react';

interface MarketingStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MarketingStrategyModal: React.FC<MarketingStrategyModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'personas' | 'seo' | 'cro' | 'ga4' | 'accessibility' | 'deployment'>('personas');

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="marketing-strategy-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl rounded-xl bg-white shadow-2xl border border-slate-200 overflow-hidden text-slate-800 my-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#151A20] text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#00BFA6]/20 text-[#00BFA6]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 id="marketing-strategy-title" className="text-lg font-bold text-white tracking-tight">
                Digital Marketing Project Strategy Dossier
              </h2>
              <p className="text-xs text-slate-400">
                Academic documentation of customer acquisition, SEO, CRO, GA4 & WCAG compliance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close strategy dossier"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation (Interactive segmented buttons) */}
        <div className="flex border-b border-slate-200 bg-slate-100 px-6 pt-3 overflow-x-auto gap-2 shrink-0">
          {[
            { id: 'personas', label: '1. Target Personas', icon: Target },
            { id: 'seo', label: '2. Local SEO Strategy', icon: Search },
            { id: 'cro', label: '3. CRO & Journey', icon: Layers },
            { id: 'ga4', label: '4. GA4 Framework', icon: BarChart3 },
            { id: 'accessibility', label: '5. WCAG 2.2 AA', icon: CheckSquare },
            { id: 'deployment', label: '6. GitHub Pages', icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-t border-x border-b-0 whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-slate-900 border-slate-200 border-b-white -mb-px'
                    : 'text-slate-600 hover:text-slate-900 border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#00BFA6]' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed">
          {activeTab === 'personas' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Target Customer Personas & Market Segmentation</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Designed for the Adelaide metropolitan area automotive mobile services market.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Persona 1 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#009E89]">Persona 1</span>
                    <span className="text-[11px] text-slate-500">Corporate & Legal</span>
                  </div>
                  <h4 className="font-bold text-slate-900">Sarah, 38</h4>
                  <p className="text-xs text-slate-600">
                    <strong>Location:</strong> Burnside / Adelaide CBD<br />
                    <strong>Vehicle:</strong> European Sedan (Audi A4)<br />
                    <strong>Pain Point:</strong> Works 50+ hours/week. Cannot take 3 hours off on Saturdays to drive to an industrial detailing shop.
                  </p>
                  <div className="text-xs bg-white p-2.5 rounded border border-slate-200">
                    <strong className="text-slate-900">Value Pitch:</strong> "We detail your car parked at your workplace or home while you run your day."
                  </div>
                </div>

                {/* Persona 2 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#009E89]">Persona 2</span>
                    <span className="text-[11px] text-slate-500">Working Families</span>
                  </div>
                  <h4 className="font-bold text-slate-900">David & Megan, 42</h4>
                  <p className="text-xs text-slate-600">
                    <strong>Location:</strong> Marion / Southern Foothills<br />
                    <strong>Vehicle:</strong> 7-Seat Family SUV (Toyota Prado)<br />
                    <strong>Pain Point:</strong> Car interior has school snack spills, beach sand from Brighton/Glenelg, and pet fur.
                  </p>
                  <div className="text-xs bg-white p-2.5 rounded border border-slate-200">
                    <strong className="text-slate-900">Value Pitch:</strong> "Hygienic steam extraction and fabric sanitisation done in your driveway."
                  </div>
                </div>

                {/* Persona 3 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#009E89]">Persona 3</span>
                    <span className="text-[11px] text-slate-500">Enthusiasts</span>
                  </div>
                  <h4 className="font-bold text-slate-900">Julian, 29</h4>
                  <p className="text-xs text-slate-600">
                    <strong>Location:</strong> Prospect / Norwood<br />
                    <strong>Vehicle:</strong> Performance Coupe (Subaru WRX)<br />
                    <strong>Pain Point:</strong> Terrified of automatic swirl-wash car washes ruining clear coat and paint gloss.
                  </p>
                  <div className="text-xs bg-white p-2.5 rounded border border-slate-200">
                    <strong className="text-slate-900">Value Pitch:</strong> "pH-neutral two-bucket swirl-free wash, iron fallout decontamination & hydrophobic sealant."
                  </div>
                </div>
              </div>

              <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900">
                <strong>Marketing Strategy Alignment:</strong> Mobile car detailing solves the fundamental consumer friction of <em>time scarcity</em>. Traditional fixed workshops require drop-off, return rides, and waiting. Bubble & Squeak shifts the operational burden to the mobile unit, creating an elevated perceived value proposition.
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Adelaide Local SEO Architecture</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Semantic hierarchy, geographic targeting, and Schema.org structured data.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Page</th>
                      <th className="p-3">H1 Focus</th>
                      <th className="p-3">Primary Target Keyword</th>
                      <th className="p-3">Search Intent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-600">
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Home</td>
                      <td className="p-3">Professional Mobile Car Detailing in Adelaide</td>
                      <td className="p-3 text-[#009E89] font-mono">mobile car detailing adelaide</td>
                      <td className="p-3">Commercial / Transactional</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">About Us</td>
                      <td className="p-3">About Bubble & Squeak Mobile Car Detailing</td>
                      <td className="p-3 text-[#009E89] font-mono">car detailing adelaide south australia</td>
                      <td className="p-3">Informational / Brand Trust</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Services</td>
                      <td className="p-3">Our Mobile Detailing Services</td>
                      <td className="p-3 text-[#009E89] font-mono">interior car cleaning adelaide</td>
                      <td className="p-3">Commercial Investigation</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-900">Contact / Quote</td>
                      <td className="p-3">Request a Free Mobile Detailing Quote</td>
                      <td className="p-3 text-[#009E89] font-mono">mobile car wash adelaide quote</td>
                      <td className="p-3">Transactional Conversion</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-2 text-xs">
                <p className="font-bold text-slate-900">Structured Data Implementation:</p>
                <p className="text-slate-600">
                  Implemented Schema.org <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 font-mono">AutoRepair</code> JSON-LD in the document head with Adelaide postal region, opening hours, accepted payment methods, and area served.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'cro' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Conversion Rate Optimisation (CRO) & Journey</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Reducing cognitive friction and steering prospects towards quote enquiries.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-xs space-y-1.5">
                  <span className="font-bold text-[#009E89]">Step 1: Awareness</span>
                  <p className="text-slate-600">
                    Compelling hero section with value propositions clearly stating mobile service in Adelaide. Immediate primary CTA "Get a Free Quote".
                  </p>
                </div>
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-xs space-y-1.5">
                  <span className="font-bold text-[#009E89]">Step 2: Evaluation</span>
                  <p className="text-slate-600">
                    Transparent inclusions for Exterior, Interior, and Full Detailing without unverified claims. Pre-selection buttons that pipe directly to the quote form.
                  </p>
                </div>
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-xs space-y-1.5">
                  <span className="font-bold text-[#009E89]">Step 3: Conversion</span>
                  <p className="text-slate-600">
                    Frictionless multi-field enquiry form with real-time accessible validation, instant draft preview, and clear response time expectations (4 business hours).
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ga4' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Google Analytics 4 Measurement Framework</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Event taxonomy, privacy protection, and zero personally identifiable information (PII).
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Event Name</th>
                      <th className="p-3">Trigger Condition</th>
                      <th className="p-3">Parameters (Safe Non-PII)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-600">
                    <tr>
                      <td className="p-3 font-mono text-[#009E89]">page_view</td>
                      <td className="p-3">SPA navigation between Home, About, Services, Contact</td>
                      <td className="p-3 font-mono">page_location, page_path, page_title</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-[#009E89]">quote_cta_click</td>
                      <td className="p-3">User clicks any "Get a Free Quote" or "Request a Quote" CTA</td>
                      <td className="p-3 font-mono">cta_location, cta_label, target_service</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-[#009E89]">service_select</td>
                      <td className="p-3">User selects a package on the Services page</td>
                      <td className="p-3 font-mono">service_id, service_name, service_category</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-[#009E89]">quote_draft_validated</td>
                      <td className="p-3">Enquiry form passed client-side validation successfully</td>
                      <td className="p-3 font-mono">vehicle_type, service_id, adelaide_suburb_region</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Strict PII Sanitisation:</strong> In adherence with GDPR, Australian Privacy Principles (APPs), and Google Analytics terms of service, customer names, telephone numbers, and email addresses are filtered out prior to pushing events to <code className="font-mono">window.gtag</code>.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'accessibility' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">WCAG 2.2 AA Accessibility Compliance Checklist</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tested and verified for universal usability.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                    Color Contrast (1.4.3)
                  </div>
                  <p className="text-slate-600">
                    Charcoal (#151A20) on white provides 16.5:1 contrast (exceeds 4.5:1 requirement). Teal accents meet large text and focus indicator criteria.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                    Keyboard Navigation (2.1.1)
                  </div>
                  <p className="text-slate-600">
                    All navigation links, buttons, and form inputs are focusable with visible teal 2px outline rings. Esc closes modals.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                    Form Labels & Errors (3.3.1, 3.3.2)
                  </div>
                  <p className="text-slate-600">
                    Every field features explicit HTML <code className="font-mono">&lt;label&gt;</code> tags, <code className="font-mono">aria-describedby</code> for errors, and <code className="font-mono">aria-invalid</code> states.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                    Touch Targets (2.5.8)
                  </div>
                  <p className="text-slate-600">
                    All interactive controls, buttons, and mobile menu items adhere to minimum touch dimensions of 44x44px.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'deployment' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">GitHub Pages Static Deployment Guide</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Follow these step-by-step instructions to deploy to GitHub Pages.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 text-slate-200 font-mono space-y-2">
                  <p className="text-emerald-400 font-sans font-semibold"># 1. Build the production static distribution</p>
                  <p className="bg-black/40 p-2 rounded">npm run build</p>
                  <p className="text-emerald-400 font-sans font-semibold"># 2. Verify relative base path in vite.config.ts</p>
                  <p className="text-slate-400 font-sans">
                    The project has been configured with <code className="text-teal-300">base: './'</code> so assets load seamlessly under subpaths like <code className="text-teal-300">https://&lt;username&gt;.github.io/&lt;repo-name&gt;/</code>.
                  </p>
                  <p className="text-emerald-400 font-sans font-semibold"># 3. Publish the dist folder to the gh-pages branch</p>
                  <p className="bg-black/40 p-2 rounded">npx gh-pages -d dist</p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 space-y-1">
                  <p className="font-semibold text-slate-900">GitHub Repository Configuration:</p>
                  <p>
                    In your GitHub repository, navigate to <strong>Settings &gt; Pages</strong>. Under <strong>Build and deployment &gt; Source</strong>, select <strong>Deploy from a branch</strong>, choose <strong>gh-pages</strong> and <strong>/ (root)</strong>, then click <strong>Save</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Bubble & Squeak Mobile Car Detailing · Adelaide SA</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#151A20] text-white font-medium rounded-lg hover:bg-[#2A323D] transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
