import type { IconName } from "../Icons";
import type { ArtName } from "../ServicePreview";

/** Homepage copy that more than one place reads — the sections themselves and
 *  the JSON-LD in app/page.tsx — so the schema never drifts from what is on
 *  the page. */

export const BRAND = "CRUDIFY";

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

/* ------------------------------------------------------------------
   Homepage copy (CRUDIFY Homepage Content — final copy for SEO, AEO, GEO)
------------------------------------------------------------------ */

/** Phrases <KeywordText> highlights inside body copy. Longest phrases win, so
 *  "Google Maps ranking" is marked as one keyword rather than "Google Maps". */
export const KEYWORDS = [
  "digital marketing agency in Ludhiana",
  "digital growth agency in Ludhiana",
  "digital marketing packages",
  "digital marketing",
  "website development",
  "web and app development",
  "e-commerce development",
  "Shopify store development",
  "Shopify",
  "Google Maps ranking",
  "Google Maps",
  "AI agents",
  "AI automation",
  "social media management",
  "Meta and Google ads",
  "Meta ads",
  "local SEO",
  "cybersecurity",
  "Business Growth Booster",
  "With AI+",
  "Without AI",
  "Ludhiana",
];

export type ServiceVersion = "ai" | "custom";

export const VERSIONS: Record<
  ServiceVersion,
  { label: string; tagline: string; summary: string; icon: IconName }
> = {
  ai: {
    label: "With AI+",
    tagline: "Faster, affordable",
    summary:
      "AI handles the heavy lifting and our team reviews everything — faster delivery at a lower cost.",
    icon: "cpu",
  },
  custom: {
    label: "Without AI",
    tagline: "Handcrafted, premium",
    summary:
      "Fully handcrafted by our specialists, for brands that want a bespoke finish and deeper strategy.",
    icon: "sliders",
  },
};

export type HomeService = {
  name: string;
  icon: IconName;
  /** Illustration in the cursor-following preview card. */
  art: ArtName;
  ai: string;
  custom: string;
};

export const SERVICES: HomeService[] = [
  {
    name: "Social Media Management",
    icon: "activity",
    art: "social",
    ai: "AI-assisted content calendar, captions and scheduling",
    custom: "Custom strategy, original copy, hands-on community management",
  },
  {
    name: "FB & Insta Ads",
    icon: "megaphone",
    art: "ads",
    ai: "AI-generated creatives and copy variants, auto-optimised",
    custom: "Manual audience research, custom creatives, strategist-led optimisation",
  },
  {
    name: "Google & YouTube Ads",
    icon: "chart",
    art: "search",
    ai: "AI keyword and ad-copy testing at scale",
    custom: "Hand-built campaigns, manual bid and keyword control",
  },
  {
    name: "Google Maps Ranking",
    icon: "globe",
    art: "map",
    ai: "AI-written posts, review replies and profile optimisation",
    custom: "Manual local SEO, citation building and review strategy",
  },
  {
    name: "Website Building",
    icon: "code",
    art: "browser",
    ai: "Template-based, AI-written content, live in 1-2 weeks",
    custom: "Fully custom design and development, live in 4-8 weeks",
  },
  {
    name: "Ecommerce Store Development",
    icon: "web",
    art: "cart",
    ai: "Shopify on a proven theme, AI product descriptions",
    custom: "Custom-designed store, hand-written copy, secure custom checkout",
  },
  {
    name: "Graphic Design",
    icon: "cube",
    art: "design",
    ai: "AI-assisted creatives, fast turnaround",
    custom: "Original designs and brand kits by a designer",
  },
  {
    name: "Video Editing",
    icon: "zap",
    art: "video",
    ai: "AI-assisted cuts, captions and subtitles",
    custom: "Fully manual edit with custom motion and storytelling",
  },
  {
    name: "Shoot",
    icon: "digital",
    art: "camera",
    ai: "AI-assisted scripts and shot lists, quick shoot",
    custom: "Fully scripted, directed and produced shoot",
  },
  {
    name: "AI Agents",
    icon: "terminal",
    art: "agent",
    ai: "AI chatbots that answer, follow up and book 24/7",
    custom: "Rule-based bots and custom workflow automation, no AI model",
  },
];

