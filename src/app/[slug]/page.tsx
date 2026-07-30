import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
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
  const contents = [
    ["family-house", "A Family House, Built on Legacy"],
    ["foundation", "Foundation and Leadership"],
    ["category", "A Category of Its Own"],
    ["experience", "The Minskhi Experience"],
    ["craftsmanship", "Crafted with Australian Excellence"],
    ["integrity", "Luxury with Integrity"],
    ["responsibility", "Responsibility Beyond Jewellery"],
    ["chadstone", "A Home Among the Finest"],
    ["meaning", "The Meaning of Minskhi"],
    ["heritage", "A Heritage of Six Decades"],
    ["global", "Tradition Meets Global Perspective"],
    ["generations", "A House Built for Generations"]
  ];

  const legacyCards = [
    {
      title: "The Meaning of Minskhi",
      paragraphs: [
        <>The name <i>Minskhi</i> embodies both personal significance and ancient symbolism.</>,
        "It was first gifted by a close friend whose memory continues to inspire the spirit of our brand. Years later, its deeper meaning was discovered within ancient Sumerian texts, where it reflects concepts of divine earth, creation, light, and continuity.",
        "This convergence of memory, history, and nature defines our philosophy.",
        "Minskhi represents connection between past and future, between artisan and collector, between the earth and those who cherish its finest creations."
      ]
    },
    {
      title: "A Heritage of Six Decades",
      paragraphs: [
        "Minskhi stands upon more than sixty years of family involvement in the international gemstone industry.",
        <>At the foundation of this legacy is Dr. Siri Meewella, whose lifelong dedication to ethical trade, scientific evaluation, and uncompromising quality established a reputation respected across borders.</>,
        "Working directly with miners, cutters, and merchants throughout Sri Lanka’s historic sapphire regions and beyond, Dr. Meewella cultivated enduring relationships based on trust, transparency, and technical mastery. His work contributed significantly to the advancement and recognition of Sri Lanka’s gemstone sector on the global stage.",
        "This foundation is not merely historical — it remains the intellectual and ethical cornerstone of Minskhi today."
      ]
    },
    {
      title: "Tradition Meets Global Perspective",
      paragraphs: [
        "While deeply rooted in heritage, Minskhi is guided by contemporary excellence and international standards.",
        "Mary Meewella, a Gem-A Candidate with the Gemmological Association of Great Britain, brings formal gemmological training, scientific methodology, and global best practices into the heart of the brand. Minskhi is a registered member of Gem-A London, reflecting our commitment to professional integrity, continual advancement, and transparent operations.",
        "This integration of generational wisdom with modern analytical precision ensures every gemstone is evaluated holistically balancing beauty, rarity, structural integrity, and long-term value."
      ]
    }
  ];

  const collectionFeatures = [
    "Rare sapphires, rubies, and exceptional coloured stones",
    "Collector-grade certified specimens",
    "Bespoke jewellery crafted by Australian artisans",
    "Limited editions and private commissions",
    "Discreet vault selections for advanced collectors"
  ];

  return (
    <section className="minskhi-story-page">
      <div className="minskhi-story-container">
        <header className="minskhi-story-hero">
          <div className="minskhi-story-copy">
            <span className="minskhi-eyebrow">Minskhi</span>
            <h1>About Minskhi</h1>
            <h2>Born from the Earth. Crafted for Legacy.</h2>
            <p>
              At Minskhi, we believe that true luxury transcends fashion, seasonality,
              and momentary trends. It is defined by rarity, provenance, craftsmanship,
              and meaning values that endure across generations.
            </p>
          </div>
        </header>

        <section className="minskhi-story-intro">
          <h3>Born from the Earth. Crafted for Legacy.</h3>
          <p>
            Each gemstone within our collection is selected through a meticulous process
            that honours its natural origin, geological history, and intrinsic character.
            From its formation deep within the earth to its final setting, every stone
            carries a story that deserves reverence.
          </p>
          <p>
            Our purpose is not merely to trade in gemstones, but to preserve their legacy
            transforming exceptional natural treasures into enduring heirlooms.
          </p>
        </section>

        <section className="minskhi-story-media-card">
          <Image
            src="/wp-content/uploads/2026/03/membership.jpg"
            alt="Minskhi membership visual"
            width={1995}
            height={1024}
          />
        </section>

        <div className="minskhi-story-grid minskhi-story-legacy-grid">
          {legacyCards.map((card) => (
            <section className="minskhi-story-card" key={card.title}>
              <h3>{card.title}</h3>
              {card.paragraphs.map((paragraph, index) => (
                <p key={`${card.title}-${index}`}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>

        <section className="minskhi-story-card minskhi-story-toc">
          <h3>Contents</h3>
          <ol>
            {contents.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ol>
        </section>

        <article className="minskhi-story-article">
          <section className="minskhi-story-card minskhi-story-wide" id="family-house">
            <h3>A Family House, Built on Legacy</h3>
            <p className="minskhi-story-lead">Minskhi is, above all, a family house, not a corporation.</p>
            <p>
              Minskhi is a multigenerational enterprise built on reputation, accountability,
              and personal responsibility. Every gemstone is carefully sourced, assessed,
              and approved with direct family involvement, and every client relationship
              is nurtured with intention.
            </p>
            <p>
              Success for us is not defined by volume or short-term gain, but by trust
              sustained across generations.
            </p>
          </section>

          <section className="minskhi-story-card minskhi-story-wide" id="foundation">
            <h3>Foundation and Leadership</h3>
            <p>
              Minskhi is built upon the legacy of Dr. Siri Meewella, whose six decades
              of dedication to ethical gemstone trade established the intellectual and
              moral foundation of the house.
            </p>
            <p>
              Today, this legacy continues under the leadership of Kalana Meewella and
              Mary Meewella, combining generational expertise, market intelligence,
              scientific knowledge, and global vision.
            </p>
            <p>
              Together, they represent the evolution of Minskhi, preserving tradition
              while shaping its future on the world stage.
            </p>
          </section>

          <section className="minskhi-story-card minskhi-story-wide" id="category">
            <h3>A Category of Its Own</h3>
            <p>
              Minskhi occupies a rare position in the world of fine jewellery. We specialise
              in natural, certified, investment-grade coloured gemstones curated with
              discipline and restraint, where quality takes precedence over quantity,
              provenance over convenience, and permanence over popularity.
            </p>
            <p>
              From rare sapphires and collector-grade stones to bespoke jewellery and
              discreet private selections, each piece is chosen as a lasting asset.
            </p>
            <p>
              <strong>Our collections feature:</strong>
            </p>
            <ul className="minskhi-story-list">
              {collectionFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="minskhi-story-callout">
              <p>
                Many of our stones range from <strong>AUD $400</strong> to over{" "}
                <strong>$100,000</strong> and are sourced directly from origin through
                trusted networks.
              </p>
              <p className="minskhi-story-no">
                We do not engage in mass production.<br />
                We do not dilute rarity.<br />
                We do not compromise standards.
              </p>
              <p>Each acquisition is considered an investment in legacy.</p>
            </div>
          </section>

          <section className="minskhi-story-card minskhi-story-wide" id="experience">
            <h3>The Minskhi Experience</h3>
            <p className="minskhi-story-lead">True luxury is defined by experience, not transaction.</p>
            <p>
              At Minskhi, each client journey is guided with discretion, expertise, and
              care, from private consultations and bespoke design collaboration to
              transparent certification and lifetime advisory support.
            </p>
            <p>
              Our consultation-led approach ensures access to curated selections and
              personalised guidance, creating confidence in every decision.
            </p>
          </section>

          <section className="minskhi-story-card minskhi-story-wide" id="craftsmanship">
            <h3>Crafted with Australian Excellence</h3>
            <p>Minskhi proudly collaborates with Australian jewellers, lapidary experts, and master artisans.</p>
            <p>Through a network of highly skilled professionals, we preserve traditional craftsmanship while embracing innovation.</p>
            <p>Every creation reflects a balance of global refinement and local mastery, ensuring originality, precision, and enduring quality.</p>
          </section>

          <section className="minskhi-story-card minskhi-story-wide" id="integrity">
            <h3>Luxury with Integrity</h3>
            <p>Integrity is the foundation of Minskhi.</p>
            <p>Our commitment to responsible sourcing, fair trade, and environmental stewardship is embedded in every stage of our operations.</p>
            <p>Supporting conservation, community development, and ecological restoration is not an initiative, it is our responsibility.</p>
            <blockquote>For us, integrity is not a marketing concept. It is a professional obligation.</blockquote>
          </section>

          <section className="minskhi-story-card minskhi-story-wide" id="responsibility">
            <h3>Responsibility Beyond Jewellery</h3>
            <p>At Minskhi, every gemstone tells a story, not only of beauty and craftsmanship, but of responsibility.</p>
            <p>As a brand deeply connected to Sri Lanka’s gem lands, we believe the future of this industry must be built on sustainability, respect for nature, and meaningful support for the communities behind it.</p>
            <p>Reforestation is not a marketing initiative for us, it is our responsibility as a brand.</p>
          </section>

          <section className="minskhi-story-card minskhi-story-wide" id="chadstone">
            <h3>A Home Among the Finest</h3>
            <p>Our presence at Chadstone, Australia’s premier luxury destination, marks a natural extension of the Minskhi philosophy.</p>
            <p>Positioned within a world-class retail environment and supported by our Burwood headquarters, this location represents the beginning of our international journey.</p>
          </section>

          <section className="minskhi-story-card minskhi-story-wide" id="meaning">
            <h3>The Meaning of Minskhi</h3>
            <p>The name Minskhi carries both personal significance and ancient symbolism.</p>
            <p>It was first given by a close friend, an enduring memory that continues to shape the spirit of the brand.</p>
            <p>Its deeper meaning was later discovered within ancient Sumerian texts, where it reflects ideas of creation, light, continuity, and a connection to the earth.</p>
            <p>This union of personal origin and historical depth defines Minskhi, a quiet link between heritage and evolution, craftsmanship and appreciation, and the natural world and those who recognise its rarest expressions.</p>
          </section>

          <section className="minskhi-story-card minskhi-story-wide" id="heritage">
            <h3>A Heritage of Six Decades</h3>
            <p>Minskhi is built upon over sixty years of family involvement in the international gemstone industry.</p>
            <p>At its foundation is Dr. Siri Meewella, whose lifelong commitment to ethical trade, scientific evaluation, and uncompromising quality established a reputation recognised across global markets.</p>
            <p>Through direct engagement with miners, cutters, and merchants across Sri Lanka’s historic sapphire regions, he developed enduring relationships grounded in trust and technical precision.</p>
            <p>This legacy continues to shape the intellectual and ethical framework guiding Minskhi today.</p>
          </section>

          <section className="minskhi-story-card minskhi-story-wide" id="global">
            <h3>Tradition Meets Global Perspective</h3>
            <p>Rooted in heritage, Minskhi is guided by contemporary excellence and international standards.</p>
            <p>Mary Meewella, DGA-qualified and a candidate with the Gemmological Association of Great Britain, brings scientific discipline and global best practices into the brand.</p>
            <p>Minskhi is a registered member of Gem-A London, reflecting our commitment to professional integrity and continual advancement.</p>
            <p>This balance of generational knowledge and modern analytical precision ensures each gemstone is assessed holistically, considering beauty, rarity, structure, and long-term value.</p>
          </section>

          <section className="minskhi-story-card minskhi-story-wide" id="generations">
            <h3>A House Built for Generations</h3>
            <div className="minskhi-story-statement">
              <p><strong>Minskhi is not designed for seasons. It is designed for centuries.</strong></p>
              <p>
                Every gemstone is selected with intention.<br />
                Every creation is crafted with discipline.<br />
                Every relationship is built for life.
              </p>
              <p>
                We invite you to discover a world where rarity meets refinement and
                where extraordinary stones become eternal treasures.
              </p>
            </div>
          </section>
        </article>

        <section className="minskhi-story-cta">
          <h3>Shop Now</h3>
          <p>Discover rare gemstones, collector-grade pieces, and bespoke jewellery by Minskhi.</p>
          <Link href="/shop-2">Shop Now</Link>
        </section>
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
