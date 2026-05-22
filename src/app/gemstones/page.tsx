import { ProductListingPage } from "@/components/product/ProductListingPage";
import { getProductsByCategory } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Gemstones", "Browse Minskhi coloured gemstones.", "/gemstones");

export default async function GemstonesPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <ProductListingPage
      title="Gemstones"
      description="Explore rare coloured gemstones selected for their beauty, character, and enduring value."
      products={getProductsByCategory("gemstones")}
      searchParams={await searchParams}
    />
  );
}
