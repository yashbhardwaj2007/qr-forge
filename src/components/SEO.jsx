import { useMemo } from 'react';
import { useDocumentHead } from '../hooks/useDocumentHead.js';

export const SITE_URL = 'https://forge-qr.vercel.app';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'QR Forge',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
};

/**
 * Centralizes per-page SEO tags: title, description, canonical URL,
 * Open Graph and Twitter Card metadata, plus optional JSON-LD structured
 * data. Renders nothing — it just synchronizes <head> via useDocumentHead.
 *
 * `structuredData` accepts a single schema.org object or an array of them.
 * Pass a stable reference (module-level constant, or memoized) since a new
 * array/object identity on every render will cause the underlying effect
 * to re-run unnecessarily.
 */
export default function SEO({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  noindex = false,
  structuredData = null,
}) {
  const fullTitle = title ? `${title} | QR Forge` : 'QR Forge — Free Online QR Code Generator';
  const canonical = `${SITE_URL}${path}`;

  const allStructuredData = useMemo(
    () =>
      structuredData
        ? [ORGANIZATION_SCHEMA, ...(Array.isArray(structuredData) ? structuredData : [structuredData])]
        : ORGANIZATION_SCHEMA,
    [structuredData]
  );

  useDocumentHead({
    title: fullTitle,
    description,
    canonical,
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    image,
    structuredData: allStructuredData,
  });

  return null;
}
