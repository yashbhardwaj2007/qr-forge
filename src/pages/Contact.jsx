import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlinePaperAirplane } from 'react-icons/hi';
import SEO from '../components/SEO.jsx';
import AdSlot from '../components/AdSlot.jsx';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields.');
      return;
    }
    setSending(true);
    // No backend is wired up. This opens the user's email client with the
    // message pre-filled — swap for an API route or form service as needed.
    await new Promise((r) => setTimeout(r, 500));
    const subject = encodeURIComponent(`Message from ${form.name} via QR Forge`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:hello@qrforge.app?subject=${subject}&body=${body}`;
    setSending(false);
    toast.success('Opening your email client…');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with the QR Forge team for support, feedback, or partnership inquiries."
        path="/contact"
      />
      <section className="section py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h1 className="font-display text-4xl font-extrabold">Get in touch</h1>
            <p className="mt-4 text-ink-500 dark:text-ink-400 leading-relaxed">
              Have feedback, found a bug, or want to suggest a new QR type?
              We'd love to hear from you.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
                  <HiOutlineMail size={18} aria-hidden="true" />
                </span>
                <span className="text-sm text-ink-600 dark:text-ink-300">hello@qrforge.app</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
                  <HiOutlineLocationMarker size={18} aria-hidden="true" />
                </span>
                <span className="text-sm text-ink-600 dark:text-ink-300">Remote-first, worldwide</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-4">
            <div>
              <label htmlFor="contact-name" className="label">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="Jane Doe"
                className="input"
                required
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="label">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="jane@example.com"
                className="input"
                required
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="label">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={form.message}
                onChange={handleChange('message')}
                placeholder="How can we help?"
                className="input resize-none"
                required
              />
            </div>
            <button type="submit" disabled={sending} className="btn-primary w-full">
              {sending ? 'Sending…' : 'Send message'} <HiOutlinePaperAirplane className="rotate-90" aria-hidden="true" />
            </button>
          </form>
        </div>

        <div className="max-w-5xl mx-auto mt-10">
          <AdSlot label="Advertisement" minHeight={100} />
        </div>
      </section>
    </>
  );
}
