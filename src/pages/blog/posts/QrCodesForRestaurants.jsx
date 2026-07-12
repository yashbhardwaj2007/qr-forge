import { Link } from 'react-router-dom';

export default function QrCodesForRestaurants() {
  return (
    <>
      <p>
        Restaurants were ground zero for the QR code boom, and also where
        most of the backlash started — mainly because a lot of restaurants
        used a QR code as the <em>entire</em> menu experience, with no
        paper option and no easy way back. Used well, though, QR codes
        still solve real problems for a restaurant. Here's where they
        actually help.
      </p>

      <h2>WiFi, without the "ask your server" ritual</h2>
      <p>
        A small <Link to="/qr-code-generator/wifi">WiFi QR code</Link> on
        the table or at the counter means guests connect the moment they
        sit down, instead of flagging someone down to read out a password.
        It's a small thing, but it's one less interruption for your staff
        during a rush.
      </p>

      <h2>A menu link that's actually easy to update</h2>
      <p>
        A <Link to="/qr-code-generator/url">URL QR code</Link> pointing to
        a digital menu page makes sense as a <em>supplement</em> to a
        physical menu, not a replacement for it — some guests genuinely
        prefer paper, and forcing everyone onto their phone is exactly
        the pattern people got tired of. Where it's genuinely useful: a
        specials board that changes weekly, seasonal items, or a full
        allergen/ingredients page that would be too much text to print
        on the physical menu itself.
      </p>

      <h2>Location and directions</h2>
      <p>
        A <Link to="/qr-code-generator/location">location QR code</Link>{' '}
        on a flyer, a takeout box, or a business card opens directions
        straight in Google Maps — useful for anything that leaves the
        building with a customer and might need to bring them back.
      </p>

      <h2>WhatsApp for reservations or takeout orders</h2>
      <p>
        If you take orders or bookings over WhatsApp, a{' '}
        <Link to="/qr-code-generator/whatsapp">WhatsApp QR code</Link> on
        a window decal or receipt starts a chat with your number already
        filled in — no saving a contact first, no typing a number
        wrong.
      </p>

      <h2>The one mistake worth avoiding</h2>
      <p>
        The backlash wasn't really about QR codes — it was about removing
        the paper menu entirely and making the QR code mandatory. The
        version that works: QR codes as an addition that removes genuine
        friction (a password, a specials list, a way to order), sitting
        alongside the normal experience, not replacing it. Nobody minds
        scanning a code for something extra. People mind being forced to
        use their phone for something a menu used to do just fine.
      </p>
    </>
  );
}
