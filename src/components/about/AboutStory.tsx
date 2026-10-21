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
    body: "CRUDIFY started because our own team already had all three: MERN development, digital marketing and cybersecurity. Instead of specialising in just one, we built a studio around doing all three together.",
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
      <div className="mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
        {/* heading + photos */}
        <div>
          <p className="eyebrow">Our story</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
            <AnimatedText text="One team instead" onScroll />
            <br />
            <AnimatedText text="of three vendors." className="text-accent" onScroll />
          </h2>

          {/* photo collage — the main shot, a second inset over its corner,
              and the quote card floating off the opposite edge */}
          <div className="relative mt-10 pb-16 pr-10 sm:pr-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-[0_28px_60px_-20px_var(--shadow-warm-strong)]">
              <Image
                src="/about/team.jpg"
                alt="A team working on laptops around a shared table"
                fill
                sizes="(min-width: 1024px) 420px, 85vw"
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-primary/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
                Build · Market · Secure
              </span>
            </div>

            <div className="absolute bottom-0 right-0 aspect-square w-[44%] overflow-hidden rounded-[22px] border-[6px] border-primary shadow-[0_24px_50px_-18px_var(--shadow-warm-strong)]">
              <Image
                src="/about/strategy.jpg"
                alt="A strategy session in front of a wall of sticky notes"
                fill
                sizes="(min-width: 1024px) 200px, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          <div data-story-card className="panel mt-6 p-7">
            <CourseIcon name="activity" className="h-6 w-6 text-secondary" />
            <p className="mt-5 font-display text-[1.15rem] font-medium leading-snug tracking-[-0.01em] text-tertiary/85">
              &ldquo;We build, market, and secure what most teams only do one
              of.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-primary/30 bg-secondary text-[13px] font-semibold text-primary">
                C
              </span>
              <div>
                <p className="text-[14px] font-medium">The CRUDIFY team</p>
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
              className="group border-b border-tertiary/10 py-9 first:pt-0 last:border-b-0"
            >
              <div className="flex gap-6 sm:gap-8">
                <span className="font-display text-[2.6rem] font-bold leading-none tracking-[-0.05em] text-secondary/25 transition-colors duration-500 group-hover:text-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="max-w-[26ch] font-display text-[1.45rem] font-semibold leading-snug tracking-[-0.02em] text-tertiary transition-colors group-hover:text-secondary">
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
