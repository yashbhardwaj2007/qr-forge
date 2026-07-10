/**
 * Content for each QR type's dedicated landing page
 * (src/pages/QRTypeLanding.jsx, routed at /qr-code-generator/:type).
 *
 * Keeping this as data (rather than 9 separate page components) means the
 * actual page layout/logic lives in one place, while each type still gets
 * genuinely different, non-templated copy for SEO — not just the same
 * paragraph with a word swapped in.
 */
export const QR_TYPE_CONTENT = {
  url: {
    metaTitle: 'URL QR Code Generator — Turn Any Link Into a QR Code',
    metaDescription:
      'Create a free QR code for any website URL. Customize colors and size, add your logo, and download in PNG, SVG, or JPEG — instantly, in your browser.',
    h1: 'URL QR Code Generator',
    intro:
      "Turn any web address into a scannable QR code — a landing page, product listing, portfolio, or social profile. Point a phone camera at it and the link opens immediately, no app or typing required.",
    useCases: [
      'Linking a printed flyer or poster to your website',
      'Sharing a portfolio or menu without typing a long URL',
      'Product packaging that links to a demo, manual, or store page',
      'Business cards that link straight to your site',
    ],
    faqs: [
      {
        q: 'Does the URL QR code expire?',
        a: "No. The link is encoded directly into the QR image itself, so it works for as long as the destination URL exists — there's no expiration tied to this tool.",
      },
      {
        q: 'What happens if I change the destination page later?',
        a: 'A static URL QR code always points to the exact address you entered. If you need the same code to redirect to a different page later without reprinting it, you need a "dynamic" QR code with a redirect service in between — not something this free tool provides today.',
      },
    ],
  },
  text: {
    metaTitle: 'Text QR Code Generator — Encode Plain Text Into a QR Code',
    metaDescription:
      'Generate a free QR code containing plain text — notes, instructions, or a short message. Customize the design and download instantly.',
    h1: 'Text QR Code Generator',
    intro:
      'Encode any plain text — a note, instructions, a quote, or a short message — directly into a QR code. Scanning it displays the text immediately, with nothing to open or download.',
    useCases: [
      'Instructions or care labels on products or packaging',
      'A short message on an invitation or greeting card',
      'Event or venue information printed on signage',
      'Quick reference notes for equipment or displays',
    ],
    faqs: [
      {
        q: 'Is there a length limit for text QR codes?',
        a: "Practically, yes — very long text needs a much denser QR code, which becomes harder to scan reliably, especially at small print sizes. Keep it to a short paragraph or less, and use the 'High' error-correction level if it needs to be dense.",
      },
      {
        q: "What's the difference between a text QR code and a URL QR code?",
        a: "A text QR code just displays the text you typed when scanned. A URL QR code instead opens that link directly in a browser. Use text when you want the reader to see information immediately without leaving their camera app.",
      },
    ],
  },
  email: {
    metaTitle: 'Email QR Code Generator — Pre-Fill an Email in One Scan',
    metaDescription:
      'Create a free QR code that opens a pre-filled email — recipient, subject, and message included. Perfect for business cards, flyers, and signage.',
    h1: 'Email QR Code Generator',
    intro:
      "Generate a QR code that opens the scanner's email app with the recipient, subject, and message already filled in. It saves the reader from typing your address correctly, and lets you pre-write the subject line.",
    useCases: [
      'Business cards with a one-scan "email me" shortcut',
      'Event signage collecting RSVPs',
      'Support or feedback prompts on packaging',
      'Job postings with a pre-filled application email',
    ],
    faqs: [
      {
        q: 'Will the email actually send when scanned?',
        a: "No — scanning opens a draft in the reader's own email app with the fields pre-filled. They still need to review it and hit send, so nothing is sent automatically.",
      },
      {
        q: 'Can I pre-fill the subject and message too?',
        a: 'Yes — both are optional fields in the form above. Leave them blank if you only want to pre-fill the recipient address.',
      },
    ],
  },
  phone: {
    metaTitle: 'Phone Number QR Code Generator — Tap to Call',
    metaDescription:
      'Generate a free QR code that starts a phone call when scanned. Great for business cards, storefronts, and support signage.',
    h1: 'Phone Number QR Code Generator',
    intro:
      "Create a QR code that opens the phone dialer with your number already entered — the reader just has to tap call. No mistyped digits, no saving a contact first.",
    useCases: [
      'Storefront or vehicle signage for a "call us" number',
      'Business cards and printed ads',
      'Support hotlines on product packaging',
      "Real estate signs linking to an agent's phone",
    ],
    faqs: [
      {
        q: 'Does this work on both iPhone and Android?',
        a: "Yes — it uses the standard tel: link format, which every modern phone's default camera app recognizes and hands off to the dialer.",
      },
      {
        q: 'Should I include the country code?',
        a: "Yes, especially if the code might be scanned by people outside your country. A number like +1 555 123 4567 will dial correctly everywhere; a local-format number might not.",
      },
    ],
  },
  sms: {
    metaTitle: 'SMS QR Code Generator — Pre-Fill a Text Message',
    metaDescription:
      'Create a free QR code that opens a pre-addressed, pre-filled text message. Ideal for marketing campaigns, RSVPs, and quick sign-ups.',
    h1: 'SMS QR Code Generator',
    intro:
      "Generate a QR code that opens the reader's messaging app with your number and an optional pre-written message ready to send — useful for opt-ins, RSVPs, or quick replies.",
    useCases: [
      'Text-to-join marketing or loyalty programs',
      'Event RSVPs via text',
      'Quick customer support "text us" prompts',
      'Contest or giveaway entries',
    ],
    faqs: [
      {
        q: 'Does the text send automatically when scanned?',
        a: "No — it opens a draft message in the reader's own messaging app, pre-addressed and optionally pre-filled. They still have to press send.",
      },
      {
        q: 'Can I leave the message blank?',
        a: 'Yes — the message field is optional. Leaving it blank just pre-fills the recipient number, letting the reader write their own text.',
      },
    ],
  },
  wifi: {
    metaTitle: 'WiFi QR Code Generator — Connect Without Typing a Password',
    metaDescription:
      'Generate a free WiFi QR code so guests can connect instantly by scanning — no typing a password. Works with WPA/WPA2/WPA3 and open networks.',
    h1: 'WiFi QR Code Generator',
    intro:
      'Create a QR code that connects a phone straight to your WiFi network when scanned — no typing a long, awkward password. Perfect for guests, cafés, offices, and short-term rentals.',
    useCases: [
      'A framed card at the entrance of a café or Airbnb',
      'Office guest WiFi without asking IT for the password',
      'Event venues with a temporary guest network',
      'Waiting rooms or clinics offering free WiFi',
    ],
    faqs: [
      {
        q: 'Is my WiFi password sent anywhere?',
        a: "No. The network name and password are encoded directly into the QR image in your browser — never uploaded or transmitted. That's also why the history feature strips saved logos/branding from WiFi entries before storing them.",
      },
      {
        q: 'Does this work with WPA3 networks?',
        a: 'Yes — select "WPA / WPA2 / WPA3" as the security type; scanners handle the specific WPA version automatically. Only pick "WEP" if your router specifically uses that older standard.',
      },
      {
        q: 'What if my network has no password?',
        a: 'Choose "No password" as the security type — the generated code will let devices join an open network without prompting for one.',
      },
    ],
  },
  vcard: {
    metaTitle: 'vCard QR Code Generator — Share Your Contact Card Instantly',
    metaDescription:
      'Create a free vCard QR code with your name, phone, email, and company. Scanning it lets people save your contact details in one tap.',
    h1: 'vCard QR Code Generator',
    intro:
      "Generate a QR code containing your full contact card — name, phone, email, company, and website. Scanning it offers to save everything directly into the reader's contacts app, with no manual typing.",
    useCases: [
      'Business cards or lanyards at conferences and networking events',
      'Email signatures linking to a scannable contact card',
      'Real estate agents and freelancers sharing contact info quickly',
      'Trade show booths collecting fewer typos in follow-ups',
    ],
    faqs: [
      {
        q: 'What fields are required?',
        a: "None are strictly required by the format, but at least a name, phone number, or email is what makes the card useful — an empty vCard won't generate a code at all.",
      },
      {
        q: 'Will this work with both iPhone and Android contacts apps?',
        a: 'Yes — it uses the standard vCard 3.0 format, which both major contacts apps recognize and offer to import automatically.',
      },
    ],
  },
  whatsapp: {
    metaTitle: 'WhatsApp QR Code Generator — Start a Chat Instantly',
    metaDescription:
      'Generate a free WhatsApp QR code that opens a chat with your number pre-filled, with an optional pre-written message. Great for customer support and sales.',
    h1: 'WhatsApp QR Code Generator',
    intro:
      "Create a QR code that opens WhatsApp with a chat to your number already started — optionally with a pre-written message. No saving your number as a contact first.",
    useCases: [
      'Customer support "chat with us" prompts on packaging or receipts',
      'Sales inquiries from a storefront window or menu',
      'Community or group invites at events',
      'Freelancers and small businesses taking orders via WhatsApp',
    ],
    faqs: [
      {
        q: 'Does the reader need my number saved as a contact first?',
        a: "No — that's the entire point. Scanning the code opens a chat with your number directly, without the reader needing to save it first.",
      },
      {
        q: 'Do I need the country code?',
        a: 'Yes — WhatsApp requires the full international number (e.g. +1 555 123 4567) for this kind of link to work correctly.',
      },
    ],
  },
  location: {
    metaTitle: 'Location QR Code Generator — Share a Map Pin Instantly',
    metaDescription:
      'Create a free QR code that opens a specific location in Google Maps. Great for event venues, storefronts, and printed directions.',
    h1: 'Location QR Code Generator',
    intro:
      'Generate a QR code that opens a specific address or coordinates directly in Google Maps when scanned — useful for directing people to a venue without them typing an address.',
    useCases: [
      'Event invitations with a scan-to-navigate venue pin',
      'Printed flyers or signage directing people to a storefront',
      'Wedding invitations linking to the venue',
      'Delivery or pickup instructions with an exact pin',
    ],
    faqs: [
      {
        q: 'Should I use an address or coordinates?',
        a: 'An address (or place name) is usually easier and works well for most locations. Use exact latitude/longitude coordinates instead for a precise pin — for example, a spot with no street address.',
      },
      {
        q: 'Does it open Google Maps specifically?',
        a: 'It links to Google Maps, which most Android and iPhone browsers open directly; on some devices it may open in a browser tab first depending on installed apps and default settings.',
      },
    ],
  },
};

export const QR_TYPE_SLUGS = Object.keys(QR_TYPE_CONTENT);
