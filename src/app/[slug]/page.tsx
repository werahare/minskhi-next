import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { staticPages } from "@/content/pages/static-pages";
import { pageMetadata } from "@/lib/seo";

type StaticSlug = keyof typeof staticPages;

const wpContentFiles: Partial<Record<StaticSlug, string>> = {
  "website-terms-of-service": "website-terms-of-service.html",
  "ring-size-guide": "ring-size-guide.html",
  "product-care": "product-care.html",
  faq: "faq.html"
};

function cleanImportedHtml(value: string) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/(\d)\uFFFD(\d)/g, "$1-$2")
    .replace(/\uFFFD/g, " ")
    .replace(/�/g, " ")
    .replace(/\s*:contentReference\[[^\]]+\]\{[^}]+\}/g, "")
    .replace(/\s*:contentReference\b/g, "")
    .replace(/https?:\/\/minskhi\.com\/wp-content/gi, "/wp-content")
    .replace(/https?:\/\/www\.minskhi\.com\/wp-content/gi, "/wp-content");
}

function getWordPressPageContent(fileName: string) {
  const source = fs.readFileSync(path.join(process.cwd(), "src/content/wp", fileName), "utf8");
  const match = source.match(/<section class="minskhi[\s\S]*?<\/style>/);
  return match ? cleanImportedHtml(match[0]) : "";
}

export function generateStaticParams() {
  return Object.keys(staticPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = staticPages[slug as StaticSlug];
  if (!page) return {};
  return pageMetadata(page.title, page.body[0], `/${slug}`);
}

export default async function StaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = staticPages[slug as StaticSlug];
  if (!page) notFound();
  const wpFileName = wpContentFiles[slug as StaticSlug];
  const wpHtml = wpFileName ? getWordPressPageContent(wpFileName) : "";

  if (wpHtml) {
    return (
      <div
        className="wp-exported-page"
        dangerouslySetInnerHTML={{ __html: wpHtml }}
      />
    );
  }

  return (
    <section className="container-shell py-16">
      <p className="text-xs uppercase tracking-[0.24em] text-gold">Minskhi</p>
      <h1 className="mt-3 font-serif text-5xl">{page.title}</h1>
      <div className="rich-text mt-8 max-w-3xl">
        {page.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
