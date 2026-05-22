import fs from "node:fs";
import path from "node:path";

type RawProduct = {
  slug?: string;
  sku?: string;
};

type ProductVideoMap = Record<string, string[]>;

const defaultSourceDir =
  "E:\\Roshan\\Minshiki\\Website\\videos\\drive-download-20260521T174238Z-3-001";

const sourceDir = process.argv[2] || defaultSourceDir;
const root = process.cwd();
const productsPath = path.join(root, "src", "data", "products.json");
const outputDir = path.join(root, "public", "videos", "products");
const outputDataPath = path.join(root, "src", "data", "product-videos.json");

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

function videoUrl(fileName: string) {
  return `/videos/products-compressed/${encodeURIComponent(fileName)}`;
}

if (!fs.existsSync(sourceDir)) {
  throw new Error(`Video source folder not found: ${sourceDir}`);
}

const products = JSON.parse(fs.readFileSync(productsPath, "utf8")) as RawProduct[];
const videoFiles = fs
  .readdirSync(sourceDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".mp4"))
  .map((entry) => entry.name);

fs.mkdirSync(outputDir, { recursive: true });

const videoMap: ProductVideoMap = {};
const copied = new Set<string>();

for (const product of products) {
  const slug = product.slug || "";
  const skuDigits = digitsOnly(product.sku || "");
  if (!slug || !skuDigits) continue;

  const matches = videoFiles.filter((fileName) => {
    const fileDigits = digitsOnly(path.parse(fileName).name);
    return fileDigits === skuDigits || fileDigits.startsWith(skuDigits);
  });

  if (!matches.length) continue;

  videoMap[slug] = matches.map(videoUrl);

  for (const fileName of matches) {
    if (copied.has(fileName)) continue;
    fs.copyFileSync(path.join(sourceDir, fileName), path.join(outputDir, fileName));
    copied.add(fileName);
  }
}

fs.writeFileSync(outputDataPath, `${JSON.stringify(videoMap, null, 2)}\n`);

console.log(`Matched products: ${Object.keys(videoMap).length}`);
console.log(`Copied videos: ${copied.size}`);
console.log(`Generated: ${path.relative(root, outputDataPath)}`);
