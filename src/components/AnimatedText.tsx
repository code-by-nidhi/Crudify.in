"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  text: string;
  className?: string;
  /** Per-word delay. */
  stagger?: number;
  delay?: number;
  /** Wait for the block to scroll into view instead of firing on mount. */
  onScroll?: boolean;
};

/**
 * Word-by-word mask reveal. Each word sits inside an `overflow-hidden` sleeve
 * and slides up out of it — the effect SplitText gives, done with plain markup
 * so there is nothing to re-split on resize.
 */
export default function AnimatedText({
  text,
  className = "",
  stagger = 0.07,
  delay = 0,
  onScroll = false,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) return;

      gsap.from(el.querySelectorAll("[data-word]"), {
        yPercent: 110,
        rotate: 3,
        duration: 1.1,
        ease: "expo.out",
        stagger,
        delay,
        clearProps: "transform,rotate",
        ...(onScroll
          ? { scrollTrigger: { trigger: el, start: "top 90%", once: true } }
          : {}),
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.14em] align-bottom"
        >
          {/* trailing padding stands in for the space the sleeve would swallow */}
          <span
            data-word
            className={`inline-block will-change-transform${
              i < words.length - 1 ? " pr-[0.26em]" : ""
            }`}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
