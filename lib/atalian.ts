export type AtalianConfigId =
  | "armchair"
  | "2-seater"
  | "3-seater"
  | "3-2-set"
  | "full-set"
  | "corner";

export type AtalianConfig = {
  id: AtalianConfigId;
  label: string;
  shortLabel: string;
  /** Matches ProductVariant.label */
  variantLabel: string;
  /** Mode: single = colour+price only; set = full combination options */
  mode: "single" | "set";
  seats: number | null;
};

export const ATALIAN_CONFIGS: AtalianConfig[] = [
  { id: "armchair", label: "1 Seater", shortLabel: "1 Seater", variantLabel: "Armchair", mode: "single", seats: 1 },
  { id: "2-seater", label: "2 Seater", shortLabel: "2 Seater", variantLabel: "2 Seater", mode: "single", seats: 2 },
  { id: "3-seater", label: "3 Seater", shortLabel: "3 Seater", variantLabel: "3 Seater", mode: "single", seats: 3 },
  { id: "3-2-set", label: "3+2 Set", shortLabel: "3+2 Seater", variantLabel: "3+2 Set", mode: "set", seats: 5 },
  { id: "full-set", label: "Full Set", shortLabel: "Full Set", variantLabel: "3+2+1 Full Set", mode: "set", seats: 6 },
  { id: "corner", label: "Corner", shortLabel: "Corner", variantLabel: "Corner", mode: "single", seats: 5 },
];

export const ATALIAN_DEFAULT_CONFIG: AtalianConfigId = "full-set";

export function getAtalianConfig(id: string): AtalianConfig | null {
  return ATALIAN_CONFIGS.find((c) => c.id === id) ?? null;
}

export const ATALIAN_COLOURS = [
  { file: "cream", name: "Cream", hex: "#F5F0E8" },
  { file: "grey", name: "Grey", hex: "#8A8680" },
  { file: "black", name: "Black", hex: "#1A1A1A" },
  { file: "navy", name: "Navy", hex: "#1E3A5F" },
  { file: "brown", name: "Brown", hex: "#6B3A2A" },
  { file: "burgundy", name: "Burgundy", hex: "#6B2D3C" },
  { file: "green", name: "Green", hex: "#4A5240" },
  { file: "pink", name: "Pink", hex: "#C9A0A8" },
] as const;

export function atalianPhoto(configId: AtalianConfigId, colourFile: string) {
  return `/products/atalian/${configId}/${colourFile}.webp`;
}

/** Map shop/collection context → Atalian size page. */
export function atalianConfigForContext(ctx: {
  design?: string;
  size?: string;
}): AtalianConfigId {
  if (ctx.design === "corner-sofas") return "corner";
  if (ctx.design === "3-2-sofa-sets") return "3-2-set";
  if (ctx.design === "3-2-1-full-sets") return "full-set";
  if (ctx.size === "armchair") return "armchair";
  if (ctx.size === "2-seater") return "2-seater";
  if (ctx.size === "3-seater") return "3-seater";
  if (ctx.size === "5-seater") return "corner";
  if (ctx.size === "6-seater") return "full-set";
  // Chesterfield / all / default listing
  return "full-set";
}

const COLOUR_SLUG_TO_FILE: Record<string, string> = {
  "grey-sofas": "grey",
  "cream-sofas": "cream",
  "navy-sofas": "navy",
  "black-sofas": "black",
  "brown-sofas": "brown",
};

export function atalianColourFileForSlug(colourSlug?: string): string {
  if (!colourSlug) return "cream";
  return COLOUR_SLUG_TO_FILE[colourSlug] ?? "cream";
}

/** Rewire an Atalian product card for the shop context (photo, price, link). */
export function applyAtalianListingContext<
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
  if (product.slug !== "atalian-sofa") return product;

  const colourFile = atalianColourFileForSlug(ctx.colour);
  const colourLabel = colourFile.charAt(0).toUpperCase() + colourFile.slice(1);
  const cheapest =
    variants.length > 0 ? Math.min(...variants.map((v) => v.price_gbp)) : product.from_price;

  // Chesterfield collection: family card with full-set photo, cheapest "from" price.
  if (ctx.design === "chesterfield-sofas") {
    return {
      ...product,
      id: `${product.id}-family`,
      tagline: product.tagline,
      from_price: cheapest,
      set_price: product.set_price,
      href: "/products/atalian-sofa/full-set",
      image: {
        url: atalianPhoto("full-set", colourFile),
        alt: `${product.name} Full Set in ${colourLabel}`,
      },
    };
  }

  const configId = atalianConfigForContext(ctx);
  const config = getAtalianConfig(configId)!;
  const match = variants.find((v) => v.label === config.variantLabel);
  const price = match?.price_gbp ?? product.from_price;
  const hasSpecificContext = Boolean(ctx.design || ctx.size || ctx.colour);

  return {
    ...product,
    id: `${product.id}-${configId}${ctx.colour ? `-${colourFile}` : ""}`,
    tagline: hasSpecificContext ? `${config.label} · ${product.tagline}` : product.tagline,
    from_price: price,
    set_price: configId === "3-2-set" || configId === "full-set" ? product.set_price : null,
    href: `/products/atalian-sofa/${configId}`,
    image: {
      url: atalianPhoto(configId, colourFile),
      alt: `${product.name} ${config.label} in ${colourLabel}`,
    },
  };
}
