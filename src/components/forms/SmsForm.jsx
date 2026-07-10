export default function SmsForm({ data, onChange }) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <label htmlFor="sms-phone" className="label">
          Phone number
        </label>
        <input
          id="sms-phone"
          type="tel"
          inputMode="tel"
          placeholder="+1 555 123 4567"
          value={data.phone || ''}
          onChange={(e) => onChange({ phone: e.target.value })}
          className="input"
        />
      </div>
      <div>
        <label htmlFor="sms-message" className="label">
          Message <span className="text-ink-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="sms-message"
          rows={4}
          placeholder="Pre-filled SMS text…"
          value={data.message || ''}
          onChange={(e) => onChange({ message: e.target.value })}
          className="input resize-none"
        />
      </div>
    </div>
  );
}
