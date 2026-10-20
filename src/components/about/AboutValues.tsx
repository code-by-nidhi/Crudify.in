"use client";

import Image from "next/image";
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

        {/* bento: a tall photo tile, two value cards beside it, and the
            third value stretched across with a second photo inside */}
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-[1.05fr_1fr_1fr] lg:grid-rows-[auto_auto]">
          <figure
            data-value-card
            style={{ visibility: "hidden" }}
            className="relative min-h-[340px] overflow-hidden rounded-[var(--panel-radius)] shadow-[0_24px_50px_-20px_var(--shadow-warm-strong)] md:col-span-2 lg:col-span-1 lg:row-span-2"
          >
            <Image
              src="/about/planning.jpg"
              alt="Hands mapping out a project plan on a wall board"
              fill
              sizes="(min-width: 1024px) 400px, 92vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary/70">
                Our principles
              </p>
              <p className="mt-3 max-w-[22ch] font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] text-primary">
                Plans built around outcomes, not tools.
              </p>
            </figcaption>
          </figure>

          {VALUES.map((value, i) => {
            const wide = i === VALUES.length - 1;
            return (
              <article
                key={value.title}
                data-value-card
                style={{ visibility: "hidden" }}
                className={`panel group flex flex-col p-7 ${
                  wide ? "md:col-span-2 lg:grid lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-8" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="icon-glow-badge h-12 w-12">
                      <CourseIcon name={value.icon} className="h-[20px] w-[20px]" />
                    </span>
                    <span className="font-display text-[2rem] font-bold leading-none tracking-[-0.05em] text-secondary/20 transition-colors duration-500 group-hover:text-secondary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-[1.25rem] font-semibold tracking-[-0.02em]">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-tertiary/60">
                    {value.body}
                  </p>
                </div>

                {wide && (
                  <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-[18px] lg:mt-0 lg:aspect-[4/3]">
                    <Image
                      src="/about/wins.jpg"
                      alt="Two colleagues high-fiving across a desk"
                      fill
                      sizes="(min-width: 1024px) 300px, 92vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
