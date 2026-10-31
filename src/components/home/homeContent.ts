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
  {
    q: "Should I use Google Ads or Meta ads?",
    a: "Google Ads reach people already searching for what you sell, so they suit urgent, high-intent services. Meta ads on Facebook and Instagram create demand and suit visual products, offers and local brands. Many businesses use both, and we help you split the budget.",
  },
  {
    q: "Do you offer SEO services in Ludhiana?",
    a: "Yes. We offer local SEO and Google Maps ranking, on-page and technical SEO, and content that answers what your customers search for, in both With AI+ and Without AI versions.",
  },
  {
    q: "How do you report results?",
    a: "You get regular reports showing ad spend, enquiries, cost per lead and what we are changing next, written in plain language rather than jargon.",
  },
  {
    q: "Is ad spend included in your packages?",
    a: "No. Ad spend is paid to Meta or Google separately and is not part of our fee. Our fee covers strategy, creatives, setup and campaign management.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Yes. We redesign and edit existing websites, improving speed, mobile layout, SEO and enquiry forms while keeping what already works.",
  },
];

export type GuidePillar = {
  title: string;
  href: string;
  body: string;
  points: string[];
};

/** "What each service covers" — the long-form explainer under the services.
 *  Plain, always-visible copy (no scroll reveal), so search engines and AI
 *  assistants read the whole of it. Keep claims in step with SERVICES and
 *  FAQS above: same timelines, no figures we can't back. */
export const GUIDE = {
  title: "Digital Marketing, Web Development and AI Services in Ludhiana",
  intro: `${BRAND} brings the work most businesses split between three or four vendors into one team. Here is what each service covers, how a project runs, and where we work. Every service is available With AI+ for speed and value, or Without AI for a fully handcrafted build.`,
  pillars: [
    {
      title: "Digital marketing and paid ads",
      href: "/services/digital-marketing",
      body: "Digital marketing is how new customers find you before they find a competitor. We plan and run social media management, Meta ads on Facebook and Instagram, and Google and YouTube ads, and tie every campaign to one goal: calls, WhatsApp enquiries, form leads or online sales. Creatives, copy and audiences are tested continuously, and budget moves to whatever brings enquiries at the lowest cost.",
      points: [
        "Content calendars, captions and community management",
        "Meta ads for lead generation and e-commerce sales",
        "Google Search, Display, YouTube and Performance Max campaigns",
        "Graphic design, reel shoots and video editing",
      ],
    },
    {
      title: "Local SEO and Google Maps ranking",
      href: "/services/digital-marketing",
      body: "For most local businesses, the Google Maps listing brings in more calls than the website. We optimise your Google Business Profile, publish regular posts, reply to reviews, build consistent citations and fix the on-page local SEO that helps Google trust your location. Most businesses see movement in 4 to 12 weeks, depending on competition, profile quality and reviews.",
      points: [
        "Google Business Profile setup and optimisation",
        "Review strategy and review replies",
        "Local citations with consistent name, address and phone",
        "Location pages and on-page local SEO",
      ],
    },
    {
      title: "Website and e-commerce development",
      href: "/services/web",
      body: "Your website is where ads and search traffic turn into customers. We build fast, mobile-first business websites, landing pages and Shopify or WooCommerce stores, with clear calls to action, enquiry tracking and on-page SEO built in. With AI+ sites go live in about 1-2 weeks on a proven template; Without AI builds are custom designed and developed over 4-8 weeks.",
      points: [
        "Business websites and campaign landing pages",
        "Shopify store development and WooCommerce stores",
        "Payment gateways, product setup and checkout flows",
        "Speed, mobile and technical SEO checks before launch",
      ],
    },
    {
      title: "AI agents and automation",
      href: "/services/ai",
      body: "AI agents answer customer questions on WhatsApp and your website, qualify leads, follow up and book appointments around the clock. We connect them to a CRM dashboard, so every enquiry is tracked from the first message to the sale. Prefer not to use AI? We also build rule-based bots and workflow automation that follow fixed, approved scripts.",
      points: [
        "WhatsApp and website chatbots",
        "Lead qualification, follow-ups and appointment booking",
        "CRM dashboards that track every enquiry",
        "AI content creation reviewed by our team",
      ],
    },
    {
      title: "Cybersecurity for growing businesses",
      href: "/services/cyber-security",
      body: "A hacked website or a lost customer database can undo years of marketing. Every site and store we ship is hardened before launch, and we offer security audits, malware protection, backups and a response plan for businesses that hold customer data or take payments online.",
      points: [
        "Website and store hardening before launch",
        "Security audits and vulnerability reviews",
        "Malware protection and monitoring",
        "Backups and an incident response plan",
      ],
    },
  ] satisfies GuidePillar[],
  process: [
    {
      title: "Free growth review",
      body: "We look at your ads, website and Google Maps profile and show you where enquiries are being lost.",
    },
    {
      title: "A clear plan",
      body: "You get a plan with goals, timelines and a recommendation: With AI+, Without AI, or a mix of both.",
    },
    {
      title: "Build and launch",
      body: "One team builds the website, campaigns and content together, so every ad leads to a page made to convert.",
    },
    {
      title: "Report and improve",
      body: "Regular reports show spend, enquiries and cost per lead, and we shift effort to what is working.",
    },
  ],
  areas: `We are based in Ludhiana and work with businesses across Punjab, including ${CITIES.slice(1, -1).join(", ")} and ${CITIES[CITIES.length - 1]}, and with clients across India. Most of our work runs remotely over calls and WhatsApp, and we are expanding to the Gulf, UK and US.`,
};

