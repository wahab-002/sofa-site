import { isSupabaseConfigured, supabase } from "./supabase";
import type { Product, ProductSummary, ProductWithDetails } from "./types";
import { getProductMedia, mediaColours, productMedia } from "./productMedia";
import { applyAtalianListingContext } from "./atalian";
import { applyAshtonListingContext, ashtonHref } from "./ashton";
import { applyDinoListingContext, dinoHref } from "./dino";
import { applyHarrisonListingContext, harrisonHref } from "./harrison";
import { applyLilyListingContext, lilyHref } from "./lily";
import { applyOlympiaListingContext, olympiaHref } from "./olympia";
import { applyVeronaListingContext, veronaHref } from "./verona";
import { toLocalAssetUrl } from "./site";
import {
  localAllProducts,
  localAllSlugs,
  localProductBySlug,
  localProductsByColour,
  localProductsByDesign,
  localProductsBySize,
  localRecommendations,
} from "./localCatalog";

function db() {
  if (!isSupabaseConfigured || !supabase) return null;
  return supabase;
}

function cardImage(slug: string, name: string) {
  const media = getProductMedia(slug);
  return media ? { url: media.cardImage, alt: name } : null;
}

const SUMMARY_SELECT =
  "*, product_colours(name, hex_code, in_stock), product_variants(label, price_gbp, in_stock), product_images(image_url, alt_text, is_primary, sort_order)";

type SummaryRow = Product & {
  product_colours: { name: string; hex_code: string; in_stock: boolean }[] | null;
  product_variants: { label: string; price_gbp: number; in_stock: boolean }[] | null;
  product_images: { image_url: string; alt_text: string | null; is_primary: boolean; sort_order: number }[] | null;
};

function toSummary(row: SummaryRow): ProductSummary {
  const { product_colours, product_variants, product_images, ...product } = row;
  const variants = (product_variants ?? []).filter((v) => v.in_stock);
  const prices = variants.map((v) => v.price_gbp);
  const images = [...(product_images ?? [])].sort(
    (a, b) => Number(b.is_primary) - Number(a.is_primary) || a.sort_order - b.sort_order,
  );
  return {
    ...product,
    colours: mediaColours(
      product.slug,
      (product_colours ?? []).filter((c) => c.in_stock).map(({ name, hex_code }) => ({ name, hex_code, swatch_url: null })),
      (c) => ({ name: c.name, hex_code: c.hex, swatch_url: c.swatch ?? null }),
    ),
    from_price: prices.length ? Math.min(...prices) : product.base_price,
    set_price: variants.find((v) => v.label === "3+2 Set")?.price_gbp ?? null,
    image: images[0]
      ? { url: toLocalAssetUrl(images[0].image_url), alt: images[0].alt_text }
      : cardImage(product.slug, product.name),
    href:
      product.slug === "atalian-sofa"
        ? "/products/atalian-sofa/full-set"
        : product.slug === "verona-sofa"
          ? veronaHref()
          : product.slug === "lily-sofa"
            ? lilyHref()
            : product.slug === "dino-sofa"
              ? dinoHref()
              : product.slug === "olympia-sofa"
                ? olympiaHref()
                : product.slug === "ashton-sofa"
                  ? ashtonHref()
                  : product.slug === "harrison-sofa"
                    ? harrisonHref()
                    : null,
  };
}

function toSummaries(data: unknown): ProductSummary[] {
  return ((data as SummaryRow[] | null) ?? []).map(toSummary);
}

