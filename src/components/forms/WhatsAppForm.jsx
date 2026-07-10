export default function WhatsAppForm({ data, onChange }) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <label htmlFor="wa-phone" className="label">
          WhatsApp number
        </label>
        <input
          id="wa-phone"
          type="tel"
          inputMode="tel"
          placeholder="+1 555 123 4567"
          value={data.phone || ''}
          onChange={(e) => onChange({ phone: e.target.value })}
          className="input"
        />
        <p className="mt-1.5 text-xs text-ink-400">
          Include the country code, without spaces or dashes required.
        </p>
      </div>
      <div>
        <label htmlFor="wa-message" className="label">
          Pre-filled message <span className="text-ink-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="wa-message"
          rows={4}
          placeholder="Hi! I'd like to know more about…"
          value={data.message || ''}
          onChange={(e) => onChange({ message: e.target.value })}
          className="input resize-none"
        />
      </div>
    </div>
  );
}
