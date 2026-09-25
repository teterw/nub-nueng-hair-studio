# Build: Demo website for นับหนึ่งแฮร์ สตูดิโอ (Nub-Nueng Hair Studio)

## Context
This is a **proposal demo** for a real local hair studio. I will show it to the owner to pitch building their official site. It must look polished and trustworthy on a phone, but it uses placeholders wherever I don't have real data yet. **Never invent facts** (prices, hours, phone numbers, reviews, staff names). Use clearly marked placeholders instead.

## The business
- **Name:** นับหนึ่งแฮร์ สตูดิโอ / Nub-Nueng Hair Studio
- **Type:** Unisex hair studio (men, women, and kids), not a barber-only shop. The logo shows a man and a woman.
- **Vibe:** Small, vintage-feeling studio with stylish, carefully designed cuts. Warm, personal, neighborhood shop, but skilled.
- **Address:** 1/4 ม.12 ถ.พุทธสาคร ต.สวนหลวง อ.กระทุ่มแบน จ.สมุทรสาคร 74110
- **Known facts:**
  - Services include cuts, coloring (including no-bleach color), perms and volume perms, straightening and volume straightening, Brazilian blowout, and hair repair treatments.
  - Kids' cuts (boys and girls, newborn to 6 years) are **by appointment only**.
  - The team has several stylists and the shop opens on Sundays.
  - Customers contact the shop via LINE / Facebook chat. The shop asks customers to **add them as a friend first**, because chat notifications don't come through otherwise.
  - Products they use: L'Oréal, Milbon, Olaplex, K18 (mention as text only; no brand logos).

## Tech
- Next.js (App Router) with `output: 'export'` for a fully static site, TypeScript, Tailwind CSS.
- Must deploy to **Cloudflare Pages** as static files. No server features, no database, no API routes.
- **Put all shop content in one file: `src/data/shop.ts`** (name, tagline, services with prices, hours, contact links, gallery items, reviews). Every component reads from it, so I can swap in real data later without touching components.
- Logo: `public/logo.png` (I'll add it; it's a brown line-art logo on a cream background).
- Thai is the only language. Use a Thai typeface that fits a vintage studio. Consider pairing a characterful Thai display face for headings with a clean Thai body face (e.g. from Google Fonts: Chonburi, Mitr, Charm, Pridi, Sarabun, Anuphan). Choose deliberately and explain the choice.

## Design direction
- Take the palette from the logo: **deep coffee brown on warm cream**. That's the shop's own brand, so use it on purpose. Add one supporting color if needed (e.g. muted brass or dusty sage), not a bright accent.
- Vintage but clean: think old studio signage, fine line illustration like the logo, generous spacing. Avoid cliché barber-pole stripes, skulls, and razors (it's a unisex studio, not a men's barbershop).
- **Mobile-first.** Nearly all visitors arrive from Facebook on a phone. Design at 375px width first, then scale up.
- Spend boldness in one place (probably the hero). Keep the rest calm.
- Avoid template tells: no ALL-CAPS eyebrow labels above every heading, no fade-up animation on every section, no identical card grid with the same shadow everywhere, and no "01 / 02 / 03" numbering unless the content is truly a sequence.
- Before coding, write a short design plan (colors as hex, type roles, layout sketch) and check it isn't a generic default. Then build.

## Sections (in order)
1. **Hero:** logo, shop name, a short Thai tagline (write 2–3 options and pick the best; keep it plain and honest, not salesy), and a primary button **"แอดไลน์ / จองคิว"** (LINE link placeholder).
2. **บริการ (Services):** grouped as ตัดผม (ชาย / หญิง / เด็ก), ทำสี, ดัด, ยืด, ทรีตเมนต์. Every price is a placeholder shown as `฿ —` with a small note "ราคาเริ่มต้น" style. Add the kids' note: "เด็กแรกเกิด–6 ขวบ กรุณาจองคิวล่วงหน้า".
3. **ผลงาน (Gallery):** **Empty placeholders only, no stock photos and no faces.** Make 6–9 tasteful placeholder tiles in the brand palette (e.g. subtle line-art hair icon + label like "รูปผลงาน"). They should look intentional, not broken.
4. **เกี่ยวกับร้าน (About):** 2–3 short sentences about a neighborhood studio that designs cuts to suit each person. Mention the products they use as a single line of text.
5. **รีวิว (Reviews):** 3 placeholder cards clearly marked as placeholders (e.g. "รีวิวจากลูกค้า — รอข้อมูลจริง"). **Do not write fake quotes.**
6. **เวลาเปิด–ปิด & แผนที่ (Hours & Map):** hours as placeholders except note that the shop is open on Sundays. Embed a Google Maps iframe using the address above as the query, plus an "เปิดใน Google Maps" link.
7. **ติดต่อ (Contact):** LINE, phone, and Facebook buttons (placeholder links). Include the note: "กรุณาแอดไลน์ก่อนทักแชท เพื่อให้ร้านเห็นข้อความ".
8. **Footer:** shop name and address, plus a tiny "Demo" label so no one mistakes it for the live site.

**Sticky mobile bar** at the bottom on small screens with two buttons: LINE and โทร.

## Placeholder rules
- Mark every placeholder in `shop.ts` with a `// TODO: real data` comment.
- Placeholder values must *look* like placeholders to a viewer (`฿ —`, `xx:xx–xx:xx`, `0xx-xxx-xxxx`), never realistic fake numbers.
- Links can be `#` for now.

## Quality floor
- Lighthouse-friendly: optimized images, no layout shift, fast on mobile data.
- Accessible: good contrast (check brown text on cream), visible focus states, respects `prefers-reduced-motion`, proper `alt` text, `lang="th"`.
- SEO basics: title, meta description in Thai, Open Graph tags using the logo.

## Deliverables
1. The working site, runnable with `npm run dev` and buildable with `npm run build` into a static `out/` folder.
2. A short `README.md`: how to edit `shop.ts`, how to add gallery photos, and how to deploy to Cloudflare Pages.
3. When done, give me a list of every placeholder I still need real data for.
