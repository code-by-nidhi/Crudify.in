"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";

const CATEGORIES = ["Capabilities", "Results", "Charges", "About us"] as const;
type Category = (typeof CATEGORIES)[number];

const FAQS: { cat: Category; q: string; a: string }[] = [
  {
    cat: "Capabilities",
    q: "Can you take over a project someone else started?",
    a: "Yes. We start with a paid audit of the existing code, infrastructure and access, then give you an honest read on whether it is worth continuing or rebuilding — including the case against hiring us.",
  },
  {
    cat: "Capabilities",
    q: "Can you work with our in-house team?",
    a: "Often that is the better arrangement. We can supply a full squad, fill a specific gap, or review and mentor your developers while they build it themselves.",
  },
  {
    cat: "Capabilities",
    q: "Do we have to buy every service from you?",
    a: "No. Each pillar can be hired on its own. Combining them simply means the site, the campaigns and the automation are planned by the same people, so fewer things fall between the cracks.",
  },
  {
    cat: "Results",
    q: "How long does a typical build take?",
    a: "An AI-Powered Growth Pack build is usually live in one to two weeks. A Custom Premium build — a fully custom storefront, dashboard or CRM — runs four to eight weeks.",
  },
  {
    cat: "Results",
    q: "How do you report on marketing results?",
    a: "One monthly view of spend, enquiries and cost per acquisition, tied back to the channel each lead came from — not a screenshot of impressions and reach.",
  },
  {
    cat: "Results",
    q: "What happens after launch?",
    a: "Every project includes a support window. After that you can move onto a managed care retainer with agreed response times, or take it in-house — we will train your team either way.",
  },
  {
    cat: "Charges",
    q: "How much do your services cost?",
    a: "The AI-Powered Growth Pack starts at ₹20,000 setup plus a monthly retainer; Custom Premium builds start at ₹1,50,000. Every engagement gets a fixed written quote before work begins.",
  },
  {
    cat: "Charges",
    q: "Are there any hidden charges?",
    a: "No. The scope document lists exactly what is included. Ad spend is paid directly to Meta or Google from your own ad account.",
  },
  {
    cat: "Charges",
    q: "How is security work priced?",
    a: "A security audit is scoped per environment and quoted as a fixed-price engagement with a written report. Ongoing attack prevention, log monitoring and incident response sit inside a monthly retainer instead.",
  },
  {
    cat: "About us",
    q: "Do we own the code and the accounts?",
    a: "You do, from the first commit. Repositories, hosting, domains, ad accounts and analytics are created in your name or transferred to it at handover, with documentation.",
  },
  {
    cat: "About us",
    q: "Who will actually work on our project?",
    a: "A five-person studio covering development, marketing and security under one roof — so the people on your discovery call are the people doing the work.",
  },
  {
    cat: "About us",
    q: "How do we get started?",
    a: "Send an enquiry through the form below. We will book a ten-minute discovery call, then send a written scope and a fixed quote before anything starts.",
  },
];

export default function ServicesFaq() {
  const root = useRef<HTMLElement>(null);
  const [cat, setCat] = useState<Category>(CATEGORIES[0]);
  const [open, setOpen] = useState<number | null>(0);
  // Rows start hidden for the scroll-in; once that has played, rows mounted
  // by a category switch must render visible straight away.
  const [revealed, setRevealed] = useState(false);
  const visible = FAQS.filter((faq) => faq.cat === cat);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-faq]");

      if (prefersReducedMotion()) {
        gsap.set(rows, { autoAlpha: 1 });
        setRevealed(true);
        return;
      }

      gsap.from(rows, {
        autoAlpha: 0,
        y: 34,
        duration: 0.9,
        stagger: 0.07,
        ease: "expo.out",
        onComplete: () => setRevealed(true),
        scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="services-faq"
      className="bg-pattern-digital relative px-[4vw] py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Questions</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
            <AnimatedText text="Questions we get" onScroll />
            <br />
            <AnimatedText text="before the first call." className="text-accent" onScroll />
          </h2>
          <p className="mt-6 max-w-[40ch] text-[14.5px] leading-relaxed text-tertiary/60">
            If yours is not here, the enquiry form below reaches an engineer, not
            a sales queue.
          </p>
        </div>

        <div>
        <div
          aria-label="FAQ categories"
          className="mb-6 flex flex-wrap gap-2"
        >
          {CATEGORIES.map((c) => (
            <button
              key={c}
              aria-pressed={cat === c}
              onClick={() => {
                setCat(c);
                setOpen(0);
              }}
              className={`rounded-full border px-4 py-2 text-[12px] font-bold uppercase tracking-wider transition-colors ${
                cat === c
                  ? "border-secondary bg-secondary text-primary"
                  : "border-tertiary/15 text-tertiary/60 hover:border-secondary/50 hover:text-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <ul className="flex flex-col">
          {visible.map((faq, i) => {
            const expanded = open === i;

            return (
              <li
                key={faq.q}
                data-faq
                style={revealed ? undefined : { visibility: "hidden" }}
                className="border-b border-tertiary/10 first:border-t first:border-tertiary/10"
              >
                <h3>
                  <button
                    onClick={() => setOpen(expanded ? null : i)}
                    aria-expanded={expanded}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={`max-w-[44ch] font-display text-[1.1rem] font-semibold leading-snug tracking-[-0.02em] transition-colors ${
                        expanded ? "text-secondary" : "text-tertiary/80"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        expanded
                          ? "rotate-45 border-secondary bg-secondary/15 text-secondary"
                          : "border-tertiary/20 text-tertiary/60"
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                {/* grid-rows trick animates to the content's natural height
                    without measuring it in JS */}
                <div
                  id={`faq-panel-${i}`}
                  className={`grid transition-all duration-400 ease-out ${
                    expanded
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[62ch] pb-7 text-[14.5px] leading-relaxed text-tertiary/60">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        </div>
      </div>
    </section>
  );
}
