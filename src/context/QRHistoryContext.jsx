import { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const QRHistoryContext = createContext(null);

const HISTORY_KEY = 'qr-forge-history';
const FAVORITES_KEY = 'qr-forge-favorites';
const MAX_HISTORY = 20;

export function QRHistoryProvider({ children }) {
  const [history, setHistory] = useLocalStorage(HISTORY_KEY, []);
  const [favorites, setFavorites] = useLocalStorage(FAVORITES_KEY, []);

  const addToHistory = useCallback(
    (entry) => {
      // Never persist the (potentially large) logo data URL into history —
      // it's not restorable meaningfully across sessions and 20 entries
      // each carrying a base64 image can blow past the localStorage quota.
      const { options, ...rest } = entry;
      const { logoDataUrl, ...safeOptions } = options || {};
      const safeEntry = { ...rest, options: safeOptions };

      // If this exact type+payload is already in history, refresh it to
      // the top instead of creating a duplicate.
      const existing = history.find(
        (h) => h.type === safeEntry.type && h.payload === safeEntry.payload
      );
      const created = existing
        ? { ...existing, ...safeEntry, createdAt: new Date().toISOString() }
        : {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            createdAt: new Date().toISOString(),
            ...safeEntry,
          };

      setHistory((prev) => {
        const withoutExisting = existing ? prev.filter((h) => h.id !== existing.id) : prev;
        return [created, ...withoutExisting].slice(0, MAX_HISTORY);
      });

      return created;
    },
    [history, setHistory]
  );

  const removeFromHistory = useCallback(
    (id) => setHistory((prev) => prev.filter((h) => h.id !== id)),
    [setHistory]
  );

  const clearHistory = useCallback(() => setHistory([]), [setHistory]);

  const toggleFavorite = useCallback(
    (entry) => {
      setFavorites((prev) => {
        const exists = prev.find((f) => f.id === entry.id);
        if (exists) return prev.filter((f) => f.id !== entry.id);
        return [entry, ...prev];
      });
    },
    [setFavorites]
  );

  const isFavorite = useCallback(
    (id) => favorites.some((f) => f.id === id),
    [favorites]
  );

  /** Returns a JSON-serializable snapshot for the user to save/back up. */
  const exportData = useCallback(
    () => ({
      exportedAt: new Date().toISOString(),
      version: 1,
      history,
      favorites,
    }),
    [history, favorites]
  );

  /**
   * Merges an exported snapshot back in (e.g. from another device/browser),
   * de-duplicating by id against what's already stored rather than
   * wiping existing data.
   */
  const importData = useCallback(
    (payload) => {
      if (!payload || typeof payload !== 'object') {
        throw new Error('That file doesn\'t look like a QR Forge export.');
      }
      const importedHistory = Array.isArray(payload.history) ? payload.history : [];
      const importedFavorites = Array.isArray(payload.favorites) ? payload.favorites : [];

      setHistory((prev) => {
        const existingIds = new Set(prev.map((h) => h.id));
        const merged = [...importedHistory.filter((h) => h?.id && !existingIds.has(h.id)), ...prev];
        return merged.slice(0, MAX_HISTORY);
      });
      setFavorites((prev) => {
        const existingIds = new Set(prev.map((f) => f.id));
        return [...importedFavorites.filter((f) => f?.id && !existingIds.has(f.id)), ...prev];
      });

      return { historyAdded: importedHistory.length, favoritesAdded: importedFavorites.length };
    },
    [setHistory, setFavorites]
  );

  return (
    <QRHistoryContext.Provider
      value={{
        history,
        favorites,
        addToHistory,
        removeFromHistory,
        clearHistory,
        toggleFavorite,
        isFavorite,
        exportData,
        importData,
      }}
    >
      {children}
    </QRHistoryContext.Provider>
  );
}

export function useQRHistory() {
  const ctx = useContext(QRHistoryContext);
  if (!ctx) throw new Error('useQRHistory must be used within a QRHistoryProvider');
  return ctx;
}
