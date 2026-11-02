import React, { useState, useEffect, useCallback } from 'react';
import { PageId, AnalyticsEvent } from './types';
import { updatePageSEO, PAGE_SEO } from './utils/seo';
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
import { ContactPage } from './pages/ContactPage';
import { GA4DebuggerModal } from './components/GA4DebuggerModal';
import { MarketingStrategyModal } from './components/MarketingStrategyModal';
import { SitemapModal } from './components/SitemapModal';
import { ConsentBanner } from './components/ConsentBanner';

export default function App() {
  // Sync page state with URL hash for GitHub Pages static compatibility
  const getInitialPage = (): PageId => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'about' || hash === 'services' || hash === 'contact') {
        return hash as PageId;
      }
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
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

  // Handle Hash Changes (Back / Forward browser buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'about' || hash === 'services' || hash === 'contact') {
        setCurrentPage(hash as PageId);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update SEO and trigger GA4 page_view when page changes
  useEffect(() => {
    updatePageSEO(currentPage);
    const seoMeta = PAGE_SEO[currentPage];
    trackPageView(currentPage, seoMeta.title);
  }, [currentPage]);

  const handleNavigate = useCallback((page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectServiceForQuote = useCallback((serviceId: string) => {
    setSelectedServiceForQuote(serviceId);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F5F6] text-[#151A20]">
      {/* Skip to Main Content Link (Accessibility WCAG 2.4.1) */}
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
