import { CourseIcon } from "../Icons";
import KeywordText from "./KeywordText";
import SectionHead, { stagger } from "./SectionHead";
import { OUTCOMES } from "./homeContent";

/** "Marketing measured in enquiries" — the metrics we report on, as a bento
 *  grid over an outlined word that drifts with the scroll. Trust from
 *  transparency: it says what gets measured, never invents results. */
export default function HomeOutcomes() {
  const [lead, ...rest] = OUTCOMES.items;

  return (
    <section
      id="outcomes"
      aria-labelledby="outcomes-title"
      className="section-dark bg-dark-gradient relative overflow-hidden border-t px-[4vw] py-24 sm:py-32"
    >
      <p
        aria-hidden="true"
        className="sd-drift text-outline pointer-events-none absolute left-0 top-[46%] whitespace-nowrap font-display text-[clamp(6rem,17vw,16rem)] font-extrabold uppercase leading-none tracking-[-0.06em]"
      >
        Enquiries · Leads · Sales
      </p>

      <div className="relative mx-auto max-w-[1400px]">
        <SectionHead
          id="outcomes-title"
          eyebrow="Results we track"
          title={OUTCOMES.title}
          accent="Enquiries, Not Likes"
          intro={OUTCOMES.intro}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {/* the lead metric, as the one red tile */}
          <article
            className="sd-wipe on-dark relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[linear-gradient(150deg,#c4382a,#810100_55%,#3d0000)] p-8 text-primary sm:p-10 md:row-span-2"
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-secondary">
              <CourseIcon name={lead.icon} className="h-7 w-7" />
            </span>
            <div className="mt-16">
              <p className="font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-primary/60">
                Metric 01 · the one that matters most
              </p>
              <h3 className="mt-3 font-display text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-[1] tracking-[-0.04em]">
                {lead.title}
              </h3>
              <p className="mt-4 max-w-[38ch] text-[15.5px] leading-relaxed text-primary/75">
                <KeywordText text={lead.body} />
              </p>
            </div>
          </article>

          {rest.map((item, i) => (
            <article
              key={item.title}
              className="sd-pop panel group flex flex-col bg-surface p-7 transition-colors duration-500 hover:bg-secondary hover:text-primary"
              style={stagger(i % 2)}
            >
              <div className="flex items-center justify-between">
                <span className="icon-glow-badge h-11 w-11">
                  <CourseIcon name={item.icon} className="h-5 w-5" />
                </span>
                <span className="font-mono text-[12px] font-bold text-secondary transition-colors group-hover:text-primary/70">
                  {String(i + 2).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 font-display text-[1.3rem] font-semibold tracking-[-0.025em]">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-tertiary/65 transition-colors group-hover:text-primary/80">
                {item.body}
              </p>
            </article>
          ))}
        </div>

        <p className="sd-rise mt-10 flex max-w-[70ch] items-start gap-3 text-[15px] leading-relaxed text-tertiary/70">
          <CourseIcon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
          {OUTCOMES.note}
        </p>
      </div>
    </section>
  );
}
