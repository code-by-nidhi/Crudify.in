export type IconName =
  | "code"
  | "chart"
  | "cube"
  | "megaphone"
  | "shield"
  | "cloud"
  | "web"
  | "cyber"
  | "digital"
  | "lock"
  | "terminal"
  | "cpu"
  | "zap"
  | "activity"
  | "check"
  | "globe"
  | "server"
  | "refresh"
  | "sliders"
  | "key"
  | "social"
  | "search"
  | "pin"
  | "cart"
  | "palette"
  | "video"
  | "bot";

/** Each icon is one path: every shape in it is stroked with the same
 *  attributes, so merging them draws the same picture with a single DOM
 *  node instead of up to nine — the homepage renders well over a hundred. */
const PATHS: Record<IconName, string> = {
  code: "M9 8l-4 4 4 4M15 8l4 4-4 4M13.5 5.5 10.5 18.5",
  chart: "M4 19h16M7 19v-6M12 19V6M17 19v-9",
  cube: "M12 3.5 20 8v8l-8 4.5L4 16V8zM4 8l8 4.5L20 8M12 12.5v8",
  megaphone: "M4 10v4a1 1 0 0 0 1 1h3l6 4V5L8 9H5a1 1 0 0 0-1 1zM18 9.5a3.4 3.4 0 0 1 0 5",
  shield: "M12 3.5 19 6v6c0 4.2-2.9 7.4-7 8.5-4.1-1.1-7-4.3-7-8.5V6zM9.2 12l2 2 3.6-3.8",
  cloud: "M7.5 18h9.2a3.8 3.8 0 0 0 .5-7.6 5.4 5.4 0 0 0-10.3-1A4.3 4.3 0 0 0 7.5 18z",
  web: "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0M3.6 9h16.8M3.6 15h16.8M11.5 3a17 17 0 0 0 0 18M12.5 3a17 17 0 0 1 0 18",
  cyber: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 8v4M12 16h.01",
  digital: "M5 3h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2zM3 9h18M9 21h6M12 17v4",
  lock: "M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-7a2 2 0 0 1 2 -2zM7 11V7a5 5 0 0 1 10 0v4",
  terminal: "M4 17L10 11L4 5M12 19L20 19",
  cpu: "M8 6h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4",
  zap: "M13 2L3 14L12 14L11 22L21 10L12 10L13 2z",
  activity: "M22 12L18 12L15 21L9 3L6 12L2 12",
  check: "M20 6L9 17L4 12",
  globe: "M2 12a10 10 0 1 0 20 0a10 10 0 1 0 -20 0M2 12L22 12M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  server: "M4 2h16a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2zM4 14h16a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2v-4a2 2 0 0 1 2 -2zM6 6L6.01 6M6 18L6.01 18",
  refresh: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16M16 16h5v5",
  sliders: "M4 21L4 14M4 10L4 3M12 21L12 12M12 8L12 3M20 21L20 16M20 12L20 3M2 14L6 14M10 8L14 8M18 16L22 16",
  key: "M2 15.5a5.5 5.5 0 1 0 11 0a5.5 5.5 0 1 0 -11 0M21 2l-9.6 9.6M15.5 7.5l3 3",
  social: "M8.9 3h6.2a2.4 2.4 0 0 1 2.4 2.4v13.2a2.4 2.4 0 0 1 -2.4 2.4h-6.2a2.4 2.4 0 0 1 -2.4 -2.4v-13.2a2.4 2.4 0 0 1 2.4 -2.4zM10.5 17.5h3M12 7.4c-.9-1-2.6-.6-2.6.9 0 1.3 2.6 2.9 2.6 2.9s2.6-1.6 2.6-2.9c0-1.5-1.7-1.9-2.6-.9z",
  search: "M4.5 10.5a6 6 0 1 0 12 0a6 6 0 1 0 -12 0M15 15l5 5",
  pin: "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11zM9.6 10a2.4 2.4 0 1 0 4.8 0a2.4 2.4 0 1 0 -4.8 0",
  cart: "M3 4h2.2l2.2 10.4a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6.1M8.3 19.5a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0 -2.4 0M15.8 19.5a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0 -2.4 0",
  palette: "M12 3.5a8.5 8.5 0 0 0 0 17c1.3 0 1.9-.9 1.9-1.8 0-1.4-1.2-1.6-1.2-2.8 0-1 .8-1.6 1.8-1.6h2.2a3.8 3.8 0 0 0 3.8-3.8c0-3.9-3.8-7-8.5-7zM6.8 11a1 1 0 1 0 2 0a1 1 0 1 0 -2 0M9.5 7.4a1 1 0 1 0 2 0a1 1 0 1 0 -2 0M14 7.8a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
  video: "M5 6h9a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-9a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2zM16 10.5l5-3v9l-5-3",
  bot: "M7.5 8h9a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h-9a3 3 0 0 1 -3 -3v-5a3 3 0 0 1 3 -3zM12 8V4.5M11.1 3.8a0.9 0.9 0 1 0 1.8 0a0.9 0.9 0 1 0 -1.8 0M8.8 13a0.4 0.4 0 1 0 0.8 0a0.4 0.4 0 1 0 -0.8 0 M14.4 13a0.4 0.4 0 1 0 0.8 0a0.4 0.4 0 1 0 -0.8 0M2.5 12.5v2.5M21.5 12.5v2.5",
};

