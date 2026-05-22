import fs from "node:fs";
import path from "node:path";

export function WpPage({ file }: { file: string }) {
  const htmlPath = path.join(process.cwd(), "src", "content", "wp", file);
  const html = fs.readFileSync(htmlPath, "utf8");

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
