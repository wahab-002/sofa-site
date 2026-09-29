"use client";

import { useMemo, useState } from "react";
import type { ProductSummary } from "@/lib/types";
import ProductCard from "./ProductCard";

const sorts = {
  recommended: { label: "Recommended", fn: () => 0 },
  "price-asc": { label: "Price: low to high", fn: (a: ProductSummary, b: ProductSummary) => a.from_price - b.from_price },
  "price-desc": { label: "Price: high to low", fn: (a: ProductSummary, b: ProductSummary) => b.from_price - a.from_price },
} as const;

type SortKey = keyof typeof sorts;

export default function ProductGrid({ products }: { products: ProductSummary[] }) {
  const [sort, setSort] = useState<SortKey>("recommended");
  const sorted = useMemo(() => [...products].sort(sorts[sort].fn), [products, sort]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="font-body text-sm text-charcoal/55">
          <span className="font-semibold text-charcoal">{products.length}</span> sofa{products.length === 1 ? "" : "s"}
        </p>
        <label className="flex items-center gap-2 font-body text-sm text-charcoal/55">
          <span className="hidden sm:inline">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="cursor-pointer rounded-full border border-charcoal/15 bg-white px-4 py-2 font-medium text-charcoal focus:border-charcoal focus:outline-none"
          >
            {Object.entries(sorts).map(([key, s]) => (
              <option key={key} value={key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
