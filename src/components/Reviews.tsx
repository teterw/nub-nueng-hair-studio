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
          <li key={i} className="rounded-[var(--radius)] border border-line bg-surface/70 p-5">
            {/* Blank ruled lines where the quote will sit. */}
            <div aria-hidden="true" className="space-y-2.5">
              <span className="block h-px w-full bg-line-strong" />
              <span className="block h-px w-full bg-line-strong" />
              <span className="block h-px w-3/5 bg-line-strong" />
            </div>

            <p className="mt-5 text-sm leading-snug">
              {shop.reviews.placeholderLabel}
              <span className="mt-0.5 block text-xs text-accent">
                {shop.reviews.placeholderNote}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
