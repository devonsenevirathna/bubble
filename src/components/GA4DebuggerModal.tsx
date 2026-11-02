import React, { useState, useEffect } from 'react';
import {
  subscribeToEvents,
  getMeasurementId,
  setMeasurementId,
  getConsentStatus,
  setConsentStatus,
  clearEventHistory,
} from '../utils/analytics';
import { AnalyticsEvent } from '../types';
import { Activity, X, Trash2, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

interface GA4DebuggerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GA4DebuggerModal: React.FC<GA4DebuggerModalProps> = ({ isOpen, onClose }) => {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [currentId, setCurrentId] = useState<string>(getMeasurementId());
  const [inputCustomId, setInputCustomId] = useState<string>(getMeasurementId());
  const [consent, setConsent] = useState(getConsentStatus());
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToEvents((newEvents) => {
      setEvents(newEvents);
    });
    return unsubscribe;
  }, []);

  if (!isOpen) return null;

  const handleSaveId = (e: React.FormEvent) => {
    e.preventDefault();
    setMeasurementId(inputCustomId);
    setCurrentId(getMeasurementId());
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleConsentToggle = (status: 'granted' | 'denied') => {
    setConsentStatus(status);
    setConsent(status);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ga4-debugger-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl rounded-xl bg-white shadow-2xl border border-slate-200 overflow-hidden text-slate-800 my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#151A20] text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#00BFA6]/20 text-[#00BFA6]">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 id="ga4-debugger-title" className="text-lg font-bold text-white tracking-tight">
                GA4 Real-Time Analytics Inspector
              </h2>
              <p className="text-xs text-slate-400">
                Academic inspection tool for verifying event dispatching and PII sanitisation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close analytics inspector"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Bar */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Measurement ID Config */}
            <form onSubmit={handleSaveId} className="space-y-1.5">
              <label htmlFor="ga4-id-input" className="block text-xs font-semibold text-slate-700">
                Measurement ID Placeholder:
              </label>
              <div className="flex gap-2">
                <input
                  id="ga4-id-input"
                  type="text"
                  value={inputCustomId}
                  onChange={(e) => setInputCustomId(e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                  className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA6] bg-white font-mono"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 text-xs font-semibold bg-[#151A20] text-white rounded-lg hover:bg-[#2A323D] transition-colors"
                >
                  Update
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Current active ID: <span className="font-mono font-medium text-slate-900">{currentId}</span>
                {saveSuccess && <span className="ml-2 text-emerald-600 font-medium">Updated!</span>}
              </p>
            </form>

            {/* Consent Status */}
            <div className="space-y-1.5">
              <span className="block text-xs font-semibold text-slate-700">
                Analytics Consent Status:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleConsentToggle('granted')}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                    consent === 'granted'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  Granted (Active)
                </button>
                <button
                  type="button"
                  onClick={() => handleConsentToggle('denied')}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                    consent === 'denied'
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  Denied (Opted-Out)
                </button>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00BFA6]" />
                Zero PII stored: Names, emails, and phones are stripped before event logging.
              </p>
            </div>
          </div>
        </div>

        {/* Live Event Stream */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                Captured Event Stream ({events.length})
              </h3>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00BFA6] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00BFA6]"></span>
              </span>
            </div>
            {events.length > 0 && (
              <button
                onClick={clearEventHistory}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear Stream
              </button>
            )}
          </div>

          {events.length === 0 ? (
            <div className="text-center py-10 px-4 rounded-xl border border-dashed border-slate-200 bg-slate-50">
              <Activity className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-medium text-slate-600">No events dispatched yet.</p>
              <p className="text-xs text-slate-400 mt-1">
                Navigate pages, click quote buttons, or test the enquiry form to see live events.
              </p>
            </div>
          ) : (
            <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-white transition-colors"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#009E89]">{evt.eventName}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500">{evt.timestamp}</span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400">
                      ID: {evt.id.slice(-6)}
                    </span>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200 font-mono text-xs text-slate-700 overflow-x-auto">
                    {Object.keys(evt.parameters).length === 0 ? (
                      <span className="text-slate-400 italic">No custom parameters</span>
                    ) : (
                      <pre className="text-[11px] leading-tight">
                        {JSON.stringify(evt.parameters, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Academic Assessment Criteria Box */}
          <div className="mt-5 p-3.5 rounded-lg bg-teal-50 border border-teal-200 text-xs text-teal-900 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-teal-900">Digital Marketing Project Compliance:</p>
              <p className="text-teal-800 mt-0.5">
                Meets academic criteria for GA4 measurement by tracking distinct user conversion steps:
                <code className="mx-1 px-1 py-0.5 bg-teal-100 rounded text-teal-950 font-mono">page_view</code>,
                <code className="mx-1 px-1 py-0.5 bg-teal-100 rounded text-teal-950 font-mono">quote_cta_click</code>,
                <code className="mx-1 px-1 py-0.5 bg-teal-100 rounded text-teal-950 font-mono">service_select</code>, and
                <code className="mx-1 px-1 py-0.5 bg-teal-100 rounded text-teal-950 font-mono">quote_draft_validated</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            Events dispatch to window.gtag when user grants consent.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#151A20] text-white font-medium rounded-lg hover:bg-[#2A323D] transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
