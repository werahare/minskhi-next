import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";
import { getProductVideos } from "@/lib/product-videos";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription || `Enquire about ${product.name} at Minskhi.`,
    openGraph: {
      title: product.name,
      description: product.shortDescription || `Enquire about ${product.name} at Minskhi.`,
      images: product.mainImage ? [product.mainImage] : undefined
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product);
  const videos = getProductVideos(product.slug);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    image: product.galleryImages,
    description: product.shortDescription || product.description || product.name,
    brand: { "@type": "Brand", name: siteConfig.brandName },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "AUD",
      url: `${siteConfig.url}/product/${product.slug}`
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Collection", item: `${siteConfig.url}/collection` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${siteConfig.url}/product/${product.slug}` }
    ]
  };

  return (
    <>
      <section className="container-shell py-10">
        <Breadcrumbs items={[{ label: "Collection", href: "/collection" }, { label: product.name }]} />
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <ProductGallery images={product.galleryImages} videos={videos} name={product.name} />
          <ProductInfo product={product} />
        </div>
      </section>
      <RelatedProducts products={related} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
