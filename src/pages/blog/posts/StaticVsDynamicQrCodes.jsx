import { Link } from 'react-router-dom';

export default function StaticVsDynamicQrCodes() {
  return (
    <>
      <p>
        Once you start looking into QR code generators, you'll run into
        the terms "static" and "dynamic" pretty quickly — usually right
        next to a paywall. Here's what the difference actually means, and
        which one you actually need, without the sales pitch.
      </p>

      <h2>Static QR codes</h2>
      <p>
        A static QR code has its content baked directly into the pattern
        itself — a URL, a WiFi password, a contact card, whatever you
        encoded. Once it's generated, that's permanent. Scan it next year
        and it does exactly the same thing it did the day you made it.
      </p>
      <p>
        <strong>The upside:</strong> it works forever, doesn't depend on
        any company's servers staying online, and is completely free to
        generate — including every QR code made on{' '}
        <Link to="/">this site</Link>.
      </p>
      <p>
        <strong>The tradeoff:</strong> if the destination changes — a new
        website address, a different WiFi password — the code you already
        printed stops being correct, and there's no way to update it
        without generating and reprinting a new one.
      </p>

      <h2>Dynamic QR codes</h2>
      <p>
        A dynamic QR code doesn't encode your actual destination — it
        encodes a short redirect link that a service controls. When
        someone scans it, that service looks up where the link should
        currently point, and sends them there. Change the destination in
        that service's dashboard, and the same printed QR code now leads
        somewhere new, with nothing to reprint.
      </p>
      <p>
        <strong>The upside:</strong> you can update the destination
        anytime, and most dynamic QR services also show you scan counts —
        useful if you're tracking how much a printed campaign is actually
        being used.
      </p>
      <p>
        <strong>The tradeoff:</strong> it depends entirely on that
        service's servers staying online. If the company shuts down, gets
        acquired, or you stop paying for the plan, every code you've
        already printed can silently stop working — which is a real risk
        if it's printed somewhere expensive or permanent, like signage or
        packaging.
      </p>

      <h2>So which one do you actually need?</h2>
      <p>
        For most individual and small business use — a WiFi password, a
        business card, a link to a page you don't expect to change, a
        WhatsApp number — a static QR code is genuinely enough, and it's
        free. The "what if I need to change it later" scenario is real,
        but rarer than the marketing around dynamic codes suggests.
      </p>
      <p>
        Dynamic codes earn their keep specifically when you need scan
        analytics, or you're printing something expensive and long-lived
        (packaging, billboards, signage) where reprinting isn't realistic
        if the destination ever needs to change.
      </p>

      <h2>Where this site fits in</h2>
      <p>
        Worth being upfront about: every QR code this site generates is
        static. That's a deliberate tradeoff, not an oversight — it's what
        keeps every type of QR code here completely free, with nothing
        that can break later because a subscription lapsed. If you need
        dynamic, scan-tracked codes for a serious campaign, that's a
        genuinely different product category, and it's fine to want that.
        For everything else — which is most day-to-day use — static is
        the simpler, more durable choice.
      </p>
    </>
  );
}
