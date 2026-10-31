import Link from "next/link";
import KeywordText from "./KeywordText";
import { GUIDE } from "./homeContent";

/** "What each service covers" — the homepage's long-form copy. A server
 *  component with no scroll reveal: it ships no JS and is fully visible in
 *  the server HTML, which is what crawlers and AI assistants read. */
export default function HomeGuide() {
  return (
    <section
      id="guide"
      aria-labelledby="guide-title"
      className="relative border-t border-secondary/20 px-[4vw] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">What we do</p>
            <h2
              id="guide-title"
              className="mt-4 max-w-[22ch] font-display text-[clamp(2.1rem,4.2vw,3.8rem)] font-semibold leading-[1] tracking-[-0.045em] text-tertiary"
            >
              {GUIDE.title}
            </h2>
          </div>
          <p className="max-w-[60ch] text-[1.02rem] leading-relaxed text-tertiary/70">
            <KeywordText text={GUIDE.intro} />
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16">
          {GUIDE.pillars.map((pillar, i) => (
            <article
              key={pillar.title}
              className="panel flex flex-col bg-surface p-7 sm:p-9 md:last:col-span-2"
            >
              <p className="font-mono text-[12px] font-bold text-secondary">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-[clamp(1.35rem,2vw,1.7rem)] font-semibold leading-tight tracking-[-0.025em] text-tertiary">
                {pillar.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-tertiary/70">
                <KeywordText text={pillar.body} />
              </p>
              <ul className="mt-5 grid gap-2 text-[14px] text-tertiary/75 sm:grid-cols-2">
                {pillar.points.map((point) => (
                  <li
                    key={point}
                    className="border-l-2 border-secondary/40 pl-3 leading-snug"
                  >
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href={pillar.href}
                className="mt-auto self-start pt-6 text-[14px] font-semibold text-secondary underline decoration-secondary/40 underline-offset-4 transition-colors hover:decoration-secondary"
              >
                More on {pillar.title.toLowerCase()} →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-10 border-t border-tertiary/15 pt-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold leading-tight tracking-[-0.03em] text-tertiary">
            How a project runs
          </h3>
          <ol className="grid gap-6 sm:grid-cols-2">
            {GUIDE.process.map((step, i) => (
              <li key={step.title} className="text-[14.5px] leading-relaxed text-tertiary/70">
                <strong className="block font-display text-[1.05rem] font-semibold text-tertiary">
                  {i + 1}. {step.title}
                </strong>
                {step.body}
              </li>
            ))}
          </ol>

          <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold leading-tight tracking-[-0.03em] text-tertiary">
            Where we work
          </h3>
          <p className="max-w-[70ch] text-[15px] leading-relaxed text-tertiary/70">
            <KeywordText text={GUIDE.areas} />
          </p>
        </div>
      </div>
    </section>
  );
}
