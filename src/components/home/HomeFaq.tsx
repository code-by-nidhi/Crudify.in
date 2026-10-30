"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";
import KeywordText from "./KeywordText";
import { FAQS } from "./homeContent";

/** Same accordion as ServicesFaq, reading the homepage questions. The
 *  FAQPage JSON-LD in app/page.tsx is built from the same FAQS array. */
export default function HomeFaq() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  const { contextSafe } = useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-faq]");

      if (prefersReducedMotion()) {
        gsap.set(rows, { autoAlpha: 1 });
        return;
      }

      gsap.from(rows, {
        autoAlpha: 0,
        y: 34,
        duration: 0.9,
        stagger: 0.07,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
      });
    },
    { scope: root },
  );

  // Heights are tweened by GSAP rather than a CSS grid-rows transition: the
  // fr interpolation reflows every frame and stutters under Lenis, and two
  // rows animating on separate CSS timelines make the list jump.
  const toggle = contextSafe((i: number) => {
    const next = open === i ? null : i;
    const panels = gsap.utils.toArray<HTMLElement>("[data-faq-panel]");
    const instant = prefersReducedMotion();

    panels.forEach((panel, j) => {
      const show = j === next;
      const wasOpen = j === open;
      if (!show && !wasOpen) return;

      gsap.to(panel, {
        height: show ? "auto" : 0,
        autoAlpha: show ? 1 : 0,
        duration: instant ? 0 : 0.5,
        ease: "power3.inOut",
        overwrite: true,
      });
    });

    // The page below just changed length, so later triggers need new offsets.
    gsap.delayedCall(instant ? 0 : 0.55, () => ScrollTrigger.refresh());
    setOpen(next);
  });

  return (
    <section
      ref={root}
      id="faq"
      className="bg-pattern-digital relative px-[4vw] py-24 sm:py-32 border-t border-secondary/20"
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-tertiary">
            <AnimatedText text="Frequently Asked" onScroll />
            <br />
            <AnimatedText text="Questions" className="text-accent" onScroll />
          </h2>
          <p className="mt-6 max-w-[40ch] text-[14.5px] leading-relaxed text-tertiary/60">
            Don&apos;t see your question? Send it through the form below and our
            team will reply.
          </p>
        </div>

        <ul className="flex flex-col">
          {FAQS.map((faq, i) => {
            const expanded = open === i;

            return (
              <li
                key={faq.q}
                data-faq
                style={{ visibility: "hidden" }}
                className="group relative border-b border-tertiary/15 first:border-t first:border-tertiary/15"
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 origin-bottom bg-secondary/[0.06] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 ${
                    expanded ? "scale-y-100" : "scale-y-0"
                  }`}
                />
                <h3 className="relative">
                  <button
                    onClick={() => toggle(i)}
                    aria-expanded={expanded}
                    aria-controls={`home-faq-panel-${i}`}
                    className="flex w-full items-start gap-5 px-2 py-7 text-left"
                  >
                    <span className="mt-1 w-7 shrink-0 font-mono text-[13px] font-medium text-secondary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`max-w-[44ch] flex-1 font-display text-[clamp(1.15rem,1.7vw,1.5rem)] font-semibold leading-snug tracking-[-0.02em] transition-colors ${
                        expanded ? "text-secondary" : "text-tertiary/80"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        expanded
                          ? "rotate-45 border-secondary bg-secondary/15 text-secondary"
                          : "border-tertiary/20 text-tertiary/60"
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                {/* Answers stay in the DOM when collapsed so crawlers and AI
                    assistants can still read them. */}
                <div
                  id={`home-faq-panel-${i}`}
                  data-faq-panel
                  className={`overflow-hidden ${i === 0 ? "" : "invisible h-0"}`}
                >
                  <p className="relative max-w-[62ch] pb-8 pl-14 pr-2 text-[15px] leading-relaxed text-tertiary/65">
                    <KeywordText text={faq.a} />
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
