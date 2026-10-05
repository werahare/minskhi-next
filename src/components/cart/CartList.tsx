"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { readCartItems, writeCartItems } from "@/lib/cart";
import { productImage } from "@/lib/images";
import { formatPrice, hasPrice, parsePrice } from "@/lib/products";
import type { CartItem, Product } from "@/lib/types";

export function CartList({ products }: { products: Product[] }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [checkoutError, setCheckoutError] = useState("");
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<"success" | "cancelled" | "">("");

  useEffect(() => {
    const update = () => setItems(readCartItems());
    update();
    const status = new URLSearchParams(window.location.search).get("checkout");
    if (status === "success" || status === "cancelled") setCheckoutStatus(status);
    window.addEventListener("storage", update);
    window.addEventListener("minskhi-cart-updated", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("minskhi-cart-updated", update);
    };
  }, []);

  const selected = useMemo(
    () =>
      items
        .map((item) => ({ item, product: products.find((product) => product.slug === item.slug) }))
        .filter(
          (entry): entry is { item: CartItem; product: Product } =>
            Boolean(entry.product && hasPrice(entry.product))
        ),
    [items, products]
  );

  const subtotal = selected.reduce(
    (total, { item, product }) => total + parsePrice(product) * item.quantity,
    0
  );

  function persist(next: CartItem[]) {
    setCheckoutError("");
    setItems(next);
    writeCartItems(next);
  }

  function remove(slug: string) {
    persist(items.filter((item) => item.slug !== slug));
  }

  async function checkout() {
    setCheckoutError("");
    setCheckingOut(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: selected.map(({ item }) => item) })
      });
      const result = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !result.url) {
        throw new Error(result.error || "Checkout could not be started.");
      }
      window.location.assign(result.url);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "Checkout could not be started.");
      setCheckingOut(false);
    }
  }

  if (!selected.length) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Products with a listed price can be added to your cart. Products without a price remain available by enquiry."
        actionHref="/collection"
        actionLabel="Browse collection"
      />
    );
  }

  return (
    <>
      {checkoutStatus === "success" ? (
        <div className="mb-8 border border-[#b8d8c5] bg-[#eef8f1] px-5 py-4 text-sm text-[#145c38]">
          You returned from Stripe Checkout. Stripe will confirm the payment by email.
        </div>
      ) : null}
      {checkoutStatus === "cancelled" ? (
        <div className="mb-8 border border-[#ddcfbf] bg-porcelain px-5 py-4 text-sm text-mink">
          Checkout was cancelled. Your cart is still available below.
        </div>
      ) : null}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          {selected.map(({ item, product }) => (
            <article
              className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 border border-[#ddcfbf] bg-white p-4 sm:grid-cols-[140px_minmax(0,1fr)_130px] sm:gap-6 sm:p-5"
              key={product.slug}
            >
              <Link className="relative aspect-square overflow-hidden bg-linen" href={`/product/${product.slug}`}>
                <Image
                  alt={product.name}
                  className="object-cover transition duration-500 hover:scale-105"
                  fill
                  sizes="140px"
                  src={productImage(product.mainImage)}
                />
              </Link>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.18em] text-gold">
                  {product.categories[0]?.replace(">", "/") ?? "Minskhi"}
                </p>
                <h2 className="minskhi-product-name mt-2 font-serif text-xl leading-tight">
                  <Link href={`/product/${product.slug}`}>{product.name}</Link>
                </h2>
                <p className="mt-2 text-xs text-mink">SKU {product.sku || "N/A"}</p>
                {product.lotSize ? (
                  <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-gold">
                    Complete lot of {product.lotSize} stones
                  </p>
                ) : null}
                <p className="mt-3 text-sm font-medium text-ink">{formatPrice(product)}</p>
              </div>
              <div className="col-span-2 flex items-end justify-between gap-4 border-t border-[#eee5da] pt-4 sm:col-span-1 sm:flex-col sm:items-stretch sm:justify-between sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                <div className="text-[10px] uppercase tracking-[0.14em] text-mink">
                  <p>{product.lotSize ? "One complete lot" : "Quantity 1"}</p>
                  <p className="mt-2 normal-case tracking-normal text-mink/80">Limit one per customer</p>
                </div>
                <div className="text-right sm:text-left">
                  <p className="text-base font-medium text-ink">
                    {new Intl.NumberFormat("en-AU", {
                      style: "currency",
                      currency: "AUD"
                    }).format(parsePrice(product) * item.quantity)}
                  </p>
                  <button
                    className="mt-2 text-[10px] uppercase tracking-[0.12em] text-mink underline underline-offset-4"
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
        <aside className="h-fit border border-[#ddcfbf] bg-porcelain p-6 lg:sticky lg:top-32">
          <h2 className="font-serif text-2xl">Order summary</h2>
          <div className="mt-6 flex justify-between border-b border-[#ddcfbf] pb-4 text-sm text-mink">
            <span>Subtotal</span>
            <span className="font-medium text-ink">
              {new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(subtotal)}
            </span>
          </div>
          <p className="mt-4 text-xs leading-6 text-mink">
            Prices are in AUD. Final payment details will be shown in Stripe Checkout.
          </p>
          <button
            className="mt-6 flex h-12 w-full items-center justify-center bg-ink px-5 text-xs uppercase tracking-[0.14em] text-white transition enabled:hover:bg-[#092E2B] disabled:cursor-wait disabled:opacity-60"
            disabled={checkingOut}
            onClick={checkout}
            type="button"
          >
            {checkingOut ? "Opening checkout…" : "Secure checkout"}
          </button>
          {checkoutError ? (
            <p className="mt-4 border border-[#e3b8b0] bg-[#fff4f1] p-3 text-xs leading-5 text-[#8b2d21]" role="alert">
              {checkoutError}
            </p>
          ) : null}
          <Link className="mt-4 block text-center text-xs uppercase tracking-[0.12em] text-mink" href="/collection">
            Continue shopping
          </Link>
        </aside>
      </div>
    </>
  );
}
