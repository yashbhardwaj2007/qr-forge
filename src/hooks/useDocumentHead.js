import { useEffect } from 'react';

/**
 * Manages document.title and <meta>/<link>/<script type="application/ld+json">
 * tags for the current page without pulling in a third-party head-management
 * library (avoids the react-helmet-async React 19 peer-dependency conflict).
 * Tags are upserted by a stable key attribute and left in place between
 * route changes (only their content updates), so there's no flash of
 * missing meta tags between navigations.
 *
 * Props are intentionally flat primitives (not nested og/twitter objects):
 * object literals get a new identity every render, which would make the
 * effect below re-run — and re-touch the DOM — on every single render of
 * the calling page, not just when the actual values change.
 */
function upsertMeta(attr, key, content) {
  if (content == null) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  if (href == null) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useDocumentHead({
  title,
  description,
  canonical,
  robots,
  image,
  ogType = 'website',
  structuredData = null,
}) {
  useEffect(() => {
    if (title) document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', robots || 'index, follow');
    upsertLink('canonical', canonical);

    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', image);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);
  }, [title, description, canonical, robots, image, ogType]);

  // JSON-LD structured data — kept in a separate effect since it has its
  // own lifecycle (scripts are page-specific and must be fully removed on
  // unmount/navigation rather than merely updated, to avoid stale schema
  // accumulating across route changes).
  useEffect(() => {
    if (!structuredData) return undefined;
    const items = Array.isArray(structuredData) ? structuredData : [structuredData];
    const scripts = items.map((data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
      return script;
    });
    return () => scripts.forEach((script) => script.remove());
  }, [structuredData]);
}
