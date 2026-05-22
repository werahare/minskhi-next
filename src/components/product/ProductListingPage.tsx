import { ProductFilters } from "@/components/filters/ProductFilters";
import { ProductGrid } from "@/components/product/ProductGrid";
import { gemstoneFilterNames, jewelleryFilterNames, productMatchesFilters, uniqueAttributeValues } from "@/lib/filters";
import { sortProducts } from "@/lib/products";
import type { Product, SortKey } from "@/lib/types";

type SearchParams = Record<string, string | string[] | undefined>;

function toParams(searchParams: SearchParams) {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) params.set(key, value.join(","));
    else if (value) params.set(key, value);
  });
  return params;
}

export function ProductListingPage({
  title,
  eyebrow = "Collection",
  description,
  products,
  searchParams,
  filterMode = "gemstones"
}: {
  title: string;
  eyebrow?: string;
  description: string;
  products: Product[];
  searchParams: SearchParams;
  filterMode?: "gemstones" | "jewellery";
}) {
  const params = toParams(searchParams);
  const sort = (params.get("sort") as SortKey) || "default";
  const count = Number(params.get("count") ?? 12);
  const page = Number(params.get("page") ?? 1);
  const filtered = sortProducts(products.filter((product) => productMatchesFilters(product, params)), sort);
  const visible = filtered.slice(0, Math.max(1, page) * count);
  const filters = uniqueAttributeValues(
    products,
    filterMode === "jewellery" ? jewelleryFilterNames : gemstoneFilterNames
  );

  return (
    <section className="container-shell py-14">
      <div className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
        <h1 className="mt-3 font-serif text-5xl text-[rgb(9_46_43/var(--tw-bg-opacity,1))]">{title}</h1>
        <p className="mx-auto mt-4 max-w-4xl text-sm leading-7 text-mink">{description}</p>
      </div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-[#ddcfbf] py-4">
        <p className="text-sm text-mink">
          Showing {visible.length} of {filtered.length} products
        </p>
        <form className="flex flex-wrap gap-3 text-sm" action="">
          <select className="border border-[#d9cbbb] bg-transparent px-3 py-2" name="sort" defaultValue={sort}>
            <option value="default">Default sorting</option>
            <option value="popularity">Sort by popularity</option>
            <option value="latest">Sort by latest</option>
            <option value="price-asc">Sort by price low to high</option>
            <option value="price-desc">Sort by price high to low</option>
          </select>
          <select className="border border-[#d9cbbb] bg-transparent px-3 py-2" name="count" defaultValue={String(count)}>
            <option value="12">12</option>
            <option value="15">15</option>
            <option value="30">30</option>
          </select>
          <button className="border border-ink px-4 py-2 text-xs uppercase tracking-[0.16em]" type="submit">
            Apply
          </button>
        </form>
      </div>
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <ProductFilters filters={filters} mode={filterMode} />
        <div>
          <ProductGrid products={visible} />
          {visible.length < filtered.length ? (
            <a
              className="mx-auto mt-12 flex w-fit border border-ink px-6 py-3 text-xs uppercase tracking-[0.18em]"
              href={`?${new URLSearchParams({ ...Object.fromEntries(params), page: String(page + 1), count: String(count) })}`}
            >
              Load more
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
