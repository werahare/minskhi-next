"use client";

import { useEffect, useState } from "react";
import { isInWishlist, toggleWishlistItem } from "@/lib/wishlist";

export function WishlistButton({
  slug,
  label = false,
  className = ""
}: {
  slug: string;
  label?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(isInWishlist(slug));

    const update = () => setActive(isInWishlist(slug));
    window.addEventListener("storage", update);
    window.addEventListener("minskhi-wishlist-updated", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("minskhi-wishlist-updated", update);
    };
  }, [slug]);

  return (
    <button
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      className={`inline-flex items-center justify-center gap-2 border border-[#ddcfbf] bg-white text-ink transition hover:border-[#092E2B] hover:text-[#092E2B] ${className}`}
      onClick={() => setActive(toggleWishlistItem(slug))}
      type="button"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={label ? "h-4 w-4" : "h-5 w-5"}
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M20.4 5.6c-1.9-1.9-5-1.8-6.8.2L12 7.5l-1.6-1.7c-1.8-2-4.9-2.1-6.8-.2-2 2-1.9 5.3.2 7.4L12 21l8.2-8c2.1-2.1 2.2-5.4.2-7.4Z" />
      </svg>
      {label ? <span>{active ? "Saved to wishlist" : "Add to wishlist"}</span> : null}
    </button>
  );
}
