import { ProductFilters } from "@/components/filters/ProductFilters";
import { ProductGrid } from "@/components/product/ProductGrid";
import { gemstoneFilterNames, jewelleryFilterNames, productMatchesFilters, uniqueAttributeValues } from "@/lib/filters";
import { sortProducts } from "@/lib/products";
import type { Product, SortKey } from "@/lib/types";

type SearchParams = Record<string, string | string[] | undefined>;
const PRODUCTS_PER_PAGE = 9;

function toParams(searchParams: SearchParams) {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) value.forEach((item) => params.append(key, item));
    else if (value) params.set(key, value);
  });
  return params;
}

function paginationItems(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  const validPages = Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  return validPages.flatMap<(number | "ellipsis")>((page, index) => {
    const previousPage = validPages[index - 1];
    return previousPage && page - previousPage > 1 ? ["ellipsis", page] : [page];
  });
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
  const filtered = sortProducts(products.filter((product) => productMatchesFilters(product, params)), sort);
  const showAllGemTypeMatches = params
    .getAll("Gem Type")
    .some((value) => value.trim().length > 0);
  const pageSize = showAllGemTypeMatches
    ? Math.max(filtered.length, 1)
    : PRODUCTS_PER_PAGE;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const requestedPage = Number(params.get("page") ?? 1);
  const page = Number.isInteger(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1;
  const pageStart = (page - 1) * pageSize;
  const visible = filtered.slice(pageStart, pageStart + pageSize);
  const filters = uniqueAttributeValues(
    products,
    filterMode === "jewellery" ? jewelleryFilterNames : gemstoneFilterNames
  );
  const pageHref = (targetPage: number) => {
    const nextParams = new URLSearchParams(params);
    nextParams.delete("count");
    if (targetPage === 1) nextParams.delete("page");
    else nextParams.set("page", String(targetPage));
    const query = nextParams.toString();
    return query ? `?${query}` : "?";
  };
  const pages = paginationItems(page, totalPages);

  return (
    <section className="container-shell py-14">
      <div className="mb-10 text-center">
        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
        ) : null}
        <h1 className={`${eyebrow ? "mt-3 " : ""}font-serif text-4xl font-semibold uppercase tracking-[0.03em] text-[rgb(9_46_43/var(--tw-bg-opacity,1))]`}>
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-4xl text-sm leading-7 text-mink">{description}</p>
      </div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-[#ddcfbf] py-4">
        <p className="text-sm text-mink">
          {filtered.length > 0
            ? `Showing ${pageStart + 1}-${pageStart + visible.length} of ${filtered.length} products`
            : "Showing 0 products"}
        </p>
        <form className="flex flex-wrap gap-3 text-sm" action="">
          {Array.from(params.entries())
            .filter(([key]) => !["sort", "page", "count"].includes(key))
            .map(([key, value]) => (
              <input key={key} name={key} type="hidden" value={value} />
            ))}
          <select className="border border-[#d9cbbb] bg-transparent px-3 py-2" name="sort" defaultValue={sort}>
            <option value="default">Default sorting</option>
            <option value="popularity">Sort by popularity</option>
            <option value="latest">Sort by latest</option>
            <option value="price-asc">Sort by price low to high</option>
            <option value="price-desc">Sort by price high to low</option>
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
          {totalPages > 1 ? (
            <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Product pagination">
              {page > 1 ? (
                <a
                  className="inline-flex min-h-10 items-center border border-[#d9cbbb] px-4 text-xs uppercase tracking-[0.14em] transition hover:border-ink"
                  href={pageHref(page - 1)}
                  rel="prev"
                >
                  Previous
                </a>
              ) : null}
              {pages.map((item, index) =>
                item === "ellipsis" ? (
                  <span className="inline-flex min-h-10 min-w-10 items-center justify-center text-mink" key={`ellipsis-${index}`}>
                    &hellip;
                  </span>
                ) : (
                  <a
                    aria-current={item === page ? "page" : undefined}
                    className={`inline-flex min-h-10 min-w-10 items-center justify-center border text-sm transition ${
                      item === page
                        ? "border-ink bg-ink text-white"
                        : "border-[#d9cbbb] text-ink hover:border-ink"
                    }`}
                    href={pageHref(item)}
                    key={item}
                  >
                    {item}
                  </a>
                )
              )}
              {page < totalPages ? (
                <a
                  className="inline-flex min-h-10 items-center border border-[#d9cbbb] px-4 text-xs uppercase tracking-[0.14em] transition hover:border-ink"
                  href={pageHref(page + 1)}
                  rel="next"
                >
                  Next
                </a>
              ) : null}
            </nav>
          ) : null}
        </div>
      </div>
    </section>
  );
}
