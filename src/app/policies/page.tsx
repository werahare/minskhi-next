import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

type PolicySection = {
  title: string;
  html: string;
};

export const metadata: Metadata = pageMetadata(
  "Policies",
  "Shipping, returns, promotional terms, website terms, and privacy policies for Minskhi.",
  "/policies"
);

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "-")
    .replace(/&#8217;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/(\d)\uFFFD(\d)/g, "$1-$2")
    .replace(/\uFFFD/g, " ")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function extractPolicySections(): PolicySection[] {
  const source = fs.readFileSync(path.join(process.cwd(), "src/content/wp/policies.html"), "utf8");
  const sections: PolicySection[] = [];
  const detailsPattern = /<details[\s\S]*?<summary[\s\S]*?e-n-accordion-item-title-text">([\s\S]*?)<\/div>[\s\S]*?<\/summary>([\s\S]*?)<\/details>/g;

  for (const match of source.matchAll(detailsPattern)) {
    const [, rawTitle, rawBody] = match;
    const title = decodeHtml(rawTitle);
    const contentStart = rawBody.search(/<(h3|h4|section|div class="m(?:promo|t|inskhi))/);
    const html = (contentStart >= 0 ? rawBody.slice(contentStart) : rawBody)
      .replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*$/g, "")
      .replace(/(\d)\uFFFD(\d)/g, "$1-$2")
      .replace(/\uFFFD/g, " ")
      .replace(/\sdata-[^=]+="[^"]*"/g, "")
      .replace(/\srole="[^"]*"/g, "")
      .replace(/\saria-labelledby="[^"]*"/g, "")
      .replace(/\sclass="elementor[^"]*"/g, "")
      .replace(/\sclass="e-[^"]*"/g, "");

    if (title && html) sections.push({ title, html });
  }

  return sections;
}

export default function PoliciesPage() {
  const sections = extractPolicySections();

  return (
    <section className="policies-page">
      <div className="policy-shell">
        <h1>Policies</h1>
        <p className="policy-intro">
          Review Minskhi policies covering shipping and delivery, refunds and exchanges,
          promotional terms, website terms, and privacy.
        </p>

        <div className="policy-accordion">
          {sections.map((section, index) => (
            <details
              className="policy-item group"
              key={section.title}
              open={index === 0}
            >
              <summary>
                <span>{section.title}</span>
                <span className="policy-toggle group-open:hidden">+</span>
                <span className="policy-toggle hidden group-open:block">-</span>
              </summary>
              <div
                className="policy-content"
                dangerouslySetInnerHTML={{ __html: section.html }}
              />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
