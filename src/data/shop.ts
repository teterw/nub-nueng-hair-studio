/**
 * Every piece of shop content lives here.
 *
 * Components never hardcode copy, prices, hours or links — they all read from
 * this file. To turn the demo into the real site, replace the values below.
 * Anything still waiting on the owner is marked `// TODO: real data` and is
 * written so a visitor can *see* it is a placeholder (`฿ —`, `xx:xx–xx:xx`,
 * `0xx-xxx-xxxx`). Never swap those for realistic-looking invented values.
 */

export type Service = {
  name: string;
  /** Shown verbatim. Keep as `฿ —` until a real starting price is confirmed. */
  price: string;
  /** Optional line under the service, e.g. the kids' booking rule. */
  note?: string;
};

export type ServiceGroup = {
  id: string;
  title: string;
  items: Service[];
};

export type GalleryItem = {
  id: string;
  /** What the photo shows. Sits under the tile, and becomes the image alt text. */
  caption: string;
  /** One of the line-art glyphs in components/HairGlyph.tsx. Used until `image` is set. */
  glyph: "wave" | "bob" | "curl" | "straight" | "crop" | "drop";
  /**
   * Drop a real photo in `public/gallery/` and put its path here — e.g.
   * "/gallery/color-01.jpg". The tile then shows the photo instead of the
   * placeholder, with no component changes. See README.
   */
  image?: string;
};

export type OpeningHour = {
  day: string;
  hours: string;
  /** Pulls the row forward visually — used for the Sunday note. */
  highlight?: boolean;
  note?: string;
};

/**
 * Gallery tiles. Declared out here, and typed rather than inferred, so that
 * adding `image` to one entry does not need a type change anywhere else.
 * TODO: real data — give each tile a real photo (see README).
 */
const gallery: GalleryItem[] = [
  { id: "g1", caption: "ตัดผมหญิง", glyph: "bob" },
  { id: "g2", caption: "ทำสี", glyph: "wave" },
  { id: "g3", caption: "ดัดวอลลุ่ม", glyph: "curl" },
  { id: "g4", caption: "ยืดผม", glyph: "straight" },
  { id: "g5", caption: "ตัดผมชาย", glyph: "crop" },
  { id: "g6", caption: "ทรีตเมนต์", glyph: "drop" },
];

