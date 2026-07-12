import { Link } from 'react-router-dom';

export default function QrCodeBusinessCard() {
  return (
    <>
      <p>
        Adding a QR code to a business card is an easy call — it's the{' '}
        <em>what should the code actually contain</em> part where most
        people get stuck. There are two reasonable answers, and they do
        genuinely different jobs.
      </p>

      <h2>Option 1: A vCard QR code</h2>
      <p>
        A <Link to="/qr-code-generator/vcard">vCard QR code</Link> encodes
        your actual contact details — name, phone, email, company — as a
        file. Scanning it prompts the other person to save you directly
        into their phone's contacts app, with everything filled in
        correctly.
      </p>
      <p>
        <strong>Use this when</strong> the goal is genuinely getting into
        someone's contacts, not just their browser history. It's the
        better choice at conferences, trade shows, and networking events —
        anywhere you're meeting a lot of people quickly and the realistic
        alternative is them typing your number into their phone by hand,
        or more likely, not bothering at all.
      </p>

      <h2>Option 2: A URL QR code</h2>
      <p>
        A <Link to="/qr-code-generator/url">URL QR code</Link> just opens
        a link — your website, portfolio, LinkedIn, or a dedicated landing
        page about you.
      </p>
      <p>
        <strong>Use this when</strong> you want someone to see more than
        contact details — your work, your case studies, a booking page, a
        portfolio. A URL is also the right call if you want to change the
        destination later without reprinting cards, by pointing it at a
        page you control and can update anytime, rather than baking static
        information directly into the code.
      </p>

      <h2>Which one should you actually pick?</h2>
      <p>
        If you had to pick just one: for most people, a vCard is the more
        useful default on a physical business card, because the entire
        point of a business card is getting into someone's contacts. A
        link to your website is one extra step away from the outcome you
        actually want.
      </p>
      <p>
        The exception is anyone whose work is genuinely better represented
        by a page than a contact card — designers, photographers,
        agencies — where seeing the work matters more than saving a phone
        number on the spot.
      </p>
      <p>
        There's also nothing stopping you from using both: a vCard code on
        the front of the card, and a small URL code on the back linking to
        your portfolio. Physical cards have room for more than one, and
        each code can be sized to stay easily scannable even at a couple
        of centimeters wide.
      </p>

      <h2>A couple of practical print tips</h2>
      <ul>
        <li>
          Keep the code at least 1.5–2 cm square on a standard business
          card — smaller than that and phone cameras start struggling,
          especially under bad lighting at a crowded event.
        </li>
        <li>
          Use a high error-correction level if you're adding a logo to the
          center of the code, and always test-scan the final printed card
          before ordering a full batch.
        </li>
        <li>
          Stick to strong contrast — dark code on a light background (or
          vice versa) — rather than a color combination that looks nice
          but is hard for a camera to read.
        </li>
      </ul>
    </>
  );
}
