import Image from "next/image";
import Link from "next/link";
import type { JournalPost } from "@/content/journal/posts";

export function JournalCard({ post }: { post: JournalPost }) {
  return (
    <article className="group border border-[#e4d8ca] bg-white p-4 transition duration-500 hover:-translate-y-1 hover:border-[#b99f76] hover:shadow-[0_24px_70px_rgba(36,28,19,0.10)]">
      <Link href={`/journal/${post.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-[#f7f2eb]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="px-1 pb-1 pt-6">
      <p className="text-[11px] uppercase tracking-[0.2em] text-gold">{post.date}</p>
      <h2 className="mt-3 font-serif text-[24px] leading-tight text-[rgb(9_46_43/var(--tw-bg-opacity,1))]">
        <Link className="transition hover:text-gold" href={`/journal/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="mt-3 text-sm leading-7 text-mink">{post.excerpt}</p>
      <Link className="mt-5 inline-flex border-b border-[#b99f76] pb-1 text-xs uppercase tracking-[0.18em] text-ink transition hover:text-[#092E2B]" href={`/journal/${post.slug}`}>
        Read More
      </Link>
      </div>
    </article>
  );
}
