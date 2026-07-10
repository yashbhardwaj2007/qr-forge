import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import CookieConsent from './components/CookieConsent.jsx';
import AdSenseLoader from './components/AdSenseLoader.jsx';
import AnalyticsLoader from './components/AnalyticsLoader.jsx';
import { useTheme } from './context/ThemeContext.jsx';
import { useScrollRestoration } from './hooks/useScrollRestoration.js';

const Home = lazy(() => import('./pages/Home.jsx'));
const QRTypeLanding = lazy(() => import('./pages/QRTypeLanding.jsx'));
const Scanner = lazy(() => import('./pages/Scanner.jsx'));
const BulkGenerator = lazy(() => import('./pages/BulkGenerator.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Privacy = lazy(() => import('./pages/Privacy.jsx'));
const Terms = lazy(() => import('./pages/Terms.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span className="sr-only">Loading page…</span>
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" aria-hidden="true" />
    </div>
  );
}

export default function App() {
  const { theme } = useTheme();
  useScrollRestoration();

  return (
    <div className="flex min-h-screen flex-col">
      <AdSenseLoader />
      <AnalyticsLoader />
      <SpeedInsights />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/qr-code-generator/:type" element={<QRTypeLanding />} />
            <Route path="/qr-code-scanner" element={<Scanner />} />
            <Route path="/bulk-qr-code-generator" element={<BulkGenerator />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
      <CookieConsent />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: theme === 'dark' ? '#1a1a20' : '#ffffff',
            color: theme === 'dark' ? '#eeeef0' : '#1a1a20',
            border: theme === 'dark' ? '1px solid #2f2f37' : '1px solid #eeeef0',
            borderRadius: '0.75rem',
            fontSize: '0.875rem',
          },
          success: { iconTheme: { primary: '#7c3aed', secondary: '#ffffff' } },
        }}
      />
    </div>
  );
}
