# นับหนึ่งแฮร์ สตูดิโอ — demo site

A proposal demo for **นับหนึ่งแฮร์ สตูดิโอ / Nub-Nueng Hair Studio**, a unisex hair
studio in สวนหลวง, กระทุ่มแบน, สมุทรสาคร.

Everything the shop hasn't confirmed yet is a **visible placeholder** — `฿ —`,
`xx:xx–xx:xx`, `0xx-xxx-xxxx`, empty gallery tiles, blank review cards. Nothing on
the page is invented. See [Still needed from the shop](#still-needed-from-the-shop).

Static Next.js (App Router, `output: 'export'`), TypeScript, Tailwind CSS v4.
No server, no database, no API routes.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static files into out/
```

## Editing the content

**All shop content lives in one file: [`src/data/shop.ts`](src/data/shop.ts).**
No component hardcodes copy, prices, hours or links, so you can hand over real
data without touching any JSX.

Every unconfirmed value is tagged `// TODO: real data`. To list them:

```bash
grep -n "TODO: real data" src/data/shop.ts
```

A few rules worth keeping:

- **Keep placeholders looking like placeholders.** `฿ —` and `xx:xx–xx:xx` tell a
  visitor the number isn't set. A realistic-looking invented price does not.
- **Prices** are strings, so `"฿ 300"` or `"฿ 300–500"` both work.
- **Links** are `"#"` until real ones exist. For the phone, set both
  `phoneDisplay` (`"08x-xxx-xxxx"`) and `phoneHref` (`"tel:+668xxxxxxx"`).
- **Reviews** render as blank ruled cards on purpose. Don't write sample quotes —
  wait for real ones.

## Adding gallery photos

1. Put the images in `public/gallery/` (e.g. `public/gallery/color-01.jpg`).
2. In `shop.ts`, add an `image` path to the gallery entry:

```ts
const gallery: GalleryItem[] = [
  { id: "g2", caption: "ทำสี", glyph: "wave", image: "/gallery/color-01.jpg" },
  // entries without `image` keep showing the line-art placeholder
];
```

Tiles are a fixed 4:5 and the photo is `object-cover`, so adding images never
shifts the layout. `caption` becomes the image `alt` text — describe what the
photo actually shows. Mixing real photos and placeholders is fine; the
"gathering photos" note above the grid disappears once any photo is set.

Resize to roughly **1000px on the long edge** before committing. The site uses
`images: { unoptimized: true }` (required for static export), so whatever you
commit is what phones download.

## Deploying to Vercel

The build is a plain static export, so there is nothing to configure.

1. Push to GitHub.
2. On [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
3. Vercel detects Next.js and runs `npm run build`. Leave the defaults alone.
4. Deploy.

Or from the command line:

```bash
npx vercel          # preview deployment
npx vercel --prod   # production
```

**One thing to set:** add an environment variable `NEXT_PUBLIC_SITE_URL` with the
final domain (e.g. `https://nubnueng.com`) and redeploy. Open Graph tags need an
absolute URL, so the Facebook link preview won't show the logo until this points
at the real domain.

Because the output is static, it will also drop onto Cloudflare Pages, Netlify or
any static host — build command `npm run build`, output directory `out`.

## Design notes

- **Colour** is sampled from the logo file itself: coffee `#3E1F02` on cream
  `#F2E8DF`, with `#A07D42` brass for rules and `#7A5A24` where brass carries
  text (the lighter brass fails contrast at small sizes).
- **Type** is Chonburi for display and Anuphan for body. Chonburi is drawn from
  vintage Thai shop-sign lettering and has the stroke contrast of the logo's
  brush line; it is single-weight, so it only sets the shop name and section
  titles.
- **The line is the signature.** The logo is one continuous stroke, so the page
  is built from hairlines instead of shadowed cards — services are an old salon
  price board with dotted leaders, not a card grid.
- **One animated moment:** the three hair strokes under the hero draw themselves
  once on load, and not at all under `prefers-reduced-motion`.
- `public/logo.png` is generated from `logo.jpg` as an alpha matte in the brand
  ink, so it sits on any background with no cream square around it.

## Still needed from the shop

Nothing below is guessed at — each one is blank in the demo.

| # | What | Where |
|---|------|-------|
| 1 | Starting price for each of the 11 services | `services[].items[].price` |
| 2 | Opening and closing times for all 7 days (only "open Sundays" is known) | `hours.days` |
| 3 | Any regular closing day | `hours.days` |
| 4 | LINE add-friend link (`https://lin.ee/...`) | `contact.lineUrl` |
| 5 | Facebook page URL | `contact.facebookUrl` |
| 6 | Phone number, for display and for `tel:` | `contact.phoneDisplay`, `contact.phoneHref` |
| 7 | 6+ photos of real work, no customer faces without permission | `gallery[].image` |
| 8 | Real customer reviews, with permission to publish | `reviews` |
| 9 | Confirmation of the product list (L'Oréal, Milbon, Olaplex, K18) | `about.productsLine` |
| 10 | Whether the service list is complete and correctly named | `services` |
| 11 | Confirmation the address is exactly right for Google Maps | `address.full` |
| 12 | Final domain, for Open Graph tags | `NEXT_PUBLIC_SITE_URL` |

Also worth asking: whether they want stylist names or profiles, and whether kids'
cuts have a different price by age.

---

This repository is a **demo**, not the shop's live site. The footer says so on
the page; keep that label until the owner approves going live.
