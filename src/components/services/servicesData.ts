import type { IconName } from "../Icons";

export type ServiceItem = {
  name: string;
  desc: string;
};

export type ServiceOutcome = {
  title: string;
  body: string;
};

/** One column of the navbar mega menu. */
export type ServiceMenuGroup = {
  title: string;
  items: string[];
};

export type Service = {
  id: string;
  label: string;
  title: string;
  tag: string;
  desc: string;
  icon: IconName;
  items: ServiceItem[];
  /** Navbar mega menu — grouped columns shown when this service is hovered. */
  menu: ServiceMenuGroup[];
  stack: string[];
  /** Spans both bento columns. Set on the first and last tile so the grid
   *  closes evenly around the two half-width cards between them. */
  wide?: boolean;
  /** Detail page (/services/[slug]) content. The hero headline is split so the
   *  second half can animate in on the accent colour, as on the other heroes. */
  headline: { lead: string; accent: string };
  intro: string;
  outcomes: ServiceOutcome[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
};

export const SERVICES: Service[] = [
  {
    id: "web",
    label: "Web",
    title: "Web & Product Development",
    tag: "Everything You Ship Online",
    desc: "From a one-page invitation to a multi-tenant SaaS platform — built on the same modern stack, so it stays fast and maintainable as it grows.",
    icon: "code",
    items: [
      {
        name: "E-Commerce Websites",
        desc: "Storefronts wired to real payments, inventory and order tracking.",
      },
      {
        name: "Business Websites",
        desc: "Company sites built to load fast, rank well and convert enquiries.",
      },
      {
        name: "Dashboards",
        desc: "Live KPI and operations views pulled from your own data.",
      },
      {
        name: "SaaS Apps",
        desc: "Multi-tenant products with authentication, roles and billing.",
      },
      {
        name: "Landing Pages",
        desc: "Single-purpose pages built around one conversion goal.",
      },
      {
        name: "Digital Invitations",
        desc: "Shareable invite pages with event details and RSVP tracking.",
      },
      {
        name: "Digital Menus",
        desc: "QR menus you can update in seconds, without a reprint.",
      },
    ],
    menu: [
      {
        title: "Websites",
        items: [
          "Business Websites",
          "Corporate Websites",
          "E-Commerce Websites",
          "Shopify Stores",
          "WordPress Websites",
        ],
      },
      {
        title: "Pages & Experiences",
        items: [
          "Landing Pages",
          "Website Redesign",
          "Wedding Invitation Sites",
          "Custom Web Experiences",
        ],
      },
      {
        title: "Web Applications",
        items: ["SaaS Apps", "Dashboards", "Digital Menus"],
      },
    ],
    stack: ["Next.js", "React", "Node", "PostgreSQL"],
    wide: true,
    headline: { lead: "Everything you ship", accent: "on the web." },
    intro:
      "A storefront, a booking flow, an internal dashboard or a full SaaS product — built on one modern stack instead of a different toolkit per project. That means the site you launch this quarter can grow a login, a payment wall or an admin panel later without a rewrite.",
    outcomes: [
      {
        title: "Built to be handed over",
        body: "Repository, hosting and domains in your name from the first commit, with documentation your own developers can pick up.",
      },
      {
        title: "Fast on a mid-range phone",
        body: "Performance budgeted during the build rather than patched afterwards, and measured on the devices your customers actually use.",
      },
      {
        title: "Search and analytics wired in",
        body: "Server-rendered pages, structured data and GA4 events configured before launch, so the first week of traffic is already measurable.",
      },
    ],
    metaTitle: "Web & Product Development",
    metaDescription:
      "E-commerce and business websites, dashboards, SaaS applications, landing pages, digital invitations and QR menus — built on Next.js, React, Node and PostgreSQL.",
    keywords: [
      "web development company",
      "ecommerce website development",
      "saas app development",
      "custom dashboard development",
      "landing page design",
    ],
  },
  {
    id: "digital-marketing",
    label: "Marketing",
    title: "Digital Marketing",
    tag: "Reach, Content & Campaigns",
    desc: "Paid, organic and local — run against leads and revenue, with the creative produced in-house rather than outsourced.",
    icon: "megaphone",
    items: [
      {
        name: "Meta Ads",
        desc: "Facebook and Instagram campaigns, creative through to retargeting.",
      },
      {
        name: "Google Ads",
        desc: "Search, Display, Shopping and Performance Max campaigns.",
      },
      {
        name: "Google Business Profile",
        desc: "Listing setup, posts, reviews and local map visibility.",
      },
      {
        name: "Social Media Management",
        desc: "Content calendar, scheduled posting and community replies.",
      },
      {
        name: "Video Editing",
        desc: "Reels, shorts, ad cuts and long-form edits with captions.",
      },
      {
        name: "YouTube & Instagram",
        desc: "Channel setup, thumbnails, SEO and a consistent posting rhythm.",
      },
    ],
    menu: [
      {
        title: "Search Engine Optimization",
        items: [
          "SEO Services Overview",
          "On-Page SEO",
          "Off-Page SEO & Link Building",
          "Technical SEO Audit",
          "Local SEO",
        ],
      },
      {
        title: "Social Media Marketing",
        items: [
          "Social Media Strategy",
          "Facebook & Instagram Marketing",
          "Influencer Marketing",
        ],
      },
      {
        title: "Paid Advertising",
        items: [
          "Google Ads Management",
          "Meta Ads (Facebook & Instagram)",
          "YouTube Ads",
          "Display & Programmatic Ads",
        ],
      },
    ],
    stack: ["Meta Ads", "Google Ads", "GA4", "Business Profile"],
    headline: { lead: "Campaigns measured in", accent: "leads, not likes." },
    intro:
      "Paid, organic and local run as one plan rather than three disconnected retainers. Ads point at pages we can change, the creative is cut by the same team reading the numbers, and the reporting stops at the metric you are actually judged on.",
    outcomes: [
      {
        title: "Reported against revenue",
        body: "Spend, enquiries and cost per acquisition in a single monthly view — not a screenshot of impressions and reach.",
      },
      {
        title: "Creative produced in-house",
        body: "Copy, statics and video cut by the same team running the campaigns, so a losing ad is replaced in days rather than next quarter.",
      },
      {
        title: "Your accounts, your data",
        body: "Ad accounts, pixels and business profiles created under your ownership and left with you if we ever part ways.",
      },
    ],
    metaTitle: "Digital Marketing",
    metaDescription:
      "Meta and Google Ads, Google Business Profile, social media management, video editing and YouTube or Instagram growth — run against leads and revenue, with creative produced in-house.",
    keywords: [
      "digital marketing agency",
      "meta ads management",
      "google ads management",
      "google business profile optimisation",
      "social media management",
    ],
  },
  {
    id: "ai",
    label: "AI",
    title: "AI & Automation",
    tag: "Work That Runs Itself",
    desc: "Assistants and agents that handle the repetitive parts of the day — answering, sorting, updating and following up — inside the tools you already use.",
    icon: "cpu",
    items: [
      {
        name: "AI Agents",
        desc: "Agents that carry out routine tasks across your systems.",
      },
      {
        name: "AI Chatbots",
        desc: "Website and WhatsApp bots trained on your own content.",
      },
      {
        name: "Workflow Automation",
        desc: "CRM, inbox and spreadsheets connected into one pipeline.",
      },
    ],
    menu: [
      {
        title: "AI Products",
        items: [
          "AI Chatbots & Virtual Assistants",
          "Custom AI Agent Builder",
          "Voice Recognition & Speech AI",
          "AI-driven Automation Tools",
        ],
      },
      {
        title: "AI Analytics",
        items: [
          "Predictive Analytics & Forecasting",
          "Business Intelligence Dashboards",
          "Customer Behaviour Insights",
          "Marketing Automation AI",
        ],
      },
      {
        title: "Custom AI Development",
        items: [
          "Custom AI Software Development",
          "AI Integration Services",
          "AI Model Training & Fine-tuning",
          "AI Consultation & Strategy",
        ],
      },
    ],
    stack: ["Claude API", "Python", "n8n", "WhatsApp API"],
    headline: { lead: "Automation for the", accent: "work that repeats." },
    intro:
      "Most of the hours lost in a week go to answering the same question, copying the same row and chasing the same follow-up. We automate those one at a time — starting with the task that costs the most, and proving it in production before widening the scope.",
    outcomes: [
      {
        title: "Scoped to one workflow first",
        body: "We automate the task that costs the most hours today, measure what it saves, and only then extend it to the next one.",
      },
      {
        title: "Grounded in your own content",
        body: "Assistants answer from your documents, catalogue and policies, and hand over to a person when they are unsure rather than inventing an answer.",
      },
      {
        title: "Runs inside your existing tools",
        body: "CRM, inbox, spreadsheets and WhatsApp connected as they already are — no migration required before you see a result.",
      },
    ],
    metaTitle: "AI & Automation",
    metaDescription:
      "AI agents, website and WhatsApp chatbots trained on your own content, and workflow automation that connects your CRM, inbox and spreadsheets into one pipeline.",
    keywords: [
      "ai automation services",
      "ai agent development",
      "ai chatbot development",
      "whatsapp chatbot",
      "workflow automation",
    ],
  },
  {
    id: "cyber-security",
    label: "Cyber Security",
    title: "Cyber Security",
    tag: "Prevent, Detect, Respond",
    desc: "Find what an attacker would find first, watch what actually happens on your systems, and have a plan ready for the day something gets through.",
    icon: "shield",
    items: [
      {
        name: "Cyber Attack Prevention",
        desc: "Hardening, WAF rules, bot filtering and DDoS mitigation.",
      },
      {
        name: "Security Audit",
        desc: "Review of code, infrastructure, access and configuration.",
      },
      {
        name: "Log Management & Analysis",
        desc: "Centralised logging with alerting on unusual activity.",
      },
      {
        name: "Incident Management & Response",
        desc: "A written playbook to contain, recover and report an incident.",
      },
    ],
    menu: [
      {
        title: "Assess",
        items: ["Security Audit", "Vulnerability Assessment"],
      },
      {
        title: "Protect",
        items: ["Cyber Attack Prevention", "WAF & DDoS Mitigation"],
      },
      {
        title: "Monitor & Respond",
        items: ["Log Management & Analysis", "Incident Management & Response"],
      },
    ],
    stack: ["OWASP", "SIEM", "Cloudflare", "TLS 1.3"],
    wide: true,
    headline: { lead: "Find it before", accent: "someone else does." },
    intro:
      "Three things decide how a breach goes: what was exposed, how quickly it was noticed, and whether anyone knew what to do next. We work on all three — an audit of what an attacker would reach first, logging that surfaces the unusual, and a response plan written while nothing is on fire.",
    outcomes: [
      {
        title: "Findings ranked by exploitability",
        body: "A written report that separates what an attacker could use today from what merely fails a compliance checklist.",
      },
      {
        title: "Monitoring you can actually read",
        body: "Centralised logs with alerts tuned to your own traffic, so the ones that do fire are worth acting on.",
      },
      {
        title: "A rehearsed response plan",
        body: "Roles, contacts and containment steps agreed in writing and walked through in advance, not drafted during the incident.",
      },
    ],
    metaTitle: "Cyber Security",
    metaDescription:
      "Cyber attack prevention, security audits, centralised log management and analysis, and incident response playbooks — built on OWASP, SIEM tooling and Cloudflare.",
    keywords: [
      "cyber security services",
      "security audit",
      "vulnerability assessment",
      "log management and monitoring",
      "incident response plan",
    ],
  },
];

/** Canonical route for a service detail page. */
export function serviceHref(id: string) {
  return `/services/${id}`;
}

export function getService(slug: string) {
  return SERVICES.find((service) => service.id === slug);
}

/** Flat shape the navbar dropdown and the "other services" rail both read. */
export const SERVICE_NAV = SERVICES.map((service) => ({
  id: service.id,
  label: service.label,
  title: service.title,
  tag: service.tag,
  icon: service.icon,
  href: serviceHref(service.id),
  menu: service.menu,
}));

/** Sectors we run Google and Meta ad campaigns for. */
export const AD_INDUSTRIES = [
  "Real Estate",
  "Education & Coaching",
  "Healthcare & Clinics",
  "Ecommerce & D2C",
  "Restaurants & Food",
  "Fitness & Gyms",
  "Legal Services",
  "IT & Software",
  "Construction",
  "Travel & Hospitality",
  "Manufacturing",
  "Local Businesses",
];

/**
 * Navbar mega menu: the four services plus an industries entry, which shows
 * AD_INDUSTRIES as a grid instead of grouped columns.
 */
export const SERVICE_MENU: ((typeof SERVICE_NAV)[number] & {
  industries?: string[];
})[] = [
  ...SERVICE_NAV,
  {
    id: "industries",
    label: "Industries",
    title: "Industries We Run Ads For",
    tag: "Campaigns By Sector",
    icon: "globe",
    href: serviceHref("digital-marketing"),
    menu: [],
    industries: AD_INDUSTRIES,
  },
];
