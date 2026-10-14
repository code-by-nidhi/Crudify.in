"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";
import { CourseIcon, type IconName } from "../Icons";

const VALUES: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "shield",
    title: "Security isn't an upsell.",
    body: "It's attached to both tiers, not just the expensive one — because it's usually the thing clients don't know they need until it's too late.",
  },
  {
    icon: "zap",
    title: "Outcomes over tools.",
    body: "Whether something is AI-assisted or hand-built isn't the pitch — getting you a working site, real customers and a secure system is.",
  },
  {
    icon: "cube",
    title: "One team, no handoffs.",
    body: "Dev, marketing and security sit in the same room, so nothing gets lost translating between vendors.",
  },
];

export default function AboutValues() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-value-card]");

      if (prefersReducedMotion()) {
        gsap.set(cards, { autoAlpha: 1 });
        return;
      }

      gsap.from(cards, {
        autoAlpha: 0,
        y: 58,
        duration: 1.1,
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
      id="about-values"
      className="bg-pattern-digital relative px-[4vw] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <p className="eyebrow">How we think about it</p>
        <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
          <AnimatedText text="Three things we" onScroll />{" "}
          <AnimatedText text="don't bend on." className="text-accent" onScroll />
        </h2>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value) => (
            <article
              key={value.title}
              data-value-card
              style={{ visibility: "hidden" }}
              className="panel flex flex-col p-7"
            >
              <span className="icon-glow-badge h-12 w-12">
                <CourseIcon name={value.icon} className="h-[20px] w-[20px]" />
              </span>

              <h3 className="mt-6 font-display text-[1.2rem] font-semibold tracking-[-0.02em]">
                {value.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-tertiary/60">
                {value.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
