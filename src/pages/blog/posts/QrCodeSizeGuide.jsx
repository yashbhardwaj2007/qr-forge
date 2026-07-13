import { Link } from 'react-router-dom';

export default function QrCodeSizeGuide() {
  return (
    <>
      <p>
        A QR code that looks fine on your screen can be completely
        unscannable once it's printed too small — and by the time you find
        out, it's usually already on a hundred flyers. Here's how to get
        the size right before you print anything.
      </p>

      <h2>The rule of thumb</h2>
      <p>
        A commonly used starting point: your QR code's minimum printed
        size should be roughly one-tenth of the scanning distance. Someone
        scanning from about 30 cm (12 inches) away — a menu, a business
        card, a flyer held at arm's length — needs a code that's at least
        around 3 cm (roughly 1.2 inches) square. The further away people
        will be standing, the bigger it needs to be.
      </p>
      <ul>
        <li><strong>Business card, held close:</strong> 1.5–2 cm minimum</li>
        <li><strong>Table tent, flyer, menu:</strong> 2.5–4 cm</li>
        <li><strong>Poster on a wall, read from a few feet away:</strong> 6–10 cm</li>
        <li><strong>Storefront window or banner, read from across a street:</strong> 20 cm or more</li>
      </ul>

      <h2>What actually breaks a QR code besides size</h2>
      <p>
        Size is the most common mistake, but not the only one. A code can
        be plenty large and still fail to scan for other reasons:
      </p>
      <ul>
        <li>
          <strong>Low contrast.</strong> Light gray on white, or two
          similarly-toned colors, can look fine to your eye but confuse a
          camera trying to distinguish the pattern. Stick to strong
          contrast — dark on light or light on dark.
        </li>
        <li>
          <strong>A logo that's too big.</strong> A small logo in the
          center is fine, especially with a high error-correction level,
          but covering more than about a fifth of the code risks losing
          enough data to make it unreadable.
        </li>
        <li>
          <strong>Stretching it unevenly.</strong> A QR code needs to
          stay perfectly square — stretching it into a rectangle to fit a
          layout distorts the pattern and can break the scan entirely.
        </li>
        <li>
          <strong>Printing across a fold or seam.</strong> A crease running
          through the middle of a code can be enough to make part of it
          unreadable.
        </li>
      </ul>

      <h2>The one step that catches all of this before you print</h2>
      <p>
        Whatever size you land on, test-scan the actual printed output —
        not just the screen preview — with two different phones before
        committing to a full print run. It takes a minute and it's the
        only way to be certain a specific size, paper, and printer
        combination actually works.
      </p>
      <p>
        If you're generating the code yourself, our{' '}
        <Link to="/">QR code generator</Link> lets you set the exact pixel
        size before download, export as SVG for print-quality scaling to
        any size without blurring, and automatically checks whether the
        code you just generated is actually scannable — so you catch a
        contrast or logo problem before it ever reaches a printer.
      </p>
    </>
  );
}
