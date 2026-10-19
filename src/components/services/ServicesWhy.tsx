"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";
import { CourseIcon, type IconName } from "../Icons";
import { scrollToSection } from "../SmoothScroll";

const REASONS: {
  icon: IconName;
  tab: string;
  title: string;
  body: string;
  stat: string;
  statLabel: string;
}[] = [
  {
    icon: "activity",
    tab: "Lead Generation",
    title: "Every enquiry traced to its source",
    body: "Forms, calls and WhatsApp messages tagged by channel before a campaign goes live, so the monthly report shows which rupee produced which lead.",
    stat: "1",
    statLabel: "monthly view of spend, enquiries and cost per lead",
  },
  {
    icon: "web",
    tab: "Website Conversion",
    title: "Pages rebuilt where the traffic lands",
    body: "We start with the pages people already visit and rebuild them around one action — a call, a booking or a checkout — instead of redesigning the whole site at once.",
    stat: "1",
    statLabel: "conversion goal per landing page",
  },
  {
    icon: "megaphone",
    tab: "Performance Marketing",
    title: "Paid, organic and local as one plan",
    body: "Meta, Google Ads, Business Profile and social run by the same team that cuts the creative, so a losing ad is replaced in days rather than next quarter.",
    stat: "6",
    statLabel: "marketing channels managed in-house",
  },
  {
    icon: "cpu",
    tab: "Automated Follow-up",
    title: "No lead left waiting for a reply",
    body: "Chatbots answer from your own content and CRM automations chase the follow-up, so enquiries that arrive after hours still get a response.",
    stat: "24/7",
    statLabel: "first response on website and WhatsApp",
  },
  {
    icon: "shield",
    tab: "Secure by Default",
    title: "Security attached to every tier",
    body: "Hardening, monitoring and a written response plan come with the build — not as an upsell after something has already gone wrong.",
    stat: "100%",
    statLabel: "of builds ship with a security pass",
  },
];

export default function ServicesWhy() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-why]");

      if (prefersReducedMotion()) {
        gsap.set(rows, { autoAlpha: 1 });
        return;
      }

      gsap.from(rows, {
        autoAlpha: 0,
        y: 36,
        duration: 0.95,
        stagger: 0.07,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="services-why"
      className="bg-pattern-impact relative px-[4vw] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="eyebrow">Why choose us</p>
            <h2 className="mt-4 font-display text-[clamp(2.1rem,4.8vw,3.6rem)] font-extrabold uppercase leading-[1] tracking-[-0.04em] text-tertiary">
              <AnimatedText text="Judged on enquiries," onScroll />
              <br />
              <AnimatedText text="not impressions." className="text-accent" onScroll />
            </h2>
          </div>
          <p className="max-w-[44ch] text-[14.5px] leading-relaxed text-tertiary/60">
            Most businesses come to us with traffic but no calls. We measure
            ourselves on the number that actually moves your month — leads and
            sales — and build every service around it.
          </p>
        </div>

        {/* tab row — jumps the list highlight; the list itself stays fully
            readable without it, so nothing is hidden behind a click */}
        <div
          aria-label="Reasons to choose us"
          className="mt-14 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]"
        >
          {REASONS.map((reason, i) => (
            <button
              key={reason.tab}
              aria-pressed={active === i}
              aria-controls={`why-${i}`}
              onClick={() => setActive(i)}
              className={`shrink-0 rounded-full border px-4 py-2 text-[12px] font-bold uppercase tracking-wider transition-colors ${
                active === i
                  ? "border-secondary bg-secondary text-primary"
                  : "border-tertiary/15 text-tertiary/60 hover:border-secondary/50 hover:text-secondary"
              }`}
            >
              <span className="mr-1.5 font-mono opacity-60">
                {String(i + 1).padStart(2, "0")}
              </span>
              {reason.tab}
            </button>
          ))}
        </div>

        <ol className="mt-6 flex flex-col">
          {REASONS.map((reason, i) => {
            const on = active === i;

            return (
              <li
                key={reason.tab}
                id={`why-${i}`}
                data-why
                style={{ visibility: "hidden" }}
                onMouseEnter={() => setActive(i)}
                className={`grid cursor-default gap-4 border-b border-tertiary/10 py-7 transition-colors first:border-t md:grid-cols-[4rem_1fr_14rem] md:items-center md:gap-8 ${
                  on ? "bg-secondary/[0.05]" : ""
                }`}
              >
                <span
                  className={`font-display text-[2rem] font-extrabold leading-none tracking-tight transition-colors md:pl-4 ${
                    on ? "text-secondary" : "text-tertiary/20"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
                    <CourseIcon name={reason.icon} className="h-3.5 w-3.5" />
                    {reason.tab}
                  </p>
                  <h3 className="mt-2 font-display text-[1.3rem] font-semibold tracking-[-0.02em] text-tertiary">
                    {reason.title}
                  </h3>
                  <p className="mt-2 max-w-[62ch] text-[14px] leading-relaxed text-tertiary/60">
                    {reason.body}
                  </p>
                </div>

                <div className="md:pr-4 md:text-right">
                  <p
                    className={`font-display text-[2.2rem] font-extrabold leading-none tracking-[-0.03em] transition-colors ${
                      on ? "text-secondary" : "text-tertiary/70"
                    }`}
                  >
                    {reason.stat}
                  </p>
                  <p className="mt-1.5 text-[12px] leading-snug text-tertiary/55">
                    {reason.statLabel}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <button
          onClick={() => scrollToSection("apply")}
          className="btn btn-primary mt-10"
        >
          Talk to a strategist
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </section>
  );
}
