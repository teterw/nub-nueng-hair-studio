/**
 * The style options the owner picks from.
 *
 * A theme is nothing but a set of CSS custom properties, defined under
 * `[data-theme="<id>"]` in globals.css — colours, the two typefaces, corner
 * radius, and how the hero strokes are drawn. No component knows a theme
 * exists, so adding or removing one never touches the page.
 *
 * Deliberately no colour values here. The swatches in the picker render real
 * elements tagged with `data-theme`, so they pick up that theme's own tokens
 * and can never drift out of step with the stylesheet.
 */

export type Theme = {
  id: string;
  /** Shown on the picker button. */
  label: string;
  /** One line on what the look is going for. */
  blurb: string;
};

export const themes: Theme[] = [
  {
    id: "vintage",
    label: "วินเทจ",
    blurb: "สีน้ำตาลกาแฟบนพื้นครีม ตามโลโก้ร้าน ตัวอักษรมีหัวเซอริฟ อบอุ่นแบบร้านเก่า",
  },
  {
    id: "minimal",
    label: "มินิมอล",
    blurb: "พื้นขาวนวล เส้นคม เว้นที่ว่างเยอะ เรียบที่สุดในบรรดาทั้งหมด",
  },
  {
    id: "night",
    label: "กลางคืน",
    blurb: "พื้นเข้ม ตัวอักษรครีม ตัดด้วยสีทอง ดูหรูและสงบ",
  },
  {
    id: "soft",
    label: "ละมุน",
    blurb: "มุมมน สีเขียวเสจอ่อน ๆ เป็นมิตร เหมาะกับลูกค้าครอบครัว",
  },
  {
    id: "studio",
    label: "สตูดิโอ",
    blurb: "ขาวสะอาด ตัวอักษรหนา ตัดด้วยเขียวน้ำทะเลเข้ม ดูสมัยใหม่",
  },
  {
    id: "blush",
    label: "บูทีค",
    blurb: "พื้นงาช้างอมชมพู ตัวอักษรสีพลัม ดูประณีตแบบร้านบูทีค",
  },
];

export const defaultTheme = themes[0].id;

/** Read by the inline no-flash script and by the picker. Keep them in step. */
export const themeStorageKey = "nubnueng-style";
