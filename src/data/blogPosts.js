/**
 * The blog post registry — metadata only (no content), so the /blog index
 * page, sitemap, and SEO tags can all be built without loading every post's
 * full content upfront.
 *
 * TO ADD A NEW POST:
 *   1. Create src/pages/blog/posts/YourPostName.jsx (copy an existing one
 *      as a starting point — it's just a React component using standard
 *      Tailwind Typography classes via the `prose` wrapper already applied
 *      by BlogPostLayout).
 *   2. Register it in BLOG_POST_COMPONENTS in
 *      src/pages/blog/postComponents.js (one line).
 *   3. Add its metadata below (slug must match what you used in step 2).
 *   4. Add its URL to public/sitemap.xml.
 *
 * Keep `date` in YYYY-MM-DD format and `slug` URL-safe (lowercase, hyphens).
 */
export const BLOG_POSTS = [
  {
    slug: 'are-qr-codes-dead',
    title: 'Are QR Codes Dead in 2026? What the Data Actually Shows',
    description:
      "QR codes were everywhere during the pandemic, then the hype faded. Here's an honest look at whether they're actually still useful — and where they genuinely make sense today.",
    date: '2026-07-12',
    readingTime: '5 min read',
  },
  {
    slug: 'wifi-qr-code-guide',
    title: 'WiFi QR Codes: The One QR Code Use That Actually Makes Sense',
    description:
      "No hype, no gimmick — just a faster way to get guests, customers, or visitors connected to your WiFi without reading out a password. Here's how to set one up properly.",
    date: '2026-07-10',
    readingTime: '4 min read',
  },
  {
    slug: 'qr-code-on-business-card',
    title: 'vCard or URL? Choosing the Right QR Code for Your Business Card',
    description:
      'A vCard QR code and a URL QR code do genuinely different jobs on a business card. Here\'s how to pick the right one — and a few print tips so it actually scans.',
    date: '2026-07-08',
    readingTime: '4 min read',
  },
  {
    slug: 'qr-codes-for-restaurants',
    title: 'QR Codes for Restaurants: What Actually Works (and What to Avoid)',
    description:
      'Restaurants started the QR code boom, and the backlash too. A clear-eyed look at where QR codes genuinely help — WiFi, specials, directions, WhatsApp orders — and the one mistake to avoid.',
    date: '2026-07-06',
    readingTime: '4 min read',
  },
  {
    slug: 'static-vs-dynamic-qr-codes',
    title: 'Static vs Dynamic QR Codes: What\'s the Difference (and Which Do You Need)?',
    description:
      "Most QR code generators push you toward a paid 'dynamic' code without explaining what you're actually trading off. Here's the honest breakdown of both, and which one most people actually need.",
    date: '2026-07-04',
    readingTime: '5 min read',
  },
];

export function getBlogPostMeta(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug) || null;
}
