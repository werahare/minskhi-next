export const fallbackProductImage = "/assets/fallback-product.svg";

export function productImage(src?: string) {
  if (!src) return fallbackProductImage;
  return src;
}
