"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";

const MILESTONES = [
  {
    year: "Now",
    title: "Punjab",
    body: "Starting local — building, marketing and securing for businesses close to home.",
  },
  {
    year: "Next",
    title: "The rest of India",
    body: "Taking the same model to India's bigger cities.",
  },
  {
    year: "Then",
    title: "The Gulf",
    body: "The first market outside India, with the same team and the same two tiers.",
  },
  {
    year: "Eventually",
    title: "UK & US",
    body: "Same model, same team, new markets.",
  },
];

export default function AboutTimeline() {
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-milestone]");

      if (prefersReducedMotion()) {
        gsap.set(rows, { autoAlpha: 1 });
        gsap.set(rail.current, { scaleY: 1 });
        return;
      }

      // The mint rail fills as the list scrolls through the viewport.
      gsap.to(rail.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-milestone-list]",
          start: "top 70%",
          end: "bottom 70%",
          scrub: 0.6,
        },
      });

      rows.forEach((row) => {
        gsap.from(row, {
          autoAlpha: 0,
          x: -34,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 85%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="about-timeline"
      className="bg-pattern-configurator relative px-[4vw] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <p className="eyebrow">Where we&rsquo;re headed</p>
        <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
          <AnimatedText text="India first," onScroll />{" "}
          <AnimatedText text="then further." className="text-accent" onScroll />
        </h2>

        <div data-milestone-list className="relative mt-14 pl-10 sm:pl-14">
          {/* rail */}
          <div className="absolute bottom-0 left-[11px] top-2 w-px bg-tertiary/12 sm:left-[19px]">
            <div
              ref={rail}
              className="h-full w-full origin-top scale-y-0 bg-secondary shadow-[0_0_12px_var(--color-secondary)]"
            />
          </div>

          <ol className="flex flex-col gap-4">
            {MILESTONES.map((item) => (
              <li
                key={item.year}
                data-milestone
                style={{ visibility: "hidden" }}
                className="group relative"
              >
                <span className="absolute -left-10 top-6 grid h-6 w-6 place-items-center rounded-full border border-secondary/40 bg-primary transition-colors group-hover:border-secondary sm:-left-14">
                  <span className="h-2 w-2 rounded-full bg-secondary transition-transform group-hover:scale-150" />
                </span>

                <article className="panel p-7">
                  <span className="panel panel-pill panel-quiet inline-flex px-3 py-1.5 font-mono text-[11px] text-tertiary/75">
                    {item.year}
                  </span>
                  <h3 className="mt-5 font-display text-[1.25rem] font-semibold tracking-[-0.02em] transition-colors group-hover:text-secondary">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[60ch] text-[14.5px] leading-relaxed text-tertiary/60">
                    {item.body}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
