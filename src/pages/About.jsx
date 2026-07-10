import { HiOutlineShieldCheck, HiOutlineLightningBolt, HiOutlineHeart } from 'react-icons/hi';
import SEO from '../components/SEO.jsx';
import AdSlot from '../components/AdSlot.jsx';

const VALUES = [
  {
    icon: HiOutlineLightningBolt,
    title: 'Fast by design',
    desc: 'Every QR code is generated instantly, client-side, with no round-trips to a server.',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Privacy-first',
    desc: 'We never store, log, or transmit the content you encode. It never leaves your browser.',
  },
  {
    icon: HiOutlineHeart,
    title: 'Free, forever',
    desc: 'No paywalls, no watermarks, no account required — just a genuinely useful tool.',
  },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about QR Forge — a free, privacy-friendly QR code generator built for speed, flexibility, and beautiful design."
        path="/about"
      />
      <section className="section py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl font-extrabold">About QR Forge</h1>
          <p className="mt-5 text-lg text-ink-500 dark:text-ink-400">
            QR Forge started as a simple idea: QR code generators shouldn't be
            cluttered, slow, or hidden behind paywalls. We built a tool
            that's fast, beautiful, and respects your privacy — because
            generating a QR code should never require handing over your data.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto card p-8">
          <h2 className="font-display text-2xl font-bold">How it works</h2>
          <p className="mt-3 text-ink-500 dark:text-ink-400 leading-relaxed">
            QR Forge encodes your data — a URL, WiFi credentials, a contact
            card, or anything else — into the QR standard entirely inside
            your browser using open-source encoding libraries. Nothing is
            uploaded to a server, which means it works offline once loaded
            and keeps sensitive information like WiFi passwords private.
          </p>
          <p className="mt-3 text-ink-500 dark:text-ink-400 leading-relaxed">
            Your recent codes and favorites are saved locally in your
            browser's storage so you can find them again — they're never sent
            anywhere else.
          </p>
        </div>

        <div className="mt-10 max-w-3xl mx-auto">
          <AdSlot label="Advertisement" minHeight={100} />
        </div>
      </section>
    </>
  );
}
