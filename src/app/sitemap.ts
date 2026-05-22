import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { products } from "@/lib/products";
import { journalPosts } from "@/content/journal/posts";
import { staticPages } from "@/content/pages/static-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/collection",
    "/shop-2",
    "/gemstones",
    "/jewellery",
    "/minerals",
    "/book-a-consultation",
    "/journal",
    "/contact",
    "/wishlist",
    "/enquiry-list",
    ...Object.keys(staticPages).map((slug) => `/${slug}`),
    ...products.map((product) => `/product/${product.slug}`),
    ...journalPosts.map((post) => `/journal/${post.slug}`)
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date()
  }));
}
