"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "../AnimatedText";
import { scrollToSection } from "../SmoothScroll";

type Mockup =
  | "business"
  | "corporate"
  | "ecommerce"
  | "shopify"
  | "wordpress"
  | "landing"
  | "redesign"
  | "wedding"
  | "custom";

const TYPES: { name: string; desc: string; ghost: string; mockup: Mockup }[] = [
  {
    name: "Business Websites",
    desc: "Professional websites designed to establish credibility and generate enquiries.",
    ghost: "Business",
    mockup: "business",
  },
  {
    name: "Corporate Websites",
    desc: "Structured digital experiences for established companies and organisations.",
    ghost: "Corporate",
    mockup: "corporate",
  },
  {
    name: "E-Commerce Websites",
    desc: "Online stores designed around product discovery, trust and conversion.",
    ghost: "Commerce",
    mockup: "ecommerce",
  },
  {
    name: "Shopify Stores",
    desc: "Custom Shopify experiences — theme customisation, sections, product experiences and integrations.",
    ghost: "Shopify",
    mockup: "shopify",
  },
  {
    name: "WordPress Websites",
    desc: "Flexible, SEO-friendly WordPress websites built for easy content management.",
    ghost: "WordPress",
    mockup: "wordpress",
  },
  {
    name: "Landing Pages",
    desc: "Focused experiences designed around one action, one audience and one conversion goal.",
    ghost: "Landing",
    mockup: "landing",
  },
  {
    name: "Website Redesign",
    desc: "Outdated websites rebuilt as modern, responsive and conversion-focused experiences.",
    ghost: "Redesign",
    mockup: "redesign",
  },
  {
    name: "Web-Based Wedding Invitation Sites",
    desc: "Elegant digital invitations with event details, venue maps, galleries and online RSVPs — shared with a single link.",
    ghost: "Wedding",
    mockup: "wedding",
  },
  {
    name: "Custom Web Experiences",
    desc: "For brands that need something beyond a standard template.",
    ghost: "Custom",
    mockup: "custom",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------
   Mockups — one browser frame, nine page layouts inside it. Drawn in the
   site's two inks (tertiary structure, secondary for the one element each
   layout is built around) so they swap without the panel changing style.
------------------------------------------------------------------ */
const INK = "fill-tertiary";
const SOFT = "fill-tertiary/10";
const LIT = "fill-secondary";

function Bar({ x, y, w, h = 5, o = 1, lit = false }: { x: number; y: number; w: number; h?: number; o?: number; lit?: boolean }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} className={lit ? LIT : INK} opacity={o} />;
}

