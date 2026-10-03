import type { IllustrationSpec } from "@/components/SofaIllustration";

export type OlympiaConfigId =
  | "armchair"
  | "2-seater"
  | "3-seater"
  | "3-2-set"
  | "full-set"
  | "corner";

export type OlympiaConfig = {
  id: OlympiaConfigId;
  label: string;
  shortLabel: string;
  /** Matches ProductVariant.label */
  variantLabel: string;
  mode: "single" | "set";
  seats: number | null;
};

export const OLYMPIA_CONFIGS: OlympiaConfig[] = [
  { id: "armchair", label: "1 Seater", shortLabel: "1 Seater", variantLabel: "Armchair", mode: "single", seats: 1 },
  { id: "2-seater", label: "2 Seater", shortLabel: "2 Seater", variantLabel: "2 Seater", mode: "single", seats: 2 },
  { id: "3-seater", label: "3 Seater", shortLabel: "3 Seater", variantLabel: "3 Seater", mode: "single", seats: 3 },
  { id: "3-2-set", label: "3+2 Set", shortLabel: "3+2 Seater", variantLabel: "3+2 Set", mode: "set", seats: 5 },
  { id: "full-set", label: "Full Set", shortLabel: "Full Set", variantLabel: "3+2+1 Full Set", mode: "set", seats: 6 },
  { id: "corner", label: "Corner", shortLabel: "Corner", variantLabel: "Corner", mode: "single", seats: 5 },
];

export const OLYMPIA_DEFAULT_CONFIG: OlympiaConfigId = "full-set";

export const OLYMPIA_PHOTOS = [
  "/products/olympia/photo-01.webp",
  "/products/olympia/photo-02.webp",
  "/products/olympia/photo-03.webp",
  "/products/olympia/photo-04.webp",
  "/products/olympia/photo-05.webp",
] as const;

export function getOlympiaConfig(id: string): OlympiaConfig | null {
  return OLYMPIA_CONFIGS.find((c) => c.id === id) ?? null;
}

export function olympiaHref(configId: OlympiaConfigId = OLYMPIA_DEFAULT_CONFIG) {
  return `/products/olympia-sofa/${configId}`;
}

export function olympiaConfigArt(configId: OlympiaConfigId): IllustrationSpec {
  switch (configId) {
    case "armchair":
      return { design: "chesterfield", pieces: [1] };
    case "2-seater":
      return { design: "chesterfield", pieces: [2] };
    case "3-seater":
      return { design: "chesterfield", pieces: [3] };
    case "3-2-set":
      return { design: "chesterfield", pieces: [3, 2] };
    case "full-set":
      return { design: "chesterfield", pieces: [3, 2, 1] };
    case "corner":
      return { design: "corner", arms: "slim" };
  }
}

export function olympiaArtForVariantLabel(label: string): IllustrationSpec {
  const match = OLYMPIA_CONFIGS.find((c) => c.variantLabel === label);
  return olympiaConfigArt(match?.id ?? OLYMPIA_DEFAULT_CONFIG);
}

export function olympiaConfigForContext(ctx: {
  design?: string;
  size?: string;
}): OlympiaConfigId {
  if (ctx.design === "corner-sofas") return "corner";
  if (ctx.design === "3-2-sofa-sets") return "3-2-set";
  if (ctx.design === "3-2-1-full-sets") return "full-set";
  if (ctx.design === "chesterfield-sofas") return "full-set";
  if (ctx.size === "armchair") return "armchair";
  if (ctx.size === "2-seater") return "2-seater";
  if (ctx.size === "3-seater") return "3-seater";
  if (ctx.size === "5-seater") return "corner";
  if (ctx.size === "6-seater") return "full-set";
  return OLYMPIA_DEFAULT_CONFIG;
}

/** Rewire an Olympia product card for the shop context (price, link). */
export function applyOlympiaListingContext<
  T extends {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    from_price: number;
    set_price: number | null;
    image: { url: string; alt: string | null } | null;
    href?: string | null;
  },
>(
  product: T,
  ctx: { design?: string; size?: string; colour?: string },
  variants: { label: string; price_gbp: number }[] = [],
): T {
  if (product.slug !== "olympia-sofa") return product;

  const cheapest =
    variants.length > 0 ? Math.min(...variants.map((v) => v.price_gbp)) : product.from_price;

  if (ctx.design === "chesterfield-sofas" || (!ctx.design && !ctx.size && !ctx.colour)) {
    return {
      ...product,
      href: olympiaHref(),
      from_price: cheapest,
      image: {
        url: OLYMPIA_PHOTOS[0],
        alt: `${product.name} Full Set`,
      },
    };
  }

  const configId = olympiaConfigForContext(ctx);
  const config = getOlympiaConfig(configId)!;
  const match = variants.find((v) => v.label === config.variantLabel);
  const price = match?.price_gbp ?? product.from_price;

  return {
    ...product,
    id: `${product.id}-${configId}`,
    tagline: `${config.label} · ${product.tagline}`,
    from_price: ctx.design || ctx.size ? price : cheapest,
    set_price: configId === "3-2-set" || configId === "full-set" ? product.set_price : null,
    href: olympiaHref(configId),
    image: {
      url: OLYMPIA_PHOTOS[0],
      alt: `${product.name} ${config.label}`,
    },
  };
}
