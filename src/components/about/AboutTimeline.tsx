"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";

const MILESTONES = [
  {
    year: "Now",
    image: "/about/punjab.jpg",
    alt: "The Golden Temple in Amritsar at sunset",
    title: "Punjab",
    body: "Starting local — building, marketing and securing for businesses close to home.",
  },
  {
    year: "Next",
    image: "/about/india.jpg",
    alt: "The Gateway of India in Mumbai",
    title: "The rest of India",
    body: "Taking the same model to India's bigger cities.",
  },
  {
    year: "Then",
    image: "/about/gulf.jpg",
    alt: "The Dubai skyline at dusk",
    title: "The Gulf",
    body: "The first market outside India, with the same team and the same two tiers.",
  },
  {
    year: "Eventually",
    image: "/about/uk-us.jpg",
    alt: "Tower Bridge and the London skyline",
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
        gsap.set(rail.current, { scaleX: 1 });
        return;
      }

      // The cherry rail fills left to right as the roadmap scrolls in.
      gsap.to(rail.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-milestone-list]",
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });

      gsap.from(rows, {
        autoAlpha: 0,
        y: 56,
        duration: 1.1,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-milestone-list]", start: "top 82%", once: true },
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

        <div data-milestone-list className="relative mt-14">
          {/* rail */}
          <div className="absolute left-0 right-0 top-[11px] hidden h-px bg-tertiary/12 lg:block">
            <div
              ref={rail}
              className="h-full w-full origin-left scale-x-0 bg-secondary shadow-[0_0_12px_var(--color-secondary)]"
            />
          </div>

          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {MILESTONES.map((item, i) => (
              <li
                key={item.year}
                data-milestone
                style={{ visibility: "hidden" }}
                className="group relative"
              >
                <div className="mb-6 hidden items-center gap-3 lg:flex">
                  <span className="relative grid h-6 w-6 place-items-center rounded-full border border-secondary/40 bg-primary transition-colors group-hover:border-secondary">
                    <span className="h-2 w-2 rounded-full bg-secondary transition-transform group-hover:scale-150" />
                  </span>
                </div>

                <article className="relative aspect-[3/4] overflow-hidden rounded-[var(--panel-radius)] shadow-[0_24px_50px_-20px_var(--shadow-warm-strong)]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 46vw, 92vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 to-ink/5" />

                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                    <span className="rounded-full bg-primary/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-secondary backdrop-blur">
                      {item.year}
                    </span>
                    <span className="font-display text-[1.6rem] font-bold leading-none tracking-[-0.05em] text-primary/45">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-[1.45rem] font-semibold tracking-[-0.02em] text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-primary/75">
                      {item.body}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
