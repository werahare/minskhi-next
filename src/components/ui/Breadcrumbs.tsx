import Link from "next/link";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-mink">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link className="hover:text-ink" href="/">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li className="flex items-center gap-2" key={item.label}>
            <span>/</span>
            {item.href ? (
              <Link className="hover:text-ink" href={item.href}>
                {item.label}
              </Link>
            ) : (
              <span className="text-ink">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
