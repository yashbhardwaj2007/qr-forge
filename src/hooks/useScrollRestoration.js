import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router doesn't scroll for you. Without this, navigating from a
 * scrolled-down position on one page leaves you scrolled down on the next
 * page too, which is disorienting in an SPA.
 *
 * - Plain navigation (no hash): scroll to top instantly.
 * - Navigation with a hash (e.g. "/#generator", used when the navbar's
 *   "Create QR" button is clicked from a page other than home): smoothly
 *   scroll the target element into view once it exists. A short retry loop
 *   covers the case where the target page is still being fetched as a lazy
 *   chunk, so the element isn't in the DOM yet on the first frame.
 */
export function useScrollRestoration() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return undefined;
    }

    const id = hash.replace('#', '');
    let attempts = 0;
    let frame;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      attempts += 1;
      if (attempts < 40) frame = requestAnimationFrame(tryScroll);
    };

    tryScroll();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
}
