"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";
import { CourseIcon } from "../Icons";
import { SERVICE_NAV, type Service } from "./servicesData";

export default function ServiceDetailBody({ service }: { service: Service }) {
  const root = useRef<HTMLElement>(null);
  const others = SERVICE_NAV.filter((item) => item.id !== service.id);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-detail-card]");

      if (prefersReducedMotion()) {
        gsap.set(cards, { autoAlpha: 1 });
        return;
      }

      cards.forEach((card) => {
        gsap.from(card, {
          autoAlpha: 0,
          y: 48,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="service-deliverables"
      className="bg-pattern-web relative px-[4vw] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1240px]">
        <div>
          <p className="eyebrow">What&apos;s included</p>
          <h2 className="mt-4 max-w-[24ch] font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
            <AnimatedText text="The work we" onScroll />{" "}
            <AnimatedText text="actually deliver." className="text-accent" onScroll />
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.items.map((item) => (
            <article
              key={item.name}
              data-detail-card
              style={{ visibility: "hidden" }}
              className="panel group flex flex-col p-6"
            >
              <span className="icon-glow-badge h-11 w-11 shrink-0">
                <CourseIcon name={service.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-[1.1rem] font-semibold tracking-[-0.02em] transition-colors group-hover:text-secondary">
                {item.name}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-tertiary/60">
                {item.desc}
              </p>
            </article>
          ))}
        </div>

        {/* why this team, stated as outcomes rather than adjectives */}
        <div className="mt-24">
          <p className="eyebrow">What you get out of it</p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {service.outcomes.map((outcome, i) => (
              <article
                key={outcome.title}
                data-detail-card
                style={{ visibility: "hidden" }}
                className="panel panel-quiet flex flex-col p-7"
              >
                <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-[1.15rem] font-semibold tracking-[-0.02em] text-tertiary/90">
                  {outcome.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-tertiary/60">
                  {outcome.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* lateral navigation — the dropdown, repeated at the foot of the page */}
        <div className="mt-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Other services</p>
              <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.03em] text-tertiary">
                Often bought together.
              </h2>
            </div>
            <Link href="/services" className="btn btn-ghost text-sm">
              View all services
              <CourseIcon name="refresh" className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {others.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                data-detail-card
                style={{ visibility: "hidden" }}
                className="panel group flex items-start gap-4 p-6"
              >
                <span className="icon-glow-badge h-11 w-11 shrink-0">
                  <CourseIcon name={item.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[1.05rem] font-semibold tracking-[-0.02em] transition-colors group-hover:text-secondary">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-tertiary/55">
                    {item.tag}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
