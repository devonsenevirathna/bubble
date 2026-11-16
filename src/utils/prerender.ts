import fs from 'fs';
import path from 'path';
import { BLOG_ARTICLES } from '../data/blogData';
import { buildBlogPostingJsonLd, PAGE_SEO, PRODUCTION_BASE_URL } from './seo';
import { BlogArticle } from '../types';

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function injectHeadTags(
  templateHtml: string,
  options: {
    title: string;
    description: string;
    keywords: string;
    canonicalUrl: string;
    ogType: 'website' | 'article';
    jsonLd?: Record<string, unknown>;
    bodyHtml?: string;
  }
): string {
  let html = templateHtml;

  const escapedTitle = escapeHtml(options.title);
  const escapedDesc = escapeHtml(options.description);
  const escapedKeywords = escapeHtml(options.keywords);
  const escapedCanonical = escapeHtml(options.canonicalUrl);

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapedTitle}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapedDesc}" />`
  );
  html = html.replace(
    /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="keywords" content="${escapedKeywords}" />`
  );
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="${options.ogType}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapedTitle}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapedDesc}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapedTitle}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapedDesc}" />`
  );

  const extraHeadTags = [
    `<link rel="canonical" href="${escapedCanonical}" />`,
    `<meta property="og:url" content="${escapedCanonical}" />`,
  ];

  if (options.jsonLd) {
    extraHeadTags.push(
      `<script id="blog-posting-jsonld" type="application/ld+json">${JSON.stringify(options.jsonLd)}</script>`
    );
  }

  html = html.replace('</head>', `    ${extraHeadTags.join('\n    ')}\n  </head>`);

  if (options.bodyHtml) {
    html = html.replace('<div id="root"></div>', `<div id="root">${options.bodyHtml}</div>`);
  }

  return html;
}

function renderBlogIndexHtml(basePrefix: string): string {
  const articlesHtml = BLOG_ARTICLES.map(
    (a) => `
      <article>
        <h2><a href="${basePrefix}blog/${escapeHtml(a.slug)}/">${escapeHtml(a.title)}</a></h2>
        <p>${escapeHtml(a.category)} · ${escapeHtml(a.readingTimeLabel)} · ${escapeHtml(a.publishedLabel)}</p>
        <p>${escapeHtml(a.excerpt)}</p>
        <a href="${basePrefix}blog/${escapeHtml(a.slug)}/">Read Article</a>
      </article>`
  ).join('\n');

  return `
    <main>
      <header>
        <nav aria-label="Primary">
          <a href="${basePrefix}">Home</a> |
          <a href="${basePrefix}about/">About Us</a> |
          <a href="${basePrefix}services/">Services</a> |
          <a href="${basePrefix}blog/">Blog</a> |
          <a href="${basePrefix}contact/">Contact &amp; Quote</a>
        </nav>
      </header>
      <section>
        <h1>${escapeHtml(PAGE_SEO.blog.h1)}</h1>
        <p>${escapeHtml(PAGE_SEO.blog.metaDescription)}</p>
        ${articlesHtml}
      </section>
    </main>
  `;
}

