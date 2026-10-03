export type DinoConfigId =
  | "armchair"
  | "2-seater"
  | "3-seater"
  | "3-2-set"
  | "full-set"
  | "corner";

export type DinoConfig = {
  id: DinoConfigId;
  label: string;
  shortLabel: string;
  /** Matches ProductVariant.label */
  variantLabel: string;
  mode: "single" | "set";
  seats: number | null;
};

export const DINO_CONFIGS: DinoConfig[] = [
  { id: "armchair", label: "1 Seater", shortLabel: "1 Seater", variantLabel: "Armchair", mode: "single", seats: 1 },
  { id: "2-seater", label: "2 Seater", shortLabel: "2 Seater", variantLabel: "2 Seater", mode: "single", seats: 2 },
  { id: "3-seater", label: "3 Seater", shortLabel: "3 Seater", variantLabel: "3 Seater", mode: "single", seats: 3 },
  { id: "3-2-set", label: "3+2 Set", shortLabel: "3+2 Seater", variantLabel: "3+2 Set", mode: "set", seats: 5 },
  { id: "full-set", label: "Full Set", shortLabel: "Full Set", variantLabel: "3+2+1 Full Set", mode: "set", seats: 6 },
  { id: "corner", label: "Corner", shortLabel: "Corner", variantLabel: "Corner", mode: "single", seats: 5 },
];

export const DINO_DEFAULT_CONFIG: DinoConfigId = "3-2-set";

export const DINO_COLOURS = [
  { file: "beige-brown", name: "Beige & Brown", hex: "#C4A882" },
  { file: "grey-black", name: "Grey & Black", hex: "#4A4A4A" },
] as const;

export function getDinoConfig(id: string): DinoConfig | null {
  return DINO_CONFIGS.find((c) => c.id === id) ?? null;
}

export function dinoPhoto(configId: DinoConfigId, colourFile: string) {
  return `/products/dino/${configId}/${colourFile}.webp`;
}

export function dinoHref(configId: DinoConfigId = DINO_DEFAULT_CONFIG) {
  return `/products/dino-sofa/${configId}`;
}

export function dinoConfigForContext(ctx: {
  design?: string;
  size?: string;
}): DinoConfigId {
  if (ctx.design === "corner-sofas") return "corner";
  if (ctx.design === "3-2-sofa-sets") return "3-2-set";
  if (ctx.design === "3-2-1-full-sets") return "full-set";
  if (ctx.size === "armchair") return "armchair";
  if (ctx.size === "2-seater") return "2-seater";
  if (ctx.size === "3-seater") return "3-seater";
  if (ctx.size === "5-seater") return "corner";
  if (ctx.size === "6-seater") return "full-set";
  return DINO_DEFAULT_CONFIG;
}

const COLOUR_SLUG_TO_FILE: Record<string, string> = {
  "cream-sofas": "beige-brown",
  "brown-sofas": "beige-brown",
  "grey-sofas": "grey-black",
  "black-sofas": "grey-black",
};

export function dinoColourFileForSlug(colourSlug?: string): string {
  if (!colourSlug) return "beige-brown";
  return COLOUR_SLUG_TO_FILE[colourSlug] ?? "beige-brown";
}

/** Rewire a Dino product card for the shop context (photo, price, link). */
export function applyDinoListingContext<
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
  if (product.slug !== "dino-sofa") return product;

  const colourFile = dinoColourFileForSlug(ctx.colour);
  const colourMeta = DINO_COLOURS.find((c) => c.file === colourFile);
  const colourLabel = colourMeta?.name ?? "Beige & Brown";
  const cheapest =
    variants.length > 0 ? Math.min(...variants.map((v) => v.price_gbp)) : product.from_price;

  if (!ctx.design && !ctx.size && !ctx.colour) {
    return {
      ...product,
      href: dinoHref(),
      image: {
        url: dinoPhoto(DINO_DEFAULT_CONFIG, colourFile),
        alt: `${product.name} ${DINO_DEFAULT_CONFIG} in ${colourLabel}`,
      },
    };
  }

  const configId = dinoConfigForContext(ctx);
  const config = getDinoConfig(configId)!;
  const match = variants.find((v) => v.label === config.variantLabel);
  const price = match?.price_gbp ?? product.from_price;

  return {
    ...product,
    id: `${product.id}-${configId}${ctx.colour ? `-${colourFile}` : ""}`,
    tagline: `${config.label} · ${product.tagline}`,
    from_price: ctx.design || ctx.size ? price : cheapest,
    set_price: configId === "3-2-set" || configId === "full-set" ? product.set_price : null,
    href: dinoHref(configId),
    image: {
      url: dinoPhoto(configId, colourFile),
      alt: `${product.name} ${config.label} in ${colourLabel}`,
    },
  };
}
