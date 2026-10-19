"use client";

import { useRef, useState } from "react";
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
    icon: "globe",
    title: "Audience & audit",
    body: "Who buys, where they search, and what your current site, ads and accounts are doing today.",
    meta: "Baseline",
  },
  {
    icon: "sliders",
    title: "Scope & quote",
    body: "A clear scope document and fixed price before any work starts — no surprise additions.",
    meta: "Fixed price",
  },
  {
    icon: "web",
    title: "UI / UX & content",
    body: "Wireframes, copy and creative agreed up front, built around the one action each page should drive.",
    meta: "Sign-off",
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
  {
    icon: "megaphone",
    title: "Campaigns & SEO",
    body: "Ads, search and social switched on against the new pages, with tracking already in place from day one.",
    meta: "Traffic",
  },
  {
    icon: "chart",
    title: "Analytics & reporting",
    body: "One monthly view of spend, enquiries and cost per lead — and the next quarter's priorities drawn from it.",
    meta: "Monthly",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function ServicesProcess() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [current, setCurrent] = useState(0);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-step]");

      if (prefersReducedMotion()) {
        gsap.set(cards, { autoAlpha: 1 });
        return;
      }

      gsap.from(cards, {
        autoAlpha: 0,
        x: 60,
        duration: 1,
        stagger: 0.07,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
    },
    { scope: root },
  );

  /* The counter follows native scrolling (swipe, trackpad, keyboard) rather
     than owning it, so the track still works as a plain overflow list. */
  function syncCurrent() {
    const el = track.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const left = el.scrollLeft;
    let nearest = 0;
    cards.forEach((card, i) => {
      if (Math.abs(card.offsetLeft - left) < Math.abs(cards[nearest].offsetLeft - left)) {
        nearest = i;
      }
    });
    // at the far end the last cards can never reach the left edge
    if (left + el.clientWidth >= el.scrollWidth - 4) nearest = cards.length - 1;
    setCurrent(nearest);
  }

  function go(to: number) {
    const el = track.current;
    if (!el) return;
    const i = Math.max(0, Math.min(STEPS.length - 1, to));
    const card = el.children[i] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({
      left: card.offsetLeft,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
    setCurrent(i);
  }

  return (
    <section
      ref={root}
      id="services-process"
      className="relative overflow-hidden border-y border-tertiary/12 bg-secondary/8 px-[4vw] py-24 text-tertiary sm:py-28"
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
            <h2 className="mt-2 max-w-[20ch] font-display text-[clamp(2.2rem,4.5vw,3.4rem)] font-extrabold leading-[1.05] tracking-tight text-tertiary">
              How we turn traffic into{" "}
              <span className="text-secondary">leads & sales</span>
            </h2>
          </div>
          <p className="max-w-xl text-base font-medium text-tertiary/65">
            The same steps on either tier — only the length of the build
            changes. You always know which one you are in.
          </p>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <p className="font-mono text-sm font-bold tracking-widest text-tertiary/60" aria-live="polite">
            STEP <span className="text-secondary">{pad(current + 1)}</span> / {pad(STEPS.length)}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => go(current - 1)}
              disabled={current === 0}
              aria-label="Previous step"
              className="grid h-11 w-11 place-items-center rounded-full border border-tertiary/20 text-lg transition-colors hover:border-secondary hover:text-secondary disabled:pointer-events-none disabled:opacity-35"
            >
              ←
            </button>
            <button
              onClick={() => go(current + 1)}
              disabled={current === STEPS.length - 1}
              aria-label="Next step"
              className="grid h-11 w-11 place-items-center rounded-full border border-secondary bg-secondary text-lg text-primary transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-35"
            >
              →
            </button>
          </div>
        </div>

        {/* progress rail */}
        <div className="mt-5 h-[3px] w-full overflow-hidden rounded-full bg-tertiary/10">
          <div
            className="h-full rounded-full bg-secondary transition-[width] duration-500 ease-out"
            style={{ width: `${((current + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <ol
          ref={track}
          onScroll={syncCurrent}
          /* relative makes the track the cards' offsetParent, so offsetLeft
             lines up with scrollLeft */
          className="relative mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none]"
        >
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              data-step
              style={{ visibility: "hidden" }}
              onClick={() => go(i)}
              className={`panel-light group flex w-[82%] shrink-0 cursor-pointer snap-start flex-col rounded-3xl border bg-surface p-7 shadow-lg sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] ${
                current === i ? "!border-secondary" : "border-tertiary/12"
              }`}
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
                STEP {pad(i + 1)}
              </span>
              <h3 className="mt-2 font-display text-lg font-extrabold text-tertiary">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] font-medium leading-relaxed text-tertiary/65">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
