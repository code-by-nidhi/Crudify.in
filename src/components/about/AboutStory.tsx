"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";
import { CourseIcon } from "../Icons";

const PARAGRAPHS = [
  {
    heading: "Three vendors who never talk",
    body: "Most businesses end up stitching together a web developer, a marketing freelancer, and — usually only after something goes wrong — someone to fix their security.",
  },
  {
    heading: "All three skills, one place",
    body: "Crudify started because our own team already had all three: MERN development, digital marketing and cybersecurity. Instead of specialising in just one, we built a studio around doing all three together.",
  },
  {
    heading: "Two speeds, not one size",
    body: "AI-Powered is template-driven builds, AI-assisted content and ads, and automated CRM — fast, affordable, live in a couple of weeks. Custom Premium is fully custom development, hand-built marketing strategy and a dedicated security audit, built around how you actually work. The same team is behind both.",
  },
  {
    heading: "Punjab first",
    body: "We're starting in India — Punjab first, then the rest of the country — before taking the same model to the Gulf and, eventually, the UK and US.",
  },
];

export default function AboutStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const blocks = gsap.utils.toArray<HTMLElement>("[data-story-block]");

      if (prefersReducedMotion()) {
        gsap.set(blocks, { autoAlpha: 1 });
        return;
      }

      blocks.forEach((block) => {
        gsap.from(block, {
          autoAlpha: 0,
          y: 56,
          duration: 1.05,
          ease: "expo.out",
          scrollTrigger: { trigger: block, start: "top 85%", once: true },
        });
      });

      gsap.to("[data-story-card]", {
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
    <section
      ref={root}
      id="about-story"
      className="bg-pattern-web relative px-[4vw] py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* sticky column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Our story</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
            <AnimatedText text="One team instead" onScroll />
            <br />
            <AnimatedText text="of three vendors." className="text-accent" onScroll />
          </h2>

          <div className="relative mt-10 aspect-[3/2] overflow-hidden rounded-[24px] border border-secondary/20 shadow-[0_18px_40px_-18px_var(--shadow-warm)]">
            <Image
              src="/about/team.jpg"
              alt="A team working on laptops around a shared table"
              fill
              sizes="(min-width: 1024px) 460px, 92vw"
              className="object-cover"
            />
          </div>

          <div data-story-card className="panel mt-5 p-7">
            <CourseIcon name="activity" className="h-6 w-6 text-secondary" />
            <p className="mt-5 text-[15px] leading-relaxed text-tertiary/75">
              &ldquo;We build, market, and secure what most teams only do one
              of.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-primary/30 bg-secondary text-[13px] font-semibold text-primary">
                C
              </span>
              <div>
                <p className="text-[14px] font-medium">The Crudify team</p>
                <p className="text-[12px] text-tertiary/60">
                  Five people · three disciplines
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* paragraph list */}
        <ol className="flex flex-col">
          {PARAGRAPHS.map((item, i) => (
            <li
              key={item.heading}
              data-story-block
              style={{ visibility: "hidden" }}
              className="group border-b border-tertiary/10 py-8 first:pt-0 last:border-b-0"
            >
              <div className="flex gap-6">
                <span className="mt-1 font-mono text-[12px] text-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="max-w-[26ch] font-display text-[1.35rem] font-semibold leading-snug tracking-[-0.02em] text-tertiary/75 transition-colors group-hover:text-secondary">
                    {item.heading}
                  </h3>
                  <p className="mt-3 max-w-[52ch] text-[14.5px] leading-relaxed text-tertiary/60">
                    {item.body}
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
