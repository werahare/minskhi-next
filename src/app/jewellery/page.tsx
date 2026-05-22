import { ProductListingPage } from "@/components/product/ProductListingPage";
import { getProductsByCategory } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Jewellery", "Browse Minskhi jewellery pieces.", "/jewellery");

export default async function JewelleryPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <ProductListingPage
      title="Jewellery"
      description="Finished jewellery and setting-led product entries from the imported product catalogue."
      products={getProductsByCategory("jewellery")}
      searchParams={await searchParams}
      filterMode="jewellery"
    />
  );
}
