/**
 * Classifies raw decoded QR text into a friendly type + the most useful
 * action for that type, so the scanner can show "Open link" for a URL but
 * "Copy" for plain text, "Call" for a phone number, and so on.
 */
export function classifyScanResult(raw) {
  const text = (raw || '').trim();

  // Checked before the generic URL match below, since a wa.me/whatsapp.com
  // link also starts with https:// and would otherwise always be caught
  // by the more general rule first.
  if (/^https?:\/\/(wa\.me\/|(api\.)?whatsapp\.com)/i.test(text)) {
    return { type: 'WhatsApp link', action: 'open', href: text };
  }
  if (/^https?:\/\//i.test(text)) {
    return { type: 'URL', action: 'open', href: text };
  }
  if (/^mailto:/i.test(text)) {
    return { type: 'Email', action: 'open', href: text };
  }
  if (/^tel:/i.test(text)) {
    return { type: 'Phone number', action: 'open', href: text };
  }
  if (/^smsto:|^sms:/i.test(text)) {
    return { type: 'SMS', action: 'open', href: text };
  }
  if (/^geo:/i.test(text)) {
    return { type: 'Location', action: 'open', href: text };
  }
  if (/^WIFI:/i.test(text)) {
    return { type: 'WiFi network', action: 'copy', href: null };
  }
  if (/^BEGIN:VCARD/i.test(text)) {
    return { type: 'Contact card (vCard)', action: 'copy', href: null };
  }

  return { type: 'Text', action: 'copy', href: null };
}
