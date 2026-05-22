"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterGroup = {
  name: string;
  values: string[];
};

const dropdownFilterNames = new Set(["gem type", "shape / cut", "colour", "treatment"]);

export function ProductFilters({ filters }: { filters: FilterGroup[]; mode?: "gemstones" | "jewellery" }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  function toggleValue(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    const current = new Set((params.get(key) ?? "").split(",").filter(Boolean));
    if (current.has(value)) current.delete(value);
    else current.add(value);
    if (current.size) params.set(key, Array.from(current).join(","));
    else params.delete(key);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  }

  function viewItems() {
    const params = new URLSearchParams(searchParams.toString());
    router.push(`${pathname}?${params.toString()}`);
  }

  function clearFilters() {
    router.push(pathname);
  }

  return (
    <aside className="space-y-6">
      <div>
        <label className="text-xs uppercase tracking-[0.18em] text-mink" htmlFor="search">
          Search
        </label>
        <input
          id="search"
          className="mt-2 h-11 w-full rounded-md border border-[#e6ded2] bg-white/40 px-3 text-sm outline-none placeholder:text-mink"
          defaultValue={searchParams.get("q") ?? ""}
          onKeyDown={(event) => {
            if (event.key === "Enter") updateParam("q", event.currentTarget.value);
          }}
          placeholder="Name or SKU"
        />
      </div>

      {filters.map((group) => {
        const key = group.name;
        const isDropdown = dropdownFilterNames.has(group.name.toLowerCase());
        const selectedValue = (searchParams.get(group.name) ?? "").split(",").filter(Boolean)[0] ?? "";

        if (isDropdown) {
          return (
            <div key={key} className="border-t border-[#f0e9df] pt-4">
              <label className="mb-3 block text-xs uppercase tracking-[0.18em] text-ink" htmlFor={`filter-${key}`}>
                {key}
              </label>
              <select
                id={`filter-${key}`}
                className="h-12 w-full rounded-md border border-[#e6ded2] bg-white px-3 text-sm text-ink outline-none transition focus:border-[#092E2B]"
                value={selectedValue}
                onChange={(event) => updateParam(group.name, event.currentTarget.value)}
              >
                <option value="">All {key}</option>
                {group.values.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        return (
          <div key={key} className="border-t border-[#f0e9df] pt-4">
            <div className="mb-3 text-xs uppercase tracking-[0.18em] text-ink">{key}</div>
            <div className="flex flex-wrap gap-3">
              {group.values.map((value) => {
                const selected = (searchParams.get(group.name) ?? "").split(",").includes(value);
                const baseClasses =
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm shadow-sm transition-transform duration-150";
                const selectedClasses = selected ? "bg-ink text-white scale-105" : "bg-porcelain text-ink hover:scale-105";

                function colorToHex(v: string) {
                  const key = v.toLowerCase().trim();
                  const map: Record<string, string> = {
                    black: "#000000",
                    white: "#ffffff",
                    red: "#ef4444",
                    blue: "#2563eb",
                    green: "#16a34a",
                    purple: "#7c3aed",
                    grey: "#9ca3af",
                    beige: "#f5e9dc",
                    yellow: "#f59e0b",
                    pink: "#ec4899",
                    brown: "#8b5a2b"
                  };
                  if (key.startsWith("#")) return key;
                  return map[key] ?? "transparent";
                }

                if (group.name.toLowerCase() === "colour") {
                  const hex = colorToHex(value);
                  const colorStyle: React.CSSProperties = {
                    width: 14,
                    height: 14,
                    borderRadius: 9999,
                    display: "inline-block",
                    border: "1px solid rgba(0,0,0,0.08)",
                    backgroundColor: hex
                  };

                  return (
                    <button
                      key={value}
                      className={`${baseClasses} ${selectedClasses}`}
                      onClick={() => toggleValue(group.name, value)}
                      type="button"
                    >
                      <span style={colorStyle} />
                      <span>{value}</span>
                    </button>
                  );
                }

                return (
                  <button
                    key={value}
                    className={`${baseClasses} ${selectedClasses}`}
                    onClick={() => toggleValue(group.name, value)}
                    type="button"
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="pt-6 flex gap-3">
        <button
          className="flex-1 rounded-md border border-ink bg-transparent px-4 py-3 text-sm"
          onClick={clearFilters}
          type="button"
        >
          Reset
        </button>
        <button
          className="flex-1 rounded-full bg-ink px-6 py-3 text-sm font-medium uppercase text-white shadow-md"
          onClick={viewItems}
          type="button"
        >
          Apply
        </button>
      </div>
    </aside>
  );
}
