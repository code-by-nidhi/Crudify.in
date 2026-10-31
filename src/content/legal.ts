/**
 * Copy for the Terms & Conditions and Privacy Policy pages.
 *
 * The privacy policy describes what this codebase actually does: the enquiry
 * form (components/contact) posts name, phone and service — plus the page URL
 * and browser user agent — to app/api/contact, which forwards them to a Google
 * Sheet via Apps Script; the API keeps IPs in memory for a minute to rate-limit;
 * nothing is stored in the browser. Update this file if any of that changes (analytics, a CRM, cookies, a newsletter...).
 *
 * TODO: add a contact email, registered business name and postal address to
 * CONTACT below once they are final, and have both documents reviewed by a
 * lawyer before launch.
 */
import { SITE_NAME } from "@/lib/site";

export type LegalBlock = string | string[];

export type LegalSection = {
  id: string;
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  related: { label: string; href: string };
};

const UPDATED = "30 October 2026";

const CONTACT = `You can reach ${SITE_NAME} through the enquiry form on this website. We are based in Ludhiana, Punjab, India.`;

export const TERMS: LegalDoc = {
  title: "Terms & Conditions",
  description: `The terms that apply when you use the ${SITE_NAME} website or hire ${SITE_NAME} for marketing, web development, AI or cybersecurity work.`,
  updated: UPDATED,
  intro: `These terms cover your use of this website and the services ${SITE_NAME} provides. By using the site or engaging us, you agree to them.`,
  related: { label: "Privacy Policy", href: "/privacy-policy" },
  sections: [
    {
      id: "about",
      heading: "Who we are",
      blocks: [
        `${SITE_NAME} ("we", "us", "our") is a growth agency based in Ludhiana, Punjab, India, offering digital marketing, website and app development, AI agents and cybersecurity services. "You" means the person or business using this website or hiring us.`,
      ],
    },
    {
      id: "website",
      heading: "Using this website",
      blocks: [
        "The content on this website, including blog articles, is general information. It is not legal, financial or professional advice for your specific situation.",
        "You agree not to:",
        [
          "use the site or its forms for anything unlawful, or to send spam or misleading enquiries;",
          "try to break, overload or gain unauthorised access to the site or the systems behind it;",
          "copy, scrape or republish the site's content, design or code without our written permission.",
        ],
      ],
    },
    {
      id: "engagements",
      heading: "Quotes and engagements",
      blocks: [
        "Every engagement starts with a written scope and a fixed quote before any work begins. The scope, price, timeline and deliverables in that written proposal (or a separate signed agreement) are what bind both sides. Where they differ from these terms, the proposal or agreement wins.",
        "Prices shown on this website are starting prices and indications, not offers. Work outside the agreed scope is quoted separately as a change request before we do it.",
      ],
    },
    {
      id: "payments",
      heading: "Fees and payment",
      blocks: [
        [
          "Payment milestones, retainer terms and due dates are set out in your proposal or invoice.",
          "Ad spend on Meta, Google or other platforms is separate from our fees and is paid by you directly to the platform from your own ad account.",
          "Third-party costs, such as domains, hosting, paid themes, plugins, apps or software subscriptions, are paid by you unless your proposal says otherwise.",
          "Taxes, including GST, are added where applicable.",
          "We may pause work on an engagement while an invoice is overdue.",
        ],
      ],
    },
    {
      id: "your-part",
      heading: "Your responsibilities",
      blocks: [
        "To deliver on time we need timely feedback, approvals and access to the accounts and materials the work depends on. You confirm that anything you give us to use, such as logos, photos, text, product data and customer lists, is yours or that you have permission to use it, and that your business and its advertising comply with the law and with each platform's policies.",
        "Timelines move when inputs or approvals are delayed.",
      ],
    },
    {
      id: "ownership",
      heading: "Ownership of the work",
      blocks: [
        "Once the relevant invoices are paid in full, the final deliverables we create for you belong to you. That includes your website code, design files and content. Repositories, hosting, domains, ad accounts, pixels and business profiles are set up in your name, and they stay with you if we stop working together.",
        "We keep ownership of our own pre-existing tools, templates, know-how and code libraries. You receive a licence to use them as part of your deliverables. Open-source and third-party components remain under their own licences.",
        "Unless you ask us not to, we may mention you as a client and show the finished work in our portfolio.",
      ],
    },
    {
      id: "ai",
      heading: "AI-assisted services",
      blocks: [
        `Services in our "With AI+" tier use AI tools to speed up drafting, design, editing or development. Our team reviews this output before it is delivered. AI agents and chatbots we set up for you work from the information and rules you approve. You remain responsible for how they are used with your customers and for reviewing what they say on your behalf.`,
      ],
    },
    {
      id: "results",
      heading: "Results",
      blocks: [
        "Marketing, search ranking and advertising results depend on factors we do not control, including platform algorithms, competition, budgets and your market. We commit to doing the work in the agreed scope to a professional standard, but we do not guarantee specific rankings, leads, sales or returns.",
      ],
    },
    {
      id: "security",
      heading: "Security work",
      blocks: [
        "Security audits and testing are carried out only on systems you own or are authorised to have tested, within the scope agreed in writing. No security measure makes a system completely immune to attack, so our assessments and protections reduce risk rather than eliminate it.",
      ],
    },
    {
      id: "confidentiality",
      heading: "Confidentiality",
      blocks: [
        "Both sides will keep each other's non-public business information confidential and use it only for the engagement. Credentials you share with us are used only for the agreed work. We recommend changing them when an engagement ends.",
      ],
    },
    {
      id: "liability",
      heading: "Limitation of liability",
      blocks: [
        "To the extent the law allows, we are not liable for indirect or consequential losses, such as lost profits, lost data or business interruption. We are also not liable for outages or policy decisions by third-party platforms like Meta, Google, Shopify or hosting providers. Our total liability for any engagement is limited to the fees you paid us for that engagement in the three months before the claim.",
      ],
    },
    {
      id: "ending",
      heading: "Ending an engagement",
      blocks: [
        "Either side may end an engagement as set out in the proposal or agreement. If it does not say, either side may end it with 15 days' written notice. You pay for work completed up to the end date, and we hand over the work and access that you have paid for.",
      ],
    },
    {
      id: "law",
      heading: "Governing law",
      blocks: [
        "These terms are governed by the laws of India. Any dispute will first be discussed in good faith. If it cannot be resolved that way, it falls under the exclusive jurisdiction of the courts in Ludhiana, Punjab.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to these terms",
      blocks: [
        "We may update these terms from time to time, and the date at the top shows the latest version. Changes do not affect an engagement already under a signed proposal or agreement unless both sides agree.",
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      blocks: [CONTACT],
    },
  ],
};

export const PRIVACY: LegalDoc = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses and protects the personal data you share through this website, in line with India's Digital Personal Data Protection Act, 2023.`,
  updated: UPDATED,
  intro: `This policy explains what personal data ${SITE_NAME} collects through this website, why, and the choices you have. We collect as little as we need to reply to you.`,
  related: { label: "Terms & Conditions", href: "/terms" },
  sections: [
    {
      id: "scope",
      heading: "Who this applies to",
      blocks: [
        `${SITE_NAME} is the data fiduciary for the personal data described here. This policy covers this website and the enquiries made through it. Client data we handle while doing project work is covered by the agreement for that project.`,
      ],
    },
    {
      id: "collect",
      heading: "What we collect",
      blocks: [
        "When you send an enquiry through our forms, we collect:",
        [
          "your name or business name;",
          "your phone or WhatsApp number;",
          "the service you are interested in;",
          "the page you sent the form from and your browser's user-agent string, so we know where the enquiry came from.",
        ],
        "When you visit the site, our servers briefly process your IP address. We use it only to limit repeated form submissions, keep it in memory for about a minute, and do not store it alongside your enquiry. Our hosting provider may also keep standard technical logs to run and secure the site.",
        "We do not ask for payment details, government ID or other sensitive personal data through this website.",
      ],
    },
    {
      id: "use",
      heading: "How we use it",
      blocks: [
        [
          "to call or message you back about your enquiry and prepare a proposal;",
          "to keep a record of enquiries so the right person on our team follows up;",
          "to protect the site and its forms from spam and abuse.",
        ],
        "We do not sell your personal data, and we do not use it for advertising or share it for others to market to you.",
      ],
    },
    {
      id: "consent",
      heading: "Your consent",
      blocks: [
        "By submitting a form you consent to us using the details you give for the purposes above. You can withdraw that consent at any time by contacting us, and we will stop using your details from then on.",
      ],
    },
    {
      id: "sharing",
      heading: "Who we share it with",
      blocks: [
        "Enquiries are stored in a Google Sheet in our Google Workspace account, so Google processes this data on our behalf. Our website hosting provider also processes the technical data needed to serve the site. These providers may store data outside India, under their own security and privacy commitments.",
        "We will disclose personal data if the law or a lawful order from a government authority requires it.",
      ],
    },
    {
      id: "cookies",
      heading: "Cookies and browser storage",
      blocks: [
        "This website does not use cookies, and it does not store anything in your browser's local or session storage.",
        "If we add analytics or advertising tools in future, we will update this policy first.",
      ],
    },
    {
      id: "retention",
      heading: "How long we keep it",
      blocks: [
        "We keep enquiry details for as long as we need them to respond and follow up, and for up to 24 months after our last contact with you. After that we delete them. If you become a client, we keep records for as long as the engagement and the law (for example tax and accounting rules) require.",
      ],
    },
    {
      id: "security",
      heading: "How we protect it",
      blocks: [
        "Access to enquiry data is limited to the team members who need it. The site is served over HTTPS, and the form is protected against spam and repeated submissions. No method of transmission or storage is completely secure, but we take reasonable steps to protect your data and will act promptly on any breach as the law requires.",
      ],
    },
    {
      id: "rights",
      heading: "Your rights",
      blocks: [
        "Under the Digital Personal Data Protection Act, 2023, you can:",
        [
          "ask what personal data we hold about you and how it is used;",
          "ask us to correct, complete or update it;",
          "ask us to delete it, where we no longer need it for the purpose it was given;",
          "withdraw your consent;",
          "nominate another person to exercise these rights if you are unable to;",
          "raise a grievance with us, and with the Data Protection Board of India if it is not resolved.",
        ],
        "To use any of these rights, contact us as described below. We will reply within a reasonable time.",
      ],
    },
    {
      id: "children",
      heading: "Children",
      blocks: [
        "This website and our services are meant for businesses and adults. We do not knowingly collect personal data from anyone under 18. If you believe a child has sent us their details, contact us and we will delete them.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      blocks: [
        "We may update this policy when our website or practices change, and the date at the top shows the latest version.",
      ],
    },
    {
      id: "contact",
      heading: "Contact and grievances",
      blocks: [
        `${CONTACT} Mention "Privacy" in your message so it reaches the right person.`,
      ],
    },
  ],
};
