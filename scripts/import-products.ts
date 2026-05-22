import fs from "node:fs";
import path from "node:path";

type CsvRow = Record<string, string>;

function parseCsv(input: string): CsvRow[] {
  const rows: string[][] = [];
  let field = "";
  let row: string[] = [];
  let quoted = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (char === '"' && quoted && next === '"') {
      field += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(field);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  const [headers = [], ...body] = rows;
  return body.map((values) =>
    Object.fromEntries(headers.map((header, index) => [header.trim(), values[index] ?? ""]))
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toArray(value?: string) {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeCategoryName(name: string) {
  const lower = name.toLowerCase().trim();
  if (lower.includes("gemstone")) return "Gemstones";
  if (lower.includes("jewellery") || lower.includes("jewelry")) return "Jewellery";
  if (lower.includes("mineral")) return "Minerals";
  return name
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function normalizeCategory(raw: string) {
  return raw
    .split(">")
    .map((segment, index) => {
      const trimmed = segment.trim();
      if (!trimmed) return "";
      return index === 0 ? normalizeCategoryName(trimmed) : trimmed.replace(/\s+/g, " ");
    })
    .filter(Boolean)
    .join(" > ");
}

const allowedAttributeNames = new Set([
  "Gem Type",
  "Colour",
  "Shape / Cut",
  "Treatment",
  "Carat / Weight",
  "Transparency",
  "Measurement",
  "Material",
  "Size",
  "Certification"
]);

function normalizeAttributeLabel(label: string) {
  const lower = label.toLowerCase().trim();
  if (lower.includes("shape")) return "Shape / Cut";
  if (lower.includes("transpar")) return "Transparency";
  if (lower.includes("measurement")) return "Measurement";
  if (lower.includes("carat") || lower.includes("weight")) return "Carat / Weight";
  if (lower.includes("certificate")) return "Certification";
  if (lower.includes("treat")) return "Treatment";
  return label.trim();
}

const caratWeightBuckets = ["0-1", "1-2", "2-3", "3-4", "4-5", "5 +"];

function normalizeCaratValue(value: string): string {
  const trimmed = value.trim();
  const match = trimmed.match(/[0-9]+(?:\.[0-9]+)?/g);
  if (!match?.length) return trimmed;
  const numberValue = Number(match[0]);
  if (Number.isNaN(numberValue)) return trimmed;
  if (numberValue < 1) return "0-1";
  if (numberValue < 2) return "1-2";
  if (numberValue < 3) return "2-3";
  if (numberValue < 4) return "3-4";
  if (numberValue < 5) return "4-5";
  return "5 +";
}

function normalizeAttributeValue(name: string, value: string) {
  const raw = value.trim().replace(/\s*\/\s*/g, " / ").replace(/\s+/g, " ");
  const lowerName = name.toLowerCase();

  if (lowerName === "carat / weight") {
    return normalizeCaratValue(raw);
  }

  if (lowerName.includes("shape")) {
    return raw.replace(/\bcut\b/gi, "").replace(/\s+/g, " ").trim();
  }

  if (lowerName.includes("transpar")) {
    return raw.replace(/tran[s]?parent/gi, "Transparent");
  }

  return raw;
}

function collectAttributes(row: CsvRow) {
  const attributes: { name: string; value: string }[] = [];
  for (let index = 1; index <= 30; index += 1) {
    const name = row[`Attribute ${index} name`];
    const value = row[`Attribute ${index} value(s)`];
    if (name && value) {
      const normalizedName = normalizeAttributeLabel(name);
      if (!allowedAttributeNames.has(normalizedName)) continue;
      const normalizedValue = normalizeAttributeValue(normalizedName, value);
      attributes.push({ name: normalizedName, value: normalizedValue });
    }
  }
  return attributes;
}

function mapImage(image: string, uploadsBase?: string) {
  if (!image) return "";
  const wpContentIndex = image.indexOf("/wp-content/uploads/");
  if (wpContentIndex >= 0) {
    return image.slice(wpContentIndex);
  }
  if (image.startsWith("https://minskhi.com/wp-content/uploads/")) {
    return image.replace("https://minskhi.com", "");
  }
  if (!uploadsBase) return image;
  const normalizedBase = uploadsBase.replace(/\\/g, "/").replace(/\/$/, "");
  const normalizedImage = image.replace(/\\/g, "/");
  const baseIndex = normalizedImage.indexOf(normalizedBase);
  if (baseIndex >= 0) {
    return `/wp-content/uploads${normalizedImage.slice(baseIndex + normalizedBase.length)}`;
  }
  const filename = image.split("/").pop();
  if (!filename) return image;
  return `/uploads/${filename}`;
}

function run() {
  const csvPath = process.argv[2];
  const uploadsBase = process.argv[3];

  if (!csvPath) {
    console.error("Usage: npm run import-products -- path/to/products.csv [path/to/wp-content/uploads]");
    process.exit(1);
  }

  const absoluteCsvPath = path.resolve(csvPath);
  const rows = parseCsv(fs.readFileSync(absoluteCsvPath, "utf8"));
  const products = rows.map((row, index) => {
    const name = row.Name || row.Title || row.name || `Product ${index + 1}`;
    const slug = row.Slug || row.slug || slugify(name);
    const images = toArray(row.Images).map((image) => mapImage(image, uploadsBase));

    return {
      id: row.ID || row.SKU || `product-${index + 1}`,
      slug,
      name,
      sku: row.SKU || "",
      categories: toArray(row.Categories).map(normalizeCategory),
      tags: toArray(row.Tags),
      price: row.Price || row["Regular price"] || "",
      regularPrice: row["Regular price"] || "",
      salePrice: row["Sale price"] || "",
      shortDescription: row["Short description"] || "",
      description: row.Description || "",
      mainImage: images[0] || "",
      galleryImages: images,
      images,
      attributes: collectAttributes(row),
      stockStatus: row["Stock status"] || row.Stock || "Available for enquiry",
      dateCreated: row["Date created"] || "",
      relatedProductIds: toArray(row["Grouped products"] || row["Upsells"] || row["Cross-sells"]),
      originalWooCommerceUrl: `https://minskhi.com/product/${slug}/`
    };
  });

  const outPath = path.resolve("src/data/products.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${JSON.stringify(products, null, 2)}\n`);
  console.log(`Wrote ${products.length} products to ${outPath}`);
}

run();
