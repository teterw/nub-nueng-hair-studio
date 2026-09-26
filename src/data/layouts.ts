/**
 * The page formats the owner picks from, independent of the colour style.
 *
 * Like themes, a layout is almost entirely CSS: `[data-layout="<id>"]` blocks in
 * globals.css re-arrange the same markup. The section nav is the one piece that
 * needs real elements, so it is always rendered and hidden unless the มีเมนู
 * format is active.
 *
 * Style and format are deliberately separate axes — the owner can answer "what
 * colour" and "what shape" without one answer constraining the other.
 */

export type Layout = {
  id: string;
  label: string;
  blurb: string;
};

export const layouts: Layout[] = [
  {
    id: "classic",
    label: "คลาสสิก",
    blurb: "เรียงลงมาหน้าเดียว คั่นด้วยเส้นบาง ๆ อ่านง่าย เลื่อนรวดเดียวจบ",
  },
  {
    id: "nav",
    label: "มีเมนู",
    blurb: "มีแถบเมนูค้างด้านบน กดข้ามไปหัวข้อที่ต้องการได้ทันที",
  },
  {
    id: "split",
    label: "สองฝั่ง",
    blurb: "บนจอคอม ชื่อร้านกับปุ่มจองอยู่นิ่งฝั่งซ้าย เนื้อหาเลื่อนฝั่งขวา",
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
