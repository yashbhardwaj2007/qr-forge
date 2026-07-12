import { Link } from 'react-router-dom';
import { HiChevronRight, HiOutlineClock, HiOutlineCalendar } from 'react-icons/hi';
import AdSlot from './AdSlot.jsx';

function formatDate(dateStr) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Wraps a blog post's content with a consistent breadcrumb, title header,
 * and Tailwind Typography ("prose") styling — so individual post files
 * (src/pages/blog/posts/*.jsx) can focus purely on writing normal-looking
 * JSX (h2, p, ul, blockquote, etc.) without hand-styling every element.
 */
export default function BlogPostLayout({ meta, children }) {
  return (
    <article className="section py-16">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-ink-500 flex-wrap">
        <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
          Home
        </Link>
        <HiChevronRight size={14} className="text-ink-300 dark:text-ink-600" aria-hidden="true" />
        <Link to="/blog" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
          Blog
        </Link>
        <HiChevronRight size={14} className="text-ink-300 dark:text-ink-600" aria-hidden="true" />
        <span className="text-ink-700 dark:text-ink-300 font-medium truncate">{meta.title}</span>
      </nav>

      <header className="mt-6 max-w-3xl">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
          {meta.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-ink-400">
          <span className="flex items-center gap-1.5">
            <HiOutlineCalendar size={16} aria-hidden="true" />
            <time dateTime={meta.date}>{formatDate(meta.date)}</time>
          </span>
          <span className="flex items-center gap-1.5">
            <HiOutlineClock size={16} aria-hidden="true" />
            {meta.readingTime}
          </span>
        </div>
      </header>

      <div
        className="prose dark:prose-invert mt-10 max-w-3xl
          prose-headings:font-display prose-headings:font-bold
          prose-a:text-brand-600 dark:prose-a:text-brand-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-ink-900 dark:prose-strong:text-white"
      >
        {children}
      </div>

      <div className="mt-10 max-w-3xl">
        <AdSlot label="Advertisement" minHeight={90} />
      </div>

      <div className="mt-8 max-w-3xl card p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1 text-center sm:text-left">
          <h2 className="font-display text-lg font-bold">Ready to make your own QR code?</h2>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            Free, no sign-up, and ready in seconds.
          </p>
        </div>
        <Link to="/#generator" className="btn-primary whitespace-nowrap">
          Create a QR code
        </Link>
      </div>
    </article>
  );
}
