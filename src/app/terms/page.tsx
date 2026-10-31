import type { Metadata } from "next";

import LegalPage from "@/components/legal/LegalPage";
import { TERMS } from "@/content/legal";
import JsonLd from "@/components/blog/JsonLd";
import { breadcrumbNode, pageMetadata, webPageNode } from "@/lib/seo";

const PATH = "/terms";

export const metadata: Metadata = pageMetadata({
  title: TERMS.title,
  description: TERMS.description,
  path: PATH,
  modifiedTime: TERMS.updatedIso,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    webPageNode({
      path: PATH,
      name: TERMS.title,
      description: TERMS.description,
      dateModified: TERMS.updatedIso,
    }),
    breadcrumbNode(PATH, [{ name: TERMS.title, path: PATH }]),
  ],
};

export default function TermsPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <LegalPage doc={TERMS} />
    </>
  );
}
