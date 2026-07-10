import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';
const SCRIPT_ID = 'ga4-loader';
const CONSENT_KEY = 'qr-forge-cookie-consent';

function loadGaScript() {
  if (document.getElementById(SCRIPT_ID)) return;
  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line no-unused-vars
  function gtag(...args) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  // send_page_view is handled manually below on route change, since this
  // is a client-side-routed SPA and the default automatic pageview would
  // only fire once on initial load.
  gtag('config', MEASUREMENT_ID, { send_page_view: false });
}

/**
 * Loads Google Analytics 4 only when both VITE_GA_MEASUREMENT_ID is set
 * (see .env.example) AND the visitor has accepted the cookie consent
 * banner — analytics cookies are non-essential, so this never loads
 * before consent, and never loads at all if you haven't configured it.
 * Tracks pageviews manually on every client-side route change.
 */
export default function AnalyticsLoader() {
  const location = useLocation();
  const loadedRef = useRef(false);

  const trackPageview = () => {
    if (!MEASUREMENT_ID) return;
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent !== 'accepted') return;

    if (!loadedRef.current) {
      loadGaScript();
      loadedRef.current = true;
    }

    window.gtag?.('event', 'page_view', {
      page_path: window.location.pathname + window.location.search,
      page_location: window.location.href,
    });
  };

  useEffect(trackPageview, [location]);

  // If the visitor accepts the cookie banner mid-session (after this
  // component already mounted), start analytics immediately rather than
  // waiting for the next route change.
  useEffect(() => {
    window.addEventListener('qr-forge-consent-changed', trackPageview);
    return () => window.removeEventListener('qr-forge-consent-changed', trackPageview);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
