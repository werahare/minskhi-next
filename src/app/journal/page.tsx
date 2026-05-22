import { JournalCard } from "@/components/journal/JournalCard";
import { journalPosts } from "@/content/journal/posts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Journal", "Minskhi gemstone and jewellery journal.", "/journal");

export default function JournalPage() {
  return (
    <section className="container-shell py-14">
      <div className="mb-12 border-b border-[#ddcfbf] pb-12 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Journal</p>
        <h1 className="mt-3 font-serif text-5xl">Journal</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-mink">
          Stories of colour, origin, and craft from the world of Minskhi gemstones and jewellery.
        </p>
      </div>
      <div className="mt-12 grid gap-9 md:grid-cols-3">
        {journalPosts.map((post) => (
          <JournalCard post={post} key={post.slug} />
        ))}
      </div>
    </section>
  );
}
