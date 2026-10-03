/**
 * Upsert Harrison Sofa into Supabase for /products/harrison-sofa/*
 * Usage: node --env-file=.env.local scripts/sync-harrison-supabase.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL and a Supabase key.");
  process.exit(1);
}

const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

const PRODUCT = {
  slug: "harrison-sofa",
  name: "Harrison Sofa",
  tagline: "Classic looks. Unbeatable value.",
  description:
    "The Harrison Sofa offers a timeless British design at a price that makes sense. Solid frame, comfortable cushions, available in the full range of fabrics. Available as armchair, 2 seater, 3 seater, 3+2 set, full set and corner.",
  base_price: 279,
  design_type: "regular",
  has_corner: true,
  has_swivel_chair: false,
  featured: true,
  in_stock: true,
  variants: [
    { label: "Armchair", seats: 1, price_gbp: 279, sort_order: 1 },
    { label: "2 Seater", seats: 2, price_gbp: 370, sort_order: 2 },
    { label: "3 Seater", seats: 3, price_gbp: 530, sort_order: 3 },
    { label: "3+2 Set", seats: 5, price_gbp: 799, sort_order: 4 },
    { label: "3+2+1 Full Set", seats: 6, price_gbp: 1199, sort_order: 5 },
    { label: "Corner", seats: 5, price_gbp: 899, sort_order: 6 },
  ],
  colours: [
    { name: "Light Grey", hex_code: "#B0ADA8" },
    { name: "Dark Grey", hex_code: "#3D3D3D" },
    { name: "Navy", hex_code: "#1E3A5F" },
    { name: "Beige", hex_code: "#C9B99A" },
    { name: "Cream", hex_code: "#F5F0E8" },
    { name: "Black", hex_code: "#1A1A1A" },
    { name: "Brown", hex_code: "#6B3A2A" },
    { name: "Olive", hex_code: "#4A5240" },
    { name: "Chocolate", hex_code: "#3D1C02" },
    { name: "Orange", hex_code: "#D4774A" },
  ],
  fabrics: ["Plush Velvet", "Chenille", "Leather"],
  extras: [
    { name: "Matching Footstool", price_gbp: 249 },
    { name: "Coffee Table", price_gbp: 349 },
  ],
};

async function must(label, promise) {
  const { data, error } = await promise;
  if (error) {
    console.error(`✗ ${label}:`, error.message);
    throw error;
  }
  console.log(`✓ ${label}`);
  return data;
}

async function clearChildren(productId) {
  for (const table of ["product_images", "product_extras", "product_fabrics", "product_colours", "product_variants"]) {
    await must(`clear ${table}`, sb.from(table).delete().eq("product_id", productId));
  }
}

async function main() {
  console.log(`Syncing Harrison → ${url}`);
  const existing = await must(
    "lookup harrison-sofa",
    sb.from("products").select("id, slug, name").eq("slug", PRODUCT.slug).maybeSingle(),
  );
  const productId = existing?.id ?? randomUUID();
  const productRow = {
    id: productId,
    slug: PRODUCT.slug,
    name: PRODUCT.name,
    tagline: PRODUCT.tagline,
    description: PRODUCT.description,
    base_price: PRODUCT.base_price,
    design_type: PRODUCT.design_type,
    has_corner: PRODUCT.has_corner,
    has_swivel_chair: PRODUCT.has_swivel_chair,
    featured: PRODUCT.featured,
    in_stock: PRODUCT.in_stock,
  };

  if (existing?.id) {
    console.log(`Updating existing ${existing.slug}`);
    await must("update product", sb.from("products").update(productRow).eq("id", productId));
    await clearChildren(productId);
  } else {
    await must("insert product", sb.from("products").insert(productRow));
  }

  await must(
    "insert variants",
    sb.from("product_variants").insert(
      PRODUCT.variants.map((v) => ({
        id: randomUUID(),
        product_id: productId,
        label: v.label,
        seats: v.seats,
        price_gbp: v.price_gbp,
        in_stock: true,
        sort_order: v.sort_order,
      })),
    ),
  );
  await must(
    "insert colours",
    sb.from("product_colours").insert(
      PRODUCT.colours.map((c) => ({
        id: randomUUID(),
        product_id: productId,
        name: c.name,
        hex_code: c.hex_code,
        in_stock: true,
      })),
    ),
  );
  await must(
    "insert fabrics",
    sb.from("product_fabrics").insert(
      PRODUCT.fabrics.map((name) => ({
        id: randomUUID(),
        product_id: productId,
        name,
        in_stock: true,
      })),
    ),
  );
  await must(
    "insert extras",
    sb.from("product_extras").insert(
      PRODUCT.extras.map((e) => ({
        id: randomUUID(),
        product_id: productId,
        name: e.name,
        price_gbp: e.price_gbp,
        image_url: null,
        in_stock: true,
      })),
    ),
  );

  const check = await must(
    "verify",
    sb
      .from("products")
      .select("id, slug, name, base_price, product_variants(count), product_colours(count)")
      .eq("slug", PRODUCT.slug)
      .single(),
  );
  console.log("\nDone. Harrison product:", JSON.stringify(check, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
