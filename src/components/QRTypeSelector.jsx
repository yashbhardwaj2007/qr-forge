import { memo } from 'react';
import {
  HiOutlineLink,
  HiOutlineDocumentText,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineChatAlt2,
  HiOutlineWifi,
  HiOutlineIdentification,
  HiOutlineLocationMarker,
} from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

export const QR_TYPES = [
  { id: 'url', label: 'URL', icon: HiOutlineLink },
  { id: 'text', label: 'Text', icon: HiOutlineDocumentText },
  { id: 'email', label: 'Email', icon: HiOutlineMail },
  { id: 'phone', label: 'Phone', icon: HiOutlinePhone },
  { id: 'sms', label: 'SMS', icon: HiOutlineChatAlt2 },
  { id: 'wifi', label: 'WiFi', icon: HiOutlineWifi },
  { id: 'vcard', label: 'vCard', icon: HiOutlineIdentification },
  { id: 'whatsapp', label: 'WhatsApp', icon: FaWhatsapp },
  { id: 'location', label: 'Location', icon: HiOutlineLocationMarker },
];

function QRTypeSelector({ active, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="QR code type"
      className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2"
    >
      {QR_TYPES.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            id={`qr-type-tab-${id}`}
            aria-selected={isActive}
            aria-controls="qr-type-panel"
            onClick={() => onChange(id)}
            className={`group flex flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-medium transition-all duration-200 ${
              isActive
                ? 'border-transparent bg-gradient-to-br from-brand-600 to-purple-600 text-white shadow-glow'
                : 'border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-300 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400'
            }`}
          >
            <Icon size={18} aria-hidden="true" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default memo(QRTypeSelector);
