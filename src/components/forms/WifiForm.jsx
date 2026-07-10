import { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export default function WifiForm({ data, onChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const encryption = data.encryption || 'WPA';

  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <label htmlFor="wifi-ssid" className="label">
          Network name (SSID)
        </label>
        <input
          id="wifi-ssid"
          type="text"
          placeholder="MyHomeWiFi"
          value={data.ssid || ''}
          onChange={(e) => onChange({ ssid: e.target.value })}
          className="input"
        />
      </div>

      <div>
        <label htmlFor="wifi-encryption" className="label">
          Security
        </label>
        <select
          id="wifi-encryption"
          value={encryption}
          onChange={(e) => onChange({ encryption: e.target.value })}
          className="input"
        >
          <option value="WPA">WPA / WPA2 / WPA3</option>
          <option value="WEP">WEP</option>
          <option value="nopass">No password</option>
        </select>
      </div>

      {encryption !== 'nopass' && (
        <div>
          <label htmlFor="wifi-password" className="label">
            Password
          </label>
          <div className="relative">
            <input
              id="wifi-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="off"
              placeholder="Network password"
              value={data.password || ''}
              onChange={(e) => onChange({ password: e.target.value })}
              className="input pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-brand-600"
            >
              {showPassword ? <HiEyeOff size={18} aria-hidden="true" /> : <HiEye size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
      )}

      <label className="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-300">
        <input
          type="checkbox"
          checked={!!data.hidden}
          onChange={(e) => onChange({ hidden: e.target.checked })}
          className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
        />
        This is a hidden network
      </label>
    </div>
  );
}
