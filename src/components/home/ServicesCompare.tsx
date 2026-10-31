"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";
import { CourseIcon } from "../Icons";
import { PreviewCard, useServicePreview } from "../ServicePreview";
import { scrollToSection } from "../SmoothScroll";
import KeywordText from "./KeywordText";
import { BRAND, SERVICES, VERSIONS } from "./homeContent";

/** "Choose Your Speed" — every service in both versions, laid out as the
 *  template's service section: a sticky panel on the left holding the heading
 *  and an orbit of service icons, the numbered services running down the
 *  right. Each row keeps its table roles, so it still reads as a comparison. */
export default function ServicesCompare() {
  const root = useRef<HTMLElement>(null);
  const { containerRef, cardRef, show, hide, onMouseMove } = useServicePreview();
  const [hovered, setHovered] = useState<number | null>(null);
  const current = hovered === null ? null : SERVICES[hovered];

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-compare-row]");

      if (prefersReducedMotion()) {
        gsap.set(rows, { autoAlpha: 1 });
        return;
      }

      gsap.from("[data-compare-fade]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
        clearProps: "all",
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });

      rows.forEach((row) => {
        gsap.from(row, {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 92%", once: true },
        });
      });

      // The orbit only shows from lg up (hidden lg:block), so phones skip
      // building its tweens and triggers — on a throttled mobile load
      // they were the single most expensive setup on the page.
      gsap.matchMedia().add("(min-width: 1024px)", () => {
        // The template's service orbit: the icon tiles burst out of the hub to
        // their places on the ring, then the ring turns as the list scrolls by.
        const ring = root.current?.querySelector<HTMLElement>("[data-orbit]");
        const tiles = gsap.utils.toArray<HTMLElement>("[data-orbit-tile]");
        if (!ring || tiles.length === 0) return;

        const radius = () => Math.min(ring.offsetWidth, ring.offsetHeight) * 0.4;
        const angle = (i: number) => (i / tiles.length) * Math.PI * 2 - Math.PI / 2;

        gsap.fromTo(
          tiles,
          { x: 0, y: 0, scale: 0.3, autoAlpha: 0 },
          {
            x: (i: number) => Math.cos(angle(i)) * radius(),
            y: (i: number) => Math.sin(angle(i)) * radius(),
            scale: 1,
            autoAlpha: 1,
            duration: 1.4,
            stagger: 0.04,
            ease: "expo.out",
            scrollTrigger: {
              trigger: ring,
              start: "top 80%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          },
        );

        const spin = {
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        };
        gsap.to("[data-orbit-spin]", { rotation: 180, ...spin });
        // Counter-turn so every icon stays upright as the ring carries it round.
        gsap.to("[data-orbit-upright]", { rotation: -180, ...spin });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="services"
      className="relative border-t border-secondary/20 px-[4vw] pt-24 pb-16 sm:pt-32 sm:pb-20"
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-0">
        {/* left — the sticky panel. min-h, not h: on short or zoomed screens
            the heading, copy, orbit and CTA outgrow one viewport, and a fixed
            height let the CTA spill out over the Growth Booster below. */}
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+1rem)] lg:flex lg:min-h-[calc(100svh-var(--nav-h)-2rem)] lg:flex-col lg:self-start lg:border-r lg:border-secondary/20 lg:pr-12">
          <p data-compare-fade className="eyebrow">
            Services
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,4.6vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-tertiary">
            <AnimatedText text="Choose Your Speed:" onScroll />{" "}
            <AnimatedText text="With AI+ or Without AI" className="text-accent" onScroll />
          </h2>
          <p
            data-compare-fade
            className="mt-6 max-w-[56ch] text-[1.02rem] leading-relaxed text-tertiary/70"
          >
            <KeywordText
              text={`Every ${BRAND} service comes in two versions. With AI+ is faster and more affordable, since AI handles the heavy lifting and our team reviews everything. Without AI is fully handcrafted by our specialists, for brands that want a bespoke finish and deeper strategy.`}
            />
          </p>

          {/* the orbit — decorative, desktop only */}
          <div
            data-orbit
            aria-hidden="true"
            className="relative my-6 hidden min-h-[220px] flex-1 lg:block"
          >
            <div data-orbit-spin className="absolute inset-0">
              <span className="absolute left-1/2 top-1/2 aspect-square h-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-secondary/30" />
              {SERVICES.map((service) => (
                // One element takes both the orbit position (x / y) and the
                // counter-turn (rotation) — GSAP tweens them independently.
                <span
                  key={service.name}
                  data-orbit-tile
                  data-orbit-upright
                  className="absolute left-1/2 top-1/2 -ml-6 -mt-6 grid h-12 w-12 place-items-center rounded-xl border border-secondary/30 bg-surface text-secondary"
                >
                  <CourseIcon name={service.icon} className="h-5 w-5" />
                </span>
              ))}
            </div>
            <span className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-secondary font-display text-[13px] font-extrabold tracking-[-0.01em] text-primary">
              {BRAND}
            </span>
          </div>

          <div data-compare-fade className="mt-8 flex flex-wrap items-center gap-4 lg:mt-auto">
            <p className="font-display text-[1.1rem] font-semibold text-tertiary">
              Not sure which version fits?
            </p>
            <button onClick={() => scrollToSection("apply")} className="btn btn-primary">
              Talk to us
              <CourseIcon name="zap" className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* right — the services */}
        <div role="table" aria-label={`${BRAND} services: With AI+ vs Without AI`} className="lg:pl-12">
          <div
            role="row"
            className="hidden grid-cols-[1fr_1fr] gap-4 border-b border-tertiary/15 pb-4 pl-12 md:grid"
          >
            <span role="columnheader" className="sr-only">
              Service
            </span>
            {(["ai", "custom"] as const).map((key) => (
              <span key={key} role="columnheader" className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-secondary text-primary">
                  <CourseIcon name={VERSIONS[key].icon} className="h-3.5 w-3.5" />
                </span>
                <span className="font-display text-[15px] font-bold text-tertiary">
                  {VERSIONS[key].label}
                </span>
                <span className="text-[12px] text-tertiary/55">
                  ({VERSIONS[key].tagline})
                </span>
              </span>
            ))}
          </div>

          {/* positioned wrapper the cursor card is measured against */}
          <div
            ref={containerRef}
            onMouseMove={onMouseMove}
            onMouseLeave={() => {
              setHovered(null);
              hide();
            }}
            className="relative flex flex-col"
          >
            {SERVICES.map((service, i) => (
              <div
                key={service.name}
                role="row"
                data-compare-row
                onMouseEnter={() => {
                  setHovered(i);
                  show();
                }}
                // ::before is the hover fill rising from the row's base
                className="group relative grid gap-4 border-b border-tertiary/15 py-7 before:pointer-events-none before:absolute before:inset-0 before:origin-bottom before:scale-y-0 before:bg-secondary/[0.06] before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:before:scale-y-100 md:grid-cols-[1fr_1fr] md:gap-x-4 md:pl-12"
              >

                <div role="rowheader" className="relative flex items-baseline gap-4 md:col-span-2 md:-ml-12">
                  <span className="w-8 shrink-0 font-mono text-[13px] font-medium text-secondary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="flex-1 font-display text-[clamp(1.5rem,2.6vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-tertiary transition-colors duration-300 group-hover:text-secondary">
                    {service.name}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="self-center text-[1.5rem] font-light text-tertiary/40 transition-all duration-500 group-hover:rotate-45 group-hover:text-secondary"
                  >
                    →
                  </span>
                </div>

                {(["ai", "custom"] as const).map((key) => (
                  <div
                    key={key}
                    role="cell"
                    className={`relative ml-12 rounded-xl p-4 text-[14px] leading-relaxed md:ml-0 ${
                      key === "ai"
                        ? "bg-secondary/[0.07] text-tertiary/80"
                        : "border border-tertiary/12 bg-surface/60 text-tertiary/80"
                    }`}
                  >
                    <span className="mb-1 block text-[10.5px] font-bold uppercase tracking-[0.16em] text-secondary md:hidden">
                      {VERSIONS[key].label}
                    </span>
                    {service[key]}
                  </div>
                ))}
              </div>
            ))}

            <PreviewCard
              cardRef={cardRef}
              item={
                current && {
                  icon: current.icon,
                  title: current.name,
                  art: current.art,
                  tags: [VERSIONS.ai.label, VERSIONS.custom.label],
                }
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
