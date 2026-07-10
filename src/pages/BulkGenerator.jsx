import { useState, useRef, useCallback } from 'react';
import Papa from 'papaparse';
import JSZip from 'jszip';
import QRCode from 'qrcode';
import toast from 'react-hot-toast';
import {
  HiOutlineUpload,
  HiOutlineDownload,
  HiOutlineDocumentDownload,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';
import SEO from '../components/SEO.jsx';
import QRTypeSelector, { QR_TYPES } from '../components/QRTypeSelector.jsx';
import { buildQrPayload } from '../utils/qrDataFormatters.js';
import { downloadBlob } from '../utils/downloadUtils.js';
import { BULK_FIELD_CONFIG, buildExampleCsv } from '../data/qrTypeFields.js';

const MAX_ROWS = 500;

function sanitizeFilename(name, index) {
  const base = (name || '').trim().replace(/[^\w\- ]/g, '').trim();
  return base ? base.replace(/\s+/g, '-').toLowerCase() : `qr-${index + 1}`;
}

export default function BulkGenerator() {
  const [type, setType] = useState('url');
  const [rows, setRows] = useState([]);
  const [fileName, setFileName] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const config = BULK_FIELD_CONFIG[type];

  const processRows = useCallback(
    (parsedRows) => {
      const withValidation = parsedRows.slice(0, MAX_ROWS).map((row, i) => {
        const payload = buildQrPayload(type, row);
        return {
          index: i,
          name: row.name || `Row ${i + 1}`,
          data: row,
          payload,
          valid: Boolean(payload),
        };
      });
      setRows(withValidation);
    },
    [type]
  );

  const handleFile = (file) => {
    if (!file) return;
    setFileName(file.name);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      complete: (results) => {
        if (!results.data.length) {
          toast.error('That CSV appears to be empty.');
          return;
        }
        processRows(results.data);
        toast.success(`Loaded ${Math.min(results.data.length, MAX_ROWS)} rows`);
      },
      error: () => toast.error('Could not read that file as CSV.'),
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const downloadExample = () => {
    const csv = buildExampleCsv(type);
    downloadBlob(new Blob([csv], { type: 'text/csv' }), `qr-forge-${type}-example.csv`);
  };

  const validRows = rows.filter((r) => r.valid);

  const handleGenerateZip = async () => {
    if (!validRows.length) return;
    setGenerating(true);
    setProgress(0);

    try {
      const zip = new JSZip();
      const usedNames = new Set();

      for (let i = 0; i < validRows.length; i += 1) {
        const row = validRows[i];
        const canvas = document.createElement('canvas');
        // eslint-disable-next-line no-await-in-loop
        await QRCode.toCanvas(canvas, row.payload, {
          width: 512,
          margin: 2,
          errorCorrectionLevel: 'M',
        });

        let filename = sanitizeFilename(row.name, row.index);
        let suffix = 1;
        while (usedNames.has(filename)) {
          filename = `${sanitizeFilename(row.name, row.index)}-${suffix}`;
          suffix += 1;
        }
        usedNames.add(filename);

        const dataUrl = canvas.toDataURL('image/png');
        const base64 = dataUrl.split(',')[1];
        zip.file(`${filename}.png`, base64, { base64: true });

        setProgress(Math.round(((i + 1) / validRows.length) * 100));
      }

      const blob = await zip.generateAsync({ type: 'blob' });
      downloadBlob(blob, `qr-forge-bulk-${type}.zip`);
      toast.success(`Generated ${validRows.length} QR codes`);
    } catch {
      toast.error('Something went wrong generating the ZIP. Please try again.');
    } finally {
      setGenerating(false);
      setProgress(0);
    }
  };

  return (
    <>
      <SEO
        title="Bulk QR Code Generator"
        description="Generate hundreds of QR codes at once from a CSV file — free, and entirely in your browser. Upload a spreadsheet, download a ZIP of ready-to-use QR codes."
        path="/bulk-qr-code-generator"
      />

      <section className="section pt-16 pb-10 text-center">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
          Bulk QR Code Generator
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-ink-500 dark:text-ink-400">
          Upload a CSV file and generate hundreds of QR codes at once — download
          them all as a single ZIP. Everything runs in your browser; your file
          is never uploaded anywhere.
        </p>
      </section>

      <section className="section pb-20">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="card p-6">
            <h2 className="font-display font-bold mb-4">1. Choose a QR type</h2>
            <QRTypeSelector active={type} onChange={(t) => { setType(t); setRows([]); }} />
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold">2. Upload your CSV</h2>
              <button
                type="button"
                onClick={downloadExample}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline"
              >
                <HiOutlineDocumentDownload size={14} aria-hidden="true" />
                Download example CSV
              </button>
            </div>

            <p className="text-xs text-ink-400 mb-3">
              Expected columns for {QR_TYPES.find((t) => t.id === type)?.label}:{' '}
              <code className="font-mono">{config.columns.join(', ')}</code>
              {config.required.length > 0 && (
                <> — required: <code className="font-mono">{config.required.join(', ')}</code></>
              )}
            </p>

            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
              aria-label="Upload a CSV file, click or drag and drop"
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
                dragActive
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/30'
                  : 'border-ink-200 dark:border-ink-700 hover:border-brand-400'
              }`}
            >
              <HiOutlineUpload size={24} className="text-ink-400" aria-hidden="true" />
              <p className="text-sm text-ink-500">
                <span className="font-medium text-brand-600 dark:text-brand-400">
                  Click to upload
                </span>{' '}
                or drag and drop a .csv file
              </p>
              {fileName && <p className="text-xs text-ink-400">{fileName}</p>}
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </div>
          </div>

          {rows.length > 0 && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold">3. Review &amp; generate</h2>
                <span className="text-xs text-ink-400">
                  {validRows.length} of {rows.length} rows valid
                  {rows.length >= MAX_ROWS ? ` (capped at ${MAX_ROWS})` : ''}
                </span>
              </div>

              <ul className="max-h-64 overflow-y-auto space-y-1.5 pr-1 mb-5">
                {rows.slice(0, 50).map((row) => (
                  <li
                    key={row.index}
                    className="flex items-center gap-2 rounded-lg border border-ink-100 dark:border-ink-800 px-3 py-2 text-sm"
                  >
                    {row.valid ? (
                      <HiOutlineCheckCircle size={16} className="text-emerald-500 shrink-0" aria-hidden="true" />
                    ) : (
                      <HiOutlineExclamationCircle size={16} className="text-amber-500 shrink-0" aria-hidden="true" />
                    )}
                    <span className="truncate text-ink-700 dark:text-ink-300">{row.name}</span>
                    {!row.valid && (
                      <span className="ml-auto shrink-0 text-xs text-amber-600 dark:text-amber-400">
                        missing required field
                      </span>
                    )}
                  </li>
                ))}
                {rows.length > 50 && (
                  <li className="text-center text-xs text-ink-400 py-1">
                    …and {rows.length - 50} more
                  </li>
                )}
              </ul>

              <button
                type="button"
                onClick={handleGenerateZip}
                disabled={!validRows.length || generating}
                className="btn-primary w-full"
              >
                <HiOutlineDownload size={16} aria-hidden="true" />
                {generating
                  ? `Generating… ${progress}%`
                  : `Generate ZIP (${validRows.length} QR codes)`}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
