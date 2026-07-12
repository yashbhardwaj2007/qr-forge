import { Link } from 'react-router-dom';

export default function AreQrCodesDead() {
  return (
    <>
      <p>
        For a couple of years around 2020 and 2021, QR codes were suddenly
        everywhere — taped to restaurant tables, printed on flyers, stuck to
        shop windows. Then the novelty wore off, the "contactless menu"
        jokes started, and a lot of people quietly assumed QR codes were a
        pandemic-era fad that would fade out along with hand sanitizer
        stations at the door. So — are they actually dead?
      </p>

      <p>
        Short answer: no. What actually happened is more interesting than
        "dead or not" — QR codes went from a novelty to genuinely built-in
        infrastructure, and the use cases that stuck around are the ones
        that solve a real problem, not the ones that were just trendy.
      </p>

      <h2>Why it felt like they disappeared</h2>
      <p>
        A lot of the 2020–2021 QR code boom was reactive — restaurants
        replacing printed menus because handling paper felt risky, not
        because a QR menu was actually a better experience. Once that
        pressure went away, plenty of those specific use cases went away
        with it. That's not QR codes failing; that's one particular,
        circumstantial use case fading once its reason for existing did.
      </p>
      <p>
        The bigger, quieter shift is that QR codes stopped needing a
        dedicated scanner app. Every modern iPhone and Android phone can
        scan one directly from the built-in camera — no download, no
        friction. That single change is what actually made QR codes
        durable, not the pandemic.
      </p>

      <h2>Where they genuinely still make sense</h2>
      <p>
        The uses that stuck aren't the ones that were flashy — they're the
        ones that remove real friction:
      </p>
      <ul>
        <li>
          <strong>WiFi access</strong> — handing someone a{' '}
          <Link to="/qr-code-generator/wifi">WiFi QR code</Link> instead of
          spelling out a long password character by character is just
          faster, for a guest, a café, or a short-term rental.
        </li>
        <li>
          <strong>Contact sharing</strong> — a{' '}
          <Link to="/qr-code-generator/vcard">vCard QR code</Link> on a
          conference badge or business card saves someone from typing your
          number in by hand, and nobody mistypes a digit.
        </li>
        <li>
          <strong>Starting a conversation</strong> — a{' '}
          <Link to="/qr-code-generator/whatsapp">WhatsApp QR code</Link> on
          a storefront window lets someone message you without saving your
          number first.
        </li>
        <li>
          <strong>Print-to-digital handoffs</strong> — a poster, a product
          box, or a printed instruction sheet linking to a page that's
          actually easier to update than reprinting the physical item.
        </li>
      </ul>
      <p>
        Notice the pattern: every one of these replaces something genuinely
        annoying (typing a password, saving a contact, typing a URL by
        hand) with a single scan. That's the actual test for whether a QR
        code belongs somewhere — not "is this trendy," but "does this save
        the person on the other end real effort."
      </p>

      <h2>Where they don't make sense</h2>
      <p>
        QR codes get a bad reputation when they're used for something that
        was already easy. A billboard on a highway with a QR code nobody
        can safely stop and scan. A code that just links to a homepage
        someone could've found by typing your business name into Google.
        Those aren't examples of QR codes failing — they're examples of
        using the tool for the wrong job.
      </p>

      <h2>So, are they dead?</h2>
      <p>
        No — they're just no longer a novelty, which is actually a sign of
        health, not decline. Nobody writes hot takes about whether barcodes
        are "dead" anymore either; they just quietly work, everywhere,
        because they settled into the jobs they're actually good at. QR
        codes are in roughly the same place now: less hype, more of them
        genuinely working in the background.
      </p>
    </>
  );
}
