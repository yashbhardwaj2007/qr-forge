export default function EmailForm({ data, onChange }) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <label htmlFor="email-to" className="label">
          Recipient email
        </label>
        <input
          id="email-to"
          type="email"
          autoComplete="email"
          placeholder="hello@example.com"
          value={data.to || ''}
          onChange={(e) => onChange({ to: e.target.value })}
          className="input"
        />
      </div>
      <div>
        <label htmlFor="email-subject" className="label">
          Subject <span className="text-ink-400 font-normal">(optional)</span>
        </label>
        <input
          id="email-subject"
          type="text"
          placeholder="Let's talk"
          value={data.subject || ''}
          onChange={(e) => onChange({ subject: e.target.value })}
          className="input"
        />
      </div>
      <div>
        <label htmlFor="email-body" className="label">
          Message <span className="text-ink-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="email-body"
          rows={4}
          placeholder="Write your message…"
          value={data.body || ''}
          onChange={(e) => onChange({ body: e.target.value })}
          className="input resize-none"
        />
      </div>
    </div>
  );
}
