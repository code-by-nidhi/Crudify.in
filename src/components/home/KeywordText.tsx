import { Fragment } from "react";
import { KEYWORDS } from "./homeContent";

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** One alternation, longest phrase first, so the regex engine prefers
 *  "Google Maps ranking" over "Google Maps" at the same position. */
const PATTERN = new RegExp(
  `(${[...KEYWORDS].sort((a, b) => b.length - a.length).map(escape).join("|")})`,
  "gi",
);

/** Renders plain copy with the SEO keywords wrapped in <strong class="kw">.
 *  The text itself is unchanged, so it can be shared with the JSON-LD. */
export default function KeywordText({ text }: { text: string }) {
  // split() with a capturing group puts every match at an odd index.
  return text.split(PATTERN).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="kw">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
