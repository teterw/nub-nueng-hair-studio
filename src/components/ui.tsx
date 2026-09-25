import type { ReactNode } from "react";

/** Placeholder links stay clickable so the demo feels whole, but never open a tab. */
export function linkProps(href: string) {
  return href === "#" ? {} : { target: "_blank", rel: "noopener noreferrer" };
}

export const buttonBase =
  "inline-flex items-center justify-center rounded-[3px] px-6 py-3 text-base leading-none transition-colors";

export const buttonSolid = `${buttonBase} bg-coffee text-cream hover:bg-coffee/88`;

export const buttonOutline = `${buttonBase} border border-line-strong text-coffee hover:bg-coffee/6`;

/**
 * Sections are separated by a single hairline rather than cards or shadows —
 * the whole page is built out of lines, like the logo.
 */
export function Section({
  id,
  title,
  children,
  bleed = false,
}: {
  id: string;
  title: string;
  children: ReactNode;
  /** Let the child manage its own horizontal padding (used by the gallery). */
  bleed?: boolean;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line">
      <div className={`mx-auto w-full max-w-4xl py-14 sm:py-20 ${bleed ? "" : "px-5 sm:px-8"}`}>
        <h2
          id={`${id}-title`}
          className={`font-display text-[1.5rem] sm:text-[1.9rem] ${bleed ? "px-5 sm:px-8" : ""}`}
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
