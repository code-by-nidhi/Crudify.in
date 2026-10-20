"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import AnimatedText from "./AnimatedText";
import { CourseIcon } from "./Icons";
import KeywordText from "./home/KeywordText";
import { BRAND, WHY_US } from "./home/homeContent";

/** Copy lives in homeContent so it stays in step with the rest of the page. */
const FEATURES = WHY_US;

/* Each card in the stack is a shade deeper than the one before it, so the
   pile reads as a progression from the cotton ground into noir. Cards are
   opaque — they slide over one another — so every face is a solid colour. */
const THEMES = [
  {
    card: "bg-surface text-tertiary border-secondary/15",
    muted: "text-tertiary/60",
    accent: "text-secondary",
    tag: "border-tertiary/20 text-tertiary/75",
  },
  {
    card: "bg-[#E0CFB7] text-tertiary border-secondary/20",
    muted: "text-tertiary/65",
    accent: "text-secondary",
    tag: "border-tertiary/25 text-tertiary/80",
  },
  {
    card: "on-dark bg-secondary text-primary border-primary/15",
    muted: "text-primary/75",
    accent: "text-primary",
    tag: "border-primary/35 text-primary/90",
  },
  {
    card: "on-dark bg-contrast text-primary border-primary/15",
    muted: "text-primary/75",
    accent: "text-primary",
    tag: "border-primary/35 text-primary/90",
  },
  {
    card: "on-dark bg-tertiary text-primary border-primary/10",
    muted: "text-primary/70",
    accent: "text-primary",
    tag: "border-primary/30 text-primary/85",
  },
];

export default function FeaturesSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-features-head]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
        clearProps: "all",
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });

      /* The stack itself is plain CSS sticky. On top of that, each card
         shrinks back a touch as the next one slides over it, so the pile
         reads as depth rather than cards simply overlapping. */
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-feature-card]");

        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;

          gsap.to(card, {
            scale: 0.94,
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: "top 30%",
              scrub: true,
            },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="features"
      className="relative border-t border-secondary/20 bg-pattern-web px-[4vw] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1240px]">
        {/* label row */}
        <div
          data-features-head
          className="flex items-center justify-between gap-4 border-b border-tertiary/15 pb-4"
        >
          <p className="eyebrow">Why Us</p>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-tertiary/55">
            {String(FEATURES.length).padStart(2, "0")} reasons
          </p>
        </div>

        {/* header: heading left, intro right, bottoms aligned */}
        <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10 lg:mt-14">
          <h2 className="max-w-[16ch] font-display text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-tertiary">
            <AnimatedText text="Why Businesses" onScroll />{" "}
            <AnimatedText text={`Choose ${BRAND}`} className="text-accent" onScroll />
          </h2>
          <p
            data-features-head
            className="max-w-[38ch] text-[1.02rem] leading-relaxed text-tertiary/70"
          >
            Five reasons businesses in Ludhiana and across India trust us with
            their growth.
          </p>
        </div>

        {/* the stack — every card sticks a little lower than the one before,
            so the edges of the earlier cards stay visible above it */}
        <ol className="mt-12 flex flex-col gap-6 lg:mt-16">
          {FEATURES.map((feature, i) => {
            const theme = THEMES[i % THEMES.length];

            return (
              <li
                key={feature.title}
                className="sticky"
                style={{ top: `calc(var(--nav-h) + ${1 + i * 0.9}rem)` }}
              >
                <article
                  data-feature-card
                  className={`grid origin-top gap-8 rounded-[28px] border p-7 shadow-[0_-12px_40px_-24px_var(--shadow-warm-strong)] sm:p-10 md:min-h-[26rem] md:grid-cols-[1fr_1.15fr] md:gap-12 lg:p-12 ${theme.card}`}
                >
                  {/* big numeral, sitting on the card's bottom edge on desktop */}
                  <span
                    aria-hidden="true"
                    className="order-2 font-display text-[clamp(4.5rem,11vw,9.5rem)] font-semibold leading-[0.8] tracking-[-0.07em] md:order-none md:self-end"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex flex-col gap-6">
                    <div
                      className={`flex items-center justify-between border-b border-current/20 pb-4 text-[11px] font-bold uppercase tracking-[0.2em] opacity-80 ${theme.accent}`}
                    >
                      <span className="flex items-center gap-2">
                        <CourseIcon name={feature.icon} className="h-4 w-4" />
                        {feature.label}
                      </span>
                      <span className="font-mono">
                        {String(i + 1).padStart(2, "0")} /{" "}
                        {String(FEATURES.length).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.08] tracking-[-0.03em] md:mt-auto">
                      {feature.title}
                    </h3>
                    <p className={`max-w-[34ch] text-[1.02rem] font-medium leading-relaxed ${theme.muted}`}>
                      <KeywordText text={feature.body} />
                    </p>

                    <ul className="flex flex-wrap gap-2">
                      {feature.tags.map((tag) => (
                        <li
                          key={tag}
                          className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium ${theme.tag}`}
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
