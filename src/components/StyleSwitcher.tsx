"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { defaultTheme, themeStorageKey, themes } from "@/data/themes";

/**
 * The style picker. This is a tool for choosing a look, not part of the shop's
 * site — it is labelled as such, and deleting this one component plus the
 * [data-theme] blocks in globals.css leaves the chosen style behind.
 *
 * The swatches are not hardcoded colours. Each one carries `data-theme`, so it
 * renders in that style's own tokens straight out of the stylesheet and cannot
 * drift when a palette is edited.
 */

/**
 * `data-theme` on <html> is the single source of truth: the inline script in
 * the layout sets it before first paint, and this component both reads and
 * writes it. Subscribing to the attribute rather than mirroring it into state
 * means the two can never disagree, and it keeps hydration honest — the server
 * snapshot is the default style, which is exactly what the HTML ships with.
 */
function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function readTheme() {
  return document.documentElement.getAttribute("data-theme") ?? defaultTheme;
}

export function StyleSwitcher() {
  const [open, setOpen] = useState(false);
  const active = useSyncExternalStore(subscribeToTheme, readTheme, () => defaultTheme);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Keep the browser chrome in step with the page. Without this, picking
  // กลางคืน leaves a cream status bar sitting above a near-black page on a
  // phone. Read from the live tokens rather than a second copy of the palette.
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    const bg = getComputedStyle(document.documentElement).getPropertyValue("--color-bg").trim();
    if (bg) meta.setAttribute("content", bg);
  }, [active]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  function choose(id: string) {
    // The MutationObserver above turns this into the new `active` value.
    document.documentElement.setAttribute("data-theme", id);
    setOpen(false);
    buttonRef.current?.focus();

    try {
      localStorage.setItem(themeStorageKey, id);
    } catch {
      // Private mode or blocked storage: the style still applies for this visit.
    }

    // Keep the URL in step so the address bar is always a shareable link to
    // whatever is on screen. replaceState avoids stacking history entries.
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("style", id);
      window.history.replaceState({}, "", url);
    } catch {
      // Non-fatal; the style is applied either way.
    }
  }

  const activeLabel = themes.find((t) => t.id === active)?.label ?? "";

  return (
    <div className="fixed top-3 right-3 z-40 sm:top-4 sm:right-4">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="flex items-center gap-2 rounded-[var(--radius)] border border-line-strong bg-bg/90 px-3 py-2 text-sm leading-none backdrop-blur-sm transition-colors hover:bg-surface"
      >
        <span aria-hidden="true" className="flex gap-0.5">
          <span className="h-3.5 w-1.5 rounded-xs bg-ink" />
          <span className="h-3.5 w-1.5 rounded-xs bg-accent" />
          <span className="h-3.5 w-1.5 rounded-xs bg-surface ring-1 ring-line-strong ring-inset" />
        </span>
        เปลี่ยนสไตล์
        <span className="sr-only">— ตอนนี้คือสไตล์{activeLabel}</span>
      </button>

      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="เลือกสไตล์เว็บไซต์"
          className="mt-2 w-[17rem] rounded-[var(--radius)] border border-line-strong bg-bg p-3 shadow-lg shadow-ink/10"
        >
          <p className="text-sm leading-snug">
            เลือกสไตล์ที่ชอบ
            <span className="mt-0.5 block text-xs text-accent">
              เนื้อหาเหมือนกันทุกสไตล์ เปลี่ยนแค่หน้าตา
            </span>
          </p>

          <ul className="mt-3 space-y-1.5">
            {themes.map((theme) => {
              const selected = theme.id === active;
              return (
                <li key={theme.id}>
                  <button
                    type="button"
                    onClick={() => choose(theme.id)}
                    aria-current={selected ? "true" : undefined}
                    className={`flex w-full items-start gap-3 rounded-[var(--radius)] border p-2 text-left transition-colors ${
                      selected
                        ? "border-line-strong bg-surface"
                        : "border-transparent hover:bg-surface/60"
                    }`}
                  >
                    {/* Renders in the candidate style's own tokens, not copies. */}
                    <span
                      data-theme={theme.id}
                      aria-hidden="true"
                      className="mt-0.5 flex shrink-0 overflow-hidden rounded-[var(--radius)] border border-line-strong"
                    >
                      <span className="h-8 w-4 bg-bg" />
                      <span className="h-8 w-4 bg-ink" />
                      <span className="h-8 w-4 bg-accent" />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-sm leading-snug">
                        {theme.label}
                        {selected ? <span className="text-accent"> (ใช้อยู่)</span> : null}
                      </span>
                      <span className="mt-0.5 block text-xs leading-snug text-ink/70">
                        {theme.blurb}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="mt-3 border-t border-line pt-2 text-xs leading-snug text-ink/70">
            ปุ่มนี้มีไว้เลือกสไตล์เท่านั้น จะไม่อยู่ในเว็บไซต์จริงของร้าน
          </p>
        </div>
      ) : null}
    </div>
  );
}
