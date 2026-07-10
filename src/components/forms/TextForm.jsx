export default function TextForm({ data, onChange }) {
  const length = (data.text || '').length;
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <label htmlFor="text-input" className="label">
          Plain text
        </label>
        <textarea
          id="text-input"
          rows={5}
          maxLength={2000}
          placeholder="Type or paste any text…"
          value={data.text || ''}
          onChange={(e) => onChange({ text: e.target.value })}
          className="input resize-none"
        />
        <p className="mt-1.5 text-xs text-ink-400">{length}/2000 characters</p>
      </div>
    </div>
  );
}
