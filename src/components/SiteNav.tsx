import { shop } from "@/data/shop";

/**
 * The section menu for the มีเมนู format.
 *
 * Rendered in every format and hidden by CSS unless that format is active —
 * `display: none` takes it out of the accessibility tree as well as the page,
 * so there is nothing for a screen reader or keyboard to trip over in the
 * others. Plain anchors: the browser already does smooth scrolling and the
 * back button, so there is no reason to reach for JavaScript.
 *
 * The right padding reserves room for the design picker, which floats in the
 * same corner. Without it the last menu item sits underneath the button.
 */
export function SiteNav() {
  return (
    <nav aria-label="เมนูหัวข้อ" className="site-nav">
      <ul className="site-nav-list">
        {shop.nav.map((item) => (
          <li key={item.href}>
            <a href={item.href} className="site-nav-link">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
