import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
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
  const html = match ? cleanImportedHtml(match[0]) : "";

  if (fileName !== "website-terms-of-service.html") return html;

  return html
    .replace("<h1>Website Terms of Service</h1>", "<h1 data-keep-page-title-size>Website Terms of Service</h1>")
    .replace(
      '<div class="mt-card mt-small-card"><h3>Privacy Policy</h3></div>',
      '<a class="mt-card mt-small-card" href="/policies#privacy-policy"><h3>Privacy Policy</h3></a>'
    )
    .replace(
      '<div class="mt-card mt-small-card"><h3>Refunds, Returns &amp; Exchanges Policy</h3></div>',
      '<a class="mt-card mt-small-card" href="/policies#refunds-returns-and-exchanges-policy"><h3>Refunds, Returns &amp; Exchanges Policy</h3></a>'
    )
    .replace(
      '<div class="mt-card mt-small-card"><h3>Promotional Terms &amp; Conditions</h3></div>',
      '<a class="mt-card mt-small-card" href="/policies#promotional-terms-and-conditions"><h3>Promotional Terms &amp; Conditions</h3></a>'
    );
}

function MinskhiCertificationsPage() {
  const certificationBenefits = [
    "Confirms gemstone identity",
    "Verifies quality and characteristics",
    "Provides independent professional assessment",
    "Ensures transparency and trust"
  ];

  const certificationRequests = [
    "GIA (Gemological Institute of America)",
    "Gubelin Gem Lab",
    "SWISS Gemmological Institute (SSEF)",
    "Other preferred laboratories upon request"
  ];

  return (
    <section className="minskhi-certifications-page">
      <div className="minskhi-certifications-container">
        <header className="minskhi-certifications-hero">
          <h1>The Minskhi Standard</h1>
          <h2>Authenticity Backed by Credibility</h2>
          <p>
            At Minskhi, we are committed to delivering not only exceptional gemstones
            but also the assurance and credibility that stand behind them.
          </p>
        </header>

        <section className="minskhi-certifications-intro">
          <h3>Assurance You Can Trust</h3>
          <p>
            All of our gemstones are certified by internationally recognised
            and reputable gemmological laboratories, including our trusted certification
            partner, Gemological Institute of Colombo (GIC).
          </p>
          <p>
            These certifications provide an independent assessment of each gemstone&apos;s
            identity, quality, and characteristics, ensuring complete transparency and
            confidence in your purchase.
          </p>
        </section>

        <section className="minskhi-certifications-card">
          <span className="minskhi-card-kicker">Independent Verification</span>
          <h3>Why Certification Matters</h3>
          <ul className="minskhi-certifications-list">
            {certificationBenefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </section>

        <section className="minskhi-certifications-card minskhi-certifications-wide">
          <h3>Personalised Certification Requests</h3>
          <p>
            For clients who seek additional assurance or specific laboratory preferences,
            we offer bespoke certification services through internationally recognised
            institutions, including:
          </p>
          <ul className="minskhi-certifications-list">
            {certificationRequests.map((request) => (
              <li key={request}>{request}</li>
            ))}
          </ul>
        </section>

        <section className="minskhi-certifications-cta">
          <h3>Additional Certification</h3>
          <p>
            Should you require additional certification beyond our standard offering,
            we are pleased to facilitate this service at an agreed cost. Please note
            that processing times may vary depending on the selected laboratory and
            specific requirements.
          </p>
        </section>
      </div>
    </section>
  );
}

function OurStoryPage() {
  return (
    <section className="minskhi-story-page">
      <div className="minskhi-story-container">
        <header className="minskhi-story-hero">
          <div className="minskhi-story-copy">
            <span className="minskhi-eyebrow">Our Story</span>
            <h1>Minskhi</h1>
            <h2>Born from the Earth. Crafted for Legacy.</h2>
          </div>
        </header>

        <section className="minskhi-story-intro">
          <p>
            Minskhi was founded on a single principle: that a fine gemstone is not
            merchandise, but inheritance - a fragment of the earth&apos;s own history,
            given form and light, and entrusted to those who will carry it forward.
          </p>
          <p>
            Each stone that enters our care is considered on its own terms: its origin
            traced, its character studied, its place in the world weighed long before it
            is ever offered for acquisition. We are not merchants of volume. We are
            custodians of what is rare.
          </p>
        </section>

        <section className="minskhi-story-media-card">
          <Image
            src="/wp-content/uploads/2026/03/membership.jpg"
            alt="Minskhi"
            width={1995}
            height={1024}
          />
        </section>

        <article className="minskhi-story-article">
          <section className="minskhi-story-card minskhi-story-wide">
            <h3>Kalana and Mary Meewella</h3>
            <p>
              Minskhi is led by Kalana Meewella and Mary Meewella, whose partnership
              joins two forms of knowledge rarely found within a single house.
            </p>
            <p>
              Kalana Meewella&apos;s family has been gem merchants for over five decades,
              working directly at origin across Sri Lanka&apos;s historic sapphire regions,
              in relationships measured in years rather than transactions.
            </p>
            <p>
              Mary Meewella&apos;s training in gemmology follows the curriculum of the
              Gemmological Association of Great Britain, bringing scientific discipline
              to a trade too often guided by instinct alone.
            </p>
            <p>
              Between them, no stone is judged from a single vantage point. Each is
              considered for its beauty, and for its truth.
            </p>
            <p>
              It was this shared devotion to gemstones - one rooted in inheritance, the
              other in study - that first brought Kalana and Mary together. Minskhi
              followed, not as a plan, but as its natural consequence.
            </p>
          </section>

          <section className="minskhi-story-card minskhi-story-wide">
            <h3>A Singular Focus</h3>
            <p>
              Minskhi works only in natural, certified coloured gemstones of investment
              grade - sapphires and rubies chosen not for their abundance, but for their
              scarcity.
            </p>
            <p>
              Nothing we offer is produced to meet demand. Each piece exists because it
              was found, and because it deserved to be kept.
            </p>
          </section>

          <section className="minskhi-story-card minskhi-story-wide">
            <h3>Craftsmanship</h3>
            <p>
              Every setting is realised by hand, by Australian jewellers and lapidaries
              whose command of their craft allows the stone, rather than the design, to
              lead.
            </p>
            <p>
              The result is quiet by intention - jewellery built to be worn for decades,
              and passed on for longer.
            </p>
          </section>

          <section className="minskhi-story-card minskhi-story-wide">
            <h3>An Obligation, Not a Position</h3>
            <p>
              Minskhi sources directly, deals fairly, and gives back to the land and the
              people from which every stone is drawn. This is not a position we adopt for
              effect. It is simply how the work is done.
            </p>
          </section>
        </article>

        <div className="minskhi-story-cta">
          <p>Minskhi resides within Chadstone, among Australia&apos;s finest houses.</p>
          <p><strong>It is not made for a season. It is made to be inherited.</strong></p>
        </div>
      </div>
    </section>
  );
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

  if (slug === "our-story") {
    return <OurStoryPage />;
  }

  if (slug === "minskhi-certifications" || slug === "certification-authenticity") {
    return <MinskhiCertificationsPage />;
  }

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
