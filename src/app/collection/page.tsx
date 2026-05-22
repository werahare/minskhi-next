import { ProductListingPage } from "@/components/product/ProductListingPage";
import { products } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Collection", "Explore Minskhi gemstones and jewellery.", "/collection");

export default async function CollectionPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <ProductListingPage
      title="Collection"
      description="Browse the full Minskhi product catalogue. Add selected pieces to your enquiry list for private follow-up."
      products={products}
      searchParams={await searchParams}
    />
  );
}
