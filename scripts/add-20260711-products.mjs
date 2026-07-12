import fs from "node:fs";
import path from "node:path";

const sourceRoot = "E:\\Roshan\\Minshiki\\Product List\\2026.7.11\\drive-download-20260711T045558Z-2-001";
const uploadRoot = path.resolve("public/wp-content/uploads/2026/07");
const productsPath = path.resolve("src/data/products.json");
const videosPath = path.resolve("src/data/product-videos.json");

const treatmentLabels = {
  H: "Heated",
  UH: "Unheated",
  Natural: "Unheated"
};

const knownGemPhrases = [
  "Star Sapphire",
  "Rutile Quartz",
  "Green Tourmaline",
  "Blue Topaz",
  "White Topaz",
  "Red Garnet",
  "Black Rutile",
  "Blue Sapphire",
  "Yellow Sapphire",
  "Hot Pink Sapphire",
  "Lavender Sapphire",
  "Padparadscha",
  "Moonstone",
  "Citrine"
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function titleCase(value) {
  return value
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase())
    .replace(/\bUh\b/g, "UH")
    .replace(/\bH\b/g, "H");
}

function normalizeShape(value) {
  return titleCase(value).replace(/\bCut\b/g, "Cut");
}

function parseProductFolder(folderName) {
  const parts = folderName.replace(/\s+/g, " ").trim().split(" ");
  const carat = parts[0];
  const treatmentIndex = parts.findIndex((part) => ["H", "UH", "Natural"].includes(part));
  if (!carat || treatmentIndex < 0) {
    throw new Error(`Could not parse product folder name: ${folderName}`);
  }

  const descriptor = parts.slice(1, treatmentIndex).join(" ");
  const treatmentRaw = parts[treatmentIndex];
  const treatment = treatmentLabels[treatmentRaw];
  const displayTreatment = treatmentRaw === "Natural" ? "Natural" : treatment;
  const shape = normalizeShape(parts.slice(treatmentIndex + 1).join(" "));
  const knownGem = knownGemPhrases.find((gem) => descriptor.toLowerCase().endsWith(gem.toLowerCase()));
  const colourRaw = knownGem ? descriptor.slice(0, descriptor.length - knownGem.length).trim() : "";

  let gemType = knownGem || descriptor;
  if (gemType.includes("Sapphire") && gemType !== "Star Sapphire") gemType = "Sapphire";
  if (gemType === "Green Tourmaline") gemType = "Tourmaline";
  if (gemType === "Blue Topaz" || gemType === "White Topaz") gemType = "Topaz";
  if (gemType === "Red Garnet") gemType = "Garnet";
  if (gemType === "Black Rutile") gemType = "Rutile";

  let categoryGem = gemType;
  if (gemType === "Star Sapphire" || descriptor.includes("Sapphire") || gemType === "Padparadscha") {
    categoryGem = "Sapphire";
  }

  const colour =
    colourRaw ||
    [
      "Hot Pink",
      "Lavender",
      "Yellow",
      "Green",
      "Blue",
      "White",
      "Black",
      "Red"
    ].find((candidate) => descriptor.toLowerCase().startsWith(candidate.toLowerCase())) ||
    (gemType === "Padparadscha" ? "Padparadscha" : "");
  const productName = `${carat} ct. ${descriptor} ${displayTreatment}`;

  return {
    carat,
    colour,
    categoryGem,
    descriptor,
    folderName,
    gemType,
    productName,
    shape,
    treatment
  };
}

function isImage(fileName) {
  return /\.(jpe?g|png|webp)$/i.test(fileName);
}

function isVideo(fileName) {
  return /\.(mp4|mov|webm)$/i.test(fileName);
}

function copyFile(source, destination) {
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

const existingProducts = JSON.parse(fs.readFileSync(productsPath, "utf8"));
const existingVideos = JSON.parse(fs.readFileSync(videosPath, "utf8"));
const folders = fs
  .readdirSync(sourceRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const newProducts = [];
const generatedSlugs = new Set();
const newVideoMap = new Map();

folders.forEach((folderName, index) => {
  const parsed = parseProductFolder(folderName);
  const slug = slugify(parsed.productName);
  const destDir = path.join(uploadRoot, slug);
  const publicDir = `/wp-content/uploads/2026/07/${slug}`;
  const sourceDir = path.join(sourceRoot, folderName);
  const files = fs
    .readdirSync(sourceDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const imageFiles = files.filter(isImage);
  const videoFiles = files.filter(isVideo);

  imageFiles.forEach((fileName) => copyFile(path.join(sourceDir, fileName), path.join(destDir, fileName)));
  videoFiles.forEach((fileName) => copyFile(path.join(sourceDir, fileName), path.join(destDir, fileName)));

  const images = imageFiles.map((fileName) => `${publicDir}/${fileName}`);
  const videos = videoFiles.map((fileName) => `${publicDir}/${fileName}`);
  const attributes = [
    { name: "Gem Type", value: parsed.gemType },
    { name: "Treatment", value: parsed.treatment },
    ...(parsed.colour ? [{ name: "Colour", value: parsed.colour }] : []),
    { name: "Shape / Cut", value: parsed.shape },
    { name: "Carat / Weight", value: `${parsed.carat} ct` }
  ].filter((attribute) => attribute.value);

  generatedSlugs.add(slug);
  newVideoMap.set(slug, videos);
  newProducts.push({
    id: `20260711-${String(index + 1).padStart(3, "0")}`,
    slug,
    name: parsed.productName,
    sku: `20260711-${String(index + 1).padStart(3, "0")}`,
    categories: [`Gemstones > ${parsed.categoryGem}`],
    tags: [],
    price: "0",
    regularPrice: "0",
    salePrice: "",
    shortDescription: "",
    description: "",
    mainImage: images[0] || "/assets/fallback-product.svg",
    galleryImages: images,
    images,
    attributes,
    stockStatus: "Available for enquiry",
    dateCreated: "2026-07-11",
    relatedProductIds: [],
    originalWooCommerceUrl: `https://minskhi.com/product/${slug}/`
  });
});

Object.keys(existingVideos).forEach((slug) => {
  if (
    generatedSlugs.has(slug) ||
    existingVideos[slug]?.some((videoPath) => videoPath.startsWith("/wp-content/uploads/2026/07/"))
  ) {
    delete existingVideos[slug];
  }
});
newProducts.forEach((product) => {
  existingVideos[product.slug] = newVideoMap.get(product.slug) || [];
});

const mergedProducts = [
  ...existingProducts.filter(
    (product) =>
      !String(product.id).startsWith("20260711-") &&
      !generatedSlugs.has(product.slug) &&
      !(
        Array.isArray(product.images) &&
        product.images.some((imagePath) => imagePath.startsWith("/wp-content/uploads/2026/07/"))
      )
  ),
  ...newProducts
];

fs.writeFileSync(productsPath, `${JSON.stringify(mergedProducts, null, 2)}\n`);
fs.writeFileSync(videosPath, `${JSON.stringify(existingVideos, null, 2)}\n`);

console.log(`Imported ${newProducts.length} products.`);
console.log(`Copied media to ${uploadRoot}.`);
