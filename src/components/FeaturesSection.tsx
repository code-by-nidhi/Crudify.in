"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import AnimatedText from "./AnimatedText";
import { CourseIcon, type IconName } from "./Icons";

const FEATURES: { icon: IconName; tag: string; title: string; body: string }[] = [
  {
    icon: "globe",
    tag: "Local",
    title: "Local Punjab Expertise",
    body: "We understand Ludhiana, Mohali, and Punjab's local market, language, and buyer behavior better than any national agency.",
  },
  {
    icon: "cpu",
    tag: "Hybrid",
    title: "AI + Human Hybrid Model",
    body: "Get AI-speed execution with human strategy — the best of both without paying premium for everything.",
  },
  {
    icon: "key",
    tag: "Pricing",
    title: "Transparent Pricing",
    body: "No hidden costs. Choose AI-based affordable plans or full human-managed premium plans.",
  },
  {
    icon: "cube",
    tag: "Full-Funnel",
    title: "Full-Funnel Capability",
    body: "Ads, website, content, automation, and security — one team, one dashboard, zero coordination headache.",
  },
  {
    icon: "zap",
    tag: "Speed",
    title: "Fast Turnaround",
    body: "Our AI-powered workflows mean content, creatives, and reports get delivered in days, not weeks.",
  },
  {
    icon: "chart",
    tag: "Data",
    title: "Data-Backed Decisions",
    body: "Every campaign is tracked through CRM dashboards so you always know your ROI.",
  },
];

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
              Why Crudify
            </p>
            <h2 className="mt-4 max-w-[22ch] font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
              <AnimatedText text="What Makes Us the Best" onScroll />{" "}
              <AnimatedText text="Marketing Company in Punjab" className="text-accent" onScroll />
            </h2>
            <p
              data-features-head
              className="mt-5 max-w-[56ch] text-[1.02rem] leading-relaxed text-tertiary/70"
            >
              Six reasons Ludhiana and Punjab businesses trust us with their
              growth — and keep working with us.
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

              <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
                {feature.tag}
              </p>
              <h3 className="mt-2 font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.02em] transition-colors group-hover:text-secondary">
                {feature.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-tertiary/60">
                {feature.body}
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
