"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Travel distance in px. Negative pulls down. */
  y?: number;
  delay?: number;
  /** Stagger direct children instead of animating the wrapper as one block. */
  stagger?: number;
  /** Start slightly rotated + scaled for a heavier, more physical entrance. */
  variant?: "fade" | "lift" | "blur";
  as?: ElementType;
};

/**
 * Generic scroll-in reveal. Wraps content, fires once when it enters the
 * viewport, and no-ops (leaving content visible) under reduced motion.
 */
export default function Reveal({
  children,
  className = "",
  y = 40,
  delay = 0,
  stagger,
  variant = "lift",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) return;

      const targets = stagger ? Array.from(el.children) : el;

      const from: gsap.TweenVars = {
        autoAlpha: 0,
        y,
        duration: 1.0,
        delay,
        stagger: stagger ?? 0,
        ease: "expo.out",
        clearProps: "all",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      };

      if (variant === "lift") {
        from.scale = 0.97;
      }
      // "blur" is kept as a name for existing callers but plays as a fade:
      // animating filter: blur() repaints every frame and flickers.

      gsap.from(targets, from);
    },
    { scope: ref, dependencies: [] },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
