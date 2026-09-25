import { mapEmbedUrl, mapLinkUrl, shop } from "@/data/shop";
import { Section } from "./ui";

export function HoursMap() {
  return (
    <Section id="hours" title={`${shop.hours.heading} และแผนที่`}>
      <div className="mt-7 grid gap-10 sm:grid-cols-2 sm:gap-12">
        <div>
          <dl>
            {shop.hours.days.map((row) => (
              <div key={row.day} className="border-b border-line py-2.5 last:border-b-0">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className={row.highlight ? "font-semibold" : undefined}>{row.day}</dt>
                  <dd className={row.highlight ? "font-semibold" : "text-coffee/75"}>{row.hours}</dd>
                </div>
                {row.note ? <p className="mt-0.5 text-sm text-brass-ink">{row.note}</p> : null}
              </div>
            ))}
          </dl>

          <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-coffee/70">
            {shop.hours.note}
          </p>
        </div>

        <div>
          <div className="overflow-hidden rounded-[3px] border border-line">
            <iframe
              title={`แผนที่ร้าน${shop.name}`}
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block aspect-4/3 w-full border-0"
            />
          </div>

          <address className="mt-4 text-sm not-italic leading-relaxed text-coffee/75">
            {shop.address.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>

          <a
            href={mapLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block border-b border-brass pb-0.5 text-sm hover:border-coffee"
          >
            เปิดใน Google Maps
          </a>
        </div>
      </div>
    </Section>
  );
}
