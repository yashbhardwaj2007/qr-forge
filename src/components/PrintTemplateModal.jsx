import { useState, useEffect, useRef } from 'react';
import { HiX, HiOutlinePrinter } from 'react-icons/hi';
import { PRINT_TEMPLATE_OPTIONS, openPrintWindow } from '../utils/printTemplates.js';

/**
 * Lets the user pick a print layout (plain / business card / table tent /
 * poster) and optionally add a headline + subheadline before printing.
 * Reuses whatever resolution the live QR canvas is currently rendered at —
 * bumping the "Size" slider in Customize before printing gives a
 * higher-resolution source image for larger templates like the poster.
 */
export default function PrintTemplateModal({ canvasRef, onClose }) {
  const [template, setTemplate] = useState('plain');
  const [headline, setHeadline] = useState('');
  const [subheadline, setSubheadline] = useState('');
  const dialogRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKeyDown);
    dialogRef.current?.querySelector('button, input')?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const handlePrint = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      openPrintWindow(template, canvas.toDataURL('image/png', 1), headline.trim(), subheadline.trim());
      onClose();
    } catch (err) {
      // openPrintWindow throws if pop-ups are blocked — surface it inline
      // rather than silently failing.
      // eslint-disable-next-line no-alert
      alert(err.message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/60 backdrop-blur-sm p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="print-modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div ref={dialogRef} className="card w-full max-w-md p-6 sm:p-8 animate-scale-in">
        <div className="flex items-center justify-between">
          <h2 id="print-modal-title" className="font-display text-lg font-bold">
            Choose a print layout
          </h2>
          <button type="button" onClick={onClose} aria-label="Close" className="btn-icon">
            <HiX size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {PRINT_TEMPLATE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setTemplate(opt.id)}
              aria-pressed={template === opt.id}
              className={`rounded-xl border px-3 py-3 text-sm font-medium text-left transition-colors ${
                template === opt.id
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300'
                  : 'border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-300 hover:border-brand-400'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {template !== 'plain' && (
          <div className="mt-5 space-y-3">
            <div>
              <label htmlFor="print-headline" className="label">
                Headline <span className="text-ink-400 font-normal">(optional)</span>
              </label>
              <input
                id="print-headline"
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. Joe's Coffee"
                className="input"
                maxLength={60}
              />
            </div>
            <div>
              <label htmlFor="print-subheadline" className="label">
                Subheadline <span className="text-ink-400 font-normal">(optional)</span>
              </label>
              <input
                id="print-subheadline"
                type="text"
                value={subheadline}
                onChange={(e) => setSubheadline(e.target.value)}
                placeholder="e.g. Scan to see today's menu"
                className="input"
                maxLength={80}
              />
            </div>
          </div>
        )}

        <p className="mt-4 text-xs text-ink-400">
          Tip: for crisper results on the poster or table tent layouts, increase
          the Size slider in Customize before printing.
        </p>

        <button type="button" onClick={handlePrint} className="btn-primary w-full mt-5">
          <HiOutlinePrinter size={16} aria-hidden="true" /> Print
        </button>
      </div>
    </div>
  );
}
