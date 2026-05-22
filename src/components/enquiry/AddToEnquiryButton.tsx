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
    const items = readEnquiryItems();
    const existing = items.find((item) => item.slug === slug);
    const next = existing
      ? items.map((item) =>
          item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...items, { slug, quantity: 1 }];
    writeEnquiryItems(next);
    setAdded(true);
  }

  return (
    <button
      className={`border border-ink px-5 py-3 text-xs uppercase tracking-[0.12em] transition hover:bg-[#082e2b] hover:text-white ${className}`}
      onClick={add}
      type="button"
    >
      {added ? "Add Again" : "Add to Enquire List"}
    </button>
  );
}
