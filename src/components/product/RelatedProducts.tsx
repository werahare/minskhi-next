import type { Product } from "@/lib/types";
import { ProductGrid } from "./ProductGrid";

export function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <section className="container-shell mt-24">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Same world of colour</p>
          <h2 className="mt-2 font-serif text-3xl">Related products</h2>
        </div>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
