import { shop } from "@/data/shop";
import { buttonSolid, linkProps } from "./ui";
import { HeroStroke } from "./HeroStroke";

export function Hero() {
  return (
    <header className="site-hero overflow-hidden">
      {/* .hero-enter staggers its direct children in once on load, so the order
          of these five elements is also the order they arrive in. */}
      <div className="hero-enter site-hero-body mx-auto w-full max-w-4xl px-5 pt-10 text-center sm:px-8 sm:pt-16">
        {/*
          Painted as a mask rather than an <img>, so the logo takes the ink
          colour of whichever style is active instead of staying brown on a dark
          page. Decorative — the <h1> below carries the shop name as text — and
          fixed-size, so it cannot shift the layout while loading.
        */}
        <div role="presentation" className="logo-mask mx-auto h-32 w-32 sm:h-40 sm:w-40" />

        <h1 className="font-display mt-2 text-[2rem] sm:text-[3.05rem]">{shop.name}</h1>

        <p className="mx-auto mt-3 max-w-[32ch] text-[1.0625rem] text-balance sm:max-w-[40ch] sm:text-[1.1875rem]">
          {shop.tagline}
        </p>

        <p className="mt-2 text-sm leading-snug text-ink/70">
          {shop.subline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        <div className="mt-7">
          <a
            href={shop.contact.lineUrl}
            {...linkProps(shop.contact.lineUrl)}
            className={buttonSolid}
          >
            แอดไลน์ / จองคิว
          </a>
        </div>
      </div>

      <div className="site-hero-strokes mt-6 sm:mt-10" aria-hidden="true">
        <HeroStroke />
      </div>
    </header>
  );
}
