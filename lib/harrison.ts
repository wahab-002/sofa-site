import type { SofaConfigId } from "./sofaCollection";
import { SOFA_CONFIGS, applySofaListingContext, getSofaConfig, sofaConfigArt, sofaConfigForContext } from "./sofaCollection";

export type HarrisonConfigId = SofaConfigId;
export type HarrisonConfig = (typeof SOFA_CONFIGS)[number];

export const HARRISON_CONFIGS = SOFA_CONFIGS;
export const HARRISON_DEFAULT_CONFIG: HarrisonConfigId = "3-2-set";
export const HARRISON_ARMS = "square" as const;

export const getHarrisonConfig = getSofaConfig;
export const harrisonConfigArt = (id: HarrisonConfigId) => sofaConfigArt(id, HARRISON_ARMS);
export const harrisonConfigForContext = (ctx: { design?: string; size?: string }) =>
  sofaConfigForContext(ctx, HARRISON_DEFAULT_CONFIG);

export function harrisonHref(configId: HarrisonConfigId = HARRISON_DEFAULT_CONFIG) {
  return `/products/harrison-sofa/${configId}`;
}

export function applyHarrisonListingContext<
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
  return applySofaListingContext(product, "harrison-sofa", harrisonHref, HARRISON_DEFAULT_CONFIG, ctx, variants);
}
