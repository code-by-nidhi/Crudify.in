/**
 * The hero's marble run: glass tubes with maroon couplings, and dark marbles
 * travelling through them. Drawn as one SVG so it scales without assets, and
 * animated with SMIL <animateMotion> so the marbles keep rolling without any
 * per-frame JavaScript. The Hero pauses it under reduced motion.
 */

/** Main run — enters off the top edge and leaves off the bottom, so the
 *  marbles appear to come from and go somewhere beyond the frame. */
const RUN =
  "M250 -60 V110 Q250 170 310 170 H470 Q530 170 530 230 V320 Q530 380 470 380 H210 Q150 380 150 440 V500 Q150 560 210 560 H420 Q480 560 480 620 V800";

/** A second, fainter loop behind the first for depth. */
const BACK_RUN = "M700 470 H620 Q570 470 570 520 V640 Q570 690 520 690 H330 Q280 690 280 740 V820";

type Joint = { x: number; y: number; dir: "h" | "v"; cross?: boolean };

const JOINTS: Joint[] = [
  { x: 395, y: 170, dir: "h", cross: true },
  { x: 530, y: 275, dir: "v" },
  { x: 330, y: 380, dir: "h" },
  { x: 150, y: 470, dir: "v", cross: true },
  { x: 315, y: 560, dir: "h" },
  { x: 480, y: 690, dir: "v" },
];

const MARBLES = [0, 1, 2];
const LOOP_SECONDS = 11;

function Tube({ d, faint = false }: { d: string; faint?: boolean }) {
  return (
    <g opacity={faint ? 0.55 : 1}>
      <path d={d} className="stroke-tertiary" strokeOpacity={0.12} strokeWidth={46} fill="none" transform="translate(16 26)" filter="url(#pipe-blur)" />
      <path d={d} className="stroke-tertiary" strokeOpacity={0.16} strokeWidth={48} fill="none" strokeLinecap="round" />
      <path d={d} className="stroke-surface" strokeOpacity={0.85} strokeWidth={44} fill="none" strokeLinecap="round" />
      <path d={d} className="stroke-secondary" strokeOpacity={0.05} strokeWidth={28} fill="none" strokeLinecap="round" />
    </g>
  );
}

/** The glass face drawn over the marbles, so they read as inside the tube. */
function TubeFront({ d }: { d: string }) {
  return (
    <g pointerEvents="none">
      <path d={d} stroke="#fff" strokeOpacity={0.22} strokeWidth={44} fill="none" />
      <path d={d} stroke="#fff" strokeOpacity={0.9} strokeWidth={3} fill="none" strokeLinecap="round" transform="translate(-10 -10)" />
      <path d={d} className="stroke-tertiary" strokeOpacity={0.08} strokeWidth={1.5} fill="none" transform="translate(12 12)" />
    </g>
  );
}

function Coupling({ x, y, dir, cross }: Joint) {
  // A sleeve sits across the tube: tall on a horizontal run, wide on a vertical one.
  const across = dir === "h" ? { w: 34, h: 74 } : { w: 74, h: 34 };
  const along = dir === "h" ? { w: 74, h: 34 } : { w: 34, h: 74 };

  return (
    <g data-pipe-joint style={{ transformOrigin: `${x}px ${y}px`, transformBox: "view-box" }}>
      <rect x={x - across.w / 2 + 10} y={y - across.h / 2 + 18} width={across.w} height={across.h} rx={9} className="fill-tertiary" opacity={0.12} filter="url(#pipe-blur)" />
      {cross && (
        <rect x={x - along.w / 2} y={y - along.h / 2} width={along.w} height={along.h} rx={9} fill="url(#pipe-coupling)" />
      )}
      <rect x={x - across.w / 2} y={y - across.h / 2} width={across.w} height={across.h} rx={9} fill="url(#pipe-coupling)" />
      {/* bore of the sleeve, glimpsed at its ends */}
      {dir === "h" ? (
        <ellipse cx={x} cy={y - across.h / 2 + 7} rx={across.w / 2 - 5} ry={4} className="fill-contrast" opacity={0.7} />
      ) : (
        <ellipse cx={x - across.w / 2 + 7} cy={y} rx={4} ry={across.h / 2 - 5} className="fill-contrast" opacity={0.7} />
      )}
      <rect x={x - across.w / 2 + 4} y={y - across.h / 2 + 4} width={dir === "h" ? 5 : across.w - 8} height={dir === "h" ? across.h - 8 : 5} rx={2.5} fill="#fff" opacity={0.28} />
    </g>
  );
}

