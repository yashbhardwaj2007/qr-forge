import { Link } from 'react-router-dom';

export default function EmailPhoneSmsQrCodes() {
  return (
    <>
      <p>
        If you want someone to reach you after scanning a code, there are
        three obvious options — email, phone call, or text message — and
        it's not always obvious which one to pick. They're not
        interchangeable; each one sets a different expectation for how
        quickly someone will hear back from you.
      </p>

      <h2>Email QR codes</h2>
      <p>
        An <Link to="/qr-code-generator/email">email QR code</Link> opens a
        pre-addressed draft in the scanner's email app — recipient filled
        in, and optionally a subject line and message too.
      </p>
      <p>
        <strong>Best for:</strong> anything that isn't urgent, or that
        benefits from a written record — support requests, applications,
        detailed questions, business inquiries. Email sets the expectation
        of a reply within hours or days, not minutes.
      </p>

      <h2>Phone QR codes</h2>
      <p>
        A <Link to="/qr-code-generator/phone">phone QR code</Link> opens
        the dialer with your number already entered — one tap to call, no
        digits to type or mistype.
      </p>
      <p>
        <strong>Best for:</strong> anything where a real-time conversation
        is genuinely faster than typing — booking something last-minute,
        urgent support, sales calls. It's also the most immediate option:
        there's no "maybe they'll see it later," someone either calls or
        they don't.
      </p>

      <h2>SMS QR codes</h2>
      <p>
        An <Link to="/qr-code-generator/sms">SMS QR code</Link> opens a
        pre-addressed text message, optionally with the message text
        already written — the person just has to review and hit send.
      </p>
      <p>
        <strong>Best for:</strong> the middle ground — faster and more
        casual than email, but doesn't demand a live conversation like a
        phone call does. Good for opt-ins, quick confirmations, or a "text
        us and we'll get back to you" flow that people are more likely to
        actually complete than a phone call.
      </p>

      <h2>Quick way to decide</h2>
      <ul>
        <li>Need a written record, or the request has some detail to it? → Email.</li>
        <li>Need an answer right now, and a call is genuinely faster? → Phone.</li>
        <li>Want the lowest-friction way for someone to reach out casually? → SMS.</li>
      </ul>
      <p>
        And if you want to remove even more friction from the "text me"
        option specifically, a{' '}
        <Link to="/qr-code-generator/whatsapp">WhatsApp QR code</Link> is
        worth considering too — same idea as SMS, but for the messaging
        app a lot of people already default to.
      </p>

      <h2>One code doesn't have to be your only option</h2>
      <p>
        Nothing stops you from offering more than one — a business card
        with both a phone QR code and an email QR code lets the other
        person choose based on how urgent their reason for reaching out
        is. The goal either way is the same: whichever option you pick
        should remove typing, not just move it from a keyboard to a phone
        screen.
      </p>
    </>
  );
}
