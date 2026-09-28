import { supabase } from "./supabase";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price_gbp: number;
  description: string;
  image_url: string;
};

// Sample data — only used if Supabase is completely unreachable
export const sampleProducts: Product[] = [
  {
    id: "1",
    slug: "ashton-corner-sofa",
    name: "Ashton Corner Sofa",
    category: "corner-sofas",
    price_gbp: 799,
    description:
      "A generously sized corner sofa built for family living rooms, upholstered in durable UK-grade fabric with a solid hardwood frame.",
    image_url: "/ashton-corner-sofa.jpg",
  },
];

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data || data.length === 0) return sampleProducts;
  return data as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return sampleProducts.find((p) => p.slug === slug);
  return data as Product;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });
  if (error || !data) return sampleProducts.filter((p) => p.category === category);
  return data as Product[];
}
