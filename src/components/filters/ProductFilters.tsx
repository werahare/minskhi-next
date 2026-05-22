"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterGroup = {
  name: string;
  values: string[];
};

const dropdownFilterNames = new Set(["gem type", "shape / cut", "colour", "treatment"]);

export function ProductFilters({ filters, mode }: { filters: FilterGroup[]; mode?: "gemstones" | "jewellery" }) {
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

  const initialMin = parseFloat(searchParams.get("price_min") ?? "") || 0;
  const initialMax = parseFloat(searchParams.get("price_max") ?? "") || 0;
  const [priceMin, setPriceMin] = useState<number>(initialMin);
  const [priceMax, setPriceMax] = useState<number>(initialMax);

  useEffect(() => {
    setPriceMin(parseFloat(searchParams.get("price_min") ?? "") || 0);
    setPriceMax(parseFloat(searchParams.get("price_max") ?? "") || 0);
  }, [searchParams.toString()]);

  function applyPrice() {
    updateParam("price_min", priceMin ? String(priceMin) : "");
    updateParam("price_max", priceMax ? String(priceMax) : "");
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
                    brown: "#8b5a2b",
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

      {mode === "gemstones" ? (
        <div className="border-t border-[#f0e9df] pt-4">
          <div className="mb-3 text-xs uppercase tracking-[0.18em] text-ink">Price</div>
          <div className="flex items-center justify-between text-sm text-mink">
            <div>£{priceMin || "0"}</div>
            <div>£{priceMax || "0"}</div>
          </div>
          <div className="mt-4">
            <div className="relative h-8">
              <div className="absolute left-0 right-0 top-[13px] h-px bg-[#d8cfc4]" />
              <input
                type="range"
                min={0}
                max={10000}
                value={priceMin}
                onChange={(e) => {
                  const val = Math.min(Number(e.currentTarget.value), priceMax - 1 || Number(e.currentTarget.value));
                  setPriceMin(val);
                }}
                className="absolute left-0 right-0 top-2 h-2 appearance-none bg-transparent accent-[#092E2B]"
              />
              <input
                type="range"
                min={0}
                max={10000}
                value={priceMax}
                onChange={(e) => {
                  const val = Math.max(Number(e.currentTarget.value), priceMin + 1 || Number(e.currentTarget.value));
                  setPriceMax(val);
                }}
                className="absolute left-0 right-0 top-2 h-2 appearance-none bg-transparent accent-[#092E2B]"
              />
            </div>
            <div className="mt-3 flex gap-2">
              <input
                type="number"
                className="h-10 w-1/2 rounded-md border border-[#e6ded2] px-3 text-sm"
                value={priceMin}
                onChange={(e) => setPriceMin(Number(e.currentTarget.value || 0))}
                placeholder="Min"
              />
              <input
                type="number"
                className="h-10 w-1/2 rounded-md border border-[#e6ded2] px-3 text-sm"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.currentTarget.value || 0))}
                placeholder="Max"
              />
            </div>
          </div>
        </div>
      ) : null}

      <div className="pt-6 flex gap-3">
        <button
          className="flex-1 rounded-md border border-ink bg-transparent px-4 py-3 text-sm"
          onClick={() => {
            setPriceMin(0);
            setPriceMax(0);
            clearFilters();
          }}
          type="button"
        >
          Reset
        </button>
        <button
          className="flex-1 rounded-full bg-ink px-6 py-3 text-sm font-medium uppercase text-white shadow-md"
          onClick={() => {
            applyPrice();
            viewItems();
          }}
        >
          Apply
        </button>
      </div>
    </aside>
  );
}
