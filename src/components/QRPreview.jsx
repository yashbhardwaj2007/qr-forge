import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  HiOutlineDownload,
  HiOutlineClipboardCopy,
  HiOutlineShare,
  HiOutlinePrinter,
  HiOutlineDocumentDuplicate,
  HiOutlineQrcode,
  HiHeart,
  HiOutlineHeart,
  HiCheckCircle,
  HiOutlineExclamation,
} from 'react-icons/hi';
import { useQRCode } from '../hooks/useQRCode.js';
import { QRPreviewSkeleton } from './SkeletonLoader.jsx';
import PrintTemplateModal from './PrintTemplateModal.jsx';
import {
  downloadDataUrl,
  downloadBlob,
  canvasToBlob,
  copyText,
  copyCanvasImage,
} from '../utils/downloadUtils.js';

export default function QRPreview({ payload, options, onFavoriteToggle, isFavorite }) {
  const { canvasRef, svgMarkup, isGenerating, error, verification } = useQRCode({ payload, ...options });
  const [busyAction, setBusyAction] = useState('');
  const [printModalOpen, setPrintModalOpen] = useState(false);

  const hasPayload = Boolean(payload);

  const withBusy = async (action, fn) => {
    setBusyAction(action);
    try {
      await fn();
    } catch (err) {
      toast.error(err?.message || 'Something went wrong.');
    } finally {
      setBusyAction('');
    }
  };

  const downloadPng = () =>
    withBusy('png', async () => {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error('QR code not ready yet.');
      downloadDataUrl(canvas.toDataURL('image/png', 1), 'qr-code.png');
      toast.success('PNG downloaded');
    });

  const downloadJpeg = () =>
    withBusy('jpeg', async () => {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error('QR code not ready yet.');
      // Flatten onto a white background since JPEG has no alpha channel.
      const flattened = document.createElement('canvas');
      flattened.width = canvas.width;
      flattened.height = canvas.height;
      const ctx = flattened.getContext('2d');
      ctx.fillStyle = options.bgColor || '#ffffff';
      ctx.fillRect(0, 0, flattened.width, flattened.height);
      ctx.drawImage(canvas, 0, 0);
      const blob = await canvasToBlob(flattened, 'image/jpeg', 0.95);
      downloadBlob(blob, 'qr-code.jpg');
      toast.success('JPEG downloaded');
    });

  const downloadSvg = () =>
    withBusy('svg', async () => {
      if (!svgMarkup) throw new Error('QR code not ready yet.');
      const blob = new Blob([svgMarkup], { type: 'image/svg+xml' });
      downloadBlob(blob, 'qr-code.svg');
      toast.success('SVG downloaded');
    });

  const handleCopyImage = () =>
    withBusy('copy-image', async () => {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error('QR code not ready yet.');
      await copyCanvasImage(canvas);
      toast.success('QR image copied to clipboard');
    });

  const handleCopyData = () =>
    withBusy('copy-data', async () => {
      if (!payload) throw new Error('Nothing to copy yet.');
      await copyText(payload);
      toast.success('Encoded data copied');
    });

  const handleShare = () =>
    withBusy('share', async () => {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error('QR code not ready yet.');
      const blob = await canvasToBlob(canvas, 'image/png');
      const file = new File([blob], 'qr-code.png', { type: 'image/png' });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'My QR Code' });
      } else {
        await copyText(payload);
        toast.success('Sharing not supported — link copied instead');
      }
    });

  return (
    <div className="card p-6 sm:p-8 flex flex-col items-center gap-6 lg:sticky lg:top-24">
      <div className="flex w-full items-center justify-between">
        <h2 className="font-display text-lg font-bold flex items-center gap-2">
          <HiOutlineQrcode className="text-brand-600 dark:text-brand-400" aria-hidden="true" />
          Live Preview
        </h2>
        {hasPayload && (
          <button
            type="button"
            onClick={onFavoriteToggle}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="btn-icon"
          >
            {isFavorite ? (
              <HiHeart size={18} className="text-red-500" aria-hidden="true" />
            ) : (
              <HiOutlineHeart size={18} aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      {!hasPayload ? (
        <div className="flex h-64 w-64 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-ink-200 dark:border-ink-700 text-center px-4">
          <HiOutlineQrcode size={40} className="text-ink-300 dark:text-ink-600" aria-hidden="true" />
          <p className="text-sm text-ink-400">
            Fill in the form to see your QR code appear here instantly.
          </p>
        </div>
      ) : isGenerating && !canvasRef.current ? (
        <QRPreviewSkeleton />
      ) : (
        <div className="relative animate-scale-in rounded-2xl border border-ink-100 dark:border-ink-800 p-4 bg-white">
          <canvas ref={canvasRef} className="rounded-lg" role="img" aria-label="Generated QR code preview" />
          {isGenerating && (
            <div
              className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/60 backdrop-blur-sm"
              role="status"
              aria-live="polite"
            >
              <span className="sr-only">Updating QR code…</span>
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" aria-hidden="true" />
            </div>
          )}
        </div>
      )}

      {hasPayload && verification && (
        <div
          role="status"
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium animate-fade-in ${
            verification === 'verified'
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
              : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
          }`}
        >
          {verification === 'verified' ? (
            <>
              <HiCheckCircle size={15} aria-hidden="true" /> Verified scannable
            </>
          ) : (
            <>
              <HiOutlineExclamation size={15} aria-hidden="true" /> May not scan clearly — try more contrast or a larger size
            </>
          )}
        </div>
      )}

      {/* Hidden canvas fallback ensures ref exists even with no payload */}
      {!hasPayload && <canvas ref={canvasRef} className="hidden" />}

      {error && <p className="text-sm text-red-500">{error}</p>}

      {hasPayload && (
        <>
          <div className="grid w-full grid-cols-3 gap-2">
            <button
              type="button"
              onClick={downloadPng}
              disabled={busyAction === 'png'}
              className="btn-secondary text-xs sm:text-sm"
            >
              <HiOutlineDownload size={16} aria-hidden="true" /> PNG
            </button>
            <button
              type="button"
              onClick={downloadSvg}
              disabled={busyAction === 'svg'}
              className="btn-secondary text-xs sm:text-sm"
            >
              <HiOutlineDownload size={16} aria-hidden="true" /> SVG
            </button>
            <button
              type="button"
              onClick={downloadJpeg}
              disabled={busyAction === 'jpeg'}
              className="btn-secondary text-xs sm:text-sm"
            >
              <HiOutlineDownload size={16} aria-hidden="true" /> JPEG
            </button>
          </div>

          <div className="grid w-full grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleCopyImage}
              disabled={busyAction === 'copy-image'}
              className="btn-outline text-xs sm:text-sm"
            >
              <HiOutlineClipboardCopy size={16} aria-hidden="true" /> Copy image
            </button>
            <button
              type="button"
              onClick={handleCopyData}
              disabled={busyAction === 'copy-data'}
              className="btn-outline text-xs sm:text-sm"
            >
              <HiOutlineDocumentDuplicate size={16} aria-hidden="true" /> Copy data
            </button>
          </div>

          <div className="grid w-full grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleShare}
              disabled={busyAction === 'share'}
              className="btn-outline text-xs sm:text-sm"
            >
              <HiOutlineShare size={16} aria-hidden="true" /> Share
            </button>
            <button
              type="button"
              onClick={() => setPrintModalOpen(true)}
              className="btn-outline text-xs sm:text-sm"
            >
              <HiOutlinePrinter size={16} aria-hidden="true" /> Print
            </button>
          </div>
        </>
      )}

      {printModalOpen && (
        <PrintTemplateModal canvasRef={canvasRef} onClose={() => setPrintModalOpen(false)} />
      )}
    </div>
  );
}
