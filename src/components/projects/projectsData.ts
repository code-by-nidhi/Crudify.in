/** Client work shown on the homepage, /projects and each /projects/[slug]
 *  page. Real projects only — every metric should be true of the live
 *  product, and analytics figures backed by one of the `proofs` screenshots. */
type FeatureIcon = "lock" | "shield" | "zap" | "check" | "key" | "video" | "search" | "pin" | "web" | "social" | "sliders" | "cart" | "bot" | "chart" | "activity";

export interface Project {
  /** URL slug: /projects/{id}. */
  id: string;
  title: string;
  client: string;
  category: string;
  /** Card copy, and the lead paragraph on the project page. */
  description: string;
  /** <title> and meta description for the project page. */
  metaTitle: string;
  metaDescription: string;
  /** Longer write-up, one paragraph per entry. */
  overview: string[];
  /** What we delivered. */
  deliverables: string[];
  /** Key features of the delivered product, shown as cards on its page. */
  features: { title: string; body: string; icon: FeatureIcon }[];
  caseStudy: {
    /** Why the project was built — the problem behind it. */
    why: string;
    /** What the business needed from it. */
    needs: string;
    requirements: string[];
    /** How we met the requirements, in order. */
    approach: string[];
    /** New things we added beyond the brief. */
    additions: string[];
  };
  metrics: { label: string; value: string }[];
  tags: string[];
  icon: "web" | "digital" | "shield" | "code" | "server" | "cpu" | "lock";
  /** Live site. Left out for private systems whose client can't be named. */
  url?: string;
  /** Screenshot of the delivered site, or a cover illustration when it is private. */
  image: { src: string; alt: string };
  /** Analytics screenshots backing up the metrics. */
  proofs?: { src: string; alt: string; label: string }[];
}

