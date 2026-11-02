import { PageId } from '../types';

export interface PageMetadata {
  title: string;
  metaDescription: string;
  h1: string;
  keywords: string;
  canonicalPath: string;
}

export const PAGE_SEO: Record<PageId, PageMetadata> = {
  home: {
    title: 'Bubble & Squeak Mobile Car Detailing | Adelaide SA',
    metaDescription:
      'Professional mobile car detailing in Adelaide. Convenient showroom shine delivered to your home or office. Request a free quote today.',
    h1: 'Professional Mobile Car Detailing in Adelaide',
    keywords:
      'mobile car detailing Adelaide, car detailing Adelaide, mobile car wash Adelaide, vehicle detailing Adelaide SA',
    canonicalPath: '/',
  },
  about: {
    title: 'About Us | Bubble & Squeak Mobile Car Detailing Adelaide',
    metaDescription:
      'Learn about Bubble & Squeak Mobile Car Detailing in Adelaide. Our customer-first philosophy, commitment to quality, and hassle-free mobile service.',
    h1: 'About Bubble & Squeak Mobile Car Detailing',
    keywords:
      'about mobile car detailing Adelaide, Adelaide mobile auto care, car detailing philosophy, professional car detailing Adelaide',
    canonicalPath: '/about',
  },
  services: {
    title: 'Mobile Car Detailing Services & Packages | Adelaide SA',
    metaDescription:
      'Explore exterior paint polishing, interior steam sanitisation, full detailing, and specialist add-on treatments across metropolitan Adelaide.',
    h1: 'Our Mobile Detailing Services',
    keywords:
      'car detailing services Adelaide, exterior car detailing Adelaide, interior car cleaning Adelaide, full car detail Adelaide',
    canonicalPath: '/services',
  },
  contact: {
    title: 'Request a Free Quote | Bubble & Squeak Detailing Adelaide',
    metaDescription:
      'Request your customised mobile car detailing quote in Adelaide. Fast response, mobile convenience at your home or workplace.',
    h1: 'Request a Free Mobile Detailing Quote',
    keywords:
      'mobile car detailing quote Adelaide, book car detailing Adelaide, mobile car wash enquiry Adelaide',
    canonicalPath: '/contact',
  },
};

export function updatePageSEO(pageId: PageId): void {
  const meta = PAGE_SEO[pageId];
  if (!meta || typeof document === 'undefined') return;

  // Update title
  document.title = meta.title;

  // Update meta description
  let descTag = document.querySelector('meta[name="description"]');
  if (!descTag) {
    descTag = document.createElement('meta');
    descTag.setAttribute('name', 'description');
    document.head.appendChild(descTag);
  }
  descTag.setAttribute('content', meta.metaDescription);

  // Update OpenGraph title and description
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', meta.title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', meta.metaDescription);

  // Update canonical link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  const baseUrl = window.location.origin + window.location.pathname.replace(/\/+$/, '');
  canonical.setAttribute('href', `${baseUrl}#${pageId}`);
}
