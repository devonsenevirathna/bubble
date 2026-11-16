import React from 'react';
import { BlogArticle, PageId } from '../types';
import { getBlogArticleBySlug } from '../data/blogData';
import { ASSET_IMAGES } from '../assets/images';
import { buildRouteUrl } from '../utils/routes';
import {
  trackBlogArticleClick,
  trackBlogToQuoteClick,
  trackBlogToServicesClick,
} from '../utils/analytics';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface BlogArticlePageProps {
  article: BlogArticle;
  onNavigate: (page: PageId, articleSlug?: string) => void;
  onSelectServiceForQuote: (serviceId: string) => void;
}

export const BlogArticlePage: React.FC<BlogArticlePageProps> = ({
  article,
  onNavigate,
  onSelectServiceForQuote,
}) => {
  const relatedArticles = article.relatedSlugs
    .map((slug) => getBlogArticleBySlug(slug))
    .filter((item): item is BlogArticle => Boolean(item));

  const handleNavLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: PageId,
    slug?: string
  ) => {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      onNavigate(page, slug);
    }
  };

  const handleServicesCta = (
    e: React.MouseEvent<HTMLAnchorElement>,
    location: string,
    label: string
  ) => {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      trackBlogToServicesClick(location, article.slug, label);
      onNavigate('services');
    }
  };

  const handleQuoteCta = (
    e: React.MouseEvent<HTMLAnchorElement>,
    location: string,
    label: string,
    serviceId?: string
  ) => {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      trackBlogToQuoteClick(location, article.slug, label, serviceId);
      if (serviceId) {
        onSelectServiceForQuote(serviceId);
      }
      onNavigate('contact');
    }
  };

  const handleRelatedClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetArticle: BlogArticle,
    location: string
  ) => {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      trackBlogArticleClick(location, targetArticle.slug, targetArticle.category);
      onNavigate('blog-article', targetArticle.slug);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <article className="py-8 md:py-12 space-y-12">
      {/* 1. Breadcrumb & Article Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
          <a
            href={buildRouteUrl('home')}
            onClick={(e) => handleNavLink(e, 'home')}
            className="hover:text-[#151A20] transition-colors font-medium"
          >
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          <a
            href={buildRouteUrl('blog')}
            onClick={(e) => handleNavLink(e, 'blog')}
            className="hover:text-[#151A20] transition-colors font-medium"
          >
            Blog
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          <span className="text-slate-800 font-semibold truncate max-w-xs sm:max-w-md" aria-current="page">
            {article.title}
          </span>
        </nav>

        <div className="max-w-4xl space-y-4">
          {/* Unboxed clean metadata line */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 font-medium">
            <span className="font-bold text-[#009E89] uppercase tracking-wider">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {article.readingTimeLabel}
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedDate}>{article.publishedLabel}</time>
            <span aria-hidden="true">·</span>
            <span>{article.author}</span>
          </div>

          {/* Single semantic H1 */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A20] tracking-tight leading-[1.12]">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Featured Article Hero Photo */}
        <figure className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-900 max-h-[480px]">
          <img
            src={ASSET_IMAGES[article.imageKey]}
            alt={article.imageAlt}
            className="w-full h-full max-h-[480px] object-cover"
            loading="eager"
          />
          <figcaption className="px-4 py-2.5 bg-[#151A20] text-[11px] text-slate-300 flex items-center justify-between gap-2">
            <span>{article.imageAlt}</span>
            <span className="text-[#00BFA6] font-semibold shrink-0">Adelaide, SA</span>
          </figcaption>
        </figure>
      </header>

      {/* 2. Article Body & Sticky Conversion Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Editorial Column */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
            {/* Introduction */}
            <div className="space-y-4 text-base text-slate-700 leading-relaxed border-b border-slate-100 pb-6">
              {article.introduction.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Structured H2 / H3 Sections */}
            <div className="space-y-10">
              {article.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28 space-y-4">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#151A20] tracking-tight">
                    {section.h2}
                  </h2>

                  {section.paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      {para}
                    </p>
                  ))}

                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-2.5 pt-1">
                      {section.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700 bg-slate-50/80 p-3.5 rounded-xl border border-slate-100"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#009E89] shrink-0 mt-1" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.subsections && section.subsections.length > 0 && (
                    <div className="space-y-6 pt-2">
                      {section.subsections.map((sub, sIdx) => (
                        <div key={sIdx} className="space-y-2.5 pl-4 border-l-2 border-[#00BFA6]">
                          <h3 className="text-base sm:text-lg font-bold text-[#151A20]">
                            {sub.h3}
                          </h3>
                          {sub.paragraphs.map((sp, spIdx) => (
                            <p
                              key={spIdx}
                              className="text-sm sm:text-base text-slate-700 leading-relaxed"
                            >
                              {sp}
                            </p>
                          ))}
                          {sub.bullets && sub.bullets.length > 0 && (
                            <ul className="space-y-2 pt-1">
                              {sub.bullets.map((sb, sbIdx) => (
                                <li
                                  key={sbIdx}
                                  className="flex items-start gap-2 text-sm text-slate-700"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#00BFA6] shrink-0 mt-2"></span>
                                  <span>{sb}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Inline Contextual Callout / Internal Link */}
                  {section.inlineCta && (
                    <div className="mt-4 p-5 rounded-xl bg-teal-50/80 border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <p className="text-xs sm:text-sm text-teal-950 font-medium leading-relaxed">
                        {section.inlineCta.text}
                      </p>
                      {section.inlineCta.targetPage === 'services' ? (
                        <a
                          href={buildRouteUrl('services')}
                          onClick={(e) =>
                            handleServicesCta(
                              e,
                              `article_inline_${section.id}`,
                              section.inlineCta!.buttonLabel
                            )
                          }
                          className="px-4 py-2.5 rounded-lg bg-[#151A20] text-white font-bold text-xs hover:bg-[#00BFA6] hover:text-[#151A20] transition-colors inline-flex items-center gap-1.5 shrink-0"
                        >
                          <span>{section.inlineCta.buttonLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <a
                          href={buildRouteUrl('contact')}
                          onClick={(e) =>
                            handleQuoteCta(
                              e,
                              `article_inline_${section.id}`,
                              section.inlineCta!.buttonLabel,
                              section.inlineCta!.targetServiceId
                            )
                          }
                          className="px-4 py-2.5 rounded-lg bg-[#00BFA6] text-[#151A20] font-bold text-xs hover:bg-[#00D4B8] transition-colors inline-flex items-center gap-1.5 shrink-0 shadow-sm"
                        >
                          <span>{section.inlineCta.buttonLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Closing Summary & Primary Conversion CTA */}
            <div className="pt-8 border-t border-slate-200 space-y-5">
              <div className="space-y-3">
                <h2 className="text-xl font-extrabold text-[#151A20]">Final Takeaways</h2>
                {article.closingSummary.map((para, idx) => (
                  <p key={idx} className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-[#151A20] text-white space-y-4">
                <div className="text-xs font-bold text-[#00BFA6] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Bubble &amp; Squeak Mobile Car Detailing · Adelaide SA
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  We Bring the Shine to Your Driveway or Workplace
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Share your vehicle category and Adelaide suburb to receive a clear, obligation-free mobile detailing estimate.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <a
                    href={buildRouteUrl('contact')}
                    onClick={(e) =>
                      handleQuoteCta(e, 'article_bottom_cta', article.closingCtaLabel)
                    }
                    className="px-6 py-3 rounded-lg bg-[#00BFA6] text-[#151A20] font-bold text-xs sm:text-sm hover:bg-[#00D4B8] transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <span>{article.closingCtaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={buildRouteUrl('services')}
                    onClick={(e) =>
                      handleServicesCta(e, 'article_bottom_cta', 'Explore Our Detailing Services')
                    }
                    className="px-5 py-3 rounded-lg bg-white/10 text-white font-semibold text-xs sm:text-sm hover:bg-white/20 border border-white/15 transition-colors text-center"
                  >
                    Explore Our Detailing Services
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar (Table of Contents & Quick Actions) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* Table of Contents */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                In This Article
              </h2>
              <nav aria-label="Article table of contents">
                <ul className="space-y-2.5 text-xs sm:text-sm">
                  {article.sections.map((section) => (
                    <li key={section.id}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(section.id)}
                        className="text-left text-slate-700 hover:text-[#009E89] font-medium transition-colors flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00BFA6] shrink-0 mt-1.5"></span>
                        <span>{section.h2}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Sidebar Quote Conversion Card */}
            <div className="p-6 rounded-2xl bg-[#151A20] text-white space-y-4 shadow-sm border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00BFA6] uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                Adelaide Mobile Service
              </div>
              <h3 className="text-lg font-bold text-white leading-snug">
                Need Mobile Car Detailing in Adelaide?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Get an obligation-free quote tailored to your sedan, SUV, 4WD, or family car—completed at your home or office.
              </p>
              <div className="space-y-2.5 pt-1">
                <a
                  href={buildRouteUrl('contact')}
                  onClick={(e) =>
                    handleQuoteCta(
                      e,
                      'article_sidebar',
                      'Request Your Free Mobile Detailing Quote'
                    )
                  }
                  className="w-full py-3 px-4 rounded-lg bg-[#00BFA6] text-[#151A20] font-bold text-xs hover:bg-[#00D4B8] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Request Your Free Mobile Detailing Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={buildRouteUrl('services')}
                  onClick={(e) =>
                    handleServicesCta(e, 'article_sidebar', 'Explore Our Detailing Services')
                  }
                  className="w-full py-2.5 px-4 rounded-lg bg-white/10 text-white font-semibold text-xs hover:bg-white/20 border border-white/10 transition-colors flex items-center justify-center"
                >
                  Explore Our Detailing Services
                </a>
              </div>
            </div>

            {/* Back to Blog Link */}
            <a
              href={buildRouteUrl('blog')}
              onClick={(e) => handleNavLink(e, 'blog')}
              className="w-full py-3 px-4 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#151A20] hover:border-[#00BFA6] hover:text-[#009E89] transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Blog Articles</span>
            </a>
          </aside>
        </div>
      </div>

      {/* 3. Contextual Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section
          aria-labelledby="related-articles-heading"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-[#009E89] uppercase tracking-wider">
                Continue Reading
              </span>
              <h2
                id="related-articles-heading"
                className="text-xl sm:text-2xl font-extrabold text-[#151A20] tracking-tight"
              >
                Related Adelaide Car Care Guides
              </h2>
            </div>
            <a
              href={buildRouteUrl('blog')}
              onClick={(e) => handleNavLink(e, 'blog')}
              className="text-xs sm:text-sm font-bold text-[#151A20] hover:text-[#009E89] transition-colors"
            >
              View All Articles →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((related) => (
              <article
                key={related.slug}
                className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <a
                    href={buildRouteUrl('blog-article', related.slug)}
                    onClick={(e) => handleRelatedClick(e, related, 'related_card_image')}
                    className="block aspect-[16/9] bg-slate-900 overflow-hidden"
                    tabIndex={-1}
                  >
                    <img
                      src={ASSET_IMAGES[related.imageKey]}
                      alt={related.imageAlt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </a>
                  <div className="p-6 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <span className="font-bold text-[#009E89] uppercase tracking-wider">
                        {related.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{related.readingTimeLabel}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#151A20] leading-snug">
                      <a
                        href={buildRouteUrl('blog-article', related.slug)}
                        onClick={(e) => handleRelatedClick(e, related, 'related_card_title')}
                        className="hover:text-[#009E89] transition-colors"
                      >
                        {related.title}
                      </a>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{related.excerpt}</p>
                  </div>
                </div>
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                  <a
                    href={buildRouteUrl('blog-article', related.slug)}
                    onClick={(e) => handleRelatedClick(e, related, 'related_card_button')}
                    className="px-4 py-2 rounded-lg bg-[#151A20] text-white font-bold text-xs hover:bg-[#00BFA6] hover:text-[#151A20] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
