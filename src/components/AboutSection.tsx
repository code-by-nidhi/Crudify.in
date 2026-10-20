"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "./AnimatedText";
import { CourseIcon, type IconName } from "./Icons";
import { scrollToSection } from "./SmoothScroll";
import KeywordText from "./home/KeywordText";
import { BRAND } from "./home/homeContent";

/** "We build, promote and protect your business online" — one card per verb. */
const PILLARS: {
  icon: IconName;
  image: string;
  alt: string;
  label: string;
  title: string;
  body: string;
}[] = [
  {
    icon: "code",
    image: "/about/development.jpg",
    alt: "Laptop on a desk showing a code editor",
    label: "Build",
    title: "Web and app development",
    body: "Websites, Shopify stores and apps built to turn visitors into customers.",
  },
  {
    icon: "megaphone",
    image: "/about/marketing.jpg",
    alt: "Laptop showing an analytics dashboard",
    label: "Promote",
    title: "Digital marketing",
    body: "Social media, Meta and Google ads, Google Maps ranking, design and video.",
  },
  {
    icon: "shield",
    image: "/about/security.jpg",
    alt: "Illuminated circuit board schematic",
    label: "Protect",
    title: "Cybersecurity",
    body: "Security built into every site and store we ship, not bolted on later.",
  },
];

/** The "one team instead of three vendors" point, stated as a comparison. */
const VENDORS = ["Marketing agency", "Web developer", "Security consultant"];

export default function AboutSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-about-card]");

      if (prefersReducedMotion()) {
        gsap.set(cards, { autoAlpha: 1 });
        return;
      }

      gsap.from("[data-about-fade]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
        clearProps: "all",
        scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
      });

      cards.forEach((card) => {
        gsap.from(card, {
          autoAlpha: 0,
          y: 44,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="about-us"
      className="bg-pattern-architecture relative px-[4vw] py-24 sm:py-32 border-t border-secondary/20"
    >
      <div className="mx-auto max-w-[1240px]">
        {/* Two equal halves: copy on the left, the photo on the right
            stretched to exactly the copy's height */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16">
          <div className="flex flex-col justify-center">
            <p data-about-fade className="eyebrow">
              About {BRAND}
            </p>
            <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
              <AnimatedText
                text="A Marketing, Tech and Security Team"
                onScroll
              />{" "}
              <AnimatedText
                text="Under One Roof"
                className="text-accent"
                onScroll
              />
            </h2>
            <p
              data-about-fade
              className="mt-6 max-w-[60ch] text-[1.02rem] leading-relaxed text-tertiary/70"
            >
              <KeywordText
                text={`${BRAND} is a Ludhiana-based growth agency. We combine digital marketing, web and app development, and cybersecurity, so you work with one team instead of three vendors. We build, promote and protect your business online.`}
              />
            </p>

            <div data-about-fade className="mt-9 flex flex-wrap gap-4">
              <Link href="/about" className="btn btn-primary shadow-lg">
                Read our story
                <CourseIcon name="activity" className="h-4 w-4" />
              </Link>
              <button
                onClick={() => scrollToSection("apply")}
                className="btn btn-ghost"
              >
                <CourseIcon name="zap" className="h-4 w-4 text-secondary" />
                Get a free growth plan
              </button>
            </div>
          </div>

          {/* Team photo, with the "three vendors → one team" card set inside
              its lower edge so the column keeps one clean outline */}
          <div
            data-about-fade
            className="relative min-h-[440px] overflow-hidden rounded-[28px] shadow-[0_28px_60px_-20px_var(--shadow-warm-strong)]"
          >
            <Image
              src="/about/team.jpg"
              alt="The team working on laptops around a shared table"
              fill
              sizes="(min-width: 1024px) 600px, 92vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

            <div
              data-about-card
              style={{ visibility: "hidden" }}
              className="panel-light absolute inset-x-5 bottom-5 p-6 sm:inset-x-6 sm:bottom-6"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
                Instead of three vendors
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {VENDORS.map((vendor) => (
                  <li
                    key={vendor}
                    className="rounded-full border border-tertiary/12 px-3 py-1.5 text-[12.5px] text-tertiary/50 line-through decoration-secondary/50"
                  >
                    {vendor}
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-center gap-3 border-t border-secondary/25 pt-4 font-display text-[1.2rem] font-semibold tracking-[-0.02em] text-tertiary">
                <CourseIcon name="check" className="h-5 w-5 text-secondary" />
                One {BRAND} team
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3 lg:mt-20">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.title}
              data-about-card
              style={{ visibility: "hidden" }}
              className="panel group flex flex-col p-7"
            >
              <div className="relative -mx-7 -mt-7 mb-6 aspect-[16/10] overflow-hidden border-b border-secondary/20">
                <Image
                  src={pillar.image}
                  alt={pillar.alt}
                  fill
                  sizes="(min-width: 768px) 400px, 92vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="icon-glow-badge h-11 w-11 shrink-0">
                  <CourseIcon name={pillar.icon} className="h-5 w-5" />
                </span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">
                  {pillar.label}
                </span>
              </div>

              <h3 className="mt-5 font-display text-[1.15rem] font-semibold tracking-[-0.02em] transition-colors group-hover:text-secondary">
                {pillar.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-tertiary/60">
                <KeywordText text={pillar.body} />
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
