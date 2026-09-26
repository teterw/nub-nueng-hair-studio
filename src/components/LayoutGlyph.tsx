import type { Layout } from "@/data/layouts";

/**
 * Wireframes for the format options, drawn in the same line vocabulary as the
 * rest of the page. A one-line description of a layout is hard to picture; a
 * twelve-pixel sketch of it is not.
 */
const shapes: Record<Layout["id"], React.ReactNode> = {
  classic: (
    <>
      <rect x="4" y="4" width="20" height="7" rx="1" />
      <rect x="4" y="14" width="20" height="4" rx="1" />
      <rect x="4" y="21" width="20" height="4" rx="1" />
    </>
  ),
  nav: (
    <>
      <rect x="2" y="3" width="24" height="4" rx="1" />
      <rect x="4" y="10" width="20" height="6" rx="1" />
      <rect x="4" y="19" width="20" height="6" rx="1" />
    </>
  ),
  split: (
    <>
      <rect x="3" y="4" width="8" height="21" rx="1" />
      <rect x="14" y="4" width="11" height="6" rx="1" />
      <rect x="14" y="13" width="11" height="5" rx="1" />
      <rect x="14" y="21" width="11" height="4" rx="1" />
    </>
  ),
  cards: (
    <>
      <rect x="4" y="3" width="20" height="6" rx="2" />
      <rect x="4" y="12" width="20" height="6" rx="2" />
      <rect x="4" y="21" width="20" height="5" rx="2" />
    </>
  ),
  showcase: (
    <>
      <rect x="3" y="3" width="12" height="12" rx="1" />
      <rect x="18" y="3" width="7" height="5" rx="1" />
      <rect x="18" y="10" width="7" height="5" rx="1" />
      <rect x="3" y="18" width="22" height="3" rx="1" />
      <rect x="3" y="23" width="22" height="3" rx="1" />
    </>
  ),
};

export function LayoutGlyph({ id }: { id: Layout["id"] }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" focusable="false" className="h-8 w-8">
      <g fill="none" stroke="currentColor" strokeWidth="1.3">
        {shapes[id]}
      </g>
    </svg>
  );
}
