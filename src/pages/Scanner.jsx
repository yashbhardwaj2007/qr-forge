import { useEffect, useRef, useState, useCallback } from 'react';
import QrScanner from 'qr-scanner';
import toast from 'react-hot-toast';
import {
  HiOutlineCamera,
  HiOutlineUpload,
  HiOutlineClipboardCopy,
  HiOutlineExternalLink,
  HiOutlineTrash,
  HiOutlineQrcode,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';
import SEO from '../components/SEO.jsx';
import AdSlot from '../components/AdSlot.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { classifyScanResult } from '../utils/scanResultUtils.js';
import { copyText } from '../utils/downloadUtils.js';
import { Sentry } from '../lib/sentry.js';

const SCAN_HISTORY_KEY = 'qr-forge-scan-history';
const MAX_SCAN_HISTORY = 15;
// While the camera is pointed at the same code, the decode callback keeps
// firing (up to maxScansPerSecond times a second) — without this, that
// meant a fresh toast and a re-recorded history entry several times a
// second. Re-scans of the *same* code within this window are ignored;
// scanning a *different* code always registers immediately.
const SAME_CODE_COOLDOWN_MS = 3000;

const SCANNER_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'QR Forge — QR Code Scanner',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any (runs in any modern browser with a camera)',
  description:
    'A free, browser-based QR code scanner. Scan with your camera or upload an image — nothing is uploaded to a server.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function Scanner() {
  const videoRef = useRef(null);
  const scannerRef = useRef(null);
  const fileInputRef = useRef(null);
  const lastScanRef = useRef({ text: '', time: 0 });

  const [cameraState, setCameraState] = useState('idle'); // idle | starting | active | denied | unsupported | error
  const [result, setResult] = useState(null); // { id, text, scannedAt, classification }
  const [scanHistory, setScanHistory] = useLocalStorage(SCAN_HISTORY_KEY, []);

  const recordScan = useCallback(
    (text) => {
      const classification = classifyScanResult(text);
      const entry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        text,
        scannedAt: new Date().toISOString(),
        classification,
      };
      setResult(entry);
      setScanHistory((prev) => {
        const withoutDupe = prev.filter((s) => s.text !== text);
        return [entry, ...withoutDupe].slice(0, MAX_SCAN_HISTORY);
      });
    },
    [setScanHistory]
  );

  const stopCamera = useCallback(() => {
    scannerRef.current?.stop();
    scannerRef.current?.destroy();
    scannerRef.current = null;
    setCameraState((s) => (s === 'active' || s === 'starting' ? 'idle' : s));
  }, []);

  const startCamera = useCallback(async () => {
    if (!videoRef.current) return;
    setCameraState('starting');

    const hasCamera = await QrScanner.hasCamera().catch(() => false);
    if (!hasCamera) {
      setCameraState('unsupported');
      return;
    }

    try {
      const scanner = new QrScanner(
        videoRef.current,
        (res) => {
          const now = Date.now();
          const last = lastScanRef.current;
          if (res.data === last.text && now - last.time < SAME_CODE_COOLDOWN_MS) {
            return; // same code re-detected within the cooldown — ignore
          }
          lastScanRef.current = { text: res.data, time: now };
          recordScan(res.data);
          toast.success('QR code scanned!');
        },
        {
          preferredCamera: 'environment',
          highlightScanRegion: true,
          highlightCodeOutline: true,
          maxScansPerSecond: 5,
        }
      );
      scannerRef.current = scanner;
      await scanner.start();
      setCameraState('active');
    } catch (err) {
      // getUserMedia rejects with NotAllowedError when the user denies the
      // permission prompt, or SecurityError over an insecure (non-HTTPS,
      // non-localhost) origin — worth distinguishing so the message is useful.
      if (err?.name === 'NotAllowedError') {
        setCameraState('denied');
      } else {
        console.error('QR Forge: camera failed to start', err);
        Sentry.captureException(err);
        setCameraState('error');
      }
    }
  }, [recordScan]);

  // Always release the camera when navigating away from this page.
  useEffect(() => stopCamera, [stopCamera]);

  const handleFileUpload = async (file) => {
    if (!file) return;
    try {
      const res = await QrScanner.scanImage(file, { returnDetailedScanResult: true });
      recordScan(res.data);
      toast.success('QR code found in image!');
    } catch {
      toast.error('No QR code found in that image.');
    }
  };

  const handleCopyAction = async (entry) => {
    const ok = await copyText(entry.text).catch(() => false);
    toast[ok ? 'success' : 'error'](ok ? 'Copied to clipboard' : 'Could not copy — try again.');
  };

  const clearHistory = () => setScanHistory([]);

  return (
    <>
      <SEO
        title="Free QR Code Scanner"
        description="Scan any QR code instantly with your camera, or upload an image — free, and entirely in your browser. No app install, no data ever leaves your device."
        path="/qr-code-scanner"
        structuredData={SCANNER_SCHEMA}
      />

      <section className="section pt-16 pb-10 text-center">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
          QR Code Scanner
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-ink-500 dark:text-ink-400">
          Scan any QR code with your camera, or upload a photo containing one.
          Decoding happens entirely on your device — nothing is uploaded anywhere.
        </p>
      </section>

      <section className="section pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <div className="card p-6 sm:p-8">
              <div className="relative aspect-square sm:aspect-video w-full overflow-hidden rounded-2xl bg-ink-950">
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  muted
                  playsInline
                  aria-label="Live camera feed for QR scanning"
                />

                {cameraState !== 'active' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                    {cameraState === 'denied' ? (
                      <>
                        <HiOutlineExclamationCircle size={32} className="text-amber-400" aria-hidden="true" />
                        <p className="text-sm text-ink-200">
                          Camera access was denied. Allow camera permission for this
                          site in your browser settings, then try again.
                        </p>
                      </>
                    ) : cameraState === 'unsupported' ? (
                      <>
                        <HiOutlineExclamationCircle size={32} className="text-amber-400" aria-hidden="true" />
                        <p className="text-sm text-ink-200">
                          No camera was found on this device. You can still upload
                          an image containing a QR code below.
                        </p>
                      </>
                    ) : cameraState === 'error' ? (
                      <>
                        <HiOutlineExclamationCircle size={32} className="text-amber-400" aria-hidden="true" />
                        <p className="text-sm text-ink-200">
                          Couldn't start the camera. Camera scanning also requires
                          a secure (HTTPS) connection — try uploading an image instead.
                        </p>
                      </>
                    ) : (
                      <>
                        <HiOutlineCamera size={32} className="text-ink-400" aria-hidden="true" />
                        <p className="text-sm text-ink-300">
                          Start your camera to scan a QR code live.
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                {cameraState === 'active' ? (
                  <button type="button" onClick={stopCamera} className="btn-secondary flex-1">
                    Stop camera
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={startCamera}
                    disabled={cameraState === 'starting'}
                    className="btn-primary flex-1"
                  >
                    <HiOutlineCamera size={18} aria-hidden="true" />
                    {cameraState === 'starting' ? 'Starting camera…' : 'Start camera'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-outline flex-1"
                >
                  <HiOutlineUpload size={18} aria-hidden="true" />
                  Upload image
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    handleFileUpload(e.target.files?.[0]);
                    e.target.value = '';
                  }}
                />
              </div>
            </div>

            {result && (
              <div className="card mt-6 p-6 animate-scale-in" role="status" aria-live="polite">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 dark:bg-brand-950/40 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300">
                  {result.classification.type}
                </span>
                <p className="mt-3 break-words text-sm text-ink-800 dark:text-ink-100 font-mono">
                  {result.text}
                </p>
                <div className="mt-4 flex gap-2">
                  {result.classification.action === 'open' ? (
                    <a
                      href={result.classification.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <HiOutlineExternalLink size={16} aria-hidden="true" /> Open
                    </a>
                  ) : (
                    <button type="button" onClick={() => handleCopyAction(result)} className="btn-primary">
                      <HiOutlineClipboardCopy size={16} aria-hidden="true" /> Copy
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6">
              <AdSlot label="Advertisement" minHeight={90} />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold flex items-center gap-2">
                  <HiOutlineQrcode className="text-brand-600 dark:text-brand-400" aria-hidden="true" />
                  Scan history
                </h2>
                {scanHistory.length > 0 && (
                  <button
                    type="button"
                    onClick={clearHistory}
                    className="text-xs font-medium text-ink-400 hover:text-red-500 transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {scanHistory.length === 0 ? (
                <p className="mt-6 text-sm text-ink-400 text-center py-8">
                  Your scanned codes will show up here.
                </p>
              ) : (
                <ul className="mt-4 space-y-2 max-h-96 overflow-y-auto pr-1">
                  {scanHistory.map((entry) => {
                    // Fall back for entries saved by an older version of
                    // this page, before classification was stored inline.
                    const classification = entry.classification || classifyScanResult(entry.text);
                    const itemContent = (
                      <>
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
                          {classification.action === 'open' ? (
                            <HiOutlineExternalLink size={16} aria-hidden="true" />
                          ) : (
                            <HiOutlineClipboardCopy size={16} aria-hidden="true" />
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-ink-800 dark:text-ink-100">
                            {entry.text}
                          </span>
                          <span className="block text-xs text-ink-400">{classification.type}</span>
                        </span>
                      </>
                    );
                    const itemClassName = 'flex flex-1 items-center gap-3 text-left min-w-0';
                    return (
                      <li key={entry.id}>
                        <div className="group flex items-center gap-3 rounded-xl border border-ink-100 dark:border-ink-800 p-2.5 hover:border-brand-300 dark:hover:border-brand-700 transition-colors">
                          {classification.action === 'open' && classification.href ? (
                            <a
                              href={classification.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={itemClassName}
                            >
                              {itemContent}
                            </a>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleCopyAction(entry)}
                              className={itemClassName}
                            >
                              {itemContent}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              setScanHistory((prev) => prev.filter((s) => s.id !== entry.id))
                            }
                            aria-label="Remove from scan history"
                            className="shrink-0 text-ink-300 hover:text-red-500 transition-colors opacity-60 group-hover:opacity-100 focus-visible:opacity-100"
                          >
                            <HiOutlineTrash size={16} aria-hidden="true" />
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
