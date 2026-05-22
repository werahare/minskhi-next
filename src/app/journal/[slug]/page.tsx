import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getJournalPost, journalPosts } from "@/content/journal/posts";

const journalSubheadings = new Set([
  "Minskhi Journal",
  "Luxury is shifting from standardisation to individuality",
  "Colour becomes identity",
  "The science behind sapphires and rubies",
  "Treatments and trust",
  "Origin shapes personality",
  "Natural gemstones in a world of replicas",
  "A colour formed by pressure",
  "Rarity, identity, and the Tender",
  "A finite natural treasure",
  "Stewardship and responsible closure",
  "A shared legacy with Sri Lanka",
  "Authenticity in a synthetic era",
  "Why the current system is falling behind",
  "What global leadership looks like today",
  "2026–2030: a window of opportunity",
  "Key priorities for reform",
  "Institutional transformation matters",
  "Education and industry collaboration",
  "Reform as stewardship, not criticism"
]);

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image]
    }
  };
}

export default async function JournalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  return (
    <article className="container-shell py-12">
      <Breadcrumbs items={[{ label: "Journal", href: "/journal" }, { label: post.title }]} />
      <header className="mx-auto mt-8 max-w-4xl text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-gold">Journal / {post.date}</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-[rgb(9_46_43/var(--tw-bg-opacity,1))]">
          {post.title}
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-mink">{post.excerpt}</p>
      </header>
      <div className="relative mt-12 aspect-[16/8] overflow-hidden border border-[#e4d8ca] bg-[#eee4d8] p-3">
        <div className="relative h-full w-full overflow-hidden">
        <Image src={post.image} alt={post.title} fill priority sizes="100vw" className="object-cover" />
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-3xl border-y border-[#ddcfbf] py-10">
        <div className="rich-text">
          {post.content.map((paragraph) =>
            journalSubheadings.has(paragraph) ? (
              <h2 className="mt-10 font-serif text-3xl text-[rgb(9_46_43/var(--tw-bg-opacity,1))]" key={paragraph}>
                {paragraph}
              </h2>
            ) : paragraph.includes("•") ? (
              <p className="text-xs uppercase tracking-[0.18em] text-gold" key={paragraph}>
                {paragraph}
              </p>
            ) : (
              <p key={paragraph}>{paragraph}</p>
            )
          )}
        </div>
      </div>
    </article>
  );
}
