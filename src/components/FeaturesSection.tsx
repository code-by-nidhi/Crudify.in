"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import AnimatedText from "./AnimatedText";
import { CourseIcon } from "./Icons";
import KeywordText from "./home/KeywordText";
import { BRAND, WHY_US } from "./home/homeContent";

/** Copy lives in homeContent so it stays in step with the rest of the page. */
const FEATURES = WHY_US;

export default function FeaturesSection() {
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

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

      /* The rail only travels sideways where there is room for it and where the
         visitor has not asked for less motion. Everywhere else the same markup
         is a plain wrapping grid — matchMedia tears the ScrollTrigger down and
         rebuilds it on its own when the query stops matching. */
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = rail.current;
          const pin = viewport.current;
          if (!track || !pin) return;

          // Measured on every refresh so a resize re-derives it rather than
          // scrolling to a stale distance.
          const travel = () => Math.max(track.scrollWidth - window.innerWidth, 0);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: () => "+=" + travel(),
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });

          tl.to(track, { x: () => -travel(), ease: "none" }, 0);
          tl.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);

          // Cards lean in slightly as they cross the middle of the screen.
          gsap.utils.toArray<HTMLElement>("[data-feature-card]").forEach((card) => {
            gsap.fromTo(
              card,
              { scale: 0.96 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: tl,
                  start: "left 85%",
                  end: "left 45%",
                  scrub: true,
                },
              },
            );
          });

          return () => {
            gsap.set(track, { clearProps: "x" });
          };
        },
      );

      // A pin inserts a spacer, so anything measured before it existed is stale.
      ScrollTrigger.refresh();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="features"
      className="relative border-t border-secondary/20 bg-pattern-web"
    >
      {/* The pinned stage. The heading lives inside it so it stays on screen for
          the whole sideways run — and so the rail is not stranded in the middle
          of an otherwise empty viewport. Below lg this is an ordinary block and
          the rail wraps into a grid, so the section reads the same without the
          pin. */}
      <div
        ref={viewport}
        className="relative motion-safe:lg:h-screen motion-safe:lg:overflow-hidden"
      >
        <div className="flex h-full flex-col justify-center gap-10 py-24 sm:py-28 motion-safe:lg:gap-12 motion-safe:lg:py-0">
          <div className="mx-auto w-full max-w-[1240px] px-[4vw]">
            <p data-features-head className="eyebrow">
              Why Us
            </p>
            <h2 className="mt-4 max-w-[22ch] font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
              <AnimatedText text="Why Businesses" onScroll />{" "}
              <AnimatedText text={`Choose ${BRAND}`} className="text-accent" onScroll />
            </h2>
            <p
              data-features-head
              className="mt-5 max-w-[56ch] text-[1.02rem] leading-relaxed text-tertiary/70"
            >
              Five reasons businesses in Ludhiana and across India trust us with
              their growth.
            </p>
          </div>

          <div
            ref={rail}
            className="grid gap-5 px-[4vw] sm:grid-cols-2 motion-reduce:lg:grid-cols-3 motion-safe:lg:flex motion-safe:lg:w-max motion-safe:lg:gap-6 motion-safe:lg:pr-[8vw]"
          >
          {FEATURES.map((feature, i) => (
            <article
              key={feature.title}
              data-feature-card
              className="panel group flex flex-col p-7 sm:p-8 motion-safe:lg:w-[380px] motion-safe:lg:shrink-0"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="icon-glow-badge h-12 w-12 shrink-0">
                  <CourseIcon name={feature.icon} className="h-5 w-5" />
                </span>
                <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-6 font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.02em] transition-colors group-hover:text-secondary">
                {feature.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-tertiary/60">
                <KeywordText text={feature.body} />
              </p>
            </article>
          ))}
          </div>

          {/* Progress rail — only meaningful while the section is pinned */}
          <div className="hidden px-[4vw] motion-safe:lg:block">
            <div className="mx-auto h-[3px] w-[min(420px,40vw)] overflow-hidden rounded-full bg-tertiary/12">
              <div
                ref={bar}
                className="h-full w-full origin-left scale-x-0 rounded-full bg-secondary"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
