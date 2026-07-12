import { useState, useEffect, useCallback } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenu, HiX, HiSun, HiMoon, HiOutlineQrcode } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext.jsx';

const NAV_LINKS = [
  { to: '/', label: 'Generator' },
  { to: '/qr-code-scanner', label: 'Scanner' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Close on Escape and lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // "Create QR" needs to work from any page, not just "/", since the
  // #generator anchor only exists on the homepage.
  const handleCreateQrClick = useCallback(
    (e) => {
      if (location.pathname !== '/') {
        e.preventDefault();
        navigate('/#generator');
      }
      // On "/" itself, the plain anchor href handles the smooth scroll.
    },
    [location.pathname, navigate]
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-card dark:shadow-card-dark'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="section flex h-16 items-center justify-between" aria-label="Primary">
        <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-purple-500 text-white shadow-glow">
            <HiOutlineQrcode size={20} aria-hidden="true" />
          </span>
          <span>
            QR<span className="text-brand-600 dark:text-brand-400">Forge</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40'
                    : 'text-ink-600 dark:text-ink-300 hover:text-brand-600 dark:hover:text-brand-400'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="btn-icon"
          >
            {theme === 'dark' ? <HiSun size={18} aria-hidden="true" /> : <HiMoon size={18} aria-hidden="true" />}
          </button>

          <a href="#generator" onClick={handleCreateQrClick} className="btn-primary hidden sm:inline-flex">
            Create QR
          </a>

          <button
            type="button"
            id="mobile-menu-toggle"
            className="btn-icon md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <HiX size={20} aria-hidden="true" /> : <HiMenu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="md:hidden glass border-t border-ink-100 dark:border-ink-800 animate-fade-in"
        >
          <div className="section flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40'
                      : 'text-ink-600 dark:text-ink-300 hover:bg-ink-50 dark:hover:bg-ink-800'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href="#generator"
              onClick={(e) => {
                setOpen(false);
                handleCreateQrClick(e);
              }}
              className="btn-primary mt-2 justify-center sm:hidden"
            >
              Create QR
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
