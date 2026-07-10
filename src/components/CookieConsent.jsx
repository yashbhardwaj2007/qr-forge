import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShieldCheck } from 'react-icons/hi';

const CONSENT_KEY = 'qr-forge-cookie-consent';

/**
 * A minimal cookie/ad-consent banner. Required groundwork for running
 * Google AdSense (and for basic GDPR/CCPA compliance) once ads are live.
 *
 * NOTE: This stores a simple "accepted/declined" flag. If you serve ads to
 * EU/UK visitors, Google requires a Google-certified Consent Management
 * Platform (CMP) under its EU User Consent Policy — see
 * https://support.google.com/adsense/answer/13554116. Swap this component
 * for a CMP (e.g. one from the IAB TCF list, several have free tiers) before
 * you start serving ads to European traffic.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setVisible(true);
  }, []);

  const handleChoice = (value) => {
    localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
    window.dispatchEvent(new Event('qr-forge-consent-changed'));
    // If you add Google Consent Mode later, update consent state here too, e.g.:
    // window.gtag?.('consent', 'update', { ad_storage: value === 'accepted' ? 'granted' : 'denied' });
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 animate-fade-up"
    >
      <div className="section pb-4">
        <div className="glass rounded-2xl border border-ink-200 dark:border-ink-700 shadow-card dark:shadow-card-dark p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
            <HiOutlineShieldCheck size={20} />
          </span>
          <p className="flex-1 text-sm text-ink-600 dark:text-ink-300 text-center sm:text-left">
            We use cookies to run this site and, where enabled, to show ads.
            Your QR data always stays in your browser. Read our{' '}
            <Link to="/privacy-policy" className="text-brand-600 dark:text-brand-400 underline">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={() => handleChoice('declined')} className="btn-secondary text-sm">
              Decline
            </button>
            <button type="button" onClick={() => handleChoice('accepted')} className="btn-primary text-sm">
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
