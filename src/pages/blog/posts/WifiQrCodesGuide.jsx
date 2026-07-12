import { Link } from 'react-router-dom';

export default function WifiQrCodesGuide() {
  return (
    <>
      <p>
        If you've ever watched a guest squint at a router label and type a
        16-character WiFi password one character at a time, you already
        understand the entire pitch for WiFi QR codes. This is the single
        most practical, least gimmicky use of QR codes there is — no
        marketing angle, just a genuinely faster way to get someone
        connected.
      </p>

      <h2>How it actually works</h2>
      <p>
        A WiFi QR code doesn't link to a website. It encodes your network
        name and password directly, in a format phones recognize
        natively. Scan it with a modern iPhone or Android camera, and
        you'll get a one-tap "Join Network" prompt — no app, no typing, no
        chance of a mistyped character breaking the connection.
      </p>
      <p>
        You can make one on the{' '}
        <Link to="/qr-code-generator/wifi">WiFi QR code generator</Link> in
        under a minute — enter your network name, password, and security
        type, and it's ready to print or display on a screen.
      </p>

      <h2>Where this is genuinely worth setting up</h2>
      <ul>
        <li>
          <strong>Cafés and coworking spaces</strong> — a small printed
          card at the counter or on each table beats a chalkboard with a
          password nobody can read from across the room.
        </li>
        <li>
          <strong>Airbnbs and short-term rentals</strong> — guests connect
          the moment they walk in, without a text message exchange about
          the password.
        </li>
        <li>
          <strong>Offices with guest networks</strong> — visitors and
          clients get online without pulling in IT, and you're not
          reading a password out loud in a meeting.
        </li>
        <li>
          <strong>Waiting rooms and clinics</strong> — a small, one-time
          setup that removes a recurring front-desk question.
        </li>
      </ul>

      <h2>A few things worth knowing before you print one</h2>
      <p>
        <strong>Pick the right security type.</strong> Most home and
        business routers today use WPA, WPA2, or WPA3 — if you're not
        sure which, "WPA/WPA2/WPA3" is almost always the right choice.
        Only pick "WEP" if you know your router specifically uses that
        older standard, and pick "No password" only for a genuinely open
        network.
      </p>
      <p>
        <strong>Test it before you print a stack of them.</strong> Scan
        your own code with two different phones first. It takes ten
        seconds and saves you from reprinting fifty table cards because of
        a typo in the password field.
      </p>
      <p>
        <strong>Your password is encoded, not encrypted.</strong> Anyone
        who scans the code can see your network password in plain form —
        which is exactly what you want for a guest network, but worth
        remembering if you're tempted to reuse a more sensitive password
        for convenience. For a guest-facing QR code, it's worth using a
        separate guest network entirely if your router supports one.
      </p>
      <p>
        One more practical note: this kind of QR code is generated and
        decoded entirely in your browser — the password never gets sent
        to or stored on a server, which matters if you'd rather not have
        your network credentials sitting in someone else's database
        somewhere.
      </p>

      <h2>The bottom line</h2>
      <p>
        WiFi QR codes are one of the few "QR code use cases" that hold up
        completely on their own merits — no trend, no hype, just a
        genuinely better way to hand someone your password. If you run
        any kind of space where people need to get online quickly, it's
        worth the sixty seconds it takes to set one up.
      </p>
    </>
  );
}
