export type LilyConfigId =
  | "armchair"
  | "2-seater"
  | "3-seater"
  | "3-2-set"
  | "full-set"
  | "corner";

export type LilyConfig = {
  id: LilyConfigId;
  label: string;
  shortLabel: string;
  /** Matches ProductVariant.label */
  variantLabel: string;
  mode: "single" | "set";
  seats: number | null;
};

export const LILY_CONFIGS: LilyConfig[] = [
  { id: "armchair", label: "1 Seater", shortLabel: "1 Seater", variantLabel: "Armchair", mode: "single", seats: 1 },
  { id: "2-seater", label: "2 Seater", shortLabel: "2 Seater", variantLabel: "2 Seater", mode: "single", seats: 2 },
  { id: "3-seater", label: "3 Seater", shortLabel: "3 Seater", variantLabel: "3 Seater", mode: "single", seats: 3 },
  { id: "3-2-set", label: "3+2 Set", shortLabel: "3+2 Seater", variantLabel: "3+2 Set", mode: "set", seats: 5 },
  { id: "full-set", label: "Full Set", shortLabel: "Full Set", variantLabel: "3+2+1 Full Set", mode: "set", seats: 6 },
  { id: "corner", label: "Corner", shortLabel: "Corner", variantLabel: "Corner", mode: "single", seats: 5 },
];

export const LILY_DEFAULT_CONFIG: LilyConfigId = "3-2-set";

export const LILY_COLOURS = [
  { file: "beige", name: "Beige", hex: "#C9B99A" },
  { file: "black", name: "Black", hex: "#1A1A1A" },
  { file: "blue", name: "Blue", hex: "#3A4F6A" },
] as const;

export function getLilyConfig(id: string): LilyConfig | null {
  return LILY_CONFIGS.find((c) => c.id === id) ?? null;
}

export function lilyPhoto(configId: LilyConfigId, colourFile: string) {
  return `/products/lily/${configId}/${colourFile}.webp`;
}

export function lilyHref(configId: LilyConfigId = LILY_DEFAULT_CONFIG) {
  return `/products/lily-sofa/${configId}`;
}

export function lilyConfigForContext(ctx: {
  design?: string;
  size?: string;
}): LilyConfigId {
  if (ctx.design === "corner-sofas") return "corner";
  if (ctx.design === "3-2-sofa-sets") return "3-2-set";
  if (ctx.design === "3-2-1-full-sets") return "full-set";
  if (ctx.size === "armchair") return "armchair";
  if (ctx.size === "2-seater") return "2-seater";
  if (ctx.size === "3-seater") return "3-seater";
  if (ctx.size === "5-seater") return "corner";
  if (ctx.size === "6-seater") return "full-set";
  return LILY_DEFAULT_CONFIG;
}

const COLOUR_SLUG_TO_FILE: Record<string, string> = {
  "cream-sofas": "beige",
  "black-sofas": "black",
  "navy-sofas": "blue",
};

export function lilyColourFileForSlug(colourSlug?: string): string {
  if (!colourSlug) return "beige";
  return COLOUR_SLUG_TO_FILE[colourSlug] ?? "beige";
}

/** Rewire a Lily product card for the shop context (photo, price, link). */
export function applyLilyListingContext<
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
  if (product.slug !== "lily-sofa") return product;

  const colourFile = lilyColourFileForSlug(ctx.colour);
  const colourLabel = colourFile.charAt(0).toUpperCase() + colourFile.slice(1);
  const cheapest =
    variants.length > 0 ? Math.min(...variants.map((v) => v.price_gbp)) : product.from_price;

  if (!ctx.design && !ctx.size && !ctx.colour) {
    return {
      ...product,
      href: lilyHref(),
      image: {
        url: lilyPhoto(LILY_DEFAULT_CONFIG, colourFile),
        alt: `${product.name} ${LILY_DEFAULT_CONFIG} in ${colourLabel}`,
      },
    };
  }

  const configId = lilyConfigForContext(ctx);
  const config = getLilyConfig(configId)!;
  const match = variants.find((v) => v.label === config.variantLabel);
  const price = match?.price_gbp ?? product.from_price;

  return {
    ...product,
    id: `${product.id}-${configId}${ctx.colour ? `-${colourFile}` : ""}`,
    tagline: `${config.label} · ${product.tagline}`,
    from_price: ctx.design || ctx.size ? price : cheapest,
    set_price: configId === "3-2-set" || configId === "full-set" ? product.set_price : null,
    href: lilyHref(configId),
    image: {
      url: lilyPhoto(configId, colourFile),
      alt: `${product.name} ${config.label} in ${colourLabel}`,
    },
  };
}
