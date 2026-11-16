export type PageId = 'home' | 'about' | 'services' | 'blog' | 'blog-article' | 'contact';

export type VehicleCategory = 'sedan-hatch' | 'suv-wagon' | '4wd-ute-van' | 'luxury-sports';

export type ServiceCategory = 'exterior' | 'interior' | 'full' | 'addons';

export type BlogCategory =
  | 'Detailing Guides'
  | 'Service Selection'
  | 'Wash vs Detail'
  | 'Adelaide Maintenance'
  | 'Mobile Convenience';

export type BlogImageKey =
  | 'hero'
  | 'interior'
  | 'exteriorWash'
  | 'wheelDetailing'
  | 'paintSealant'
  | 'mobileSuv';

export interface BlogInlineLink {
  label: string;
  targetPage: 'services' | 'contact' | 'blog-article';
  targetSlug?: string;
  targetServiceId?: string;
}

export interface BlogSubsection {
  h3: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogSection {
  id: string;
  h2: string;
  paragraphs: string[];
  bullets?: string[];
  subsections?: BlogSubsection[];
  inlineCta?: {
    text: string;
    buttonLabel: string;
    targetPage: 'services' | 'contact';
    targetServiceId?: string;
  };
}

export interface BlogArticle {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  category: BlogCategory;
  readingTimeMinutes: number;
  readingTimeLabel: string;
  publishedDate: string;
  publishedLabel: string;
  author: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  imageKey: BlogImageKey;
  imageAlt: string;
  featured?: boolean;
  introduction: string[];
  sections: BlogSection[];
  closingSummary: string[];
  closingCtaLabel: string;
  relatedSlugs: string[];
}

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  inclusions: string[];
  estimatedDuration: string;
  idealFor: string;
  popular?: boolean;
}

export interface QuoteFormData {
  fullName: string;
  email: string;
  phone: string;
  vehicleType: VehicleCategory | '';
  serviceId: string;
  suburb: string;
  message: string;
  preferredTime: 'morning' | 'afternoon' | 'anytime';
  marketingConsent: boolean;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  vehicleType?: string;
  serviceId?: string;
  suburb?: string;
  message?: string;
}

export interface AnalyticsEvent {
  id: string;
  eventName: string;
  timestamp: string;
  parameters: Record<string, string | number | boolean | undefined>;
}

export type ConsentStatus = 'granted' | 'denied' | 'pending';