export const WHY_US: {
  icon: IconName;
  label: string;
  title: string;
  body: string;
  tags: string[];
}[] = [
  {
    icon: "cube",
    label: "Full funnel",
    title: "One team, full funnel",
    body: "Ads, website, content and AI automation work together.",
    tags: ["Ads", "Website", "Content", "AI automation"],
  },
  {
    icon: "sliders",
    label: "Flexible",
    title: "Two ways to work",
    body: "Fast, affordable With AI+ packages, or fully handcrafted Without AI builds.",
    tags: ["With AI+", "Without AI"],
  },
  {
    icon: "shield",
    label: "Secure",
    title: "Security built in",
    body: "Most agencies skip it. We don't.",
    tags: ["Hardening", "Monitoring", "Response plan"],
  },
  {
    icon: "globe",
    label: "Reach",
    title: "Local plus global",
    body: "Built for Indian SMEs, ready for the Gulf, UK and US.",
    tags: ["India", "Gulf", "UK", "US"],
  },
  {
    icon: "chart",
    label: "Transparent",
    title: "Clear reporting",
    body: "You see what's working, and what isn't.",
    tags: ["Spend", "Enquiries", "Cost per lead"],
  },
];

/** TODO: set each `price` (e.g. "Rs 49,999") once confirmed. While it is
 *  null the table shows "Get a quote" instead of a number. */
export const BOOSTER = {
  rows: [
    {
      label: "Website",
      ai: "Template-based, AI-written content, up to 5 pages",
      custom: "Custom-designed, hand-written, up to 5 pages",
    },
    {
      label: "Meta ads",
      ai: "1 month setup and management, AI-generated creatives",
      custom: "1 month setup and management, custom creatives and strategy",
    },
    {
      label: "5 reel shoots",
      ai: "AI-assisted scripts, captions and editing",
      custom: "Scripted, directed and fully hand-edited",
    },
    { label: "Timeline", ai: "About 2-3 weeks", custom: "About 5-8 weeks" },
  ],
  price: { ai: null as string | null, custom: null as string | null },
};

export type CaseStudy = { client: string; result: string; icon: IconName };

/** TODO: real numbers only. The section shows an honest "coming soon" note
 *  while this is empty. Shape from the content plan:
 *    { client: "[Client / sector]", result: "Grew Google Maps calls by X% in Y months", icon: "globe" }
 *    { client: "[Client / sector]", result: "Launched Shopify store, X orders in first 30 days", icon: "web" }
 *    { client: "[Client / sector]", result: "Cut ad cost per lead by X%", icon: "megaphone" } */
export const CASE_STUDIES: CaseStudy[] = [];

/** Set once a case-studies page exists; "View all case studies" only renders
 *  when this is set. */
export const CASE_STUDIES_HREF: string | null = null;

export type Review = {
  quote: string;
  name: string;
  /** Country (or city) shown under the name. */
  location: string;
  /** Who they are, e.g. "Startup Founder". */
  role: string;
  /** The service they used, shown as a tag. */
  service?: string;
  /** Star rating out of 5, if they gave one. */
  rating?: number;
};

