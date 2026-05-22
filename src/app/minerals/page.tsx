import { ProductListingPage } from "@/components/product/ProductListingPage";
import { getProductsByCategory } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Minerals", "Browse Minskhi minerals.", "/minerals");

export default async function MineralsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <ProductListingPage
      title="Minerals"
      description="Explore Minskhi mineral carvings and collectible stone pieces selected from the product catalogue."
      products={getProductsByCategory("minerals")}
      searchParams={await searchParams}
    />
  );
}
