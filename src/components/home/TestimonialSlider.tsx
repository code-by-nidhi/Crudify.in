"use client";

import { REVIEWS } from "./homeContent";
import { SliderArrows, SliderDots, useAutoSlider } from "./useAutoSlider";

const SLIDES = REVIEWS;

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/**
 * Client testimonials as an auto-advancing row: 1 card on phones, 2 on
 * tablets, 3 on desktop. Sliding behaviour lives in useAutoSlider.
 */
export default function TestimonialSlider() {
  const { track, active, pages, goTo, pauseProps } = useAutoSlider(SLIDES.length);

  if (SLIDES.length === 0) return null;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="relative border-t border-secondary/20 px-[4vw] py-24 sm:py-32"
      {...pauseProps}
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Testimonials</p>
            <h2
              id="testimonials-title"
              className="mt-4 font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary"
            >
              What our <span className="text-accent">clients say</span>
            </h2>
          </div>

          <SliderArrows active={active} pages={pages} goTo={goTo} label="testimonial" />
        </div>

        <div
          ref={track}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          // Lenis would otherwise swallow horizontal trackpad gestures here.
          data-lenis-prevent
          className="-mx-2 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-2 pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SLIDES.map((review, i) => (
            <figure
              key={i}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${SLIDES.length}`}
              className="panel group flex w-[88%] shrink-0 snap-start flex-col p-7 sm:p-8 md:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
            >
              <div className="flex items-start justify-between gap-4">
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="text-secondary/25 transition-colors duration-500 group-hover:text-secondary"
                >
                  <path
                    fill="currentColor"
                    d="M9.6 5C6.2 6.4 4 9.3 4 13.2V19h6v-6H7.1c.1-2.4 1.3-4.2 3.6-5.3L9.6 5Zm10 0c-3.4 1.4-5.6 4.3-5.6 8.2V19h6v-6h-2.9c.1-2.4 1.3-4.2 3.6-5.3L19.6 5Z"
                  />
                </svg>
                {review.rating && (
                  <span
                    role="img"
                    aria-label={`Rated ${review.rating} out of 5`}
                    className="flex gap-0.5 text-secondary"
                  >
                    {Array.from({ length: 5 }).map((_, s) => (
                      <svg
                        key={s}
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className={s < review.rating! ? "" : "opacity-20"}
                      >
                        <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z" />
                      </svg>
                    ))}
                  </span>
                )}
              </div>

              <blockquote className="mt-6 flex-1 text-[15.5px] font-medium leading-relaxed text-tertiary/80">
                &ldquo;{review.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-8 flex items-center gap-3.5 border-t border-tertiary/12 pt-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary font-display text-[14px] font-bold text-primary shadow-md">
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

        <SliderDots active={active} pages={pages} goTo={goTo} label="testimonial" />
      </div>
    </section>
  );
}
