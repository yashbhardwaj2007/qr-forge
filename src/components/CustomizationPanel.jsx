import { useRef, useState, useCallback, useEffect, memo } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineRefresh, HiOutlineUpload, HiOutlineTrash } from 'react-icons/hi';

const PRESET_COLORS = ['#0d0d11', '#7c3aed', '#0ea5e9', '#059669', '#dc2626', '#ea580c'];
const HEX_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

/**
 * A manually-typed hex color field. Keeps its own draft value so an
 * in-progress, invalid hex (e.g. "#7c") doesn't get pushed up into the
 * native <input type="color"> (which requires a full valid hex and will
 * silently coerce to black) or into the live QR canvas. Valid values
 * commit immediately; invalid ones revert to the last valid value on blur.
 */
function HexField({ id, value, onCommit }) {
  const [draft, setDraft] = useState(value);

  useEffect(() => setDraft(value), [value]);

  const isValid = HEX_PATTERN.test(draft);

  const commitIfValid = (raw) => {
    if (HEX_PATTERN.test(raw)) onCommit(raw);
  };

  return (
    <input
      id={id}
      type="text"
      value={draft}
      onChange={(e) => {
        setDraft(e.target.value);
        commitIfValid(e.target.value);
      }}
      onBlur={() => {
        if (!isValid) setDraft(value); // revert to last known-good color
      }}
      aria-invalid={!isValid}
      spellCheck={false}
      className={`input font-mono text-xs ${!isValid ? 'ring-2 ring-red-400 focus:ring-red-500' : ''}`}
    />
  );
}

function CustomizationPanel({ options, onChange, onReset }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleLogoFile = useCallback(
    (file) => {
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file.');
        return;
      }
      if (file.size > 1024 * 1024) {
        toast.error('Logo must be smaller than 1MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        onChange({ logoDataUrl: reader.result });
        toast.success('Logo added to QR code');
      };
      reader.readAsDataURL(file);
    },
    [onChange]
  );

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    handleLogoFile(file);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="qr-size" className="label mb-0">
            Size
          </label>
          <span className="text-xs font-medium text-ink-500">{options.size}px</span>
        </div>
        <input
          id="qr-size"
          type="range"
          min={128}
          max={1024}
          step={8}
          value={options.size}
          onChange={(e) => onChange({ size: Number(e.target.value) })}
          aria-valuetext={`${options.size} pixels`}
          className="mt-2 w-full accent-brand-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="fg-color" className="label">
            Foreground
          </label>
          <div className="flex items-center gap-2">
            <input
              id="fg-color"
              type="color"
              value={options.fgColor}
              onChange={(e) => onChange({ fgColor: e.target.value })}
              className="h-10 w-10 shrink-0 cursor-pointer rounded-lg border border-ink-200 dark:border-ink-700 bg-transparent p-0.5"
              aria-label="Foreground color"
            />
            <HexField
              id="fg-color-hex"
              value={options.fgColor}
              onCommit={(fgColor) => onChange({ fgColor })}
            />
          </div>
        </div>
        <div>
          <label htmlFor="bg-color" className="label">
            Background
          </label>
          <div className="flex items-center gap-2">
            <input
              id="bg-color"
              type="color"
              value={options.bgColor}
              onChange={(e) => onChange({ bgColor: e.target.value })}
              className="h-10 w-10 shrink-0 cursor-pointer rounded-lg border border-ink-200 dark:border-ink-700 bg-transparent p-0.5"
              aria-label="Background color"
            />
            <HexField
              id="bg-color-hex"
              value={options.bgColor}
              onCommit={(bgColor) => onChange({ bgColor })}
            />
          </div>
        </div>
      </div>

      <div>
        <span className="label">Quick colors</span>
        <div className="flex flex-wrap gap-2">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onChange({ fgColor: color })}
              aria-label={`Set foreground color to ${color}`}
              className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 ${
                options.fgColor === color ? 'border-brand-500' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="error-correction" className="label">
          Error correction
        </label>
        <select
          id="error-correction"
          value={options.errorCorrectionLevel}
          onChange={(e) => onChange({ errorCorrectionLevel: e.target.value })}
          className="input"
        >
          <option value="L">Low (7%)</option>
          <option value="M">Medium (15%)</option>
          <option value="Q">Quartile (25%)</option>
          <option value="H">High (30%) — recommended with a logo</option>
        </select>
      </div>

      <div>
        <span className="label">Center logo</span>
        {options.logoDataUrl ? (
          <div className="flex items-center gap-3 rounded-xl border border-ink-200 dark:border-ink-700 p-3">
            <img
              src={options.logoDataUrl}
              alt="Uploaded logo preview"
              className="h-12 w-12 rounded-lg object-cover"
            />
            <div className="flex-1 text-sm text-ink-500">Logo applied</div>
            <button
              type="button"
              onClick={() => onChange({ logoDataUrl: null })}
              className="btn-icon"
              aria-label="Remove logo"
            >
              <HiOutlineTrash size={16} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
            aria-label="Upload a logo image, click or drag and drop"
            className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
              dragActive
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/30'
                : 'border-ink-200 dark:border-ink-700 hover:border-brand-400'
            }`}
          >
            <HiOutlineUpload size={22} className="text-ink-400" aria-hidden="true" />
            <p className="text-sm text-ink-500">
              <span className="font-medium text-brand-600 dark:text-brand-400">
                Click to upload
              </span>{' '}
              or drag and drop
            </p>
            <p className="text-xs text-ink-400">PNG, JPG or SVG — under 1MB</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                handleLogoFile(e.target.files?.[0]);
                e.target.value = '';
              }}
            />
          </div>
        )}
      </div>

      <button type="button" onClick={onReset} className="btn-outline w-full">
        <HiOutlineRefresh size={16} aria-hidden="true" />
        Reset settings
      </button>
    </div>
  );
}

export default memo(CustomizationPanel);
