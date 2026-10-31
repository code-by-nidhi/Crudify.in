import type { CSSProperties } from "react";
import KeywordText from "./KeywordText";

/** Staggers a .sd-* scroll reveal: item i starts a step later (globals.css). */
export const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/** The heading block the server-rendered homepage sections share: eyebrow,
 *  H2 with its accent phrase in cherry, and the intro beside it — the same
 *  type scale as the GSAP-animated sections, revealed by scroll in CSS. */
export default function SectionHead({
  id,
  eyebrow,
  title,
  accent,
  intro,
}: {
  /** Used for the H2's id, so the section can be aria-labelledby it. */
  id: string;
  eyebrow: string;
  title: string;
  /** The part of the title set in the accent colour; must appear in it. */
  accent: string;
  intro: string;
}) {
  const [before, after = ""] = title.split(accent);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
      <div className="sd-rise">
        <p className="eyebrow">{eyebrow}</p>
        <h2
          id={id}
          className="mt-4 max-w-[20ch] font-display text-[clamp(2.2rem,4.6vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-tertiary"
        >
          {before}
          <span className="text-accent">{accent}</span>
          {after}
        </h2>
      </div>
      <p className="sd-rise max-w-[58ch] text-[1.02rem] leading-relaxed text-tertiary/70" style={stagger(1)}>
        <KeywordText text={intro} />
      </p>
    </div>
  );
}
