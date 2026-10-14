"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";
import { CourseIcon } from "../Icons";
import { scrollToSection } from "../SmoothScroll";
import type { Service } from "./servicesData";

export default function ServiceDetailHero({ service }: { service: Service }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from("[data-detail-fade]", {
        autoAlpha: 0,
        y: 26,
        duration: 1.05,
        stagger: 0.09,
        delay: 0.3,
        ease: "expo.out",
        clearProps: "all",
      });

      gsap.from("[data-detail-chip]", {
        autoAlpha: 0,
        y: 14,
        scale: 0.94,
        duration: 0.8,
        stagger: 0.05,
        delay: 0.7,
        ease: "expo.out",
        clearProps: "all",
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="service-top"
      className="bg-pattern-hero relative overflow-hidden rounded-b-[40px] border-b border-secondary/20 px-[4vw] pb-20 pt-28 shadow-[0_28px_60px_-20px_var(--shadow-warm-strong)] sm:rounded-b-[60px] lg:pt-32"
    >
      <div className="mx-auto w-full max-w-[1240px]">
        {/* breadcrumb — the only route back up on a leaf page */}
        <nav
          data-detail-fade
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-[12px] font-bold text-tertiary/55"
        >
          <Link href="/" className="transition-colors hover:text-secondary">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/services" className="transition-colors hover:text-secondary">
            Services
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-secondary">{service.label}</span>
        </nav>

        <p
          data-detail-fade
          className="mb-3 flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-secondary"
        >
          <span className="icon-glow-badge h-9 w-9">
            <CourseIcon name={service.icon} className="h-4 w-4" />
          </span>
          {service.tag}
        </p>

        <h1 className="max-w-[17ch] font-display text-[clamp(2.4rem,5.4vw,4.1rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-tertiary">
          <AnimatedText text={service.headline.lead} delay={0.2} />
          <br />
          <AnimatedText
            text={service.headline.accent}
            className="text-contrast drop-shadow-[0_2px_12px_rgba(99,0,0,0.20)]"
            delay={0.4}
          />
        </h1>

        <p
          data-detail-fade
          className="mt-6 max-w-[62ch] text-[1.05rem] font-medium leading-relaxed text-tertiary/75"
        >
          {service.intro}
        </p>

        <div data-detail-fade className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={() => scrollToSection("apply")}
            className="btn btn-primary shadow-xl hover:shadow-secondary/30"
          >
            Enquire about {service.label}
            <CourseIcon name="zap" className="h-4 w-4" />
          </button>
          <button
            onClick={() => scrollToSection("service-deliverables")}
            className="btn btn-ghost border-secondary/35 text-tertiary hover:border-secondary hover:text-secondary"
          >
            <CourseIcon name="sliders" className="h-4 w-4 text-secondary" />
            What&apos;s included
          </button>
        </div>

        <ul className="mt-12 flex flex-wrap gap-2.5">
          {service.stack.map((tech) => (
            <li
              key={tech}
              data-detail-chip
              className="panel panel-pill panel-quiet px-4 py-2.5 font-mono text-[11.5px] font-semibold text-tertiary/80"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
