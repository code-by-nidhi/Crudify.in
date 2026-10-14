"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { CourseIcon, type IconName } from "../Icons";

const STEPS: { icon: IconName; title: string; body: string; meta: string }[] = [
  {
    icon: "activity",
    title: "Discovery call",
    body: "Ten minutes to understand the business, the sector, and which tier fits.",
    meta: "10 minutes",
  },
  {
    icon: "sliders",
    title: "Scope & quote",
    body: "A clear scope document and fixed price before any work starts — no surprise additions.",
    meta: "Fixed price",
  },
  {
    icon: "code",
    title: "Build",
    body: "Dev, marketing and security work in parallel, not in sequence.",
    meta: "In parallel",
  },
  {
    icon: "zap",
    title: "Launch & handover",
    body: "Live site or system, plus a short walkthrough so you aren't dependent on us for every small change.",
    meta: "Go live",
  },
];

export default function ServicesProcess() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-step]");

      if (prefersReducedMotion()) {
        gsap.set(cards, { autoAlpha: 1 });
        return;
      }

      gsap.from(cards, {
        autoAlpha: 0,
        y: 48,
        duration: 1,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="services-process"
      className="relative border-y border-tertiary/12 bg-secondary/8 px-[4vw] py-24 text-tertiary sm:py-28"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col justify-between gap-6 border-b border-tertiary/18 pb-12 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-secondary/20 text-secondary">
                <CourseIcon name="refresh" className="h-3.5 w-3.5" />
              </span>
              <div className="eyebrow font-extrabold !text-secondary">
                How we deliver
              </div>
            </div>
            <h2 className="mt-2 font-display text-[clamp(2.2rem,4.5vw,3.4rem)] font-extrabold tracking-tight text-tertiary">
              A process you can <span className="text-secondary">audit</span>
            </h2>
          </div>
          <p className="max-w-xl text-base font-medium text-tertiary/65">
            Same four steps on either tier — only the length of the build
            changes. You always know which one you are in.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <article
              key={step.title}
              data-step
              style={{ visibility: "hidden" }}
              className="panel-light group flex flex-col rounded-3xl border border-tertiary/12 bg-surface p-7 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-2xl border border-secondary/30 bg-secondary/10 p-3 text-secondary shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <CourseIcon name={step.icon} className="h-5 w-5" />
                </span>
                <span className="rounded-full border border-secondary/30 bg-secondary/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-secondary">
                  {step.meta}
                </span>
              </div>

              <span className="mt-6 font-mono text-xs font-bold text-secondary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-lg font-extrabold text-tertiary">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] font-medium leading-relaxed text-tertiary/65">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
