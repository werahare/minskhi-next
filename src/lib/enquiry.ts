import { siteConfig } from "@/config/site";
import type { EnquiryItem, Product } from "./types";

export const enquiryStorageKey = "minskhi-enquiry-list";

export function readEnquiryItems(): EnquiryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const value = window.localStorage.getItem(enquiryStorageKey);
    return value ? (JSON.parse(value) as EnquiryItem[]) : [];
  } catch {
    return [];
  }
}

export function writeEnquiryItems(items: EnquiryItem[]) {
  window.localStorage.setItem(enquiryStorageKey, JSON.stringify(items));
  window.dispatchEvent(new Event("minskhi-enquiry-updated"));
}

export type EnquiryDetails = {
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  remark?: string;
};

export function buildEnquiryMessage(products: Product[], details: EnquiryDetails = {}) {
  const lines = [
    "Hello Minskhi,",
    "",
    "I would like to enquire about the following products:",
    ""
  ];

  products.forEach((product, index) => {
    lines.push(`${index + 1}. ${product.name}`);
    lines.push(`SKU: ${product.sku || "N/A"}`);
    lines.push(`Product URL: /product/${product.slug}`);
    lines.push("");
  });

  lines.push(`Name: ${details.name || ""}`);
  lines.push(`Email: ${details.email || ""}`);
  lines.push(`Phone: ${details.phone || ""}`);
  lines.push(`Country: ${details.country || ""}`);
  lines.push("Remark:");
  if (details.remark) {
    lines.push(details.remark);
  }
  lines.push("");
  lines.push("Thank you.");
  return lines.join("\n");
}

export function buildMailto(subject: string, body: string) {
  return `mailto:${siteConfig.enquiryEmails.join(",")}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
