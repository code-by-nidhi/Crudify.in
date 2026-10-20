"use client";

import Image from "next/image";
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
  image,
}: {
  items?: Stat[];
  ariaLabel?: string;
  /** Optional backdrop photo; the numbers then sit on a dark band over it. */
  image?: { src: string; alt: string };
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
      <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[32px] shadow-[0_28px_60px_-20px_var(--shadow-warm-strong)]">
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1240px) 1180px, 92vw"
            className="object-cover"
          />
        )}
        {/* noir-into-maroon wash, so the cotton numbers hold over any photo */}
        <div className="absolute inset-0 bg-gradient-to-br from-ink/90 via-ink/80 to-contrast/85" />

        <div className="relative grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {items.map((stat) => (
            <div
              key={stat.label}
              data-stat
              className="relative px-8 py-10 sm:py-14 lg:border-l lg:border-primary/15 lg:first:border-l-0"
              style={{ visibility: "hidden" }}
            >
              <p className="font-display text-[clamp(3rem,5vw,4.2rem)] font-bold leading-none tracking-[-0.05em] text-primary">
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
                <span className="text-primary/60">{stat.suffix}</span>
              </p>
              <span className="mt-5 block h-[2px] w-10 rounded-full bg-primary/50" />
              <p className="mt-4 max-w-[22ch] text-[14px] leading-snug text-primary/75">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
