import { useEffect } from 'react';

const CLIENT_ID = import.meta.env.VITE_ADSENSE_CLIENT || '';
const SCRIPT_ID = 'adsbygoogle-loader';

/**
 * Injects Google's AdSense loader script site-wide, but only once
 * VITE_ADSENSE_CLIENT (your ca-pub-XXXXXXXXXXXXXXXX publisher ID) is set —
 * see .env.example. Until then this renders nothing, so local dev/preview
 * builds never request real ad inventory. Mount this once near the root of
 * the app (it's already wired into App.jsx).
 */
export default function AdSenseLoader() {
  useEffect(() => {
    if (!CLIENT_ID || document.getElementById(SCRIPT_ID)) return;
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT_ID}`;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }, []);

  return null;
}

export const ADSENSE_CLIENT_ID = CLIENT_ID;
