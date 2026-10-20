"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { openEnquiry } from "../contact/EnquiryModal";
import { CourseIcon, type IconName } from "../Icons";
import KeywordText from "./KeywordText";
import { BOOSTER, VERSIONS, type ServiceVersion } from "./homeContent";

const COLUMNS: ServiceVersion[] = ["ai", "custom"];

/** What's in the box — shown as three tiles joined by "+". */
const CONTENTS: { icon: IconName; label: string }[] = [
  { icon: "web", label: "Website" },
  { icon: "megaphone", label: "Meta ads" },
  { icon: "activity", label: "5 reel shoots" },
];

const TIMELINE = BOOSTER.rows.find((row) => row.label === "Timeline");
const FEATURES = BOOSTER.rows.filter((row) => row !== TIMELINE);

/** The Business Growth Booster package. It sits under the Services H2, so its
 *  heading is an H3 as the content plan specifies. */
export default function GrowthBooster() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from("[data-booster-shell]", {
        autoAlpha: 0,
        y: 48,
        scale: 0.98,
        duration: 1.1,
        ease: "expo.out",
        clearProps: "all",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });

      gsap.from("[data-booster-item]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.08,
        delay: 0.2,
        ease: "expo.out",
        clearProps: "all",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="growth-booster"
      aria-labelledby="growth-booster-title"
      className="relative px-[4vw] pb-24 sm:pb-32"
    >
      <div className="mx-auto max-w-[1240px]">
        {/* Noir shell with a cherry glow — the one dark block on the page, so
            the package reads as the headline offer of the Services section */}
        <div
          data-booster-shell
          className="on-dark relative overflow-hidden rounded-[36px] bg-tertiary p-6 text-primary shadow-[0_40px_80px_-30px_var(--shadow-warm-strong)] sm:p-10 lg:p-14"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,color-mix(in_srgb,var(--color-secondary)_75%,transparent)_0%,transparent_55%),radial-gradient(circle_at_0%_100%,color-mix(in_srgb,var(--color-contrast)_60%,transparent)_0%,transparent_50%)]"
          />

          <div className="relative">
            {/* header */}
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div data-booster-item>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur">
                  <CourseIcon name="zap" className="h-3.5 w-3.5" />
                  All-in-one package
                </span>
                <h3
                  id="growth-booster-title"
                  className="mt-6 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.04em] text-primary"
                >
                  <span className="block text-[0.5em] font-semibold tracking-[-0.01em] text-primary/70">
                    Business Growth Booster:
                  </span>
                  Everything to Launch and Get Customers
                </h3>
                <p className="mt-5 max-w-[46ch] text-[1.05rem] font-medium leading-relaxed text-primary/75">
                  A website, Meta ads and 5 reel shoots in one package.
                </p>
              </div>

              {/* what's inside */}
              <ul
                data-booster-item
                aria-label="What's included"
                className="flex items-stretch gap-2 sm:gap-3"
              >
                {CONTENTS.map((item, i) => (
                  <li key={item.label} className="flex flex-1 items-center gap-2 sm:gap-3">
                    <div className="flex flex-1 flex-col items-center gap-3 rounded-2xl border border-primary/15 bg-primary/[0.06] px-2 py-5 text-center backdrop-blur transition-colors hover:border-primary/35 hover:bg-primary/10">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-secondary shadow-lg">
                        <CourseIcon name={item.icon} className="h-5 w-5" />
                      </span>
                      <span className="text-[12.5px] font-semibold leading-tight text-primary sm:text-[13.5px]">
                        {item.label}
                      </span>
                    </div>
                    {i < CONTENTS.length - 1 && (
                      <span aria-hidden="true" className="font-display text-xl font-light text-primary/45">
                        +
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* the two versions, as plan cards */}
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-14">
              {COLUMNS.map((key) => {
                const version = VERSIONS[key];
                const featured = key === "custom";

                return (
                  <article
                    key={key}
                    data-booster-item
                    className={`relative flex flex-col rounded-[28px] p-7 transition-transform duration-500 hover:-translate-y-1 sm:p-9 ${
                      featured
                        ? "bg-primary text-tertiary shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)]"
                        : "border border-primary/15 bg-primary/[0.05] text-primary backdrop-blur"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid h-11 w-11 place-items-center rounded-xl ${
                            featured ? "bg-secondary text-primary" : "bg-primary/12 text-primary"
                          }`}
                        >
                          <CourseIcon name={version.icon} className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-display text-[1.25rem] font-bold tracking-[-0.02em]">
                            Booster, {version.label}
                          </p>
                          <p className={`text-[13px] font-medium ${featured ? "text-tertiary/60" : "text-primary/60"}`}>
                            {version.tagline}
                          </p>
                        </div>
                      </div>
                      {featured && (
                        <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-primary">
                          Handcrafted
                        </span>
                      )}
                    </div>

                    {/* price + timeline */}
                    <div
                      className={`mt-8 flex items-end justify-between gap-4 border-b pb-6 ${
                        featured ? "border-tertiary/12" : "border-primary/15"
                      }`}
                    >
                      <div>
                        <p className={`text-[11px] font-bold uppercase tracking-[0.18em] ${featured ? "text-secondary" : "text-primary/60"}`}>
                          Price
                        </p>
                        <p className="mt-1.5 font-display text-[clamp(1.8rem,3vw,2.4rem)] font-bold leading-none tracking-[-0.04em]">
                          {BOOSTER.price[key] ?? "Get a quote"}
                        </p>
                      </div>
                      {TIMELINE && (
                        <div className="text-right">
                          <p className={`text-[11px] font-bold uppercase tracking-[0.18em] ${featured ? "text-secondary" : "text-primary/60"}`}>
                            Timeline
                          </p>
                          <p className="mt-1.5 text-[15px] font-semibold">{TIMELINE[key]}</p>
                        </div>
                      )}
                    </div>

                    {/* what you get */}
                    <ul className="mt-6 flex flex-1 flex-col gap-4">
                      {FEATURES.map((row) => (
                        <li key={row.label} className="flex gap-3">
                          <span
                            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                              featured ? "bg-secondary text-primary" : "bg-primary text-secondary"
                            }`}
                          >
                            <CourseIcon name="check" className="h-3 w-3" />
                          </span>
                          <p className="text-[14px] leading-relaxed">
                            <span className="font-semibold">{row.label}:</span>{" "}
                            <span className={featured ? "text-tertiary/70" : "text-primary/75"}>
                              {row[key]}
                            </span>
                          </p>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={openEnquiry}
                      className={`btn mt-8 w-full ${
                        featured
                          ? "btn-primary shadow-xl"
                          : "border border-primary/30 bg-primary/10 text-primary hover:bg-primary hover:text-tertiary"
                      }`}
                    >
                      Get the Booster, {version.label}
                      <span aria-hidden="true">→</span>
                    </button>
                  </article>
                );
              })}
            </div>

            {/* footer */}
            <div
              data-booster-item
              className="mt-10 flex flex-col gap-5 border-t border-primary/15 pt-8 md:flex-row md:items-center md:justify-between"
            >
              <p className="max-w-[64ch] text-[14.5px] leading-relaxed text-primary/75">
                <KeywordText text="Your website, ads and content are built together, so every reel and ad sends people to a page made to convert them. One team, one plan, one bill." />{" "}
                <span className="text-primary/50">Ad spend paid to Meta is not included.</span>
              </p>
              <button
                type="button"
                onClick={openEnquiry}
                className="shrink-0 text-[14px] font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
              >
                Not sure which version? Talk to us.
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
