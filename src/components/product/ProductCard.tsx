import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getAttribute } from "@/lib/products";
import { productImage } from "@/lib/images";
import type { Product } from "@/lib/types";
import { AddToEnquiryButton } from "@/components/enquiry/AddToEnquiryButton";

export function ProductCard({ product }: { product: Product }) {
  const gemType = getAttribute(product, ["Gem Type"]);

  return (
    <article className="group relative border border-[#dfd1c0] bg-white p-4 text-center transition duration-500 before:pointer-events-none before:absolute before:inset-2 before:border before:border-[#f3eee8] before:content-[''] hover:-translate-y-1 hover:border-[#b99f76] hover:shadow-[0_24px_70px_rgba(36,28,19,0.10)]">
      <Link href={`/product/${product.slug}`} className="relative block overflow-hidden bg-[#fbfaf7]">
        <span className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.12),transparent_62%)] opacity-0 transition duration-500 group-hover:opacity-100" />
        <div className="relative aspect-[700/798]">
          <Image
            src={productImage(product.mainImage)}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
        <span className="absolute inset-x-8 bottom-7 z-20 translate-y-3 bg-white/95 px-4 py-3 text-[11px] uppercase tracking-[0.16em] opacity-0 shadow-[0_18px_40px_rgba(36,28,19,0.12)] transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          View details
        </span>
      </Link>
      <div className="relative px-2 pb-1 pt-7">
        <p className="text-[12px] uppercase tracking-[0.2em] text-[#9a8262]">
          {gemType ?? product.categories[0]?.replace(">", "/") ?? "Minskhi"}
        </p>
        <h3 className="mx-auto mt-4 min-h-12 max-w-[280px] text-[17px] leading-snug text-[#111]">
          <Link className="transition hover:text-[#092E2B]" href={`/product/${product.slug}`}>
            {product.name}
          </Link>
        </h3>
        {siteConfig.showPrices && product.price ? (
          <p className="mt-2 text-sm">${product.price}</p>
        ) : null}
        <AddToEnquiryButton
          slug={product.slug}
          className="mt-4 w-full border-[#e9e9e9] hover:border-coral hover:bg-coral"
        />
      </div>
    </article>
  );
}
