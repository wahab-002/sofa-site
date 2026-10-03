/**
 * Upsert Lily Sofa into Supabase for /products/lily-sofa/*
 *
 * Usage:
 *   node --env-file=.env.local scripts/sync-lily-supabase.mjs
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

const LILY = {
  slug: "lily-sofa",
  name: "Lily Sofa",
  tagline: "Soft curves. Soft touch.",
  description:
    "The Lily features vertical channel detailing and chrome feet for a sharp modern look. Available as armchair, 2 seater, 3 seater, 3+2 set, full set and corner.",
  base_price: 399,
  design_type: "regular",
  has_corner: true,
  has_swivel_chair: false,
  featured: true,
  in_stock: true,
  variants: [
    { label: "Armchair", seats: 1, price_gbp: 399, sort_order: 1 },
    { label: "2 Seater", seats: 2, price_gbp: 579, sort_order: 2 },
    { label: "3 Seater", seats: 3, price_gbp: 679, sort_order: 3 },
    { label: "3+2 Set", seats: 5, price_gbp: 749, sort_order: 4 },
    { label: "3+2+1 Full Set", seats: 6, price_gbp: 899, sort_order: 5 },
    { label: "Corner", seats: 5, price_gbp: 849, sort_order: 6 },
  ],
  colours: [
    { name: "Beige", hex_code: "#C9B99A" },
    { name: "Black", hex_code: "#1A1A1A" },
    { name: "Blue", hex_code: "#3A4F6A" },
  ],
  fabrics: ["Plush Velvet", "Chenille", "Leather"],
  extras: [
    { name: "Footstool", price_gbp: 199 },
    { name: "Coffee Table", price_gbp: 249 },
  ],
};

const CONFIGS = ["armchair", "2-seater", "3-seater", "3-2-set", "full-set", "corner"];
const COLOURS = ["beige", "black", "blue"];

function asset(path) {
  if (path.startsWith("http") || path.startsWith("/")) return path.startsWith("http") ? new URL(path).pathname : path;
  return `/${path}`;
}

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
  console.log(`Syncing Lily → ${url}`);

  const existing = await must(
    "lookup lily-sofa",
    sb.from("products").select("id, slug, name").eq("slug", LILY.slug).maybeSingle(),
  );

  const productId = existing?.id ?? randomUUID();
  const productRow = {
    id: productId,
    slug: LILY.slug,
    name: LILY.name,
    tagline: LILY.tagline,
    description: LILY.description,
    base_price: LILY.base_price,
    design_type: LILY.design_type,
    has_corner: LILY.has_corner,
    has_swivel_chair: LILY.has_swivel_chair,
    featured: LILY.featured,
    in_stock: LILY.in_stock,
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
      LILY.variants.map((v) => ({
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
      LILY.colours.map((c) => ({
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
      LILY.fabrics.map((name) => ({
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
      LILY.extras.map((e) => ({
        id: randomUUID(),
        product_id: productId,
        name: e.name,
        price_gbp: e.price_gbp,
        image_url: null,
        in_stock: true,
      })),
    ),
  );

  const images = [];
  let sort = 0;
  images.push({
    id: randomUUID(),
    product_id: productId,
    colour_id: null,
    image_url: asset("/products/lily/3-2-set/beige.webp"),
    sort_order: sort++,
    is_primary: true,
    alt_text: "Lily Sofa 3+2 Set in Beige",
  });

  for (const cfg of CONFIGS) {
    for (const colour of COLOURS) {
      images.push({
        id: randomUUID(),
        product_id: productId,
        colour_id: null,
        image_url: asset(`/products/lily/${cfg}/${colour}.webp`),
        sort_order: sort++,
        is_primary: false,
        alt_text: `Lily Sofa ${cfg.replace(/-/g, " ")} in ${colour}`,
      });
    }
  }

  await must("insert images", sb.from("product_images").insert(images));

  const check = await must(
    "verify",
    sb
      .from("products")
      .select(
        "id, slug, name, base_price, product_variants(count), product_colours(count), product_images(count)",
      )
      .eq("slug", LILY.slug)
      .single(),
  );

  console.log("\nDone. Lily product:", JSON.stringify(check, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
