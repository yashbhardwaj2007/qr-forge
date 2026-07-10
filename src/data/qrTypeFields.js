/**
 * Maps each QR type to the CSV columns bulk generation expects. These are
 * exactly the same field names src/utils/qrDataFormatters.js already reads
 * for that type — bulk generation just calls buildQrPayload(type, row) per
 * CSV row, so there's no separate payload-building logic to maintain here.
 */
export const BULK_FIELD_CONFIG = {
  url: {
    columns: ['name', 'url'],
    required: ['url'],
    example: [{ name: 'Homepage', url: 'https://example.com' }],
  },
  text: {
    columns: ['name', 'text'],
    required: ['text'],
    example: [{ name: 'Note 1', text: 'Hello, world!' }],
  },
  email: {
    columns: ['name', 'to', 'subject', 'body'],
    required: ['to'],
    example: [{ name: 'Support', to: 'support@example.com', subject: 'Help', body: '' }],
  },
  phone: {
    columns: ['name', 'phone'],
    required: ['phone'],
    example: [{ name: 'Front Desk', phone: '+15551234567' }],
  },
  sms: {
    columns: ['name', 'phone', 'message'],
    required: ['phone'],
    example: [{ name: 'Text Us', phone: '+15551234567', message: 'Hi!' }],
  },
  wifi: {
    columns: ['name', 'ssid', 'password', 'encryption', 'hidden'],
    required: ['ssid'],
    example: [{ name: 'Guest WiFi', ssid: 'MyNetwork', password: 'password123', encryption: 'WPA', hidden: 'false' }],
  },
  vcard: {
    columns: ['name', 'firstName', 'lastName', 'organization', 'title', 'phone', 'email', 'website', 'address'],
    required: [],
    example: [
      {
        name: 'Jane Doe',
        firstName: 'Jane',
        lastName: 'Doe',
        organization: 'Acme Inc.',
        title: 'Designer',
        phone: '+15551234567',
        email: 'jane@example.com',
        website: '',
        address: '',
      },
    ],
  },
  whatsapp: {
    columns: ['name', 'phone', 'message'],
    required: ['phone'],
    example: [{ name: 'Sales', phone: '15551234567', message: 'Hi, I have a question' }],
  },
  location: {
    columns: ['name', 'query', 'latitude', 'longitude'],
    required: [],
    example: [{ name: 'HQ', query: 'Eiffel Tower, Paris', latitude: '', longitude: '' }],
  },
};

/** Builds a downloadable example CSV string for the given type. */
export function buildExampleCsv(type) {
  const config = BULK_FIELD_CONFIG[type];
  if (!config) return '';
  const header = config.columns.join(',');
  const rows = config.example.map((row) => config.columns.map((col) => row[col] ?? '').join(','));
  return [header, ...rows].join('\n');
}
