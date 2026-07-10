import { Link } from 'react-router-dom';
import { HiOutlineQrcode, HiOutlineHeart } from 'react-icons/hi';
import Newsletter from './Newsletter.jsx';

// Point this at your own Ko-fi/Buy Me a Coffee/GitHub Sponsors page. Left as
// a plain constant (not an env var) since showing a placeholder link here
// isn't misleading the way a fake "subscribed!" toast would be — just
// update it directly before you launch.
const SUPPORT_URL = 'https://ko-fi.com/';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'QR Generator', to: '/' },
      { label: 'QR Code Scanner', to: '/qr-code-scanner' },
      { label: 'Bulk QR Generator', to: '/bulk-qr-code-generator' },
      { label: 'WiFi QR Code', to: '/qr-code-generator/wifi' },
      { label: 'vCard QR Code', to: '/qr-code-generator/vcard' },
      { label: 'WhatsApp QR Code', to: '/qr-code-generator/whatsapp' },
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms of Service', to: '/terms' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-100 dark:border-ink-800 bg-ink-50/60 dark:bg-ink-900/40 mt-24">
      <div className="section py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-2 max-w-sm">
            <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-lg">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-purple-500 text-white shadow-glow">
                <HiOutlineQrcode size={20} />
              </span>
              <span>
                QR<span className="text-brand-600 dark:text-brand-400">Forge</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-ink-500 dark:text-ink-400 leading-relaxed">
              Create beautiful, custom QR codes for URLs, WiFi, contact cards, WhatsApp and
              more — free, fast, and entirely in your browser.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-ink-900 dark:text-ink-100">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-ink-500 dark:text-ink-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold text-ink-900 dark:text-ink-100">
              Stay updated
            </h3>
            <div className="mt-4">
              <Newsletter compact />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-ink-100 dark:border-ink-800 pt-6 sm:flex-row">
          <p className="text-xs text-ink-500 dark:text-ink-500">
            &copy; {year} QR Forge. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-ink-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              <HiOutlineHeart size={14} aria-hidden="true" /> Support this project
            </a>
            <p className="text-xs text-ink-400 dark:text-ink-500">
              Built with React, Vite &amp; Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
