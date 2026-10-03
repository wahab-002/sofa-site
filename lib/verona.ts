export type VeronaStyleId = "scatter-back" | "high-back";

export type VeronaConfigId =
  | "armchair"
  | "2-seater"
  | "3-seater"
  | "3-2-set"
  | "full-set"
  | "corner";

export type VeronaStyle = {
  id: VeronaStyleId;
  label: string;
  shortLabel: string;
  description: string;
};

export type VeronaConfig = {
  id: VeronaConfigId;
  label: string;
  shortLabel: string;
  /** Matches ProductVariant.label */
  variantLabel: string;
  mode: "single" | "set";
  seats: number | null;
};

export const VERONA_STYLES: VeronaStyle[] = [
  {
    id: "scatter-back",
    label: "Scatter Back",
    shortLabel: "Scatter Back",
    description: "Relaxed loose cushions",
  },
  {
    id: "high-back",
    label: "High Back",
    shortLabel: "High Back",
    description: "Extra support & height",
  },
];

export const VERONA_CONFIGS: VeronaConfig[] = [
  { id: "armchair", label: "1 Seater", shortLabel: "1 Seater", variantLabel: "Armchair", mode: "single", seats: 1 },
  { id: "2-seater", label: "2 Seater", shortLabel: "2 Seater", variantLabel: "2 Seater", mode: "single", seats: 2 },
  { id: "3-seater", label: "3 Seater", shortLabel: "3 Seater", variantLabel: "3 Seater", mode: "single", seats: 3 },
  { id: "3-2-set", label: "3+2 Set", shortLabel: "3+2 Seater", variantLabel: "3+2 Set", mode: "set", seats: 5 },
  { id: "full-set", label: "Full Set", shortLabel: "Full Set", variantLabel: "3+2+1 Full Set", mode: "set", seats: 6 },
  { id: "corner", label: "Corner", shortLabel: "Corner", variantLabel: "Corner", mode: "single", seats: 5 },
];

export const VERONA_DEFAULT_STYLE: VeronaStyleId = "scatter-back";
export const VERONA_DEFAULT_CONFIG: VeronaConfigId = "3-2-set";

/** Colours with photos today — more can be added later without route changes. */
export const VERONA_COLOURS = [
  { file: "grey", name: "Grey", hex: "#8A8680" },
  { file: "black", name: "Black", hex: "#1A1A1A" },
] as const;

export function getVeronaStyle(id: string): VeronaStyle | null {
  return VERONA_STYLES.find((s) => s.id === id) ?? null;
}

export function getVeronaConfig(id: string): VeronaConfig | null {
  return VERONA_CONFIGS.find((c) => c.id === id) ?? null;
}

export function veronaPhoto(styleId: VeronaStyleId, configId: VeronaConfigId, colourFile: string) {
  return `/products/verona/${styleId}/${configId}/${colourFile}.webp`;
}

export function veronaHref(styleId: VeronaStyleId = VERONA_DEFAULT_STYLE, configId: VeronaConfigId = VERONA_DEFAULT_CONFIG) {
  return `/products/verona-sofa/${styleId}/${configId}`;
}

export function veronaConfigForContext(ctx: {
  design?: string;
  size?: string;
}): VeronaConfigId {
  if (ctx.design === "corner-sofas") return "corner";
  if (ctx.design === "3-2-sofa-sets") return "3-2-set";
  if (ctx.design === "3-2-1-full-sets") return "full-set";
  if (ctx.size === "armchair") return "armchair";
  if (ctx.size === "2-seater") return "2-seater";
  if (ctx.size === "3-seater") return "3-seater";
  if (ctx.size === "5-seater") return "corner";
  if (ctx.size === "6-seater") return "full-set";
  return VERONA_DEFAULT_CONFIG;
}

const COLOUR_SLUG_TO_FILE: Record<string, string> = {
  "grey-sofas": "grey",
  "black-sofas": "black",
};

export function veronaColourFileForSlug(colourSlug?: string): string {
  if (!colourSlug) return "grey";
  return COLOUR_SLUG_TO_FILE[colourSlug] ?? "grey";
}

/** Rewire a Verona product card for the shop context (photo, price, link). */
export function applyVeronaListingContext<
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
  if (product.slug !== "verona-sofa") return product;

  const styleId = VERONA_DEFAULT_STYLE;
  const colourFile = veronaColourFileForSlug(ctx.colour);
  const colourLabel = colourFile.charAt(0).toUpperCase() + colourFile.slice(1);
  const cheapest =
    variants.length > 0 ? Math.min(...variants.map((v) => v.price_gbp)) : product.from_price;

  if (!ctx.design && !ctx.size && !ctx.colour) {
    return {
      ...product,
      href: veronaHref(),
      image: {
        url: veronaPhoto(styleId, VERONA_DEFAULT_CONFIG, colourFile),
        alt: `${product.name} ${VERONA_DEFAULT_CONFIG} in ${colourLabel}`,
      },
    };
  }

  const configId = veronaConfigForContext(ctx);
  const config = getVeronaConfig(configId)!;
  const match = variants.find((v) => v.label === config.variantLabel);
  const price = match?.price_gbp ?? product.from_price;

  return {
    ...product,
    id: `${product.id}-${styleId}-${configId}${ctx.colour ? `-${colourFile}` : ""}`,
    tagline: `${config.label} · ${product.tagline}`,
    from_price: ctx.design || ctx.size ? price : cheapest,
    set_price: configId === "3-2-set" || configId === "full-set" ? product.set_price : null,
    href: veronaHref(styleId, configId),
    image: {
      url: veronaPhoto(styleId, configId, colourFile),
      alt: `${product.name} ${config.label} in ${colourLabel}`,
    },
  };
}
