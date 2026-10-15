"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { CourseIcon } from "../Icons";
import { scrollToSection } from "../SmoothScroll";
import KeywordText from "./KeywordText";
import { BOOSTER, VERSIONS, type ServiceVersion } from "./homeContent";

const COLUMNS: ServiceVersion[] = ["ai", "custom"];

/** The Business Growth Booster package. It sits under the Services H2, so its
 *  heading is an H3 as the content plan specifies. */
export default function GrowthBooster() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from("[data-booster-card]", {
        autoAlpha: 0,
        y: 40,
        duration: 1,
        stagger: 0.12,
        ease: "expo.out",
        clearProps: "all",
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="growth-booster"
      aria-labelledby="growth-booster-title"
      className="bg-pattern-digital relative px-[4vw] pb-24 sm:pb-32"
    >
      <div className="mx-auto max-w-[1240px]">
        <div
          data-booster-card
          className="panel panel-feature overflow-hidden rounded-3xl border border-secondary/30 p-6 shadow-[0_28px_60px_-20px_var(--shadow-warm-strong)] sm:p-10"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-secondary text-primary shadow-md">
                  <CourseIcon name="zap" className="h-3.5 w-3.5" />
                </span>
                <p className="eyebrow">Business Growth Booster</p>
              </div>
              <h3
                id="growth-booster-title"
                className="mt-4 font-display text-[clamp(1.6rem,3vw,2.3rem)] font-bold leading-[1.1] tracking-[-0.03em] text-tertiary"
              >
                Business Growth Booster:{" "}
                <span className="text-accent">Everything to Launch and Get Customers</span>
              </h3>
              <p className="mt-3 text-[1rem] font-medium text-tertiary/75">
                A website, Meta ads and 5 reel shoots in one package.
              </p>
            </div>
          </div>

          <div role="table" aria-label="Business Growth Booster: With AI+ vs Without AI" className="mt-9">
            <div role="row" className="grid grid-cols-2 gap-3 md:grid-cols-[0.6fr_1fr_1fr]">
              <span role="columnheader" className="hidden md:block" />
              {COLUMNS.map((key) => (
                <span
                  key={key}
                  role="columnheader"
                  className="rounded-2xl bg-secondary px-4 py-3 text-center font-display text-[14px] font-bold text-primary shadow-md"
                >
                  Booster, {VERSIONS[key].label}
                </span>
              ))}
            </div>

            {BOOSTER.rows.map((row) => (
              <div
                key={row.label}
                role="row"
                className="grid grid-cols-2 gap-3 border-b border-tertiary/12 py-4 md:grid-cols-[0.6fr_1fr_1fr] md:items-center"
              >
                <span
                  role="rowheader"
                  className="col-span-2 text-[12px] font-bold uppercase tracking-[0.16em] text-secondary md:col-span-1 md:normal-case md:tracking-normal md:text-tertiary md:font-display md:text-[15px]"
                >
                  {row.label}
                </span>
                {COLUMNS.map((key) => (
                  <span key={key} role="cell" className="px-1 text-[13.5px] leading-relaxed text-tertiary/80 md:px-4">
                    {row[key]}
                  </span>
                ))}
              </div>
            ))}

            <div
              role="row"
              className="grid grid-cols-2 gap-3 pt-5 md:grid-cols-[0.6fr_1fr_1fr] md:items-center"
            >
              <span
                role="rowheader"
                className="col-span-2 text-[12px] font-bold uppercase tracking-[0.16em] text-secondary md:col-span-1 md:normal-case md:tracking-normal md:text-tertiary md:font-display md:text-[15px]"
              >
                Price
              </span>
              {COLUMNS.map((key) => (
                <span
                  key={key}
                  role="cell"
                  className="px-1 font-display text-[1.35rem] font-extrabold tracking-tight text-secondary md:px-4"
                >
                  {BOOSTER.price[key] ?? "Get a quote"}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-8 max-w-[70ch] text-[14.5px] leading-relaxed text-tertiary/70">
            <KeywordText text="Your website, ads and content are built together, so every reel and ad sends people to a page made to convert them. One team, one plan, one bill." />{" "}
            <span className="text-tertiary/55">Ad spend paid to Meta is not included.</span>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button onClick={() => scrollToSection("apply")} className="btn btn-primary shadow-xl">
              Get the Booster
              <CourseIcon name="zap" className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollToSection("apply")}
              className="btn btn-ghost border-secondary/35 text-tertiary hover:border-secondary hover:text-secondary"
            >
              Not sure which version? Talk to us.
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