/* ------------------------------------------------------------------
   Deeper homepage sections — server-rendered, so all of this copy is in the
   HTML that search engines and AI assistants read. Trust comes from being
   specific, not from numbers we can't back: no invented stats, clients or
   results. Add real ones to CASE_STUDIES above when they exist.
------------------------------------------------------------------ */

export const OUTCOMES = {
  title: "Marketing Measured in Enquiries, Not Likes",
  intro: `Likes and impressions are easy to buy. As a digital marketing agency in Ludhiana, ${BRAND} reports on the numbers that pay your bills: calls, WhatsApp enquiries, booked appointments and online sales. Every campaign, website and chatbot we build is set up to track them from day one.`,
  items: [
    {
      icon: "chart",
      title: "Cost per lead",
      body: "What each enquiry really costs you across Meta ads and Google Ads. We test audiences, creatives and keywords to bring it down month after month, and move budget to whatever works.",
    },
    {
      icon: "activity",
      title: "Calls and WhatsApp enquiries",
      body: "Click-to-call and WhatsApp clicks from your ads, website and Google Business Profile, tracked separately so you know which channel sends real customers.",
    },
    {
      icon: "pin",
      title: "Google Maps visibility",
      body: "Where your listing shows for “near me” searches, and the calls, direction requests and website visits it brings in.",
    },
    {
      icon: "cart",
      title: "Return on ad spend",
      body: "For e-commerce and Shopify stores: revenue from ads against what you spent, measured with proper conversion tracking.",
    },
    {
      icon: "web",
      title: "Website conversion rate",
      body: "The share of visitors who enquire or buy. Faster pages, clearer offers and stronger calls to action move it up.",
    },
    {
      icon: "bot",
      title: "Lead response time",
      body: "How quickly every enquiry gets an answer. AI agents and CRM follow-ups make sure no lead waits until the next morning.",
    },
  ] satisfies { icon: IconName; title: string; body: string }[],
  note: "You see all of it in a regular report written in plain language: what worked, what didn't, and what we will change next.",
};

