"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";
import { CourseIcon } from "../Icons";
import { scrollToSection } from "../SmoothScroll";

const BADGES = [
  { icon: "cube" as const, label: "Five people" },
  { icon: "sliders" as const, label: "Three disciplines" },
  { icon: "check" as const, label: "One team" },
];

const DISCIPLINES = [
  {
    icon: "code" as const,
    name: "Build",
    body: "MERN development, storefronts to custom CRMs.",
  },
  {
    icon: "megaphone" as const,
    name: "Market",
    body: "Paid ads, SEO and content, alongside the product.",
  },
  {
    icon: "shield" as const,
    name: "Secure",
    body: "Auditing and hardening everything we ship.",
  },
];

export default function AboutHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from("[data-about-fade]", {
        autoAlpha: 0,
        y: 26,
        duration: 1.05,
        stagger: 0.09,
        delay: 0.35,
        ease: "expo.out",
        clearProps: "all",
      });

      // The glass plate drifts up a touch as the page scrolls past it.
      gsap.to("[data-about-plate]", {
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
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
      id="about-top"
      className="bg-pattern-hero relative overflow-hidden rounded-b-[40px] border-b border-secondary/20 px-[4vw] pb-20 pt-28 shadow-[0_28px_60px_-20px_var(--shadow-warm-strong)] sm:rounded-b-[60px] lg:pt-32"
    >
      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative z-10">
          <p
            data-about-fade
            className="mb-3 flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-secondary"
          >
            <span className="h-2 w-2 animate-ping rounded-full bg-secondary" />
            About Us
          </p>

          <h1 className="font-display text-[clamp(2.6rem,5.8vw,4.4rem)] font-extrabold leading-[1.03] tracking-[-0.035em] text-tertiary">
            <AnimatedText text="We build, market" delay={0.2} />
            <br />
            <AnimatedText
              text="and secure."
              className="text-contrast drop-shadow-[0_2px_12px_rgba(99,0,0,0.20)]"
              delay={0.4}
            />
          </h1>

          <p
            data-about-fade
            className="mt-6 max-w-[52ch] text-[1.05rem] font-medium leading-relaxed text-tertiary/75"
          >
            Most teams only do one of the three. We do all of them together —
            development, digital marketing and cybersecurity from one studio,
            for clients who would otherwise manage three different people
            who&rsquo;ve never spoken to each other.
          </p>

          <div data-about-fade className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection("about-story")}
              className="btn btn-primary shadow-xl hover:shadow-secondary/30"
            >
              Read our story
              <CourseIcon name="zap" className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollToSection("about-team")}
              className="btn btn-ghost border-secondary/35 text-tertiary hover:border-secondary hover:text-secondary"
            >
              <CourseIcon name="globe" className="h-4 w-4 text-secondary" />
              Meet the team
            </button>
          </div>

          <ul data-about-fade className="mt-10 flex flex-wrap gap-2.5">
            {BADGES.map((badge) => (
              <li
                key={badge.label}
                className="panel panel-pill panel-quiet flex items-center gap-2 px-3.5 py-2 text-[12px] text-tertiary/75"
              >
                <CourseIcon name={badge.icon} className="h-3.5 w-3.5 text-secondary" />
                {badge.label}
              </li>
            ))}
          </ul>
        </div>

        {/* discipline plate */}
        <div data-about-plate className="relative">
          <div data-about-fade className="panel p-7 sm:p-9">
            <div className="flex items-center justify-between">
              <span className="eyebrow">One studio</span>
              <span className="panel panel-pill panel-quiet px-3 py-1.5 font-mono text-[11px] text-tertiary/70">
                3 in 1
              </span>
            </div>

            <div className="mt-7 grid gap-3">
              {DISCIPLINES.map((discipline) => (
                <div
                  key={discipline.name}
                  className="panel panel-quiet flex items-center gap-4 p-4"
                >
                  <span className="icon-glow-badge h-11 w-11 shrink-0">
                    <CourseIcon name={discipline.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-tertiary/85">
                      {discipline.name}
                    </p>
                    <p className="mt-1 text-[12.5px] text-tertiary/55">
                      {discipline.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-7 text-[12px] uppercase tracking-[0.25em] text-tertiary/45">
              Same team behind all three
            </p>
          </div>

          <span className="animate-float-slow icon-glow-badge absolute -left-5 top-8 hidden h-12 w-12 md:grid">
            <CourseIcon name="terminal" className="h-5 w-5" />
          </span>
          <span className="animate-float-reverse icon-glow-badge absolute -right-4 bottom-10 hidden h-12 w-12 md:grid">
            <CourseIcon name="activity" className="h-5 w-5" />
          </span>
        </div>
      </div>
    </section>
  );
}
