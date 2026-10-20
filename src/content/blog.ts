import type { IconName } from "@/components/Icons";

/* ------------------------------------------------------------------
   Blog content

   Every article is plain data so the page, the home-page slider, the
   sitemap, llms.txt and the JSON-LD are all built from one source.

   Inline text supports two bits of markup:
     **bold**            → <strong>
     [label](/path)      → internal or external link
------------------------------------------------------------------ */

export type Block =
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; caption: string; head: string[]; rows: string[][] }
  | { type: "callout"; title: string; text: string };

export type Section = { id: string; heading: string; blocks: Block[] };

export type Post = {
  slug: string;
  /** On-page H1 and card title. */
  title: string;
  /** <title> tag, kept under ~60 characters. */
  metaTitle: string;
  /** Meta description, ~150–160 characters. */
  description: string;
  category: string;
  icon: IconName;
  image: string;
  imageAlt: string;
  /** ISO dates. */
  publishedAt: string;
  updatedAt: string;
  keywords: string[];
  /** The direct answer, two or three sentences, shown first on the page so
   *  search snippets and AI answer engines can quote it as-is. */
  quickAnswer: string;
  takeaways: string[];
  sections: Section[];
  faqs: { q: string; a: string }[];
  /** The service page this article leads into. */
  service: { label: string; href: string };
};

export const BLOG_AUTHOR = "CRUDIFY Team";