export function CourseIcon({
  name,
  className = "h-[22px] w-[22px]",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Technology marks — drawn in the same single-stroke language as the
   course icons above rather than dropped-in brand assets, so the whole
   set stays visually consistent at 16px.
------------------------------------------------------------------ */
export type TechName =
  | "autocad"
  | "solidworks"
  | "revit"
  | "python"
  | "react"
  | "nextjs"
  | "node"
  | "sql"
  | "powerbi"
  | "ml"
  | "aws"
  | "figma";

const TECH_PATHS: Record<TechName, React.ReactNode> = {
  // drafting compass
  autocad: (
    <>
      <path d="M12 3.2v3.4" />
      <path d="m12 6.6-4.6 13" />
      <path d="m12 6.6 4.6 13" />
      <path d="M8.6 16.2a7.6 7.6 0 0 0 6.8 0" />
    </>
  ),
  solidworks: (
    <>
      <path d="M12 3.4 20 8v8l-8 4.6L4 16V8z" />
      <path d="m4 8 8 4.6L20 8" />
      <path d="M12 12.6v8" />
    </>
  ),
  // elevation of a building
  revit: (
    <>
      <path d="M3.5 20.5h17" />
      <path d="M6 20.5V8.6L12 4l6 4.6v11.9" />
      <path d="M10 20.5V15h4v5.5" />
      <path d="M9.6 11h4.8" />
    </>
  ),
  // the two interlocking tabs
  python: (
    <>
      <path d="M12 3.4c-2.9 0-4.2.9-4.2 2.6v2.1h4.4v.9H6.1c-1.8 0-2.8 1.3-2.8 3.9s1 3.8 2.8 3.8h1.4v-2.4c0-1.9 1.3-3.1 3.3-3.1h3.5" />
      <path d="M12 20.6c2.9 0 4.2-.9 4.2-2.6v-2.1h-4.4v-.9h6.1c1.8 0 2.8-1.3 2.8-3.9s-1-3.8-2.8-3.8h-1.4v2.4c0 1.9-1.3 3.1-3.3 3.1H9.7" />
    </>
  ),
  react: (
    <>
      <circle cx="12" cy="12" r="1.9" />
      <ellipse cx="12" cy="12" rx="9.2" ry="3.6" />
      <ellipse
        cx="12"
        cy="12"
        rx="9.2"
        ry="3.6"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="9.2"
        ry="3.6"
        transform="rotate(120 12 12)"
      />
    </>
  ),
  nextjs: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M8.8 16V8l7 9.2" />
      <path d="M15.2 8v5.2" />
    </>
  ),
  node: (
    <>
      <path d="M12 3.4 19.6 8v8L12 20.6 4.4 16V8z" />
      <path d="M9.4 15.4V8.9l5.2 6.5V8.9" />
    </>
  ),
  sql: (
    <>
      <ellipse cx="12" cy="6.4" rx="7" ry="2.9" />
      <path d="M5 6.4v11.2c0 1.6 3.1 2.9 7 2.9s7-1.3 7-2.9V6.4" />
      <path d="M5 12c0 1.6 3.1 2.9 7 2.9s7-1.3 7-2.9" />
    </>
  ),
  powerbi: (
    <>
      <path d="M4 20.4h16" />
      <path d="M6.6 20.4v-5.6h3.2v5.6" />
      <path d="M14.2 20.4V8.6h3.2v11.8" />
      <path d="m6.6 10.6 4.8-4 3.4 2.6 4.2-5" />
    </>
  ),
  // a small feed-forward network
  ml: (
    <>
      <circle cx="5" cy="12" r="1.9" />
      <circle cx="12" cy="6.6" r="1.9" />
      <circle cx="12" cy="17.4" r="1.9" />
      <circle cx="19" cy="12" r="1.9" />
      <path d="m6.6 11 3.8-2.9M6.6 13l3.8 2.9M13.6 7.6l3.8 2.9M13.6 16.4l3.8-2.9" />
    </>
  ),
  aws: (
    <>
      <path d="M7.6 12.5h8.8a3.4 3.4 0 0 0 .4-6.8 5 5 0 0 0-9.6-.9 4 4 0 0 0 .4 7.7z" />
      <path d="M3.6 16.6c5.2 2.9 11.6 2.9 16.8 0" />
      <path d="M17.6 15.4h3v3" />
    </>
  ),
  figma: (
    <>
      <path d="M12 3H9.4a3 3 0 0 0 0 6H12z" />
      <path d="M12 3h2.6a3 3 0 0 1 0 6H12z" />
      <path d="M12 9H9.4a3 3 0 0 0 0 6H12z" />
      <path d="M12 15H9.4a3 3 0 1 0 2.6 3z" />
      <circle cx="14.6" cy="12" r="3" />
    </>
  ),
};

export function TechIcon({
  name,
  className = "h-4 w-4",
}: {
  name: TechName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {TECH_PATHS[name]}
    </svg>
  );
}