export const PROJECTS: Project[] = [
  {
    id: "unique-glazing",
    title: "Unique Glazing — UK Windows & Doors",
    client: "Unique Glazing",
    category: "UK Client • Website + Local SEO",
    description:
      "A conversion-focused website for Unique Glazing, a UK glazing company that repairs, replaces and installs uPVC and aluminium windows and doors. We designed and built a fast, mobile-first site that shows off their bespoke, energy-efficient installs, and set up and optimised their Google Business Profile so local homeowners find them on Search and Maps. In six months the site earned 15.3k impressions in Google Search, with an average position of 10.",
    metaTitle: "Unique Glazing Case Study — UK Glazing Website & Local SEO",
    metaDescription:
      "How CRUDIFY built a website and Google Business Profile for Unique Glazing, a UK windows and doors company: 15.3k Google impressions in six months.",
    overview: [
      "Unique Glazing repairs, replaces and renews uPVC and aluminium windows and doors for homeowners in the UK. They needed a website that matched the quality of their installs and a way to be found by people searching Google for a local glazier.",
      "We built a clean, premium website around what homeowners actually compare: energy ratings, security standards, warranty and the finish of the final install. Every page leads to a free-quote request, and the services, projects and gallery pages give Google clear, specific content to rank for local glazing searches.",
      "Alongside the site we set up and optimised their Google Business Profile, with the business details kept consistent with the website, so the business shows up on Google Maps and in the local results, not just the organic listings.",
    ],
    deliverables: [
      "Website design and development",
      "Mobile-first, fast-loading build",
      "Services, projects, gallery, FAQ and contact pages",
      "Free-quote lead capture",
      "On-page SEO for local glazing searches",
      "Google Business Profile setup and optimisation",
    ],
    features: [
      {
        icon: "zap",
        title: "Free-quote lead capture",
        body: "A \"Get a Free Quote\" call to action sits in the hero and on every page, so a homeowner who is ready to talk is never more than one tap away.",
      },
      {
        icon: "shield",
        title: "Trust signals up front",
        body: "The things homeowners compare — 10+ years warranty, A++ energy rating, PAS 24 security and double glazing — are shown right on the homepage instead of buried in the copy.",
      },
      {
        icon: "web",
        title: "Services, projects and gallery",
        body: "Dedicated pages for each service, past projects and a photo gallery show the finished work and give Google specific content to rank.",
      },
      {
        icon: "check",
        title: "Mobile-first and fast",
        body: "Built for the phone first, since that is where most people search for a local glazier, and kept light so pages load quickly.",
      },
      {
        icon: "search",
        title: "Local SEO foundations",
        body: "Page titles, descriptions and content targeted at local glazing searches, plus an FAQ that answers what customers ask before they call.",
      },
      {
        icon: "pin",
        title: "Google Business Profile",
        body: "A set-up and optimised profile so the business appears on Google Maps and in local results, with details that match the website.",
      },
    ],
    caseStudy: {
      why: "Unique Glazing do bespoke, high-spec work, but without a strong website and Google presence, homeowners searching for a local glazier had no easy way to find them or judge the quality of their work before picking up the phone.",
      needs: "A professional website that wins trust quickly and turns visits into quote requests, plus visibility in Google Search and Google Maps for local glazing searches.",
      requirements: [
        "A premium look that matches the quality of their installs",
        "Clear information on uPVC and aluminium windows and doors",
        "An easy way for homeowners to request a free quote",
        "Show real projects and a gallery of finished work",
        "Get found on Google Search and Google Maps",
        "Work well on phones",
      ],
      approach: [
        "Planned the site around the questions homeowners ask before they buy: energy rating, security, warranty and finish.",
        "Designed a clean, premium layout with the free-quote button in the hero and repeated across every page.",
        "Built a fast, mobile-first site with dedicated Services, Projects, Gallery, FAQ and Contact pages.",
        "Wrote on-page SEO — titles, descriptions and headings — aimed at local glazing searches.",
        "Set up and optimised the Google Business Profile, with details matching the website.",
        "Tracked results in Google Search Console: 15.3k impressions and 121 clicks in six months.",
      ],
      additions: [
        "Trust badges for double glazing and PAS 24 security on the hero image",
        "Headline stats: 10+ years warranty, A++ energy rated, 100% bespoke fitting",
        "Projects and gallery pages that show finished installs",
        "An FAQ page that answers pre-sale questions",
        "A Google Business Profile for visibility on Maps",
      ],
    },
    metrics: [
      { label: "Search Impressions", value: "15.3k" },
      { label: "Search Clicks", value: "121" },
      { label: "Profile Interactions", value: "53" },
    ],
    tags: ["Web Design", "Website Development", "Local SEO", "Google Business Profile"],
    icon: "web",
    url: "https://www.uniqueglazing.uk",
    image: {
      src: "/projects/unique-glazing.webp",
      alt: "Unique Glazing homepage: premium windows and doors built for comfort and security",
    },
    proofs: [
      {
        src: "/projects/unique-glazing-search-console.webp",
        alt: "Google Search Console, last 6 months: 121 clicks, 15.3k impressions, average position 10",
        label: "Search Console · 6 months",
      },
      {
        src: "/projects/unique-glazing-business-profile.webp",
        alt: "Google Business Profile: 53 Business Profile interactions",
        label: "Business Profile",
      },
    ],
  },
  {
    id: "ghost-ed",
    title: "Ghost-ed — Encrypted Messaging App",
    client: "Ghost-ed",
    category: "Web App • Private Messaging",
    description:
      "Ghost-ed is a private messaging web app built around end-to-end encryption. Chats, photos and attachments are encrypted in the browser before they are sent, calls are secured end to end, and features like ghosting and buzz give people control over who can reach them and how. We built the full product, wrapped in a playful, friendly interface with light and dark themes.",
    metaTitle: "Ghost-ed Case Study — End-to-End Encrypted Messaging Web App",
    metaDescription:
      "How CRUDIFY built Ghost-ed, a private messaging web app with end-to-end encrypted chats, ghosting, buzz, secure calls and verified accounts.",
    overview: [
      "Ghost-ed is a messaging app for people who want their conversations to stay private. Messages and attachments are encrypted in the browser before they leave the device, and the servers only ever store and pass along locked data that the people in the conversation can open.",
      "The encryption key is protected by the user's own password, so not even Ghost-ed can read a chat. That shaped the whole build: account sign-up with email verification, login, password recovery that is honest about what a reset means for old messages, and encryption keys kept safely on each device.",
      "On top of that secure core we built the features that make it fun to use: one-to-one and group chats, ghosting to quiet or lock a chat on your own terms, buzz to get a friend's attention, view-once photos, disappearing messages, and voice and video calls that are encrypted from end to end.",
      "Privacy apps often feel cold and technical. Ghost-ed's ghost mascot, hand-lettered greeting and warm colour palette make it feel friendly instead, with a light and dark theme toggle so it is comfortable to use at any time of day.",
    ],
    deliverables: [
      "Product UI and UX design",
      "Full-stack web app development",
      "End-to-end encrypted messaging",
      "One-to-one and group chats",
      "Ghosting and buzz",
      "View-once photos and disappearing messages",
      "Secure voice and video calling",
      "Verified accounts, login and password recovery",
      "Light and dark themes",
    ],
    features: [
      {
        icon: "lock",
        title: "End-to-end encrypted chatting",
        body: "Messages, photos, voice notes and documents are encrypted in the browser before they are sent. The server only stores locked data, so only the people in the conversation can read it.",
      },
      {
        icon: "shield",
        title: "Ghosting",
        body: "Quiet or lock a one-to-one chat on your own terms. Ghosting controls what the other person can send you inside Ghost-ed, without having to block or explain.",
      },
      {
        icon: "zap",
        title: "Buzz",
        body: "Send a buzz to grab a friend's attention when a message alone won't do — a playful nudge that makes the chat feel alive.",
      },
      {
        icon: "video",
        title: "Properly secured calling",
        body: "Voice and video calls connect directly between the people on the call wherever possible. When they can't, they pass through a relay that still can't read them. Calls are never recorded.",
      },
      {
        icon: "check",
        title: "Verified accounts",
        body: "Every account is confirmed with an email verification code, and password resets go through the same check, so the person behind a profile really owns it.",
      },
      {
        icon: "key",
        title: "Your password is the key",
        body: "The password unlocks the encryption key that protects your history, and keys stay protected on each device. Nobody else, including Ghost-ed, holds a copy.",
      },
    ],
    caseStudy: {
      why: "Most chat apps ask you to trust the company with your conversations. Ghost-ed was built for people who want privacy they don't have to take on trust — encryption the service itself can't undo — without the app feeling cold or technical.",
      needs: "A messaging app where encryption is the foundation rather than an add-on, but which still has the fun, everyday features people expect from a modern chat app.",
      requirements: [
        "End-to-end encryption for every message and attachment",
        "One-to-one and group chats",
        "Voice and video calls that are just as secure",
        "Ways to control who can reach you, without blocking",
        "Verified accounts and safe password recovery",
        "A friendly, playful design with light and dark themes",
      ],
      approach: [
        "Encrypted messages and attachments in the browser before they are sent, so the servers only ever store locked data.",
        "Tied the encryption key to the user's password and kept keys protected on each device, so not even Ghost-ed can read a chat.",
        "Connected calls directly between people wherever possible, falling back to an encrypted relay, and never recording them.",
        "Added email verification codes for sign-up and password resets.",
        "Made the trade-offs clear in the product: resetting a password means older messages can no longer be opened.",
        "Designed a warm interface — ghost mascot, hand-lettered greeting and a theme toggle — so privacy feels friendly.",
      ],
      additions: [
        "Ghosting — quiet or lock a chat on your own terms",
        "Buzz — a nudge to get a friend's attention",
        "View-once photos",
        "Disappearing messages, with an \"undo seen\" option",
        "Chat streaks",
        "GIF search, sticker packs, and voice and video notes",
      ],
    },
    metrics: [
      { label: "Encrypted Chats", value: "E2EE" },
      { label: "Ghosting & Buzz", value: "Built In" },
      { label: "Voice & Video Calls", value: "Secured" },
    ],
    tags: ["Web App", "End-to-End Encryption", "Secure Calling", "UI/UX Design"],
    icon: "lock",
    url: "https://ghost-ed.in",
    image: {
      src: "/projects/ghost-ed.webp",
      alt: "Ghost-ed login screen with ghost mascot and a 'Hello there' welcome",
    },
  },
  {
    id: "seehra-automotive",
    title: "Seehra Automotive — Car Repair & Auto Services",
    client: "Seehra Automotive",
    category: "Canada Client • Auto Repair Website",
    description:
      "A bold, modern website for Seehra Automotive, a car repair and auto services garage in Vancouver. We designed and built a dark, high-contrast site that shows off their full range of services — from diagnostics and brake repair to engine, transmission and fleet work — with clear Valvoline package pricing, one-tap calling and an online appointment request form.",
    metaTitle: "Seehra Automotive Case Study — Car Repair Website in Vancouver",
    metaDescription:
      "How CRUDIFY built a website for Seehra Automotive, a Vancouver car repair garage: services, Valvoline package pricing, one-tap calling and online appointments.",
    overview: [
      "Seehra Automotive's team of certified technicians handles everything from routine maintenance to major repairs and fleet servicing in Vancouver. Their website needed to feel as polished and dependable as the work they do in the garage.",
      "We went with a dark, high-contrast design and sleek car photography that suits a performance-focused garage. The phone number sits in the header with a one-tap call button, because for a garage the fastest lead is still a phone call.",
      "Below the hero, the site walks a driver through everything they need to choose a garage: highlight services, why to choose Seehra, the full service menu, the team, transparent Valvoline package pricing, car-care articles and an appointment request form.",
    ],
    deliverables: [
      "Website design and development",
      "Responsive, mobile-friendly build",
      "Service menu and highlight cards",
      "Valvoline package pricing table",
      "Team section",
      "Blog and news section",
      "Appointment request form",
    ],
    features: [
      {
        icon: "zap",
        title: "One-tap calling",
        body: "The garage's phone number sits in the header with a call button on every page, so a driver with a problem can ring straight away.",
      },
      {
        icon: "sliders",
        title: "Full service menu",
        body: "Diagnostics, routine maintenance, brakes, engine, transmission and electrical repairs, each with a short, clear description.",
      },
      {
        icon: "cart",
        title: "Transparent package pricing",
        body: "Valvoline full-service oil packages laid out side by side — Good, Better, Best and Ultimate — with regular and offer prices.",
      },
      {
        icon: "check",
        title: "Online appointment requests",
        body: "An appointment request form lets customers book in without having to call during opening hours.",
      },
      {
        icon: "social",
        title: "Meet the team",
        body: "Profiles for the lead mechanic, service advisor and diagnostic technician put real faces to the garage and build trust.",
      },
      {
        icon: "search",
        title: "Blog and car-care tips",
        body: "A news section for maintenance advice and updates, which helps the garage show up in local searches over time.",
      },
    ],
    caseStudy: {
      why: "Seehra Automotive is a car repair and auto services garage in Vancouver. Drivers looking for a mechanic compare garages online first, so they needed a website that shows off their expertise and makes it easy to get in touch.",
      needs: "A bold, modern website that presents their full range of services and prices clearly, and turns visitors into phone calls and appointment requests.",
      requirements: [
        "Show every repair and maintenance service in one place",
        "Clear, upfront pricing for service packages",
        "Make calling the garage as easy as possible",
        "A way to request an appointment online",
        "Introduce the team of technicians",
        "Look premium and work well on phones",
      ],
      approach: [
        "Designed a dark, high-contrast look with sleek car imagery to suit a performance-focused garage.",
        "Put the phone number in the header, with a one-tap call button on every page.",
        "Organised services into clear cards: diagnostics, maintenance, brakes, engine, transmission and electrical.",
        "Laid out the Valvoline full-service oil packages as a side-by-side pricing table with regular and offer prices.",
        "Added an appointment request form and social links so customers can reach the garage however they prefer.",
        "Built a blog and news section the garage can use for car-care tips and local SEO.",
      ],
      additions: [
        "Highlight cards for performance checks, auto repair and fleet services",
        "A \"Why Choose Us\" section: certified technicians, customer-first service, fast turnaround",
        "Animated counters for years of service and happy customers",
        "Team profiles for the lead mechanic, service advisor and diagnostic technician",
        "A four-tier pricing table: Good, Better, Best and Ultimate",
        "An online appointment request form",
      ],
    },
    metrics: [
      { label: "Core Services", value: "6" },
      { label: "Service Packages", value: "4" },
      { label: "Call to Book", value: "1-Tap" },
    ],
    tags: ["Web Design", "Website Development", "Appointment Booking", "Responsive Design"],
    icon: "web",
    url: "https://seehraautomotive.vercel.app",
    image: {
      src: "/projects/seehra-automotive.webp",
      alt: "Seehra Automotive homepage: car repair and auto services in Vancouver, with a black sports car",
    },
  },
  {
    id: "ai-college-management-system",
    title: "AI Fully Automated College Management System",
    client: "Confidential college client",
    category: "Education Client • AI Automation",
    description:
      "A fully AI-automated college management system built for a private college client. It creates and manages student records and runs attendance, marks and grades automatically, so staff spend far less time on paperwork and everyone sees up-to-date results. The college's name is kept confidential at the client's request.",
    metaTitle: "AI Fully Automated College Management System — Case Study",
    metaDescription:
      "How CRUDIFY built a fully AI-automated college management system that creates and manages student attendance, marks, grades and records for a private client.",
    overview: [
      "Running a college means managing hundreds of students across attendance registers, exam marks, grade sheets and records — work that usually lives in spreadsheets and paper files and takes up hours of staff time every week.",
      "We built a system where AI does that work. Student records are created and kept up to date automatically, attendance is tracked and calculated without manual tallying, and marks flow straight into grades and results. Staff check and approve instead of typing everything in by hand.",
      "The system was built for a private college client and runs on their own deployment. To respect their privacy we don't name the college or show screenshots of the live system; the image on this page is an illustration.",
    ],
    deliverables: [
      "System design and architecture",
      "AI automation for student records",
      "Automated attendance tracking",
      "Automated marks and grade calculation",
      "Dashboards for admins, teachers and students",
      "Reports and alerts",
      "Private deployment for the client",
    ],
    features: [
      {
        icon: "bot",
        title: "AI-created student records",
        body: "New students are added and their profiles kept up to date automatically, so the college always has one accurate record for every student.",
      },
      {
        icon: "check",
        title: "Automated attendance",
        body: "Attendance is recorded and attendance percentages calculated automatically for every class, with no manual tallying at the end of the month.",
      },
      {
        icon: "chart",
        title: "Marks to grades, automatically",
        body: "Exam and assessment marks are processed by the system and turned into grades and results without anyone re-entering them in a spreadsheet.",
      },
      {
        icon: "activity",
        title: "Smart alerts",
        body: "The system flags issues such as low attendance early, so staff can step in before a student falls behind.",
      },
      {
        icon: "sliders",
        title: "Dashboards for every role",
        body: "Admins, teachers and students each see what matters to them — from college-wide overviews to a single student's attendance and grades.",
      },
      {
        icon: "lock",
        title: "Private and secure",
        body: "Student data stays within the client's own deployment, with access limited by role.",
      },
    ],
    caseStudy: {
      why: "The college was spending a huge amount of staff time on routine admin: marking attendance registers, totalling marks, working out grades and keeping student records up to date. It was slow, repetitive and easy to get wrong.",
      needs: "One system that takes routine student management off the staff's hands entirely — fully automated by AI, accurate, and easy for admins, teachers and students to use.",
      requirements: [
        "Create and manage student records automatically",
        "Track attendance and calculate percentages",
        "Process marks and calculate grades",
        "Cut manual data entry for staff",
        "Separate access for admins, teachers and students",
        "Keep student data private and secure",
      ],
      approach: [
        "Mapped the college's existing processes for records, attendance, marks and grading to see where staff time was going.",
        "Designed one central student database so every module — attendance, marks, grades — works from the same records.",
        "Built AI automation that creates and updates student records and processes attendance and marks without manual entry.",
        "Automated grade calculation from marks, using the college's own grading rules.",
        "Built role-based dashboards so admins, teachers and students each see exactly what they need.",
        "Deployed it privately for the client, with access controls protecting student data.",
      ],
      additions: [
        "Low-attendance alerts raised automatically",
        "Auto-generated reports for staff",
        "Student-facing view of attendance and grades",
        "One dashboard for the whole college",
        "Role-based access control",
      ],
    },
    metrics: [
      { label: "Attendance", value: "Auto" },
      { label: "Marks & Grades", value: "Auto" },
      { label: "Student Records", value: "AI" },
    ],
    tags: ["AI Automation", "College Management", "Dashboards", "Education"],
    icon: "cpu",
    image: {
      src: "/projects/ai-college-management-system.webp",
      alt: "Illustration of the AI college management system: automated attendance, marks and grades",
    },
  },
  {
    id: "institute-student-management-system",
    title: "Student Management System for a Computer Institute",
    client: "Computer institute client",
    category: "Education Client • Records & Attendance",
    description:
      "A student management system built for a computer institute to keep student records and attendance in one place. Its key safeguard: a student is only marked present once their teacher verifies it, so attendance can't be marked by mistake or by proxy and the records the institute relies on are always accurate.",
    metaTitle: "Student Management System for a Computer Institute — Case Study",
    metaDescription:
      "How CRUDIFY built a student management system for a computer institute: student records and attendance, with students marked present only after teacher verification.",
    overview: [
      "A computer institute runs several batches and courses at once, and keeping track of who is enrolled and who actually attends quickly becomes a mess of registers and spreadsheets.",
      "We built one system for the institute's student records and daily attendance. Every student has a single record, and attendance is tracked batch by batch.",
      "The heart of the system is teacher verification. A student isn't counted as present just because attendance was entered — the teacher has to confirm it first. Until then the student stays unverified and is not marked present, which stops proxy attendance and keeps the records trustworthy.",
    ],
    deliverables: [
      "System design and development",
      "Student records management",
      "Batch-wise attendance tracking",
      "Teacher verification workflow",
      "Logins for admins and teachers",
      "Attendance records and history",
    ],
    features: [
      {
        icon: "social",
        title: "Student records in one place",
        body: "Every student's details are kept in a single record that the institute can add to, update and search, instead of scattered registers.",
      },
      {
        icon: "check",
        title: "Teacher-verified attendance",
        body: "A student is only marked present once their teacher verifies it. Until then they stay unverified and are not counted as present.",
      },
      {
        icon: "shield",
        title: "No proxy attendance",
        body: "Because the teacher has to confirm every present mark, students can't be marked present by mistake or by someone else.",
      },
      {
        icon: "sliders",
        title: "Batch-wise tracking",
        body: "Attendance is organised by batch, so each teacher works with their own students and the institute sees every batch at a glance.",
      },
      {
        icon: "chart",
        title: "Attendance history",
        body: "Verified attendance builds up into a reliable history for every student that the institute can check at any time.",
      },
      {
        icon: "key",
        title: "Role-based access",
        body: "Admins and teachers each log in with their own access, so only the right people can manage records and verify attendance.",
      },
    ],
    caseStudy: {
      why: "The institute needed attendance it could actually trust. With manual registers, students could be marked present by mistake or by a friend, and student details were spread across paper and spreadsheets.",
      needs: "One simple system for student records and attendance, where nobody is counted as present unless their teacher has confirmed it.",
      requirements: [
        "Keep all student records in one place",
        "Track attendance for every batch",
        "Mark a student present only after the teacher verifies it",
        "Stop proxy and mistaken attendance",
        "Separate access for admins and teachers",
        "Easy for staff to use every day",
      ],
      approach: [
        "Mapped how the institute enrolls students and takes attendance across its batches.",
        "Built a central student database so records and attendance always stay linked.",
        "Designed attendance as a two-step flow: attendance is entered, then the teacher verifies it.",
        "Made sure a student is only counted as present once that verification is done; unverified entries are never treated as present.",
        "Added logins for admins and teachers so only the right people can verify attendance.",
        "Kept the screens simple so teachers can verify a whole batch quickly at the start of each class.",
      ],
      additions: [
        "A clear status for every student: verified present, awaiting teacher, or absent",
        "Batch-wise attendance views",
        "A full attendance history for each student",
        "Role-based access for admins and teachers",
      ],
    },
    metrics: [
      { label: "Student Records", value: "1 Place" },
      { label: "Attendance", value: "Verified" },
      { label: "Proxy Attendance", value: "Blocked" },
    ],
    tags: ["Student Management", "Attendance System", "Teacher Verification", "Education"],
    icon: "shield",
    image: {
      src: "/projects/institute-student-management-system.webp",
      alt: "Illustration of the institute student management system: attendance marked present only after teacher verification",
    },
  },
];

export const projectHref = (id: string) => `/projects/${id}`;

export const getProject = (id: string) => PROJECTS.find((project) => project.id === id);
