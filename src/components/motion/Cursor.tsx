"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * The template's cursor follower: a small cherry dot trailing the pointer. It
 * swells into a ring over links and buttons, and into a filled disc with an
 * arrow over anything marked data-cursor (cards that open something). Over
 * form fields it steps aside for the native caret. Mouse-only — touch and
 * reduced-motion visitors never get it.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = dot.current;
    if (!el) return;
    if (prefersReducedMotion() || !matchMedia("(pointer: fine)").matches) return;

    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
    let mode = "";
    let pending: ReturnType<typeof setTimeout> | undefined;

    const apply = (next: string) => {
      if (next === mode) return;
      mode = next;
      el.dataset.mode = next;
      gsap.to(el, {
        scale: { card: 1, link: 0.55, field: 0, dot: 0.18 }[next] ?? 0.18,
        duration: 0.4,
        ease: "expo.out",
        overwrite: "auto",
      });
    };

    // Growing onto a target is immediate; shrinking back waits a beat, so
    // crossing the gap between two buttons or cards doesn't pulse the ring.
    const setMode = (next: string) => {
      clearTimeout(pending);
      if (next === "dot" && mode !== "dot" && mode !== "") {
        pending = setTimeout(() => apply("dot"), 120);
      } else {
        apply(next);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      gsap.set(el, { autoAlpha: 1 });
      x(e.clientX);
      y(e.clientY);

      const target = e.target as Element | null;
      setMode(
        target?.closest("input, select, textarea")
          ? "field"
          : target?.closest("[data-cursor]")
            ? "card"
            : target?.closest("a, button, [role='button']")
              ? "link"
              : "dot",
      );
    };
    const onLeave = () => gsap.to(el, { autoAlpha: 0, duration: 0.3 });

    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0.18, autoAlpha: 0 });
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      clearTimeout(pending);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  });

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="cursor-dot pointer-events-none fixed left-0 top-0 z-[150] grid h-20 w-20 place-items-center rounded-full"
    >
      <span className="cursor-arrow text-[1.6rem] font-light leading-none">↗</span>
    </div>
  );
}
