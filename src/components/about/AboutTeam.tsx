"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";
import { CourseIcon, type IconName } from "../Icons";

const TEAM: {
  icon: IconName;
  image: string;
  alt: string;
  discipline: string;
  size: string;
  body: string;
}[] = [
  {
    icon: "code",
    image: "/about/development.jpg",
    alt: "Laptop on a desk showing a code editor",
    discipline: "Development",
    size: "2 engineers",
    body: "MERN-stack builds, from Shopify storefronts to fully custom dashboards and CRMs.",
  },
  {
    icon: "megaphone",
    image: "/about/marketing.jpg",
    alt: "Laptop showing an analytics dashboard",
    discipline: "Marketing",
    size: "2 specialists",
    body: "Paid ads, SEO and content, built alongside the product rather than added after.",
  },
  {
    icon: "shield",
    image: "/about/security.jpg",
    alt: "Illuminated circuit board schematic",
    discipline: "Security",
    size: "1 engineer",
    body: "Auditing and hardening what we build, so client data doesn't become someone else's problem later.",
  },
];

export default function AboutTeam() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-team-card]");

      if (prefersReducedMotion()) {
        gsap.set(cards, { autoAlpha: 1 });
        return;
      }

      gsap.from(cards, {
        autoAlpha: 0,
        y: 60,
        scale: 0.95,
        duration: 1.1,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="about-team"
      className="bg-pattern-architecture relative px-[4vw] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">The team</p>
            <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
              <AnimatedText text="Five people," onScroll />{" "}
              <AnimatedText text="one room." className="text-accent" onScroll />
            </h2>
          </div>
          <p className="max-w-[38ch] text-[14.5px] leading-relaxed text-tertiary/60">
            Three disciplines working on the same project at the same time, so
            nothing gets lost between vendors.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((team) => (
            <article
              key={team.discipline}
              data-team-card
              style={{ visibility: "hidden" }}
              className="group relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_28px_60px_-22px_var(--shadow-warm-strong)]"
            >
              <Image
                src={team.image}
                alt={team.alt}
                fill
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/50 to-ink/0 transition-colors duration-500 group-hover:from-contrast/95 group-hover:via-contrast/55" />

              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/90 text-secondary shadow-md backdrop-blur transition-transform duration-500 group-hover:scale-110">
                  <CourseIcon name={team.icon} className="h-5 w-5" />
                </span>
                <span className="rounded-full border border-primary/30 bg-ink/30 px-3 py-1.5 font-mono text-[11px] text-primary backdrop-blur">
                  {team.size}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3 className="font-display text-[1.6rem] font-semibold tracking-[-0.02em] text-primary">
                  {team.discipline}
                </h3>
                <span className="mt-3 block h-[2px] w-10 rounded-full bg-primary/60 transition-all duration-500 group-hover:w-16" />
                <p className="mt-4 text-[14.5px] leading-relaxed text-primary/80">
                  {team.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
