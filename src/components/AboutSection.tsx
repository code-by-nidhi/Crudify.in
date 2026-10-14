"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "./AnimatedText";
import { CourseIcon, type IconName } from "./Icons";
import { scrollToSection } from "./SmoothScroll";
import { BRAND, CITIES } from "./home/homeContent";

const PILLARS: { icon: IconName; label: string; title: string; body: string }[] = [
  {
    icon: "cpu",
    label: "Tier 1",
    title: "AI-Powered Services",
    body: "For businesses that want fast, affordable, scalable execution — content, chatbots, CRM dashboards, SEO, design and video.",
  },
  {
    icon: "megaphone",
    label: "Tier 2",
    title: "Human-Driven Services",
    body: "For businesses that need dedicated strategists managing high-stakes growth like paid ads, websites and store builds.",
  },
  {
    icon: "shield",
    label: "Protect",
    title: "Security that protects what you've built",
    body: "Our Cybersecurity & Resilience Shield keeps the websites, stores and customer data your marketing grows safe.",
  },
];

/** Only figures the content plan gives outright. Add "[X]+ Years Combined
 *  Marketing Experience" and "[X]+ Active Clients" here once confirmed. */
const PROOF = [
  { value: "50+", label: "Punjab businesses grown" },
  { value: "13", label: "Services across two clear tiers" },
  { value: String(CITIES.length), label: "Cities served across Punjab" },
];

export default function AboutSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-about-card]");

      if (prefersReducedMotion()) {
        gsap.set(cards, { autoAlpha: 1 });
        return;
      }

      gsap.from("[data-about-fade]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
        clearProps: "all",
        scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
      });

      cards.forEach((card) => {
        gsap.from(card, {
          autoAlpha: 0,
          y: 44,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="about-us"
      className="bg-pattern-architecture relative px-[4vw] py-24 sm:py-32 border-t border-secondary/20"
    >
      <div className="mx-auto max-w-[1240px]">
        {/* Statement, with the proof panel riding alongside it */}
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:items-end">
          <div>
            <p data-about-fade className="eyebrow">
              Who we are — Punjab&apos;s marketing company built on results
            </p>
            <h2 className="mt-4 max-w-[19ch] font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
              <AnimatedText text="Why Punjab Businesses" onScroll />{" "}
              <AnimatedText text={`Choose ${BRAND}`} className="text-accent" onScroll />
            </h2>
            <p
              data-about-fade
              className="mt-6 max-w-[60ch] text-[1.02rem] leading-relaxed text-tertiary/70"
            >
              {BRAND} is a Ludhiana-headquartered marketing and technology company
              serving businesses across Punjab — including Mohali, Amritsar,
              Jalandhar, Patiala, and Phagwara. We&apos;re not a
              &ldquo;one-service&rdquo; agency. We run full-funnel growth: ads that
              convert, websites that sell, AI systems that save you money, and
              security that protects what you&apos;ve built.
            </p>
            <p
              data-about-fade
              className="mt-4 max-w-[60ch] text-[1.02rem] leading-relaxed text-tertiary/70"
            >
              What makes us different is simple — we split our services into two
              tiers so you only pay for what your business actually needs right
              now:{" "}
              <button
                onClick={() => scrollToSection("service-tiers")}
                className="font-semibold text-secondary underline decoration-secondary/40 underline-offset-4 hover:decoration-secondary"
              >
                AI-Powered Services
              </button>{" "}
              and{" "}
              <button
                onClick={() => scrollToSection("service-tiers")}
                className="font-semibold text-secondary underline decoration-secondary/40 underline-offset-4 hover:decoration-secondary"
              >
                Human-Driven Services
              </button>
              . Our team has managed{" "}
              <button
                onClick={() => scrollToSection("results")}
                className="font-semibold text-secondary underline decoration-secondary/40 underline-offset-4 hover:decoration-secondary"
              >
                campaigns for edtech, e-commerce, D2C
              </button>
              , and local service businesses across Punjab — and we bring that
              experience to every account, big or small.
            </p>

            <div data-about-fade className="mt-9 flex flex-wrap gap-4">
              <Link href="/about" className="btn btn-primary shadow-lg">
                Read our story
                <CourseIcon name="activity" className="h-4 w-4" />
              </Link>
              <button
                onClick={() => scrollToSection("apply")}
                className="btn btn-ghost"
              >
                <CourseIcon name="zap" className="h-4 w-4 text-secondary" />
                Get a free growth audit
              </button>
            </div>
          </div>

          {/* Proof panel — dividers rather than boxes, so it reads as one object */}
          <div
            data-about-card
            style={{ visibility: "hidden" }}
            className="panel panel-feature p-7 sm:p-8"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
              {BRAND} in numbers
            </p>
            <dl className="mt-6 divide-y divide-tertiary/12">
              {PROOF.map((item) => (
                <div key={item.label} className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0">
                  <dt className="font-display text-[1.6rem] font-semibold tracking-[-0.03em] text-tertiary">
                    {item.value}
                  </dt>
                  <dd className="text-[13px] leading-relaxed text-tertiary/60">
                    {item.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* The two tiers plus protection, stated plainly */}
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.title}
              data-about-card
              style={{ visibility: "hidden" }}
              className="panel group flex flex-col p-7"
            >
              <div className="flex items-center gap-3">
                <span className="icon-glow-badge h-11 w-11 shrink-0">
                  <CourseIcon name={pillar.icon} className="h-5 w-5" />
                </span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">
                  {pillar.label}
                </span>
              </div>

              <h3 className="mt-6 font-display text-[1.15rem] font-semibold tracking-[-0.02em] transition-colors group-hover:text-secondary">
                {pillar.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-tertiary/60">
                {pillar.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
