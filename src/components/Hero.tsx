"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "./AnimatedText";
import { scrollToSection } from "./SmoothScroll";
import { CourseIcon } from "./Icons";
import KeywordText from "./home/KeywordText";
import { BRAND, SERVICES, VERSIONS, type ServiceVersion } from "./home/homeContent";

const MODES = Object.keys(VERSIONS) as ServiceVersion[];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<ServiceVersion>("ai");

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set("[data-hero-fade]", { autoAlpha: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from("[data-hero-badge]", { y: 24, autoAlpha: 0, duration: 1 }, 0.1)
        .from(
          "[data-hero-fade]",
          { y: 30, autoAlpha: 0, duration: 1.1, stagger: 0.12 },
          0.55,
        )
        .from(
          panel.current,
          { y: 70, autoAlpha: 0, scale: 0.94, duration: 1.6 },
          0.35,
        )
        .from(
          "[data-chip]",
          { scale: 0.6, autoAlpha: 0, duration: 1, stagger: 0.12 },
          0.95,
        )
        .from("[data-cue]", { autoAlpha: 0, y: -14, duration: 0.8 }, 1.4);

      tl.from(
        "[data-tier-row]",
        { x: -16, autoAlpha: 0, duration: 0.9, stagger: 0.06, ease: "power4.out" },
        0.9,
      );

      // Multi-layer Scroll Parallax Timeline
      gsap.to("[data-parallax-bg]", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to("[data-hero-copy]", {
        y: -130,
        autoAlpha: 0,
        filter: "blur(8px)",
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom 30%",
          scrub: 0.5,
        },
      });

      gsap.to(panel.current, {
        y: -200,
        rotateX: 14,
        scale: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom 10%",
          scrub: 0.7,
        },
      });

      gsap.to("[data-chip-left]", {
        y: -280,
        rotate: -12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      gsap.to("[data-chip-right]", {
        y: -360,
        rotate: 16,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      // Pointer Parallax 3D interaction
      const card = panel.current;
      if (!card) return;
      const rotX = gsap.quickTo(card, "rotateX", { duration: 0.8, ease: "power3" });
      const rotY = gsap.quickTo(card, "rotateY", { duration: 0.8, ease: "power3" });

      const onMove = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        rotY(((e.clientX - r.left) / r.width - 0.5) * 14);
        rotX((0.5 - (e.clientY - r.top) / r.height) * 12);
      };
      const onLeave = () => {
        rotX(0);
        rotY(0);
      };

      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      return () => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: root, dependencies: [activeTab] },
  );

  const version = VERSIONS[activeTab];

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-[4vw] pb-12 pt-28 lg:pt-32 bg-pattern-hero rounded-b-[40px] sm:rounded-b-[60px] border-b border-secondary/20 shadow-2xl"
    >
      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 my-auto">
        {/* Left Column Copy */}
        <div data-hero-copy className="relative z-10">
          <p data-hero-badge className="text-secondary font-mono text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-secondary animate-ping" />
            {BRAND} · Your Growth Partner
          </p>

          <h1 className="font-display text-[clamp(2.3rem,5vw,3.9rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-tertiary">
            <AnimatedText text={`${BRAND}: Your Growth Partner`} delay={0.2} />
            <br />
            <span className="mt-3 block text-[0.55em] leading-[1.15]">
              <AnimatedText
                text="for Marketing, Websites & AI"
                className="text-contrast drop-shadow-[0_2px_12px_rgba(99,0,0,0.20)]"
                delay={0.4}
              />
            </span>
          </h1>

          {/* One clean, quotable sentence — the line most likely to be lifted
              verbatim into an AI Overview, so keep it self-contained. */}
          <p
            data-hero-fade
            className="mt-6 max-w-[56ch] text-[1.05rem] leading-relaxed text-tertiary/80 font-medium"
          >
            <KeywordText text="We help Indian businesses get found on Google, turn visitors into customers, and automate the busywork. Choose With AI+ for speed and value, or Without AI for a fully handcrafted build." />
          </p>

          {/* Action CTAs */}
          <div data-hero-fade className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection("apply")}
              className="btn btn-primary shadow-xl hover:shadow-secondary/30"
            >
              Get a Free Growth Plan
              <CourseIcon name="chart" className="h-4 w-4" />
            </button>

            <button
              onClick={() => scrollToSection("services")}
              className="btn btn-ghost border-secondary/35 text-tertiary hover:border-secondary hover:text-secondary"
            >
              See Our Services →
            </button>
          </div>

          {/* Trust line */}
          <p
            data-hero-fade
            className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-secondary/25 bg-surface/70 px-4 py-2 text-[13px] font-semibold text-tertiary/75 shadow-md backdrop-blur-md"
          >
            <CourseIcon name="globe" className="h-4 w-4 text-secondary" />
            <span>
              <strong className="kw">Ludhiana</strong>-based. Serving businesses across India.
            </span>
          </p>
        </div>

        {/* Right Column: version switcher */}
        <div className="relative [perspective:1400px]">
          <div
            ref={panel}
            className="panel panel-feature relative p-6 [transform-style:preserve-3d] sm:p-8 border border-tertiary/20 shadow-[0_28px_60px_-20px_var(--shadow-warm-strong)] rounded-3xl"
          >
            <div className="flex items-center justify-between gap-2 border-b border-tertiary/20 pb-4">
              <div className="flex items-center gap-1.5 bg-tertiary/10 p-1 rounded-full border border-tertiary/15">
                {MODES.map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setActiveTab(mode)}
                    aria-pressed={activeTab === mode}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      activeTab === mode
                        ? "bg-secondary text-primary shadow-md scale-105"
                        : "text-tertiary/80 hover:text-tertiary hover:bg-tertiary/10"
                    }`}
                  >
                    {VERSIONS[mode].label}
                  </button>
                ))}
              </div>

              <span className="panel panel-pill hidden px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-secondary/15 text-secondary border border-secondary/30 sm:inline-flex">
                {version.tagline}
              </span>
            </div>

            <div className="mt-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
                Every service, two versions
              </p>
              <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-tertiary">
                {version.label}
              </h3>
              <p className="mt-2 text-xs text-tertiary/85 leading-relaxed">
                {version.summary}
              </p>

              <ul className="mt-5 grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
                {SERVICES.map((s) => (
                  <li
                    key={s.name}
                    data-tier-row
                    title={s[activeTab]}
                    className="flex items-center gap-3 text-[13px] font-semibold text-tertiary"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-secondary/15 text-secondary">
                      <CourseIcon name={s.icon} className="h-3.5 w-3.5" />
                    </span>
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 flex items-center justify-between border-t border-tertiary/20 pt-4 text-xs text-tertiary/85">
              <div className="flex items-center gap-2">
                <CourseIcon name="check" className="h-4 w-4 text-secondary" />
                <span className="font-mono text-[11px]">Pick per service</span>
              </div>
              <button
                onClick={() => scrollToSection("services")}
                className="font-bold underline text-secondary hover:text-secondary/80 transition-colors text-xs"
              >
                Compare versions →
              </button>
            </div>
          </div>

          {/* Floating chips with parallax */}
          <div
            data-chip
            data-chip-left
            className="absolute -left-6 top-[15%] z-20 hidden items-center gap-2.5 rounded-full border border-secondary/40 bg-surface px-4 py-2.5 text-tertiary shadow-2xl animate-float-slow sm:flex"
          >
            <div className="p-2 rounded-full bg-secondary text-primary shadow-md animate-pulse">
              <CourseIcon name="globe" className="h-4 w-4" />
            </div>
            <div>
              <p className="font-display text-xs font-extrabold leading-tight text-tertiary">Google Maps Ranking</p>
              <p className="text-[10px] uppercase font-extrabold text-tertiary/70">Get found locally</p>
            </div>
          </div>

          <div
            data-chip
            data-chip-right
            className="absolute -right-4 bottom-[8%] z-20 hidden items-center gap-2.5 rounded-full border border-secondary/40 bg-surface px-4 py-2.5 text-tertiary shadow-2xl animate-float-reverse sm:flex"
          >
            <div className="p-2 rounded-full bg-secondary text-primary shadow-md animate-pulse">
              <CourseIcon name="cpu" className="h-4 w-4" />
            </div>
            <div>
              <p className="font-display text-xs font-extrabold leading-tight text-tertiary">AI Agents</p>
              <p className="text-[10px] font-extrabold uppercase text-tertiary/70">Answer &amp; book 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Cue Indicator */}
      <button
        data-cue
        onClick={() => scrollToSection("about-us")}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-tertiary/70 transition-colors hover:text-secondary md:flex"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">SCROLL TO EXPLORE</span>
        <span className="relative h-8 w-[20px] rounded-full border border-tertiary/30">
          <span className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 animate-bounce rounded-full bg-secondary" />
        </span>
      </button>
    </section>
  );
}
