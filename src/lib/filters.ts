import type { Product } from "./types";

export const colourFilterValues = [
  "Bi colour", "Blue", "Black", "Brown", "Green", "Lavendra", "Multi colour",
  "Orange", "Purple", "Pink", "Red", "Violet", "White", "Yellow"
];

export function getColourFilterValues(value: string) {
  const normalized = value.toLowerCase().replace(/[-\s]+/g, " ").trim();
  if (/\bbi colou?r\b/.test(normalized)) return ["Bi colour"];
  if (/\bmulti colou?r\b/.test(normalized)) return ["Multi colour"];
  if (/\b(?:lavender|lavendra)\b/.test(normalized)) return ["Lavendra"];
  const words: string[] = normalized.match(/[a-z]+/g) ?? [];
  return colourFilterValues.filter((colour) => words.includes(colour.toLowerCase()));
}

export function normalizeGemTypeFilterValue(value: string) {
  if (/\bpadparadscha\b/i.test(value)) return "Padparadscha";
  if (/^rutile(?:\s+quartz)?$/i.test(value.trim())) return "Rutile Quartz";
  return /\bsapphires?\b/i.test(value) ? "Sapphire" : value;
}

export function isSapphire(product: Pick<Product, "attributes">) {
  return product.attributes.some(
    (attribute) => attribute.name.trim().toLowerCase() === "gem type" &&
      /\b(?:sapphires?|padparadscha)\b/i.test(attribute.value)
  );
}

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

export const mineralFilterNames = ["Type"];

export const singleValueFilterNames = new Set([
  "gem type",
  "type",
  "shape / cut",
  "colour",
  "treatment"
]);

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

export function uniqueAttributeValues(products: Product[], attributeNames: string[], includeNonSapphireTreatment = false) {
  // Normalize the allowed attribute names so variants map to the same group
  const allowedNormalized = new Set(attributeNames.map((name) => normalizeAttributeLabel(name).toLowerCase()));
  const groups = new Map<string, Map<string, string>>();

  products.forEach((product) => {
    product.attributes.forEach((attribute) => {
      const normalizedLabel = normalizeAttributeLabel(attribute.name);
      if (normalizedLabel === "Treatment" && !includeNonSapphireTreatment && !isSapphire(product)) return;
      if (!allowedNormalized.has(normalizedLabel.toLowerCase())) return;
      const key = normalizedLabel; // canonical label
      const valueMap = groups.get(key) ?? new Map<string, string>();
      if (key === "Carat / Weight") {
        const bucket = getCaratWeightBucket(attribute.value);
        if (bucket) valueMap.set(bucket, bucket);
      } else if (key.toLowerCase() === "colour") {
        getColourFilterValues(attribute.value).forEach((colour) => valueMap.set(colour, colour));
      } else {
        const normVal = normalizeValueForKey(attribute.value, attribute.name);
        // store the first-seen display value for this normalized key
        const displayValue = key.toLowerCase() === "gem type"
          ? normalizeGemTypeFilterValue(formatAttributeValue(attribute.value))
          : formatAttributeValue(attribute.value);
        if (!valueMap.has(normVal)) valueMap.set(normVal, displayValue);
      }
      groups.set(key, valueMap);
    });
  });
 
  return Array.from(groups.entries()).map(([name, values]) => ({
    name,
    values:
      name === "Carat / Weight"
        ? caratWeightBuckets
        : name.toLowerCase() === "colour"
        ? colourFilterValues
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
  if (isRectangularCushionMixed(trimmed)) return "Rectangular Cushion / Mixed";
  return trimmed;
}

function isRectangularCushionMixed(value: string) {
  const normalized = value
    .toLowerCase()
    .replace(/\bcut\b/g, "")
    .replace(/\bwith truncated corners\b/g, "")
    .replace(/[,/]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return normalized === "rectangular cushion mixed" || normalized === "rectangular cushion";
}

function normalizeValueForKey(value: string, keyLabel: string) {
  let v = String(value ?? "").trim();
  // collapse whitespace
  v = v.replace(/\s+/g, " ");
  // normalize spaces around slashes
  v = v.replace(/\s*\/\s*/g, "/");
  // lower for comparison
  v = v.toLowerCase();
  if (keyLabel.trim().toLowerCase() === "gem type") {
    return normalizeGemTypeFilterValue(v).toLowerCase();
  }
  // some keys need special handling
  if (keyLabel.toLowerCase().includes("treat")) {
    if (v === "heated") return "heated";
    if (v === "unheated") return "unheated";
  }
  if (keyLabel.toLowerCase().includes("shape")) {
    if (isRectangularCushionMixed(v)) return "rectangular cushion/mixed";
    // remove the word 'cut' which is often inconsistent
    v = v.replace(/\bcut\b/g, "");
    v = v.replace(/\s+/g, " ").trim();
  }
  return v;
}

export function productMatchesFilters(product: Product, params: URLSearchParams, includeNonSapphireTreatment = false) {
  const query = params.get("q")?.toLowerCase().trim();
  if (query && !`${product.name} ${product.sku}`.toLowerCase().includes(query)) {
    return false;
  }

  for (const key of new Set(params.keys())) {
    if (["q", "sort", "count", "page", "price_min", "price_max"].includes(key)) continue;
    const normalizedKey = normalizeAttributeLabel(key).toLowerCase();
    const rawValues = params.getAll(key).filter(Boolean);
    if (!rawValues.length) continue;
    if (normalizedKey === "treatment" && !includeNonSapphireTreatment && !isSapphire(product)) return false;
    const requestedValues = (
      singleValueFilterNames.has(normalizedKey)
        ? rawValues
        : rawValues.flatMap((value) => value.split(","))
    ).map((part) => part.toLowerCase());
    const matched = product.attributes.some((attribute) => {
      const normalizedLabel = normalizeAttributeLabel(attribute.name);
      const label = normalizedLabel.toLowerCase();
      if (label !== normalizedKey) return false;
      if (label === "colour") {
        const colours = getColourFilterValues(attribute.value);
        return requestedValues.some((value) => {
          const requestedColours = getColourFilterValues(value);
          return requestedColours.length
            ? requestedColours.some((colour) => colours.includes(colour))
            : normalizeValueForKey(value, attribute.name) === normalizeValueForKey(attribute.value, attribute.name);
        });
      }
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
