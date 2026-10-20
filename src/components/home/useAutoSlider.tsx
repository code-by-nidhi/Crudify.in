"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
} from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * A horizontal, auto-advancing card slider built on native scroll-snap, so
 * swipe and trackpad work for free; arrows, dots and autoplay all drive the
 * same scroll.
 *
 * Put `track` on the scrolling row (its direct children are the slides) and
 * spread `pauseProps` on the wrapper. Autoplay pauses only while a real mouse
 * hovers or the keyboard is focused inside — taps and clicks never leave it
 * stuck paused.
 */
export function useAutoSlider(count: number, intervalMs = 5000) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pages, setPages] = useState(count);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  /** Distance between two neighbouring slides, gap included. */
  const step = () => {
    const el = track.current;
    const first = el?.children[0] as HTMLElement | undefined;
    const second = el?.children[1] as HTMLElement | undefined;
    if (!first) return 0;
    return second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
  };

  const goTo = useCallback((index: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({
      left: index * step(),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  // Which slide is at the left edge, and how many stops there are given how
  // many cards fit on screen at the current width.
  useEffect(() => {
    const el = track.current;
    if (!el) return;

    const measure = () => {
      const s = step();
      if (!s) return;
      setActive(Math.round(el.scrollLeft / s));
      const perView = Math.max(1, Math.round(el.clientWidth / s));
      setPages(Math.max(1, count - perView + 1));
    };

    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [count]);

  // Autoplay, looping back to the start. Off for reduced-motion visitors.
  const paused = hovered || focused;
  useEffect(() => {
    if (paused || pages <= 1 || prefersReducedMotion()) return;
    const id = setInterval(() => {
      goTo(active + 1 >= pages ? 0 : active + 1);
    }, intervalMs);
    return () => clearInterval(id);
  }, [active, pages, paused, intervalMs, goTo]);

  const pauseProps = {
    onPointerEnter: (e: PointerEvent) => {
      if (e.pointerType === "mouse") setHovered(true);
    },
    onPointerLeave: (e: PointerEvent) => {
      if (e.pointerType === "mouse") setHovered(false);
    },
    // Keyboard focus only — a mouse click on an arrow also focuses it, and
    // that must not freeze the slider.
    onFocus: (e: FocusEvent) => {
      if ((e.target as HTMLElement).matches(":focus-visible")) setFocused(true);
    },
    onBlur: () => setFocused(false),
  };

  return { track, active, pages, goTo, pauseProps };
}

/** Prev / next arrow pair for a slider. */
export function SliderArrows({
  active,
  pages,
  goTo,
  label,
}: {
  active: number;
  pages: number;
  goTo: (index: number) => void;
  label: string;
}) {
  return (
    <div className="flex gap-2">
      {[
        { name: `Previous ${label}`, dir: -1, path: "M15 6l-6 6 6 6" },
        { name: `Next ${label}`, dir: 1, path: "M9 6l6 6-6 6" },
      ].map((btn) => (
        <button
          key={btn.name}
          type="button"
          aria-label={btn.name}
          // Arrows wrap around, matching the autoplay loop.
          onClick={() => goTo((active + btn.dir + pages) % pages)}
          disabled={pages <= 1}
          className="grid h-12 w-12 place-items-center rounded-full border border-secondary/30 bg-surface text-secondary shadow-sm transition-all hover:border-secondary hover:bg-secondary hover:text-primary disabled:pointer-events-none disabled:opacity-35"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d={btn.path} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ))}
    </div>
  );
}

/** Position dots; the current one stretches into a pill. */
export function SliderDots({
  active,
  pages,
  goTo,
  label,
}: {
  active: number;
  pages: number;
  goTo: (index: number) => void;
  label: string;
}) {
  if (pages <= 1) return null;
  return (
    <div className="mt-2 flex justify-center gap-2">
      {Array.from({ length: pages }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to ${label} ${i + 1}`}
          aria-current={active === i}
          onClick={() => goTo(i)}
          className={`h-2 rounded-full transition-all duration-500 ${
            active === i ? "w-8 bg-secondary" : "w-2 bg-tertiary/20 hover:bg-tertiary/40"
          }`}
        />
      ))}
    </div>
  );
}
