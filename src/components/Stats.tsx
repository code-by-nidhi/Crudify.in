"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

export type Stat = {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
};

const STATS: Stat[] = [
  { value: 25000, suffix: "+", label: "Students trained since 2010" },
  { value: 300, suffix: "+", label: "Recruiters hiring from campus" },
  { value: 42, suffix: "", label: "Job-ready course tracks" },
  { value: 4.8, suffix: "/5", label: "Average student rating", decimals: 1 },
];

export default function Stats({
  items = STATS,
  ariaLabel = "TechCadd by the numbers",
}: {
  items?: Stat[];
  ariaLabel?: string;
} = {}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-stat]");

      if (prefersReducedMotion()) {
        gsap.set(cards, { autoAlpha: 1 });
        cards.forEach((card) => {
          const num = card.querySelector<HTMLElement>("[data-num]");
          if (num) num.textContent = num.dataset.final ?? "";
        });
        return;
      }

      gsap.from(cards, {
        autoAlpha: 0,
        y: 60,
        duration: 1.2,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });

      // Count each number up when its card lands.
      cards.forEach((card, i) => {
        const num = card.querySelector<HTMLElement>("[data-num]");
        if (!num) return;
        const target = Number(num.dataset.value);
        const decimals = Number(num.dataset.decimals ?? 0);
        const counter = { v: 0 };

        gsap.to(counter, {
          v: target,
          duration: 2,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
          onUpdate: () => {
            num.textContent =
              decimals > 0
                ? counter.v.toFixed(decimals)
                : Math.round(counter.v).toLocaleString("en-IN");
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative px-[4vw] py-20 sm:py-24"
      aria-label={ariaLabel}
    >
      <div className="mx-auto grid max-w-[1180px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((stat) => (
          <div
            key={stat.label}
            data-stat
            className="panel p-6"
            style={{ visibility: "hidden" }}
          >
            <p className="font-display text-[2.6rem] font-semibold leading-none tracking-[-0.04em]">
              <span
                data-num
                data-value={stat.value}
                data-decimals={stat.decimals ?? 0}
                data-final={
                  stat.decimals
                    ? stat.value.toFixed(stat.decimals)
                    : stat.value.toLocaleString("en-IN")
                }
              >
                0
              </span>
              <span className="text-tertiary/55">{stat.suffix}</span>
            </p>
            <p className="mt-3 text-[13px] leading-snug text-tertiary/60">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
