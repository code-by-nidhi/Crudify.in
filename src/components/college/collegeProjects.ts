import type { IconName } from "../Icons";

export type CollegeProject = {
  name: string;
  summary: string;
  features: string[];
};

export type CollegeProjectCategory = {
  /** Section anchor on /college-projects. */
  id: string;
  title: string;
  icon: IconName;
  intro: string;
  projects: CollegeProject[];
};

export const COLLEGE_PROJECTS_PATH = "/college-projects";

/** Student projects we have built, grouped the way the navbar menu groups
 *  them. Each one is delivered working, with a report and a walkthrough. */
export const COLLEGE_PROJECT_CATEGORIES: CollegeProjectCategory[] = [
  {
    id: "cyber-security-projects",
    title: "Cyber Security Projects",
    icon: "shield",
    intro:
      "Hands-on security tools that show you understand how attacks work and how to defend against them — the kind of project that stands out in a viva.",
    projects: [
      {
        name: "Network Vulnerability Scanner",
        summary:
          "Scans a network for live hosts, open ports and running services, and flags the ones that are known to be risky.",
        features: [
          "Host discovery and port scanning",
          "Service and version detection",
          "Flags known-vulnerable services",
          "Exportable scan report",
        ],
      },
      {
        name: "Brute-Force Attack Simulator",
        summary:
          "Shows how weak passwords fall to dictionary and brute-force attacks against a test login, run only in a safe lab setup.",
        features: [
          "Dictionary and brute-force modes",
          "Attempt counter and timing stats",
          "Runs against your own test target",
          "Demonstrates lockout and rate-limit defences",
        ],
      },
      {
        name: "SOC Mini Dashboard",
        summary:
          "A small Security Operations Centre dashboard that collects logs, spots suspicious activity and raises alerts.",
        features: [
          "Log collection and parsing",
          "Rules for suspicious activity",
          "Live alerts with severity levels",
          "Charts of events over time",
        ],
      },
      {
        name: "Security Toolkit",
        summary:
          "An all-in-one toolkit of everyday security utilities in a single, easy-to-demo interface.",
        features: [
          "Password strength checker",
          "Hash generator and verifier",
          "Encryption and decryption tools",
          "Simple menu to run each tool",
        ],
      },
    ],
  },
  {
    id: "web-development-projects",
    title: "Web Development Projects",
    icon: "code",
    intro:
      "Full-stack web applications with real logins, databases and dashboards — complete systems you can run, demo and explain end to end.",
    projects: [
      {
        name: "Lab Management System",
        summary:
          "Manages college labs: equipment, systems, bookings and maintenance requests in one place.",
        features: [
          "Lab and equipment inventory",
          "Lab slot booking",
          "Issue and maintenance tracking",
          "Admin, staff and student logins",
        ],
      },
      {
        name: "Online Book Store",
        summary:
          "An online bookshop where users browse, search and buy books, with an admin panel to run the store.",
        features: [
          "Book catalogue with search and filters",
          "Cart and checkout",
          "Order history",
          "Admin panel for books and orders",
        ],
      },
      {
        name: "E-Commerce Website with AI Chatbot",
        summary:
          "A complete online store with its own AI chatbot, trained on that store's products, that answers shopper questions and helps them find what to buy.",
        features: [
          "Product catalogue, cart and checkout",
          "AI chatbot dedicated to the store",
          "Product recommendations in chat",
          "Admin dashboard for products and orders",
        ],
      },
      {
        name: "Alumni Management System",
        summary:
          "Keeps a college connected with its alumni through profiles, a directory, events and announcements.",
        features: [
          "Alumni registration and profiles",
          "Searchable alumni directory",
          "Events and announcements",
          "Admin approval and management",
        ],
      },
      {
        name: "Job Portal",
        summary:
          "Connects job seekers with employers: companies post jobs, candidates apply, and both track the process.",
        features: [
          "Employer and candidate accounts",
          "Job posting and search",
          "Resume upload and applications",
          "Application status tracking",
        ],
      },
      {
        name: "College Attendance System",
        summary:
          "Replaces paper registers: teachers mark attendance online and students see their record at any time.",
        features: [
          "Class-wise attendance marking",
          "Student attendance percentage",
          "Low-attendance alerts",
          "Downloadable reports",
        ],
      },
      {
        name: "Training & Placement (T&P) System",
        summary:
          "Runs a college placement cell: student records, company drives, eligibility and placement results.",
        features: [
          "Student profiles and resumes",
          "Company drive announcements",
          "Eligibility checks and registrations",
          "Placement records and statistics",
        ],
      },
    ],
  },
];

/** What every project comes with. */
export const COLLEGE_PROJECT_INCLUDES = [
  { icon: "code" as const, title: "Complete source code", body: "Working, well-organised code you can run on your own laptop." },
  { icon: "check" as const, title: "Project report & documentation", body: "Report, diagrams and documentation ready to submit." },
  { icon: "zap" as const, title: "Setup help", body: "We help you install and run it, so the demo works on the day." },
  { icon: "chart" as const, title: "Explanation for your viva", body: "We walk you through how it works so you can present it with confidence." },
];
