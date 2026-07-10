import SEO from '../components/SEO.jsx';

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Read QR Forge's privacy policy — learn how we handle data, local storage, and analytics."
        path="/privacy-policy"
      />
      <section className="section py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-extrabold">Privacy Policy</h1>
          <p className="mt-3 text-sm text-ink-400">Last updated: January 2026</p>

          <div className="mt-10 space-y-8 text-ink-600 dark:text-ink-300 leading-relaxed">
            <div>
              <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white">
                1. Overview
              </h2>
              <p className="mt-2">
                QR Forge ("we", "our", "the Service") is a browser-based QR
                code generator. This policy explains what data we do — and
                do not — collect when you use the Service.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white">
                2. Data you enter
              </h2>
              <p className="mt-2">
                Any content you type into the generator (URLs, text, WiFi
                credentials, contact details, etc.) is processed entirely in
                your browser to generate a QR code image. This information is
                never transmitted to our servers or any third party.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white">
                3. Local storage
              </h2>
              <p className="mt-2">
                We use your browser's local storage to remember your theme
                preference, recent QR code history, and favorites. This data
                stays on your device and can be cleared at any time from the
                app or your browser settings.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white">
                4. Cookies and analytics
              </h2>
              <p className="mt-2">
                We may use privacy-friendly analytics to understand aggregate
                usage (e.g. page views) and, where enabled, third-party
                advertising providers such as Google AdSense, which may use
                cookies to serve relevant ads. You can control cookie
                preferences through your browser settings.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white">
                5. Third-party services
              </h2>
              <p className="mt-2">
                We do not sell or share your personal data. If we integrate
                third-party services in the future (such as advertising
                networks), they operate under their own privacy policies.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white">
                6. Children's privacy
              </h2>
              <p className="mt-2">
                The Service is not directed at children under 13, and we do
                not knowingly collect personal information from children.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white">
                7. Changes to this policy
              </h2>
              <p className="mt-2">
                We may update this policy from time to time. Continued use of
                the Service after changes constitutes acceptance of the
                revised policy.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white">
                8. Contact us
              </h2>
              <p className="mt-2">
                Questions about this policy? Reach out via our{' '}
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
