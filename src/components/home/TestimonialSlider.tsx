"use client";

import { useRef, useState } from "react";
import { gsap, Draggable, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";
import { REVIEWS } from "./homeContent";

const SLIDES = REVIEWS;

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** Where a card sits by its place in the deck — the top three fan out at the
 *  template's tilts, the rest wait invisibly behind them. */
const POSES = [
  { x: "0%", y: 0, rotation: -2, scale: 1, autoAlpha: 1 },
  { x: "7%", y: 18, rotation: 5, scale: 0.95, autoAlpha: 1 },
  { x: "-7%", y: 32, rotation: -7, scale: 0.9, autoAlpha: 1 },
  { x: "0%", y: 40, rotation: 0, scale: 0.86, autoAlpha: 0 },
];
const poseFor = (rank: number) => POSES[Math.min(rank, POSES.length - 1)];

/** How far the top card has to be dragged before it is thrown to the back. */
const THROW_AT = 110;

/**
 * Client testimonials as the template's draggable deck: drag the top card
 * aside (or use the arrows) and it is thrown to the back of the pile. Every
 * review stays in the DOM — only the top one is exposed to assistive tech.
 */
export default function TestimonialSlider() {
  const root = useRef<HTMLElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const drag = useRef<Draggable | null>(null);
  const [order, setOrder] = useState(() => SLIDES.map((_, i) => i));
  const top = order[0];

  const next = () => setOrder((o) => [...o.slice(1), o[0]]);
  const prev = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);

  /** Fling the top card off to one side, then send it to the back. */
  const throwTop = (direction: 1 | -1) => {
    const card = cards.current[top];
    if (!card || prefersReducedMotion()) return next();
    drag.current?.disable();
    gsap.to(card, {
      x: direction * card.offsetWidth * 1.2,
      rotation: direction * 18,
      duration: 0.45,
      ease: "power2.in",
      onComplete: next,
    });
  };

  const bringBack = () => {
    const last = cards.current[order[order.length - 1]];
    if (last && !prefersReducedMotion()) {
      gsap.set(last, { x: -(last.offsetWidth * 1.2), rotation: -18, autoAlpha: 1 });
    }
    prev();
  };

  // Re-deal the deck whenever its order changes, and hand the drag to
  // whichever card is now on top.
  useGSAP(
    () => {
      const still = prefersReducedMotion();

      order.forEach((index, rank) => {
        const card = cards.current[index];
        if (!card) return;
        gsap.set(card, { zIndex: SLIDES.length - rank });
        gsap.to(card, {
          ...poseFor(rank),
          duration: still ? 0 : 0.8,
          ease: "expo.out",
          overwrite: "auto",
        });
      });

      drag.current?.kill();
      drag.current = null;

      const card = cards.current[top];
      if (!card || still) return;

      [drag.current] = Draggable.create(card, {
        type: "x",
        // Vertical swipes still scroll the page on touch screens.
        allowNativeTouchScrolling: true,
        onPress() {
          gsap.killTweensOf(card);
          gsap.to(card, { scale: 1.02, rotation: 0, duration: 0.25 });
        },
        onDrag() {
          gsap.set(card, { rotation: this.x * 0.05 });
        },
        onRelease() {
          if (Math.abs(this.x) > THROW_AT) {
            throwTop(this.x > 0 ? 1 : -1);
          } else {
            gsap.to(card, {
              ...poseFor(0),
              duration: 0.9,
              ease: "elastic.out(1, 0.6)",
            });
          }
        },
      });
    },
    { scope: root, dependencies: [order] },
  );

  useGSAP(() => () => drag.current?.kill(), { scope: root });

  if (SLIDES.length === 0) return null;

  return (
    <section
      ref={root}
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="section-dark bg-dark-gradient relative overflow-hidden border-t px-[4vw] py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="eyebrow">Testimonials</p>
          <h2
            id="testimonials-title"
            className="mt-4 font-display text-[clamp(2.4rem,5vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-tertiary"
          >
            <AnimatedText text="What our" onScroll />{" "}
            <AnimatedText text="clients say" className="text-accent" onScroll />
          </h2>

          <div className="mt-10 flex items-end justify-between gap-6 border-t border-tertiary/15 pt-6 lg:max-w-[26rem]">
            <p
              aria-live="polite"
              className="font-display text-[clamp(2.4rem,4vw,3.4rem)] font-semibold leading-none tracking-[-0.05em] text-tertiary tabular-nums"
            >
              {String(top + 1).padStart(2, "0")}
              <span className="text-tertiary/30">
                /{String(SLIDES.length).padStart(2, "0")}
              </span>
            </p>

            <div className="flex gap-2">
              {[
                { name: "Previous testimonial", dir: -1, path: "M15 6l-6 6 6 6" },
                { name: "Next testimonial", dir: 1, path: "M9 6l6 6-6 6" },
              ].map((btn) => (
                <button
                  key={btn.name}
                  type="button"
                  aria-label={btn.name}
                  onClick={() => (btn.dir < 0 ? bringBack() : throwTop(1))}
                  className="btn btn-ghost h-12 w-12 !p-0"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d={btn.path} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* the deck */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          className="relative mx-auto h-[500px] w-full max-w-[560px] sm:h-[430px]"
        >
          {SLIDES.map((review, i) => (
            <figure
              key={i}
              ref={(el) => {
                cards.current[i] = el;
              }}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${SLIDES.length}`}
              aria-hidden={i !== top}
              style={{ zIndex: SLIDES.length - order.indexOf(i) }}
              className={`panel !absolute inset-x-0 top-0 flex h-[calc(100%-44px)] select-none flex-col p-7 will-change-transform sm:p-9 ${
                i === top ? "cursor-grab active:cursor-grabbing" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="text-secondary"
                >
                  <path
                    fill="currentColor"
                    d="M9.6 5C6.2 6.4 4 9.3 4 13.2V19h6v-6H7.1c.1-2.4 1.3-4.2 3.6-5.3L9.6 5Zm10 0c-3.4 1.4-5.6 4.3-5.6 8.2V19h6v-6h-2.9c.1-2.4 1.3-4.2 3.6-5.3L19.6 5Z"
                  />
                </svg>
                {/* Stars as text, not five SVGs — one node per card instead
                    of eleven, across a deck that keeps every card mounted. */}
                {review.rating && (
                  <span
                    role="img"
                    aria-label={`Rated ${review.rating} out of 5`}
                    className="text-[16px] leading-none tracking-[0.12em] text-secondary"
                  >
                    {"★".repeat(review.rating)}
                    {review.rating < 5 && (
                      <span className="opacity-20">{"★".repeat(5 - review.rating)}</span>
                    )}
                  </span>
                )}
              </div>

              <blockquote className="mt-6 flex-1 text-[16px] font-medium leading-relaxed text-tertiary/85 sm:text-[17px]">
                &ldquo;{review.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3.5 border-t border-tertiary/12 pt-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary font-display text-[14px] font-bold text-primary">
                  {initials(review.name)}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-[15px] font-semibold text-tertiary">
                    {review.name}
                  </p>
                  <p className="truncate text-[12.5px] text-tertiary/60">
                    {review.role} · {review.location}
                  </p>
                </div>
                {review.service && (
                  <span className="ml-auto hidden shrink-0 rounded-full border border-secondary/25 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-secondary sm:inline">
                    {review.service}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
