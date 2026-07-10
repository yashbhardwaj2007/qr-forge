export default function UrlForm({ data, onChange }) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <label htmlFor="url-input" className="label">
          Website URL
        </label>
        <input
          id="url-input"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="https://example.com"
          value={data.url || ''}
          onChange={(e) => onChange({ url: e.target.value })}
          className="input"
        />
        <p className="mt-1.5 text-xs text-ink-400">
          We'll automatically add "https://" if you leave it out.
        </p>
      </div>
    </div>
  );
}
