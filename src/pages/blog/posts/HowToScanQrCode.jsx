import { Link } from 'react-router-dom';

export default function HowToScanQrCode() {
  return (
    <>
      <p>
        This sounds like a strange thing to need explained in 2026, but
        it's one of the most common searches related to QR codes — because
        the answer used to genuinely require a separate app, and a lot of
        people still assume it does. It doesn't, on any phone made in the
        last several years.
      </p>

      <h2>On iPhone</h2>
      <ol>
        <li>Open the regular Camera app — not a separate scanner app.</li>
        <li>Point it at the QR code and hold steady for a second.</li>
        <li>
          A yellow banner or link preview appears at the top or bottom of
          the screen — tap it.
        </li>
      </ol>
      <p>
        That's the entire process. No download, no permissions to grant
        beyond what the Camera app already has. This has worked since
        iOS 11, so unless you're on genuinely old hardware, it's already
        built in.
      </p>

      <h2>On Android</h2>
      <p>
        Most Android phones work the same way — open Camera, point, tap
        the prompt that appears. If yours doesn't show a prompt
        automatically:
      </p>
      <ol>
        <li>
          Open Google Lens directly (either its own app, or the lens icon
          inside Google Photos or the Google app's search bar).
        </li>
        <li>Point it at the code and tap the link that appears.</li>
      </ol>
      <p>
        Because Android is made by many manufacturers, exactly where the
        scanner lives varies slightly by brand — but every phone with an
        up-to-date camera app or Google app installed can do this without
        a dedicated third-party scanner.
      </p>

      <h2>If nothing happens when you point your camera at it</h2>
      <ul>
        <li>
          <strong>Hold steadier, and check the lighting.</strong> Glare or
          a blurry hold is the most common reason a scan fails — it's a
          camera focus issue, not a broken code.
        </li>
        <li>
          <strong>Move slightly further back or closer.</strong> Camera
          autofocus sometimes needs a nudge, especially at very close
          range.
        </li>
        <li>
          <strong>Check your camera app's settings.</strong> A small
          number of phones have QR scanning turned off by default in
          Camera settings — searching your phone's settings for "scan QR
          codes" will surface the toggle if so.
        </li>
        <li>
          <strong>The code itself might genuinely be broken</strong> —
          low contrast, too small for print, or a logo covering too much
          of the pattern. If you're the one who made it, our{' '}
          <Link to="/">QR code generator</Link> automatically checks
          whether a freshly generated code is actually scannable before
          you download it, specifically to catch this.
        </li>
      </ul>

      <h2>Prefer scanning from your computer instead?</h2>
      <p>
        If you're trying to scan a code that's displayed on a screen (a
        presentation, a webpage) rather than printed somewhere, a laptop
        webcam works too — our free{' '}
        <Link to="/qr-code-scanner">QR code scanner</Link> lets you scan
        live via your camera, or upload a screenshot or photo containing a
        code, directly in the browser.
      </p>
    </>
  );
}
