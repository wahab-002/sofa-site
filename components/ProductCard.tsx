"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { ProductSummary } from "@/lib/types";
import SofaIllustration from "./SofaIllustration";
import Icon from "./Icon";
import { cardColour, cardIllustration } from "@/lib/illustration";
import { formatPrice } from "@/lib/site";
import { swatchStyle } from "./product/ProductGallery";

const designLabel: Record<string, string> = {
  chesterfield: "Chesterfield",
  "u-shape": "U-Shape",
  modular: "Modular",
};

const MAX_SWATCHES = 6;

export default function ProductCard({ product, index = 0 }: { product: ProductSummary; index?: number }) {
  const defaultColour = cardColour(product, index);
  const [colour, setColour] = useState(defaultColour);
  const extraColours = product.colours.length - MAX_SWATCHES;

  return (
    <Link
      href={product.href ?? (product.slug === "atalian-sofa" ? "/products/atalian-sofa/full-set" : `/products/${product.slug}`)}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-charcoal/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-sand to-stone/70">
        {product.image ? (
          <Image
            src={product.image.url}
            alt={product.image.alt ?? product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-x-[9%] bottom-[12%] top-[22%] flex items-end transition-transform duration-700 group-hover:scale-[1.04]">
            <SofaIllustration spec={cardIllustration(product)} colour={colour} className="h-full w-full" title={product.name} />
          </div>
        )}

        <div className="absolute left-2.5 top-2.5 flex gap-1.5 whitespace-nowrap md:left-3 md:top-3">
          {product.featured && (
            <span className="rounded-full bg-charcoal px-2 py-0.5 font-body text-[10px] font-semibold uppercase tracking-wider text-linen md:px-2.5 md:py-1 md:text-[11px]">
              Best seller
            </span>
          )}
          {designLabel[product.design_type] && (
            <span className="hidden rounded-full bg-white/85 px-2.5 py-1 font-body text-[11px] font-medium text-charcoal/70 backdrop-blur sm:inline-block">
              {designLabel[product.design_type]}
            </span>
          )}
        </div>

        <span className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-charcoal opacity-0 shadow-soft transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Icon name="arrow" className="h-4 w-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        {product.colours.length <= 1 ? (
          <p className="mb-3 flex h-4 items-center gap-1.5 font-body text-xs text-charcoal/50">
            <span className="h-4 w-4 flex-shrink-0 rounded-full ring-1 ring-charcoal/15" style={{ backgroundColor: colour }} />
            <span className="truncate">{(product.colours[0]?.name ?? "Colour").replace(/\s*\(.*\)/, "")} only</span>
          </p>
        ) : (
          <div className="mb-3 flex h-4 items-center gap-1.5" onMouseLeave={() => setColour(defaultColour)}>
            {product.colours.slice(0, MAX_SWATCHES).map((c) => (
              <span
                key={c.name}
                title={c.name}
                onMouseEnter={() => setColour(c.hex_code)}
                className={`h-4 w-4 rounded-full ring-1 ring-charcoal/15 transition-transform hover:scale-125 ${
                  !product.image && colour === c.hex_code ? "ring-2 ring-charcoal/60 ring-offset-1" : ""
                }`}
                style={swatchStyle(c)}
              />
            ))}
            {extraColours > 0 && <span className="font-body text-xs text-charcoal/50">+{extraColours}</span>}
          </div>
        )}

        <h3 className="font-display text-lg font-semibold leading-snug text-charcoal md:text-xl">{product.name}</h3>
        <p className="mt-1 line-clamp-1 font-body text-sm text-charcoal/55">{product.tagline}</p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div>
            <p className="font-body text-[11px] uppercase tracking-wider text-charcoal/45">From</p>
            <p className="font-display text-2xl font-semibold leading-none text-charcoal">{formatPrice(product.from_price)}</p>
          </div>
          {product.set_price && (
            <p className="text-right font-body text-xs leading-tight text-charcoal/55">
              3+2 set
              <span className="block font-semibold text-forest">{formatPrice(product.set_price)}</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
