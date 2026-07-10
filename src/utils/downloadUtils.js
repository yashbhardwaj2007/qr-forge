export function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  downloadDataUrl(url, filename);
  // Some browsers kick off the download asynchronously after click(), so
  // revoking the object URL on the same tick can abort it. A short delay
  // is enough for the download to have started while still freeing memory.
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export async function canvasToBlob(canvas, type = 'image/png', quality = 1) {
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, type, quality));
  if (!blob) {
    throw new Error('Could not generate an image from the QR code. Please try again.');
  }
  return blob;
}

/** Copies raw text (e.g. the encoded QR payload) to the clipboard. */
export async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  // Fallback for older/insecure contexts.
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(textarea);
  return ok;
}

/** Copies a canvas's contents to the clipboard as an image. */
export async function copyCanvasImage(canvas) {
  if (!navigator.clipboard || !window.ClipboardItem) {
    throw new Error('Clipboard image copy is not supported in this browser.');
  }
  const blob = await canvasToBlob(canvas, 'image/png');
  await navigator.clipboard.write([new window.ClipboardItem({ 'image/png': blob })]);
  return true;
}
