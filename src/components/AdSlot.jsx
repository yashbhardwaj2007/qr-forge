import { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT_ID } from './AdSenseLoader.jsx';

/**
 * Reserved ad placement. Renders an honest, styled placeholder in
 * development so the layout is easy to reason about — and automatically
 * switches to a real AdSense unit once both VITE_ADSENSE_CLIENT (see
 * .env.example) and a per-instance `slot` id (from your AdSense dashboard,
 * under Ads > By ad unit) are set. No code changes needed to go live once
 * you're approved — just fill in the two IDs.
 */
export default function AdSlot({
  label = 'Advertisement',
  slot = '',
  className = '',
  minHeight = 100,
  format = 'auto',
}) {
  const insRef = useRef(null);
  const isLive = Boolean(ADSENSE_CLIENT_ID && slot);

  useEffect(() => {
    if (!isLive) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense script may not have finished loading yet — harmless no-op.
    }
  }, [isLive]);

  if (isLive) {
    return (
      <ins
        ref={insRef}
        className={`adsbygoogle block w-full ${className}`}
        style={{ display: 'block', minHeight }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    );
  }

  return (
    <div
      className={`w-full rounded-2xl border border-dashed border-ink-200 dark:border-ink-700 bg-ink-50/50 dark:bg-ink-900/40 flex items-center justify-center text-xs uppercase tracking-wider text-ink-400 dark:text-ink-500 ${className}`}
      style={{ minHeight }}
      role="complementary"
      aria-label={label}
    >
      {label}
    </div>
  );
}
