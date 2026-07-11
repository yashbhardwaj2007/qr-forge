import {
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineColorSwatch,
  HiOutlineDownload,
  HiOutlineDeviceMobile,
  HiOutlineSparkles,
  HiOutlineArrowRight,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import QRGeneratorWidget from '../components/QRGeneratorWidget.jsx';
import FAQSection, { buildFaqSchema } from '../components/FAQSection.jsx';
import Newsletter from '../components/Newsletter.jsx';
import AdSlot from '../components/AdSlot.jsx';
import { QR_TYPES } from '../components/QRTypeSelector.jsx';
import { QR_TYPE_CONTENT } from '../data/qrTypeContent.js';

const FEATURES = [
  {
    icon: HiOutlineLightningBolt,
    title: 'Instant generation',
    desc: 'QR codes render live as you type — no page reloads, no waiting.',
  },
  {
    icon: HiOutlineColorSwatch,
    title: 'Full customization',
    desc: 'Match your brand with custom colors, sizes, and an embedded logo.',
  },
  {
    icon: HiOutlineDownload,
    title: 'Multiple formats',
    desc: 'Export crisp PNG, scalable SVG, or JPEG — ready for print or web.',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Privacy-first',
    desc: 'Everything runs in your browser. Your data never touches a server.',
  },
  {
    icon: HiOutlineDeviceMobile,
    title: '9 QR types',
    desc: 'URLs, WiFi, vCards, WhatsApp, SMS, email, location and more.',
  },
  {
    icon: HiOutlineSparkles,
    title: 'Always free',
    desc: 'No sign-up, no watermark, no limits. Generate as many as you like.',
  },
];

const FAQS = [
  {
    q: 'Is QR Forge really free to use?',
    a: "Yes. Every QR type, customization option, and export format is free, with no sign-up, watermark, or usage limit. There is no premium tier — the tool itself doesn't need one.",
  },
  {
    q: 'Do the QR codes expire or stop working?',
    a: 'No. The QR codes you generate here are "static" — the data (a URL, WiFi credentials, contact info, etc.) is encoded directly into the image itself, so it works forever and doesn\'t rely on our servers staying online.',
  },
  {
    q: 'Is my data stored on your servers?',
    a: "No. QR encoding happens entirely inside your browser using JavaScript. The text, links, or WiFi passwords you enter are never uploaded anywhere. Your recent codes and favorites are saved only in your own browser's local storage.",
  },
  {
    q: 'What resolution should I use for printing?',
    a: 'For business cards or flyers, 512px or larger with the "High" error-correction level is a safe choice. For posters or billboards, export the SVG version, which scales to any size without losing quality.',
  },
  {
    q: 'Can I add my logo to the QR code?',
    a: 'Yes. Upload a logo in the Customize panel and it will be placed in the center of the code. We automatically switch to the "High" error-correction level when a logo is present, which keeps the code scannable even with the extra graphic.',
  },
  {
    q: 'Will a QR code with custom colors still scan correctly?',
    a: "Generally yes, as long as there's strong contrast between the foreground and background colors. Avoid light-on-light or similarly-toned combinations, and always test the final code with a couple of different phone cameras before printing it at scale.",
  },
];

const SITE_URL = 'https://forge-qr.vercel.app';

const WEB_APPLICATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'QR Forge',
  url: SITE_URL,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any (runs in any modern browser)',
  description:
    'A free, browser-based QR code generator supporting URLs, text, email, phone, SMS, WiFi, vCard, WhatsApp, and location QR codes with full color and logo customization.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

// Built directly from FAQS above so the structured data can never drift
// from what's actually rendered on the page.
const FAQ_SCHEMA = buildFaqSchema(FAQS);

// Defined once at module scope (not inline in JSX) so this array keeps a
// stable identity across renders — required for SEO's internal memoization
// to actually prevent the structured-data <script> tags from being torn
// down and rebuilt on every keystroke.
const HOME_STRUCTURED_DATA = [WEB_APPLICATION_SCHEMA, FAQ_SCHEMA];

export default function Home() {
  return (
    <>
      <SEO
        title="Free QR Code Generator"
        description="Generate free, high-resolution QR codes for URLs, WiFi, vCards, WhatsApp, email, SMS, phone numbers and locations. Customize colors, add a logo, and download instantly."
        path="/"
        structuredData={HOME_STRUCTURED_DATA}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-400/30 blur-3xl dark:bg-brand-600/20" />

        <div className="section relative pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/40 px-4 py-1.5 text-xs font-semibold text-brand-700 dark:text-brand-300 animate-fade-up">
            <HiOutlineSparkles aria-hidden="true" /> 100% free, no sign-up required
          </span>

          <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink-900 dark:text-white animate-fade-up [animation-delay:100ms]">
            Create stunning QR codes
            <br className="hidden sm:block" />
            in <span className="bg-gradient-to-r from-brand-600 to-purple-500 bg-clip-text text-transparent">seconds</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-ink-500 dark:text-ink-400 animate-fade-up [animation-delay:200ms]">
            Generate custom, high-resolution QR codes for links, WiFi, contact
            cards, WhatsApp and more. Customize colors, add your logo, and
            download instantly — completely free.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up [animation-delay:300ms]">
            <a href="#generator" className="btn-primary px-8 py-3 text-base">
              Start creating <HiOutlineLightningBolt aria-hidden="true" />
            </a>
            <a href="#features" className="btn-outline px-8 py-3 text-base">
              See features
            </a>
          </div>

          <div className="mt-14 flex justify-center animate-float">
            <div className="glass rounded-3xl p-6 shadow-glow">
              <div className="grid grid-cols-5 gap-1.5">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-4 w-4 sm:h-5 sm:w-5 rounded-sm ${
                      [0, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 24].includes(i)
                        ? 'bg-gradient-to-br from-brand-600 to-purple-600'
                        : 'bg-ink-200 dark:bg-ink-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold">Everything you need</h2>
          <p className="mt-3 text-ink-500 dark:text-ink-400">
            A complete QR toolkit, designed to be fast, private, and beautiful.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="card p-6 hover:-translate-y-1 hover:shadow-glow transition-all duration-300"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-semibold text-ink-900 dark:text-white">{title}</h3>
              <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section">
        <AdSlot label="Advertisement" minHeight={90} />
      </div>

      <QRGeneratorWidget initialType="url" />

      {/* Internal links to the dedicated per-type landing pages — helps both
          visitors jumping straight to a specific type from search, and
          crawlers discovering those pages from the homepage. */}
      <section className="section py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display text-3xl font-bold">Explore every QR code type</h2>
          <p className="mt-3 text-ink-500 dark:text-ink-400">
            Each type has its own guide with real use cases and answers to common questions.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {QR_TYPES.map(({ id, label, icon: Icon }) => (
            <Link
              key={id}
              to={`/qr-code-generator/${id}`}
              className="group card flex flex-col items-center gap-2 p-5 text-center hover:-translate-y-1 hover:shadow-glow transition-all duration-300"
            >
              <Icon size={22} className="text-brand-600 dark:text-brand-400" aria-hidden="true" />
              <span className="text-sm font-semibold">{label}</span>
              <span className="hidden sm:flex items-center gap-1 text-xs text-ink-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {QR_TYPE_CONTENT[id] ? 'Learn more' : ''} <HiOutlineArrowRight size={12} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <FAQSection
        faqs={FAQS}
        idPrefix="faq"
        title="Frequently asked questions"
        subtitle="Everything you need to know before you generate and print your QR code."
      />

      <div className="section pb-16">
        <Newsletter />
      </div>

      <div className="section pb-16">
        <AdSlot label="Sponsored" minHeight={120} />
      </div>
    </>
  );
}
