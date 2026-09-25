import Image from "next/image";
import { shop } from "@/data/shop";
import { buttonSolid, linkProps } from "./ui";
import { HeroStroke } from "./HeroStroke";

export function Hero() {
  return (
    <header className="overflow-hidden">
      <div className="mx-auto w-full max-w-4xl px-5 pt-10 text-center sm:px-8 sm:pt-16">
        {/*
          Decorative: the logo already spells out the shop name, and the <h1>
          directly below carries it as text. An alt here would read it twice.
        */}
        <Image
          src="/logo.png"
          alt=""
          width={447}
          height={447}
          priority
          className="mx-auto h-32 w-32 sm:h-40 sm:w-40"
        />

        <h1 className="font-display mt-2 text-[2rem] sm:text-[3.05rem]">{shop.name}</h1>

        <p className="mx-auto mt-3 max-w-[32ch] text-[1.0625rem] text-balance sm:max-w-[40ch] sm:text-[1.1875rem]">
          {shop.tagline}
        </p>
        <p className="mt-2 text-sm leading-snug text-coffee/70">
          {shop.subline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        <a href={shop.contact.lineUrl} {...linkProps(shop.contact.lineUrl)} className={`${buttonSolid} mt-7`}>
          แอดไลน์ / จองคิว
        </a>
      </div>

      <div className="mt-6 sm:mt-10" aria-hidden="true">
        <HeroStroke />
      </div>
    </header>
  );
}