function renderArticleHtml(article: BlogArticle, basePrefix: string): string {
  const sectionsHtml = article.sections
    .map((sec) => {
      const paras = sec.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n');
      const bullets = sec.bullets
        ? `<ul>${sec.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>`
        : '';
      const subs = sec.subsections
        ? sec.subsections
            .map(
              (sub) => `
            <h3>${escapeHtml(sub.h3)}</h3>
            ${sub.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n')}
            ${sub.bullets ? `<ul>${sub.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>` : ''}
          `
            )
            .join('\n')
        : '';
      const cta = sec.inlineCta
        ? `<p><a href="${basePrefix}${sec.inlineCta.targetPage}/">${escapeHtml(sec.inlineCta.buttonLabel)}</a></p>`
        : '';

      return `<section><h2>${escapeHtml(sec.h2)}</h2>${paras}${bullets}${subs}${cta}</section>`;
    })
    .join('\n');

  const relatedHtml = article.relatedSlugs
    .map((slug) => BLOG_ARTICLES.find((a) => a.slug === slug))
    .filter((a): a is BlogArticle => Boolean(a))
    .map(
      (rel) =>
        `<li><a href="${basePrefix}blog/${escapeHtml(rel.slug)}/">${escapeHtml(rel.title)}</a></li>`
    )
    .join('');

  return `
    <main>
      <nav aria-label="Breadcrumb">
        <a href="${basePrefix}">Home</a> / <a href="${basePrefix}blog/">Blog</a> / <span>${escapeHtml(article.title)}</span>
      </nav>
      <article>
        <h1>${escapeHtml(article.title)}</h1>
        <p>${escapeHtml(article.category)} · ${escapeHtml(article.readingTimeLabel)} · ${escapeHtml(article.publishedLabel)}</p>
        ${article.introduction.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n')}
        ${sectionsHtml}
        <section>
          <h2>Final Takeaways</h2>
          ${article.closingSummary.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n')}
          <p>
            <a href="${basePrefix}services/">Explore Our Detailing Services</a> |
            <a href="${basePrefix}contact/">${escapeHtml(article.closingCtaLabel)}</a>
          </p>
        </section>
        ${relatedHtml ? `<section><h2>Related Adelaide Car Care Guides</h2><ul>${relatedHtml}</ul></section>` : ''}
      </article>
    </main>
  `;
}

export function generatePrerenderedRoutes(distDir: string, basePath: string): void {
  const indexFile = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexFile)) return;

  const templateHtml = fs.readFileSync(indexFile, 'utf-8');
  const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;

  // Update root dist/index.html with canonical URL for home
  const homeHtml = injectHeadTags(templateHtml, {
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.metaDescription,
    keywords: PAGE_SEO.home.keywords,
    canonicalUrl: `${PRODUCTION_BASE_URL}/`,
    ogType: 'website',
  });
  fs.writeFileSync(indexFile, homeHtml, 'utf-8');

  // Generate 404.html fallback for GitHub Pages unexpected subpaths
  fs.writeFileSync(path.join(distDir, '404.html'), homeHtml, 'utf-8');

  // Static pages (about, services, contact)
  for (const pageKey of ['about', 'services', 'contact'] as const) {
    const meta = PAGE_SEO[pageKey];
    const pageHtml = injectHeadTags(templateHtml, {
      title: meta.title,
      description: meta.metaDescription,
      keywords: meta.keywords,
      canonicalUrl: `${PRODUCTION_BASE_URL}${meta.canonicalPath}`,
      ogType: 'website',
      bodyHtml: `<main><h1>${escapeHtml(meta.h1)}</h1><p>${escapeHtml(meta.metaDescription)}</p><p><a href="${normalizedBase}">Home</a> | <a href="${normalizedBase}services/">Services</a> | <a href="${normalizedBase}blog/">Blog</a> | <a href="${normalizedBase}contact/">Contact &amp; Quote</a></p></main>`,
    });
    const outDir = path.join(distDir, pageKey);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), pageHtml, 'utf-8');
  }

  // Blog landing page (/blog/index.html)
  const blogMeta = PAGE_SEO.blog;
  const blogHtml = injectHeadTags(templateHtml, {
    title: blogMeta.title,
    description: blogMeta.metaDescription,
    keywords: blogMeta.keywords,
    canonicalUrl: `${PRODUCTION_BASE_URL}${blogMeta.canonicalPath}`,
    ogType: 'website',
    bodyHtml: renderBlogIndexHtml(normalizedBase),
  });
  const blogDir = path.join(distDir, 'blog');
  fs.mkdirSync(blogDir, { recursive: true });
  fs.writeFileSync(path.join(blogDir, 'index.html'), blogHtml, 'utf-8');

  // Individual blog article pages (/blog/<slug>/index.html)
  for (const article of BLOG_ARTICLES) {
    const articleHtml = injectHeadTags(templateHtml, {
      title: article.seoTitle,
      description: article.metaDescription,
      keywords: [article.primaryKeyword, ...article.secondaryKeywords].join(', '),
      canonicalUrl: `${PRODUCTION_BASE_URL}/blog/${article.slug}/`,
      ogType: 'article',
      jsonLd: buildBlogPostingJsonLd(article),
      bodyHtml: renderArticleHtml(article, normalizedBase),
    });
    const articleDir = path.join(blogDir, article.slug);
    fs.mkdirSync(articleDir, { recursive: true });
    fs.writeFileSync(path.join(articleDir, 'index.html'), articleHtml, 'utf-8');
  }
}
