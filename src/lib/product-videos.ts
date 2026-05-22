import rawProductVideos from "@/data/product-videos.json";

const productVideos = rawProductVideos as Record<string, string[]>;

export function getProductVideos(slug: string) {
  return productVideos[slug] ?? [];
}
