import Image from "next/image";
import Link from "next/link";
import { HomeHeroVideo } from "@/components/home/HomeHeroVideo";
import { JournalCard } from "@/components/journal/JournalCard";
import { ProductGrid } from "@/components/product/ProductGrid";
import { journalPosts } from "@/content/journal/posts";
import { getProductBySlug, getProductsByCategory } from "@/lib/products";

const featureTiles = [
  {
    eyebrow: "Private Collection Event",
    title: "Necklace and Bracelets",
    image: "/wp-content/uploads/2026/01/2.jpg"
  },
  {
    eyebrow: "Limited Release",
    title: "Radiant Women’s Necklace Ensemble",
    image: "/wp-content/uploads/2026/01/Minskhi.jpg"
  }
];

export default function HomePage() {
  const latest = [
    "1-03-ct-pink-sapphire",
    "1-85-ct-garnet",
    "1-06-ct-unheated-blue-sapphire",
    "6-26-ct-yellow-beryl"
  ]
    .map((slug) => getProductBySlug(slug))
    .filter((product) => product !== undefined);
  const rareStones = getProductsByCategory("gemstones").slice(12, 20);

  return (
    <>
      <section className="relative h-[100svh] min-h-[100svh] overflow-hidden bg-ink text-white md:h-auto md:min-h-[867px]">
        <HomeHeroVideo />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.02)_42%,rgba(0,0,0,0.12)_100%)] md:bg-black/5" />
        <div className="absolute inset-0 z-10 flex items-center justify-center px-5 pt-14 text-center md:relative md:min-h-[867px] md:px-6 md:pb-6 md:pt-[120px]">
          <div className="mx-auto w-full max-w-[360px] md:mt-[-34px] md:max-w-[980px]">
            <h1 className="minskhi-home-hero-title text-[44px] font-normal uppercase leading-[0.98] tracking-[0.045em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.28)] md:text-[88px] md:tracking-[0.055em] md:drop-shadow-none xl:text-[98px]">
              Sapphire
              <br />
              House of
              <br />
              Australia
            </h1>
            <p className="mx-auto mt-5 max-w-[350px] text-[13px] leading-[1.55] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] md:mt-[22px] md:max-w-[940px] md:text-[18px] md:leading-[1.45] md:drop-shadow-none">
              Discover rare Ceylon and globally ethically sourced sapphires, and exceptional coloured
              gemstones celebrated for their colour, brilliance, and timeless value.
            </p>
            <Link
              href="/shop-2"
              className="mt-6 inline-flex min-h-[46px] min-w-[146px] items-center justify-center bg-white px-7 text-[12px] font-semibold uppercase text-black transition hover:bg-coral hover:text-white md:mt-[38px] md:min-h-[70px] md:min-w-[193px] md:px-10 md:text-[16px]"
            >
              Shop now
            </Link>
          </div>
        </div>
      </section>

      <section className="container-shell overflow-hidden py-10 md:py-16">
        <h2 className="mb-7 whitespace-nowrap text-center font-serif text-[34px] uppercase leading-none text-[rgb(9_46_43/var(--tw-bg-opacity,1))] md:mb-10 md:text-4xl">Latest discoveries</h2>
        <ProductGrid products={latest} desktopColumns={4} />
      </section>

      <section className="bg-white py-12 text-center md:py-14">
        <div className="container-shell">
          <h2 className="font-serif text-4xl uppercase text-[rgb(9_46_43/var(--tw-bg-opacity,1))]">
            Signature collection
          </h2>
        </div>
        <div className="mx-auto mt-9 grid max-w-[1180px] gap-x-8 gap-y-9 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "MINSKHI",
              subtitle: "COLLECTION",
              href: "/collection",
              image: "/wp-content/uploads/2026/08/signature-minskhi-collection.png"
            },
            {
              title: "ROYAL WEDDING",
              subtitle: "COLLECTION",
              href: "/collection",
              image: "/wp-content/uploads/2026/08/signature-wedding-collection.png"
            },
            {
              title: "RAINBOW",
              subtitle: "COLLECTION",
              href: "/collection",
              image: "/wp-content/uploads/2026/08/signature-rainbow-collection.png"
            },
            {
              title: "MENS",
              subtitle: "COLLECTION",
              href: "/collection",
              image: "/wp-content/uploads/2026/08/signature-mens-collection.png"
            }
          ].map((item) => (
            <Link href={item.href} key={item.title} className="group mx-auto w-full max-w-[255px] text-center">
              <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-full bg-[#f6f2ec]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1280px) 255px, (min-width: 768px) 36vw, 78vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-5">
                <h3 className="text-[18px] uppercase leading-tight tracking-[0.02em] text-black">{item.title}</h3>
                <p className="mt-2 text-[14px] uppercase tracking-[0.04em] text-[#4f4f4f]">{item.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-shell py-10">
        <div className="relative mb-12 min-h-[360px] overflow-hidden bg-linen">
          <Image
            src="/wp-content/uploads/2026/01/m1_banner_03-copy.jpg"
            alt="rare stones"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <h2 className="font-serif text-4xl uppercase text-white">rare stones</h2>
          </div>
        </div>
        <ProductGrid products={rareStones} desktopColumns={4} />
      </section>

      <section className="container-shell py-20">
        <h2 className="mb-10 font-serif text-4xl uppercase text-[rgb(9_46_43/var(--tw-bg-opacity,1))]">Our blog</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {journalPosts.map((post) => (
            <JournalCard post={post} key={post.slug} />
          ))}
        </div>
      </section>
    </>
  );
}
