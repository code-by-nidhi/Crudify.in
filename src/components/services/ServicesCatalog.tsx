"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";
import { CourseIcon } from "../Icons";
import { scrollToSection } from "../SmoothScroll";
import { SERVICES, type Service } from "./servicesData";

function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      id={service.id}
      data-service-card
      style={{ visibility: "hidden" }}
      className={`panel group flex flex-col p-7 sm:p-8 ${
        service.wide ? "lg:col-span-2" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="icon-glow-badge h-13 w-13 shrink-0">
          <CourseIcon name={service.icon} className="h-6 w-6" />
        </span>
        <span className="panel panel-pill panel-quiet shrink-0 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-tertiary/70">
          {service.tag}
        </span>
      </div>

      <h3 className="mt-6 font-display text-[1.45rem] font-semibold tracking-[-0.025em] transition-colors group-hover:text-secondary">
        {service.title}
      </h3>
      <p
        className={`mt-3 text-[14.5px] leading-relaxed text-tertiary/60 ${
          service.wide ? "max-w-[62ch]" : ""
        }`}
      >
        {service.desc}
      </p>

      <ul
        /* negative inset keeps the row hover states flush with the card edge */
        className={`-mx-3 mt-6 grid gap-x-4 gap-y-1 ${
          service.wide ? "sm:grid-cols-2" : ""
        }`}
      >
        {service.items.map((item) => (
          <li
            key={item.name}
            className="group/item flex items-start gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-tertiary/5"
          >
            <CourseIcon
              name="check"
              className="mt-1 h-3.5 w-3.5 shrink-0 text-secondary"
            />
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-tertiary/85 transition-colors group-hover/item:text-secondary">
                {item.name}
              </p>
              <p className="mt-0.5 text-[12.5px] leading-relaxed text-tertiary/55">
                {item.desc}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* mt-auto keeps the stack row on the card floor, so footers line up
          across a row no matter how long the deliverable list runs. */}
      <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-tertiary/10 pt-6">
        {service.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-tertiary/12 bg-tertiary/5 px-2.5 py-1 font-mono text-[10.5px] text-tertiary/60"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function ServicesCatalog() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]");

      if (prefersReducedMotion()) {
        gsap.set(cards, { autoAlpha: 1 });
        return;
      }

      cards.forEach((card) => {
        gsap.from(card, {
          autoAlpha: 0,
          y: 58,
          duration: 1.1,
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
      id="services-catalog"
      className="bg-pattern-web relative px-[4vw] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
              <AnimatedText text="Four pillars," onScroll />{" "}
              <AnimatedText text="one team." className="text-accent" onScroll />
            </h2>
          </div>
          <button
            onClick={() => scrollToSection("services-process")}
            className="btn btn-ghost text-sm"
          >
            See how we deliver
            <CourseIcon name="refresh" className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
