export default function LocationForm({ data, onChange }) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <label htmlFor="loc-query" className="label">
          Place name or address
        </label>
        <input
          id="loc-query"
          type="text"
          placeholder="Eiffel Tower, Paris"
          value={data.query || ''}
          onChange={(e) => onChange({ query: e.target.value })}
          className="input"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-ink-200 dark:bg-ink-700" />
        <span className="text-xs text-ink-400">OR use coordinates</span>
        <div className="h-px flex-1 bg-ink-200 dark:bg-ink-700" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="loc-lat" className="label">
            Latitude
          </label>
          <input
            id="loc-lat"
            type="text"
            inputMode="decimal"
            placeholder="48.8584"
            value={data.latitude || ''}
            onChange={(e) => onChange({ latitude: e.target.value })}
            className="input"
          />
        </div>
        <div>
          <label htmlFor="loc-lng" className="label">
            Longitude
          </label>
          <input
            id="loc-lng"
            type="text"
            inputMode="decimal"
            placeholder="2.2945"
            value={data.longitude || ''}
            onChange={(e) => onChange({ longitude: e.target.value })}
            className="input"
          />
        </div>
      </div>
    </div>
  );
}
