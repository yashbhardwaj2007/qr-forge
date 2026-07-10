import { describe, it, expect } from 'vitest';
import { buildQrPayload, qrFormatters } from './qrDataFormatters.js';

describe('url formatter', () => {
  it('adds https:// when no protocol is given', () => {
    expect(qrFormatters.url({ url: 'example.com' })).toBe('https://example.com');
  });

  it('preserves an existing http:// or https:// protocol', () => {
    expect(qrFormatters.url({ url: 'http://example.com' })).toBe('http://example.com');
    expect(qrFormatters.url({ url: 'https://example.com' })).toBe('https://example.com');
  });

  it('trims whitespace', () => {
    expect(qrFormatters.url({ url: '  example.com  ' })).toBe('https://example.com');
  });

  it('returns empty string for empty input', () => {
    expect(qrFormatters.url({ url: '' })).toBe('');
    expect(qrFormatters.url({})).toBe('');
  });
});

describe('text formatter', () => {
  it('passes plain text through unchanged', () => {
    expect(qrFormatters.text({ text: 'Hello, world!' })).toBe('Hello, world!');
  });

  it('returns empty string when blank', () => {
    expect(qrFormatters.text({})).toBe('');
  });
});

describe('email formatter', () => {
  it('builds a bare mailto: with just a recipient', () => {
    expect(qrFormatters.email({ to: 'a@b.com' })).toBe('mailto:a@b.com');
  });

  it('includes subject and body as query params when present', () => {
    const result = qrFormatters.email({ to: 'a@b.com', subject: 'Hi', body: 'Test message' });
    expect(result).toBe('mailto:a@b.com?subject=Hi&body=Test+message');
  });

  it('omits the query string entirely when subject/body are absent', () => {
    expect(qrFormatters.email({ to: 'a@b.com' })).not.toContain('?');
  });
});

describe('phone formatter', () => {
  it('builds a tel: link', () => {
    expect(qrFormatters.phone({ phone: '+15551234567' })).toBe('tel:+15551234567');
  });

  it('returns empty string with no phone number', () => {
    expect(qrFormatters.phone({})).toBe('');
  });
});

describe('sms formatter', () => {
  it('builds smsto: with just a phone number', () => {
    expect(qrFormatters.sms({ phone: '+15551234567' })).toBe('smsto:+15551234567');
  });

  it('appends the message when present', () => {
    expect(qrFormatters.sms({ phone: '+15551234567', message: 'Hi' })).toBe('smsto:+15551234567:Hi');
  });

  it('returns empty string with no phone number', () => {
    expect(qrFormatters.sms({ message: 'Hi' })).toBe('');
  });
});

describe('wifi formatter', () => {
  it('builds a WPA network string with password', () => {
    const result = qrFormatters.wifi({ ssid: 'MyWifi', password: 'secret123', encryption: 'WPA' });
    expect(result).toBe('WIFI:T:WPA;S:MyWifi;P:secret123;H:false;;');
  });

  it('omits the password field entirely for an open (nopass) network', () => {
    const result = qrFormatters.wifi({ ssid: 'MyWifi', encryption: 'nopass' });
    expect(result).not.toContain('P:');
    expect(result).toBe('WIFI:T:nopass;S:MyWifi;H:false;;');
  });

  it('marks hidden networks correctly', () => {
    const result = qrFormatters.wifi({ ssid: 'MyWifi', password: 'x', encryption: 'WPA', hidden: true });
    expect(result).toContain('H:true');
  });

  it('escapes special characters in the SSID and password', () => {
    const result = qrFormatters.wifi({ ssid: 'My;Wifi', password: 'p:ss', encryption: 'WPA' });
    expect(result).toContain('My\\;Wifi');
    expect(result).toContain('p\\:ss');
  });

  it('returns empty string with no SSID', () => {
    expect(qrFormatters.wifi({ password: 'x' })).toBe('');
  });
});

describe('vcard formatter', () => {
  it('returns empty string when every field is blank', () => {
    expect(qrFormatters.vcard({})).toBe('');
    expect(qrFormatters.vcard({ firstName: '', lastName: '  ' })).toBe('');
  });

  it('builds a valid vCard when at least one field is filled', () => {
    const result = qrFormatters.vcard({ firstName: 'Jane', lastName: 'Doe' });
    expect(result).toContain('BEGIN:VCARD');
    expect(result).toContain('END:VCARD');
    expect(result).toContain('FN:Jane Doe');
  });

  it('falls back to organization for FN when no name is given', () => {
    const result = qrFormatters.vcard({ organization: 'Acme Inc.' });
    expect(result).toContain('FN:Acme Inc.');
  });

  it('escapes special characters', () => {
    const result = qrFormatters.vcard({ firstName: 'Jane;Q', lastName: 'Doe' });
    expect(result).toContain('Jane\\;Q');
  });
});

describe('whatsapp formatter', () => {
  it('strips non-digit characters from the phone number', () => {
    expect(qrFormatters.whatsapp({ phone: '+1 (555) 123-4567' })).toBe('https://wa.me/15551234567');
  });

  it('url-encodes the pre-filled message', () => {
    const result = qrFormatters.whatsapp({ phone: '15551234567', message: 'Hi there!' });
    expect(result).toBe('https://wa.me/15551234567?text=Hi%20there!');
  });

  it('returns empty string with no phone number', () => {
    expect(qrFormatters.whatsapp({ message: 'hi' })).toBe('');
  });
});

describe('location formatter', () => {
  it('prefers a text query over coordinates when both are given', () => {
    const result = qrFormatters.location({ query: 'Eiffel Tower', latitude: '1', longitude: '2' });
    expect(result).toBe('https://maps.google.com/?q=Eiffel%20Tower');
  });

  it('falls back to geo: coordinates when no query is given', () => {
    expect(qrFormatters.location({ latitude: '48.8584', longitude: '2.2945' })).toBe('geo:48.8584,2.2945');
  });

  it('returns empty string with nothing filled in', () => {
    expect(qrFormatters.location({})).toBe('');
  });
});

describe('buildQrPayload', () => {
  it('dispatches to the correct formatter based on type', () => {
    expect(buildQrPayload('url', { url: 'example.com' })).toBe('https://example.com');
    expect(buildQrPayload('text', { text: 'hi' })).toBe('hi');
  });

  it('returns empty string for an unknown type', () => {
    expect(buildQrPayload('not-a-real-type', { foo: 'bar' })).toBe('');
  });
});
