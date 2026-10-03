import type { ArmStyle, IllustrationSpec } from "@/components/SofaIllustration";

export type SofaConfigId =
  | "armchair"
  | "2-seater"
  | "3-seater"
  | "3-2-set"
  | "full-set"
  | "corner";

export type SofaConfig = {
  id: SofaConfigId;
  label: string;
  shortLabel: string;
  variantLabel: string;
  mode: "single" | "set";
  seats: number | null;
};

export const SOFA_CONFIGS: SofaConfig[] = [
  { id: "armchair", label: "1 Seater", shortLabel: "1 Seater", variantLabel: "Armchair", mode: "single", seats: 1 },
  { id: "2-seater", label: "2 Seater", shortLabel: "2 Seater", variantLabel: "2 Seater", mode: "single", seats: 2 },
  { id: "3-seater", label: "3 Seater", shortLabel: "3 Seater", variantLabel: "3 Seater", mode: "single", seats: 3 },
  { id: "3-2-set", label: "3+2 Set", shortLabel: "3+2 Seater", variantLabel: "3+2 Set", mode: "set", seats: 5 },
  { id: "full-set", label: "Full Set", shortLabel: "Full Set", variantLabel: "3+2+1 Full Set", mode: "set", seats: 6 },
  { id: "corner", label: "Corner", shortLabel: "Corner", variantLabel: "Corner", mode: "single", seats: 5 },
];

export function getSofaConfig(id: string): SofaConfig | null {
  return SOFA_CONFIGS.find((c) => c.id === id) ?? null;
}

export function sofaConfigArt(configId: SofaConfigId, arms: ArmStyle = "square"): IllustrationSpec {
  switch (configId) {
    case "armchair":
      return { design: "sofa", pieces: [1], arms };
    case "2-seater":
      return { design: "sofa", pieces: [2], arms };
    case "3-seater":
      return { design: "sofa", pieces: [3], arms };
    case "3-2-set":
      return { design: "sofa", pieces: [3, 2], arms };
    case "full-set":
      return { design: "sofa", pieces: [3, 2, 1], arms };
    case "corner":
      return { design: "corner", arms };
  }
}

export function sofaConfigForContext(
  ctx: { design?: string; size?: string },
  fallback: SofaConfigId,
): SofaConfigId {
  if (ctx.design === "corner-sofas") return "corner";
  if (ctx.design === "3-2-sofa-sets") return "3-2-set";
  if (ctx.design === "3-2-1-full-sets") return "full-set";
  if (ctx.size === "armchair") return "armchair";
  if (ctx.size === "2-seater") return "2-seater";
  if (ctx.size === "3-seater") return "3-seater";
  if (ctx.size === "5-seater") return "corner";
  if (ctx.size === "6-seater") return "full-set";
  return fallback;
}

export function applySofaListingContext<
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
  slug: string,
  hrefFor: (configId?: SofaConfigId) => string,
  defaultConfig: SofaConfigId,
  ctx: { design?: string; size?: string; colour?: string },
  variants: { label: string; price_gbp: number }[] = [],
): T {
  if (product.slug !== slug) return product;

  const cheapest =
    variants.length > 0 ? Math.min(...variants.map((v) => v.price_gbp)) : product.from_price;

  if (!ctx.design && !ctx.size && !ctx.colour) {
    return {
      ...product,
      href: hrefFor(defaultConfig),
      from_price: cheapest,
      image: null,
    };
  }

  const configId = sofaConfigForContext(ctx, defaultConfig);
  const config = getSofaConfig(configId)!;
  const match = variants.find((v) => v.label === config.variantLabel);
  const price = match?.price_gbp ?? product.from_price;

  return {
    ...product,
    id: `${product.id}-${configId}`,
    tagline: `${config.label} · ${product.tagline}`,
    from_price: ctx.design || ctx.size ? price : cheapest,
    set_price: configId === "3-2-set" || configId === "full-set" ? product.set_price : null,
    href: hrefFor(configId),
    image: null,
  };
}
