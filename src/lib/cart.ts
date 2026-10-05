import type { CartItem } from "./types";

export const cartStorageKey = "minskhi-cart";
export const maxCartQuantity = 1;

function normalizeCartItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];

  const quantities = new Map<string, number>();
  value.forEach((entry) => {
    if (!entry || typeof entry !== "object") return;
    const item = entry as Partial<CartItem>;
    if (typeof item.slug !== "string" || !item.slug.trim()) return;
    const quantity = Math.min(
      maxCartQuantity,
      Math.max(1, Math.floor(Number(item.quantity) || 1))
    );
    quantities.set(item.slug, Math.min(maxCartQuantity, (quantities.get(item.slug) ?? 0) + quantity));
  });

  return Array.from(quantities, ([slug, quantity]) => ({ slug, quantity }));
}

export function readCartItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return normalizeCartItems(JSON.parse(window.localStorage.getItem(cartStorageKey) ?? "[]"));
  } catch {
    return [];
  }
}

export function writeCartItems(items: CartItem[]) {
  const normalized = normalizeCartItems(items);
  window.localStorage.setItem(cartStorageKey, JSON.stringify(normalized));
  window.dispatchEvent(new Event("minskhi-cart-updated"));
}

export function addCartItem(slug: string) {
  const items = readCartItems();
  const existing = items.find((item) => item.slug === slug);
  if (existing) {
    existing.quantity = 1;
  } else {
    items.push({ slug, quantity: 1 });
  }
  writeCartItems(items);
}
