import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";

export function ProductGrid({
  products,
  desktopColumns = 3
}: {
  products: Product[];
  desktopColumns?: 3 | 4;
}) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        message="No products match the selected filters. Clear filters or enquire with Minskhi for current availability."
        actionHref="/collection"
        actionLabel="View Collection"
      />
    );
  }

  const desktopGridClass = desktopColumns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <div className={`grid grid-cols-2 gap-x-2 gap-y-6 sm:gap-x-7 sm:gap-y-12 ${desktopGridClass}`}>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
