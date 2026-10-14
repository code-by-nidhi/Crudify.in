"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "./AnimatedText";

const REASONS = [
  {
    title: "Mentors from the industry, not just the syllabus",
    body: "Trainers who have shipped production software, stamped real drawings and run real ad budgets — so the examples in class come from work, not textbooks.",
  },
  {
    title: "Batches small enough to be noticed in",
    body: "Capped seats per batch and a doubt-clearing hour every single day. Nobody gets to quietly fall behind.",
  },
  {
    title: "A portfolio, not just a certificate",
    body: "You leave with three to five deployed projects, a cleaned-up GitHub and a resume that survives a recruiter's six-second scan.",
  },
  {
    title: "Placement support that does not expire",
    body: "Alumni from 2019 still get called for drives. Once you are on our list, you stay on it.",
  },
  {
    title: "Learn where you are",
    body: "Three campuses across Punjab plus a live online track with the same trainers, recordings and project reviews.",
  },
];

export default function WhyUs() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-reason]");

      if (prefersReducedMotion()) {
        gsap.set(rows, { autoAlpha: 1 });
        return;
      }

      rows.forEach((row) => {
        gsap.from(row, {
          autoAlpha: 0,
          y: 60,
          duration: 1.05,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 85%", once: true },
        });

        // Dim the row on the way out. Scoped to the inner wrapper so it never
        // fights the autoAlpha entrance running on the <li> itself.
        gsap.to(row.firstElementChild, {
          opacity: 0.32,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top 24%",
            end: "top 6%",
            scrub: true,
          },
        });
      });

      // The glass card on the left drifts against the list.
      gsap.to("[data-why-card]", {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="why" className="relative px-[4vw] py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* sticky column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Why TechCadd</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
            <AnimatedText text="Reputation earned" onScroll />
            <br />
            <AnimatedText
              text="one batch at a time."
              className="text-accent"
              onScroll
            />
          </h2>

          <div data-why-card className="panel mt-10 p-7">
            <p className="text-[15px] leading-relaxed text-tertiary/75">
              &ldquo;I joined after a B.Com and zero coding background. Eleven
              months later I was writing React at a Mohali product company. The
              difference was the daily project review — you could not fake
              progress.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-primary/30 bg-secondary text-[13px] font-semibold text-primary">
                HK
              </span>
              <div>
                <p className="text-[14px] font-medium">Harleen Kaur</p>
                <p className="text-[12px] text-tertiary/60">
                  Frontend Engineer · Batch of 2023
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* reason list */}
        <ol className="flex flex-col">
          {REASONS.map((reason, i) => (
            <li
              key={reason.title}
              data-reason
              style={{ visibility: "hidden" }}
              className="group border-b border-tertiary/10 py-8 first:pt-0 last:border-b-0"
            >
              <div className="flex gap-6">
                <span className="mt-1 font-mono text-[12px] text-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="max-w-[26ch] font-display text-[1.35rem] font-semibold leading-snug tracking-[-0.02em] text-tertiary/75 transition-colors group-hover:text-secondary">
                    {reason.title}
                  </h3>
                  <p className="mt-3 max-w-[52ch] text-[14.5px] leading-relaxed text-tertiary/60">
                    {reason.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
