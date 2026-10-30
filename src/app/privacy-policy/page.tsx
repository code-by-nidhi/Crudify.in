import type { Metadata } from "next";

import LegalPage from "@/components/legal/LegalPage";
import { PRIVACY } from "@/content/legal";

export const metadata: Metadata = {
  title: PRIVACY.title,
  description: PRIVACY.description,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <LegalPage doc={PRIVACY} />;
}
