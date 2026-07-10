import { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

/**
 * A reusable FAQ accordion. Pass `idPrefix` when rendering more than one
 * FAQSection on the same page so button/panel ids stay unique.
 */
export default function FAQSection({
  faqs,
  title = 'Frequently asked questions',
  subtitle,
  idPrefix = 'faq',
  className = 'section py-16',
}) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className={className}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="font-display text-3xl font-bold">{title}</h2>
        {subtitle && <p className="mt-3 text-ink-500 dark:text-ink-400">{subtitle}</p>}
      </div>
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map(({ q, a }, i) => {
          const open = openFaq === i;
          const panelId = `${idPrefix}-panel-${i}`;
          const buttonId = `${idPrefix}-button-${i}`;
          return (
            <div key={q} className="card overflow-hidden">
              <h3 className="m-0">
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => setOpenFaq(open ? -1 : i)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-medium text-ink-900 dark:text-white">{q}</span>
                  <HiOutlineChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`shrink-0 text-ink-400 transition-transform duration-200 ${
                      open ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </h3>
              {open && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-5 pb-4 text-sm text-ink-500 dark:text-ink-400 leading-relaxed animate-fade-in"
                >
                  {a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** Builds a schema.org FAQPage JSON-LD object from a faqs array. */
export function buildFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}
