import Image from "next/image";
import { shop } from "@/data/shop";
import { HairGlyph } from "./HairGlyph";
import { Section } from "./ui";

/**
 * Deliberately empty. No stock photography and no faces — every tile is a
 * brand-coloured placeholder that says what will go in it, so the section
 * looks unfinished on purpose rather than broken.
 *
 * Set `image` on a gallery entry in shop.ts and that tile switches to the real
 * photo. The tiles keep a fixed aspect ratio either way, so adding photos can
 * never shift the layout.
 */
export function Gallery() {
  const hasPhotos = shop.gallery.some((tile) => tile.image);

  return (
    <Section id="gallery" title="ผลงาน" bleed>
      {hasPhotos ? null : (
        <p className="mt-3 max-w-[42ch] px-5 text-sm leading-relaxed text-coffee/70 sm:px-8">
          กำลังรวบรวมรูปผลงานจริงจากทางร้าน ช่องด้านล่างคือตำแหน่งที่รูปจะขึ้น
        </p>
      )}

      <ul className="mt-7 grid grid-cols-2 gap-3 px-5 sm:grid-cols-3 sm:gap-4 sm:px-8">
        {shop.gallery.map((tile) => (
          <li
            key={tile.id}
            className="relative aspect-4/5 overflow-hidden rounded-[3px] border border-line bg-paper/70"
          >
            {tile.image ? (
              <Image
                src={tile.image}
                alt={tile.caption}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 p-3 text-center">
                <HairGlyph glyph={tile.glyph} />
                <p className="text-sm leading-snug">{tile.caption}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
