import { supabase } from "./supabase";
import type { Product, ProductSummary, ProductWithDetails } from "./types";
import { getProductMedia } from "./productMedia";

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
    colours: (product_colours ?? []).filter((c) => c.in_stock).map(({ name, hex_code }) => ({ name, hex_code })),
    from_price: prices.length ? Math.min(...prices) : product.base_price,
    set_price: variants.find((v) => v.label === "3+2 Set")?.price_gbp ?? null,
    image: images[0]
      ? { url: images[0].image_url, alt: images[0].alt_text }
      : cardImage(product.slug, product.name),
  };
}

function toSummaries(data: unknown): ProductSummary[] {
  return ((data as SummaryRow[] | null) ?? []).map(toSummary);
}

export async function getAllProducts(): Promise<ProductSummary[]> {
  const { data, error } = await supabase
    .from("products")
    .select(SUMMARY_SELECT)
    .eq("in_stock", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) return [];
  return toSummaries(data);
}

export async function getProductBySlug(slug: string): Promise<ProductWithDetails | null> {
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !product) return null;

  const [variants, colours, fabrics, images, extras] = await Promise.all([
    supabase.from("product_variants").select("*").eq("product_id", product.id).eq("in_stock", true).order("sort_order"),
    supabase.from("product_colours").select("*").eq("product_id", product.id).eq("in_stock", true),
    supabase.from("product_fabrics").select("*").eq("product_id", product.id).eq("in_stock", true),
    supabase.from("product_images").select("*").eq("product_id", product.id).order("sort_order"),
    supabase.from("product_extras").select("*").eq("product_id", product.id).eq("in_stock", true),
  ]);

  return {
    ...product,
    variants: variants.data || [],
    colours: colours.data || [],
    fabrics: fabrics.data || [],
    images: images.data || [],
    extras: extras.data || [],
  } as ProductWithDetails;
}

export async function getProductsByDesign(design: string): Promise<ProductSummary[]> {
  let query = supabase.from("products").select(SUMMARY_SELECT).eq("in_stock", true);

  if (design === "corner-sofas") query = query.eq("has_corner", true);
  else if (design === "chesterfield-sofas") query = query.eq("design_type", "chesterfield");
  else if (design === "u-shape-sofas") query = query.eq("design_type", "u-shape");
  else if (design === "modular-sofas") query = query.eq("design_type", "modular");
  else if (design === "3-2-sofa-sets" || design === "3-2-1-full-sets") {
    query = query.in("design_type", ["regular", "chesterfield"]);
  }

  const { data, error } = await query.order("featured", { ascending: false });
  if (error) return [];
  return toSummaries(data);
}

export async function getProductsBySize(size: string): Promise<ProductSummary[]> {
  const seatMap: Record<string, number> = {
    "2-seater": 2, "3-seater": 3, "4-seater": 4, "5-seater": 5, "6-seater": 6,
  };
  const seats = seatMap[size];
  if (!seats) return [];

  const { data: variants, error } = await supabase
    .from("product_variants")
    .select("product_id")
    .eq("seats", seats)
    .eq("in_stock", true);
  if (error || !variants) return [];

  const ids = [...new Set(variants.map((v) => v.product_id))];
  if (ids.length === 0) return [];

  const { data, error: err2 } = await supabase
    .from("products")
    .select(SUMMARY_SELECT)
    .in("id", ids)
    .eq("in_stock", true)
    .order("featured", { ascending: false });
  if (err2) return [];
  return toSummaries(data);
}

export async function getProductsByColour(colour: string): Promise<ProductSummary[]> {
  const colourMap: Record<string, string[]> = {
    "grey-sofas": ["Dark Grey", "Light Grey"],
    "cream-sofas": ["Cream", "Beige"],
    "navy-sofas": ["Navy"],
    "black-sofas": ["Black"],
    "brown-sofas": ["Brown", "Brown (Tech Leather)", "Chocolate"],
  };
  const names = colourMap[colour] || [];
  if (names.length === 0) return [];

  const { data: colours, error } = await supabase
    .from("product_colours")
    .select("product_id")
    .in("name", names);
  if (error || !colours) return [];

  const ids = [...new Set(colours.map((c) => c.product_id))];
  if (ids.length === 0) return [];

  const { data, error: err2 } = await supabase
    .from("products")
    .select(SUMMARY_SELECT)
    .in("id", ids)
    .eq("in_stock", true)
    .order("featured", { ascending: false });
  if (err2) return [];
  return toSummaries(data);
}

export async function getRecommendations(currentSlug: string, limit = 4): Promise<ProductSummary[]> {
  const { data, error } = await supabase
    .from("products")
    .select(SUMMARY_SELECT)
    .eq("in_stock", true)
    .neq("slug", currentSlug)
    .order("featured", { ascending: false })
    .limit(limit);
  if (error) return [];
  return toSummaries(data);
}

export async function getAllProductSlugs(): Promise<string[]> {
  const { data, error } = await supabase.from("products").select("slug");
  if (error || !data) return [];
  return data.map((p) => p.slug);
}