export const shop = {
  name: "นับหนึ่งแฮร์ สตูดิโอ",
  nameLatin: "Nub-Nueng Hair Studio",

  /**
   * Tagline candidates considered:
   *   1. "ร้านทำผมเล็ก ๆ ที่ออกแบบทรงผมให้เข้ากับคุณ"   ← chosen
   *   2. "ตัดผม ทำสี ดัด ยืด ดูแลโดยช่างที่ใส่ใจ"
   *   3. "สตูดิโอทำผมย่านสวนหลวง ดูแลทั้งผู้ชาย ผู้หญิง และเด็ก"
   * (1) wins: it is plain, not salesy, and says the one thing that actually
   * sets the shop apart — the cut is designed around the person.
   */
  tagline: "ร้านทำผมเล็ก ๆ ที่ออกแบบทรงผมให้เข้ากับคุณ",
  /** Two fixed lines rather than one wrapping sentence: Thai breaks badly
   *  around "และ" at phone width, and this reads the same on every device. */
  subline: ["ดูแลทั้งผู้ชาย ผู้หญิง และเด็ก", "ย่านสวนหลวง กระทุ่มแบน สมุทรสาคร"],

  seo: {
    title: "นับหนึ่งแฮร์ สตูดิโอ | ร้านทำผม กระทุ่มแบน สมุทรสาคร",
    description:
      "นับหนึ่งแฮร์ สตูดิโอ ร้านทำผมย่านสวนหลวง กระทุ่มแบน สมุทรสาคร ตัดผมชาย หญิง เด็ก ทำสี ดัด ยืด และทรีตเมนต์ฟื้นบำรุงเส้นผม",
  },

  address: {
    full: "1/4 ม.12 ถ.พุทธสาคร ต.สวนหลวง อ.กระทุ่มแบน จ.สมุทรสาคร 74110",
    lines: ["1/4 ม.12 ถ.พุทธสาคร", "ต.สวนหลวง อ.กระทุ่มแบน", "จ.สมุทรสาคร 74110"],
  },

  contact: {
    // TODO: real data — paste the shop's LINE add-friend link (https://lin.ee/...)
    lineUrl: "#",
    // TODO: real data — the shop's Facebook page URL
    facebookUrl: "#",
    // TODO: real data — real number, then set phoneHref to `tel:+66...`
    phoneDisplay: "0xx-xxx-xxxx",
    phoneHref: "#",
    /** The shop asks for this because chat notifications don't arrive otherwise. */
    lineNote: "กรุณาแอดไลน์ก่อนทักแชท เพื่อให้ร้านเห็นข้อความ",
  },

  /** Short labels for the section menu in the มีเมนู format. Deliberately
   *  shorter than the section headings — a menu has less room than a title. */
  nav: [
    { href: "#services", label: "บริการ" },
    { href: "#gallery", label: "ผลงาน" },
    { href: "#about", label: "เกี่ยวกับร้าน" },
    { href: "#reviews", label: "รีวิว" },
    { href: "#hours", label: "เวลาเปิด" },
    { href: "#contact", label: "ติดต่อ" },
  ],

  services: [
    {
      id: "cut",
      title: "ตัดผม",
      items: [
        { name: "ตัดผมชาย", price: "฿ —" }, // TODO: real data
        { name: "ตัดผมหญิง", price: "฿ —" }, // TODO: real data
        {
          name: "ตัดผมเด็ก",
          price: "฿ —", // TODO: real data
          note: "เด็กแรกเกิด–6 ขวบ กรุณาจองคิวล่วงหน้า",
        },
      ],
    },
    {
      id: "color",
      title: "ทำสี",
      items: [
        { name: "ทำสีผม", price: "฿ —" }, // TODO: real data
        { name: "ทำสีแบบไม่ฟอก", price: "฿ —" }, // TODO: real data
      ],
    },
    {
      id: "perm",
      title: "ดัด",
      items: [
        { name: "ดัดผม", price: "฿ —" }, // TODO: real data
        { name: "ดัดวอลลุ่ม", price: "฿ —" }, // TODO: real data
      ],
    },
    {
      id: "straighten",
      title: "ยืด",
      items: [
        { name: "ยืดผม", price: "฿ —" }, // TODO: real data
        { name: "ยืดวอลลุ่ม", price: "฿ —" }, // TODO: real data
        { name: "บราซิลเลี่ยน โบลว์เอาท์", price: "฿ —" }, // TODO: real data
      ],
    },
    {
      id: "treatment",
      title: "ทรีตเมนต์",
      items: [
        { name: "ทรีตเมนต์ฟื้นบำรุงเส้นผม", price: "฿ —" }, // TODO: real data
      ],
    },
  ] satisfies ServiceGroup[],

  /** Shown once under the price board so `฿ —` reads as "starting from", not "free". */
  priceNote: "ราคาเริ่มต้น ขึ้นอยู่กับความยาวผมและบริการที่เลือก สอบถามราคาได้ทางไลน์",

  about: {
    heading: "เกี่ยวกับร้าน",
    paragraphs: [
      "นับหนึ่งแฮร์ สตูดิโอ เป็นร้านทำผมเล็ก ๆ ในย่านสวนหลวง กระทุ่มแบน ดูแลกันแบบร้านประจำที่จำหน้าลูกค้าได้",
      "เราไม่ได้ตัดตามทรงสำเร็จรูป แต่คุยกับลูกค้าก่อนทุกครั้ง แล้วออกแบบทรงให้เข้ากับรูปหน้า สภาพเส้นผม และการดูแลในชีวิตประจำวันของแต่ละคน",
    ],
    // TODO: real data — confirm the current product list with the owner
    productsLine: "ผลิตภัณฑ์ที่ร้านใช้ L'Oréal, Milbon, Olaplex และ K18",
  },

  gallery,

  /**
   * TODO: real data — three empty slots on purpose. Do not write sample quotes;
   * put real customer reviews here only once the owner supplies them.
   */
  reviews: {
    heading: "รีวิว",
    placeholderLabel: "รีวิวจากลูกค้า",
    placeholderNote: "รอข้อมูลจริง",
    count: 3,
  },

  hours: {
    heading: "เวลาเปิด–ปิด",
    // TODO: real data — every time below is a placeholder
    days: [
      { day: "จันทร์", hours: "xx:xx–xx:xx" },
      { day: "อังคาร", hours: "xx:xx–xx:xx" },
      { day: "พุธ", hours: "xx:xx–xx:xx" },
      { day: "พฤหัสบดี", hours: "xx:xx–xx:xx" },
      { day: "ศุกร์", hours: "xx:xx–xx:xx" },
      { day: "เสาร์", hours: "xx:xx–xx:xx" },
      { day: "อาทิตย์", hours: "xx:xx–xx:xx", highlight: true, note: "ร้านเปิดวันอาทิตย์" },
    ] satisfies OpeningHour[],
    note: "แนะนำให้จองคิวล่วงหน้าทางไลน์ โดยเฉพาะวันหยุด",
  },

  footer: {
    demoLabel: "เว็บไซต์ตัวอย่าง ยังไม่ใช่เว็บไซต์จริงของร้าน",
  },
} as const;

/** Google Maps embed + "open in Maps" link, both built from the address above. */
export const mapQuery = encodeURIComponent(shop.address.full);
export const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
export const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
