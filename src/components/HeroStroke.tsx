/**
 * Three strands of hair drawn as continuous strokes across the foot of the
 * hero, which draw themselves once on load.
 *
 * The same three paths serve every style: globals.css gives each one its stroke
 * width, opacity and colour per theme, so มินิมอล shows a single hairline while
 * กลางคืน shows all three in gold. Widths are deliberately not set here — one
 * source of truth beats a presentation attribute that CSS silently overrides.
 *
 * `pathLength={900}` normalises every path to the same length, so one CSS
 * `stroke-dasharray` value works for all three.
 */
export function HeroStroke() {
  return (
    <svg
      viewBox="0 0 400 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className="hero-stroke h-[88px] w-full sm:h-[130px]"
      style={{ "--stroke-len": 900 } as React.CSSProperties}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <path pathLength={900} d="M-8 78C48 30 118 100 176 52S318 4 408 40" />
        <path pathLength={900} d="M-8 96C56 48 126 118 188 70S326 26 408 60" />
        <path pathLength={900} d="M-8 112C66 66 136 132 202 88S330 48 408 80" />
      </g>
    </svg>
  );
}
