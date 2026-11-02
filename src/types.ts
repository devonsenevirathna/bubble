export type PageId = 'home' | 'about' | 'services' | 'contact';

export type VehicleCategory = 'sedan-hatch' | 'suv-wagon' | '4wd-ute-van' | 'luxury-sports';

export type ServiceCategory = 'exterior' | 'interior' | 'full' | 'addons';

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
