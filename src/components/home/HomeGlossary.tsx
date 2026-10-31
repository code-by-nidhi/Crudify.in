import type { CSSProperties } from "react";
import { Caveat } from "next/font/google";
import KeywordText from "./KeywordText";
import SectionHead from "./SectionHead";
import { GLOSSARY } from "./homeContent";

/** The handwritten card numbers. Below the fold, so not preloaded. */
const hand = Caveat({ subsets: ["latin"], weight: "500", variable: "--font-hand", preload: false });

/** Slug for a term's anchor, so each definition can be linked to directly. */
export const termId = (term: string) =>
  `term-${term.toLowerCase().replace(/\(.*?\)/g, "").trim().replace(/[^a-z0-9]+/g, "-")}`;

const TINTS = ["peach", "blue", "lilac"] as const;
/** Each card's lean, cycled — never two the same in a row. */
const TILTS = [-6, 5, -3, 7, -5, 3];

/** "Digital marketing terms, in plain English" — short, quotable definitions
 *  (also published as a DefinedTermSet in app/page.tsx), pinned to a lined
 *  board: the cards zig-zag down, tied together by dashed threads, and each
 *  one drops into place as it scrolls in. All the styling is in globals.css
 *  ("Pinned glossary board"), so this ships no JavaScript. */
export default function HomeGlossary() {
  const last = GLOSSARY.terms.length - 1;

  return (
    <section
      id="glossary"
      aria-labelledby="glossary-title"
      className={`${hand.variable} paper-lines relative overflow-hidden border-t border-secondary/20 px-[4vw] py-24 sm:py-32`}
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          id="glossary-title"
          eyebrow="Glossary"
          title={GLOSSARY.title}
          accent="Plain English"
          intro={GLOSSARY.intro}
        />

        <dl className="mx-auto mt-20 flex max-w-[1000px] flex-col gap-14 md:gap-0 lg:mt-24">
          {GLOSSARY.terms.map((item, i) => {
            const left = i % 2 === 0;

            return (
              <div
                key={item.term}
                id={termId(item.term)}
                data-tint={TINTS[i % TINTS.length]}
                // Left cards thread off to the right towards the next card,
                // right cards to the left; the last card has nowhere to go.
                data-thread={i === last ? undefined : left ? "right" : "left"}
                className={`pin-card sd-pin w-[92%] max-w-[27rem] scroll-mt-32 md:w-[40%] ${
                  left ? "self-start" : "self-end"
                } ${i > 0 ? "md:-mt-16" : ""}`}
                style={{ "--tilt": `${TILTS[i % TILTS.length]}deg` } as CSSProperties}
              >
                <dt
                  data-n={String(i + 1).padStart(2, "0")}
                  className="font-display text-[1.45rem] font-semibold leading-tight tracking-[-0.025em] text-tertiary"
                >
                  {item.term}
                </dt>
                <dd className="mt-2.5 text-[14.5px] leading-relaxed text-tertiary/65">
                  <KeywordText text={item.definition} />
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