/** Client testimonials, shown in the slider under "Our Work". */
export const REVIEWS: Review[] = [
  {
    name: "Aarav Sharma",
    location: "India",
    role: "E-commerce Founder",
    service: "Meta Ads",
    rating: 5,
    quote:
      "Crudify helped us build a more structured advertising strategy for Facebook and Instagram. The creatives, audience targeting, and regular campaign reviews made it much easier to understand what was working.",
  },
  {
    name: "Emily Wilson",
    location: "United States",
    role: "Small Business Owner",
    service: "Google Ads",
    rating: 5,
    quote:
      "We wanted a clearer way to reach customers who were actively searching for our services. Crudify's proposed Google Ads strategy focused on relevant keywords, campaign structure, and tracking enquiries.",
  },
  {
    name: "Riya Patel",
    location: "India",
    role: "Startup Founder",
    service: "Website Development",
    rating: 5,
    quote:
      "We wanted a website that looked professional and was easy for customers to navigate. Crudify understood the brief and focused on a clean layout, mobile responsiveness, and a smoother user experience.",
  },
  {
    name: "Oliver Bennett",
    location: "United Kingdom",
    role: "Operations Manager",
    service: "CRM Development",
    rating: 5,
    quote:
      "Our team needed a better way to manage enquiries, track follow-ups, and organize customer information. Crudify's CRM-focused approach helped us define a more efficient workflow for our business.",
  },
  {
    name: "Karan Singh",
    location: "India",
    role: "Business Owner",
    service: "Cybersecurity",
    rating: 5,
    quote:
      "Website security was an important concern for our business. Crudify helped us focus on security reviews, identifying potential weaknesses, and prioritizing improvements to strengthen our digital setup.",
  },
  {
    name: "Sofia Chen",
    location: "Singapore",
    role: "Product Manager",
    service: "Custom Software",
    rating: 5,
    quote:
      "We needed a solution designed around our business requirements rather than a generic tool. Crudify's development approach emphasized functionality, clear requirements, and a system that could evolve with us.",
  },
  {
    name: "Ananya Mehta",
    location: "India",
    role: "D2C Brand Owner",
    service: "Meta and Google Ads",
    rating: 5,
    quote:
      "Managing multiple marketing channels can get complicated. Having a coordinated plan for Meta Ads and Google Ads made campaign goals, audience selection, and performance tracking easier to organize.",
  },
  {
    name: "James Mitchell",
    location: "Australia",
    role: "Consultant",
    service: "Website and CRM Integration",
    rating: 5,
    quote:
      "We were looking for a more connected customer journey, from website enquiries to follow-ups. Crudify's combined web and CRM concept addressed the workflow issues we wanted to solve.",
  },
  {
    name: "Priya Sharma",
    location: "India",
    role: "Retail Business Owner",
    service: "Digital Marketing",
    rating: 5,
    quote:
      "We wanted our brand to have a more consistent online presence. Crudify's approach brought together advertising, website planning, and digital strategy instead of treating each channel separately.",
  },
  {
    name: "Daniel Laurent",
    location: "France",
    role: "SaaS Founder",
    service: "Software Development",
    rating: 5,
    quote:
      "We needed a development partner who could understand the product vision and turn requirements into practical features. The focus on functionality, usability, and maintainable software matched what we were looking for.",
  },
  {
    name: "Noah Fischer",
    location: "Germany",
    role: "Business Director",
    service: "Cybersecurity and IT",
    rating: 5,
    quote:
      "We wanted a clearer picture of our website's security posture and potential risks. A structured security review and actionable recommendations are exactly the kind of practical support a growing business needs.",
  },
  {
    name: "Zara Khan",
    location: "United Arab Emirates",
    role: "E-commerce Manager",
    service: "CRM and Automation",
    rating: 5,
    quote:
      "We wanted fewer manual steps in managing incoming leads and customer follow-ups. A more organized CRM and automation workflow can make day-to-day operations easier as an online business grows.",
  },
];

/** TODO: the Google Business Profile URL, linked under the reviews. */
export const GOOGLE_BUSINESS_PROFILE_URL: string | null = null;

/** The blog index; articles themselves live in src/content/blog.ts. */
export const BLOG_HREF = "/blog";

/** Each answer leads with the direct answer, so search and AI tools can quote
 *  it. The FAQPage JSON-LD in app/page.tsx is built from this array. */
export const FAQS = [
  {
    q: `What does ${BRAND} do?`,
    a: `${BRAND} is a digital growth agency in Ludhiana offering social media management, Meta and Google ads, website and e-commerce development, Google Maps ranking, design, video, and AI agents.`,
  },
  {
    q: "What is the difference between With AI+ and Without AI?",
    a: "With AI+ uses AI to speed up work and lower the cost, with our team reviewing everything. Without AI is fully handcrafted by our specialists, with more custom strategy and a longer timeline.",
  },
  {
    q: "What is the Business Growth Booster?",
    a: "It is a package that includes a website, Meta ads and 5 reel shoots, built together so your content, ads and site work as one system. It is available in both With AI+ and Without AI versions.",
  },
  {
    q: "How much does digital marketing cost in India?",
    a: `It depends on scope. ${BRAND} offers affordable With AI+ packages for small businesses and custom Without AI plans for larger brands. Share your goals for a clear quote.`,
  },
  {
    q: "How long does it take to rank on Google Maps?",
    a: "Most local businesses see movement in 4 to 12 weeks, depending on competition, profile quality and reviews.",
  },
  {
    q: "Can you build a Shopify store for my business?",
    a: "Yes. We build and launch Shopify and custom e-commerce stores, including product setup, payments, SEO and security.",
  },
  {
    q: "What are AI agents, and can my business use them?",
    a: "AI agents are chatbots and automations that answer customer queries, follow up on leads and book appointments around the clock. Any business with repeat enquiries can use them.",
  },
  {
    q: "Do you work with businesses outside Ludhiana?",
    a: "Yes. We work with clients across India, and we are expanding to the Gulf, UK and US.",
  },
];
