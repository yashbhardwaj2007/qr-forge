import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineMail } from 'react-icons/hi';

// Set VITE_NEWSLETTER_ENDPOINT in your environment (see .env.example) to a
// form-submission endpoint such as a Formspree/Web3Forms form URL, or your
// own serverless function. Until it's configured, the form stays visible
// but tells the user honestly that signups aren't connected yet — it never
// fakes a success message for an email that went nowhere.
const ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT || '';

async function submitEmail(email) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error('Subscription failed. Please try again.');
}

function NewsletterForm({ compact, email, setEmail, loading, handleSubmit }) {
  const inputId = compact ? 'newsletter-email-compact' : 'newsletter-email';
  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? 'flex flex-col gap-2' : 'flex w-full sm:w-auto gap-2'}
    >
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <input
        id={inputId}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className={`input ${compact ? 'text-sm' : 'sm:w-64'}`}
      />
      <button
        type="submit"
        disabled={loading}
        className={`btn-primary whitespace-nowrap ${compact ? 'w-full text-sm' : ''}`}
      >
        {loading ? 'Please wait…' : 'Subscribe'}
      </button>
    </form>
  );
}

/**
 * A newsletter signup form. Wire up VITE_NEWSLETTER_ENDPOINT (see
 * .env.example / README) to a real form-submission service to start
 * actually collecting emails — until then this intentionally shows a
 * "not connected yet" notice instead of a fake success toast.
 */
export default function Newsletter({ compact = false }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    if (!ENDPOINT) {
      toast.error('Newsletter signup isn\'t connected yet — see .env.example.');
      return;
    }

    setLoading(true);
    try {
      await submitEmail(email);
      setEmail('');
      toast.success("You're subscribed! 🎉");
    } catch (err) {
      toast.error(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (compact) {
    return (
      <NewsletterForm
        compact
        email={email}
        setEmail={setEmail}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    );
  }

  return (
    <div className="card p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
        <HiOutlineMail size={22} aria-hidden="true" />
      </div>
      <div className="flex-1 text-center sm:text-left">
        <h3 className="font-display text-lg font-bold">Get product updates</h3>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">
          New QR types, features and tips — no spam, unsubscribe anytime.
        </p>
      </div>
      <NewsletterForm
        compact={false}
        email={email}
        setEmail={setEmail}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
