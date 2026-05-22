"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AddToEnquiryButton } from "@/components/enquiry/AddToEnquiryButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { productImage } from "@/lib/images";
import { readWishlistItems, writeWishlistItems } from "@/lib/wishlist";
import type { Product } from "@/lib/types";

export function WishlistList({ products }: { products: Product[] }) {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    setSlugs(readWishlistItems());
  }, []);

  const selected = useMemo(
    () =>
      slugs
        .map((slug) => products.find((product) => product.slug === slug))
        .filter((product): product is Product => Boolean(product)),
    [products, slugs]
  );

  function remove(slug: string) {
    const next = slugs.filter((item) => item !== slug);
    setSlugs(next);
    writeWishlistItems(next);
  }

  function clear() {
    setSlugs([]);
    writeWishlistItems([]);
  }

  if (!selected.length) {
    return (
      <EmptyState
        title="Your wishlist is empty"
        message="Save your favourite Minskhi gemstones and jewellery, then return here to review them."
        actionHref="/collection"
        actionLabel="Browse collection"
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="grid gap-5">
        {selected.map((product) => (
          <article
            className="grid gap-5 border border-[#ddcfbf] bg-white p-4 shadow-[0_18px_60px_rgba(36,28,19,0.05)] sm:grid-cols-[150px_minmax(0,1fr)] sm:p-5"
            key={product.slug}
          >
            <Link href={`/product/${product.slug}`} className="relative aspect-square overflow-hidden bg-[#fbfaf7]">
              <Image
                src={productImage(product.mainImage)}
                alt={product.name}
                fill
                sizes="150px"
                className="object-cover transition duration-700 hover:scale-105"
              />
            </Link>
            <div className="flex min-w-0 flex-col justify-between gap-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#9a8262]">
                  {product.categories[0]?.replace(">", "/") ?? "Minskhi"}
                </p>
                <h2 className="mt-3 font-serif text-2xl leading-tight text-ink">
                  <Link className="transition hover:text-[#092E2B]" href={`/product/${product.slug}`}>
                    {product.name}
                  </Link>
                </h2>
                <p className="mt-3 text-sm text-mink">{product.sku ? `SKU ${product.sku}` : "SKU available on enquiry"}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <AddToEnquiryButton slug={product.slug} className="min-w-[190px]" />
                <button
                  className="border border-[#ddcfbf] px-5 py-3 text-xs uppercase tracking-[0.12em] text-mink transition hover:border-[#092E2B] hover:text-[#092E2B]"
                  onClick={() => remove(product.slug)}
                  type="button"
                >
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <aside className="h-fit border border-[#ddcfbf] bg-white p-6">
        <h2 className="font-serif text-2xl text-ink">Wishlist</h2>
        <p className="mt-3 text-sm leading-7 text-mink">
          You have saved {selected.length} {selected.length === 1 ? "piece" : "pieces"}.
        </p>
        <Link
          href="/collection"
          className="mt-6 inline-flex w-full justify-center bg-ink px-5 py-3 text-xs uppercase tracking-[0.14em] text-white transition hover:bg-[#092E2B]"
        >
          Continue browsing
        </Link>
        <button
          className="mt-3 inline-flex w-full justify-center border border-ink px-5 py-3 text-xs uppercase tracking-[0.14em] text-ink transition hover:border-[#092E2B] hover:text-[#092E2B]"
          onClick={clear}
          type="button"
        >
          Clear wishlist
        </button>
      </aside>
    </div>
  );
}
