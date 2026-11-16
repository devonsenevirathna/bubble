import { PageId } from '../types';
import { getBlogArticleBySlug } from '../data/blogData';

export interface ParsedRoute {
  page: PageId;
  articleSlug?: string;
}

export function getBasePath(): string {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) {
    const raw = import.meta.env.BASE_URL;
    return raw.endsWith('/') ? raw : `${raw}/`;
  }
  return '/';
}

export function buildRouteUrl(page: PageId, articleSlug?: string): string {
  const base = getBasePath();
  switch (page) {
    case 'home':
      return base;
    case 'about':
      return `${base}about/`;
    case 'services':
      return `${base}services/`;
    case 'blog':
      return `${base}blog/`;
    case 'blog-article':
      return articleSlug ? `${base}blog/${articleSlug}/` : `${base}blog/`;
    case 'contact':
      return `${base}contact/`;
    default:
      return base;
  }
}

export function parseCurrentRoute(): ParsedRoute {
  if (typeof window === 'undefined') {
    return { page: 'home' };
  }

  // Support legacy hash URLs (e.g., #about, #services, #blog, #blog/slug, #contact)
  const hash = window.location.hash.replace(/^#\/?/, '').replace(/\/+$/, '').toLowerCase();
  if (hash) {
    if (hash === 'about' || hash === 'services' || hash === 'blog' || hash === 'contact') {
      return { page: hash };
    }
    if (hash.startsWith('blog/')) {
      const slug = hash.slice('blog/'.length);
      if (getBlogArticleBySlug(slug)) {
        return { page: 'blog-article', articleSlug: slug };
      }
      return { page: 'blog' };
    }
  }

  const base = getBasePath();
  let pathname = window.location.pathname;

  // Strip base prefix (e.g. /bubble/ or /)
  if (base !== '/' && pathname.startsWith(base)) {
    pathname = pathname.slice(base.length);
  } else if (base !== '/' && pathname === base.slice(0, -1)) {
    pathname = '';
  } else if (pathname.startsWith('/')) {
    pathname = pathname.slice(1);
  }

  // Strip trailing slashes and index.html
  const cleanPath = pathname
    .replace(/index\.html$/i, '')
    .replace(/^\/+|\/+$/g, '')
    .toLowerCase();

  if (!cleanPath) {
    return { page: 'home' };
  }
  if (cleanPath === 'about') {
    return { page: 'about' };
  }
  if (cleanPath === 'services') {
    return { page: 'services' };
  }
  if (cleanPath === 'blog') {
    return { page: 'blog' };
  }
  if (cleanPath === 'contact') {
    return { page: 'contact' };
  }
  if (cleanPath.startsWith('blog/')) {
    const slug = cleanPath.slice('blog/'.length);
    if (getBlogArticleBySlug(slug)) {
      return { page: 'blog-article', articleSlug: slug };
    }
    return { page: 'blog' };
  }

  return { page: 'home' };
}
