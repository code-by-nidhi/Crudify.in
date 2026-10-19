"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";
import { CourseIcon } from "../Icons";
import { PreviewCard, useServicePreview } from "../ServicePreview";
import { scrollToSection } from "../SmoothScroll";
import KeywordText from "./KeywordText";
import { BRAND, SERVICES, VERSIONS } from "./homeContent";

/** "Choose Your Speed" — every service in both versions. One markup for every
 *  width: a three-column table from md up, and below that each row stacks
 *  into a card whose cells carry their own version label. */
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
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="services"
      className="bg-pattern-digital relative px-[4vw] pt-24 pb-16 sm:pt-32 sm:pb-20 border-t border-secondary/20"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="max-w-3xl">
          <p data-compare-fade className="eyebrow">
            Services
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
            <AnimatedText text="Choose Your Speed:" onScroll />{" "}
            <AnimatedText text="With AI+ or Without AI" className="text-accent" onScroll />
          </h2>
          <p
            data-compare-fade
            className="mt-6 max-w-[64ch] text-[1.02rem] leading-relaxed text-tertiary/70"
          >
            <KeywordText
              text={`Every ${BRAND} service comes in two versions. With AI+ is faster and more affordable, since AI handles the heavy lifting and our team reviews everything. Without AI is fully handcrafted by our specialists, for brands that want a bespoke finish and deeper strategy.`}
            />
          </p>
        </div>

        <div role="table" aria-label={`${BRAND} services: With AI+ vs Without AI`} className="mt-12">
          {/* Column headers — md and up only; on phones every cell labels itself */}
          <div
            role="row"
            className="hidden grid-cols-[0.8fr_1fr_1fr] gap-4 px-6 pb-4 md:grid"
          >
            <span role="columnheader" className="text-[11px] font-bold uppercase tracking-[0.18em] text-tertiary/55">
              Service
            </span>
            {(["ai", "custom"] as const).map((key) => (
              <span key={key} role="columnheader" className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-secondary text-primary shadow-md">
                  <CourseIcon name={VERSIONS[key].icon} className="h-3.5 w-3.5" />
                </span>
                <span className="font-display text-[15px] font-bold text-tertiary">
                  {VERSIONS[key].label}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-tertiary/55">
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
            className="relative flex flex-col gap-3"
          >
            {SERVICES.map((service, i) => (
              <div
                key={service.name}
                role="row"
                data-compare-row
                style={{ visibility: "hidden" }}
                onMouseEnter={() => {
                  setHovered(i);
                  show();
                }}
                className="panel group grid gap-4 p-5 sm:p-6 md:grid-cols-[0.8fr_1fr_1fr] md:items-center"
              >
                <div role="rowheader" className="flex items-center gap-3.5">
                  <span className="icon-glow-badge h-10 w-10 shrink-0">
                    <CourseIcon name={service.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="font-display text-[1.05rem] font-semibold leading-snug tracking-[-0.02em] text-tertiary transition-colors group-hover:text-secondary">
                    {service.name}
                  </h3>
                </div>

                {(["ai", "custom"] as const).map((key) => (
                  <div
                    key={key}
                    role="cell"
                    className={`rounded-2xl p-4 text-[13.5px] leading-relaxed ${
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

        <div data-compare-fade className="mt-10 flex flex-wrap items-center gap-4">
          <p className="font-display text-[1.1rem] font-semibold text-tertiary">
            Not sure which version fits?
          </p>
          <button onClick={() => scrollToSection("apply")} className="btn btn-primary shadow-lg">
            Talk to us
            <CourseIcon name="zap" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
