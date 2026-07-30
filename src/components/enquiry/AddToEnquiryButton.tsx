"use client";

import { useEffect, useState } from "react";
import { readEnquiryItems, writeEnquiryItems } from "@/lib/enquiry";

export function AddToEnquiryButton({
  slug,
  className = ""
}: {
  slug: string;
  className?: string;
}) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setAdded(readEnquiryItems().some((item) => item.slug === slug));
  }, [slug]);

  function add() {
    if (added) return;

    const items = readEnquiryItems();
    if (items.some((item) => item.slug === slug)) {
      setAdded(true);
      return;
    }

    writeEnquiryItems([...items, { slug, quantity: 1 }]);
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
      Add to Enquire List
    </button>
  );
}