const PAGES: Record<Mockup, React.ReactNode> = {
  business: (
    <>
      <Bar x={22} y={36} w={30} o={0.8} />
      {[220, 244, 268].map((x) => <Bar key={x} x={x} y={37} w={18} h={3} o={0.35} />)}
      <Bar x={40} y={70} w={150} h={11} />
      <Bar x={40} y={87} w={110} h={11} />
      <Bar x={40} y={108} w={130} h={4} o={0.35} />
      <rect x={40} y={122} width={58} height={16} rx={8} className={LIT} />
      <rect x={196} y={64} width={86} height={76} rx={8} className={SOFT} />
      {[22, 120, 218].map((x) => (
        <g key={x}>
          <rect x={x} y={156} width={82} height={44} rx={6} className={SOFT} />
          <Bar x={x + 8} y={168} w={36} h={4} o={0.7} />
          <Bar x={x + 8} y={178} w={60} h={3} o={0.3} />
        </g>
      ))}
    </>
  ),
  corporate: (
    <>
      <Bar x={22} y={36} w={40} o={0.8} />
      {[170, 194, 218, 242, 266].map((x) => <Bar key={x} x={x} y={37} w={18} h={3} o={0.35} />)}
      <rect x={22} y={52} width={276} height={62} rx={6} className={INK} opacity={0.85} />
      <rect x={38} y={70} width={110} height={9} rx={4.5} className="fill-primary" />
      <rect x={38} y={85} width={80} height={4} rx={2} className="fill-primary" opacity={0.5} />
      <rect x={38} y={96} width={40} height={8} rx={4} className={LIT} />
      {[22, 92, 162, 232].map((x, i) => (
        <g key={x}>
          <Bar x={x + 4} y={128} w={30} h={10} lit={i === 0} o={i === 0 ? 1 : 0.8} />
          <Bar x={x + 4} y={144} w={50} h={3} o={0.3} />
        </g>
      ))}
      <Bar x={22} y={164} w={120} h={4} o={0.5} />
      <Bar x={22} y={174} w={130} h={3} o={0.25} />
      <Bar x={22} y={182} w={110} h={3} o={0.25} />
      <rect x={170} y={160} width={128} height={40} rx={6} className={SOFT} />
    </>
  ),
  ecommerce: (
    <>
      <Bar x={22} y={36} w={30} o={0.8} />
      <rect x={110} y={32} width={110} height={11} rx={5.5} className={SOFT} />
      <circle cx={288} cy={38} r={7} className={INK} opacity={0.8} />
      <circle cx={294} cy={32} r={4.5} className={LIT} />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const x = 22 + (i % 3) * 94;
        const y = 56 + Math.floor(i / 3) * 76;
        return (
          <g key={i}>
            <rect x={x} y={y} width={84} height={46} rx={6} className={SOFT} />
            <Bar x={x} y={y + 52} w={50} h={4} o={0.7} />
            <Bar x={x} y={y + 61} w={26} h={5} lit={i === 1} o={i === 1 ? 1 : 0.5} />
          </g>
        );
      })}
    </>
  ),
  shopify: (
    <>
      <Bar x={22} y={36} w={30} o={0.8} />
      <rect x={22} y={54} width={130} height={146} rx={8} className={SOFT} />
      {[0, 1, 2].map((i) => <rect key={i} x={30 + i * 26} y={178} width={20} height={14} rx={3} className={INK} opacity={i === 0 ? 0.6 : 0.2} />)}
      <Bar x={168} y={60} w={110} h={10} />
      <Bar x={168} y={78} w={40} h={7} lit />
      <Bar x={168} y={96} w={120} h={3} o={0.3} />
      <Bar x={168} y={104} w={100} h={3} o={0.3} />
      {[0, 1, 2, 3].map((i) => <circle key={i} cx={176 + i * 20} cy={126} r={7} className={i === 0 ? LIT : INK} opacity={i === 0 ? 1 : 0.25} />)}
      <rect x={168} y={146} width={130} height={18} rx={9} className={INK} />
      <rect x={168} y={170} width={130} height={18} rx={9} className="fill-none stroke-tertiary/40" strokeWidth={1.2} />
    </>
  ),
  wordpress: (
    <>
      <rect x={8} y={26} width={304} height={14} className={INK} opacity={0.85} />
      <circle cx={20} cy={33} r={4} className="fill-primary" opacity={0.7} />
      <rect x={32} y={31} width={40} height={4} rx={2} className="fill-primary" opacity={0.5} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={22} y={52 + i * 50} width={56} height={40} rx={5} className={i === 0 ? LIT : SOFT} opacity={i === 0 ? 0.85 : 1} />
          <Bar x={88} y={56 + i * 50} w={110} h={6} o={0.8} />
          <Bar x={88} y={68 + i * 50} w={120} h={3} o={0.3} />
          <Bar x={88} y={76 + i * 50} w={90} h={3} o={0.3} />
        </g>
      ))}
      <rect x={226} y={52} width={72} height={148} rx={6} className={SOFT} />
      {[64, 80, 96, 112].map((y) => <Bar key={y} x={236} y={y} w={48} h={3} o={0.4} />)}
      <rect x={236} y={130} width={52} height={14} rx={4} className="fill-none stroke-tertiary/35" strokeWidth={1.2} />
    </>
  ),
  landing: (
    <>
      <Bar x={140} y={36} w={40} o={0.6} />
      <Bar x={70} y={66} w={180} h={12} />
      <Bar x={95} y={84} w={130} h={12} />
      <Bar x={90} y={106} w={140} h={4} o={0.35} />
      <rect x={80} y={124} width={160} height={16} rx={8} className="fill-none stroke-tertiary/35" strokeWidth={1.2} />
      <rect x={110} y={150} width={100} height={20} rx={10} className={LIT} />
      <Bar x={120} y={182} w={80} h={3} o={0.25} />
      {[124, 140, 156, 172, 188].map((x) => <circle key={x} cx={x + 4} cy={196} r={2.5} className={INK} opacity={0.5} />)}
    </>
  ),
  redesign: (
    <>
      {/* before — cramped, dated */}
      <rect x={8} y={26} width={152} height={186} className="fill-tertiary/[0.07]" />
      <rect x={16} y={34} width={136} height={16} className={INK} opacity={0.3} />
      {[58, 66, 74, 82, 90, 98, 106].map((y) => <rect key={y} x={16} y={y} width={136} height={4} className={INK} opacity={0.18} />)}
      <rect x={16} y={116} width={64} height={50} className={INK} opacity={0.15} />
      <rect x={88} y={116} width={64} height={50} className={INK} opacity={0.15} />
      <rect x={16} y={174} width={30} height={10} className={INK} opacity={0.25} />
      {/* after — clean */}
      <Bar x={174} y={50} w={110} h={10} />
      <Bar x={174} y={66} w={80} h={10} />
      <Bar x={174} y={84} w={100} h={3} o={0.3} />
      <rect x={174} y={96} width={50} height={14} rx={7} className={LIT} />
      <rect x={174} y={124} width={124} height={76} rx={8} className={SOFT} />
      {/* comparison handle */}
      <rect x={159} y={26} width={2} height={186} className={LIT} />
      <circle cx={160} cy={119} r={9} className={LIT} />
      <path d="M156 119 l-2.5 0 M164 119 l2.5 0" className="stroke-primary" strokeWidth={2} strokeLinecap="round" />
    </>
  ),
  wedding: (
    <>
      {/* invitation card */}
      <rect x={90} y={34} width={140} height={170} rx={10} className={SOFT} />
      <path d="M100 74 C 110 48, 140 42, 160 44 C 180 42, 210 48, 220 74" className="fill-none stroke-tertiary/30" strokeWidth={1.2} />
      <circle cx={160} cy={62} r={12} className={LIT} />
      <path d="M160 67 l-4.5 -4.5 a2.6 2.6 0 0 1 4.5 -3 a2.6 2.6 0 0 1 4.5 3 Z" className="fill-primary" />
      <Bar x={112} y={86} w={96} h={9} />
      <Bar x={140} y={100} w={40} h={3} o={0.35} />
      <Bar x={118} y={110} w={84} h={9} />
      <Bar x={128} y={128} w={64} h={4} o={0.5} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={110 + i * 34} y={142} width={28} height={22} rx={4} className={INK} opacity={0.12 + i * 0.06} />
      ))}
      <rect x={120} y={176} width={80} height={16} rx={8} className={LIT} />
      {/* side details — venue & countdown */}
      <rect x={22} y={60} width={56} height={56} rx={6} className={SOFT} />
      <circle cx={50} cy={84} r={5} className={LIT} />
      <Bar x={30} y={104} w={40} h={3} o={0.4} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={244 + (i % 2) * 28} y={60 + Math.floor(i / 2) * 32} width={24} height={26} rx={4} className={SOFT} />
          <Bar x={249 + (i % 2) * 28} y={68 + Math.floor(i / 2) * 32} w={14} h={6} o={0.7} />
        </g>
      ))}
    </>
  ),
  custom: (
    <>
      <rect x={8} y={26} width={304} height={186} className={INK} opacity={0.92} />
      <circle cx={210} cy={112} r={52} className={LIT} opacity={0.9} />
      <circle cx={210} cy={112} r={70} className="fill-none stroke-primary/25" strokeWidth={1} />
      <circle cx={210} cy={112} r={88} className="fill-none stroke-primary/15" strokeWidth={1} />
      <circle cx={262} cy={60} r={6} className="fill-primary" opacity={0.8} />
      <rect x={30} y={70} width={100} height={11} rx={5.5} className="fill-primary" />
      <rect x={30} y={87} width={80} height={11} rx={5.5} className="fill-primary" opacity={0.6} />
      <rect x={30} y={110} width={90} height={3} rx={1.5} className="fill-primary" opacity={0.35} />
      <rect x={30} y={128} width={50} height={14} rx={7} className="fill-none stroke-primary/70" strokeWidth={1.2} />
      <path d="M30 186 C 70 170, 100 196, 140 176 S 200 150, 290 168" className="fill-none stroke-primary/40" strokeWidth={1.5} />
    </>
  ),
};

