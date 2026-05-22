import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";

export function ProductGrid({ products }: { products: Product[] }) {
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

  return (
    <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
