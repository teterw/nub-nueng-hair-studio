import { shop } from "@/data/shop";
import { linkProps } from "./ui";

/**
 * The bottom tab bar for the แบบแอป format — the thing that makes that format
 * feel like an app rather than a page.
 *
 * Rendered in every format and hidden by CSS unless แบบแอป is active, which
 * also takes it out of the accessibility tree. It replaces the usual sticky
 * LINE/call bar rather than stacking with it; two fixed bars on a 375px screen
 * is most of the screen.
 *
 * Four destinations, because five is where a tab bar starts to shrink past
 * being tappable: the two things people come to look at, the one thing they
 * come to check, and the one thing they came to do.
 */
const icons = {
  services: (
    <>
      <path d="M4 6h14M4 11h14M4 16h9" />
      <circle cx="19" cy="16" r="1.4" />
    </>
  ),
  gallery: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="12" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="12" width="7" height="7" rx="1" />
      <rect x="12" y="12" width="7" height="7" rx="1" />
    </>
  ),
  hours: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="M11 6v5.5l3.5 2" />
    </>
  ),
  line: (
    <>
      <path d="M11 3c4.7 0 8.5 3 8.5 6.8 0 3.7-3.8 6.7-8.5 6.7-.7 0-1.4-.1-2-.2L4 19l1-3.4C3.2 14.4 2.5 12.2 2.5 9.8 2.5 6 6.3 3 11 3Z" />
    </>
  ),
};

function TabIcon({ name }: { name: keyof typeof icons }) {
  return (
    <svg
      viewBox="0 0 22 22"
      aria-hidden="true"
      focusable="false"
      className="h-[22px] w-[22px]"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {icons[name]}
      </g>
    </svg>
  );
}

export function AppTabBar() {
  return (
    <nav aria-label="เมนูลัด" className="site-tabbar">
      <ul className="site-tabbar-list">
        <li>
          <a href="#services" className="site-tab">
            <TabIcon name="services" />
            บริการ
          </a>
        </li>
        <li>
          <a href="#gallery" className="site-tab">
            <TabIcon name="gallery" />
            ผลงาน
          </a>
        </li>
        <li>
          <a href="#hours" className="site-tab">
            <TabIcon name="hours" />
            เวลาเปิด
          </a>
        </li>
        <li>
          <a
            href={shop.contact.lineUrl}
            {...linkProps(shop.contact.lineUrl)}
            className="site-tab site-tab-cta"
          >
            <TabIcon name="line" />
            แอดไลน์
          </a>
        </li>
      </ul>
    </nav>
  );
}
