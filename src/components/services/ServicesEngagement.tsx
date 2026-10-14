"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";
import { CourseIcon, type IconName } from "../Icons";
import { scrollToSection } from "../SmoothScroll";

const MODELS: {
  icon: IconName;
  name: string;
  best: string;
  body: string;
  points: string[];
  highlight?: boolean;
}[] = [
  {
    icon: "cube",
    name: "Fixed-scope project",
    best: "Best for a defined build",
    body: "A written scope, a fixed price and a delivery date. Change requests are quoted separately rather than absorbed silently.",
    points: [
      "Milestone-based billing",
      "Agreed deliverables list",
      "Fixed timeline",
      "30 days post-launch support",
    ],
  },
  {
    icon: "cpu",
    name: "Dedicated team",
    best: "Best for continuous work",
    body: "A monthly squad — engineers, designer and a lead — working only on your roadmap, with priorities you reset every sprint.",
    points: [
      "Monthly retainer",
      "Reprioritise every sprint",
      "Direct access to the team",
      "Scale the squad up or down",
    ],
    highlight: true,
  },
  {
    icon: "activity",
    name: "Support & managed care",
    best: "Best for live systems",
    body: "For platforms already running — monitoring, patching, security updates and a queue for small changes, under an agreed SLA.",
    points: [
      "Guaranteed response times",
      "Security & dependency patching",
      "Uptime monitoring",
      "Monthly health reporting",
    ],
  },
];

export default function ServicesEngagement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-model]");

      if (prefersReducedMotion()) {
        gsap.set(cards, { autoAlpha: 1 });
        return;
      }

      gsap.from(cards, {
        autoAlpha: 0,
        y: 56,
        scale: 0.96,
        duration: 1.05,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="services-engagement"
      className="bg-pattern-configurator relative px-[4vw] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <p className="eyebrow">Ways to work with us</p>
        <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
          <AnimatedText text="Pick the engagement," onScroll />{" "}
          <AnimatedText text="not the package." className="text-accent" onScroll />
        </h2>

        <div className="mt-14 grid items-start gap-4 lg:grid-cols-3">
          {MODELS.map((model) => (
            <article
              key={model.name}
              data-model
              style={{ visibility: "hidden" }}
              className={`flex flex-col p-7 sm:p-8 ${
                model.highlight ? "panel panel-feature lg:-mt-4 lg:pb-12" : "panel"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="icon-glow-badge h-12 w-12">
                  <CourseIcon name={model.icon} className="h-5 w-5" />
                </span>
                {model.highlight && (
                  <span className="rounded-full border border-secondary/50 bg-secondary/15 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-secondary">
                    Most chosen
                  </span>
                )}
              </div>

              <h3 className="mt-6 font-display text-[1.3rem] font-semibold tracking-[-0.02em]">
                {model.name}
              </h3>
              <p className="mt-1.5 text-[12px] uppercase tracking-[0.18em] text-secondary">
                {model.best}
              </p>
              <p className="mt-4 text-[14.5px] leading-relaxed text-tertiary/60">
                {model.body}
              </p>

              <ul className="mt-6 mb-8 flex flex-col gap-2.5">
                {model.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-[13.5px] text-tertiary/70"
                  >
                    <CourseIcon
                      name="check"
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary"
                    />
                    {point}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollToSection("apply")}
                className={`mt-auto w-full text-sm btn ${
                  model.highlight ? "btn-primary" : "btn-ghost"
                }`}
              >
                Start a conversation
                <CourseIcon name="zap" className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
