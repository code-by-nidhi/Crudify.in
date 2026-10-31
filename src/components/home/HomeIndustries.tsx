import { CourseIcon } from "../Icons";
import KeywordText from "./KeywordText";
import SectionHead, { stagger } from "./SectionHead";
import { INDUSTRIES } from "./homeContent";

/** "Industries we serve" — what we do for each kind of Punjab business. The
 *  tiles wipe up column by column as the grid scrolls in, and flood cherry
 *  on hover. */
export default function HomeIndustries() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-title"
      data-glow="left"
      className="section-dark bg-dark-gradient relative border-t px-[4vw] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          id="industries-title"
          eyebrow="Industries we serve"
          title={INDUSTRIES.title}
          accent="Punjab Business"
          intro={INDUSTRIES.intro}
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {INDUSTRIES.items.map((item, i) => (
            <li
              key={item.name}
              className="sd-wipe group relative flex min-h-[19rem] flex-col overflow-hidden rounded-3xl border border-secondary/20 bg-surface p-7 transition-colors duration-500 hover:border-secondary hover:bg-secondary"
              style={stagger(i % 4)}
            >
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-secondary/30 text-secondary transition-colors duration-500 group-hover:border-primary/40 group-hover:text-primary">
                  <CourseIcon name={item.icon} className="h-6 w-6" />
                </span>
                <span
                  aria-hidden="true"
                  className="font-display text-[3.2rem] font-bold leading-none tracking-[-0.06em] text-tertiary/[0.08] transition-colors duration-500 group-hover:text-primary/20"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-auto pt-10 font-display text-[1.3rem] font-semibold leading-tight tracking-[-0.025em] text-tertiary transition-colors duration-500 group-hover:text-primary">
                {item.name}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-tertiary/65 transition-colors duration-500 group-hover:text-primary/85 group-hover:[&_.kw]:text-primary">
                <KeywordText text={item.body} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