function SiteMockup({ type }: { type: Mockup }) {
  const dark = type === "custom";
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true">
      <rect x={8} y={8} width={304} height={204} rx={12} className="fill-surface stroke-tertiary/15" strokeWidth={1.2} />
      <path d="M8 26 V20 a12 12 0 0 1 12 -12 H300 a12 12 0 0 1 12 12 V26 Z" className={dark ? INK : "fill-tertiary/[0.06]"} />
      {[20, 30, 40].map((cx, i) => (
        <circle key={cx} cx={cx} cy={17} r={2.6} className={i === 0 ? LIT : dark ? "fill-primary/40" : "fill-tertiary/25"} />
      ))}
      <rect x={110} y={13} width={100} height={8} rx={4} className={dark ? "fill-primary/15" : "fill-tertiary/10"} />
      {PAGES[type]}
    </svg>
  );
}

export default function WebsiteTypes() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-site-type]");

      if (prefersReducedMotion()) {
        gsap.set(rows, { autoAlpha: 1 });
        return;
      }

      gsap.from(rows, {
        autoAlpha: 0,
        x: 40,
        duration: 0.9,
        stagger: 0.06,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="what-we-build"
      className="bg-pattern-web relative overflow-hidden px-[4vw] py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* left — heading, CTA and the mockup for whichever row is active */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">
            <span className="text-secondary">*</span> What we build
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,4.8vw,3.8rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.045em] text-tertiary">
            <AnimatedText text="One studio." onScroll />
            <br />
            <AnimatedText text="Many digital" onScroll />
            <br />
            <AnimatedText text="experiences." className="text-accent" onScroll />
          </h2>
          <button
            onClick={() => scrollToSection("apply")}
            className="btn btn-primary mt-8"
          >
            Start your website
            <span aria-hidden="true">↗</span>
          </button>

          {/* every mockup is mounted and cross-faded, so a hover never waits
              on a re-render to paint the next one */}
          <div className="relative mt-10 aspect-[320/220] w-full max-w-[520px]">
            {TYPES.map((type, i) => (
              <div
                key={type.mockup}
                aria-hidden={active !== i}
                className={`absolute inset-0 drop-shadow-[0_24px_40px_var(--shadow-warm)] transition-all duration-500 ease-out ${
                  active === i
                    ? "translate-y-0 scale-100 opacity-100"
                    : "pointer-events-none translate-y-3 scale-[0.97] opacity-0"
                }`}
              >
                <SiteMockup type={type.mockup} />
              </div>
            ))}
            <p className="absolute -bottom-8 left-0 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-tertiary/50">
              {pad(active + 1)} — {TYPES[active].name}
            </p>
          </div>
        </div>

        {/* right — the list */}
        <div className="relative">
          {/* ghost word for the active row */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 -right-[6vw] -translate-y-1/2 whitespace-nowrap font-display text-[clamp(4rem,10vw,9rem)] font-extrabold uppercase leading-none tracking-[-0.05em] text-tertiary/[0.04]"
          >
            {TYPES[active].ghost}
          </div>

          <ul className="relative">
            {TYPES.map((type, i) => {
              const on = active === i;

              return (
                <li key={type.name} data-site-type style={{ visibility: "hidden" }}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className={`group grid w-full grid-cols-[2.5rem_1fr_auto] gap-x-4 rounded-2xl border px-4 py-6 text-left transition-colors duration-300 sm:px-6 ${
                      on
                        ? "border-tertiary/10 bg-surface/80 shadow-[0_18px_40px_-24px_var(--shadow-warm-strong)]"
                        : "border-transparent"
                    }`}
                  >
                    <span
                      className={`pt-1 font-mono text-[12px] font-bold transition-colors ${
                        on ? "text-secondary" : "text-tertiary/40"
                      }`}
                    >
                      {pad(i + 1)}
                    </span>
                    <span>
                      <span
                        className={`block font-display text-[clamp(1.05rem,1.6vw,1.3rem)] font-extrabold uppercase tracking-[-0.02em] transition-colors ${
                          on ? "text-tertiary" : "text-tertiary/55"
                        }`}
                      >
                        {type.name}
                      </span>
                      <span
                        className={`mt-1.5 block max-w-[60ch] text-[13.5px] leading-relaxed transition-colors ${
                          on ? "text-tertiary/75" : "text-tertiary/45"
                        }`}
                      >
                        {type.desc}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`pt-1 text-lg transition-all duration-300 ${
                        on ? "translate-x-1 text-secondary" : "text-tertiary/30"
                      }`}
                    >
                      →
                    </span>
                  </button>
                  {/* separators sit between rows, hidden next to the raised one */}
                  {i < TYPES.length - 1 && (
                    <div
                      className={`mx-4 h-px bg-tertiary/10 transition-opacity sm:mx-6 ${
                        on || active === i + 1 ? "opacity-0" : "opacity-100"
                      }`}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
