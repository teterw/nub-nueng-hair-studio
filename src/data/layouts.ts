/**
 * The page formats the owner picks from, independent of the colour style.
 *
 * Like themes, a layout is almost entirely CSS: `[data-layout="<id>"]` blocks in
 * globals.css re-arrange the same markup. The section menu and the app tab bar
 * are the only pieces needing real elements, and both are hidden by CSS unless
 * their format is active.
 *
 * Style and format are deliberately separate axes — the owner can answer "what
 * colour" and "what shape" without one answer constraining the other.
 */

export type Layout = {
  id: string;
  label: string;
  blurb: string;
  /**
   * True when the format's whole point shows up on a phone. Nearly every
   * visitor arrives from Facebook on mobile, so the picker leads with these.
   */
  mobileFirst?: boolean;
};

export const layouts: Layout[] = [
  {
    id: "classic",
    label: "คลาสสิก",
    blurb: "เรียงลงมาหน้าเดียว คั่นด้วยเส้นบาง ๆ อ่านง่าย เลื่อนรวดเดียวจบ",
  },
  {
    id: "app",
    label: "แบบแอป",
    blurb: "มีแถบปุ่มค้างด้านล่างแบบแอปมือถือ กดข้ามไปบริการ ผลงาน แผนที่ หรือแอดไลน์ได้เลย",
    mobileFirst: true,
  },
  {
    id: "swipe",
    label: "เลื่อนข้าง",
    blurb: "รูปผลงานกับรีวิวเลื่อนดูด้านข้างแทนการเลื่อนลง หน้าเว็บสั้นลงมาก",
    mobileFirst: true,
  },
  {
    id: "fullscreen",
    label: "เต็มจอ",
    blurb: "ทีละหัวข้อเต็มหน้าจอ ตัวอักษรใหญ่ เลื่อนแล้วหยุดพอดีทีละหน้า",
    mobileFirst: true,
  },
  {
    id: "compact",
    label: "กระชับ",
    blurb: "บีบระยะห่างให้แน่น เห็นข้อมูลได้มากในจอเดียว เลื่อนน้อยที่สุด",
    mobileFirst: true,
  },
  {
    id: "nav",
    label: "มีเมนู",
    blurb: "มีแถบเมนูค้างด้านบน กดข้ามไปหัวข้อที่ต้องการได้ทันที",
  },
  {
    id: "split",
    label: "สองฝั่ง",
    blurb: "บนจอคอม ชื่อร้านกับปุ่มจองอยู่นิ่งฝั่งซ้าย เนื้อหาเลื่อนฝั่งขวา บนมือถือเป็นแถบชื่อร้านแบบสั้น",
  },
  {
    id: "cards",
    label: "การ์ด",
    blurb: "แต่ละหัวข้อเป็นกล่องแยกกัน แบ่งสัดส่วนชัด ดูเป็นระเบียบ",
  },
  {
    id: "showcase",
    label: "โชว์ผลงาน",
    blurb: "ดันรูปผลงานขึ้นมาก่อนราคา และขยายให้ใหญ่ขึ้น เหมาะเมื่อมีรูปจริงแล้ว",
  },
];

export const defaultLayout = layouts[0].id;

/** Read by the inline no-flash script and by the picker. Keep them in step. */
export const layoutStorageKey = "nubnueng-layout";
