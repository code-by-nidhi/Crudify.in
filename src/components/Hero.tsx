"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "./AnimatedText";
import { scrollToSection } from "./SmoothScroll";
import { CourseIcon } from "./Icons";
import KeywordText from "./home/KeywordText";
import HeroPipeline from "./home/HeroPipeline";
import { BRAND } from "./home/homeContent";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const svg = root.current?.querySelector<SVGSVGElement>("[data-pipe]");

      if (prefersReducedMotion()) {
        gsap.set("[data-hero-fade]", { autoAlpha: 1 });
        svg?.pauseAnimations();
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from("[data-hero-badge]", { y: 24, autoAlpha: 0, duration: 1 }, 0.1)
        .from(
          "[data-hero-fade]",
          { y: 30, autoAlpha: 0, duration: 1.1, stagger: 0.12 },
          0.55,
        )
        .from(scene.current, { y: 60, autoAlpha: 0, duration: 1.6 }, 0.2)
        .from(
          "[data-pipe-joint]",
          { scale: 0.4, autoAlpha: 0, duration: 1, stagger: 0.08, ease: "back.out(1.6)" },
          0.6,
        )
        .from("[data-cue]", { autoAlpha: 0, y: -14, duration: 0.8 }, 1.4);

      // Scroll: copy lifts away, the run drifts slower than the page.
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

      gsap.to(scene.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
        },
      });

      // Pointer: each layer of the run shifts by its own depth, so the
      // floating pieces slide past the tubes.
      const layers = gsap.utils
        .toArray<SVGGElement>("[data-pipe-depth]")
        .map((el) => {
          const depth = Number(el.dataset.pipeDepth);
          return {
            depth,
            x: gsap.quickTo(el, "x", { duration: 1, ease: "power3" }),
            y: gsap.quickTo(el, "y", { duration: 1, ease: "power3" }),
          };
        });

      const section = root.current;
      if (!section) return;

      const onMove = (e: PointerEvent) => {
        const r = section.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5;
        const dy = (e.clientY - r.top) / r.height - 0.5;
        layers.forEach((l) => {
          l.x(dx * 18 * l.depth);
          l.y(dy * 14 * l.depth);
        });
      };

      section.addEventListener("pointermove", onMove);
      return () => section.removeEventListener("pointermove", onMove);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden rounded-b-[40px] border-b border-secondary/20 bg-pattern-hero px-[4vw] pb-12 pt-28 shadow-2xl sm:rounded-b-[60px] lg:pt-32"
    >
      {/* soft light behind the run so the glass reads against the maroon wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_40%,color-mix(in_srgb,var(--color-surface)_55%,transparent)_0%,transparent_45%)]"
      />

      {/* the marble run — bleeds off the top and right like a product shot */}
      <div
        ref={scene}
        className="pointer-events-none relative order-2 mx-auto -mb-12 mt-6 h-[440px] w-full max-w-[520px] sm:h-[560px] lg:absolute lg:inset-y-0 lg:right-[-2vw] lg:mt-0 lg:mb-0 lg:h-full lg:w-[58%] lg:max-w-none"
      >
        <HeroPipeline className="h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-1 items-center">
        <div data-hero-copy className="max-w-[620px] lg:max-w-[50%]">
          <p
            data-hero-badge
            className="mb-5 flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-secondary"
          >
            <span className="h-2 w-2 animate-ping rounded-full bg-secondary" />
            {BRAND} · Your Growth Partner
          </p>

          <h1 className="font-display text-[clamp(2.4rem,4.2vw,3.85rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-tertiary">
            <AnimatedText text="Grow your business" delay={0.2} />
            <br />
            <AnimatedText text="with marketing," delay={0.3} />
            <br />
            <AnimatedText
              text="websites & AI"
              className="text-secondary"
              delay={0.4}
            />
          </h1>

          {/* One clean, quotable sentence — the line most likely to be lifted
              verbatim into an AI Overview, so keep it self-contained. */}
          <p
            data-hero-fade
            className="mt-6 max-w-[48ch] text-[1rem] font-medium leading-relaxed text-tertiary/70"
          >
            <KeywordText text="We help Indian businesses get found on Google, turn visitors into customers, and automate the busywork. Choose With AI+ for speed and value, or Without AI for a fully handcrafted build." />
          </p>

          <div data-hero-fade className="mt-9 flex flex-wrap gap-4">
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

          <p
            data-hero-fade
            className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold text-tertiary/60"
          >
            <CourseIcon name="globe" className="h-4 w-4 text-secondary" />
            <span>
              <strong className="kw">Ludhiana</strong>-based. Serving businesses
              across India.
            </span>
          </p>
        </div>
      </div>

      {/* Scroll Cue Indicator */}
      <button
        data-cue
        onClick={() => scrollToSection("about-us")}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-tertiary/70 transition-colors hover:text-secondary md:flex"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
          SCROLL TO EXPLORE
        </span>
        <span className="relative h-8 w-[20px] rounded-full border border-tertiary/30">
          <span className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 animate-bounce rounded-full bg-secondary" />
        </span>
      </button>
    </section>
  );
}
