import { shop } from "@/data/shop";
import { buttonOutline, buttonSolid, linkProps, Section } from "./ui";

export function Contact() {
  const { contact } = shop;

  return (
    <Section id="contact" title="ติดต่อ">
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href={contact.lineUrl} {...linkProps(contact.lineUrl)} className={buttonSolid}>
          แอดไลน์ / จองคิว
        </a>
        <a href={contact.phoneHref} className={buttonOutline}>
          โทร {contact.phoneDisplay}
        </a>
        <a href={contact.facebookUrl} {...linkProps(contact.facebookUrl)} className={buttonOutline}>
          Facebook
        </a>
      </div>

      {/* The shop's own request — chat notifications don't arrive without it. */}
      <p className="mt-7 max-w-[44ch] border-l-2 border-brass py-1 pl-4 text-sm leading-relaxed">
        {contact.lineNote}
      </p>
    </Section>
  );
}
