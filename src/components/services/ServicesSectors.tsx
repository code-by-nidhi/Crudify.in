"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";
import { CourseIcon, type IconName } from "../Icons";

const SECTORS: { icon: IconName; name: string; builds: string[] }[] = [
  {
    icon: "activity",
    name: "Healthcare",
    builds: [
      "Patient CRM",
      "Secure records dashboard",
      "Appointment booking + WhatsApp reminders",
    ],
  },
  {
    icon: "key",
    name: "Real estate",
    builds: [
      "Lead CRM with source tracking",
      "Listing microsites",
      "Site-visit scheduling",
    ],
  },
  {
    icon: "chart",
    name: "Education",
    builds: [
      "Enquiry/admissions CRM",
      "Fee-payment portal",
      "Attendance & LMS dashboard",
    ],
  },
  {
    icon: "web",
    name: "D2C & e-commerce",
    builds: [
      "Shopify storefronts",
      "Ad creative & SEO",
      "Checkout & payment security",
    ],
  },
];

export default function ServicesSectors() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-sector]");

      if (prefersReducedMotion()) {
        gsap.set(cards, { autoAlpha: 1 });
        return;
      }

      gsap.from(cards, {
        autoAlpha: 0,
        y: 52,
        duration: 1.05,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="services-sectors"
      className="bg-pattern-architecture relative px-[4vw] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <p className="eyebrow">Sector-specific service lines</p>
        <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
          <AnimatedText text="Built for the way" onScroll />{" "}
          <AnimatedText text="your sector works." className="text-accent" onScroll />
        </h2>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SECTORS.map((sector) => (
            <article
              key={sector.name}
              data-sector
              style={{ visibility: "hidden" }}
              className="panel group flex flex-col p-7"
            >
              <span className="icon-glow-badge h-12 w-12">
                <CourseIcon name={sector.icon} className="h-5 w-5" />
              </span>

              <h3 className="mt-6 font-display text-[1.2rem] font-semibold tracking-[-0.02em] transition-colors group-hover:text-secondary">
                {sector.name}
              </h3>

              <ul className="mt-4 flex flex-col gap-2.5">
                {sector.builds.map((build) => (
                  <li
                    key={build}
                    className="flex items-start gap-2.5 text-[13.5px] text-tertiary/70"
                  >
                    <CourseIcon
                      name="check"
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary"
                    />
                    {build}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
