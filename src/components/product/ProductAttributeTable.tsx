import { formatAttributeValue, normalizeAttributeLabel } from "@/lib/filters";
import type { Product } from "@/lib/types";

export function ProductAttributeTable({ product }: { product: Product }) {
  const rows = product.attributes
    .map((attribute) => ({
      name: normalizeAttributeLabel(attribute.name),
      value: formatAttributeValue(attribute.value)
    }))
    .filter((attribute) => attribute.name !== "Carat / Weight");

  return (
    <div className="overflow-hidden border border-[#ddcfbf]">
      <table className="w-full text-left text-sm">
        <tbody>
          {rows.map((row, index) => (
            <tr className={index % 2 === 0 ? "bg-porcelain" : "bg-linen"} key={`${row.name}-${index}`}>
              <th className="w-1/3 px-4 py-3 font-normal uppercase tracking-[0.14em] text-mink">
                {row.name}
              </th>
              <td className="px-4 py-3 text-ink">{row.value}</td>
            </tr>
          ))}
          <tr className="bg-porcelain">
            <th className="px-4 py-3 font-normal uppercase tracking-[0.14em] text-mink">Stock status</th>
            <td className="px-4 py-3 text-ink">{product.stockStatus}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
