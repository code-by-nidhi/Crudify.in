"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";
import { scrollToSection } from "../SmoothScroll";
import {
  PreviewCard,
  useServicePreview,
  type ArtName,
} from "../ServicePreview";
import { SERVICES, serviceHref, type Service } from "./servicesData";

const pad = (n: number) => String(n).padStart(2, "0");

/** Illustration shown in the cursor card for each pillar. */
const SERVICE_ART: Record<string, ArtName> = {
  web: "browser",
  "digital-marketing": "growth",
  ai: "agent",
  "cyber-security": "shield",
};

const toPreview = (service: Service) => ({
  icon: service.icon,
  title: service.title,
  art: SERVICE_ART[service.id] ?? "agent",
  tags: service.stack,
});
export default function ServicesCatalog() {
  const root = useRef<HTMLElement>(null);
  const ghost = useRef<HTMLDivElement>(null);
  const { containerRef, cardRef, show, hide, onMouseMove } = useServicePreview();
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-service-card]");

      const reduced = prefersReducedMotion();

      if (reduced) {
        gsap.set(rows, { autoAlpha: 1 });
        return;
      }

      rows.forEach((row) => {
        gsap.from(row, {
          autoAlpha: 0,
          y: 48,
          duration: 1.05,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 90%", once: true },
        });
      });
    },
    { scope: root },
  );

  function enter(i: number, row: HTMLElement, withCard = true) {
    setActive(i);
    if (ghost.current) {
      gsap.to(ghost.current, {
        y: row.offsetTop + row.offsetHeight / 2,
        duration: prefersReducedMotion() ? 0 : 0.7,
        ease: "expo.out",
      });
    }
    if (withCard) show();
  }

  function leave() {
    setActive(null);
    hide();
  }

  const current = active === null ? null : SERVICES[active];

  return (
    <section
      ref={root}
      id="services-catalog"
      className="bg-pattern-web relative overflow-hidden px-[4vw] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-[60ch] text-center">
          <p className="eyebrow">Our services</p>
          <h2 className="mt-4 font-display text-[clamp(2.1rem,5vw,3.8rem)] font-extrabold uppercase leading-[1] tracking-[-0.04em] text-tertiary">
            <AnimatedText text="Cost-effective" onScroll />{" "}
            <AnimatedText text="service pricing" className="text-accent" onScroll />
          </h2>
          <p className="mt-5 text-[14.5px] leading-relaxed text-tertiary/60">
            Pick one pillar or combine them — every engagement is quoted at a
            fixed price before any work starts, and built by the same team
            from discovery to handover.
          </p>
        </div>

        <div
          ref={containerRef}
          onMouseMove={onMouseMove}
          onMouseLeave={leave}
          className="relative mt-16"
        >
          {/* giant ghost word — slides to whichever row is hovered */}
          <div
            ref={ghost}
            aria-hidden="true"
            className={`pointer-events-none absolute top-0 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[clamp(4rem,12vw,11rem)] font-extrabold uppercase leading-none tracking-[-0.05em] text-tertiary/[0.045] transition-opacity duration-500 ${
              current ? "opacity-100" : "opacity-0"
            }`}
          >
            {current?.title ?? SERVICES[0].title}
          </div>

          <ul className="relative z-10">
          {SERVICES.map((service, i) => {
            const on = active === i;

            return (
              <li
                key={service.id}
                id={service.id}
                data-service-card
                style={{ visibility: "hidden" }}
                onMouseEnter={(e) => enter(i, e.currentTarget)}
                className="relative border-b border-tertiary/12 first:border-t"
              >
                <Link
                  href={serviceHref(service.id)}
                  aria-label={`${service.title} — ${service.desc}`}
                  onFocus={(e) => enter(i, e.currentTarget.parentElement as HTMLElement, false)}
                  onBlur={leave}
                  className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-3 py-8 outline-none sm:py-10 md:grid-cols-[3.5rem_1fr_minmax(0,19rem)_auto] md:gap-x-8"
                >
                  <span
                    className={`font-mono text-[13px] font-bold transition-colors duration-300 ${
                      on ? "text-secondary" : "text-tertiary/45"
                    }`}
                  >
                    {pad(i + 1)}
                  </span>

                  <h3
                    className={`font-display text-[clamp(1.8rem,4.6vw,3.6rem)] font-extrabold leading-[1] tracking-[-0.04em] text-tertiary transition-transform duration-500 ease-out ${
                      on ? "translate-x-2" : ""
                    }`}
                  >
                    {service.title}
                  </h3>

                  {/* on narrow screens the description drops under the title */}
                  <p className="col-span-3 col-start-1 row-start-2 max-w-[44ch] text-[13.5px] leading-relaxed text-tertiary/55 md:col-span-1 md:col-start-3 md:row-start-1">
                    {service.desc}
                  </p>

                  <span
                    aria-hidden="true"
                    className={`col-start-3 row-start-1 grid h-12 w-12 place-items-center rounded-full border text-lg transition-all duration-300 md:col-start-4 ${
                      on
                        ? "rotate-45 border-tertiary bg-tertiary text-primary"
                        : "border-tertiary/15 bg-surface text-tertiary"
                    }`}
                  >
                    ↗
                  </span>
                </Link>

                {/* accent rule that sweeps across the bottom border */}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-px left-0 h-[2px] bg-secondary transition-[width] duration-700 ease-out ${
                    on ? "w-full" : "w-0"
                  }`}
                />
              </li>
            );
          })}
          </ul>

          <PreviewCard
            cardRef={cardRef}
            item={current && toPreview(current)}
          />
        </div>

        <div
          data-service-card
          style={{ visibility: "hidden" }}
          className="panel panel-accent mt-14 flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10"
        >
          <div>
            <p className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold uppercase leading-none tracking-[-0.03em]">
              Don&rsquo;t see what you need?
            </p>
            <p className="mt-3 max-w-[52ch] text-[14.5px] leading-relaxed opacity-75">
              Most projects mix two or three of these. Tell us the problem and
              we&rsquo;ll tell you honestly whether we&rsquo;re the right team.
            </p>
          </div>
          <button
            onClick={() => scrollToSection("apply")}
            className="btn btn-primary shrink-0"
          >
            Let&rsquo;s talk
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}
