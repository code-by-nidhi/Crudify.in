"use client";

import Link from "next/link";
import { useRef } from "react";
import { CourseIcon } from "./Icons";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { TIERS } from "./home/homeContent";

/** "Our Digital & Growth Products" — the 13 services split into the AI-powered
 *  and human-driven tiers. */
export default function DigitalProducts() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-tier]").forEach((tier) => {
        gsap.from(tier.querySelectorAll("[data-digital-card]"), {
          y: 35,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.07,
          clearProps: "all",
          scrollTrigger: { trigger: tier, start: "top 85%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="service-tiers"
      className="relative px-[4vw] py-24 bg-contrast/6 text-tertiary border-t border-secondary/20 bg-pattern-digital"
    >
      <div className="mx-auto max-w-[1240px]">
        {/* Section Header */}
        <div className="pb-12 border-b border-tertiary/15">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-secondary/20 text-secondary animate-pulse">
              <CourseIcon name="digital" className="h-3.5 w-3.5" />
            </span>
            <div className="eyebrow !text-secondary font-extrabold">13 Services · 2 Tiers</div>
          </div>
          <h2 className="mt-2 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold tracking-tight text-tertiary">
            Our Digital &amp; Growth Products —{" "}
            <span className="text-secondary">Choose Your Tier</span>
          </h2>
          <p className="mt-3 max-w-2xl text-base text-tertiary/80 font-medium">
            Every business in Punjab is at a different stage. That&apos;s why we
            split our 13 services into two clear tiers — pick the one that matches
            your budget and growth goals, or combine both.
          </p>
        </div>

        {TIERS.map((tier) => (
          <div key={tier.id} data-tier className="mt-14">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary shadow-md">
                    <CourseIcon name={tier.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">
                    {tier.badge} · {tier.subtitle}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold tracking-tight text-tertiary">
                  {tier.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm text-tertiary/70 font-medium">
                  <span className="font-bold text-tertiary">Best for:</span> {tier.bestFor}
                </p>
              </div>
              <Link
                href={tier.cta.href}
                className={`btn text-xs font-bold shrink-0 self-start md:self-auto ${
                  tier.id === "ai"
                    ? "btn-ghost border-secondary/40 text-secondary hover:bg-secondary/15"
                    : "btn-primary shadow-xl"
                }`}
              >
                {tier.cta.label}
              </Link>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tier.services.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  data-digital-card
                  className="panel panel-feature group p-6 border border-secondary/25 bg-surface/70 hover:border-secondary/60 hover:shadow-2xl transition-[border-color,box-shadow] rounded-3xl flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-flex p-2.5 rounded-xl bg-secondary/20 text-secondary border border-secondary/30">
                      <CourseIcon name={item.icon} className="h-5 w-5" />
                    </span>
                    <h4 className="mt-5 font-display text-lg font-extrabold text-tertiary transition-colors group-hover:text-secondary">
                      {item.name}
                    </h4>
                    <p className="mt-2 text-[13px] text-tertiary/75 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                  <span className="mt-6 pt-4 border-t border-tertiary/12 text-xs font-extrabold text-secondary">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