export const INDUSTRIES = {
  title: "Digital Marketing for Every Kind of Punjab Business",
  intro: "Every industry buys differently. A clinic needs booked appointments, a manufacturer needs export enquiries and a restaurant needs footfall. We shape the ads, website and content around how your customers actually decide.",
  items: [
    {
      icon: "activity",
      name: "Clinics, hospitals and dentists",
      body: "Appointment-focused Google Ads, a fast clinic website and a Google Business Profile that wins “near me” searches, with patient reviews handled properly.",
    },
    {
      icon: "cube",
      name: "Real estate and builders",
      body: "Meta lead generation for projects and plots, landing pages with brochure downloads, and instant WhatsApp follow-ups so hot leads never go cold.",
    },
    {
      icon: "digital",
      name: "Coaching and IELTS institutes",
      body: "Admissions campaigns timed to each intake, course landing pages, and chatbots that answer fee and batch questions at any hour.",
    },
    {
      icon: "globe",
      name: "Immigration and travel consultants",
      body: "Trust-first websites, Google Ads on high-intent study-abroad and visa searches, and content that answers common questions before the first call.",
    },
    {
      icon: "sliders",
      name: "Manufacturers and exporters",
      body: "B2B websites, product catalogues and Google Ads that put Ludhiana's hosiery, auto-parts, cycle and machinery makers in front of buyers in India and abroad.",
    },
    {
      icon: "cart",
      name: "Retail, fashion and D2C brands",
      body: "Shopify stores, Instagram reels and Meta ads that turn scrollers into buyers, with catalogue sales and retargeting set up properly.",
    },
    {
      icon: "pin",
      name: "Restaurants, cafes and hotels",
      body: "Google Maps ranking, menu and booking pages, and reels that bring people through the door on weekends and festival seasons.",
    },
    {
      icon: "palette",
      name: "Salons, gyms and local services",
      body: "Local SEO, offer campaigns and automated booking reminders that keep your calendar full without chasing every customer by hand.",
    },
  ] satisfies { icon: IconName; name: string; body: string }[],
};

export const COMPARISON = {
  title: "One Team Instead of Juggling Freelancers and Agencies",
  intro: `Most businesses start with a freelancer, add an agency for ads, then hire a developer for the website. Here is how working with ${BRAND} compares.`,
  columns: [BRAND, "Freelancer", "Large agency"],
  /** One line under each contender's name, in column order. */
  taglines: [
    "One team for ads, web, content and security",
    "Cheap to start, stretched thin",
    "Polished, but pricey and slow to move",
  ],
  rows: [
    {
      label: "Ads, website, content and security",
      values: ["All under one team", "Usually one skill", "Often split across departments"],
    },
    {
      label: "Who you talk to",
      values: ["The people doing the work", "One person, when available", "An account manager"],
    },
    {
      label: "Fits your budget",
      values: ["With AI+ for lean budgets, Without AI for premium builds", "Low cost, limited scope", "High monthly retainers"],
    },
    {
      label: "Speed to launch",
      values: ["With AI+ websites live in about 1-2 weeks", "Depends on one person's schedule", "Long onboarding"],
    },
    {
      label: "Security",
      values: ["Built into every site and store", "Rarely included", "Usually sold separately"],
    },
    {
      label: "Reporting",
      values: ["Spend, enquiries and cost per lead in plain language", "Varies", "Detailed, often jargon-heavy"],
    },
  ],
};

export const CITY_PAGES = {
  title: "Digital Marketing Services Across Punjab",
  intro: `${BRAND} is a digital marketing company in Ludhiana working with businesses in every major city of Punjab. Most projects run remotely over calls and WhatsApp, so where you are never slows the work down.`,
  items: [
    {
      city: "Ludhiana",
      body: "Our home base. Websites, Google Maps ranking and B2B lead generation for the city's manufacturers, traders, clinics and retailers.",
    },
    {
      city: "Mohali",
      body: "Startups, IT firms and real estate projects across the Tricity, where Google Ads and sharp landing pages carry most of the growth.",
    },
    {
      city: "Amritsar",
      body: "Hotels, restaurants and handicraft sellers serving a steady stream of visitors, where Google Maps listings and reviews drive footfall.",
    },
    {
      city: "Jalandhar",
      body: "Sports-goods makers, exporters and education consultants who need product catalogues, e-commerce and international ad targeting.",
    },
    {
      city: "Patiala",
      body: "Schools, coaching institutes, clinics and local retailers growing with local SEO, social media management and admissions campaigns.",
    },
    {
      city: "Bathinda",
      body: "Healthcare, education and retail businesses across the Malwa region, reaching customers through local search and Meta ads.",
    },
    {
      city: "Phagwara",
      body: "Businesses near a large university campus and a strong NRI community, using social media, ads and websites to reach students and families abroad.",
    },
  ],
};

