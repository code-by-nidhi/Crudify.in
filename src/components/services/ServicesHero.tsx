"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";
import { CourseIcon } from "../Icons";
import { scrollToSection } from "../SmoothScroll";
import { SERVICES } from "./servicesData";

export default function ServicesHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from("[data-services-fade]", {
        autoAlpha: 0,
        y: 26,
        duration: 1.05,
        stagger: 0.09,
        delay: 0.35,
        ease: "expo.out",
        clearProps: "all",
      });

      gsap.from("[data-services-chip]", {
        autoAlpha: 0,
        y: 14,
        scale: 0.94,
        duration: 0.8,
        stagger: 0.05,
        delay: 0.75,
        ease: "expo.out",
        clearProps: "all",
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="services-top"
      className="bg-pattern-hero relative overflow-hidden rounded-b-[40px] border-b border-secondary/20 px-[4vw] pb-20 pt-28 shadow-[0_28px_60px_-20px_var(--shadow-warm-strong)] sm:rounded-b-[60px] lg:pt-32"
    >
      <div className="mx-auto w-full max-w-[1240px]">
        <p
          data-services-fade
          className="mb-3 flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-secondary"
        >
          <span className="h-2 w-2 animate-ping rounded-full bg-secondary" />
          Our Services
        </p>

        <h1 className="max-w-[16ch] font-display text-[clamp(2.6rem,5.8vw,4.4rem)] font-extrabold leading-[1.03] tracking-[-0.035em] text-tertiary">
          <AnimatedText text="Everything your" delay={0.2} />
          <br />
          <AnimatedText
            text="digital stack needs."
            className="text-contrast drop-shadow-[0_2px_12px_rgba(99,0,0,0.20)]"
            delay={0.4}
          />
        </h1>

        <p
          data-services-fade
          className="mt-6 max-w-[58ch] text-[1.05rem] font-medium leading-relaxed text-tertiary/75"
        >
          Websites and apps, marketing that fills them, AI that runs the
          repetitive work behind them, and the security to keep all of it
          standing — from one team, so the pieces actually talk to each other.
        </p>

        <div data-services-fade className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={() => scrollToSection("services-catalog")}
            className="btn btn-primary shadow-xl hover:shadow-secondary/30"
          >
            Explore all services
            <CourseIcon name="sliders" className="h-4 w-4" />
          </button>
          <button
            onClick={() => scrollToSection("apply")}
            className="btn btn-ghost border-secondary/35 text-tertiary hover:border-secondary hover:text-secondary"
          >
            <CourseIcon name="zap" className="h-4 w-4 text-secondary" />
            Enquire now
          </button>
        </div>

        {/* jump straight to a pillar */}
        <ul className="mt-12 flex flex-wrap gap-2.5">
          {SERVICES.map((service) => (
            <li key={service.id} data-services-chip>
              <button
                onClick={() => scrollToSection(service.id)}
                className="panel panel-pill panel-quiet flex items-center gap-2 px-4 py-2.5 text-[12.5px] font-semibold text-tertiary/80 transition-colors hover:text-secondary"
              >
                <CourseIcon name={service.icon} className="h-3.5 w-3.5 text-secondary" />
                {service.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
