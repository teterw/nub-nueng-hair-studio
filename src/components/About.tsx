import { shop } from "@/data/shop";
import { Section } from "./ui";

export function About() {
  return (
    <Section id="about" title={shop.about.heading}>
      {/* The only real prose on the page, so it keeps the looser Thai leading. */}
      <div className="mt-6 max-w-[46ch] space-y-4 leading-[1.85]">
        {shop.about.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>

      <p className="mt-7 border-t border-line pt-5 text-sm text-ink/70">
        {shop.about.productsLine}
      </p>
    </Section>
  );
}
