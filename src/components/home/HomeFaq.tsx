"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";
import { FAQS } from "./homeContent";

/** Same accordion as ServicesFaq, reading the homepage questions. The
 *  FAQPage JSON-LD in app/page.tsx is built from the same FAQS array. */
export default function HomeFaq() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useGSAP(
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

  return (
    <section
      ref={root}
      id="faq"
      className="bg-pattern-digital relative px-[4vw] py-24 sm:py-32 border-t border-secondary/20"
    >
      <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
            <AnimatedText text="Frequently Asked" onScroll />
            <br />
            <AnimatedText text="Questions" className="text-accent" onScroll />
          </h2>
          <p className="mt-6 max-w-[40ch] text-[14.5px] leading-relaxed text-tertiary/60">
            Don&apos;t see your question? Send it through the form below and a
            growth strategist will reply.
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
                className="border-b border-tertiary/10 first:border-t first:border-tertiary/10"
              >
                <h3>
                  <button
                    onClick={() => setOpen(expanded ? null : i)}
                    aria-expanded={expanded}
                    aria-controls={`home-faq-panel-${i}`}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={`max-w-[44ch] font-display text-[1.1rem] font-semibold leading-snug tracking-[-0.02em] transition-colors ${
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
                  className={`grid transition-all duration-400 ease-out ${
                    expanded
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[62ch] pb-7 text-[14.5px] leading-relaxed text-tertiary/60">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
