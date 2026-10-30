"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, SCRAMBLE_CHARS } from "@/lib/gsap";

/**
 * Every "(Label)" eyebrow on the page re-types itself through scrambled glyphs
 * the first time it scrolls into view — the template's scramble, applied site
 * wide. Only plain-text labels are touched, and the text always settles back
 * to exactly what was rendered.
 */
export default function ScrambleLabels() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>(".eyebrow").forEach((el) => {
        if (el.children.length > 0 || !el.textContent?.trim()) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top 92%",
          once: true,
          onEnter: () =>
            gsap.to(el, {
              duration: 1.1,
              scrambleText: { text: "{original}", chars: SCRAMBLE_CHARS, speed: 0.6 },
            }),
        });
      });
    });

    return () => ctx.revert();
  }, [pathname]);

  return null;
}
