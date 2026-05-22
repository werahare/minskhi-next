import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function pageMetadata(title: string, description: string, path = ""): Metadata {
  const url = `${siteConfig.url}${path}`;
  return {
    title: `${title} | ${siteConfig.brandName}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.brandName}`,
      description,
      url,
      siteName: siteConfig.brandName,
      type: "website"
    }
  };
}
