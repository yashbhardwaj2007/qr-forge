import { HiOutlineExclamationCircle, HiOutlineRefresh } from 'react-icons/hi';

/**
 * Shown if the app crashes with an unhandled render error. Kept as a plain,
 * dependency-free component (no router, no context) since those are
 * exactly the kinds of things that might be broken when this renders.
 */
export default function ErrorFallback() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-ink-950 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950/30 text-red-500">
        <HiOutlineExclamationCircle size={32} aria-hidden="true" />
      </div>
      <h1 className="mt-6 font-display text-2xl font-bold text-ink-900 dark:text-white">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-sm text-sm text-ink-500 dark:text-ink-400">
        This has been reported automatically. Reloading the page usually fixes it.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="btn-primary mt-6"
      >
        <HiOutlineRefresh size={16} aria-hidden="true" /> Reload page
      </button>
    </div>
  );
}
