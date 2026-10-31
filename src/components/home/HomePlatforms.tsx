import SectionHead, { stagger } from "./SectionHead";
import { PLATFORMS } from "./homeContent";

/** "Search and analytics" -> "searchAndAnalytics", for the code-style keys. */
const camel = (name: string) =>
  name
    .toLowerCase()
    .split(/\s+/)
    .map((word, i) => (i ? word[0].toUpperCase() + word.slice(1) : word))
    .join("");

/* Syntax colours, all mixed from the theme so the editor stays on-brand. */
const KEY = "text-[color-mix(in_srgb,var(--color-secondary)_35%,var(--color-primary))]";
const PUNCT = "text-primary/40";
const COMMENT = "text-primary/35 italic";

const TOTAL = PLATFORMS.groups.reduce((n, group) => n + group.tools.length, 0);

/** An editor line. The gutter number is a CSS counter with empty alt text
 *  (content: counter / ""), so it is drawn but never read out, and a row of
 *  the definition list can stay a plain div > dt + dd. */
const LINE =
  "sd-rise relative pl-[3rem] [counter-increment:line] before:absolute before:left-0 before:w-[2.25rem] before:text-right before:text-primary/20 before:content-[counter(line)_/_''] sm:pl-[4.25rem] sm:before:w-[3rem]";

/** "Platforms we work with", as a code editor declaring the stack: each
 *  group is a line, each tool a highlighted string, and the lines rise in
 *  one by one as the window scrolls through. Screen readers get a plain
 *  definition list — the code dressing is aria-hidden. */
export default function HomePlatforms() {
  return (
    <section
      id="platforms"
      aria-labelledby="platforms-title"
      className="bg-pattern-digital relative overflow-hidden border-t border-secondary/20 px-[4vw] py-24 sm:py-32"
    >
      <p
        aria-hidden="true"
        className="sd-drift-rev text-outline pointer-events-none absolute left-0 top-[55%] whitespace-nowrap font-display text-[clamp(6rem,18vw,17rem)] font-extrabold uppercase leading-none tracking-[-0.06em]"
      >
        {"{ the stack }"}
      </p>

      <div className="relative mx-auto max-w-[1400px]">
        <SectionHead
          id="platforms-title"
          eyebrow="Platforms"
          title={PLATFORMS.title}
          accent="Already Use"
          intro={PLATFORMS.intro}
        />

        <div className="sd-wipe on-dark mt-14 overflow-hidden rounded-3xl border border-tertiary bg-tertiary text-primary shadow-[0_50px_80px_-40px_var(--shadow-warm-strong)] lg:mt-16">
          {/* window chrome */}
          <div aria-hidden="true" className="flex items-center gap-4 border-b border-primary/10 bg-ink/40 px-5 py-3.5">
            <span className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-secondary" />
              <span className="h-3 w-3 rounded-full bg-primary/30" />
              <span className="h-3 w-3 rounded-full bg-primary/15" />
            </span>
            <span className="rounded-t-lg border-b-2 border-secondary bg-primary/[0.06] px-3 py-1 font-mono text-[12px] font-semibold text-primary/80">
              crudify.stack.ts
            </span>
            <span className="ml-auto hidden items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary/50 sm:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[color-mix(in_srgb,var(--color-secondary)_50%,var(--color-primary))]" />
              In production
            </span>
          </div>

          {/* the code */}
          <div className="overflow-x-auto px-3 py-6 font-mono text-[13.5px] leading-[1.9] [counter-reset:line] sm:px-6 sm:text-[15px]">
            <div aria-hidden="true" className={`${LINE} ${COMMENT}`}>
              {"// The platforms we build on, run campaigns in and report from"}
            </div>
            <div aria-hidden="true" className={LINE} style={stagger(1)}>
              <span className={KEY}>export const</span> stack <span className={PUNCT}>= {"{"}</span>
            </div>

            <dl>
              {PLATFORMS.groups.map((group, i) => (
                <div
                  key={group.name}
                  className={`${LINE} flex flex-wrap gap-x-2 !pl-[4.25rem] sm:!pl-[6.25rem]`}
                  style={stagger(i % 4)}
                >
                  <dt>
                    <span className="sr-only">{group.name}</span>
                    <span aria-hidden="true" className={KEY}>
                      {camel(group.name)}
                      <span className={PUNCT}>: [</span>
                    </span>
                  </dt>
                  {group.tools.map((tool, j) => (
                    <dd key={tool} className="whitespace-nowrap">
                      <span aria-hidden="true" className={PUNCT}>&quot;</span>
                      <span className="rounded-sm text-primary transition-colors hover:bg-secondary">{tool}</span>
                      <span aria-hidden="true" className={PUNCT}>
                        &quot;{j < group.tools.length - 1 ? "," : "],"}
                      </span>
                    </dd>
                  ))}
                </div>
              ))}
            </dl>

            <div aria-hidden="true" className={`${LINE} ${PUNCT}`}>
              {"};"}
              <span className="ml-1 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-pulse bg-primary/70" />
            </div>
          </div>

          {/* status bar */}
          <div aria-hidden="true" className="flex flex-wrap items-center gap-x-6 gap-y-1 bg-secondary px-5 py-2 font-mono text-[11.5px] font-semibold text-primary/90">
            <span>✓ {PLATFORMS.groups.length} groups</span>
            <span>{TOTAL} platforms</span>
            <span className="ml-auto hidden sm:inline">TypeScript · UTF-8</span>
          </div>
        </div>
      </div>
    </section>
  );
}
