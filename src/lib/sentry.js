import * as Sentry from '@sentry/react';

const DSN = import.meta.env.VITE_SENTRY_DSN || '';

/**
 * Initializes Sentry error monitoring — a no-op until VITE_SENTRY_DSN is
 * set (see .env.example). Without this, a production error is only ever
 * visible in that one visitor's own browser console, which means you'd
 * have no way to know something broke unless a user happened to report it.
 */
export function initSentry() {
  if (!DSN) return;
  Sentry.init({
    dsn: DSN,
    // Keep this lean by default — no session replay, no performance
    // tracing — since those add meaningful bundle size and quota usage
    // that most small sites don't need out of the gate. Add them back in
    // (tracesSampleRate, replaysSessionSampleRate, integrations) once
    // you've confirmed basic error reporting is working.
    environment: import.meta.env.MODE,
  });
}

export const isSentryEnabled = Boolean(DSN);
export { Sentry };
