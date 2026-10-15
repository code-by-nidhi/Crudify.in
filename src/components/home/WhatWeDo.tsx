"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";
import { CourseIcon, type IconName } from "../Icons";

const DELIVERABLES: { icon: IconName; lead: string; strong: string; rest: string }[] = [
  {
    icon: "megaphone",
    lead: "Runs your",
    strong: "Meta Ads and Google Ads",
    rest: "so every rupee of ad spend is tracked and optimized",
  },
  {
    icon: "web",
    lead: "Builds and manages your",
    strong: "website and e-commerce store",
    rest: "so it actually converts visitors into customers",
  },
  {
    icon: "digital",
    lead: "Creates your",
    strong: "content, graphics, and videos",
    rest: "— AI-assisted for speed, human-reviewed for quality",
  },
  {
    icon: "cpu",
    lead: "Sets up",
    strong: "chatbots and CRM dashboards",
    rest: "so no lead ever falls through the cracks",
  },
  {
    icon: "shield",
    lead: "Protects your business with our",
    strong: "Cybersecurity & Resilience Shield",
    rest: "",
  },
  {
    icon: "chart",
    lead: "Reports everything back to you in",
    strong: "plain language",
    rest: "— no jargon, just numbers that matter",
  },
];

export default function WhatWeDo() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-deliverable]");

      if (prefersReducedMotion()) {
        gsap.set(rows, { autoAlpha: 1 });
        return;
      }

      gsap.from("[data-wwd-fade]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
        clearProps: "all",
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });

      gsap.from(rows, {
        autoAlpha: 0,
        x: 30,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="what-we-do"
      className="bg-pattern-architecture relative px-[4vw] py-24 sm:py-32 border-t border-secondary/20"
    >
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p data-wwd-fade className="eyebrow">
            What CRUDIFY does for you
          </p>
          <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
            <AnimatedText text="What Our Website & Team" onScroll />{" "}
            <AnimatedText
              text="Actually Do For Your Business"
              className="text-accent"
              onScroll
            />
          </h2>
          <p
            data-wwd-fade
            className="mt-6 max-w-[48ch] text-[1.02rem] leading-relaxed text-tertiary/70"
          >
            Think of us as your outsourced growth department. Instead of hiring 6
            different freelancers for ads, design, video, SEO, and tech support,
            you get one accountable team in Ludhiana.
          </p>

          <div data-wwd-fade className="mt-9">
            <Link href="/services#services-process" className="btn btn-primary shadow-lg">
              See How It Works →
            </Link>
          </div>
        </div>

        <ul className="flex flex-col gap-3">
          {DELIVERABLES.map((item, i) => (
            <li
              key={item.strong}
              data-deliverable
              style={{ visibility: "hidden" }}
              className="panel group flex items-start gap-5 p-5 sm:p-6"
            >
              <span className="icon-glow-badge h-11 w-11 shrink-0">
                <CourseIcon name={item.icon} className="h-5 w-5" />
              </span>
              <p className="flex-1 pt-1 text-[15px] leading-relaxed text-tertiary/75">
                {item.lead}{" "}
                <strong className="font-semibold text-tertiary transition-colors group-hover:text-secondary">
                  {item.strong}
                </strong>
                {item.rest ? ` ${item.rest}` : ""}
              </p>
              <span className="pt-1.5 font-mono text-[11px] font-bold tracking-[0.2em] text-secondary">
                {String(i + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
