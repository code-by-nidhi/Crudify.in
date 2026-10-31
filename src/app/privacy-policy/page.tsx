import type { Metadata } from "next";

import LegalPage from "@/components/legal/LegalPage";
import { PRIVACY } from "@/content/legal";
import JsonLd from "@/components/blog/JsonLd";
import { breadcrumbNode, pageMetadata, webPageNode } from "@/lib/seo";

const PATH = "/privacy-policy";

export const metadata: Metadata = pageMetadata({
  title: PRIVACY.title,
  description: PRIVACY.description,
  path: PATH,
  modifiedTime: PRIVACY.updatedIso,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    webPageNode({
      path: PATH,
      name: PRIVACY.title,
      description: PRIVACY.description,
      dateModified: PRIVACY.updatedIso,
    }),
    breadcrumbNode(PATH, [{ name: PRIVACY.title, path: PATH }]),
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <LegalPage doc={PRIVACY} />
    </>
  );
}
