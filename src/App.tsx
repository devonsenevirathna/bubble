import React, { useState, useEffect, useCallback } from 'react';
import { PageId, AnalyticsEvent } from './types';
import { updatePageSEO, PAGE_SEO } from './utils/seo';
import { buildRouteUrl, parseCurrentRoute } from './utils/routes';
import { getBlogArticleBySlug } from './data/blogData';
import {
  initGA4,
  trackPageView,
  subscribeToEvents,
  getEventHistory,
} from './utils/analytics';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { BlogPage } from './pages/BlogPage';
import { BlogArticlePage } from './pages/BlogArticlePage';
import { ContactPage } from './pages/ContactPage';
import { GA4DebuggerModal } from './components/GA4DebuggerModal';
import { MarketingStrategyModal } from './components/MarketingStrategyModal';
import { SitemapModal } from './components/SitemapModal';
import { ConsentBanner } from './components/ConsentBanner';

export default function App() {
  const initialRoute = parseCurrentRoute();

  const [currentPage, setCurrentPage] = useState<PageId>(initialRoute.page);
  const [currentArticleSlug, setCurrentArticleSlug] = useState<string | undefined>(
    initialRoute.articleSlug
  );
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('full-detailing');
  const [isGA4ModalOpen, setIsGA4ModalOpen] = useState(false);
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);
  const [isSitemapModalOpen, setIsSitemapModalOpen] = useState(false);
  const [events, setEvents] = useState<AnalyticsEvent[]>(getEventHistory());

  // Initialize GA4 & subscribe to live events
  useEffect(() => {
    initGA4();
    const unsubscribe = subscribeToEvents((newEvents) => {
      setEvents(newEvents);
    });
    return unsubscribe;
  }, []);

  // Sync state with browser back/forward navigation and hash changes
  useEffect(() => {
    const syncRouteFromLocation = () => {
      const parsed = parseCurrentRoute();
      setCurrentPage(parsed.page);
      setCurrentArticleSlug(parsed.articleSlug);
    };

    window.addEventListener('popstate', syncRouteFromLocation);
    window.addEventListener('hashchange', syncRouteFromLocation);
    return () => {
      window.removeEventListener('popstate', syncRouteFromLocation);
      window.removeEventListener('hashchange', syncRouteFromLocation);
    };
  }, []);

  const activeArticle =
    currentPage === 'blog-article' && currentArticleSlug
      ? getBlogArticleBySlug(currentArticleSlug)
      : undefined;

  // Update SEO metadata and trigger a single GA4 page_view per unique route
  useEffect(() => {
    if (currentPage === 'blog-article' && activeArticle) {
      updatePageSEO('blog-article', activeArticle);
      trackPageView('blog-article', activeArticle.seoTitle, {
        customPath: `/blog/${activeArticle.slug}/`,
        pageType: 'blog_article',
        articleSlug: activeArticle.slug,
        articleCategory: activeArticle.category,
      });
      return;
    }

    const effectivePage = currentPage === 'blog-article' ? 'blog' : currentPage;
    updatePageSEO(effectivePage);
    const seoMeta = PAGE_SEO[effectivePage];
    trackPageView(effectivePage, seoMeta.title, {
      customPath: seoMeta.canonicalPath,
      pageType: effectivePage === 'blog' ? 'blog_index' : 'standard',
    });
  }, [currentPage, activeArticle]);

  const handleNavigate = useCallback((page: PageId, articleSlug?: string) => {
    const resolvedPage: PageId =
      page === 'blog-article' && (!articleSlug || !getBlogArticleBySlug(articleSlug))
        ? 'blog'
        : page;

    setCurrentPage(resolvedPage);
    setCurrentArticleSlug(resolvedPage === 'blog-article' ? articleSlug : undefined);

    const targetUrl = buildRouteUrl(resolvedPage, articleSlug);
    if (typeof window !== 'undefined' && window.location.pathname !== targetUrl) {
      window.history.pushState({ page: resolvedPage, articleSlug }, '', targetUrl);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectServiceForQuote = useCallback((serviceId: string) => {
    setSelectedServiceForQuote(serviceId);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F5F6] text-[#151A20]">
      {/* Skip to Main Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00BFA6] focus:text-[#151A20] focus:font-bold focus:rounded-md focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Main Sticky Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenGA4Debugger={() => setIsGA4ModalOpen(true)}
        onOpenMarketingStrategy={() => setIsStrategyModalOpen(true)}
        eventCount={events.length}
      />

      {/* Main Page Body */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectServiceForQuote={handleSelectServiceForQuote}
          />
        )}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onSelectServiceForQuote={handleSelectServiceForQuote}
          />
        )}
        {currentPage === 'blog' && <BlogPage onNavigate={handleNavigate} />}
        {currentPage === 'blog-article' && activeArticle && (
          <BlogArticlePage
            article={activeArticle}
            onNavigate={handleNavigate}
            onSelectServiceForQuote={handleSelectServiceForQuote}
          />
        )}
        {currentPage === 'blog-article' && !activeArticle && (
          <BlogPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'contact' && (
          <ContactPage
            initialServiceId={selectedServiceForQuote}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenGA4Debugger={() => setIsGA4ModalOpen(true)}
        onOpenMarketingStrategy={() => setIsStrategyModalOpen(true)}
        onOpenSitemap={() => setIsSitemapModalOpen(true)}
      />

      {/* Cookie & Analytics Consent Banner */}
      <ConsentBanner />

      {/* GA4 Real-time Debugger Modal */}
      <GA4DebuggerModal
        isOpen={isGA4ModalOpen}
        onClose={() => setIsGA4ModalOpen(false)}
      />

      {/* University Marketing Project Strategy Dossier Modal */}
      <MarketingStrategyModal
        isOpen={isStrategyModalOpen}
        onClose={() => setIsStrategyModalOpen(false)}
      />

      {/* SEO Sitemap & Robots Modal */}
      <SitemapModal
        isOpen={isSitemapModalOpen}
        onClose={() => setIsSitemapModalOpen(false)}
      />
    </div>
  );
}
