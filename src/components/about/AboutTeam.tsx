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
              className="panel group flex flex-col p-7"
            >
              <div className="relative -mx-7 -mt-7 mb-7 aspect-[16/10] overflow-hidden border-b border-secondary/20">
                <Image
                  src={team.image}
                  alt={team.alt}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="icon-glow-badge h-12 w-12 transition-transform duration-500 group-hover:scale-110">
                  <CourseIcon name={team.icon} className="h-5 w-5" />
                </span>
                <span className="panel panel-pill panel-quiet px-3 py-1.5 font-mono text-[11px] text-tertiary/75">
                  {team.size}
                </span>
              </div>

              <h3 className="mt-6 font-display text-[1.2rem] font-semibold tracking-[-0.02em] transition-colors group-hover:text-secondary">
                {team.discipline}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-tertiary/60">
                {team.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
