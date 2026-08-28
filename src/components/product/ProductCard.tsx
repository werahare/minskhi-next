import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getAttribute } from "@/lib/products";
import { fallbackProductImage, productImage } from "@/lib/images";
import { getProductVideos } from "@/lib/product-videos";
import type { Product } from "@/lib/types";
import { AddToEnquiryButton } from "@/components/enquiry/AddToEnquiryButton";
import { WishlistButton } from "@/components/wishlist/WishlistButton";

export function ProductCard({ product }: { product: Product }) {
  const gemType = getAttribute(product, ["Gem Type"]);
  const videos = getProductVideos(product.slug);
  const useVideoThumbnail =
    product.mainImage === fallbackProductImage && videos.length > 0;

  return (
    <article className="group relative border border-[#dfd1c0] bg-white p-2 text-center transition duration-500 before:pointer-events-none before:absolute before:inset-1 before:border before:border-[#f3eee8] before:content-[''] hover:-translate-y-1 hover:border-[#b99f76] hover:shadow-[0_24px_70px_rgba(36,28,19,0.10)] sm:p-4 sm:before:inset-2">
      <WishlistButton
        slug={product.slug}
        className="absolute right-4 top-4 z-20 h-8 w-8 rounded-full border-[#e8dccf] bg-white/90 shadow-[0_12px_34px_rgba(36,28,19,0.10)] backdrop-blur sm:right-7 sm:top-7 sm:h-10 sm:w-10"
      />
      <Link href={`/product/${product.slug}`} className="relative block overflow-hidden bg-[#fbfaf7]">
        <span className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.12),transparent_62%)] opacity-0 transition duration-500 group-hover:opacity-100" />
        <div className="relative aspect-[700/798]">
          {useVideoThumbnail ? (
            <video
              aria-label={`${product.name} video thumbnail`}
              autoPlay
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              loop
              muted
              playsInline
              preload="metadata"
              src={videos[0]}
            />
          ) : (
            <Image
              src={productImage(product.mainImage)}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          )}
        </div>
        <span className="absolute inset-x-8 bottom-7 z-20 hidden translate-y-3 bg-white/95 px-4 py-3 text-[11px] uppercase tracking-[0.16em] opacity-0 shadow-[0_18px_40px_rgba(36,28,19,0.12)] transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:block">
          View details
        </span>
      </Link>
      <div className="relative px-1 pb-1 pt-4 sm:px-2 sm:pt-7">
        <p className="truncate text-[9px] uppercase tracking-[0.13em] text-[#9a8262] sm:text-[12px] sm:tracking-[0.2em]">
          {gemType ?? product.categories[0]?.replace(">", "/") ?? "Minskhi"}
        </p>
        <h3 className="minskhi-product-name mx-auto mt-2 min-h-[2.75rem] max-w-[280px] leading-snug text-[#111] sm:mt-4 sm:min-h-12">
          <Link className="transition hover:text-[#092E2B]" href={`/product/${product.slug}`}>
            {product.name}
          </Link>
        </h3>
        {product.lotSize ? (
          <p className="mt-1 text-[8px] uppercase tracking-[0.1em] text-[#9a8262] sm:text-[10px] sm:tracking-[0.16em]">
            Lot of <span className="font-semibold text-[#111]">{product.lotSize}</span>
          </p>
        ) : null}
        {siteConfig.showPrices && product.price ? (
          <p className="mt-2 text-sm">${product.price}</p>
        ) : null}
        <AddToEnquiryButton
          slug={product.slug}
          className="mt-3 w-full !px-1 !py-2 !text-[8px] !tracking-[0.04em] hover:border-coral hover:bg-coral sm:mt-4 sm:!px-5 sm:!py-3 sm:!text-xs sm:!tracking-[0.12em]"
        />
      </div>
    </article>
  );
}
