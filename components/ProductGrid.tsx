"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ProductSummary } from "@/lib/types";
import Icon from "./Icon";
import ProductCard from "./ProductCard";

const sorts = {
  recommended: { label: "Recommended", fn: () => 0 },
  "price-asc": { label: "Price: low to high", fn: (a: ProductSummary, b: ProductSummary) => a.from_price - b.from_price },
  "price-desc": { label: "Price: high to low", fn: (a: ProductSummary, b: ProductSummary) => b.from_price - a.from_price },
} as const;

type SortKey = keyof typeof sorts;

export default function ProductGrid({
  products,
  itemLabel = "sofa",
}: {
  products: ProductSummary[];
  itemLabel?: string;
}) {
  const [sort, setSort] = useState<SortKey>("recommended");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const sorted = useMemo(() => [...products].sort(sorts[sort].fn), [products, sort]);
  const plural = products.length === 1 ? itemLabel : `${itemLabel}s`;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="font-body text-sm text-charcoal/55">
          <span className="font-semibold text-charcoal">{products.length}</span> {plural}
        </p>
        <div className="flex items-center gap-2 font-body text-sm text-charcoal/55">
          <span className="hidden sm:inline">Sort by</span>
          <div ref={menuRef} className="relative">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white py-2 pl-4 pr-4 font-body text-sm font-medium text-charcoal transition-colors hover:border-charcoal/30 focus:border-charcoal focus:outline-none"
            >
              {sorts[sort].label}
              <Icon
                name="chevron"
                className={`h-4 w-4 text-charcoal/55 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open && (
              <ul
                role="listbox"
                aria-label="Sort products"
                className="absolute right-0 z-30 mt-2 min-w-full overflow-hidden rounded-2xl border border-charcoal/10 bg-white py-1.5 font-body text-sm shadow-soft"
              >
                {(Object.keys(sorts) as SortKey[]).map((key) => {
                  const active = key === sort;
                  return (
                    <li key={key} role="option" aria-selected={active}>
                      <button
                        type="button"
                        onClick={() => {
                          setSort(key);
                          setOpen(false);
                        }}
                        className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors ${
                          active
                            ? "bg-sand font-medium text-charcoal"
                            : "text-charcoal/75 hover:bg-sand/70 hover:text-charcoal"
                        }`}
                      >
                        {sorts[key].label}
                        {active && <Icon name="check" className="h-4 w-4 text-forest" strokeWidth={2.4} />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
