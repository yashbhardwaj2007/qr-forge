import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import QRCode from 'qrcode';
import { HiX, HiOutlineClipboardCopy, HiOutlineExternalLink, HiOutlineHeart } from 'react-icons/hi';
import { copyText } from '../utils/downloadUtils.js';

// Replace with your own UPI ID (find it in any UPI app — Google Pay, PhonePe,
// Paytm, BHIM — under "My QR Code" or "Bank accounts"; it looks like
// yourname@oksbi, yourname@ybl, yourname@paytm, etc.) and your display name.
// No third-party platform, no signup, no PayPal, and no fees — payments go
// directly to your bank account.
const UPI_ID = 'yourname@upi';
const UPI_PAYEE_NAME = 'QR Forge';

function buildUpiLink() {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: UPI_PAYEE_NAME,
    cu: 'INR',
  });
  return `upi://pay?${params.toString()}`;
}

export default function SupportModal({ onClose }) {
  const dialogRef = useRef(null);
  const canvasRef = useRef(null);
  const upiLink = buildUpiLink();

  // A simple one-shot render — deliberately not using the full useQRCode
  // hook here, since its debounce/SVG/self-verification machinery would
  // pull in the scanner engine chunk just to open a footer modal.
  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, upiLink, {
        width: 200,
        margin: 2,
        color: { dark: '#0d0d11', light: '#ffffff' },
      }).catch(() => {});
    }
  }, [upiLink]);

  useEffect(() => {
    const onKeyDown = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKeyDown);
    dialogRef.current?.querySelector('button')?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const handleCopy = async () => {
    const ok = await copyText(UPI_ID).catch(() => false);
    toast[ok ? 'success' : 'error'](ok ? 'UPI ID copied' : 'Could not copy — try again.');
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/60 backdrop-blur-sm p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div ref={dialogRef} className="card w-full max-w-sm p-6 sm:p-8 text-center animate-scale-in">
        <div className="flex items-center justify-between">
          <h2 id="support-modal-title" className="font-display text-lg font-bold flex items-center gap-2">
            <HiOutlineHeart className="text-red-500" aria-hidden="true" /> Support this project
          </h2>
          <button type="button" onClick={onClose} aria-label="Close" className="btn-icon">
            <HiX size={18} aria-hidden="true" />
          </button>
        </div>

        <p className="mt-3 text-sm text-ink-500 dark:text-ink-400">
          If QR Forge saved you time, you can send a UPI payment directly —
          no platform, no fees, no account needed on your end.
        </p>

        <div className="mt-5 flex justify-center rounded-2xl border border-ink-100 dark:border-ink-800 bg-white p-4">
          <canvas ref={canvasRef} />
        </div>
        <p className="mt-2 text-xs text-ink-400">Scan with any UPI app to pay</p>

        <div className="mt-5 flex items-center gap-2 rounded-xl border border-ink-200 dark:border-ink-700 px-4 py-2.5">
          <span className="flex-1 truncate text-left font-mono text-sm text-ink-700 dark:text-ink-300">
            {UPI_ID}
          </span>
          <button type="button" onClick={handleCopy} aria-label="Copy UPI ID" className="btn-icon shrink-0">
            <HiOutlineClipboardCopy size={16} aria-hidden="true" />
          </button>
        </div>

        <a href={upiLink} className="btn-primary w-full mt-4">
          <HiOutlineExternalLink size={16} aria-hidden="true" /> Open in UPI app
        </a>
        <p className="mt-2 text-xs text-ink-400">
          "Open in UPI app" only works on a phone with GPay, PhonePe, Paytm, or similar installed.
        </p>
      </div>
    </div>
  );
}
