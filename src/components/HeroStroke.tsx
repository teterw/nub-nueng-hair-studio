/**
 * The page's one bold moment: three strands of hair drawn as continuous
 * strokes across the foot of the hero, which draw themselves once on load.
 *
 * `pathLength={900}` normalises every path to the same length so a single CSS
 * `stroke-dasharray` value works for all three. The animation lives in
 * globals.css and is switched off under `prefers-reduced-motion`.
 */
export function HeroStroke() {
  return (
    <svg
      viewBox="0 0 400 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className="hero-stroke h-[88px] w-full text-coffee sm:h-[130px]"
      style={{ "--stroke-len": 900 } as React.CSSProperties}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <path
          pathLength={900}
          d="M-8 78C48 30 118 100 176 52S318 4 408 40"
          strokeWidth="1.8"
          opacity="0.9"
        />
        <path
          pathLength={900}
          d="M-8 96C56 48 126 118 188 70S326 26 408 60"
          strokeWidth="1.1"
          opacity="0.55"
        />
        <path
          pathLength={900}
          d="M-8 112C66 66 136 132 202 88S330 48 408 80"
          strokeWidth="0.8"
          opacity="0.3"
        />
      </g>
    </svg>
  );
}
