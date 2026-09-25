import { shop } from "@/data/shop";
import { Section } from "./ui";

/**
 * Three reserved slots. No invented quotes — the cards show ruled blank lines,
 * which read as "content pending" to anyone, and say so in words as well.
 */
export function Reviews() {
  const slots = Array.from({ length: shop.reviews.count }, (_, i) => i);

  return (
    <Section id="reviews" title={shop.reviews.heading}>
      <ul className="mt-7 grid gap-3 sm:grid-cols-3 sm:gap-4">
        {slots.map((i) => (
          <li key={i} className="rounded-[3px] border border-line bg-paper/70 p-5">
            <svg viewBox="0 0 28 20" aria-hidden="true" className="h-5 w-7 text-brass-ink">
              <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <path d="M11 3C5 5 2 9 2 14a4 4 0 0 0 7 2" />
                <path d="M25 3c-6 2-9 6-9 11a4 4 0 0 0 7 2" />
              </g>
            </svg>

            {/* Blank ruled lines where the quote will sit. */}
            <div aria-hidden="true" className="mt-4 space-y-2.5">
              <span className="block h-px w-full bg-line-strong" />
              <span className="block h-px w-full bg-line-strong" />
              <span className="block h-px w-3/5 bg-line-strong" />
            </div>

            <p className="mt-5 text-sm leading-snug">
              {shop.reviews.placeholderLabel}
              <span className="mt-0.5 block text-xs text-brass-ink">
                {shop.reviews.placeholderNote}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