function withListingContext(
  rows: SummaryRow[] | null | undefined,
  summaries: ProductSummary[],
  ctx: { design?: string; size?: string; colour?: string },
): ProductSummary[] {
  return summaries.map((p) => {
    if (p.slug === "atalian-sofa") {
      const row = (rows ?? []).find((r) => r.slug === "atalian-sofa");
      const variants = (row?.product_variants ?? []).filter((v) => v.in_stock);
      return applyAtalianListingContext(p, ctx, variants);
    }
    if (p.slug === "verona-sofa") {
      const row = (rows ?? []).find((r) => r.slug === "verona-sofa");
      const variants = (row?.product_variants ?? []).filter((v) => v.in_stock);
      return applyVeronaListingContext(p, ctx, variants);
    }
    if (p.slug === "lily-sofa") {
      const row = (rows ?? []).find((r) => r.slug === "lily-sofa");
      const variants = (row?.product_variants ?? []).filter((v) => v.in_stock);
      return applyLilyListingContext(p, ctx, variants);
    }
    if (p.slug === "dino-sofa") {
      const row = (rows ?? []).find((r) => r.slug === "dino-sofa");
      const variants = (row?.product_variants ?? []).filter((v) => v.in_stock);
      return applyDinoListingContext(p, ctx, variants);
    }
    if (p.slug === "olympia-sofa") {
      const row = (rows ?? []).find((r) => r.slug === "olympia-sofa");
      const variants = (row?.product_variants ?? []).filter((v) => v.in_stock);
      return applyOlympiaListingContext(p, ctx, variants);
    }
    if (p.slug === "ashton-sofa") {
      const row = (rows ?? []).find((r) => r.slug === "ashton-sofa");
      const variants = (row?.product_variants ?? []).filter((v) => v.in_stock);
      return applyAshtonListingContext(p, ctx, variants);
    }
    if (p.slug === "harrison-sofa") {
      const row = (rows ?? []).find((r) => r.slug === "harrison-sofa");
      const variants = (row?.product_variants ?? []).filter((v) => v.in_stock);
      return applyHarrisonListingContext(p, ctx, variants);
    }
    return p;
  });
}

export async function getAllProducts(): Promise<ProductSummary[]> {
  const client = db();
  if (!client) return localAllProducts();
  const { data, error } = await client
    .from("products")
    .select(SUMMARY_SELECT)
    .eq("in_stock", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });
  if (error || !data?.length) return localAllProducts();
  return toSummaries(data);
}

export async function getProductBySlug(slug: string): Promise<ProductWithDetails | null> {
  const client = db();
  if (!client) return localProductBySlug(slug);
  const { data: product, error } = await client
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !product) return localProductBySlug(slug);

  const [variants, colours, fabrics, images, extras] = await Promise.all([
    client.from("product_variants").select("*").eq("product_id", product.id).eq("in_stock", true).order("sort_order"),
    client.from("product_colours").select("*").eq("product_id", product.id).eq("in_stock", true),
    client.from("product_fabrics").select("*").eq("product_id", product.id).eq("in_stock", true),
    client.from("product_images").select("*").eq("product_id", product.id).order("sort_order"),
    client.from("product_extras").select("*").eq("product_id", product.id).eq("in_stock", true),
  ]);

  return {
    ...product,
    variants: variants.data || [],
    colours: mediaColours(product.slug, colours.data || [], (c) => ({
      id: `${product.slug}-${c.name.toLowerCase()}`,
      product_id: product.id,
      name: c.name,
      hex_code: c.hex,
      swatch_url: c.swatch ?? null,
      close_up_url: c.closeUp ?? null,
      in_stock: true,
    })),
    fabrics: fabrics.data || [],
    images: (images.data || []).map((img) => ({
      ...img,
      image_url: toLocalAssetUrl(img.image_url),
    })),
    extras: extras.data || [],
  } as ProductWithDetails;
}

export async function getProductsByDesign(design: string): Promise<ProductSummary[]> {
  const client = db();
  if (!client) return localProductsByDesign(design);
  let query = client.from("products").select(SUMMARY_SELECT).eq("in_stock", true);

  if (design === "corner-sofas") query = query.eq("has_corner", true);
  else if (design === "chesterfield-sofas") query = query.eq("design_type", "chesterfield");
  else if (design === "u-shape-sofas") query = query.eq("design_type", "u-shape");
  else if (design === "modular-sofas") query = query.eq("design_type", "modular");
  else if (design === "3-2-sofa-sets" || design === "3-2-1-full-sets") {
    query = query.in("design_type", ["regular", "chesterfield"]);
  }

  const { data, error } = await query.order("featured", { ascending: false });
  if (error || !data?.length) return localProductsByDesign(design);
  return withListingContext(data as SummaryRow[], toSummaries(data), { design });
}

