import { lazy } from 'react';

/**
 * Maps a post's slug to its lazy-loaded content component. Kept separate
 * from src/data/blogPosts.js (which has the metadata) so visiting /blog
 * doesn't pull in the full content of every post — just this small map and
 * whichever one post is actually opened.
 */
export const BLOG_POST_COMPONENTS = {
  'are-qr-codes-dead': lazy(() => import('./posts/AreQrCodesDead.jsx')),
  'wifi-qr-code-guide': lazy(() => import('./posts/WifiQrCodesGuide.jsx')),
  'qr-code-on-business-card': lazy(() => import('./posts/QrCodeBusinessCard.jsx')),
  'qr-codes-for-restaurants': lazy(() => import('./posts/QrCodesForRestaurants.jsx')),
  'static-vs-dynamic-qr-codes': lazy(() => import('./posts/StaticVsDynamicQrCodes.jsx')),
};
