"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { defaultLayout, layoutStorageKey, layouts } from "@/data/layouts";
import { defaultTheme, themeStorageKey, themes } from "@/data/themes";
import { LayoutGlyph } from "./LayoutGlyph";

/**
 * The design picker: colour style and page format, chosen independently.
 *
 * This is a tool for deciding, not part of the shop's site — it says so at the
 * bottom of the panel, and the README has the four steps to strip it once the
 * owner has picked.
 *
 * The style swatches are not hardcoded colours. Each carries `data-theme`, so
 * it renders in that style's own tokens straight out of the stylesheet and
 * cannot drift when a palette is edited.
 */

/**
 * `data-theme` and `data-layout` on <html> are the single source of truth: the
 * inline script in the layout sets them before first paint, and this component
 * both reads and writes them. Subscribing to the attributes rather than
 * mirroring them into state means the two can never disagree, and it keeps
 * hydration honest — the server snapshot is the default, which is what the HTML
 * actually ships with.
 */
function subscribeToAttr(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "data-layout"],
  });
  return () => observer.disconnect();
}

function readTheme() {
  return document.documentElement.getAttribute("data-theme") ?? defaultTheme;
}

function readLayout() {
  return document.documentElement.getAttribute("data-layout") ?? defaultLayout;
}

/** Mirrors a choice into storage and the URL. Neither is load-bearing. */
function remember(storageKey: string, param: string, value: string) {
  try {
    localStorage.setItem(storageKey, value);
  } catch {
    // Private mode or blocked storage: the choice still applies for this visit.
  }

  try {
    const url = new URL(window.location.href);
    url.searchParams.set(param, value);
    // replaceState so picking six things in a row does not fill the back button.
    window.history.replaceState({}, "", url);
  } catch {
    // Non-fatal; the choice is applied either way.
  }
}

export function DesignPicker() {
  const [open, setOpen] = useState(false);
  const activeTheme = useSyncExternalStore(subscribeToAttr, readTheme, () => defaultTheme);
  const activeLayout = useSyncExternalStore(subscribeToAttr, readLayout, () => defaultLayout);
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
  }, [activeTheme]);

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

  // The MutationObserver above turns these writes into the new active values.
  function chooseTheme(id: string) {
    document.documentElement.setAttribute("data-theme", id);
    remember(themeStorageKey, "style", id);
  }

  function chooseLayout(id: string) {
    document.documentElement.setAttribute("data-layout", id);
    remember(layoutStorageKey, "layout", id);
  }

  const themeLabel = themes.find((t) => t.id === activeTheme)?.label ?? "";
  const layoutLabel = layouts.find((l) => l.id === activeLayout)?.label ?? "";

  const optionBase =
    "flex w-full items-start gap-3 rounded-[var(--radius)] border p-2 text-left transition-colors";
  const optionOn = "border-line-strong bg-surface";
  const optionOff = "border-transparent hover:bg-surface/60";

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
        ปรับหน้าตา
        <span className="sr-only">
          — ตอนนี้คือสไตล์{themeLabel} รูปแบบ{layoutLabel}
        </span>
      </button>

      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="ปรับหน้าตาเว็บไซต์"
          className="mt-2 max-h-[80vh] w-[18rem] overflow-y-auto overscroll-contain rounded-[var(--radius)] border border-line-strong bg-bg p-3 shadow-lg shadow-ink/10"
        >
          <p className="text-sm leading-snug">
            เลือกได้สองอย่าง
            <span className="mt-0.5 block text-xs text-accent">
              เนื้อหาเหมือนกันทุกแบบ เปลี่ยนแค่หน้าตากับการจัดวาง
            </span>
          </p>

          <section aria-labelledby="picker-style" className="mt-4">
            <h2 id="picker-style" className="text-sm font-semibold leading-snug">
              สไตล์สี
            </h2>
            <ul className="mt-2 space-y-1.5">
              {themes.map((theme) => {
                const on = theme.id === activeTheme;
                return (
                  <li key={theme.id}>
                    <button
                      type="button"
                      onClick={() => chooseTheme(theme.id)}
                      aria-current={on ? "true" : undefined}
                      className={`${optionBase} ${on ? optionOn : optionOff}`}
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
                          {on ? <span className="text-accent"> (ใช้อยู่)</span> : null}
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
          </section>

          <section aria-labelledby="picker-layout" className="mt-5 border-t border-line pt-4">
            <h2 id="picker-layout" className="text-sm font-semibold leading-snug">
              รูปแบบหน้าเว็บ
            </h2>
            <ul className="mt-2 space-y-1.5">
              {layouts.map((layout) => {
                const on = layout.id === activeLayout;
                return (
                  <li key={layout.id}>
                    <button
                      type="button"
                      onClick={() => chooseLayout(layout.id)}
                      aria-current={on ? "true" : undefined}
                      className={`${optionBase} ${on ? optionOn : optionOff}`}
                    >
                      <span className="mt-0.5 shrink-0 text-ink/70">
                        <LayoutGlyph id={layout.id} />
                      </span>

                      <span className="min-w-0">
                        <span className="block text-sm leading-snug">
                          {layout.label}
                          {on ? <span className="text-accent"> (ใช้อยู่)</span> : null}
                        </span>
                        <span className="mt-0.5 block text-xs leading-snug text-ink/70">
                          {layout.blurb}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <p className="mt-4 border-t border-line pt-2 text-xs leading-snug text-ink/70">
            ปุ่มนี้มีไว้เลือกแบบเท่านั้น จะไม่อยู่ในเว็บไซต์จริงของร้าน
          </p>
        </div>
      ) : null}
    </div>
  );
}
