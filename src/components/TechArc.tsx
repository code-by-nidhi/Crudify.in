"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "./AnimatedText";
import { TechIcon, type TechName } from "./Icons";

const PRODUCT_STACK: { name: TechName; label: string; short?: string }[] = [
  { name: "nextjs", label: "Next.js 16 Edge" },
  { name: "react", label: "React 19 Core" },
  { name: "python", label: "AI Engine" },
  { name: "node", label: "Node API Gateway" },
  { name: "aws", label: "AWS Zero-Trust" },
  { name: "figma", label: "UI System Tokens" },
  { name: "sql", label: "Encrypted DB" },
  { name: "ml", label: "Predictive Analytics", short: "AI ML" },
  { name: "nextjs", label: "Headless CMS" },
  { name: "aws", label: "WAF DDoS Shield" },
  { name: "react", label: "Micro-Frontends" },
  { name: "node", label: "SOC 2 Audit Log" },
];

const LAP = 40;
const R_RATIO = { wide: 0.86, narrow: 0.74 };
const FADE = 0.42;
const NARROW = "(max-width: 639px)";

export default function TechArc() {
  const root = useRef<HTMLElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const chips = gsap.utils.toArray<HTMLElement>("[data-chip]");
      const box = ring.current;
      if (!box) return;

      gsap.set(chips, { xPercent: -50, yPercent: -50 });

      const setters = chips.map((chip) => ({
        x: gsap.quickSetter(chip, "x", "px"),
        y: gsap.quickSetter(chip, "y", "px"),
        scale: gsap.quickSetter(chip, "scale"),
        opacity: gsap.quickSetter(chip, "opacity"),
      }));

      let radius = 0;
      let riders: number[] = [];
      const measure = () => {
        const narrow = window.matchMedia(NARROW).matches;
        radius =
          (box.offsetWidth / 2) * (narrow ? R_RATIO.narrow : R_RATIO.wide);
        riders = [];
        chips.forEach((chip, i) => {
          const benched = narrow && i % 2 === 1;
          chip.style.display = benched ? "none" : "flex";
          if (!benched) riders.push(i);
        });
      };
      measure();
      const ro = new ResizeObserver(measure);
      ro.observe(box);

      const place = (t: number) => {
        riders.forEach((chip, slot) => {
          const u = (slot / riders.length + t) % 1;
          const a = Math.PI * (1 - 2 * u);
          const lift = Math.sin(a);
          const set = setters[chip];

          set.x(Math.cos(a) * radius);
          set.y(-lift * radius);
          set.opacity(gsap.utils.clamp(0, 1, lift / FADE));
          set.scale(0.84 + 0.18 * Math.max(lift, 0));
        });
      };

      if (prefersReducedMotion()) {
        place(0.04);
        return () => ro.disconnect();
      }

      const lap = { t: 0 };
      const spin = gsap.to(lap, {
        t: 1,
        duration: LAP,
        ease: "none",
        repeat: -1,
        onUpdate: () => place(lap.t),
      });
      place(0);

      const slow = () =>
        gsap.to(spin, { timeScale: 0.12, duration: 0.6, overwrite: true });
      const resume = () =>
        gsap.to(spin, { timeScale: 1, duration: 0.9, overwrite: true });
      box.addEventListener("pointerenter", slow);
      box.addEventListener("pointerleave", resume);

      return () => {
        ro.disconnect();
        box.removeEventListener("pointerenter", slow);
        box.removeEventListener("pointerleave", resume);
      };
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="architecture"
      className="relative overflow-hidden px-[4vw] py-24 sm:py-28 bg-primary border-t border-tertiary/10 bg-pattern-architecture"
      aria-label="Unified Web Digital and Cyber Architecture"
    >
      <div className="relative mx-auto max-w-[1180px] text-center">
        <p className="eyebrow">Unified Pipeline Architecture</p>
        <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.1rem)] font-bold leading-[1.06] tracking-[-0.035em] text-tertiary">
          <AnimatedText text="How Web, Digital & Cyber" onScroll />
          <br />
          <AnimatedText
            text="interlock seamlessly."
            className="text-accent"
            onScroll
          />
        </h2>
        <p className="mx-auto mt-5 max-w-[56ch] text-[15px] leading-relaxed text-tertiary/75 font-normal">
          Every incoming web session is filtered through our Zero-Trust Cyber Shield, rendered at lightning 
          speed by our Next.js Web Core, and synced with AI Digital Analytics in real-time.
        </p>

        {/* The Orbiting Dome */}
        <div className="relative mx-auto mt-12 aspect-[2/1] w-full max-w-[840px] sm:mt-16">
          <svg
            viewBox="0 0 200 100"
            className="absolute inset-0 h-full w-full overflow-visible"
            fill="none"
            aria-hidden="true"
          >
            <path
              className="sm:hidden"
              d="M26 100 A74 74 0 0 1 174 100"
              stroke="var(--color-secondary)"
              strokeWidth="0.8"
            />
            <path
              className="hidden sm:block"
              d="M14 100 A86 86 0 0 1 186 100"
              stroke="var(--color-secondary)"
              strokeWidth="0.8"
            />
            <path
              d="M42 100 A58 58 0 0 1 158 100"
              stroke="rgb(34 32 35 / 0.16)"
              strokeWidth="0.5"
              strokeDasharray="2 4"
            />
            <path
              d="M70 100 A30 30 0 0 1 130 100"
              stroke="rgb(34 32 35 / 0.12)"
              strokeWidth="0.5"
            />
          </svg>

          {/* Orbiting Chips */}
          <div ref={ring} className="absolute inset-0">
            {PRODUCT_STACK.map((tech, idx) => (
              <span
                key={`${tech.name}-${idx}`}
                data-chip
                style={{ opacity: 0 }}
                className="absolute left-1/2 top-full flex items-center gap-1.5 whitespace-nowrap rounded-full border border-tertiary/15 bg-primary px-3.5 py-2 shadow-lg will-change-transform sm:gap-2 sm:px-4 sm:py-2.5"
              >
                <TechIcon
                  name={tech.name}
                  className="h-[15px] w-[15px] shrink-0 text-secondary"
                />
                <span className="font-display text-[12px] font-semibold tracking-tight text-tertiary">
                  {tech.short ? (
                    <>
                      <span className="sm:hidden">{tech.short}</span>
                      <span className="hidden sm:inline">{tech.label}</span>
                    </>
                  ) : (
                    tech.label
                  )}
                </span>
              </span>
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 h-px bg-tertiary/20" />

          {/* Central Product Hub */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <div className="grid h-[96px] w-[96px] place-content-center justify-items-center rounded-full border-2 border-secondary bg-secondary text-primary shadow-xl">
              <p className="font-display text-[18px] font-bold leading-none tracking-tight">
                100<span className="text-primary/70">%</span>
              </p>
              <p className="mt-1 text-[9px] uppercase font-bold tracking-wider text-primary/80">
                Unified Stack
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
