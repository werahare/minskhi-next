import rawProducts from "@/data/products.json";
import { siteConfig } from "@/config/site";
import type { Product, SortKey } from "./types";
import { fallbackProductImage } from "./images";
import { normalizeAttributeLabel } from "./filters";

type RawProduct = {
  id?: string | number;
  slug?: string;
  name?: string;
  sku?: string;
  short?: string;
  description?: string;
  price?: string;
  regularPrice?: string;
  salePrice?: string;
  categories?: string[];
  tags?: string[];
  mainImage?: string;
  galleryImages?: string[];
  images?: string[];
  attributes?: { name?: string; value?: string }[];
  metadata?: { stock?: string };
  dateCreated?: string;
};

function normalizeCategoryPath(category: string) {
  const parts = category
    .split(">")
    .map((segment, index) => {
      const trimmed = segment.trim();
      if (!trimmed) return "";
      const lower = trimmed.toLowerCase();
      if (index === 0) {
        if (lower.includes("gemstone")) return "Gemstones";
        if (lower.includes("jewellery") || lower.includes("jewelry")) return "Jewellery";
        if (lower.includes("mineral")) return "Minerals";
      }
      return trimmed.replace(/\s+/g, " ");
    })
    .filter(Boolean);
  return parts.join(" > ");
}

function normalizeProduct(product: RawProduct): Product {
  const images = (
    product.images ??
    product.galleryImages ??
    (product.mainImage ? [product.mainImage] : [])
  ).filter(Boolean);
  const slug = product.slug ?? "";

  return {
    id: String(product.id ?? slug),
    slug,
    name: product.name ?? "Untitled product",
    sku: product.sku ?? "",
    categories: (product.categories ?? []).map(normalizeCategoryPath),
    tags: product.tags ?? [],
    price: product.price ?? "",
    regularPrice: product.regularPrice ?? product.price ?? "",
    salePrice: product.salePrice ?? "",
    shortDescription: product.short ?? "",
    description: product.description ?? "",
    mainImage: images[0] ?? fallbackProductImage,
    galleryImages: images,
    attributes: (product.attributes ?? [])
      .filter((attribute) => attribute.name && attribute.value)
      .map((attribute) => ({
        name: String(attribute.name),
        value: String(attribute.value)
      })),
    stockStatus: product.metadata?.stock || "Available for enquiry",
    dateCreated: product.dateCreated ?? "",
    relatedProductIds: [],
    originalWooCommerceUrl: `${siteConfig.url}/product/${slug}/`
  };
}

function hasVisibleProductImage(product: RawProduct) {
  return Boolean(product.mainImage || product.images?.some(Boolean) || product.galleryImages?.some(Boolean));
}

export const products: Product[] = (rawProducts as RawProduct[])
  // Hide placeholder-image products until their real images are added.
  .filter(hasVisibleProductImage)
  .map(normalizeProduct);

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: "gemstones" | "jewellery" | "minerals") {
  const key = category.toLowerCase();
  if (key === "minerals") {
    return products.filter((product) =>
      product.categories.some((item) => {
        const lower = item.toLowerCase();
        return lower.includes("mineral") || lower.includes("carving");
      })
    );
  }
  if (key === "gemstones") {
    return products.filter((product) =>
      product.categories.some((item) => {
        const lower = item.toLowerCase();
        return lower.includes("gemstone") && !lower.includes("carving");
      })
    );
  }
  return products.filter((product) =>
    product.categories.some((item) => item.toLowerCase().includes(key.slice(0, -1)))
  );
}

export function getRelatedProducts(product: Product, count = 4) {
  const primary = product.categories[0]?.split(">")[0]?.trim().toLowerCase();
  return products
    .filter((candidate) => candidate.id !== product.id)
    .filter((candidate) =>
      primary
        ? candidate.categories.some((category) => category.toLowerCase().includes(primary))
        : true
    )
    .slice(0, count);
}

export function getAttribute(product: Product, names: string[]) {
  const normalized = names.map((name) => normalizeAttributeLabel(name).toLowerCase());
  return product.attributes.find((attribute) =>
    normalized.includes(normalizeAttributeLabel(attribute.name).toLowerCase())
  )?.value;
}

export function parsePrice(product: Product) {
  const price = Number.parseFloat(product.price || product.regularPrice || "0");
  return Number.isFinite(price) ? price : 0;
}

export function sortProducts(input: Product[], sort: SortKey) {
  const list = [...input];
  if (sort === "latest") {
    return list.reverse();
  }
  if (sort === "price-asc") {
    return list.sort((a, b) => parsePrice(a) - parsePrice(b));
  }
  if (sort === "price-desc") {
    return list.sort((a, b) => parsePrice(b) - parsePrice(a));
  }
  if (sort === "popularity") {
    return list.sort((a, b) => b.galleryImages.length - a.galleryImages.length);
  }
  return list;
}
