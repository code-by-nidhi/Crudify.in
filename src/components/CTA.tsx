"use client";

import { useRef, useState, type FormEvent } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "./AnimatedText";
import FloatingTechIcons from "./FloatingTechIcons";
import { CourseIcon } from "./Icons";

const SUITE_OPTIONS = [
  "AI-Powered Services (content, chatbots, SEO, design, video)",
  "Meta Ads / Google Ads Management",
  "Website or E-commerce Store",
  "Dedicated Social Media Manager",
  "Cybersecurity & Resilience Shield",
  "A mix of both tiers — not sure yet",
];

const CITY_LINE = ["Ludhiana", "Mohali", "Amritsar", "Jalandhar", "Patiala", "Phagwara"];

const CTA_FLOATING_ICONS = [
  { type: "course" as const, name: "shield" as const, label: "Resilience Shield", className: "left-6 top-10 animate-float-slow hidden md:flex" },
  { type: "course" as const, name: "megaphone" as const, label: "Meta & Google Ads", className: "right-8 top-16 animate-float-reverse hidden md:flex" },
  { type: "course" as const, name: "zap" as const, label: "Free Growth Audit", className: "left-12 bottom-12 animate-float-reverse hidden md:flex" },
];

export default function CTA() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section ref={root} id="apply" className="relative px-[4vw] py-24 sm:py-32 overflow-hidden">
      {/* Background Animated Ambient Icons */}
      <FloatingTechIcons items={CTA_FLOATING_ICONS} />

      <div
        data-cta-panel
        className="panel panel-accent mx-auto grid max-w-[1180px] gap-12 p-8 sm:p-12 lg:grid-cols-[1fr_0.9fr] lg:p-16 rounded-3xl shadow-[0_28px_60px_-20px_var(--shadow-warm-strong)] relative z-10"
      >
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-xl bg-primary/20 text-primary animate-pulse">
              <CourseIcon name="cube" className="h-4 w-4" />
            </span>
            <p className="eyebrow !text-primary">Free Consultation</p>
          </div>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.1rem)] font-bold leading-[1.05] tracking-[-0.035em] text-primary">
            <AnimatedText text="Ready to Grow Your" className="!text-primary font-bold" onScroll />
            <br />
            <AnimatedText
              text="Business in Punjab?"
              className="!text-primary font-bold underline decoration-primary/45"
              onScroll
            />
          </h2>
          <p className="mt-6 max-w-[44ch] text-[15px] leading-relaxed !text-primary/90 font-medium">
            Whether you need AI-powered execution or a dedicated growth strategist,
            Crudify is Ludhiana&apos;s marketing partner built for real results.
          </p>

          <ul className="mt-10 space-y-3.5">
            {[
              "Free growth audit of your ads, website and funnel",
              "A clear recommendation: AI-powered, human-driven, or both",
              "Transparent pricing — no hidden costs",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-[14px] font-semibold !text-primary">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-secondary font-bold shadow-md">
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
                <span className="!text-primary">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        {sent ? (
          <div className="panel panel-quiet flex flex-col items-start justify-center gap-4 p-8 rounded-2xl border border-secondary/30">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-secondary shadow-lg animate-pulse">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="m5 12.5 4.5 4.5L19 7.5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3 className="font-display text-xl font-bold !text-primary">
              Consultation Requested
            </h3>
            <p className="text-[14px] leading-relaxed !text-primary/90">
              Thanks — a Crudify growth strategist will call you shortly to book
              your free consultation.
            </p>
            <button
              onClick={() => setSent(false)}
              className="btn btn-ghost mt-2 !py-2.5 text-[13px]"
            >
              Send another request
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <Field label="Your Name / Business">
              <input
                required
                name="name"
                autoComplete="name"
                placeholder="Your name & business name"
                className="field-input font-medium"
              />
            </Field>

            <Field label="Phone / WhatsApp">
              <input
                required
                name="phone"
                type="tel"
                inputMode="tel"
                pattern="[0-9+\s-]{8,15}"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                className="field-input font-medium"
              />
            </Field>

            <Field label="What do you need help with?">
              <select name="course" className="field-input font-medium" defaultValue="">
                <option value="" disabled className="bg-primary text-tertiary">
                  Select a service
                </option>
                {SUITE_OPTIONS.map((option) => (
                  <option key={option} value={option} className="bg-primary text-tertiary">
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <button
              data-cta-field
              type="submit"
              className="btn btn-primary mt-2 w-full font-extrabold text-sm shadow-xl"
            >
              Book Your Free Consultation
            </button>

            <p data-cta-field className="text-center text-[11.5px] !text-primary/80 font-medium">
              Serving {CITY_LINE.join(" · ")}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label data-cta-field className="block">
      <span className="mb-2 block text-[11.5px] font-bold uppercase tracking-[0.18em] !text-primary/85">
        {label}
      </span>
      {children}
    </label>
  );
}
