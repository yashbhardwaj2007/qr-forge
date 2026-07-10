# QR Forge — Free Online QR Code Platform

A modern, production-ready QR code platform built with **React 19**, **Vite**, and **Tailwind CSS**. Generate custom QR codes for URLs, text, email, phone numbers, SMS, WiFi, vCards, WhatsApp, and locations, scan existing codes with your camera, and print them using ready-made templates — all processed entirely in the browser, with no backend required for the core tool.

![QR Forge Screenshot](./docs/screenshot-hero.png)
<!-- Replace the above with an actual screenshot before publishing -->

---

## ✨ Features

- **9 QR code types** — URL, Text, Email, Phone, SMS, WiFi, vCard, WhatsApp, Location
- **Dedicated landing page per type** (`/qr-code-generator/wifi`, `/vcard`, etc.) — each with its own SEO metadata, real use-case content, and FAQ schema, not just the same generator behind one generic URL
- **QR code scanner** (`/qr-code-scanner`) — scan live via camera or upload an image, with scan history and smart actions (open link, copy data) based on what was scanned
- **Bulk generation** (`/bulk-qr-code-generator`) — upload a CSV and download a ZIP of hundreds of individually-named QR codes, entirely client-side
- **Self-verifying QR codes** — every generated code is automatically re-decoded in the browser right after generation and flagged if it might not scan reliably (e.g. low color contrast), instead of silently letting you download something broken
- **Print templates** — business card, fold-able table tent, and poster layouts with true physical print sizing, in addition to a plain print
- **Live preview** — QR codes render instantly as you type
- **Full customization** — size, foreground/background color, error-correction level, and a center logo
- **Multi-format export** — download as PNG, SVG, or JPEG at high resolution
- **Copy & share** — copy the QR image or its encoded data to the clipboard, share via the Web Share API, or print directly
- **Recent history & favorites** — stored in `localStorage`, no account needed, with JSON export/import so you're never locked into one browser
- **Dark mode** — persisted across sessions, respects system preference on first visit
- **Fully responsive** — mobile-first layout with a sticky navbar and mobile menu
- **SEO-optimized** — per-page meta titles/descriptions, Open Graph & Twitter Card tags, canonical URLs, JSON-LD structured data (Organization, WebApplication, FAQPage), `robots.txt`, `sitemap.xml`, and a web app manifest
- **Accessible** — semantic HTML, ARIA labels, keyboard navigation, visible focus states, and color-contrast-compliant palettes
- **Performance-minded** — route-based code splitting, lazy-loaded pages, debounced QR generation, a shared/cached QR decode engine, and a lean production bundle
- **Monetization-ready** — AdSense wiring that goes live with two environment variables, a real (not fake) newsletter signup, and a support/donation link
- **Production-ready observability** — optional Google Analytics 4 (consent-aware), Sentry error monitoring, and Vercel Speed Insights
- **Tested & CI'd** — a Vitest suite for the core payload/classification logic, run automatically on every push via GitHub Actions alongside lint and a full build

---

## 🛠 Tech Stack

| Layer            | Choice                                     |
| ----------------- | ------------------------------------------ |
| Framework         | React 19                                   |
| Build tool        | Vite 6                                     |
| Styling           | Tailwind CSS 3                             |
| Routing           | React Router 6                             |
| Icons             | react-icons                                |
| Notifications     | react-hot-toast                            |
| QR generation     | `qrcode` npm package                       |
| QR scanning/verification | `qr-scanner` npm package             |
| CSV parsing       | `papaparse` (bulk generation)              |
| ZIP export        | `jszip` (bulk generation)                  |
| Testing           | Vitest                                     |
| CI                | GitHub Actions                             |
| Error monitoring  | `@sentry/react` (optional, off by default) |
| Analytics         | Google Analytics 4 (optional, off by default) |
| Performance monitoring | `@vercel/speed-insights`              |
| Deployment        | Vercel (zero-config)                       |

The core QR generator, landing pages, and scanner need no backend, database, or API keys. Newsletter signups, ads, analytics, and error monitoring are each optional and off until you configure them (see **Monetization Setup** below).

---

## 📦 Installation

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other scripts

```bash
npm run build      # Production build → dist/
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
npm run test       # Run the test suite once
npm run test:watch # Run tests in watch mode
```

