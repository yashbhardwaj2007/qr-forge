/**
 * Builds a standalone, print-ready HTML document for a given template.
 * Each template sets an exact @page size in physical units (inches) so it
 * prints at true size regardless of the browser's default print scaling.
 */
function escapeHtml(str = '') {
  return str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const SHARED_STYLES = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Helvetica Neue', Arial, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  img { display: block; }
`;

function plainTemplate(dataUrl, headline, subheadline) {
  return `
    <style>
      ${SHARED_STYLES}
      @page { margin: 0.75in; }
      body { display: flex; align-items: center; justify-content: center; min-height: 100vh; }
      .wrap { text-align: center; }
      img { width: 3.5in; height: 3.5in; margin: 0 auto; }
      h1 { font-size: 20pt; margin-top: 0.3in; }
      p { font-size: 12pt; color: #444; margin-top: 0.1in; }
    </style>
    <div class="wrap">
      <img src="${dataUrl}" alt="QR code" />
      ${headline ? `<h1>${escapeHtml(headline)}</h1>` : ''}
      ${subheadline ? `<p>${escapeHtml(subheadline)}</p>` : ''}
    </div>
  `;
}

function businessCardTemplate(dataUrl, headline, subheadline) {
  return `
    <style>
      ${SHARED_STYLES}
      @page { size: 3.5in 2in; margin: 0; }
      body { width: 3.5in; height: 2in; display: flex; align-items: center; padding: 0.2in; gap: 0.25in; }
      img { width: 1.5in; height: 1.5in; flex-shrink: 0; }
      .text { min-width: 0; }
      h1 { font-size: 13pt; line-height: 1.25; }
      p { font-size: 9pt; color: #555; margin-top: 0.08in; line-height: 1.4; }
    </style>
    <img src="${dataUrl}" alt="QR code" />
    <div class="text">
      ${headline ? `<h1>${escapeHtml(headline)}</h1>` : ''}
      ${subheadline ? `<p>${escapeHtml(subheadline)}</p>` : ''}
    </div>
  `;
}

function tableTentTemplate(dataUrl, headline, subheadline) {
  // Two 4in x 6in panels stacked in one 4in x 12in sheet. The bottom panel
  // is rotated 180° so that once the sheet is folded in half (at the
  // midline) and stood up, both faces of the tent read right-side up.
  const panel = (rotate) => `
    <div class="panel" style="${rotate ? 'transform: rotate(180deg);' : ''}">
      <img src="${dataUrl}" alt="QR code" />
      ${headline ? `<h1>${escapeHtml(headline)}</h1>` : ''}
      ${subheadline ? `<p>${escapeHtml(subheadline)}</p>` : ''}
    </div>
  `;
  return `
    <style>
      ${SHARED_STYLES}
      @page { size: 4in 12in; margin: 0; }
      body { width: 4in; height: 12in; }
      .panel {
        width: 4in; height: 6in;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        text-align: center; padding: 0.4in;
      }
      .fold-line { border-top: 1px dashed #bbb; width: 100%; }
      img { width: 2.2in; height: 2.2in; margin: 0 auto; }
      h1 { font-size: 16pt; margin-top: 0.25in; }
      p { font-size: 10pt; color: #555; margin-top: 0.1in; }
    </style>
    ${panel(false)}
    <div class="fold-line"></div>
    ${panel(true)}
  `;
}

function posterTemplate(dataUrl, headline, subheadline) {
  return `
    <style>
      ${SHARED_STYLES}
      @page { size: letter portrait; margin: 0.5in; }
      body { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; text-align: center; }
      img { width: 5in; height: 5in; margin: 0 auto; }
      h1 { font-size: 34pt; margin-top: 0.4in; }
      p { font-size: 16pt; color: #444; margin-top: 0.15in; }
    </style>
    <img src="${dataUrl}" alt="QR code" />
    ${headline ? `<h1>${escapeHtml(headline)}</h1>` : ''}
    ${subheadline ? `<p>${escapeHtml(subheadline)}</p>` : ''}
  `;
}

const TEMPLATES = {
  plain: { label: 'Plain', build: plainTemplate },
  'business-card': { label: 'Business Card (3.5×2 in)', build: businessCardTemplate },
  'table-tent': { label: 'Table Tent (fold card)', build: tableTentTemplate },
  poster: { label: 'Poster (Letter)', build: posterTemplate },
};

export const PRINT_TEMPLATE_OPTIONS = Object.entries(TEMPLATES).map(([id, { label }]) => ({
  id,
  label,
}));

/** Opens a new window with the chosen template, ready to print. */
export function openPrintWindow(templateId, dataUrl, headline, subheadline) {
  const template = TEMPLATES[templateId] || TEMPLATES.plain;
  const printWindow = window.open('', '_blank', 'width=600,height=700');
  if (!printWindow) {
    throw new Error('Please allow pop-ups to print.');
  }
  const bodyHtml = template.build(dataUrl, headline, subheadline);
  printWindow.document.write(`
    <!doctype html>
    <html>
      <head><title>Print QR Code — ${escapeHtml(template.label)}</title></head>
      <body>${bodyHtml}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
  };
}
