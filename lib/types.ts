export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  base_price: number;
  design_type: string;
  has_corner: boolean;
  has_swivel_chair: boolean;
  featured: boolean;
  in_stock: boolean;
  created_at: string;
};

export type ProductVariant = {
  id: string;
  product_id: string;
  label: string;
  seats: number | null;
  price_gbp: number;
  in_stock: boolean;
  sort_order: number;
};

export type ProductFabric = {
  id: string;
  product_id: string;
  name: string;
  in_stock: boolean;
};

export type ProductColour = {
  id: string;
  product_id: string;
  name: string;
  hex_code: string;
  swatch_url?: string | null;
  close_up_url?: string | null;
  in_stock: boolean;
};

export type ProductImage = {
  id: string;
  product_id: string;
  colour_id: string | null;
  image_url: string;
  sort_order: number;
  is_primary: boolean;
  alt_text: string | null;
};

export type ProductExtra = {
  id: string;
  product_id: string;
  name: string;
  price_gbp: number;
  image_url: string | null;
  in_stock: boolean;
};

export type ProductWithDetails = Product & {
  variants: ProductVariant[];
  colours: ProductColour[];
  fabrics: ProductFabric[];
  images: ProductImage[];
  extras: ProductExtra[];
};

export type ProductSummary = Product & {
  colours: { name: string; hex_code: string; swatch_url: string | null }[];
  from_price: number;
  set_price: number | null;
  image: { url: string; alt: string | null } | null;
};

export type Category = {
  id: string;
  slug: string;
  type: string;
  name: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
};
