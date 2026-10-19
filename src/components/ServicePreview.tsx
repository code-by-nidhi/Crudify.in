"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { CourseIcon, type IconName } from "./Icons";

/* ------------------------------------------------------------------
   Cursor-following service preview — a small card that trails the pointer
   over a list of services and swaps its illustration per row. Shared by the
   services page list and the home "With AI+ / Without AI" table.
------------------------------------------------------------------ */

export type ArtName =
  | "browser"
  | "growth"
  | "agent"
  | "shield"
  | "social"
  | "ads"
  | "search"
  | "map"
  | "cart"
  | "design"
  | "video"
  | "camera";

const CARD_WIDTH = 220;

/* Each art is drawn on the same 160×64 canvas in two inks — tertiary for the
   structure, secondary for the one moving or lit element — so the set reads
   as one family however different the subjects are. */
const INK = "fill-tertiary";
const LIT = "fill-secondary";
const LINE = "stroke-tertiary/30";

const ART: Record<ArtName, React.ReactNode> = {
  browser: (
    <>
      <rect x="24" y="8" width="112" height="50" rx="6" className="fill-none stroke-tertiary/40" strokeWidth="1.5" />
      <line x1="24" y1="18" x2="136" y2="18" className={LINE} strokeWidth="1.5" />
      <circle cx="31" cy="13" r="1.8" className={LIT} />
      <circle cx="37" cy="13" r="1.8" className={INK} opacity="0.4" />
      <circle cx="43" cy="13" r="1.8" className={INK} opacity="0.4" />
      <rect x="32" y="25" width="44" height="6" rx="2" className={INK} />
      <rect x="32" y="35" width="32" height="4" rx="2" className={INK} opacity="0.35" />
      <rect x="32" y="44" width="22" height="7" rx="3.5" className={LIT}>
        <animate attributeName="width" values="22;28;22" dur="2s" repeatCount="indefinite" />
      </rect>
      <rect x="86" y="25" width="42" height="26" rx="4" className={INK} opacity="0.12" />
    </>
  ),
  growth: (
    <>
      <polyline points="22,52 52,40 82,44 112,24 138,14" className="fill-none stroke-tertiary/35" strokeWidth="1.5" />
      {[22, 52, 82, 112].map((x, i) => (
        <circle key={x} cx={x} cy={[52, 40, 44, 24][i]} r="3.5" className={INK} />
      ))}
      <circle cx="138" cy="14" r="6" className={LIT}>
        <animate attributeName="r" values="5;7.5;5" dur="2.2s" repeatCount="indefinite" />
      </circle>
    </>
  ),
  agent: (
    <>
      <path d="M30 40 L80 22 L130 42 M30 40 L130 42" className="fill-none stroke-tertiary/25" strokeWidth="1.5" />
      <circle cx="30" cy="40" r="6" className={INK} />
      <circle cx="130" cy="42" r="6" className={INK} />
      <circle cx="80" cy="22" r="8" className={LIT}>
        <animate attributeName="r" values="7;9;7" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle r="2.5" className={LIT}>
        <animateMotion path="M30 40 L80 22 L130 42" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </>
  ),
  shield: (
    <>
      <path d="M80 6 L104 14 V32 C104 46 93 54 80 59 C67 54 56 46 56 32 V14 Z" className="fill-none stroke-tertiary/45" strokeWidth="1.5" />
      <rect x="72" y="30" width="16" height="13" rx="2.5" className={INK} />
      <path d="M75 30 V26 a5 5 0 0 1 10 0 V30" className="fill-none stroke-tertiary" strokeWidth="2" />
      <rect x="50" y="8" width="60" height="2" className={LIT} opacity="0.8">
        <animate attributeName="y" values="8;56;8" dur="2.6s" repeatCount="indefinite" />
      </rect>
    </>
  ),
  social: (
    <>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${26 + i * 38} 10)`}>
          <rect width="32" height="44" rx="5" className={INK} opacity={i === 1 ? 1 : 0.18} />
          <rect x="5" y="31" width="16" height="3" rx="1.5" className="fill-primary" opacity={i === 1 ? 0.7 : 0} />
        </g>
      ))}
      <path d="M80 26 c-3-4-9-2-8 2 c1 4 8 8 8 8 s7-4 8-8 c1-4-5-6-8-2z" className={LIT}>
        <animate attributeName="opacity" values="1;0.45;1" dur="1.6s" repeatCount="indefinite" />
      </path>
    </>
  ),
  ads: (
    <>
      <path d="M40 26 L74 14 V50 L40 38 Z" className={INK} />
      <rect x="30" y="26" width="12" height="12" rx="2" className={INK} />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${86 + i * 12} ${18 - i * 4} q${8 + i * 2} ${14 + i * 4} 0 ${28 + i * 8}`}
          className="fill-none stroke-secondary"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <animate attributeName="opacity" values="0;1;0" dur="1.8s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
        </path>
      ))}
    </>
  ),
  search: (
    <>
      <rect x="18" y="10" width="124" height="14" rx="7" className="fill-none stroke-tertiary/40" strokeWidth="1.5" />
      <circle cx="29" cy="17" r="3.5" className="fill-none stroke-secondary" strokeWidth="1.6" />
      <rect x="38" y="15" width="40" height="4" rx="2" className={INK} opacity="0.35" />
      {[30, 52, 74, 96, 118].map((x, i) => {
        const h = [10, 16, 13, 22, 28][i];
        return (
          <rect key={x} x={x} y={58 - h} width="12" height={h} rx="2" className={i === 4 ? LIT : INK} opacity={i === 4 ? 1 : 0.75}>
            {i === 4 && <animate attributeName="height" values="22;28;22" dur="2s" repeatCount="indefinite" />}
            {i === 4 && <animate attributeName="y" values="36;30;36" dur="2s" repeatCount="indefinite" />}
          </rect>
        );
      })}
    </>
  ),
  map: (
    <>
      <path d="M20 16 L58 8 L100 16 L140 8 V54 L100 60 L58 52 L20 60 Z" className="fill-tertiary/[0.06] stroke-tertiary/30" strokeWidth="1.5" />
      <line x1="58" y1="8" x2="58" y2="52" className={LINE} strokeWidth="1.2" />
      <line x1="100" y1="16" x2="100" y2="60" className={LINE} strokeWidth="1.2" />
      <ellipse cx="80" cy="46" rx="4" ry="1.5" className={INK} opacity="0.3">
        <animate attributeName="rx" values="4;14;4" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.35;0;0.35" dur="2s" repeatCount="indefinite" />
      </ellipse>
      <path d="M80 46 C72 36 70 32 70 27 a10 10 0 0 1 20 0 c0 5 -2 9 -10 19z" className={LIT} />
      <circle cx="80" cy="27" r="3.5" className="fill-primary" />
    </>
  ),
  cart: (
    <>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${22 + i * 40} 8)`}>
          <rect width="34" height="34" rx="5" className={INK} opacity={0.12 + i * 0.08} />
          <rect x="6" y="38" width="22" height="4" rx="2" className={INK} opacity="0.5" />
        </g>
      ))}
      <rect x="110" y="44" width="30" height="12" rx="6" className={LIT}>
        <animate attributeName="opacity" values="0.6;1;0.6" dur="1.6s" repeatCount="indefinite" />
      </rect>
      <path d="M118 47 l2 6 h8 l2-5" className="fill-none stroke-primary" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  design: (
    <>
      <circle cx="46" cy="34" r="18" className={INK} opacity="0.15" />
      <rect x="66" y="16" width="30" height="30" rx="4" className={INK} />
      <path d="M30 54 C 60 6, 100 62, 132 14" className="fill-none stroke-secondary" strokeWidth="2" strokeDasharray="140" strokeDashoffset="140">
        <animate attributeName="stroke-dashoffset" values="140;0;0;140" dur="3s" repeatCount="indefinite" />
      </path>
      <rect x="27" y="51" width="6" height="6" className="fill-surface stroke-tertiary" strokeWidth="1.2" />
      <rect x="129" y="11" width="6" height="6" className="fill-surface stroke-tertiary" strokeWidth="1.2" />
    </>
  ),
  video: (
    <>
      <rect x="30" y="6" width="100" height="36" rx="5" className={INK} />
      <path d="M74 16 L90 24 L74 32 Z" className={LIT} />
      <rect x="20" y="50" width="120" height="4" rx="2" className={INK} opacity="0.18" />
      <rect x="20" y="50" width="40" height="4" rx="2" className={LIT}>
        <animate attributeName="width" values="8;120" dur="3s" repeatCount="indefinite" />
      </rect>
    </>
  ),
  camera: (
    <>
      <rect x="38" y="16" width="84" height="42" rx="6" className={INK} />
      <rect x="62" y="9" width="24" height="9" rx="2" className={INK} />
      <circle cx="80" cy="37" r="14" className="fill-primary" />
      <circle cx="80" cy="37" r="9" className={LIT}>
        <animate attributeName="r" values="9;6;9" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="110" cy="24" r="2.5" className={LIT} />
    </>
  ),
};

export function ServiceArt({ name }: { name: ArtName }) {
  return (
    <svg viewBox="0 0 160 64" className="h-full w-full" aria-hidden="true">
      {ART[name]}
    </svg>
  );
}

export type PreviewItem = {
  icon: IconName;
  title: string;
  art: ArtName;
  tags: string[];
};

/** Drives one PreviewCard inside a positioned container. Put `containerRef`
 *  and `onMouseMove` on the container, call `show` from each row's
 *  mouseenter, and pass `cardRef` to the card. Destructure the result — the
 *  refs lint rule can't see through `preview.containerRef`. */
export function useServicePreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const follow = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  useGSAP(() => {
    const reduced = prefersReducedMotion();
    gsap.set(cardRef.current, { scale: 0.85 });
    // quickTo reuses one tween per axis, so the card can chase the cursor on
    // every mousemove without stacking up new tweens.
    follow.current = {
      x: gsap.quickTo(cardRef.current, "x", { duration: reduced ? 0 : 0.55, ease: "power3.out" }),
      y: gsap.quickTo(cardRef.current, "y", { duration: reduced ? 0 : 0.55, ease: "power3.out" }),
    };
  });

  function onMouseMove(e: React.MouseEvent) {
    if (!containerRef.current || !follow.current) return;
    const box = containerRef.current.getBoundingClientRect();
    // trail below-right of the cursor, but never past the container's right
    // edge — that would push the page into horizontal scroll
    const x = Math.min(e.clientX - box.left + 24, box.width - CARD_WIDTH);
    follow.current.x(x);
    follow.current.y(e.clientY - box.top - 40);
  }

  function show() {
    // Fine pointers only — on touch there is no hover to preview with.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    gsap.to(cardRef.current, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)" });
  }

  function hide() {
    gsap.to(cardRef.current, { autoAlpha: 0, scale: 0.85, duration: 0.25, ease: "power2.in" });
  }

  return { containerRef, cardRef, show, hide, onMouseMove };
}

export function PreviewCard({
  cardRef,
  item,
}: {
  cardRef: React.RefObject<HTMLDivElement | null>;
  item: PreviewItem | null;
}) {
  return (
    <div
      ref={cardRef}
      aria-hidden="true"
      style={{ visibility: "hidden", opacity: 0, width: CARD_WIDTH }}
      className="pointer-events-none absolute top-0 left-0 z-20 origin-top-left rounded-2xl border border-tertiary/10 bg-surface p-4 shadow-[0_24px_50px_-18px_var(--shadow-warm-strong)]"
    >
      {item && (
        <>
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-tertiary/12 text-tertiary/80">
              <CourseIcon name={item.icon} className="h-4 w-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase leading-tight tracking-wider text-tertiary">
              {item.title}
            </span>
          </div>
          {/* keyed so the SVG animations restart from frame one on each swap */}
          <div key={item.art} className="mt-3 h-[72px] rounded-xl bg-tertiary/[0.04] px-2 py-1">
            <ServiceArt name={item.art} />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-tertiary/[0.06] px-2 py-1 text-[9.5px] font-bold uppercase tracking-wider text-tertiary/65"
              >
                {tag}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
