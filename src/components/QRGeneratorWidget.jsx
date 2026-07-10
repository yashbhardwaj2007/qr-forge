import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import QRTypeSelector, { QR_TYPES } from './QRTypeSelector.jsx';
import { FORM_COMPONENTS } from './forms/index.js';
import CustomizationPanel from './CustomizationPanel.jsx';
import QRPreview from './QRPreview.jsx';
import HistoryPanel from './HistoryPanel.jsx';
import { buildQrPayload } from '../utils/qrDataFormatters.js';
import { useQRHistory } from '../context/QRHistoryContext.jsx';

const DEFAULT_OPTIONS = {
  size: 320,
  fgColor: '#0d0d11',
  bgColor: '#ffffff',
  errorCorrectionLevel: 'M',
  logoDataUrl: null,
};

/**
 * The complete QR generator: type selector, per-type form, live preview,
 * customization panel, and recent/favorites history. Self-contained (owns
 * all of its own state), so it can be dropped onto the homepage or onto any
 * of the per-type landing pages (src/pages/QRTypeLanding.jsx) with just a
 * different `initialType`.
 */
export default function QRGeneratorWidget({
  initialType = 'url',
  id = 'generator',
  heading = 'Build your QR code',
  subheading = 'Choose a type, fill in the details, and customize the look.',
}) {
  const [activeType, setActiveType] = useState(initialType);
  const [formData, setFormData] = useState({});
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const { addToHistory, toggleFavorite, isFavorite, history } = useQRHistory();
  const lastSavedRef = useRef('');

  // If this widget is remounted with a different initialType (e.g.
  // navigating from one landing page to another via client-side routing,
  // which reuses the component instance), sync the active tab to match.
  useEffect(() => {
    setActiveType(initialType);
  }, [initialType]);

  const ActiveForm = FORM_COMPONENTS[activeType];

  const payload = useMemo(
    () => buildQrPayload(activeType, formData[activeType] || {}),
    [activeType, formData]
  );

  const handleFormChange = useCallback(
    (patch) => {
      setFormData((prev) => ({
        ...prev,
        [activeType]: { ...(prev[activeType] || {}), ...patch },
      }));
    },
    [activeType]
  );

  const handleOptionsChange = useCallback(
    (patch) => setOptions((prev) => ({ ...prev, ...patch })),
    []
  );

  const handleReset = useCallback(() => {
    setOptions(DEFAULT_OPTIONS);
    setFormData((prev) => ({ ...prev, [activeType]: {} }));
  }, [activeType]);

  // Save a stable, non-empty payload into "recent history" (debounced so
  // rapid typing doesn't spam an entry per keystroke). addToHistory itself
  // dedupes by type+payload, so revisiting the same code just bumps it to
  // the top instead of creating a duplicate.
  useEffect(() => {
    if (!payload || payload === lastSavedRef.current) return;
    const timer = setTimeout(() => {
      addToHistory({ type: activeType, payload, data: formData[activeType], options });
      lastSavedRef.current = payload;
    }, 1200);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload, activeType]);

  const currentHistoryEntry = history.find(
    (h) => h.type === activeType && h.payload === payload
  );

  const handleHistorySelect = useCallback((item) => {
    setActiveType(item.type);
    // Restore the actual field values (not just the encoded string) so the
    // form is fully editable again, exactly as the user left it.
    setFormData((prev) => ({ ...prev, [item.type]: item.data || {} }));
    setOptions((prev) => ({ ...prev, ...(item.options || {}) }));
    lastSavedRef.current = item.payload;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [id]);

  const handleFavoriteToggle = useCallback(() => {
    if (currentHistoryEntry) {
      toggleFavorite(currentHistoryEntry);
      return;
    }
    // Not saved to history yet (e.g. favorited within the first 1.2s) —
    // save it now and favorite that new entry immediately.
    const created = addToHistory({ type: activeType, payload, data: formData[activeType], options });
    if (created) toggleFavorite(created);
  }, [currentHistoryEntry, toggleFavorite, addToHistory, activeType, payload, formData, options]);

  return (
    <section id={id} className="section py-16 scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="font-display text-3xl font-bold">{heading}</h2>
        <p className="mt-3 text-ink-500 dark:text-ink-400">{subheading}</p>
      </div>

      <QRTypeSelector active={activeType} onChange={setActiveType} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 space-y-6">
          <div
            className="card p-6"
            id="qr-type-panel"
            role="tabpanel"
            aria-labelledby={`qr-type-tab-${activeType}`}
          >
            <h3 className="font-display font-bold mb-4">
              {QR_TYPES.find((t) => t.id === activeType)?.label} details
            </h3>
            {ActiveForm && (
              <ActiveForm data={formData[activeType] || {}} onChange={handleFormChange} />
            )}
          </div>
        </div>

        <div className="lg:col-span-4">
          <QRPreview
            payload={payload}
            options={options}
            isFavorite={currentHistoryEntry ? isFavorite(currentHistoryEntry.id) : false}
            onFavoriteToggle={handleFavoriteToggle}
          />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="card p-6">
            <h3 className="font-display font-bold mb-4">Customize</h3>
            <CustomizationPanel options={options} onChange={handleOptionsChange} onReset={handleReset} />
          </div>
          <HistoryPanel onSelect={handleHistorySelect} />
        </div>
      </div>
    </section>
  );
}
