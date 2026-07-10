import { useState, useMemo, useRef, memo } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineTrash, HiHeart, HiOutlineClock, HiOutlineDownload, HiOutlineUpload } from 'react-icons/hi';
import { useQRHistory } from '../context/QRHistoryContext.jsx';
import { QR_TYPES } from './QRTypeSelector.jsx';
import { downloadBlob } from '../utils/downloadUtils.js';

function typeLabel(type) {
  return QR_TYPES.find((t) => t.id === type)?.label || type;
}

function HistoryPanel({ onSelect }) {
  const {
    history,
    favorites,
    removeFromHistory,
    clearHistory,
    toggleFavorite,
    isFavorite,
    exportData,
    importData,
  } = useQRHistory();
  const [tab, setTab] = useState('recent');
  const importInputRef = useRef(null);

  const items = useMemo(() => (tab === 'recent' ? history : favorites), [tab, history, favorites]);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    downloadBlob(blob, `qr-forge-history-${new Date().toISOString().slice(0, 10)}.json`);
    toast.success('History exported');
  };

  const handleImportFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        const { historyAdded, favoritesAdded } = importData(parsed);
        toast.success(`Imported ${historyAdded} history item(s), ${favoritesAdded} favorite(s)`);
      } catch (err) {
        toast.error(err.message || 'Could not read that file.');
      }
    };
    reader.onerror = () => toast.error('Could not read that file.');
    reader.readAsText(file);
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div className="flex rounded-xl bg-ink-100 dark:bg-ink-800 p-1">
          <button
            type="button"
            onClick={() => setTab('recent')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              tab === 'recent'
                ? 'bg-white dark:bg-ink-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-ink-500'
            }`}
          >
            Recent
          </button>
          <button
            type="button"
            onClick={() => setTab('favorites')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              tab === 'favorites'
                ? 'bg-white dark:bg-ink-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-ink-500'
            }`}
          >
            Favorites
          </button>
        </div>
        {tab === 'recent' && history.length > 0 && (
          <button
            type="button"
            onClick={clearHistory}
            className="text-xs font-medium text-ink-400 hover:text-red-500 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="mt-3 flex items-center gap-3 border-b border-ink-100 dark:border-ink-800 pb-3">
        <button
          type="button"
          onClick={handleExport}
          disabled={history.length === 0 && favorites.length === 0}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors disabled:opacity-40 disabled:hover:text-ink-500"
        >
          <HiOutlineDownload size={14} aria-hidden="true" /> Export
        </button>
        <button
          type="button"
          onClick={() => importInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          <HiOutlineUpload size={14} aria-hidden="true" /> Import
        </button>
        <input
          ref={importInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            handleImportFile(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
      </div>

      {items.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-2 py-8 text-center">
          <HiOutlineClock size={28} className="text-ink-300 dark:text-ink-600" aria-hidden="true" />
          <p className="text-sm text-ink-400">
            {tab === 'recent'
              ? 'Your recently generated QR codes will show up here.'
              : "Codes you've favorited will show up here."}
          </p>
        </div>
      ) : (
        <ul className="mt-4 space-y-2 max-h-80 overflow-y-auto pr-1">
          {items.map((item) => (
            <li key={item.id}>
              <div className="group flex items-center gap-3 rounded-xl border border-ink-100 dark:border-ink-800 p-2.5 hover:border-brand-300 dark:hover:border-brand-700 transition-colors">
                <button
                  type="button"
                  onClick={() => onSelect(item)}
                  className="flex flex-1 items-center gap-3 text-left min-w-0"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-950/40 text-xs font-bold text-brand-600 dark:text-brand-400">
                    {typeLabel(item.type).slice(0, 2).toUpperCase()}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-ink-800 dark:text-ink-100">
                      {item.payload}
                    </span>
                    <span className="block text-xs text-ink-400">{typeLabel(item.type)}</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => toggleFavorite(item)}
                  aria-pressed={isFavorite(item.id)}
                  aria-label={isFavorite(item.id) ? 'Remove from favorites' : 'Add to favorites'}
                  className="shrink-0 text-ink-300 hover:text-red-500 transition-colors"
                >
                  <HiHeart size={16} className={isFavorite(item.id) ? 'text-red-500' : ''} aria-hidden="true" />
                </button>
                {tab === 'recent' && (
                  <button
                    type="button"
                    onClick={() => removeFromHistory(item.id)}
                    aria-label="Remove from history"
                    className="shrink-0 text-ink-300 hover:text-red-500 transition-colors opacity-60 group-hover:opacity-100 focus-visible:opacity-100"
                  >
                    <HiOutlineTrash size={16} aria-hidden="true" />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default memo(HistoryPanel);