export default function HeroPipeline({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 620 760" preserveAspectRatio="xMidYMin meet" className={className} aria-hidden="true" data-pipe>
      <defs>
        <filter id="pipe-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <linearGradient id="pipe-coupling" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "color-mix(in srgb, var(--color-secondary) 70%, #fff)" }} />
          <stop offset="0.45" style={{ stopColor: "var(--color-secondary)" }} />
          <stop offset="1" style={{ stopColor: "var(--color-contrast)" }} />
        </linearGradient>
        <radialGradient id="pipe-marble" cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#8d8585" />
          <stop offset="0.35" style={{ stopColor: "var(--color-tertiary)" }} />
          <stop offset="1" style={{ stopColor: "var(--color-ink)" }} />
        </radialGradient>
        <radialGradient id="pipe-bead" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" style={{ stopColor: "color-mix(in srgb, var(--color-secondary) 55%, #fff)" }} />
          <stop offset="1" style={{ stopColor: "var(--color-contrast)" }} />
        </radialGradient>
        <path id="pipe-run" d={RUN} />
      </defs>

      {/* back layer */}
      <g data-pipe-depth="0.4">
        <Tube d={BACK_RUN} faint />
        <TubeFront d={BACK_RUN} />
      </g>

      {/* main run */}
      <g data-pipe-depth="1">
        <Tube d={RUN} />

        {MARBLES.map((i) => (
          <circle key={i} r={15} fill="url(#pipe-marble)">
            <animateMotion
              dur={`${LOOP_SECONDS}s`}
              begin={`${(-i * LOOP_SECONDS) / MARBLES.length}s`}
              repeatCount="indefinite"
              calcMode="paced"
            >
              <mpath href="#pipe-run" />
            </animateMotion>
          </circle>
        ))}

        <TubeFront d={RUN} />

        {JOINTS.map((joint) => (
          <Coupling key={`${joint.x}-${joint.y}`} {...joint} />
        ))}

        {/* the hopper the run drops out of */}
        <g data-pipe-joint style={{ transformOrigin: "250px 0px", transformBox: "view-box" }}>
          <rect x={185} y={-40} width={150} height={92} rx={18} className="fill-tertiary" opacity={0.12} filter="url(#pipe-blur)" transform="translate(14 22)" />
          <rect x={175} y={-40} width={150} height={88} rx={18} fill="url(#pipe-coupling)" />
          <rect x={187} y={-30} width={126} height={6} rx={3} fill="#fff" opacity={0.25} />
        </g>
      </g>

      {/* loose pieces floating in front */}
      <g data-pipe-depth="1.8">
        {/* standing cylinder */}
        <g>
          <ellipse cx={72} cy={300} rx={34} ry={10} className="fill-tertiary" opacity={0.1} filter="url(#pipe-blur)" />
          <rect x={44} y={212} width={56} height={84} rx={6} fill="url(#pipe-coupling)" />
          <ellipse cx={72} cy={212} rx={28} ry={9} className="fill-contrast" />
          <ellipse cx={72} cy={212} rx={20} ry={5.5} className="fill-tertiary" opacity={0.6} />
        </g>

        {/* small block */}
        <g>
          <rect x={56} y={640} width={66} height={56} rx={8} className="fill-tertiary" opacity={0.12} filter="url(#pipe-blur)" transform="translate(10 18)" />
          <rect x={52} y={636} width={66} height={52} rx={8} fill="url(#pipe-coupling)" />
          <circle cx={85} cy={652} r={9} className="fill-contrast" opacity={0.8} />
        </g>

        <circle cx={600} cy={455} r={11} fill="url(#pipe-bead)" />
        <circle cx={392} cy={470} r={7} fill="url(#pipe-bead)" opacity={0.85} />
      </g>
    </svg>
  );
}
