import { shop } from "@/data/shop";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8">
        <p className="font-display text-xl">{shop.name}</p>

        <address className="mt-2 max-w-[34ch] text-sm not-italic leading-relaxed text-ink/70">
          {shop.address.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>

        {/* Kept small but plain, so nobody mistakes the demo for the live site. */}
        <p className="mt-7 inline-block rounded-[var(--radius)] border border-line-strong px-2.5 py-1 text-xs text-ink/70">
          {shop.footer.demoLabel}
        </p>
      </div>
    </footer>
  );
}
