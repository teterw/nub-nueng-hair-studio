import { shop } from "@/data/shop";
import { Section } from "./ui";

export function About() {
  return (
    <Section id="about" title={shop.about.heading}>
      <div className="mt-6 max-w-[46ch] space-y-4">
        {shop.about.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>

      <p className="mt-7 border-t border-line pt-5 text-sm text-coffee/70">
        {shop.about.productsLine}
      </p>
    </Section>
  );
}
