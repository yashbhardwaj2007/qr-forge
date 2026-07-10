import QrScanner from 'qr-scanner';

/**
 * A single shared decode engine, created once and reused for every
 * "is this QR actually scannable" check. qr-scanner's createQrEngine()
 * prefers the browser's native BarcodeDetector API when available (Chrome,
 * Edge) — which costs zero extra network bytes — and only falls back to
 * downloading its JS worker on browsers without native support (Safari,
 * Firefox). Caching the promise means that fallback worker, if needed, is
 * only ever fetched once per session, not once per keystroke.
 */
let enginePromise = null;

export function getSharedQrEngine() {
  if (!enginePromise) {
    enginePromise = QrScanner.createQrEngine();
  }
  return enginePromise;
}

export { QrScanner };
