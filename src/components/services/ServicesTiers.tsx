"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";
import { CourseIcon, type IconName } from "../Icons";
import { scrollToSection } from "../SmoothScroll";

const TIERS: {
  icon: IconName;
  name: string;
  tagline: string;
  setup: string;
  monthly: string;
  points: string[];
  goodFor: string;
  live: string;
  highlight?: boolean;
}[] = [
  {
    icon: "zap",
    name: "AI-Powered Growth Pack",
    tagline: "Fast & efficient",
    setup: "₹20,000–45,000",
    monthly: "₹8,000–15,000/mo",
    points: [
      "Shopify store on a proven template",
      "AI-generated product copy & ad creatives",
      "AI chatbot for customer queries + CRM automation (Zoho/HubSpot)",
      "AI-written SEO content & ad copy",
    ],
    goodFor: "New or budget-conscious sellers",
    live: "Live in 1–2 weeks",
  },
  {
    icon: "cube",
    name: "Custom Premium Pack",
    tagline: "Built around you",
    setup: "₹1,50,000–4,00,000",
    monthly: "₹40,000+/mo",
    points: [
      "Fully custom MERN storefront or dashboard",
      "Hand-crafted marketing strategy & creative",
      "CRM built to your exact sales process",
      "Dedicated cybersecurity audit + hardening (PCI/data protection)",
    ],
    goodFor: "Funded startups & established brands",
    live: "Live in 4–8 weeks",
    highlight: true,
  },
];

export default function ServicesTiers() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-tier]");

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
      id="services-tiers"
      className="bg-pattern-configurator relative px-[4vw] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">The two-tier model</p>
            <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
              <AnimatedText text="Two speeds," onScroll />{" "}
              <AnimatedText text="not one size." className="text-accent" onScroll />
            </h2>
          </div>
          <p className="max-w-[38ch] text-[14.5px] leading-relaxed text-tertiary/60">
            The same team is behind both. Security is attached to each tier,
            not just the expensive one.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-4 lg:grid-cols-2">
          {TIERS.map((tier) => (
            <article
              key={tier.name}
              data-tier
              style={{ visibility: "hidden" }}
              className={`flex flex-col p-7 sm:p-8 ${
                tier.highlight ? "panel panel-feature" : "panel"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="icon-glow-badge h-12 w-12">
                  <CourseIcon name={tier.icon} className="h-5 w-5" />
                </span>
                <span className="panel panel-pill panel-quiet px-3 py-1.5 font-mono text-[11px] text-tertiary/75">
                  {tier.live}
                </span>
              </div>

              <h3 className="mt-6 font-display text-[1.3rem] font-semibold tracking-[-0.02em]">
                {tier.name}
              </h3>
              <p className="mt-1.5 text-[12px] uppercase tracking-[0.18em] text-secondary">
                {tier.tagline}
              </p>

              <p className="mt-5 font-display text-[1.7rem] font-semibold leading-tight tracking-[-0.03em] text-tertiary">
                {tier.setup}
                <span className="ml-2 text-[13px] font-medium tracking-normal text-tertiary/55">
                  setup
                </span>
              </p>
              <p className="mt-1 text-[14px] font-semibold text-tertiary/70">
                + {tier.monthly}
              </p>

              <ul className="mt-6 mb-8 flex flex-col gap-2.5">
                {tier.points.map((point) => (
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

              <p className="mb-6 border-t border-tertiary/10 pt-5 text-[13px] text-tertiary/60">
                <span className="font-semibold text-tertiary/80">Good for:</span>{" "}
                {tier.goodFor}
              </p>

              <button
                onClick={() => scrollToSection("apply")}
                className={`mt-auto w-full text-sm btn ${
                  tier.highlight ? "btn-primary" : "btn-ghost"
                }`}
              >
                Find out which tier fits
                <CourseIcon name="zap" className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-[62ch] text-[14.5px] leading-relaxed text-tertiary/60">
          A ten-minute call is usually enough to tell you which tier fits — and
          whether we&rsquo;re the right team at all.
        </p>
      </div>
    </section>
  );
}