/** TODO: confirm every tool here is one the team actually uses; remove any
 *  that are not. */
export const PLATFORMS = {
  title: "Built on the Platforms Your Customers Already Use",
  intro: "No lock-in to obscure tools. We work in the platforms that run digital marketing, web development and automation in India, so everything we build stays easy to manage and hand over.",
  groups: [
    {
      name: "Advertising",
      tools: ["Meta Ads Manager", "Google Ads", "YouTube Ads", "Performance Max", "Meta Pixel and Conversions API"],
    },
    {
      name: "Search and analytics",
      tools: ["Google Business Profile", "Google Search Console", "Google Analytics 4", "Google Tag Manager", "Looker Studio"],
    },
    {
      name: "Websites and stores",
      tools: ["Shopify", "WooCommerce", "WordPress", "Next.js", "Razorpay and UPI payments"],
    },
    {
      name: "AI and automation",
      tools: ["WhatsApp Business API", "AI chatbots", "CRM dashboards", "Workflow automation"],
    },
    {
      name: "Creative",
      tools: ["Figma", "Canva", "Adobe Premiere Pro", "CapCut"],
    },
  ],
};

/** Plain-English definitions — the kind of short, quotable answers AI
 *  assistants lift. Also published as a DefinedTermSet in app/page.tsx. */
export const GLOSSARY = {
  title: "Digital Marketing Terms, in Plain English",
  intro: "Agencies love jargon. Here is what the words in your proposal and your monthly report actually mean.",
  terms: [
    {
      term: "SEO (search engine optimisation)",
      definition: "Improving your website so it ranks higher in Google's unpaid results. It covers technical fixes, useful content and links from other sites.",
    },
    {
      term: "Local SEO",
      definition: "SEO for searches with a place in them, like “dentist in Ludhiana” or “near me”. It leans heavily on your Google Business Profile, reviews and consistent business details.",
    },
    {
      term: "Google Business Profile",
      definition: "Your free listing on Google Search and Maps, with your address, hours, photos, reviews and a call button. It used to be called Google My Business.",
    },
    {
      term: "PPC (pay-per-click)",
      definition: "Advertising where you pay when someone clicks your ad. Google Search ads work this way; Meta ads can be bought per click or per thousand impressions.",
    },
    {
      term: "CPL (cost per lead)",
      definition: "Ad spend divided by the number of enquiries it brought in. The clearest single measure of whether a lead generation campaign is working.",
    },
    {
      term: "ROAS (return on ad spend)",
      definition: "Revenue from ads divided by what you spent on them. A ROAS of 4 means ₹4 back for every ₹1 of ad spend.",
    },
    {
      term: "Performance Max",
      definition: "A Google Ads campaign type that uses automation to run your ads across Search, YouTube, Display, Gmail, Maps and Discover from a single campaign.",
    },
    {
      term: "Retargeting",
      definition: "Showing ads to people who already visited your website or engaged with your page, so they come back to enquire or buy.",
    },
    {
      term: "Conversion rate",
      definition: "The percentage of visitors who do what you want them to: fill a form, call, message on WhatsApp or buy.",
    },
    {
      term: "AI agent",
      definition: "Software that uses an AI model to hold a conversation and take actions, such as answering questions on WhatsApp, qualifying a lead or booking an appointment.",
    },
    {
      term: "AEO (answer engine optimisation)",
      definition: "Writing and structuring content so AI assistants and Google's AI Overviews can quote it as the answer to a question.",
    },
  ],
};
