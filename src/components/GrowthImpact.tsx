"use client";

import Link from "next/link";
import { useRef } from "react";
import { CourseIcon } from "./Icons";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { scrollToSection } from "./SmoothScroll";
import { CASE_STUDIES, CASE_STUDIES_HREF } from "./home/homeContent";

/** "Our Work". Reads CASE_STUDIES — real, verifiable numbers only, since
 *  generative engines quote these verbatim. Until there are some, the section
 *  says so plainly instead of showing invented figures. */
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
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="eyebrow !text-secondary font-extrabold">Our Work</div>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold tracking-tight text-tertiary">
            Results We&apos;ve <span className="text-secondary">Delivered</span>
          </h2>
        </div>

        {CASE_STUDIES.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {CASE_STUDIES.map((study, i) => (
              <article
                key={study.client + study.result}
                data-bento-card
                className={`p-7 rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                  i === 0
                    ? "panel panel-feature border border-secondary/40 shadow-[0_28px_60px_-20px_var(--shadow-warm-strong)]"
                    : "panel-light bg-surface border border-tertiary/12 hover:border-secondary/60 hover:shadow-xl"
                }`}
              >
                <span className="self-start p-2.5 rounded-xl bg-secondary/15 text-secondary">
                  <CourseIcon name={study.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-6 font-display text-lg font-extrabold text-tertiary">
                  {study.client}
                </h3>
                <p className="mt-3 pt-4 border-t border-tertiary/12 text-[15px] font-semibold leading-relaxed text-tertiary/80">
                  {study.result}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div
            data-bento-card
            className="panel panel-feature mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-3xl p-8 text-center"
          >
            <span className="p-3 rounded-xl bg-secondary/15 text-secondary">
              <CourseIcon name="chart" className="h-6 w-6" />
            </span>
            <p className="text-[15px] leading-relaxed text-tertiary/75">
              We&apos;re publishing case studies with verified numbers — Google Maps
              calls, store orders and cost per lead. Want to see work for a business
              like yours? Ask us on a call.
            </p>
          </div>
        )}

        <div className="mt-12 flex justify-center">
          {CASE_STUDIES_HREF ? (
            <Link
              href={CASE_STUDIES_HREF}
              className="btn btn-ghost border-secondary/40 text-secondary hover:bg-secondary/15"
            >
              View all case studies →
            </Link>
          ) : (
            <button
              onClick={() => scrollToSection("apply")}
              className="btn btn-ghost border-secondary/40 text-secondary hover:bg-secondary/15"
            >
              Talk to us →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
