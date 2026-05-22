export const wishlistStorageKey = "minskhi-wishlist";

export function readWishlistItems(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const value = window.localStorage.getItem(wishlistStorageKey);
    const parsed = value ? (JSON.parse(value) as unknown) : [];
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function writeWishlistItems(slugs: string[]) {
  const unique = Array.from(new Set(slugs));
  window.localStorage.setItem(wishlistStorageKey, JSON.stringify(unique));
  window.dispatchEvent(new Event("minskhi-wishlist-updated"));
}

export function isInWishlist(slug: string) {
  return readWishlistItems().includes(slug);
}

export function toggleWishlistItem(slug: string) {
  const items = readWishlistItems();
  const exists = items.includes(slug);
  const next = exists ? items.filter((item) => item !== slug) : [...items, slug];
  writeWishlistItems(next);
  return !exists;
}
