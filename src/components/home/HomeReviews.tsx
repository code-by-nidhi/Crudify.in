import { GOOGLE_BUSINESS_PROFILE_URL, REVIEWS } from "./homeContent";

/** "What Our Clients Say". Renders nothing until REVIEWS holds real reviews —
 *  invented ones hurt both rankings and trust. */
export default function HomeReviews() {
  if (REVIEWS.length === 0) return null;

  return (
    <section
      id="reviews"
      className="bg-pattern-architecture relative px-[4vw] py-24 sm:py-32 border-t border-secondary/20"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow">Reviews</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
            What Our <span className="text-accent">Clients Say</span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <figure key={review.name + review.business} className="panel flex flex-col p-7">
              <blockquote className="flex-1 text-[15px] leading-relaxed text-tertiary/80">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-tertiary/12 pt-4 text-[13px]">
                <span className="font-display font-semibold text-tertiary">{review.name}</span>
                <span className="text-tertiary/60">
                  , {review.business}, {review.city}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {GOOGLE_BUSINESS_PROFILE_URL && (
          <div className="mt-10 flex justify-center">
            <a
              href={GOOGLE_BUSINESS_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost border-secondary/40 text-secondary hover:bg-secondary/15"
            >
              Read all reviews on Google →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
