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
  | "key";

const PATHS: Record<IconName, React.ReactNode> = {
  code: (
    <>
      <path d="m9 8-4 4 4 4" />
      <path d="m15 8 4 4-4 4" />
      <path d="M13.5 5.5 10.5 18.5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19h16" />
      <path d="M7 19v-6" />
      <path d="M12 19V6" />
      <path d="M17 19v-9" />
    </>
  ),
  cube: (
    <>
      <path d="M12 3.5 20 8v8l-8 4.5L4 16V8z" />
      <path d="m4 8 8 4.5L20 8" />
      <path d="M12 12.5v8" />
    </>
  ),
  megaphone: (
    <>
      <path d="M4 10v4a1 1 0 0 0 1 1h3l6 4V5L8 9H5a1 1 0 0 0-1 1z" />
      <path d="M18 9.5a3.4 3.4 0 0 1 0 5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 19 6v6c0 4.2-2.9 7.4-7 8.5-4.1-1.1-7-4.3-7-8.5V6z" />
      <path d="m9.2 12 2 2 3.6-3.8" />
    </>
  ),
  cloud: (
    <>
      <path d="M7.5 18h9.2a3.8 3.8 0 0 0 .5-7.6 5.4 5.4 0 0 0-10.3-1A4.3 4.3 0 0 0 7.5 18z" />
    </>
  ),
  web: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8" />
      <path d="M3.6 15h16.8" />
      <path d="M11.5 3a17 17 0 0 0 0 18" />
      <path d="M12.5 3a17 17 0 0 1 0 18" />
    </>
  ),
  cyber: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </>
  ),
  digital: (
    <>
      <rect width="18" height="14" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21h6" />
      <path d="M12 17v4" />
    </>
  ),
  lock: (
    <>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  terminal: (
    <>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </>
  ),
  cpu: (
    <>
      <rect width="12" height="12" x="6" y="6" rx="2" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </>
  ),
  zap: (
    <>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </>
  ),
  activity: (
    <>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </>
  ),
  check: (
    <>
      <polyline points="20 6 9 17 4 12" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  server: (
    <>
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </>
  ),
  refresh: (
    <>
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </>
  ),
  sliders: (
    <>
      <line x1="4" x2="4" y1="21" y2="14" />
      <line x1="4" x2="4" y1="10" y2="3" />
      <line x1="12" x2="12" y1="21" y2="12" />
      <line x1="12" x2="12" y1="8" y2="3" />
      <line x1="20" x2="20" y1="21" y2="16" />
      <line x1="20" x2="20" y1="12" y2="3" />
      <line x1="2" x2="6" y1="14" y2="14" />
      <line x1="10" x2="14" y1="8" y2="8" />
      <line x1="18" x2="22" y1="16" y2="16" />
    </>
  ),
  key: (
    <>
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3" />
    </>
  ),
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
      {PATHS[name]}
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

