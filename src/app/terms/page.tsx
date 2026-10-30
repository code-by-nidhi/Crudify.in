import type { Metadata } from "next";

import LegalPage from "@/components/legal/LegalPage";
import { TERMS } from "@/content/legal";

export const metadata: Metadata = {
  title: TERMS.title,
  description: TERMS.description,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalPage doc={TERMS} />;
}
