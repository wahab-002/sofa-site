import { supabase } from "./supabase";
import type { Product, ProductWithDetails } from "./types";

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("in_stock", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data as Product[];
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

export async function getProductsByDesign(design: string): Promise<Product[]> {
  let query = supabase.from("products").select("*").eq("in_stock", true);

  if (design === "corner-sofas") query = query.eq("has_corner", true);
  else if (design === "chesterfield-sofas") query = query.eq("design_type", "chesterfield");
  else if (design === "u-shape-sofas") query = query.eq("design_type", "u-shape");
  else if (design === "modular-sofas") query = query.eq("design_type", "modular");
  else if (design === "3-2-sofa-sets" || design === "3-2-1-full-sets") {
    query = query.in("design_type", ["regular", "chesterfield"]);
  }

  const { data, error } = await query.order("featured", { ascending: false });
  if (error || !data) return [];
  return data as Product[];
}

export async function getProductsBySize(size: string): Promise<Product[]> {
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
    .select("*")
    .in("id", ids)
    .eq("in_stock", true)
    .order("featured", { ascending: false });
  if (err2 || !data) return [];
  return data as Product[];
}

export async function getProductsByColour(colour: string): Promise<Product[]> {
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
    .select("*")
    .in("id", ids)
    .eq("in_stock", true)
    .order("featured", { ascending: false });
  if (err2 || !data) return [];
  return data as Product[];
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("in_stock", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data as Product[];
}

export async function getRecommendations(currentSlug: string, limit = 4): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("in_stock", true)
    .neq("slug", currentSlug)
    .order("featured", { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data as Product[];
}

export async function getAllProductSlugs(): Promise<string[]> {
  const { data, error } = await supabase.from("products").select("slug");
  if (error || !data) return [];
  return data.map((p) => p.slug);
}
