import { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { HiOutlineCheckCircle, HiChevronRight } from 'react-icons/hi';
import SEO, { SITE_URL } from '../components/SEO.jsx';
import QRGeneratorWidget from '../components/QRGeneratorWidget.jsx';
import FAQSection, { buildFaqSchema } from '../components/FAQSection.jsx';
import AdSlot from '../components/AdSlot.jsx';
import Newsletter from '../components/Newsletter.jsx';
import { QR_TYPES } from '../components/QRTypeSelector.jsx';
import { QR_TYPE_CONTENT } from '../data/qrTypeContent.js';

function buildBreadcrumbSchema(typeLabel, type) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${typeLabel} QR Code Generator`,
        item: `${SITE_URL}/qr-code-generator/${type}`,
      },
    ],
  };
}

/**
 * A dedicated, indexable landing page per QR type (e.g.
 * /qr-code-generator/wifi), so the site can rank for specific searches like
 * "wifi qr code generator" instead of only the generic homepage. Renders
 * the same QRGeneratorWidget as the homepage, pre-selected to this type,
 * plus type-specific copy, use cases, and FAQ — genuinely different content
 * per page rather than a templated word-swap.
 */
export default function QRTypeLanding() {
  const { type } = useParams();
  const content = QR_TYPE_CONTENT[type];
  const typeMeta = QR_TYPES.find((t) => t.id === type);

  // Unknown type in the URL — send to the 404 page rather than silently
  // rendering a broken page with no content.
  if (!content || !typeMeta) {
    return <Navigate to="/404" replace />;
  }

  const faqSchema = buildFaqSchema(content.faqs);
  const breadcrumbSchema = buildBreadcrumbSchema(typeMeta.label, type);
  const combinedStructuredData = useMemo(
    () => [faqSchema, breadcrumbSchema],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [type]
  );
  // A handful of *other* types to cross-link to, for internal linking
  // between related pages — not all 9, to keep it genuinely useful rather
  // than a wall of links.
  const relatedTypes = QR_TYPES.filter((t) => t.id !== type).slice(0, 4);

  return (
    <>
      <SEO
        title={content.metaTitle}
        description={content.metaDescription}
        path={`/qr-code-generator/${type}`}
        structuredData={combinedStructuredData}
      />

      <section className="section pt-16 pb-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-ink-500">
          <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            Home
          </Link>
          <HiChevronRight size={14} className="text-ink-300 dark:text-ink-600" aria-hidden="true" />
          <span className="text-ink-700 dark:text-ink-300 font-medium">{typeMeta.label} QR Code Generator</span>
        </nav>

        <h1 className="mt-6 font-display text-3xl sm:text-4xl font-extrabold tracking-tight max-w-3xl">
          {content.h1}
        </h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg text-ink-500 dark:text-ink-400">
          {content.intro}
        </p>

        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 max-w-2xl">
          {content.useCases.map((useCase) => (
            <li key={useCase} className="flex items-start gap-2 text-sm text-ink-600 dark:text-ink-300">
              <HiOutlineCheckCircle
                size={18}
                className="shrink-0 mt-0.5 text-brand-600 dark:text-brand-400"
                aria-hidden="true"
              />
              {useCase}
            </li>
          ))}
        </ul>
      </section>

      <QRGeneratorWidget
        initialType={type}
        id="generator"
        heading={`Create your ${typeMeta.label} QR code`}
        subheading="Fill in the details below — your QR code updates live as you type."
      />

      <div className="section pb-16">
        <AdSlot label="Advertisement" minHeight={90} />
      </div>

      <section className="section pb-16">
        <h2 className="font-display text-xl font-bold mb-5">Other QR code types</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {relatedTypes.map(({ id, label, icon: Icon }) => (
            <Link
              key={id}
              to={`/qr-code-generator/${id}`}
              className="group card flex flex-col items-center gap-2 p-4 text-center hover:-translate-y-1 hover:shadow-glow transition-all duration-300"
            >
              <Icon size={20} className="text-brand-600 dark:text-brand-400" aria-hidden="true" />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      <FAQSection faqs={content.faqs} idPrefix={`faq-${type}`} title={`${typeMeta.label} QR code — FAQ`} />

      <div className="section pb-16">
        <Newsletter />
      </div>
    </>
  );
}
