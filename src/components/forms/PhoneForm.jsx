export default function PhoneForm({ data, onChange }) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <label htmlFor="phone-input" className="label">
          Phone number
        </label>
        <input
          id="phone-input"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+1 555 123 4567"
          value={data.phone || ''}
          onChange={(e) => onChange({ phone: e.target.value })}
          className="input"
        />
        <p className="mt-1.5 text-xs text-ink-400">Include the country code for best results.</p>
      </div>
    </div>
  );
}
