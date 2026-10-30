"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  prefersReducedMotion,
  introDelay,
  SCRAMBLE_CHARS,
} from "@/lib/gsap";
import AnimatedText from "./AnimatedText";
import { scrollToSection } from "./SmoothScroll";
import { CourseIcon } from "./Icons";
import KeywordText from "./home/KeywordText";
import { BRAND } from "./home/homeContent";

/** The template's five hero cards, left to right. Decorative — the photos
 *  are the site's own, the same ones the About pages use. */
const CARDS = [
  "/about/strategy.jpg",
  "/about/marketing.jpg",
  "/about/development.jpg",
  "/about/security.jpg",
  "/about/wins.jpg",
];

/* Card motion, lifted from the Orvix template's interaction data. The
   template's cards are 15vw wide and its offsets are in vw, so the numbers
   below are in fifteenths of a card's width and scaled to the real card:
     STACK — where each card starts: all piled on the middle one
     FAN   — the arc they spread into once the page is in
     FALL  — where they drop to as the hero scrolls away */
const STACK = [
  { x: 30, y: 0, rotation: 0 },
  { x: 15, y: 0, rotation: 0 },
  { x: 0, y: 2, rotation: 0 },
  { x: -15, y: 0, rotation: 0 },
  { x: -30, y: 0, rotation: 0 },
];
const FAN = [
  { x: 10, y: 6, rotation: -20 },
  { x: 5, y: 2, rotation: -10 },
  { x: 0, y: 0, rotation: 0 },
  { x: -5, y: 2, rotation: 10 },
  { x: -10, y: 6, rotation: 20 },
];
const FALL = [
  { x: 30, y: 70 },
  { x: 15, y: 70 },
  { x: 0, y: 70 },
  { x: -15, y: 70 },
  { x: -30, y: 70 },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-hero-card]");
      /** One template "vw", as pixels of this card row. */
      const vw = (n: number) => (n * (cards[0]?.offsetWidth ?? 0)) / 15;

      /* The intro (pile -> fan) and the scroll (fan -> fall) used to be two
         tweens on the same x / y / rotation. Scrolling back to the top rewound
         the scrubbed one, and GSAP restored the cards to whatever they were
         when it first ran — often the intro pile. Now each motion only moves
         its own progress value and one render() places the cards from both. */
      const state = cards.map(() => ({ rise: 1, fan: 0 }));
      const fall = { p: 0 };
      const FALL_STAGGER = 0.03;
      const lerp = gsap.utils.interpolate;

      const render = () => {
        cards.forEach((card, i) => {
          const { rise, fan } = state[i];
          // Same stagger the scrubbed tween had: later cards start later.
          const span = 1 + FALL_STAGGER * (cards.length - 1);
          const f = gsap.utils.clamp(0, 1, fall.p * span - FALL_STAGGER * i);

          const x = lerp(lerp(STACK[i].x, FAN[i].x, fan), FALL[i].x, f);
          const y = lerp(
            lerp(STACK[i].y + 4 * rise, FAN[i].y, fan),
            FALL[i].y,
            f,
          );
          gsap.set(card, {
            x: vw(x),
            y: vw(y),
            rotation: FAN[i].rotation * fan * (1 - f),
          });
        });
      };

      // Card width changes with the viewport, so re-place them on refresh.
      ScrollTrigger.addEventListener("refresh", render);

      if (prefersReducedMotion()) {
        gsap.set("[data-hero-fade]", { autoAlpha: 1 });
        state.forEach((s) => Object.assign(s, { rise: 0, fan: 1 }));
        gsap.set(cards, { autoAlpha: 1 });
        render();
        return () => ScrollTrigger.removeEventListener("refresh", render);
      }

      gsap.set(cards, { autoAlpha: 0 });
      render();

      // Plays as the preloader sheet lifts off, when there is one.
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: introDelay(),
      });

      // Cards: appear as one pile, then fan out into the arc.
      tl.to(
        cards,
        {
          autoAlpha: 1,
          duration: 0.6,
          stagger: { each: 0.06, from: "center" },
          ease: "power3.out",
        },
        0,
      )
        .to(
          state,
          {
            rise: 0,
            duration: 0.6,
            stagger: { each: 0.06, from: "center" },
            ease: "power3.out",
            onUpdate: render,
          },
          0,
        )
        .to(
          state,
          { fan: 1, duration: 0.8, ease: "power4.out", onUpdate: render },
          0.75,
        )
        .from("[data-hero-badge]", { y: 24, autoAlpha: 0, duration: 1 }, 0.1)
        .to(
          "[data-hero-scramble]",
          {
            duration: 1.4,
            ease: "none",
            scrambleText: { text: "{original}", chars: SCRAMBLE_CHARS, speed: 0.7 },
          },
          0.15,
        )
        .from(
          "[data-hero-fade]",
          { y: 30, autoAlpha: 0, duration: 1.1, stagger: 0.12 },
          0.55,
        )
        .from("[data-cue]", { autoAlpha: 0, y: -14, duration: 0.8 }, 1.4);

      // Scroll: the cards straighten and drop away one after another, as the
      // template's do, while the copy lifts off.
      gsap.to(fall, {
        p: 1,
        ease: "none",
        onUpdate: render,
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.to("[data-hero-copy]", {
        y: -110,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom 30%",
          scrub: 0.5,
        },
      });

      return () => ScrollTrigger.removeEventListener("refresh", render);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden border-b border-tertiary/15 bg-pattern-hero px-[4vw] pb-8 pt-24 lg:pt-28"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col">
        {/* sub-title row, after the template's label / plus / label strip */}
        <div
          data-hero-copy
          className="flex items-start justify-between gap-6 border-b border-tertiary/15 pb-4"
        >
          <p
            data-hero-badge
            className="flex items-center gap-2 text-[15px] font-medium text-tertiary"
          >
            <span className="h-2 w-2 animate-ping rounded-full bg-secondary" />
            <span data-hero-scramble>({BRAND} · Your Growth Partner)</span>
          </p>
          <span aria-hidden="true" className="plus-mark hidden sm:block">+</span>
          <p
            data-hero-fade
            className="hidden items-center gap-2 text-[15px] font-medium text-tertiary/70 md:inline-flex"
          >
            <CourseIcon name="globe" className="h-4 w-4 text-secondary" />
            <span>
              <strong className="kw">Ludhiana</strong>-based. Serving businesses
              across India.
            </span>
          </p>
        </div>

        {/* the card row — five cards fanned from the middle, as in the
            template; the first sits on top of the pile */}
        <div
          aria-hidden="true"
          className="pointer-events-none flex flex-1 items-end justify-center pb-[15vw] pt-8 md:pb-[7.5vw]"
        >
          {CARDS.map((src, i) => (
            <div
              key={src}
              data-hero-card
              style={{ zIndex: CARDS.length - i }}
              className="hero-card relative flex h-[32vw] w-[25vw] shrink-0 flex-col rounded-2xl border border-primary p-[1.4vw] will-change-transform md:h-[14.5vw] md:w-[11vw] md:p-[0.7vw]"
            >
              <div className="relative flex-1 overflow-hidden rounded-lg">
                <Image
                  src={src}
                  alt=""
                  fill
                  priority={i === 2}
                  sizes="(min-width: 768px) 11vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <div data-hero-copy>
          <h1 className="font-display text-[clamp(2.4rem,6.4vw,7rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.055em] text-tertiary">
            <AnimatedText text="Grow your business" delay={0.2} afterIntro />
            <br />
            <AnimatedText text="with marketing," delay={0.3} afterIntro />
            <br />
            <AnimatedText
              text="websites & AI"
              className="text-secondary"
              delay={0.4}
              afterIntro
            />
          </h1>

          <div className="mt-6 grid gap-6 border-t border-tertiary/15 pt-5 md:grid-cols-[1fr_auto] md:items-end">
            {/* One clean, quotable sentence — the line most likely to be lifted
                verbatim into an AI Overview, so keep it self-contained. */}
            <p
              data-hero-fade
              className="max-w-[56ch] text-[1.02rem] leading-relaxed text-tertiary/75"
            >
              <KeywordText text="We help Indian businesses get found on Google, turn visitors into customers, and automate the busywork. Choose With AI+ for speed and value, or Without AI for a fully handcrafted build." />
            </p>

            <div data-hero-fade className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollToSection("apply")}
                className="btn btn-primary"
              >
                Get a Free Growth Plan
                <CourseIcon name="chart" className="h-4 w-4" />
              </button>

              <button
                onClick={() => scrollToSection("services")}
                className="btn btn-ghost"
              >
                See Our Services →
              </button>
            </div>
          </div>

          <p
            data-hero-fade
            className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-tertiary/60 md:hidden"
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
        className="absolute right-[4vw] top-1/2 z-10 hidden origin-right -translate-y-1/2 rotate-90 items-center gap-3 text-tertiary/70 transition-colors hover:text-secondary xl:flex"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em]">
          SCROLL TO EXPLORE
        </span>
        <span className="h-px w-10 bg-current" />
      </button>
    </section>
  );
}
