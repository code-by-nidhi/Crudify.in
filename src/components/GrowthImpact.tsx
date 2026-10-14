"use client";

import Link from "next/link";
import { useRef } from "react";
import { CourseIcon, type IconName } from "./Icons";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Result = {
  client: string;
  city: string;
  services: string[];
  value: string;
  label: string;
  icon: IconName;
};

/** TODO: these are the sample figures from the content plan. Replace every
 *  client, value and label with real, verifiable numbers before launch —
 *  generative engines quote these verbatim, so keep them concrete. */
const RESULTS: Result[] = [
  {
    client: "Edtech brand",
    city: "Ludhiana",
    services: ["Meta Ads", "AI Content Creation"],
    value: "3.2x",
    label: "increase in qualified leads in 90 days",
    icon: "megaphone",
  },
  {
    client: "E-commerce store",
    city: "Mohali",
    services: ["Google Ads", "Website Development"],
    value: "4 months",
    label: "from store launch to consistent e-commerce sales",
    icon: "web",
  },
  {
    client: "Local service business",
    city: "Jalandhar",
    services: ["AI Chatbot", "CRM Dashboard"],
    value: "40%",
    label: "reduction in missed leads",
    icon: "cpu",
  },
];

export default function GrowthImpact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from("[data-bento-card]", {
        y: 40,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "expo.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: root.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="results"
      className="relative px-[4vw] py-24 bg-contrast/6 text-tertiary border-t border-tertiary/12"
    >
      <div className="mx-auto max-w-[1240px]">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="eyebrow !text-secondary font-extrabold">Real Results From Real Punjab Businesses</div>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold tracking-tight text-tertiary">
            Exponential Growth After <span className="text-secondary">Using Our Services</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {RESULTS.map((r, i) => (
            <article
              key={r.client + r.city}
              data-bento-card
              className={`p-7 rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                i === 0
                  ? "panel panel-feature border border-secondary/40 shadow-[0_28px_60px_-20px_var(--shadow-warm-strong)]"
                  : "panel-light bg-surface border border-tertiary/12 hover:border-secondary/60 hover:shadow-xl"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-xl bg-secondary/15 text-secondary">
                    <CourseIcon name={r.icon} className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-primary border border-tertiary/12 px-3 py-1 text-[11px] font-bold text-secondary">
                    {r.city}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-extrabold text-tertiary">
                  {r.client}, {r.city}
                </h3>
                <p className="mt-1 text-xs font-semibold text-tertiary/65">
                  Service: {r.services.join(" + ")}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-tertiary/12">
                <p className="font-display text-5xl font-black tracking-tight text-secondary">
                  {r.value}
                </p>
                <p className="mt-2 text-sm font-semibold text-tertiary/80">{r.label}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          {/* Point at /case-studies once that page exists. */}
          <Link href="/#apply" className="btn btn-ghost border-secondary/40 text-secondary hover:bg-secondary/15">
            Get Results Like These →
          </Link>
        </div>
      </div>
    </section>
  );
}
