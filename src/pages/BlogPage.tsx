import React, { useMemo, useState } from 'react';
import { BlogCategory, PageId } from '../types';
import { BLOG_ARTICLES, BLOG_CATEGORIES } from '../data/blogData';
import { ASSET_IMAGES } from '../assets/images';
import { buildRouteUrl } from '../utils/routes';
import {
  trackBlogArticleClick,
  trackBlogToQuoteClick,
  trackBlogToServicesClick,
} from '../utils/analytics';
import {
  ArrowRight,
  BookOpen,
  Clock,
  MapPin,
  Search,
  Sparkles,
  X,
} from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: PageId, articleSlug?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all');

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return BLOG_ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'all' || article.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!query) return true;

      const searchableText = [
        article.title,
        article.excerpt,
        article.category,
        article.primaryKeyword,
        ...article.secondaryKeywords,
      ]
        .join(' ')
        .toLowerCase();
      return searchableText.includes(query);
    });
  }, [searchQuery, selectedCategory]);

  const showFeaturedLayout =
    selectedCategory === 'all' && searchQuery.trim() === '' && filteredArticles.length > 0;
  const featuredArticle = showFeaturedLayout
    ? filteredArticles.find((a) => a.featured) || filteredArticles[0]
    : null;
  const gridArticles = featuredArticle
    ? filteredArticles.filter((a) => a.slug !== featuredArticle.slug)
    : filteredArticles;

  const handleArticleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    slug: string,
    category: BlogCategory,
    location: string
  ) => {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      trackBlogArticleClick(location, slug, category);
      onNavigate('blog-article', slug);
    }
  };

  const handleServicesCta = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      trackBlogToServicesClick('blog_landing_cta', 'blog-index', 'Explore Our Detailing Services');
      onNavigate('services');
    }
  };

  const handleQuoteCta = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      trackBlogToQuoteClick(
        'blog_landing_cta',
        'blog-index',
        'Request Your Free Mobile Detailing Quote'
      );
      onNavigate('contact');
    }
  };

  return (
    <div className="space-y-14 py-8 md:py-12">
      {/* 1. Blog Header & Search / Filter Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#009E89] uppercase tracking-wider">
            <span>Adelaide Detailing Journal</span>
            <span aria-hidden="true">·</span>
            <span>South Australia</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#151A20] tracking-tight leading-[1.12]">
            Car Care Tips &amp; Mobile Detailing Insights
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Expert car care advice, vehicle maintenance tips and mobile detailing insights for Adelaide drivers.
          </p>
        </div>

        {/* Search + Category Filter Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <label htmlFor="blog-search-input" className="sr-only">
                Search car care articles
              </label>
              <Search
                aria-hidden="true"
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <input
                id="blog-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles (e.g., Adelaide, car wash, interior)..."
                className="w-full pl-10 pr-9 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50/50 text-[#151A20] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Showing <strong className="text-[#151A20]">{filteredArticles.length}</strong> of{' '}
              {BLOG_ARTICLES.length} articles
            </div>
          </div>

          {/* Interactive Category Filter Buttons */}
          <div
            role="group"
            aria-label="Filter articles by category"
            className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 pb-1"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-[#151A20] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Articles
            </button>
            {BLOG_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-[#151A20] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Featured Article Section */}
      {featuredArticle && (
        <section
          aria-labelledby="featured-article-heading"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-[#009E89] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span id="featured-article-heading">Featured Guide</span>
          </div>

          <article className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-6 relative bg-slate-900 overflow-hidden min-h-[260px]">
                <img
                  src={ASSET_IMAGES[featuredArticle.imageKey]}
                  alt={featuredArticle.imageAlt}
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                  loading="eager"
                />
              </div>

              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Unboxed Clean Metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                    <span className="font-bold text-[#009E89] uppercase tracking-wider">
                      {featuredArticle.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {featuredArticle.readingTimeLabel}
                    </span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={featuredArticle.publishedDate}>
                      {featuredArticle.publishedLabel}
                    </time>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151A20] tracking-tight leading-snug">
                    <a
                      href={buildRouteUrl('blog-article', featuredArticle.slug)}
                      onClick={(e) =>
                        handleArticleNavigation(
                          e,
                          featuredArticle.slug,
                          featuredArticle.category,
                          'featured_title'
                        )
                      }
                      className="hover:text-[#009E89] transition-colors focus:outline-none focus-visible:underline"
                    >
                      {featuredArticle.title}
                    </a>
                  </h2>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#00BFA6]" />
                    Tailored for Adelaide &amp; SA Drivers
                  </span>

                  <a
                    href={buildRouteUrl('blog-article', featuredArticle.slug)}
                    onClick={(e) =>
                      handleArticleNavigation(
                        e,
                        featuredArticle.slug,
                        featuredArticle.category,
                        'featured_button'
                      )
                    }
                    className="px-5 py-3 rounded-lg bg-[#00BFA6] text-[#151A20] font-bold text-xs sm:text-sm hover:bg-[#00D4B8] active:scale-[0.98] transition-all inline-flex items-center gap-2 shadow-sm"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* 3. Responsive Blog Article Grid */}
      <section
        aria-labelledby="all-articles-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            id="all-articles-heading"
            className="text-xl sm:text-2xl font-extrabold text-[#151A20] tracking-tight"
          >
            {featuredArticle ? 'More Car Care Guides & Comparisons' : 'Matching Articles'}
          </h2>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="p-10 rounded-2xl bg-white border border-slate-200 text-center space-y-4">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#151A20]">No matching articles found</h3>
              <p className="text-xs text-slate-500">
                Try clearing your search term or selecting "All Articles" to browse all Adelaide detailing guides.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 text-xs font-bold bg-[#151A20] text-white rounded-lg hover:bg-[#00BFA6] hover:text-[#151A20] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {gridArticles.map((article) => (
              <article
                key={article.slug}
                className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <a
                    href={buildRouteUrl('blog-article', article.slug)}
                    onClick={(e) =>
                      handleArticleNavigation(e, article.slug, article.category, 'card_image')
                    }
                    className="block aspect-[16/9] bg-slate-900 overflow-hidden"
                    tabIndex={-1}
                  >
                    <img
                      src={ASSET_IMAGES[article.imageKey]}
                      alt={article.imageAlt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </a>

                  <div className="p-6 space-y-3">
                    {/* Clean unboxed metadata */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
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
                    </div>

                    <h3 className="text-xl font-bold text-[#151A20] leading-snug">
                      <a
                        href={buildRouteUrl('blog-article', article.slug)}
                        onClick={(e) =>
                          handleArticleNavigation(e, article.slug, article.category, 'card_title')
                        }
                        className="hover:text-[#009E89] transition-colors"
                      >
                        {article.title}
                      </a>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Bubble &amp; Squeak · Adelaide SA
                  </span>

                  <a
                    href={buildRouteUrl('blog-article', article.slug)}
                    onClick={(e) =>
                      handleArticleNavigation(e, article.slug, article.category, 'card_button')
                    }
                    className="px-4 py-2 rounded-lg bg-[#151A20] text-white font-bold text-xs hover:bg-[#00BFA6] hover:text-[#151A20] transition-colors inline-flex items-center gap-1.5 shrink-0"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 4. Conversion Banner Linking Blog to Services & Quote */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="rounded-2xl bg-[#151A20] text-white p-8 sm:p-12 border border-slate-800 shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-bold text-[#00BFA6] uppercase tracking-wider">
              Doorstep Vehicle Care in Adelaide
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to Give Your Car Professional Care at Home or Work?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Explore our transparent exterior, interior, and full detailing packages, or tell us about your vehicle for a free, personalised Adelaide quotation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={buildRouteUrl('services')}
              onClick={handleServicesCta}
              className="px-5 py-3.5 rounded-lg bg-white/10 text-white font-semibold text-sm hover:bg-white/20 border border-white/15 transition-colors text-center"
            >
              Explore Our Detailing Services
            </a>
            <a
              href={buildRouteUrl('contact')}
              onClick={handleQuoteCta}
              className="px-6 py-3.5 rounded-lg bg-[#00BFA6] text-[#151A20] font-bold text-sm hover:bg-[#00D4B8] transition-colors inline-flex items-center justify-center gap-2 shadow-md"
            >
              <span>Request Your Free Mobile Detailing Quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
