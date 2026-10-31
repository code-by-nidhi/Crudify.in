import { CourseIcon } from "../Icons";
import SectionHead, { stagger } from "./SectionHead";
import { COMPARISON } from "./homeContent";

/** Desktop column order: the rivals flank us, so we sit in the middle. */
const GRID = "md:grid-cols-[1fr_1.35fr_1fr]";

/** "CRUDIFY vs a freelancer vs a large agency", staged as a versus card:
 *  the two rivals lean away as the section scrolls in while ours rises in
 *  the centre, then each criterion plays out as a numbered round. On phones
 *  our answer leads each round and the rivals follow, labelled. */
export default function HomeCompare() {
  const [ours, ...rivals] = COMPARISON.columns;
  const [ourTagline, ...rivalTaglines] = COMPARISON.taglines;

  const rival = (i: number, side: "l" | "r") => (
    <div
      className={`${side === "l" ? "sd-tilt-l md:order-1" : "sd-tilt-r md:order-3"} hidden rounded-3xl border border-tertiary/15 bg-surface/70 p-6 md:block`}
    >
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-tertiary/40">
        Option {side === "l" ? "A" : "C"}
      </p>
      <p className="mt-6 font-display text-[1.5rem] font-semibold tracking-[-0.03em] text-tertiary/55">
        {rivals[i]}
      </p>
      <p className="mt-1.5 text-[13.5px] text-tertiary/45">{rivalTaglines[i]}</p>
    </div>
  );

  return (
    <section
      id="compare"
      aria-labelledby="compare-title"
      className="relative overflow-hidden border-t border-secondary/20 px-[4vw] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          id="compare-title"
          eyebrow="Compare"
          title={COMPARISON.title}
          accent="Freelancers and Agencies"
          intro={COMPARISON.intro}
        />

        {/* the contenders */}
        <div className={`mt-16 grid items-end gap-5 lg:mt-20 ${GRID}`}>
          {rival(0, "l")}
          <div className="sd-pop on-dark relative overflow-hidden rounded-3xl bg-secondary p-8 text-primary shadow-[0_40px_70px_-30px_var(--shadow-warm-strong)] sm:p-10 md:order-2">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 -top-10 font-display text-[9rem] font-extrabold leading-none tracking-[-0.08em] text-primary/[0.07]"
            >
              VS
            </span>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.2em]">
              <CourseIcon name="zap" className="h-3.5 w-3.5" />
              Option B · Best of both
            </p>
            <p className="mt-8 font-display text-[clamp(2.4rem,4.4vw,3.6rem)] font-extrabold leading-none tracking-[-0.05em]">
              {ours}
            </p>
            <p className="mt-2 text-[15px] font-medium text-primary/80">{ourTagline}</p>
          </div>
          {rival(1, "r")}
        </div>

        {/* the rounds */}
        <ol className="mt-12 flex flex-col gap-4 lg:mt-14">
          {COMPARISON.rows.map((row, i) => {
            const [mine, ...theirs] = row.values;

            return (
              <li key={row.label} className="sd-rise relative rounded-3xl border border-tertiary/10 bg-surface/50 p-5 sm:p-6" style={stagger(i % 2)}>
                <h3 className="flex items-baseline gap-3 font-display text-[1.15rem] font-semibold tracking-[-0.02em] text-tertiary">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">
                    Round {String(i + 1).padStart(2, "0")}
                  </span>
                  {row.label}
                </h3>

                <div className={`mt-4 grid gap-3 md:items-center ${GRID}`}>
                  {/* ours */}
                  <p className="sd-pop flex items-start gap-3 rounded-2xl bg-secondary px-5 py-4 text-[15px] font-semibold leading-snug text-primary shadow-[0_18px_30px_-18px_var(--shadow-warm-strong)] md:order-2">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-secondary">
                      <CourseIcon name="check" className="h-3.5 w-3.5" />
                    </span>
                    <span>
                      <span className="sr-only">{ours}: </span>
                      {mine}
                    </span>
                  </p>

                  {theirs.map((value, j) => (
                    <p
                      key={rivals[j]}
                      className={`flex items-start gap-3 px-2 text-[14px] leading-snug text-tertiary/50 md:px-5 ${
                        j === 0 ? "md:order-1 md:text-right md:flex-row-reverse" : "md:order-3"
                      }`}
                    >
                      <span aria-hidden="true" className="mt-[0.45em] h-px w-3 shrink-0 bg-tertiary/30" />
                      <span>
                        <span className="block text-[10.5px] font-bold uppercase tracking-[0.16em] text-tertiary/40 md:sr-only">
                          {rivals[j]}
                        </span>
                        {value}
                      </span>
                    </p>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="sd-rise mt-12 flex flex-col items-start justify-between gap-5 border-t border-tertiary/15 pt-8 md:flex-row md:items-center">
          <p className="max-w-[52ch] font-display text-[1.35rem] font-semibold leading-snug tracking-[-0.02em] text-tertiary">
            Six rounds, one team.{" "}
            <span className="text-tertiary/55">
              See how it would work for your business, with a free growth plan.
            </span>
          </p>
          <a href="#apply" className="btn btn-primary shrink-0">
            Get my free growth plan
            <CourseIcon name="chart" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
