import { AnalyticsEvent, ConsentStatus } from '../types';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Configurable GA4 Measurement ID (placeholder by default)
const STORAGE_KEY_MEASUREMENT_ID = 'bubble_squeak_ga4_measurement_id';
const STORAGE_KEY_CONSENT = 'bubble_squeak_ga4_consent';
const DEFAULT_MEASUREMENT_ID = 'G-BUBBLESQUEAK'; // Standard academic demonstration placeholder

let eventListeners: Array<(events: AnalyticsEvent[]) => void> = [];
const eventHistory: AnalyticsEvent[] = [];
let lastTrackedPageKey: string | null = null;

export function getMeasurementId(): string {
  if (typeof window === 'undefined') return DEFAULT_MEASUREMENT_ID;
  return localStorage.getItem(STORAGE_KEY_MEASUREMENT_ID) || DEFAULT_MEASUREMENT_ID;
}

export function setMeasurementId(id: string): void {
  if (typeof window === 'undefined') return;
  const cleanId = id.trim().toUpperCase();
  localStorage.setItem(STORAGE_KEY_MEASUREMENT_ID, cleanId);
  initGA4(cleanId);
}

export function getConsentStatus(): ConsentStatus {
  if (typeof window === 'undefined') return 'pending';
  const val = localStorage.getItem(STORAGE_KEY_CONSENT);
  if (val === 'granted' || val === 'denied') return val;
  return 'pending';
}

export function setConsentStatus(status: ConsentStatus): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_CONSENT, status);
  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: status === 'granted' ? 'granted' : 'denied',
      ad_storage: 'denied', // No ads used
    });
  }
  trackEvent('analytics_consent_updated', {
    status,
  });
}

export function initGA4(measurementId: string = getMeasurementId()): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag('js', new Date());

  const consent = getConsentStatus();
  window.gtag('consent', 'default', {
    analytics_storage: consent === 'granted' ? 'granted' : 'denied',
    ad_storage: 'denied',
  });

  window.gtag('config', measurementId, {
    send_page_view: false, // We manually trigger page_view to support SPA routing accurately without duplicates
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
  });
}

/**
 * Safely push an analytics event without any Personally Identifiable Information (PII)
 */
export function trackEvent(
  eventName: string,
  parameters: Record<string, string | number | boolean | undefined> = {}
): void {
  // Ensure no PII passes through
  const safeParams: Record<string, string | number | boolean | undefined> = {};
  for (const [key, value] of Object.entries(parameters)) {
    // Exclude common PII keys
    const lowerKey = key.toLowerCase();
    if (
      lowerKey.includes('name') ||
      lowerKey.includes('email') ||
      lowerKey.includes('phone') ||
      lowerKey.includes('message') ||
      lowerKey.includes('address')
    ) {
      continue;
    }
    safeParams[key] = value;
  }

  const newEvent: AnalyticsEvent = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    eventName,
    timestamp: new Date().toLocaleTimeString('en-AU', { hour12: false }),
    parameters: safeParams,
  };

  eventHistory.unshift(newEvent);
  if (eventHistory.length > 50) eventHistory.pop();

  // Dispatch to window.gtag if consent granted
  if (typeof window !== 'undefined' && window.gtag && getConsentStatus() === 'granted') {
    window.gtag('event', eventName, safeParams);
  }

  // Notify UI subscribers (e.g. for GA4 debugger)
  notifyListeners();
}

export function trackPageView(
  pageId: string,
  pageTitle: string,
  options?: {
    customPath?: string;
    pageType?: 'standard' | 'blog_index' | 'blog_article';
    articleSlug?: string;
    articleCategory?: string;
  }
): void {
  const pagePath = options?.customPath ?? `/${pageId === 'home' ? '' : pageId}`;
  const dedupeKey = `${pagePath}::${options?.articleSlug || ''}`;

  // Avoid duplicate page_view events for the same active route
  if (lastTrackedPageKey === dedupeKey) {
    return;
  }
  lastTrackedPageKey = dedupeKey;

  const params: Record<string, string | number | boolean | undefined> = {
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    page_path: pagePath,
    page_title: pageTitle,
  };

  if (options?.pageType) {
    params.page_type = options.pageType;
  }
  if (options?.articleSlug) {
    params.article_slug = options.articleSlug;
  }
  if (options?.articleCategory) {
    params.article_category = options.articleCategory;
  }

  trackEvent('page_view', params);
}

export function trackQuoteCtaClick(location: string, label: string, serviceId?: string): void {
  trackEvent('quote_cta_click', {
    cta_location: location,
    cta_label: label,
    target_service: serviceId || 'general',
  });
}

export function trackServiceSelect(serviceId: string, serviceName: string, category: string): void {
  trackEvent('service_select', {
    service_id: serviceId,
    service_name: serviceName,
    service_category: category,
  });
}

export function trackQuoteDraftValidated(vehicleType: string, serviceId: string, suburb: string): void {
  trackEvent('quote_draft_validated', {
    vehicle_type: vehicleType,
    service_id: serviceId,
    adelaide_suburb_region: suburb,
  });
}

export function trackBlogArticleClick(
  location: string,
  articleSlug: string,
  articleCategory: string
): void {
  trackEvent('blog_article_click', {
    click_location: location,
    article_slug: articleSlug,
    article_category: articleCategory,
  });
}

export function trackBlogToServicesClick(
  location: string,
  articleSlug: string,
  label: string
): void {
  trackEvent('blog_to_services_click', {
    cta_location: location,
    source_article: articleSlug,
    cta_label: label,
  });
}

export function trackBlogToQuoteClick(
  location: string,
  articleSlug: string,
  label: string,
  serviceId?: string
): void {
  trackEvent('blog_to_quote_click', {
    cta_location: location,
    source_article: articleSlug,
    cta_label: label,
    target_service: serviceId || 'general',
  });
}

export function subscribeToEvents(callback: (events: AnalyticsEvent[]) => void): () => void {
  eventListeners.push(callback);
  callback([...eventHistory]);
  return () => {
    eventListeners = eventListeners.filter((cb) => cb !== callback);
  };
}

function notifyListeners(): void {
  const snapshot = [...eventHistory];
  eventListeners.forEach((cb) => cb(snapshot));
}

export function getEventHistory(): AnalyticsEvent[] {
  return [...eventHistory];
}

export function clearEventHistory(): void {
  eventHistory.length = 0;
  notifyListeners();
}
