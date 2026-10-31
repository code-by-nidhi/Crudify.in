import { CourseIcon } from "../Icons";
import KeywordText from "./KeywordText";
import SectionHead, { stagger } from "./SectionHead";
import { CITY_PAGES } from "./homeContent";

const NAMES = CITY_PAGES.items.map((item) => item.city);

/** "Across Punjab" — a local-SEO section: two oversized bands of city names
 *  sliding in opposite directions with the scroll, then a card per city
 *  saying what local businesses there need. */
export default function HomeCities() {
  const [home, ...rest] = CITY_PAGES.items;

  return (
    <section
      id="punjab"
      aria-labelledby="punjab-title"
      className="relative overflow-hidden border-t border-secondary/20 px-[4vw] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          id="punjab-title"
          eyebrow="Across Punjab"
          title={CITY_PAGES.title}
          accent="Across Punjab"
          intro={CITY_PAGES.intro}
        />
      </div>

      <div aria-hidden="true" className="-mx-[4vw] mt-14 select-none overflow-hidden font-display font-extrabold uppercase leading-[0.9] tracking-[-0.06em]">
        <p className="sd-drift whitespace-nowrap text-[clamp(3.5rem,9vw,8.5rem)] text-tertiary">
          {NAMES.join(" · ")} · {NAMES[0]}
        </p>
        <p className="sd-drift-rev text-outline whitespace-nowrap text-[clamp(3.5rem,9vw,8.5rem)]">
          {[...NAMES].reverse().join(" · ")} · {NAMES[NAMES.length - 1]}
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1400px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="sd-wipe on-dark flex flex-col rounded-3xl bg-secondary p-8 text-primary sm:col-span-2 sm:p-10">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary/75">
            <CourseIcon name="pin" className="h-4 w-4" />
            Home base
          </p>
          <h3 className="mt-auto pt-12 font-display text-[clamp(2.6rem,5vw,4.2rem)] font-bold leading-none tracking-[-0.05em]">
            {home.city}
          </h3>
          <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-primary/85">
            <KeywordText text={home.body} />
          </p>
        </article>

        {rest.map((item, i) => (
          <article
            key={item.city}
            className="sd-pop panel flex flex-col bg-surface p-7"
            style={stagger(i % 2)}
          >
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">
              <CourseIcon name="pin" className="h-4 w-4" />
              Punjab
            </p>
            <h3 className="mt-6 font-display text-[1.7rem] font-semibold leading-none tracking-[-0.035em] text-tertiary">
              {item.city}
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-tertiary/65">
              <KeywordText text={item.body} />
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
