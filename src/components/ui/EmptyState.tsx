import Link from "next/link";

export function EmptyState({
  title,
  message,
  actionHref,
  actionLabel
}: {
  title: string;
  message: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="border border-[#dfd2c4] bg-porcelain px-6 py-12 text-center">
      <h2 className="font-serif text-2xl text-ink">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-mink">{message}</p>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="mt-6 inline-flex border border-ink px-5 py-3 text-xs uppercase tracking-[0.22em] transition hover:bg-ink hover:text-white"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
