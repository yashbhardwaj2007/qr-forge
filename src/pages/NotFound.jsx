import { Link } from 'react-router-dom';
import { HiOutlineQrcode, HiOutlineHome } from 'react-icons/hi';
import SEO from '../components/SEO.jsx';

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist."
        path="/404"
        noindex
      />
      <section className="section flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-purple-600 text-white shadow-glow animate-float">
          <HiOutlineQrcode size={36} aria-hidden="true" />
        </div>
        <h1 className="mt-8 font-display text-6xl font-extrabold">404</h1>
        <p className="mt-3 text-lg text-ink-500 dark:text-ink-400">
          This page couldn't be scanned — it doesn't seem to exist.
        </p>
        <Link to="/" className="btn-primary mt-8">
          <HiOutlineHome size={18} aria-hidden="true" /> Back to home
        </Link>
      </section>
    </>
  );
}
