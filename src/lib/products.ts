import rawProducts from "@/data/products.json";
import { siteConfig } from "@/config/site";
import type { Product, SortKey } from "./types";
import { fallbackProductImage } from "./images";
import { normalizeAttributeLabel } from "./filters";

type RawProduct = {
  id?: string | number;
  hidden?: boolean;
  slug?: string;
  name?: string;
  lotSize?: number;
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

function inferGemTypeFromName(name: string) {
  const rules: Array<[RegExp, string]> = [
    [/\bstar sapphire\b/i, "Star Sapphire"],
    [/\bblue sapphires?\b/i, "Blue Sapphire"],
    [/\bpink sapphires?\b/i, "Pink Sapphires"],
    [/\bpadparadscha\b/i, "Padparadscha"],
    [/\baquamarine\b/i, "Aquamarine"],
    [/\bchrysoberyl\b/i, "Chrysoberyl"],
    [/\brutile quartz\b/i, "Rutile Quartz"],
    [/\brutile\b/i, "Rutile"],
    [/\btourmaline\b/i, "Tourmaline"],
    [/\bmoonstone\b/i, "Moonstone"],
    [/\bcitrine\b/i, "Citrine"],
    [/\bgarnet\b/i, "Garnet"],
    [/\bspinel\b/i, "Spinel"],
    [/\bzircon\b/i, "Zircon"],
    [/\btopaz\b/i, "Topaz"],
    [/\bberyl\b/i, "Beryl"],
    [/\bquartz\b/i, "Quartz"],
    [/\bruby\b/i, "Ruby"],
    [/\bsapphires?\b/i, "Sapphire"]
  ];

  return rules.find(([pattern]) => pattern.test(name))?.[1] ?? null;
}

function normalizeGemType(value: string, productName: string) {
  const inferredGemType = inferGemTypeFromName(productName);
  if (inferredGemType) return inferredGemType;

  const gemType = value.trim().replace(/\s+/g, " ").toLowerCase();
  if (
    gemType === "blue sapphire" ||
    gemType === "blue sapphire unheated" ||
    gemType === "blue sapphires unheated"
  ) {
    return "Blue Sapphire";
  }
  return value;
}

function normalizeProductName(value: string) {
  const collapsed = value
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\bGreeen\b/gi, "Green")
    .replace(/\bSapphire\b/gi, "Sapphire")
    .replace(/\bSapphires\b/gi, "Sapphires");
  const weightedName = collapsed.match(/^(\d+(?:\.\d+)?)\s*ct\.?\s+(.+)$/i);
  if (!weightedName) return collapsed;

  const carat = Number(weightedName[1]).toFixed(2);
  let productName = weightedName[2];
  const trailingTreatment = productName.match(/\s+(Unheated|Heated|Natural)$/i);
  if (trailingTreatment) {
    const treatment = `${trailingTreatment[1][0].toUpperCase()}${trailingTreatment[1]
      .slice(1)
      .toLowerCase()}`;
    productName = `${treatment} ${productName.slice(0, trailingTreatment.index).trim()}`;
  }

  return `${carat} ct. ${productName}`;
}

const unheatedGemTypes = new Set([
  "aquamarine",
  "beryl",
  "garnet",
  "quartz",
  "rutile quartz",
  "spinel",
  "zircon"
]);

function requiresUnheatedTreatment(gemType: string) {
  return unheatedGemTypes.has(gemType.trim().toLowerCase());
}

function ensureUnheatedProductName(name: string) {
  if (/\bunheated\b/i.test(name)) return name;
  if (/\b(?:heated|natural)\b/i.test(name)) {
    return name.replace(/\b(?:heated|natural)\b/i, "Unheated");
  }

  const weightedName = name.match(/^(\d+(?:\.\d+)?)\s*ct\.\s+(.+)$/i);
  return weightedName
    ? `${weightedName[1]} ct. Unheated ${weightedName[2]}`
    : `Unheated ${name}`;
}

function normalizeProduct(product: RawProduct): Product {
  const images = (
    product.images ??
    product.galleryImages ??
    (product.mainImage ? [product.mainImage] : [])
  ).filter(Boolean);
  const slug = product.slug ?? "";
  let name = normalizeProductName(product.name ?? "Untitled product");
  const attributes = (product.attributes ?? [])
    .filter((attribute) => attribute.name && attribute.value)
    .map((attribute) => ({
      name: String(attribute.name),
      value:
        String(attribute.name).trim().toLowerCase() === "gem type"
          ? normalizeGemType(String(attribute.value), name)
          : String(attribute.value)
    }));

  const inferredGemType = inferGemTypeFromName(name);
  if (
    inferredGemType &&
    !attributes.some((attribute) => attribute.name.trim().toLowerCase() === "gem type")
  ) {
    attributes.push({ name: "Gem Type", value: inferredGemType });
  }

  if (/\bunheated\b/i.test(name)) {
    const treatment = attributes.find(
      (attribute) => normalizeAttributeLabel(attribute.name) === "Treatment"
    );
    if (treatment) treatment.value = "Unheated";
    else attributes.push({ name: "Treatment", value: "Unheated" });
  }

  const gemType = attributes.find(
    (attribute) => attribute.name.trim().toLowerCase() === "gem type"
  )?.value;
  if (gemType && requiresUnheatedTreatment(gemType)) {
    const treatment = attributes.find(
      (attribute) => normalizeAttributeLabel(attribute.name) === "Treatment"
    );
    if (treatment) treatment.value = "Unheated";
    else attributes.push({ name: "Treatment", value: "Unheated" });
    name = ensureUnheatedProductName(name);
  }

  return {
    id: String(product.id ?? slug),
    slug,
    name,
    lotSize: product.lotSize,
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
    attributes,
    stockStatus: product.metadata?.stock || "Available for enquiry",
    dateCreated: product.dateCreated ?? "",
    relatedProductIds: [],
    originalWooCommerceUrl: `${siteConfig.url}/product/${slug}/`
  };
}

function hasVisibleProductImage(product: RawProduct) {
  const categories = product.categories ?? [];
  const isCarving = categories.some((category) => category.toLowerCase().includes("carving"));
  return Boolean(
    isCarving ||
      product.mainImage ||
      product.images?.some(Boolean) ||
      product.galleryImages?.some(Boolean)
  );
}

export const products: Product[] = (rawProducts as RawProduct[])
  .filter((product) => !product.hidden)
  // Hide placeholder-image products until their real images are added.
  .filter(hasVisibleProductImage)
  .map(normalizeProduct);

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

function isMineralProduct(product: Product) {
  return product.categories.some((item) => {
    const lower = item.toLowerCase();
    return lower.includes("mineral") || lower.includes("carving");
  });
}

export function getProductsByCategory(category: "gemstones" | "jewellery" | "minerals") {
  const key = category.toLowerCase();
  if (key === "minerals") {
    return products.filter(isMineralProduct);
  }
  if (key === "gemstones") {
    return products.filter((product) =>
      !isMineralProduct(product) &&
      product.categories.some((item) => item.toLowerCase().includes("gemstone"))
    );
  }
  return products.filter((product) =>
    product.categories.some((item) => item.toLowerCase().includes(key.slice(0, -1)))
  );
}

export function getRelatedProducts(product: Product, count = 4) {
  if (isMineralProduct(product)) {
    return products
      .filter((candidate) => candidate.id !== product.id)
      .filter(isMineralProduct)
      .slice(0, count);
  }

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
