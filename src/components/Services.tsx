import { shop } from "@/data/shop";
import { Section } from "./ui";

/**
 * Laid out as an old salon price board — name, dotted leader, price — rather
 * than a grid of cards. The leader is what makes a column of `฿ —` read as a
 * price list that is waiting on numbers, instead of as broken content.
 */
export function Services() {
  return (
    <Section id="services" title="บริการ">
      <div className="mt-8 grid gap-x-14 gap-y-9 sm:grid-cols-2">
        {shop.services.map((group) => (
          <div key={group.id}>
            <h3 className="font-semibold leading-snug">{group.title}</h3>

            <dl className="mt-2">
              {group.items.map((item) => (
                <div key={item.name} className="py-1 leading-relaxed">
                  <div className="flex items-baseline gap-2">
                    <dt className="shrink-0">{item.name}</dt>
                    <span
                      aria-hidden="true"
                      className="mb-[0.42em] min-w-6 flex-1 border-b border-dotted border-brass/70"
                    />
                    <dd className="shrink-0 text-coffee/75">{item.price}</dd>
                  </div>
                  {item.note ? (
                    <p className="mt-0.5 max-w-[38ch] text-sm leading-relaxed text-coffee/70">
                      {item.note}
                    </p>
                  ) : null}
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-[46ch] border-t border-line pt-5 text-sm leading-relaxed text-coffee/70">
        {shop.priceNote}
      </p>
    </Section>
  );
}