A small [Vitest](https://vitest.dev) suite covers the pure logic that's cheapest to break silently and most expensive to get wrong: `src/utils/qrDataFormatters.js` (the payload built for each of the 9 QR types) and `src/utils/scanResultUtils.js` (how a scanned code gets classified). CI (`.github/workflows/ci.yml`) runs lint, tests, and a full build on every push and PR — a broken build never reaches Vercel silently.

### Validating SEO structured data
The JSON-LD schemas (Organization, WebApplication, FAQPage) are checked at build/test time for basic structural correctness, but Google's actual interpretation of them can only be confirmed against a live, deployed URL. After deploying, run each page through [Google's Rich Results Test](https://search.google.com/test/rich-results) — particularly the homepage and a couple of the `/qr-code-generator/:type` pages — to confirm the FAQ rich result renders the way you expect.

---

## 📁 Folder Structure

```
qr-forge/
├── .github/
│   └── workflows/
│       └── ci.yml               # lint + test + build on every push/PR
├── public/
│   ├── favicon.svg
│   ├── favicon-16.png / favicon-32.png
│   ├── apple-touch-icon.png
│   ├── icon-192.png / icon-512.png
│   ├── og-image.svg / og-image.png
│   ├── manifest.json
│   ├── robots.txt
│   ├── ads.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── forms/               # One form component per QR type
│   │   │   ├── UrlForm.jsx
│   │   │   ├── TextForm.jsx
│   │   │   ├── EmailForm.jsx
│   │   │   ├── PhoneForm.jsx
│   │   │   ├── SmsForm.jsx
│   │   │   ├── WifiForm.jsx
│   │   │   ├── VCardForm.jsx
│   │   │   ├── WhatsAppForm.jsx
│   │   │   ├── LocationForm.jsx
│   │   │   └── index.js         # type → component map
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── QRGeneratorWidget.jsx # the full generator — used by Home AND every type landing page
│   │   ├── QRTypeSelector.jsx
│   │   ├── QRPreview.jsx        # includes the self-verification badge
│   │   ├── PrintTemplateModal.jsx
│   │   ├── CustomizationPanel.jsx
│   │   ├── HistoryPanel.jsx     # includes export/import
│   │   ├── FAQSection.jsx       # reusable accordion + FAQPage schema builder
│   │   ├── Newsletter.jsx
│   │   ├── AdSlot.jsx
│   │   ├── AdSenseLoader.jsx
│   │   ├── AnalyticsLoader.jsx
│   │   ├── CookieConsent.jsx
│   │   ├── ErrorFallback.jsx
│   │   ├── ScrollToTop.jsx
│   │   ├── SkeletonLoader.jsx
│   │   └── SEO.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── QRTypeLanding.jsx    # /qr-code-generator/:type — one page, nine URLs
│   │   ├── Scanner.jsx          # /qr-code-scanner
│   │   ├── BulkGenerator.jsx    # /bulk-qr-code-generator
│   │   ├── About.jsx
│   │   ├── Privacy.jsx
│   │   ├── Terms.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   ├── data/
│   │   ├── qrTypeContent.js     # per-type SEO copy, use cases, and FAQs
│   │   └── qrTypeFields.js      # per-type CSV column config for bulk generation
│   ├── context/
│   │   ├── ThemeContext.jsx     # dark mode, persisted
│   │   └── QRHistoryContext.jsx # recent + favorites, persisted, export/import
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useQRCode.js         # canvas + SVG generation + self-verification, debounced
│   │   ├── useDocumentHead.js   # lightweight SEO tag manager
│   │   └── useScrollRestoration.js
│   ├── utils/
│   │   ├── qrDataFormatters.js  # builds the encoded payload per QR type (+ tests)
│   │   ├── downloadUtils.js     # download/copy helpers
│   │   ├── printTemplates.js    # print-ready HTML per template
│   │   └── scanResultUtils.js   # classifies a decoded scan (URL/WiFi/vCard/etc.) (+ tests)
│   ├── lib/
│   │   ├── sentry.js            # conditional Sentry init
│   │   └── qrEngine.js          # shared, cached QR decode engine (scanner + self-verification)
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── .env.example
├── tailwind.config.js
├── vite.config.js
├── vercel.json
└── package.json
```

---

## 🚀 Deployment (Vercel)

This project deploys to Vercel with **zero configuration**:

1. Push the repository to GitHub/GitLab/Bitbucket.
2. In Vercel, click **New Project** and import the repo.
3. Framework preset: **Vite** (auto-detected).
4. Build command: `npm run build` · Output directory: `dist` (auto-detected).
5. Click **Deploy**.

The included `vercel.json` handles SPA client-side routing rewrites, so deep links like `/about` work correctly on refresh.

You can also deploy via the CLI:

```bash
npm install -g vercel
vercel --prod
```

---

## 🎨 Customization Guide

- **Brand colors** — edit the `brand` and `ink` color scales in `tailwind.config.js`.
- **Fonts** — swap the Google Fonts import in `index.html` and update `fontFamily` in `tailwind.config.js`.
- **Add a new QR type** —
  1. Add a formatter function in `src/utils/qrDataFormatters.js`.
  2. Create a form component in `src/components/forms/` following the existing pattern (`data`, `onChange` props).
  3. Register it in `src/components/forms/index.js` and add its metadata (id/label/icon) to `QR_TYPES` in `src/components/QRTypeSelector.jsx`.
- **Ad slots** — set `VITE_ADSENSE_CLIENT` and each `<AdSlot slot="...">`'s slot id (see `.env.example`) to go live with real AdSense units — no code changes needed. Until configured, every slot renders a placeholder box with reserved dimensions so there's no layout shift when ads do load.
- **Newsletter** — set `VITE_NEWSLETTER_ENDPOINT` (see `.env.example`) to a form-submission endpoint (Formspree, Web3Forms, Getform, or your own serverless function) that accepts `POST { "email": "..." }`. Until it's set, the form stays visible but tells users honestly that signups aren't connected yet, rather than faking a success message.
- **Site URLs** — update `SITE_URL` in `src/components/SEO.jsx` and the URLs in `public/sitemap.xml` / `public/robots.txt` / `index.html` to your production domain before launch.

---

## ♿ Accessibility

- Semantic landmarks (`header`, `main`, `footer`, `nav`)
- `aria-label` / `aria-selected` / `aria-expanded` on interactive controls
- Full keyboard navigation, including the logo drag-and-drop zone
- Visible focus rings via Tailwind's `focus-visible` utilities
- Color palette checked for WCAG AA contrast in both light and dark themes

---

## 🔒 Privacy

All QR encoding happens client-side using the `qrcode` library — no form data is ever sent to a server. Recent history and favorites are stored in the browser's `localStorage` only. See `/privacy-policy` in the app for the full policy.

---

## 💰 Monetization Setup

QR Forge ships monetization-ready but monetization-*off* by default — nothing fake, nothing that silently fails in production.

### Newsletter signups
Not connected until you set `VITE_NEWSLETTER_ENDPOINT` (see `.env.example`) to a form endpoint (Formspree, Web3Forms, Getform, or your own serverless function). Until then, the form is visible but tells users honestly that signups aren't connected yet, instead of showing a fake success message.

### Google AdSense
Every `<AdSlot />` renders a harmless placeholder box in development, and switches to a real ad unit only once both `VITE_ADSENSE_CLIENT` (your publisher ID) and that instance's `slot` id are set — no code changes needed when you're approved. See `.env.example` for exact steps, and remember to also drop your real snippet into `public/ads.txt`.

**Before you apply for AdSense**, know that:
- Your content must be original and genuinely useful — Google's reviewers (human and automated) check for this specifically. The FAQ and About/Privacy/Terms/Contact pages already give this site more substance than a bare single-purpose tool, but a review is still a judgment call on their end.
- Ads should sit *alongside* real content, not on pages that have none. This project deliberately does **not** place an ad slot on the 404 page — Google's Publisher Policies explicitly prohibit ads on "non-content-based" pages, and it's not worth the risk to your whole account.
- You'll need your own domain (not the default `*.vercel.app` subdomain) for a credible-looking submission, plus working About, Privacy Policy, Terms, and Contact pages — all already included here.
- Approval isn't guaranteed and isn't purely mechanical — it also factors in things outside this codebase, like whether your domain is brand new, how much real traffic you have, and manual review judgment. Policies also change over time, so check [Google's current AdSense eligibility requirements](https://support.google.com/adsense/answer/9724) and [Program Policies](https://support.google.com/adsense/answer/48182) directly before applying.

### Analytics & error monitoring
Both optional, both off until configured, both documented in `.env.example`:
- **`VITE_GA_MEASUREMENT_ID`** — Google Analytics 4. Only loads after a visitor accepts the cookie consent banner, never before.
- **`VITE_SENTRY_DSN`** — Sentry error monitoring. Without this, a production error is only visible in that one visitor's own browser console — you'd have no way to know something broke unless they told you.

## 🗺 Roadmap — Dynamic QR Codes

Every QR code this project generates is **static** — the destination is baked directly into the image forever. That's genuinely fine for most use cases, but it's also the entire premium feature of every competing QR tool: a **dynamic** QR code keeps the same printed image while letting you change where it redirects later, plus see scan counts.

This is intentionally **not included** here, because it requires a real backend and a database — a fundamentally different architecture than the rest of this static, client-only project. Rather than scaffold that blind (untestable without your own provisioned database, and risky to ship silently as "done" when it isn't verified), it's left as a clearly-scoped next phase:

1. Pick a database (Vercel Postgres/Neon is the most natural fit for a Vercel-deployed project; Supabase is a good alternative with a generous free tier).
2. Add Vercel Serverless Functions under `/api` for: creating a short redirect code, updating its target, and redirecting (`/r/:code` → 302 to the current target, incrementing a scan counter).
3. Generate the QR code against your own short redirect URL (e.g. `https://yoursite.com/r/ab12cd`) instead of the final destination directly.

Happy to build this in a follow-up once you've picked a database provider.

## 📄 License

Licensed under the [MIT License](./LICENSE). Free to use for personal and commercial projects.