export async function getProductsBySize(size: string): Promise<ProductSummary[]> {
  const client = db();
  if (!client) return localProductsBySize(size);
  const seatMap: Record<string, number> = {
    armchair: 1, "2-seater": 2, "3-seater": 3, "4-seater": 4, "5-seater": 5, "6-seater": 6,
  };
  const seats = seatMap[size];
  if (!seats) return [];

  const { data: variants, error } = await client
    .from("product_variants")
    .select("product_id")
    .eq("seats", seats)
    .eq("in_stock", true);
  if (error || !variants?.length) return localProductsBySize(size);

  const ids = [...new Set(variants.map((v) => v.product_id))];
  if (ids.length === 0) return localProductsBySize(size);

  const { data, error: err2 } = await client
    .from("products")
    .select(SUMMARY_SELECT)
    .in("id", ids)
    .eq("in_stock", true)
    .order("featured", { ascending: false });
  if (err2 || !data?.length) return localProductsBySize(size);
  return withListingContext(data as SummaryRow[], toSummaries(data), { size });
}

export async function getProductsByColour(colour: string): Promise<ProductSummary[]> {
  const client = db();
  if (!client) return localProductsByColour(colour);
  const colourMap: Record<string, string[]> = {
    "grey-sofas": ["Dark Grey", "Light Grey", "Grey"],
    "cream-sofas": ["Cream", "Beige"],
    "navy-sofas": ["Navy", "Blue"],
    "black-sofas": ["Black"],
    "brown-sofas": ["Brown", "Brown (Tech Leather)", "Chocolate", "Tan"],
  };
  const names = colourMap[colour] || [];
  if (names.length === 0) return [];

  const { data: colours, error } = await client
    .from("product_colours")
    .select("product_id")
    .in("name", names);
  if (error || !colours) return localProductsByColour(colour);

  const overridden = Object.entries(productMedia).filter(([, m]) => m.colours);
  const matchingSlugs = overridden.filter(([, m]) => m.colours!.some((c) => names.includes(c.name))).map(([slug]) => slug);
  const excludedSlugs = new Set(overridden.map(([slug]) => slug).filter((slug) => !matchingSlugs.includes(slug)));

  const ids = [...new Set(colours.map((c) => c.product_id))];
  if (ids.length === 0 && matchingSlugs.length === 0) return localProductsByColour(colour);

  const filters = [ids.length && `id.in.(${ids.join(",")})`, matchingSlugs.length && `slug.in.(${matchingSlugs.join(",")})`]
    .filter(Boolean)
    .join(",");
  const { data, error: err2 } = await client
    .from("products")
    .select(SUMMARY_SELECT)
    .or(filters)
    .eq("in_stock", true)
    .order("featured", { ascending: false });
  if (err2 || !data?.length) return localProductsByColour(colour);
  return withListingContext(
    data as SummaryRow[],
    toSummaries(data).filter((p) => !excludedSlugs.has(p.slug)),
    { colour },
  );
}

export async function getRecommendations(currentSlug: string, limit = 4): Promise<ProductSummary[]> {
  const client = db();
  if (!client) return localRecommendations(currentSlug, limit);
  const { data, error } = await client
    .from("products")
    .select(SUMMARY_SELECT)
    .eq("in_stock", true)
    .neq("slug", currentSlug)
    .order("featured", { ascending: false })
    .limit(limit);
  if (error || !data?.length) return localRecommendations(currentSlug, limit);
  return toSummaries(data);
}

export async function getAllProductSlugs(): Promise<string[]> {
  const client = db();
  if (!client) return localAllSlugs();
  const { data, error } = await client.from("products").select("slug");
  if (error || !data?.length) return localAllSlugs();
  return data.map((p) => p.slug);
}
