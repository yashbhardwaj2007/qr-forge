import SEO from '../components/SEO.jsx';

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Read the terms and conditions for using QR Forge, the free online QR code generator."
        path="/terms"
      />
      <section className="section py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-extrabold">Terms of Service</h1>
          <p className="mt-3 text-sm text-ink-400">Last updated: January 2026</p>

          <div className="mt-10 space-y-8 text-ink-600 dark:text-ink-300 leading-relaxed">
            <div>
              <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white">
                1. Acceptance of terms
              </h2>
              <p className="mt-2">
                By accessing or using QR Forge, you agree to be bound by
                these Terms of Service. If you do not agree, please do not
                use the Service.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white">
                2. Use of the service
              </h2>
              <p className="mt-2">
                QR Forge is provided free of charge for personal and
                commercial use. You may not use the Service to generate QR
                codes that link to illegal, harmful, fraudulent, or malicious
                content.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white">
                3. Ownership of generated content
              </h2>
              <p className="mt-2">
                You retain full ownership of any QR codes you generate using
                the Service. We claim no rights over the content you encode
                or the resulting images.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white">
                4. No warranty
              </h2>
              <p className="mt-2">
                The Service is provided "as is" without warranties of any
                kind. We do not guarantee that generated QR codes will scan
                correctly on every device or scanner, though we test against
                common standards.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white">
                5. Limitation of liability
              </h2>
              <p className="mt-2">
                We are not liable for any damages arising from the use or
                inability to use the Service, including but not limited to
                lost data, lost revenue, or reputational harm.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white">
                6. Changes to the service
              </h2>
              <p className="mt-2">
                We may modify, suspend, or discontinue any part of the
                Service at any time without notice.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white">
                7. Governing law
              </h2>
              <p className="mt-2">
                These terms are governed by applicable local laws in the
                jurisdiction in which the Service operator resides, without
                regard to conflict-of-law principles.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white">
                8. Contact us
              </h2>
              <p className="mt-2">
                For questions about these Terms, please visit our{' '}
                <a href="/contact" className="text-brand-600 dark:text-brand-400 underline">
                  Contact page
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
