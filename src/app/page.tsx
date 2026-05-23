import Image from "next/image";
import Link from "next/link";
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
      <section className="relative min-h-[312px] overflow-hidden bg-white text-white md:min-h-[867px] md:bg-ink">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/wp-content/uploads/revslider/video-media/Slider_1.jpeg"
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src="/wp-content/uploads/2026/03/Slider.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/70 md:bg-black/5" />
        <div className="relative hidden min-h-[867px] items-center justify-center px-6 pb-6 pt-[120px] text-center md:flex">
          <div className="mx-auto mt-[-34px] max-w-[980px]">
            <h1 className="font-[Bellefair,serif] text-[58px] font-normal uppercase leading-[0.98] tracking-[0.055em] text-white md:text-[88px] xl:text-[98px]">
              Sapphire
              <br />
              House of
              <br />
              Australia
            </h1>
            <p className="mx-auto mt-[22px] max-w-[940px] text-[18px] leading-[1.45] text-white">
              Discover rare Ceylon and globally ethically sourced sapphires, and exceptional coloured
              gemstones celebrated for their colour, brilliance, and timeless value.
            </p>
            <Link
              href="/shop-2"
              className="mt-[38px] inline-flex min-h-[70px] min-w-[193px] items-center justify-center bg-white px-10 text-[16px] font-semibold uppercase text-black transition hover:bg-coral hover:text-white"
            >
              Shop now
            </Link>
          </div>
        </div>
      </section>

      <section className="container-shell overflow-hidden py-11 md:py-16">
        <h2 className="mb-8 whitespace-nowrap text-center font-serif text-[34px] uppercase leading-none text-[rgb(9_46_43/var(--tw-bg-opacity,1))] md:mb-10 md:text-4xl">Latest discoveries</h2>
        <ProductGrid products={latest} />
      </section>

      <section className="container-shell grid gap-8 py-10 md:grid-cols-2">
        {featureTiles.map((tile) => (
          <Link href="/shop-2" className="group block" key={tile.title}>
            <div className="relative aspect-[1220/1320] overflow-hidden bg-linen">
              <Image
                src={tile.image}
                alt={tile.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="mt-5 grid min-h-[122px] gap-5 border-b border-[#e6ddd2] pb-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
              <div className="max-w-[520px]">
                <p className="text-[12px] uppercase tracking-[0.13em] text-[#7a716a]">{tile.eyebrow}</p>
                <h3 className="mt-3 font-serif text-[30px] leading-[1.08] text-ink md:text-[34px]">
                  {tile.title}
                </h3>
              </div>
              <span className="inline-flex h-[48px] min-w-[136px] items-center justify-center self-start bg-[#092E2B] px-7 text-[12px] uppercase tracking-[0.08em] text-white transition group-hover:bg-ink sm:mt-3">
                Shop now
              </span>
            </div>
          </Link>
        ))}
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
              image: "/wp-content/uploads/2026/04/9c4c20a5-43da-456a-a8e8-1b7b7a14e8a0.jpg"
            },
            {
              title: "ROYAL WEDDING",
              subtitle: "COLLECTION",
              href: "/collection",
              image: "/wp-content/uploads/2026/03/86766706-49a4-40b9-887f-4146ef2a9b84.jpg"
            },
            {
              title: "RAINBOW",
              subtitle: "COLLECTION",
              href: "/collection",
              image: "/wp-content/uploads/2026/03/ac6e170e-6130-4ac2-9fd4-47c2199c19cf.jpg"
            },
            {
              title: "MENS",
              subtitle: "COLLECTION",
              href: "/collection",
              image: "/wp-content/uploads/2026/04/eb59c115-b36f-42f7-9288-66d6cf0ea5ae.jpg"
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
        <ProductGrid products={rareStones} />
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