export const POSTS: Post[] = [
  /* ---------------------------------------------------------------- */
  {
    slug: "how-to-rank-on-google-maps",
    title: "How to Rank on Google Maps in 2026: A Step-by-Step Guide",
    metaTitle: "How to Rank on Google Maps in 2026 (Step-by-Step)",
    description:
      "A practical, step-by-step guide to ranking your business on Google Maps in 2026 — Google Business Profile setup, categories, reviews, photos and local SEO.",
    category: "Local SEO",
    icon: "globe",
    image: "/blog/google-maps.jpg",
    imageAlt: "A world map pinned with location markers",
    publishedAt: "2026-10-20",
    updatedAt: "2026-10-20",
    keywords: [
      "how to rank on Google Maps",
      "Google Maps ranking",
      "Google Business Profile optimization",
      "local SEO India",
      "Google Maps ranking Ludhiana",
    ],
    quickAnswer:
      "Google ranks local businesses on Maps by three factors: relevance (how well your profile matches the search), distance (how close you are to the searcher) and prominence (how well known and well reviewed you are). To rank higher, fully complete and verify your Google Business Profile, pick the most accurate primary category, earn steady genuine reviews, keep your name, address and phone identical everywhere, and back it up with a fast local landing page on your website.",
    takeaways: [
      "Google uses relevance, distance and prominence to rank Maps results — you can influence two of the three.",
      "Your primary category is the single most important profile setting. Choose the one that describes what you are, not everything you do.",
      "A steady flow of genuine reviews, with replies, matters more than a burst of reviews in one week.",
      "Never stuff keywords into your business name — it breaks Google's guidelines and can get the profile suspended.",
      "Track calls, direction requests and website clicks in your profile's Performance tab, not just your position.",
    ],
    sections: [
      {
        id: "how-google-maps-ranks",
        heading: "How Google decides who ranks on Maps",
        blocks: [
          {
            type: "p",
            text: "Google's own documentation says local results are based mainly on **relevance**, **distance** and **prominence**. Relevance is how well your profile matches what someone searched. Distance is how far you are from the searcher, or from the location in their search. Prominence is how well known your business is — reviews, ratings, mentions across the web and your website's own search strength all feed into it.",
          },
          {
            type: "p",
            text: "You cannot move your shop closer to every customer, so the work is in relevance and prominence. Everything in this guide improves one of those two.",
          },
        ],
      },
      {
        id: "step-1-claim-and-verify",
        heading: "Step 1: Claim and verify your Google Business Profile",
        blocks: [
          {
            type: "p",
            text: "Search for your business on Google Maps. If a listing already exists, claim it; if not, create one at business.google.com. Verification can be by video, phone, SMS, email or postcard, depending on what Google offers your listing. An unverified profile will not rank reliably, so finish this before anything else.",
          },
          {
            type: "callout",
            title: "Service-area businesses",
            text: "If you visit customers (plumbers, cleaners, tutors who travel), hide your address and set a service area instead. Showing a home address you don't serve customers from is against Google's guidelines.",
          },
        ],
      },
      {
        id: "step-2-categories-and-details",
        heading: "Step 2: Choose the right categories and fill in every field",
        blocks: [
          {
            type: "p",
            text: "Your **primary category** tells Google what you are, and it carries more weight than any other setting. A dental clinic should be \"Dentist\", not \"Health\". Add secondary categories only for things you genuinely offer.",
          },
          {
            type: "ul",
            items: [
              "**Name:** your real-world business name exactly as it appears on your signboard. No added keywords or city names.",
              "**Address and phone:** identical to your website and every directory listing — this consistency is often called NAP (name, address, phone).",
              "**Hours:** including holiday hours, so Google doesn't show you as open when you're closed.",
              "**Services or products:** list each one with a short description in plain language customers would search for.",
              "**Description:** 750 characters on what you do, who you serve and where. Write it for people, not for keywords.",
              "**Attributes:** wheelchair access, online appointments, languages spoken — anything relevant.",
            ],
          },
        ],
      },
      {
        id: "step-3-reviews",
        heading: "Step 3: Build a steady stream of genuine reviews",
        blocks: [
          {
            type: "p",
            text: "Reviews are the strongest prominence signal you control. Ask every satisfied customer, every time — at the counter, on WhatsApp after delivery, or on the invoice with a QR code linking to your review form.",
          },
          {
            type: "ul",
            items: [
              "Reply to every review, positive or negative, within a few days. A calm, specific reply to a bad review reassures future customers more than silence.",
              "Ask customers to mention what they bought or which service they used — natural mentions of your services help relevance.",
              "Never buy reviews, offer discounts in exchange for them, or post reviews for yourself. Google removes them and can restrict the profile.",
            ],
          },
        ],
      },
      {
        id: "step-4-photos-and-posts",
        heading: "Step 4: Add photos and post updates regularly",
        blocks: [
          {
            type: "p",
            text: "Profiles with real photos look active and trustworthy. Upload your storefront (so people recognise it on arrival), interior, team, products and finished work. Add new photos every month rather than fifty on day one.",
          },
          {
            type: "p",
            text: "Use **Google Posts** for offers, new products and events. Posts keep the profile fresh and give searchers another reason to call.",
          },
        ],
      },
      {
        id: "step-5-website-and-citations",
        heading: "Step 5: Back your profile up with your website and citations",
        blocks: [
          {
            type: "p",
            text: "Link your profile to a fast, mobile-friendly page on your own website that names your city, lists your services, shows the same name, address and phone, and embeds your map. Adding LocalBusiness structured data to that page helps search engines connect the two.",
          },
          {
            type: "p",
            text: "List your business on the directories your customers actually use — in India that often means Justdial, IndiaMART, Sulekha and industry-specific portals — with exactly the same details. Inconsistent listings make Google less sure which information is correct.",
          },
        ],
      },
      {
        id: "step-6-measure",
        heading: "Step 6: Measure what matters",
        blocks: [
          {
            type: "p",
            text: "Your position for one keyword changes depending on where the searcher stands, so don't judge progress by a single search from your own phone. Open the **Performance** section of your profile and track calls, direction requests, website clicks and bookings month over month. Those are the numbers that turn into customers.",
          },
          {
            type: "table",
            caption: "What to track and why",
            head: ["Metric", "Where to find it", "What it tells you"],
            rows: [
              ["Calls", "Profile → Performance", "Direct enquiries from Maps and Search"],
              ["Direction requests", "Profile → Performance", "People planning to visit"],
              ["Website clicks", "Profile → Performance", "Interest that needs your site to convert"],
              ["Searches for your services", "Profile → Performance", "Whether you're showing for the right terms"],
            ],
          },
        ],
      },
      {
        id: "common-mistakes",
        heading: "Common mistakes that hold businesses back",
        blocks: [
          {
            type: "ul",
            items: [
              "Adding keywords to the business name, such as \"Best Dentist Ludhiana\".",
              "Choosing a broad primary category instead of the most specific accurate one.",
              "Different phone numbers or address spellings across the website and directories.",
              "Ignoring negative reviews, or replying defensively.",
              "Setting it up once and never touching it again.",
            ],
          },
          {
            type: "p",
            text: "Want it done for you? Our [Google Business Profile service](/services/digital-marketing) covers setup, optimisation, review strategy and monthly reporting.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How long does it take to rank on Google Maps?",
        a: "It depends on your category, competition and how complete your profile was to begin with. Fixing basic profile issues can show results within weeks; building prominence through reviews and citations is an ongoing effort over months.",
      },
      {
        q: "Is a Google Business Profile free?",
        a: "Yes. Creating, verifying and managing a Google Business Profile is free. Paid Local Services or Google Ads placements are separate and optional.",
      },
      {
        q: "Do I need a website to rank on Google Maps?",
        a: "You can appear without one, but a fast local landing page with matching business details strengthens relevance and prominence, and gives visitors who click through somewhere to convert.",
      },
      {
        q: "Can I put my city name in my business name?",
        a: "Only if it is genuinely part of your registered, real-world business name. Adding keywords or locations that aren't part of your real name breaks Google's guidelines and risks suspension.",
      },
    ],
    service: { label: "Google Maps Ranking", href: "/services/digital-marketing" },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "shopify-vs-custom-website",
    title: "Shopify vs Custom Website: Which Is Right for Your Business?",
    metaTitle: "Shopify vs Custom Website: Which Should You Choose?",
    description:
      "Shopify or a custom-built website? Compare cost, speed, flexibility, fees and ownership to choose the right e-commerce platform for your business in India.",
    category: "Websites",
    icon: "web",
    image: "/blog/shopify-vs-custom.jpg",
    imageAlt: "A customer paying by card at a shop counter",
    publishedAt: "2026-10-20",
    updatedAt: "2026-10-20",
    keywords: [
      "Shopify vs custom website",
      "Shopify or custom ecommerce",
      "ecommerce website development India",
      "Shopify store development",
      "custom website cost",
    ],
    quickAnswer:
      "Choose Shopify if you sell standard products, want to launch in weeks and are happy paying a monthly subscription plus app fees in exchange for a managed platform. Choose a custom website if your business has workflows, pricing, integrations or a customer experience that off-the-shelf templates can't handle, and you want full ownership of your code and data.",
    takeaways: [
      "Shopify wins on speed to launch, built-in hosting and an app for almost every common feature.",
      "Custom builds win on flexibility, unique workflows, deep integrations and full ownership.",
      "Shopify's real cost is subscription + paid apps + theme + transaction fees, not just the plan price.",
      "A custom site costs more upfront and you're responsible for hosting, updates and security.",
      "Many businesses start on Shopify and move to custom once their processes outgrow it.",
    ],
    sections: [
      {
        id: "the-short-version",
        heading: "The short version",
        blocks: [
          {
            type: "table",
            caption: "Shopify vs custom website at a glance",
            head: ["", "Shopify", "Custom website"],
            rows: [
              ["Time to launch", "Days to a few weeks", "Several weeks to months"],
              ["Upfront cost", "Lower", "Higher"],
              ["Ongoing cost", "Monthly plan + apps + fees", "Hosting + maintenance"],
              ["Flexibility", "Within Shopify's rules and apps", "Anything you can specify"],
              ["Hosting & security", "Managed by Shopify", "Your (or your agency's) responsibility"],
              ["Ownership", "You rent the platform", "You own the code and data"],
              ["Best for", "Standard catalogues, fast launches", "Unique workflows, integrations, scale"],
            ],
          },
        ],
      },
      {
        id: "when-shopify-is-right",
        heading: "When Shopify is the right choice",
        blocks: [
          {
            type: "p",
            text: "Shopify is a hosted e-commerce platform: you pay a monthly subscription and get the store, checkout, hosting and security handled for you. For most product businesses starting online, it's the fastest sensible route.",
          },
          {
            type: "ul",
            items: [
              "You sell physical or digital products with standard options — sizes, colours, variants.",
              "You want to be live and taking orders in weeks, not months.",
              "You don't have, or don't want, a developer on call for updates.",
              "Your needs are covered by Shopify's app store: reviews, WhatsApp chat, COD rules, shipping integrations.",
            ],
          },
          {
            type: "callout",
            title: "Count the full cost",
            text: "Budget for the plan, any paid theme, every monthly app subscription and payment or transaction fees. In India most stores use third-party payment gateways, and Shopify may add its own transaction fee on top depending on your plan — check Shopify's current pricing page before you decide.",
          },
        ],
      },
      {
        id: "when-custom-is-right",
        heading: "When a custom website is the right choice",
        blocks: [
          {
            type: "p",
            text: "A custom website is built specifically for your business — for example on the MERN stack (MongoDB, Express, React, Node.js) — so it can do exactly what you need instead of what a template allows.",
          },
          {
            type: "ul",
            items: [
              "Your pricing is complex: quotes, B2B tiers, custom configurations, subscriptions with unusual rules.",
              "You need deep integration with your ERP, inventory, CRM or accounting software.",
              "You're building something that isn't a standard shop: booking, marketplaces, dashboards, portals.",
              "You're paying for so many apps that the monthly bill and site speed are both suffering.",
              "You want to own your code and data outright, with no platform lock-in.",
            ],
          },
          {
            type: "p",
            text: "The trade-off is responsibility: hosting, updates, backups and security are now yours. That's why we attach a security pass to every custom build — see our [cybersecurity services](/services/cyber-security).",
          },
        ],
      },
      {
        id: "how-to-decide",
        heading: "How to decide in five questions",
        blocks: [
          {
            type: "ol",
            items: [
              "**Can you describe your checkout in one sentence?** If yes, Shopify will probably handle it.",
              "**How soon do you need to sell?** Under a month points strongly to Shopify.",
              "**What will apps cost you every month?** Add them up — if they rival a custom build's maintenance cost, reconsider.",
              "**Which systems must the site talk to?** Several in-house tools usually means custom.",
              "**Where will you be in two years?** If you expect complex growth, design for it now or plan a migration.",
            ],
          },
        ],
      },
      {
        id: "the-middle-path",
        heading: "The middle path: start on Shopify, go custom later",
        blocks: [
          {
            type: "p",
            text: "There's no rule that you must choose forever. Launching on Shopify lets you prove demand cheaply; when your processes outgrow it, a custom build can replace it with your products, customers and order history migrated across. Plan your product data and URLs carefully from day one and that move is far less painful.",
          },
          {
            type: "p",
            text: "We build both. Explore our [website and e-commerce development](/services/web) options, or ask us which fits your business.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Is Shopify cheaper than a custom website?",
        a: "Upfront, almost always. Over several years it depends on how many paid apps and fees you add; a store relying on many apps can cost as much per year as maintaining a custom site.",
      },
      {
        q: "Is a custom website better for SEO than Shopify?",
        a: "Not automatically. Both can rank well. Custom builds give more control over URLs, page speed and structured data, while Shopify handles the basics well out of the box.",
      },
      {
        q: "Can I move from Shopify to a custom website later?",
        a: "Yes. Products, customers and orders can be exported and migrated. Setting up redirects from old URLs to new ones protects your search rankings during the move.",
      },
      {
        q: "How long does a custom e-commerce website take to build?",
        a: "It depends on scope. A focused custom store typically takes several weeks to a few months, compared with days to weeks for a Shopify store using an existing theme.",
      },
    ],
    service: { label: "Website & E-commerce", href: "/services/web" },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "meta-ads-budget-for-indian-smes",
    title: "How Much Should an Indian SME Spend on Meta Ads?",
    metaTitle: "Meta Ads Budget for Indian SMEs: How Much to Spend",
    description:
      "How much should a small business in India spend on Facebook and Instagram ads? A simple way to set your Meta Ads budget from your cost per lead and goals.",
    category: "Paid Ads",
    icon: "megaphone",
    image: "/blog/meta-ads-budget.jpg",
    imageAlt: "An analytics dashboard showing campaign performance charts",
    publishedAt: "2026-10-20",
    updatedAt: "2026-10-20",
    keywords: [
      "Meta Ads budget India",
      "Facebook ads budget for small business",
      "Instagram ads cost India",
      "how much to spend on Facebook ads",
      "Meta Ads agency Punjab",
    ],
    quickAnswer:
      "There is no single right number. Work backwards: decide how many leads or sales you need a month, estimate your cost per lead or sale, and multiply. Then make sure each ad set gets enough budget to exit Meta's learning phase — Meta's guidance is roughly 50 optimisation events within 7 days. Start with a test budget for 2–4 weeks, measure the real cost per result, and scale what works.",
    takeaways: [
      "Set your budget from goals and cost per result, not from what a competitor spends.",
      "Meta's learning phase needs around 50 optimisation events per ad set in 7 days to stabilise.",
      "Fewer ad sets with enough budget beat many ad sets starved of budget.",
      "Run a 2–4 week test, then scale winners gradually instead of doubling overnight.",
      "Track leads and sales in your own records, not just the numbers in Ads Manager.",
    ],
    sections: [
      {
        id: "start-from-your-goal",
        heading: "Start from your goal, not a random number",
        blocks: [
          {
            type: "p",
            text: "The most common budgeting mistake is picking a figure that \"feels affordable\" and hoping it works. Instead, start from what the ads need to achieve and work backwards.",
          },
          {
            type: "ol",
            items: [
              "**Decide the result you're paying for** — a lead form, a WhatsApp conversation, a call or an online purchase.",
              "**Set a monthly target** — for example, how many new enquiries your team can actually handle.",
              "**Estimate your cost per result** — from past campaigns if you have them, otherwise from a short test.",
              "**Multiply** — target results × cost per result = monthly budget.",
            ],
          },
        ],
      },
      {
        id: "worked-example",
        heading: "A worked example",
        blocks: [
          {
            type: "p",
            text: "Suppose a coaching institute wants 100 enquiries a month, and a test campaign shows each enquiry costing around ₹150. The starting monthly budget is 100 × ₹150 = **₹15,000**, or about ₹500 a day. These numbers are illustrative — your cost per lead depends on your city, audience, offer and creative.",
          },
          {
            type: "p",
            text: "Now check whether it's worth it. If 1 in 10 enquiries becomes a student paying ₹20,000, those 100 enquiries bring about 10 students and ₹2,00,000 in fees for ₹15,000 of ad spend. If the maths works, scale; if it doesn't, fix the offer, landing page or follow-up before spending more.",
          },
        ],
      },
      {
        id: "the-learning-phase",
        heading: "Budget enough to get through the learning phase",
        blocks: [
          {
            type: "p",
            text: "When you launch or significantly edit an ad set, Meta's delivery system enters a **learning phase** while it figures out who to show your ads to. Meta's guidance is that an ad set needs roughly **50 optimisation events within 7 days** to exit it. Until then, results are less stable and usually more expensive.",
          },
          {
            type: "callout",
            title: "Quick check",
            text: "Weekly budget ÷ expected cost per result ≈ results per week. If that number is far below 50, either combine ad sets, increase budget, or optimise for an earlier event (such as leads instead of purchases).",
          },
        ],
      },
      {
        id: "starting-ranges",
        heading: "Sensible starting points by goal",
        blocks: [
          {
            type: "p",
            text: "These are starting points for a first test, not industry benchmarks. Adjust them to your own cost per result once you have real data.",
          },
          {
            type: "table",
            caption: "Illustrative test budgets for a first campaign",
            head: ["Goal", "Optimise for", "Test approach"],
            rows: [
              ["Local awareness", "Reach", "A small daily budget focused on a tight radius around your business"],
              ["Enquiries", "Leads or WhatsApp messages", "Enough daily budget for several leads a day across 1–2 ad sets"],
              ["Online sales", "Purchases", "Start on add-to-cart or leads if purchases are too few to exit learning"],
              ["Retargeting", "Conversions", "A smaller budget aimed at recent site visitors and engagers"],
            ],
          },
        ],
      },
      {
        id: "how-to-scale",
        heading: "How to scale without wasting money",
        blocks: [
          {
            type: "ul",
            items: [
              "Run your test for 2–4 weeks before judging — a few days is rarely enough data.",
              "Increase budgets on winning ad sets gradually rather than doubling overnight, which can restart learning.",
              "Refresh creative regularly; the same ad shown too often gets more expensive.",
              "Keep audiences broad enough for Meta to optimise, especially on smaller budgets.",
              "Follow up every lead quickly — a fast reply often matters more than a cheaper lead.",
            ],
          },
        ],
      },
      {
        id: "measure-real-results",
        heading: "Measure real results, not just platform numbers",
        blocks: [
          {
            type: "p",
            text: "Ads Manager reports clicks and leads; your business runs on customers and revenue. Tag every enquiry by source — form, call, WhatsApp — and check monthly which spend produced which paying customers. That's the number to budget from next month.",
          },
          {
            type: "p",
            text: "We set up tracking before a campaign goes live and report spend, enquiries and cost per lead every month. See our [Meta and Google Ads services](/services/digital-marketing).",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "What is the minimum budget for Meta Ads in India?",
        a: "Meta allows very small daily budgets, but a budget that technically runs isn't the same as one that produces useful data. Budget enough for each ad set to generate a meaningful number of results per week.",
      },
      {
        q: "Is ad spend included in an agency's fee?",
        a: "Usually not. Ad spend is paid directly to Meta, while the agency fee covers strategy, creative, setup and management. At CRUDIFY, ad spend paid to Meta is separate from our packages.",
      },
      {
        q: "Should I boost posts or use Ads Manager?",
        a: "Boosting is quick but offers limited targeting and objectives. Ads Manager gives full control over objectives, audiences, placements and tracking, which matters once you're spending regularly.",
      },
      {
        q: "How long before Meta Ads show results?",
        a: "Ads can deliver leads within days, but give a new campaign 2–4 weeks to exit the learning phase and produce reliable cost-per-result data before making big decisions.",
      },
    ],
    service: { label: "Meta & Google Ads", href: "/services/digital-marketing" },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "what-are-ai-agents",
    title: "What Are AI Agents? A Simple Guide for Business Owners",
    metaTitle: "What Are AI Agents? A Simple Guide for Businesses",
    description:
      "What AI agents are, how they differ from chatbots and automation, and practical ways small businesses can use them for leads, bookings and follow-ups.",
    category: "AI & Automation",
    icon: "cpu",
    image: "/blog/ai-agents.jpg",
    imageAlt: "Illuminated letters A and I on a blue digital background",
    publishedAt: "2026-10-20",
    updatedAt: "2026-10-20",
    keywords: [
      "what are AI agents",
      "AI agents for small business",
      "AI chatbot vs AI agent",
      "business automation India",
      "WhatsApp AI agent",
    ],
    quickAnswer:
      "An AI agent is software that uses a large language model to understand a goal, decide the steps to reach it, and take actions using your tools — such as replying on WhatsApp, booking a slot in your calendar or updating your CRM. Unlike a scripted chatbot, it can handle questions it wasn't explicitly programmed for; unlike simple automation, it can make judgement calls within limits you set.",
    takeaways: [
      "AI agents combine understanding (a language model) with action (connections to your tools).",
      "Chatbots follow scripts, automations follow fixed rules, agents decide within guardrails.",
      "The best first use cases are repetitive and high-volume: lead replies, FAQs, bookings, follow-ups.",
      "Agents can make mistakes, so give them clear limits and a way to hand over to a human.",
      "Customer data handled by an agent must follow India's Digital Personal Data Protection Act, 2023.",
    ],
    sections: [
      {
        id: "ai-agents-in-plain-english",
        heading: "AI agents in plain English",
        blocks: [
          {
            type: "p",
            text: "Think of an AI agent as a digital assistant with two abilities. First, it **understands** messages written in everyday language — in English, Hindi or Punjabi. Second, it can **act**: look up an answer in your price list, check your calendar, send a message or create a record in your CRM.",
          },
          {
            type: "p",
            text: "You give it a goal (\"qualify new enquiries and book a call with interested ones\"), the tools it may use, and the rules it must follow. It works out the steps for each conversation.",
          },
        ],
      },
      {
        id: "agents-vs-chatbots-vs-automation",
        heading: "AI agents vs chatbots vs automation",
        blocks: [
          {
            type: "table",
            caption: "How the three compare",
            head: ["", "Rule-based chatbot", "Workflow automation", "AI agent"],
            rows: [
              ["How it works", "Follows a fixed script of buttons and replies", "Runs set steps when a trigger happens", "Understands the request and decides next steps"],
              ["Handles unexpected questions", "No", "No", "Yes, within its knowledge and rules"],
              ["Takes actions in other tools", "Rarely", "Yes, fixed actions", "Yes, chosen per situation"],
              ["Best for", "Simple menus", "Predictable, repeatable tasks", "Varied conversations and judgement calls"],
            ],
          },
          {
            type: "p",
            text: "In practice the strongest setups combine them: automation handles the predictable plumbing, and an agent handles the conversations in between.",
          },
        ],
      },
      {
        id: "practical-uses",
        heading: "Practical ways a small business can use AI agents",
        blocks: [
          {
            type: "ul",
            items: [
              "**Instant lead replies** — answer website and WhatsApp enquiries in seconds, including after hours, and ask qualifying questions.",
              "**FAQ answering from your own content** — prices, timings, locations and policies, answered from documents you approve.",
              "**Appointment booking** — offer available slots, confirm, and send reminders.",
              "**Follow-ups** — chase quotes that went quiet, politely and on schedule.",
              "**CRM updates** — log each conversation and tag leads by source and interest automatically.",
              "**Internal reports** — summarise the week's enquiries, bookings and common questions for the owner.",
            ],
          },
        ],
      },
      {
        id: "limits-and-risks",
        heading: "Limits and risks to plan for",
        blocks: [
          {
            type: "ul",
            items: [
              "**Agents can be wrong.** Language models sometimes produce confident but incorrect answers. Restrict them to your approved content and test them before launch.",
              "**Set clear boundaries.** Decide what an agent may never do — quote custom prices, promise refunds, give medical or legal advice — and hand those over to a person.",
              "**Always offer a human.** Customers should be able to reach your team easily.",
              "**Protect customer data.** Collect only what you need, store it securely, and follow India's Digital Personal Data Protection Act, 2023.",
            ],
          },
          {
            type: "callout",
            title: "Security matters here too",
            text: "An agent connected to your CRM or inbox is a new entry point into your systems. Review its permissions as carefully as you would a new employee's access.",
          },
        ],
      },
      {
        id: "how-to-start",
        heading: "How to get started without a big project",
        blocks: [
          {
            type: "ol",
            items: [
              "**Pick one workflow** that is repetitive and costs you time or leads — usually first replies to enquiries.",
              "**Write down the rules** your best team member follows for it.",
              "**Gather the knowledge** the agent needs: FAQs, price list, service details.",
              "**Launch with a human in the loop**, reviewing conversations for the first few weeks.",
              "**Measure** response time, booked calls and leads handled, then expand to the next workflow.",
            ],
          },
          {
            type: "p",
            text: "We design, build and secure AI agents and CRM automations for businesses in India and abroad. See our [AI agents and automation services](/services/ai).",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Is an AI agent the same as ChatGPT?",
        a: "Not exactly. ChatGPT is a general assistant. A business AI agent typically uses a similar language model but is limited to your content, connected to your tools, and given specific goals and rules.",
      },
      {
        q: "Can an AI agent reply on WhatsApp?",
        a: "Yes. Through the WhatsApp Business Platform, an agent can answer enquiries, ask qualifying questions and book appointments, with a handover to your team when needed.",
      },
      {
        q: "Will AI agents replace my staff?",
        a: "For most small businesses, agents take over repetitive first replies and admin so staff can spend more time on sales, service and complex customer needs.",
      },
      {
        q: "Are AI agents safe for customer data?",
        a: "They can be, if built with limited permissions, secure storage and clear data policies, and if they comply with India's Digital Personal Data Protection Act, 2023.",
      },
    ],
    service: { label: "AI Agents & Automation", href: "/services/ai" },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "with-ai-or-without-ai-marketing",
    title: "With AI or Without AI: Which Marketing Package Fits Your Business?",
    metaTitle: "With AI or Without AI: Which Package Fits You?",
    description:
      "Compare CRUDIFY's With AI+ and Without AI marketing packages — speed, cost, customisation and who each suits — and how to choose or combine them.",
    category: "Strategy",
    icon: "sliders",
    image: "/blog/ai-or-not.jpg",
    imageAlt: "A person working on a laptop while holding a smartphone",
    publishedAt: "2026-10-20",
    updatedAt: "2026-10-20",
    keywords: [
      "AI marketing package",
      "AI vs custom marketing",
      "digital marketing packages India",
      "affordable marketing for small business",
      "CRUDIFY packages",
    ],
    quickAnswer:
      "Choose With AI+ if you want to launch fast at a lower cost — AI handles the heavy lifting on templates, content and creatives, and our team reviews everything. Choose Without AI if your brand needs a fully custom design, hand-written content and a deeper strategy. Many businesses mix the two: a custom website with AI-assisted ad creatives, for example.",
    takeaways: [
      "With AI+ is faster and more affordable; Without AI is fully handcrafted and more bespoke.",
      "Both versions are reviewed by our team — AI is a tool, not a replacement for judgement.",
      "As a guide, the Business Growth Booster takes about 2–3 weeks With AI+ and about 5–8 weeks Without AI.",
      "Security is included on both, not sold as an upgrade.",
      "You can mix versions service by service.",
    ],
    sections: [
      {
        id: "what-the-two-versions-mean",
        heading: "What \"With AI+\" and \"Without AI\" actually mean",
        blocks: [
          {
            type: "p",
            text: "Every CRUDIFY service comes in two versions. The difference isn't quality control — both are reviewed by our team — it's how the work is produced and how much of it is bespoke.",
          },
          {
            type: "ul",
            items: [
              "**With AI+** uses proven templates, AI-assisted writing and AI-generated creatives. It's faster and more affordable, and our team checks and edits everything before it goes live.",
              "**Without AI** is fully handcrafted: custom design, hand-written content, scripted and directed shoots, and a strategy built specifically around your business.",
            ],
          },
        ],
      },
      {
        id: "side-by-side",
        heading: "Side by side: the Business Growth Booster",
        blocks: [
          {
            type: "p",
            text: "Our [Business Growth Booster](/#growth-booster) — a website, Meta ads and 5 reel shoots in one package — shows the difference clearly.",
          },
          {
            type: "table",
            caption: "Business Growth Booster: With AI+ vs Without AI",
            head: ["", "With AI+", "Without AI"],
            rows: [
              ["Website", "Template-based, AI-written content, up to 5 pages", "Custom-designed, hand-written, up to 5 pages"],
              ["Meta ads", "1 month setup and management, AI-generated creatives", "1 month setup and management, custom creatives and strategy"],
              ["5 reel shoots", "AI-assisted scripts, captions and editing", "Scripted, directed and fully hand-edited"],
              ["Timeline", "About 2–3 weeks", "About 5–8 weeks"],
            ],
          },
        ],
      },
      {
        id: "who-should-choose-with-ai",
        heading: "Who should choose With AI+",
        blocks: [
          {
            type: "ul",
            items: [
              "New businesses that need to be online and generating enquiries quickly.",
              "Owners testing a new product, location or market before investing heavily.",
              "Businesses with a tight budget that still want professional, reviewed work.",
              "Anyone who needs volume — regular posts, ad variations, content refreshes.",
            ],
          },
        ],
      },
      {
        id: "who-should-choose-without-ai",
        heading: "Who should choose Without AI",
        blocks: [
          {
            type: "ul",
            items: [
              "Established brands where a distinctive look and voice are part of the value.",
              "Premium products and services whose customers expect a bespoke experience.",
              "Businesses with complex offers that need deeper strategy and research.",
              "Anyone whose website or system needs custom functionality, not just custom styling.",
            ],
          },
        ],
      },
      {
        id: "mixing-both",
        heading: "Mixing both: the most common choice",
        blocks: [
          {
            type: "p",
            text: "You don't have to pick one version for everything. A common combination is a **custom website** — your long-term asset — with **AI-assisted ad creatives** that can be refreshed often and cheaply. Another is AI-assisted social posting alongside hand-directed reel shoots for hero content.",
          },
          {
            type: "callout",
            title: "Security on both tiers",
            text: "Whichever version you choose, a security pass is part of the build. We don't treat security as an upsell — see our [cybersecurity services](/services/cyber-security).",
          },
        ],
      },
      {
        id: "how-to-decide",
        heading: "How to decide",
        blocks: [
          {
            type: "ol",
            items: [
              "**How fast do you need results?** Weeks points to With AI+.",
              "**How unique must your brand feel?** Highly distinctive points to Without AI.",
              "**What's your budget for the next three months?** Be realistic and leave room for ad spend.",
              "**Which parts are long-term assets?** Invest more in those; use AI where content refreshes often.",
            ],
          },
          {
            type: "p",
            text: "Still unsure? Tell us about your business and we'll recommend With AI+, Without AI or a mix — free. Browse [all our services](/services) to see both versions for each.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Is With AI+ lower quality than Without AI?",
        a: "No — both are reviewed by our team. With AI+ uses templates and AI-assisted production to deliver faster and more affordably; Without AI is fully custom for brands that need a bespoke finish.",
      },
      {
        q: "Can I upgrade from With AI+ to Without AI later?",
        a: "Yes. Many clients start with With AI+ to launch quickly, then move key pieces such as the website to a custom build once the business grows.",
      },
      {
        q: "Does With AI+ content sound robotic?",
        a: "It shouldn't. AI drafts are edited by our team for your tone, local audience and accuracy before anything is published.",
      },
      {
        q: "Is ad spend included in the packages?",
        a: "No. Ad spend paid to Meta or Google is separate from the package price and goes directly to the platform.",
      },
    ],
    service: { label: "All services", href: "/services" },
  },
];

export const getPost = (slug: string) => POSTS.find((post) => post.slug === slug);

/** Rough reading time at ~220 words per minute. */
export function readingTime(post: Post) {
  const text = [
    post.quickAnswer,
    ...post.takeaways,
    ...post.sections.flatMap((s) =>
      s.blocks.flatMap((b) =>
        b.type === "p"
          ? [b.text]
          : b.type === "callout"
            ? [b.title, b.text]
            : b.type === "table"
              ? b.rows.flat()
              : b.items,
      ),
    ),
    ...post.faqs.flatMap((f) => [f.q, f.a]),
  ].join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return { words, minutes: Math.max(1, Math.round(words / 220)) };
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
