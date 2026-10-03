import type { SofaConfigId } from "./sofaCollection";
import { SOFA_CONFIGS, applySofaListingContext, getSofaConfig, sofaConfigArt, sofaConfigForContext } from "./sofaCollection";

export type AshtonConfigId = SofaConfigId;
export type AshtonConfig = (typeof SOFA_CONFIGS)[number];

export const ASHTON_CONFIGS = SOFA_CONFIGS;
export const ASHTON_DEFAULT_CONFIG: AshtonConfigId = "3-2-set";
export const ASHTON_ARMS = "slim" as const;

export const getAshtonConfig = getSofaConfig;
export const ashtonConfigArt = (id: AshtonConfigId) => sofaConfigArt(id, ASHTON_ARMS);
export const ashtonConfigForContext = (ctx: { design?: string; size?: string }) =>
  sofaConfigForContext(ctx, ASHTON_DEFAULT_CONFIG);

export function ashtonHref(configId: AshtonConfigId = ASHTON_DEFAULT_CONFIG) {
  return `/products/ashton-sofa/${configId}`;
}

export function applyAshtonListingContext<
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
  return applySofaListingContext(product, "ashton-sofa", ashtonHref, ASHTON_DEFAULT_CONFIG, ctx, variants);
}
