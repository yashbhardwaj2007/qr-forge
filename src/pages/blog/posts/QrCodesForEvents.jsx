import { Link } from 'react-router-dom';

export default function QrCodesForEvents() {
  return (
    <>
      <p>
        Between the venue, the RSVP, and getting everyone's contact
        details straight, event invitations have more moving pieces than
        almost anything else people print. QR codes happen to fit this
        particular job well — here's how to actually use them across an
        invitation without overcomplicating it.
      </p>

      <h2>Directions that just work</h2>
      <p>
        A <Link to="/qr-code-generator/location">location QR code</Link>{' '}
        on the invitation opens the venue directly in Google Maps — no
        one has to type an address they might get wrong, and it works
        just as well for guests unfamiliar with the area as for locals who
        think they know a shortcut.
      </p>

      <h2>An RSVP page that's easy to update</h2>
      <p>
        A <Link to="/qr-code-generator/url">URL QR code</Link> pointing
        to an RSVP form or event page beats a "reply to this text" system
        once you're past a handful of guests — and if details change
        (time, dress code, parking), you're updating one page instead of
        re-contacting everyone individually.
      </p>

      <h2>A fast way to confirm by text</h2>
      <p>
        For smaller or more casual events, an{' '}
        <Link to="/qr-code-generator/sms">SMS QR code</Link> pre-filled
        with something like "Yes, I'll be there!" turns RSVPing into a
        single tap and send — genuinely faster than opening a form, for
        guests who'd rather not fill anything out.
      </p>

      <h2>Getting into everyone's contacts automatically</h2>
      <p>
        If you're the host and want guests to have your number on hand —
        for carpooling, questions, last-minute changes — a{' '}
        <Link to="/qr-code-generator/vcard">vCard QR code</Link> lets
        anyone save your contact details in one scan, correctly, without
        you reading out a phone number at the door.
      </p>

      <h2>Putting it together without overloading the card</h2>
      <p>
        You don't need every one of these on a single invitation — pick
        based on what guests will actually need:
      </p>
      <ul>
        <li>
          <strong>Formal event, unfamiliar venue:</strong> location code
          is the priority.
        </li>
        <li>
          <strong>Anything requiring a headcount:</strong> RSVP link or
          SMS code.
        </li>
        <li>
          <strong>Multi-day event or one with logistics questions:</strong>{' '}
          a vCard so guests can reach the host directly.
        </li>
      </ul>
      <p>
        One code per invitation is usually enough. If you genuinely need
        two, keep them visually distinct — a small label under each
        ("Directions" / "RSVP") avoids anyone scanning the wrong one and
        getting confused about what they just opened.
      </p>
    </>
  );
}
