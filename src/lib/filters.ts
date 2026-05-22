import type { Product } from "./types";

export const gemstoneFilterNames = [
  "Colour",
  "Carat / Weight",
  "Gem Type",
  "Shape / Cut",
  "Treatment"
];

export const jewelleryFilterNames = [
  "Gem Type",
  "Material",
  "Size",
  "Colour",
  "Weight (ct)",
  "Treatment"
];

const caratWeightBuckets = ["0-1", "1-2", "2-3", "3-4", "4-5", "5 +"];

function getCaratWeightValue(value: string): number | null {
  const match = value.trim().match(/[0-9]+(?:\.[0-9]+)?/);
  if (!match) return null;
  return Number(match[0]);
}

function getCaratWeightBucket(value: string): string | null {
  const numberValue = getCaratWeightValue(value);
  if (numberValue === null || Number.isNaN(numberValue)) return null;
  if (numberValue < 1) return "0-1";
  if (numberValue < 2) return "1-2";
  if (numberValue < 3) return "2-3";
  if (numberValue < 4) return "3-4";
  if (numberValue < 5) return "4-5";
  return "5 +";
}

export function uniqueAttributeValues(products: Product[], attributeNames: string[]) {
  // Normalize the allowed attribute names so variants map to the same group
  const allowedNormalized = new Set(attributeNames.map((name) => normalizeAttributeLabel(name).toLowerCase()));
  const groups = new Map<string, Map<string, string>>();

  products.forEach((product) => {
    product.attributes.forEach((attribute) => {
      const normalizedLabel = normalizeAttributeLabel(attribute.name);
      if (!allowedNormalized.has(normalizedLabel.toLowerCase())) return;
      const key = normalizedLabel; // canonical label
      const valueMap = groups.get(key) ?? new Map<string, string>();
      if (key === "Carat / Weight") {
        const bucket = getCaratWeightBucket(attribute.value);
        if (bucket) valueMap.set(bucket, bucket);
      } else {
        const normVal = normalizeValueForKey(attribute.value, attribute.name);
        // store the first-seen display value for this normalized key
        if (!valueMap.has(normVal)) valueMap.set(normVal, formatAttributeValue(attribute.value));
      }
      groups.set(key, valueMap);
    });
  });
 
  return Array.from(groups.entries()).map(([name, values]) => ({
    name,
    values:
      name === "Carat / Weight"
        ? caratWeightBuckets
        : Array.from(values.values()).sort((a, b) => a.localeCompare(b)).slice(0, 40)
  }));
}

export function normalizeAttributeLabel(label: string) {
  const lower = label.toLowerCase();
  if (lower.includes("shape")) return "Shape / Cut";
  if (lower.includes("trans")) return "Transparency";
  if (lower.includes("measurement")) return "Measurement";
  if (lower.includes("carat") || lower.includes("weight")) return "Carat / Weight";
  if (lower.includes("certificate")) return "Certification";
  if (lower.includes("treat")) return "Treatment";
  return label;
}

export function formatAttributeValue(value: string) {
  const trimmed = String(value ?? "").trim();
  if (trimmed.toLowerCase() === "heated") return "Heated";
  if (trimmed.toLowerCase() === "unheated") return "Unheated";
  return trimmed;
}

function normalizeValueForKey(value: string, keyLabel: string) {
  let v = String(value ?? "").trim();
  // collapse whitespace
  v = v.replace(/\s+/g, " ");
  // normalize spaces around slashes
  v = v.replace(/\s*\/\s*/g, "/");
  // lower for comparison
  v = v.toLowerCase();
  // some keys need special handling
  if (keyLabel.toLowerCase().includes("treat")) {
    if (v === "heated") return "heated";
    if (v === "unheated") return "unheated";
  }
  if (keyLabel.toLowerCase().includes("shape")) {
    // remove the word 'cut' which is often inconsistent
    v = v.replace(/\bcut\b/g, "");
    v = v.replace(/\s+/g, " ").trim();
  }
  return v;
}

export function productMatchesFilters(product: Product, params: URLSearchParams) {
  const query = params.get("q")?.toLowerCase().trim();
  if (query && !`${product.name} ${product.sku}`.toLowerCase().includes(query)) {
    return false;
  }

  // Price range handling (price_min, price_max)
  const priceMin = params.get("price_min");
  const priceMax = params.get("price_max");
  if (priceMin || priceMax) {
    const p = parseFloat(product.price || "0") || 0;
    if (priceMin) {
      const min = parseFloat(priceMin);
      if (!Number.isNaN(min) && p < min) return false;
    }
    if (priceMax) {
      const max = parseFloat(priceMax);
      if (!Number.isNaN(max) && p > max) return false;
    }
  }

  for (const [key, value] of params.entries()) {
    if (["q", "sort", "count", "page", "price_min", "price_max"].includes(key) || !value) continue;
    const requestedValues = value.split(",").map((part) => part.toLowerCase());
    const matched = product.attributes.some((attribute) => {
      const normalizedLabel = normalizeAttributeLabel(attribute.name);
      const label = normalizedLabel.toLowerCase();
      if (label !== key.toLowerCase()) return false;
      if (label === "carat / weight") {
        const bucket = getCaratWeightBucket(attribute.value);
        return bucket ? requestedValues.includes(bucket.toLowerCase()) : false;
      }
      const normalizedAttr = normalizeValueForKey(attribute.value, attribute.name);
      return requestedValues.some((rv) => normalizeValueForKey(rv, attribute.name) === normalizedAttr);
    });
    if (!matched) return false;
  }

  return true;
}
