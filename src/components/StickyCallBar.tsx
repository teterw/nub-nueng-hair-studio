import { shop } from "@/data/shop";
import { linkProps } from "./ui";

/**
 * Phone-only. Almost every visitor arrives from Facebook on a phone, so the
 * two things they came to do stay within thumb reach the whole way down.
 */
export function StickyCallBar() {
  const { contact } = shop;

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line-strong bg-bg/97 backdrop-blur-sm sm:hidden">
      <div className="grid grid-cols-2 gap-2 px-3 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
        <a
          href={contact.lineUrl}
          {...linkProps(contact.lineUrl)}
          className="inline-flex items-center justify-center rounded-[var(--radius)] bg-cta px-4 py-2.5 text-[0.9375rem] leading-none text-cta-ink"
        >
          แอดไลน์
        </a>
        <a
          href={contact.phoneHref}
          className="inline-flex items-center justify-center rounded-[var(--radius)] border border-line-strong px-4 py-2.5 text-[0.9375rem] leading-none"
        >
          โทร
        </a>
      </div>
    </div>
  );
}
