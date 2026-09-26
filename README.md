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

## Choosing a look

The demo offers two independent choices from the **ปรับหน้าตา** button in the
top-right corner: a colour style and a page format. The content is identical in
every combination — only presentation changes.

### Colour styles

Six of them. Each swaps the palette, both typefaces, the corner radius and how
the hero strokes are drawn.

| id | ชื่อ | what it's going for |
|----|------|---------------------|
| `vintage` | วินเทจ | Coffee on cream, straight off the logo. Thai serif, hairlines, paper grain. |
| `minimal` | มินิมอล | Near-white, square corners, one grey-brown accent, maximum air. |
| `night` | กลางคืน | Deep espresso with gold. The only dark style. |
| `soft` | ละมุน | Rounded corners, dusty sage, the friendliest of the six. |
| `studio` | สตูดิโอ | Crisp white, heavier display type, deep teal. |
| `blush` | บูทีค | Ivory with a plum ink. Delicate without tipping into pink. |

### Page formats

The second axis. Five formats, picked independently of the colour style, so
"what colour" and "what shape" are separate questions:

| id | ชื่อ | what changes |
|----|------|--------------|
| `classic` | คลาสสิก | Stacked sections separated by hairlines. The default. |
| `nav` | มีเมนู | A sticky menu of section links across the top. |
| `split` | สองฝั่ง | On desktop the shop name and booking button stand in a sticky left panel while the content scrolls past. Phones keep the stacked layout. |
| `cards` | การ์ด | Each section becomes its own panel with space around it. |
| `showcase` | โชว์ผลงาน | Work before prices: the gallery moves under the hero and grows a lead tile. |

Formats compose with styles: `?style=night&layout=cards` is a valid link, and
all 30 pairings are checked for horizontal overflow at 375px and 1280px.

Like the styles, a format is almost entirely CSS — `[data-layout="<id>"]` blocks
in `globals.css` re-arrange the same markup. `showcase` reorders with CSS
`order` rather than by moving components, so the markup order stays the reading
order for anything that ignores the stylesheet. The section menu is the one
piece needing real elements: it is always rendered and `display: none` in the
other formats, which takes it out of the accessibility tree too.

**On `showcase`:** it is the strongest format once there are real photos and the
weakest while the gallery is still placeholders — it leads with six empty tiles.
Worth showing the owner as "this is what we do once you send photos".

### Shareable links

Both axes are URL parameters, applied before the first paint so there is no
flash. Send the owner a handful of links instead of asking them to find the
button:

```
https://<your-domain>/?style=vintage&layout=classic
https://<your-domain>/?style=night&layout=cards
https://<your-domain>/?style=studio&layout=showcase
https://<your-domain>/?style=minimal&layout=split
```

Either parameter can be used alone; the other falls back to whatever is saved,
then to the default. Picks made with the button are remembered in
`localStorage` and written into the URL, so the address bar always links to what
is on screen.

### How it works

A style is only a set of CSS custom properties under `[data-theme="<id>"]` in
[`src/app/globals.css`](src/app/globals.css). No component knows a style exists —
they all name tokens (`bg-bg`, `text-ink`, `text-accent`, `border-line`) and
never a colour. To edit a look, change its block. To add one, copy a block, give
it an id, and add an entry to [`src/data/themes.ts`](src/data/themes.ts).

The swatches in the picker are not hardcoded colours. Each is a real element
tagged with `data-theme`, so it renders in that style's own tokens and cannot
drift when a palette is edited.

The logo is painted as a CSS mask rather than an `<img>`, which is what lets it
take the ink colour of each style — otherwise กลางคืน would show a brown logo on
a near-black page.

### Once the owner has picked

The picker is a tool for choosing, not part of the shop's site. To ship the
chosen look:

1. Delete `src/components/DesignPicker.tsx`, `src/components/LayoutGlyph.tsx`
   and their lines in `src/app/page.tsx`.
2. In `globals.css`, move the winning style's values into the `@theme` block and
   delete all six `[data-theme]` blocks. Keep the winning `[data-layout]` block
   (and the `data-layout` attribute in `layout.tsx`) or inline its rules, then
   delete the other four.
3. In `src/app/layout.tsx`, delete the font definitions the winner doesn't use,
   along with `pickerScript`, `designInitScript` and the `<head>` script tag.
4. Delete `src/data/themes.ts` and `src/data/layouts.ts`. If the winner is not
   มีเมนู, also delete `src/components/SiteNav.tsx` and `shop.nav`.

Worth doing rather than leaving: the demo declares eight typefaces so any style
can be picked instantly. Only the active style's two are actually downloaded
(the rest are `preload: false`), but pruning drops the repo back to two faces and
keeps the build honest.

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
- **Type** is Trirong for display and Anuphan for body. Trirong is a Thai serif
  whose thick/thin modulation is the same move the logo makes with a brush line,
  so the display type belongs to the brand rather than just sitting near it.
  Only one weight (600) is loaded, and it sets the shop name and section titles
  and nothing else.
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
