/**
 * Converts type-specific form field values into the raw string payload
 * that gets encoded into the QR code, following each format's spec.
 */

function escapeVCard(str = '') {
  return String(str).replace(/([,;\\])/g, '\\$1');
}

function escapeWifi(str = '') {
  return String(str).replace(/([\\;,":])/g, '\\$1');
}

export const qrFormatters = {
  url: (data) => {
    const value = (data.url || '').trim();
    if (!value) return '';
    return /^https?:\/\//i.test(value) ? value : `https://${value}`;
  },

  text: (data) => data.text || '',

  email: (data) => {
    const { to = '', subject = '', body = '' } = data;
    const params = new URLSearchParams();
    if (subject) params.set('subject', subject);
    if (body) params.set('body', body);
    const query = params.toString();
    return `mailto:${to}${query ? `?${query}` : ''}`;
  },

  phone: (data) => (data.phone ? `tel:${data.phone.trim()}` : ''),

  sms: (data) => {
    const { phone = '', message = '' } = data;
    if (!phone) return '';
    return message ? `smsto:${phone}:${message}` : `smsto:${phone}`;
  },

  wifi: (data) => {
    const { ssid = '', password = '', encryption = 'WPA', hidden = false } = data;
    if (!ssid) return '';
    const enc = encryption === 'nopass' ? 'nopass' : encryption;
    return `WIFI:T:${enc};S:${escapeWifi(ssid)};${
      enc === 'nopass' ? '' : `P:${escapeWifi(password)};`
    }H:${hidden ? 'true' : 'false'};;`;
  },

  vcard: (data) => {
    const {
      firstName = '',
      lastName = '',
      organization = '',
      title = '',
      phone = '',
      email = '',
      website = '',
      address = '',
    } = data;

    // A vCard with no identifying info at all is useless — don't emit a
    // "valid-looking" QR code the moment the user switches to this tab.
    const hasContent = [firstName, lastName, organization, phone, email, website, address].some(
      (v) => v.trim?.()
    );
    if (!hasContent) return '';

    return [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${escapeVCard(lastName)};${escapeVCard(firstName)};;;`,
      `FN:${escapeVCard(`${firstName} ${lastName}`.trim() || organization)}`,
      organization ? `ORG:${escapeVCard(organization)}` : '',
      title ? `TITLE:${escapeVCard(title)}` : '',
      phone ? `TEL;TYPE=CELL:${phone}` : '',
      email ? `EMAIL:${email}` : '',
      website ? `URL:${website}` : '',
      address ? `ADR:;;${escapeVCard(address)};;;;` : '',
      'END:VCARD',
    ]
      .filter(Boolean)
      .join('\n');
  },

  whatsapp: (data) => {
    const { phone = '', message = '' } = data;
    if (!phone) return '';
    const cleanPhone = phone.replace(/[^\d]/g, '');
    const params = message ? `?text=${encodeURIComponent(message)}` : '';
    return `https://wa.me/${cleanPhone}${params}`;
  },

  location: (data) => {
    const { latitude = '', longitude = '', query = '' } = data;
    if (query) return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
    if (latitude && longitude) return `geo:${latitude},${longitude}`;
    return '';
  },
};

export function buildQrPayload(type, data) {
  const formatter = qrFormatters[type];
  return formatter ? formatter(data) : '';
}
