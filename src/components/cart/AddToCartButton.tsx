"use client";

import { useEffect, useState } from "react";
import { addCartItem, readCartItems } from "@/lib/cart";

export function AddToCartButton({
  slug,
  className = ""
}: {
  slug: string;
  className?: string;
}) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const update = () => setAdded(readCartItems().some((item) => item.slug === slug));
    update();
    window.addEventListener("minskhi-cart-updated", update);
    return () => window.removeEventListener("minskhi-cart-updated", update);
  }, [slug]);

  function add() {
    addCartItem(slug);
    setAdded(true);
  }

  return (
    <button
      aria-disabled={added}
      className={`border border-ink px-5 py-3 text-xs uppercase tracking-[0.12em] transition enabled:hover:bg-[#082e2b] enabled:hover:text-white disabled:cursor-not-allowed disabled:border-[#cfc7bd] disabled:bg-[#f3f0eb] disabled:text-[#8e8880] ${className}`}
      disabled={added}
      onClick={add}
      type="button"
    >
      {added ? "Added to cart" : "Add to cart"}
    </button>
  );
}
