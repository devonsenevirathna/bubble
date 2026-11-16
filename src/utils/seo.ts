import { BlogArticle, PageId } from '../types';

export const PRODUCTION_BASE_URL = 'https://devonsenevirathna.github.io/bubble';

export interface PageMetadata {
  title: string;
  metaDescription: string;
  h1: string;
  keywords: string;
  canonicalPath: string;
}

export const PAGE_SEO: Record<Exclude<PageId, 'blog-article'>, PageMetadata> = {
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
    canonicalPath: '/about/',
  },
  services: {
    title: 'Mobile Car Detailing Services & Packages | Adelaide SA',
    metaDescription:
      'Explore exterior paint polishing, interior steam sanitisation, full detailing, and specialist add-on treatments across metropolitan Adelaide.',
    h1: 'Our Mobile Detailing Services',
    keywords:
      'car detailing services Adelaide, exterior car detailing Adelaide, interior car cleaning Adelaide, full car detail Adelaide',
    canonicalPath: '/services/',
  },
  blog: {
    title: 'Car Care Tips & Mobile Detailing Blog | Adelaide SA',
    metaDescription:
      'Expert car care advice, vehicle maintenance tips, and mobile car detailing guides for Adelaide drivers from Bubble & Squeak Mobile Car Detailing.',
    h1: 'Car Care Tips & Mobile Detailing Insights',
    keywords:
      'mobile car detailing blog, car detailing Adelaide tips, mobile auto detailing advice, car wash vs detailing Adelaide',
    canonicalPath: '/blog/',
  },
  contact: {
    title: 'Request a Free Quote | Bubble & Squeak Detailing Adelaide',
    metaDescription:
      'Request your customised mobile car detailing quote in Adelaide. Fast response, mobile convenience at your home or workplace.',
    h1: 'Request a Free Mobile Detailing Quote',
    keywords:
      'mobile car detailing quote Adelaide, book car detailing Adelaide, mobile car wash enquiry Adelaide',
    canonicalPath: '/contact/',
  },
};

function upsertMetaTag(attrName: 'name' | 'property', attrValue: string, content: string): void {
  let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrName, attrValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export function buildBlogPostingJsonLd(article: BlogArticle): Record<string, unknown> {
  const canonicalUrl = `${PRODUCTION_BASE_URL}/blog/${article.slug}/`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    alternativeHeadline: article.seoTitle,
    description: article.metaDescription,
    datePublished: article.publishedDate,
    dateModified: article.publishedDate,
    inLanguage: 'en-AU',
    articleSection: article.category,
    keywords: [article.primaryKeyword, ...article.secondaryKeywords].join(', '),
    author: {
      '@type': 'Organization',
      name: 'Bubble & Squeak Mobile Car Detailing',
      url: `${PRODUCTION_BASE_URL}/`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bubble & Squeak Mobile Car Detailing',
      url: `${PRODUCTION_BASE_URL}/`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    url: canonicalUrl,
    about: {
      '@type': 'Service',
      name: 'Mobile Car Detailing in Adelaide',
      areaServed: {
        '@type': 'City',
        name: 'Adelaide',
      },
    },
  };
}

export function updatePageSEO(pageId: PageId, article?: BlogArticle): void {
  if (typeof document === 'undefined') return;

  const isArticle = pageId === 'blog-article' && Boolean(article);
  const meta =
    pageId === 'blog-article'
      ? article
        ? {
            title: article.seoTitle,
            metaDescription: article.metaDescription,
            keywords: [article.primaryKeyword, ...article.secondaryKeywords].join(', '),
            canonicalPath: `/blog/${article.slug}/`,
          }
        : PAGE_SEO.blog
      : PAGE_SEO[pageId];

  const canonicalUrl = `${PRODUCTION_BASE_URL}${meta.canonicalPath}`;

  // Update <title>
  document.title = meta.title;

  // Update meta tags
  upsertMetaTag('name', 'description', meta.metaDescription);
  upsertMetaTag('name', 'keywords', meta.keywords);

  // Update OpenGraph metadata
  upsertMetaTag('property', 'og:type', isArticle ? 'article' : 'website');
  upsertMetaTag('property', 'og:title', meta.title);
  upsertMetaTag('property', 'og:description', meta.metaDescription);
  upsertMetaTag('property', 'og:url', canonicalUrl);

  // Update Twitter card metadata
  upsertMetaTag('name', 'twitter:title', meta.title);
  upsertMetaTag('name', 'twitter:description', meta.metaDescription);

  // Update canonical link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', canonicalUrl);

  // Manage BlogPosting JSON-LD structured data
  const existingLd = document.getElementById('blog-posting-jsonld');
  if (isArticle && article) {
    const scriptEl = existingLd || document.createElement('script');
    scriptEl.id = 'blog-posting-jsonld';
    scriptEl.setAttribute('type', 'application/ld+json');
    scriptEl.textContent = JSON.stringify(buildBlogPostingJsonLd(article));
    if (!existingLd) {
      document.head.appendChild(scriptEl);
    }
  } else if (existingLd) {
    existingLd.remove();
  }
}
