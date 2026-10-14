"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "./AnimatedText";

const STEPS = [
  {
    title: "Free counselling",
    body: "Sit with a mentor, walk through your background and goals, and leave with an honest recommendation — even if that is 'not yet'.",
    meta: "Day 0",
  },
  {
    title: "Structured training",
    body: "Small batches, daily practice sets and weekly assessments. Every concept lands in code or in a drawing the same day you learn it.",
    meta: "Month 1–4",
  },
  {
    title: "Live projects",
    body: "You ship real work for real briefs — client dashboards, production drawings, running ad campaigns — reviewed like a workplace would.",
    meta: "Month 4–5",
  },
  {
    title: "Interview prep",
    body: "Resume clinics, aptitude drills and mock interviews with hiring managers, recorded so you can watch yourself improve.",
    meta: "Month 5–6",
  },
  {
    title: "Placement",
    body: "Drives with 300+ partner companies, and the placement cell keeps working your case until an offer letter lands.",
    meta: "Until hired",
  },
];

export default function Journey() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      const section = root.current;
      if (!el || !section) return;

      // Below lg (and under reduced motion) it stays a normal horizontal
      // swipe list — pinning a viewport-height section on phones is miserable.
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        },
        () => {
          const distance = () => el.scrollWidth - window.innerWidth + 80;

          const tween = gsap.to(el, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                gsap.set(bar.current, { scaleX: self.progress });
              },
            },
          });

          // Panels lean in slightly as they cross the middle of the screen.
          gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel) => {
            gsap.fromTo(
              panel,
              { rotateY: 8, scale: 0.94 },
              {
                rotateY: -8,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: tween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              },
            );
          });
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="journey"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-24 lg:py-0"
    >
      <div className="mx-auto w-full max-w-[1180px] px-[4vw]">
        <p className="eyebrow">How it works</p>
        <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(2rem,4.6vw,3.3rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
          <AnimatedText text="From first enquiry to" onScroll />{" "}
          <AnimatedText text="offer letter." className="text-accent" onScroll />
        </h2>
      </div>

      {/* horizontal rail */}
      <div className="mt-14 overflow-x-auto pb-4 [scrollbar-width:none] lg:overflow-visible [&::-webkit-scrollbar]:hidden">
        <div
          ref={track}
          className="flex w-max gap-5 px-[4vw] [perspective:1600px] lg:pl-[max(4vw,calc((100vw-1180px)/2))]"
        >
          {STEPS.map((step, i) => (
            <article
              key={step.title}
              data-panel
              className="panel flex w-[min(80vw,420px)] shrink-0 flex-col p-7 [transform-style:preserve-3d] sm:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[13px] text-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="panel panel-pill panel-quiet px-3 py-1.5 text-[11px] text-tertiary/75">
                  {step.meta}
                </span>
              </div>

              <div className="mt-8 h-px w-full bg-tertiary/20" />

              <h3 className="mt-8 font-display text-2xl font-semibold tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="mt-4 text-[14.5px] leading-relaxed text-tertiary/60">
                {step.body}
              </p>

              <span className="mt-auto pt-10 text-[11px] uppercase tracking-[0.25em] text-tertiary/45">
                Step {i + 1} of {STEPS.length}
              </span>
            </article>
          ))}
        </div>
      </div>

      {/* scrub progress */}
      <div className="mx-auto mt-8 hidden h-px w-[min(1180px,92vw)] bg-tertiary/10 lg:block">
        <div
          ref={bar}
          className="h-full origin-left scale-x-0 bg-secondary"
        />
      </div>
    </section>
  );
}
