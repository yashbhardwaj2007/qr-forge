import { describe, it, expect } from 'vitest';
import { classifyScanResult } from './scanResultUtils.js';

describe('classifyScanResult', () => {
  it('classifies http(s) URLs as openable links', () => {
    expect(classifyScanResult('https://example.com')).toEqual({
      type: 'URL',
      action: 'open',
      href: 'https://example.com',
    });
    expect(classifyScanResult('http://example.com').type).toBe('URL');
  });

  it('classifies wa.me links as WhatsApp', () => {
    expect(classifyScanResult('https://wa.me/15551234567').type).toBe('WhatsApp link');
  });

  it('classifies mailto: links as Email', () => {
    expect(classifyScanResult('mailto:a@b.com').type).toBe('Email');
  });

  it('classifies tel: links as Phone number', () => {
    expect(classifyScanResult('tel:+15551234567').type).toBe('Phone number');
  });

  it('classifies smsto:/sms: links as SMS', () => {
    expect(classifyScanResult('smsto:+15551234567:hi').type).toBe('SMS');
    expect(classifyScanResult('sms:+15551234567').type).toBe('SMS');
  });

  it('classifies geo: links as Location', () => {
    expect(classifyScanResult('geo:48.8584,2.2945').type).toBe('Location');
  });

  it('classifies WIFI: strings as a WiFi network requiring copy, not open', () => {
    const result = classifyScanResult('WIFI:T:WPA;S:MyWifi;P:pass;;');
    expect(result.type).toBe('WiFi network');
    expect(result.action).toBe('copy');
    expect(result.href).toBeNull();
  });

  it('classifies BEGIN:VCARD as a contact card requiring copy, not open', () => {
    const result = classifyScanResult('BEGIN:VCARD\nVERSION:3.0\nEND:VCARD');
    expect(result.type).toBe('Contact card (vCard)');
    expect(result.action).toBe('copy');
  });

  it('falls back to plain Text for anything unrecognized', () => {
    const result = classifyScanResult('just some random scanned text');
    expect(result.type).toBe('Text');
    expect(result.action).toBe('copy');
  });

  it('handles empty/undefined input without throwing', () => {
    expect(() => classifyScanResult('')).not.toThrow();
    expect(() => classifyScanResult(undefined)).not.toThrow();
    expect(classifyScanResult('').type).toBe('Text');
  });

  it('is case-insensitive for prefixes', () => {
    expect(classifyScanResult('HTTPS://EXAMPLE.COM').type).toBe('URL');
    expect(classifyScanResult('wifi:T:WPA;S:x;;').type).toBe('WiFi network');
  });
});
