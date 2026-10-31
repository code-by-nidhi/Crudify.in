"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "./AnimatedText";
import ContactForm from "./contact/ContactForm";
import FloatingTechIcons from "./FloatingTechIcons";
import { CourseIcon } from "./Icons";

const CTA_FLOATING_ICONS = [
  { type: "course" as const, name: "globe" as const, label: "Google Maps Ranking", className: "left-6 top-10 animate-float-slow hidden md:flex" },
  { type: "course" as const, name: "megaphone" as const, label: "Meta & Google Ads", className: "right-8 top-16 animate-float-reverse hidden md:flex" },
  { type: "course" as const, name: "zap" as const, label: "Free Growth Plan", className: "left-12 bottom-12 animate-float-reverse hidden md:flex" },
];

export default function CTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from("[data-cta-panel]", {
        autoAlpha: 0,
        y: 50,
        scale: 0.96,
        duration: 1.2,
        ease: "expo.out",
        clearProps: "all",
        scrollTrigger: { trigger: root.current, start: "top 88%", once: true },
      });

      gsap.from("[data-cta-field]", {
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.06,
        ease: "expo.out",
        clearProps: "all",
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="apply" className="relative px-[4vw] py-24 sm:py-32 overflow-hidden">
      {/* Background Animated Ambient Icons */}
      <FloatingTechIcons items={CTA_FLOATING_ICONS} />

      <div
        data-cta-panel
        className="panel panel-accent relative z-10 mx-auto grid max-w-[1400px] gap-12 p-8 sm:p-12 lg:grid-cols-[1fr_0.9fr] lg:p-16"
      >
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-xl bg-primary/20 text-primary animate-pulse">
              <CourseIcon name="cube" className="h-4 w-4" />
            </span>
            <p className="eyebrow !text-primary">Free Growth Plan</p>
          </div>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,5.4vw,4.8rem)] font-extrabold leading-[0.95] tracking-[-0.05em] text-primary">
            <AnimatedText text="Ready to grow?" className="!text-primary font-bold" onScroll />
            <br />
            <AnimatedText
              text="Get your free growth plan."
              className="!text-primary font-bold underline decoration-primary/45"
              onScroll
            />
          </h2>
          <p className="mt-6 max-w-[44ch] text-[15px] leading-relaxed !text-primary/90 font-medium">
            Tell us where you want to grow. We&apos;ll come back with a clear plan,
            and whether With AI+, Without AI or a mix of both fits your business.
          </p>

          <ul className="mt-10 space-y-3.5">
            {[
              "A free review of your ads, website and Google Maps profile",
              "A clear recommendation: With AI+, Without AI, or both",
              "Transparent pricing — no hidden costs",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-[14px] font-semibold !text-primary">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-secondary font-bold">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path
                      d="m2.5 6.2 2.2 2.2L9.5 3.6"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
