import type { IconName } from "../Icons";

/** Homepage copy that more than one place reads — the sections themselves and
 *  the JSON-LD in app/page.tsx — so the schema never drifts from what is on
 *  the page. */

export const BRAND = "Crudify";

export const CITIES = [
  "Ludhiana",
  "Mohali",
  "Amritsar",
  "Jalandhar",
  "Patiala",
  "Bathinda",
  "Phagwara",
];

export type TierService = {
  name: string;
  desc: string;
  icon: IconName;
  /** Closest existing detail page. The per-service slugs in the content plan
   *  (/services/meta-ads-ludhiana etc.) do not exist yet — point these at
   *  them once they do. */
  href: string;
};

export type Tier = {
  id: "ai" | "human";
  badge: string;
  title: string;
  subtitle: string;
  bestFor: string;
  icon: IconName;
  cta: { label: string; href: string };
  services: TierService[];
};

export const TIERS: Tier[] = [
  {
    id: "ai",
    badge: "Tier 1",
    title: "AI-Powered Growth Services",
    subtitle: "Affordable & Fast",
    bestFor:
      "Startups, small businesses, and Punjab-based brands that want strong output without agency-level pricing.",
    icon: "cpu",
    cta: { label: "Explore AI-Powered Plans →", href: "/services/ai" },
    services: [
      {
        name: "AI Content Creation",
        desc: "Blogs, ad copy, product descriptions, and social captions generated and refined for your brand voice — delivered fast, priced low.",
        icon: "digital",
        href: "/services/ai",
      },
      {
        name: "AI Chatbots",
        desc: "24/7 WhatsApp & website chatbots that qualify leads and answer FAQs automatically — no missed customer ever again.",
        icon: "cpu",
        href: "/services/ai",
      },
      {
        name: "CRM Dashboards",
        desc: "Automated lead-tracking dashboards that show you exactly where every customer is in your sales funnel.",
        icon: "chart",
        href: "/services/ai",
      },
      {
        name: "AI-Assisted SEO",
        desc: "Technical SEO audits, keyword research, and on-page optimization powered by AI tools for faster results at lower cost.",
        icon: "globe",
        href: "/services/digital-marketing",
      },
      {
        name: "AI-Assisted Graphic Design",
        desc: "Social media creatives, banners, and posters designed using AI tools with human quality-check — quick turnaround for regular posting needs.",
        icon: "cube",
        href: "/services/digital-marketing",
      },
      {
        name: "AI-Assisted Video Editing",
        desc: "Reels, shorts, and promotional videos edited using AI-powered tools for quick, affordable, high-volume content needs.",
        icon: "activity",
        href: "/services/digital-marketing",
      },
      {
        name: "YouTube Video Editing (AI-Assisted)",
        desc: "Fast-turnaround YouTube edits — cuts, captions, thumbnails — ideal for creators and businesses publishing regularly.",
        icon: "zap",
        href: "/services/digital-marketing",
      },
    ],
  },
  {
    id: "human",
    badge: "Tier 2",
    title: "Human-Driven Premium Services",
    subtitle: "Dedicated Experts",
    bestFor:
      "Businesses ready to scale seriously and need dedicated strategists managing high-stakes, high-spend work.",
    icon: "megaphone",
    cta: { label: "Talk to a Growth Strategist →", href: "/#apply" },
    services: [
      {
        name: "Meta Ads Management",
        desc: "Dedicated media buyer running Facebook & Instagram campaigns with daily optimization — for businesses serious about lead generation and sales.",
        icon: "megaphone",
        href: "/services/digital-marketing",
      },
      {
        name: "Google Ads Management",
        desc: "Certified Google Ads specialist managing Search, Display, and Performance Max campaigns to capture high-intent buyers across Punjab.",
        icon: "chart",
        href: "/services/digital-marketing",
      },
      {
        name: "Dedicated Social Media Manager",
        desc: "A real person planning, creating, and managing your entire social presence — strategy, posting, engagement, community management.",
        icon: "activity",
        href: "/services/digital-marketing",
      },
      {
        name: "Website Editing & Development",
        desc: "Custom website builds and edits handled by our developers — fast, secure, conversion-focused, not templated.",
        icon: "code",
        href: "/services/web",
      },
      {
        name: "E-commerce Store Building",
        desc: "Full Shopify/WooCommerce store setup — product pages, payment gateways, and checkout flows built by e-commerce specialists.",
        icon: "web",
        href: "/services/web",
      },
      {
        name: "Cybersecurity & Resilience Shield",
        desc: "Human-led security audits, malware protection, and data backup systems to protect your business from real-world threats.",
        icon: "shield",
        href: "/services/cyber-security",
      },
    ],
  },
];

export const FAQS = [
  {
    q: "Who is the best marketing company in Punjab?",
    a: `${BRAND} is a Ludhiana-based marketing company serving Mohali, Amritsar, Jalandhar, and across Punjab, offering both AI-powered affordable services and human-managed premium services including Meta Ads, Google Ads, SEO, and cybersecurity.`,
  },
  {
    q: "How much do digital marketing services cost in Ludhiana?",
    a: "Costs vary by service tier — our AI-powered services (SEO, chatbots, content, design) start at lower price points for small businesses, while human-driven services like Meta Ads and Google Ads management are priced based on ad spend and campaign complexity. Contact us for a custom quote.",
  },
  {
    q: "Do you serve businesses outside Ludhiana?",
    a: "Yes — we serve businesses across Punjab including Mohali, Amritsar, Jalandhar, Patiala, Bathinda, and Phagwara, both remotely and on-site.",
  },
  {
    q: "What's the difference between your AI-powered and human-driven services?",
    a: "AI-powered services (content, chatbots, SEO, design, video editing) are faster and more affordable, ideal for regular ongoing needs. Human-driven services (Meta/Google Ads management, website development, e-commerce, cybersecurity) involve a dedicated specialist and are priced for businesses ready to scale seriously.",
  },
  {
    q: "Can I combine services from both tiers?",
    a: "Yes, most of our clients use a mix — for example, human-managed Google Ads paired with AI-powered content creation to keep campaigns running efficiently at a lower overall cost.",
  },
];
