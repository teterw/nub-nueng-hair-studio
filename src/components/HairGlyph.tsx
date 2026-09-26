import type { GalleryItem } from "@/data/shop";

/**
 * Line-art glyphs for the empty gallery tiles, drawn in the same vocabulary as
 * the logo: one continuous brown stroke, no fills, no scissors or razors.
 * Each tile gets a different glyph so the grid never reads as a broken repeat.
 */
const paths: Record<GalleryItem["glyph"], string[]> = {
  // Soft waves — colour work.
  wave: [
    "M6 16c6-7 12 7 18 0s12 7 18 0",
    "M6 26c6-7 12 7 18 0s12 7 18 0",
    "M6 36c6-7 12 7 18 0s12 7 18 0",
  ],
  // Length falling either side of a face, turning in at the jaw — women's cuts.
  bob: [
    "M16 12c-4 9-6 18-3 25",
    "M32 12c4 9 6 18 3 25",
    "M15 13c2-5 6-8 9-8s7 3 9 8",
    "M24 8v10",
  ],
  // The same strands corkscrewed — perms and volume perms.
  curl: [
    "M13 9c4 3 4 7 0 10s-4 7 0 10 4 7 0 10",
    "M24 9c4 3 4 7 0 10s-4 7 0 10 4 7 0 10",
    "M35 9c4 3 4 7 0 10s-4 7 0 10 4 7 0 10",
  ],
  // Long straight fall with the faintest bend — straightening.
  straight: [
    "M13 7c-1 12-1 24 1 34",
    "M22 7c-1 12-1 25 0 34",
    "M31 7c1 12 1 25 0 34",
    "M40 8c1 12 1 24-1 33",
  ],
  // The same strands cut short and fanned — men's cuts.
  crop: [
    "M12 14c-2 5-3 9-3 13",
    "M20 13c-1 5-1 10-1 14",
    "M28 13c1 5 1 9 1 14",
    "M36 14c2 5 3 8 3 13",
    "M8 30h32",
  ],
  // A drop soaking into a strand — treatments.
  drop: [
    "M24 8c5 7 8 11 8 15a8 8 0 0 1-16 0c0-4 3-8 8-15z",
    "M12 36c8 4 16 4 24 0",
    "M14 42c7 3 14 3 21 0",
  ],
};

export function HairGlyph({ glyph }: { glyph: GalleryItem["glyph"] }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      className="h-12 w-12 text-ink/45"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        {paths[glyph].map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}
