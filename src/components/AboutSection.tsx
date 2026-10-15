"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "./AnimatedText";
import { CourseIcon, type IconName } from "./Icons";
import { scrollToSection } from "./SmoothScroll";
import KeywordText from "./home/KeywordText";
import { BRAND } from "./home/homeContent";

/** "We build, promote and protect your business online" — one card per verb. */
const PILLARS: { icon: IconName; label: string; title: string; body: string }[] = [
  {
    icon: "code",
    label: "Build",
    title: "Web and app development",
    body: "Websites, Shopify stores and apps built to turn visitors into customers.",
  },
  {
    icon: "megaphone",
    label: "Promote",
    title: "Digital marketing",
    body: "Social media, Meta and Google ads, Google Maps ranking, design and video.",
  },
  {
    icon: "shield",
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
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:items-end">
          <div>
            <p data-about-fade className="eyebrow">
              About {BRAND}
            </p>
            <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
              <AnimatedText text="A Marketing, Tech and Security Team" onScroll />{" "}
              <AnimatedText text="Under One Roof" className="text-accent" onScroll />
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

          {/* Three vendors collapse into one team */}
          <div
            data-about-card
            style={{ visibility: "hidden" }}
            className="panel panel-feature p-7 sm:p-8"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
              Instead of three vendors
            </p>
            <ul className="mt-6 divide-y divide-tertiary/12">
              {VENDORS.map((vendor) => (
                <li
                  key={vendor}
                  className="flex items-center gap-3 py-3.5 text-[14px] text-tertiary/50 line-through decoration-secondary/50 first:pt-0"
                >
                  {vendor}
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-center gap-3 border-t border-secondary/30 pt-5 font-display text-[1.3rem] font-semibold tracking-[-0.02em] text-tertiary">
              <CourseIcon name="check" className="h-5 w-5 text-secondary" />
              One {BRAND} team
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.title}
              data-about-card
              style={{ visibility: "hidden" }}
              className="panel group flex flex-col p-7"
            >
              <div className="flex items-center gap-3">
                <span className="icon-glow-badge h-11 w-11 shrink-0">
                  <CourseIcon name={pillar.icon} className="h-5 w-5" />
                </span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">
                  {pillar.label}
                </span>
              </div>

              <h3 className="mt-6 font-display text-[1.15rem] font-semibold tracking-[-0.02em] transition-colors group-hover:text-secondary">
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
