export default function VCardForm({ data, onChange }) {
  const field = (key) => ({
    value: data[key] || '',
    onChange: (e) => onChange({ [key]: e.target.value }),
  });

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="vc-first" className="label">
            First name
          </label>
          <input id="vc-first" type="text" placeholder="Jane" className="input" {...field('firstName')} />
        </div>
        <div>
          <label htmlFor="vc-last" className="label">
            Last name
          </label>
          <input id="vc-last" type="text" placeholder="Doe" className="input" {...field('lastName')} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="vc-org" className="label">
            Organization
          </label>
          <input id="vc-org" type="text" placeholder="Acme Inc." className="input" {...field('organization')} />
        </div>
        <div>
          <label htmlFor="vc-title" className="label">
            Job title
          </label>
          <input id="vc-title" type="text" placeholder="Product Designer" className="input" {...field('title')} />
        </div>
      </div>

      <div>
        <label htmlFor="vc-phone" className="label">
          Phone
        </label>
        <input id="vc-phone" type="tel" placeholder="+1 555 123 4567" className="input" {...field('phone')} />
      </div>

      <div>
        <label htmlFor="vc-email" className="label">
          Email
        </label>
        <input id="vc-email" type="email" placeholder="jane@example.com" className="input" {...field('email')} />
      </div>

      <div>
        <label htmlFor="vc-website" className="label">
          Website
        </label>
        <input id="vc-website" type="text" placeholder="https://example.com" className="input" {...field('website')} />
      </div>

      <div>
        <label htmlFor="vc-address" className="label">
          Address
        </label>
        <input id="vc-address" type="text" placeholder="123 Main St, City, Country" className="input" {...field('address')} />
      </div>
    </div>
  );
}
