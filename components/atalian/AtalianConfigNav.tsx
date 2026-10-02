"use client";

import Link from "next/link";
import { ATALIAN_CONFIGS, type AtalianConfigId } from "@/lib/atalian";
import { formatPrice } from "@/lib/site";

type Props = {
  active: AtalianConfigId;
  prices: Record<string, number>;
};

export default function AtalianConfigNav({ active, prices }: Props) {
  return (
    <nav aria-label="Atalian size options" className="border-b border-charcoal/10 bg-white">
      <div className="container-site">
        <p className="pt-4 font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal/45">
          Choose your configuration
        </p>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-4 pt-3 scrollbar-none md:mx-0 md:flex-wrap md:px-0">
          {ATALIAN_CONFIGS.map((c) => {
            const isActive = c.id === active;
            const price = prices[c.variantLabel];
            return (
              <Link
                key={c.id}
                href={`/products/atalian-sofa/${c.id}`}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-w-[7.5rem] flex-shrink-0 flex-col rounded-2xl border px-3.5 py-3 transition-all md:min-w-0 ${
                  isActive
                    ? "border-charcoal bg-charcoal text-linen shadow-soft"
                    : "border-charcoal/12 bg-linen/60 text-charcoal hover:border-charcoal/35 hover:bg-white"
                }`}
              >
                <span className="font-body text-sm font-semibold">{c.shortLabel}</span>
                {typeof price === "number" && (
                  <span className={`mt-0.5 font-body text-xs ${isActive ? "text-linen/70" : "text-charcoal/55"}`}>
                    From {formatPrice(price)}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
