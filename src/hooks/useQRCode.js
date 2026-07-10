import { useEffect, useRef, useState, useCallback } from 'react';
import QRCode from 'qrcode';
import { getSharedQrEngine, QrScanner } from '../lib/qrEngine.js';

const DEBOUNCE_MS = 250;
// Verification runs after generation settles, on a longer delay than the
// generation debounce itself — decoding costs real time (and, on browsers
// without native BarcodeDetector support, a one-time worker download), so
// there's no reason to re-verify on every intermediate render while the
// user is still actively typing.
const VERIFY_DEBOUNCE_MS = 600;

/**
 * The `qrcode` library renders each module (the little black/white squares)
 * by scaling a fixed module grid to fit an arbitrary pixel width. When that
 * width isn't an exact multiple of the module count, modules land on
 * fractional pixel boundaries, which can blur edges or leave hairline gaps
 * between modules — bad for both crispness and real-world scannability.
 * This computes the QR's module count up front and rounds the requested
 * size to the nearest exact multiple, so every module is a clean integer
 * number of pixels wide.
 */
function getCrispWidth(payload, errorCorrectionLevel, margin, requestedSize) {
  try {
    const { modules } = QRCode.create(payload, { errorCorrectionLevel });
    const totalModules = modules.size + margin * 2;
    const scale = Math.max(1, Math.round(requestedSize / totalModules));
    return scale * totalModules;
  } catch {
    return requestedSize;
  }
}

/**
 * Generates a QR code onto a <canvas> and keeps an equivalent SVG markup
 * string in sync, reacting to payload/options changes with a small debounce
 * so rapid typing doesn't thrash the encoder.
 */
export function useQRCode({
  payload,
  size = 280,
  fgColor = '#0d0d11',
  bgColor = '#ffffff',
  errorCorrectionLevel = 'M',
  margin = 2,
  logoDataUrl = null,
  logoSizeRatio = 0.22,
}) {
  const canvasRef = useRef(null);
  const [svgMarkup, setSvgMarkup] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [verification, setVerification] = useState(null); // 'verified' | 'unverified' | null (checking/unknown)
  const debounceRef = useRef(null);
  const verifyDebounceRef = useRef(null);
  const requestIdRef = useRef(0);

  const drawLogo = useCallback(
    (canvas) => {
      return new Promise((resolve) => {
        if (!logoDataUrl) return resolve();
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
          const logoSize = canvas.width * logoSizeRatio;
          const x = (canvas.width - logoSize) / 2;
          const y = (canvas.height - logoSize) / 2;
          const pad = logoSize * 0.14;

          // White rounded backdrop so the logo stays scannable.
          ctx.save();
          ctx.fillStyle = '#ffffff';
          const r = 12;
          const bx = x - pad;
          const by = y - pad;
          const bw = logoSize + pad * 2;
          const bh = logoSize + pad * 2;
          ctx.beginPath();
          ctx.moveTo(bx + r, by);
          ctx.arcTo(bx + bw, by, bx + bw, by + bh, r);
          ctx.arcTo(bx + bw, by + bh, bx, by + bh, r);
          ctx.arcTo(bx, by + bh, bx, by, r);
          ctx.arcTo(bx, by, bx + bw, by, r);
          ctx.closePath();
          ctx.fill();
          ctx.drawImage(img, x, y, logoSize, logoSize);
          ctx.restore();
          resolve();
        };
        img.onerror = () => resolve();
        img.src = logoDataUrl;
      });
    },
    [logoDataUrl, logoSizeRatio]
  );

  const verifyScannability = useCallback(
    async (requestId, expectedPayload) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      try {
        const engine = await getSharedQrEngine();
        const res = await QrScanner.scanImage(canvas, {
          qrEngine: engine,
          returnDetailedScanResult: true,
        });
        if (requestId !== requestIdRef.current) return; // stale
        setVerification(res.data === expectedPayload ? 'verified' : 'unverified');
      } catch {
        if (requestId !== requestIdRef.current) return;
        setVerification('unverified');
      }
    },
    []
  );

  const generate = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    clearTimeout(verifyDebounceRef.current);

    if (!payload) {
      setSvgMarkup('');
      setVerification(null);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    setIsGenerating(true);
    setError('');
    setVerification(null);

    try {
      const effectiveErrorCorrection = logoDataUrl ? 'H' : errorCorrectionLevel;
      const crispWidth = getCrispWidth(payload, effectiveErrorCorrection, margin, size);
      const options = {
        errorCorrectionLevel: effectiveErrorCorrection,
        margin,
        width: crispWidth,
        color: { dark: fgColor, light: bgColor },
      };

      const canvas = canvasRef.current;
      if (canvas) {
        await QRCode.toCanvas(canvas, payload, options);
        await drawLogo(canvas);
      }

      let svg = await QRCode.toString(payload, { ...options, type: 'svg' });
      if (logoDataUrl) {
        const logoSize = crispWidth * logoSizeRatio;
        const pad = logoSize * 0.14;
        const x = (crispWidth - logoSize) / 2;
        const y = (crispWidth - logoSize) / 2;
        const overlay = `<rect x="${x - pad}" y="${y - pad}" width="${
          logoSize + pad * 2
        }" height="${logoSize + pad * 2}" rx="12" fill="#ffffff"/><image href="${logoDataUrl}" x="${x}" y="${y}" width="${logoSize}" height="${logoSize}" preserveAspectRatio="xMidYMid slice"/>`;
        svg = svg.replace('</svg>', `${overlay}</svg>`);
      }

      // If a newer generation started while this one was in flight, drop
      // this stale result instead of overwriting the fresher one.
      if (requestId !== requestIdRef.current) return;
      setSvgMarkup(svg);

      verifyDebounceRef.current = setTimeout(
        () => verifyScannability(requestId, payload),
        VERIFY_DEBOUNCE_MS
      );
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      setError(err?.message || 'Failed to generate QR code.');
    } finally {
      if (requestId === requestIdRef.current) setIsGenerating(false);
    }
  }, [payload, size, fgColor, bgColor, errorCorrectionLevel, margin, logoDataUrl, logoSizeRatio, drawLogo, verifyScannability]);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(generate, DEBOUNCE_MS);
    return () => {
      clearTimeout(debounceRef.current);
      clearTimeout(verifyDebounceRef.current);
    };
  }, [generate]);

  return { canvasRef, svgMarkup, isGenerating, error, verification, regenerate: generate };
}
