/**
 * Upsert Verona Sofa into Supabase so /products/verona-sofa/* matches the
 * style × config photo grid (Grey + Black for now).
 *
 * Usage:
 *   node --env-file=.env.local scripts/sync-verona-supabase.mjs
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

const VERONA = {
  slug: "verona-sofa",
  name: "Verona Sofa",
  tagline: "Timeless style. Unlimited comfort.",
  description:
    "The Verona Sofa brings classic elegance to your living room. Choose Scatter Back or High Back, in armchair, 2 seater, 3 seater, 3+2 set, full set and corner. Available with a matching swivel accent chair.",
  base_price: 299,
  design_type: "regular",
  has_corner: true,
  has_swivel_chair: true,
  featured: true,
  in_stock: true,
  variants: [
    { label: "Armchair", seats: 1, price_gbp: 299, sort_order: 1 },
    { label: "2 Seater", seats: 2, price_gbp: 390, sort_order: 2 },
    { label: "3 Seater", seats: 3, price_gbp: 560, sort_order: 3 },
    { label: "3+2 Set", seats: 5, price_gbp: 849, sort_order: 4 },
    { label: "3+2+1 Full Set", seats: 6, price_gbp: 1249, sort_order: 5 },
    { label: "Corner", seats: 5, price_gbp: 949, sort_order: 6 },
  ],
  colours: [
    { name: "Grey", hex_code: "#8A8680" },
    { name: "Black", hex_code: "#1A1A1A" },
  ],
  fabrics: ["Plush Velvet", "Chenille", "Leather"],
  extras: [
    { name: "Matching Footstool", price_gbp: 249 },
    { name: "Coffee Table", price_gbp: 349 },
    { name: "Swivel Chair", price_gbp: 379 },
  ],
};

const STYLES = ["scatter-back", "high-back"];
const CONFIGS = ["armchair", "2-seater", "3-seater", "3-2-set", "full-set", "corner"];

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
  console.log(`Syncing Verona → ${url}`);

  const existing = await must(
    "lookup verona-sofa",
    sb.from("products").select("id, slug, name").eq("slug", VERONA.slug).maybeSingle(),
  );

  const productId = existing?.id ?? randomUUID();
  const productRow = {
    id: productId,
    slug: VERONA.slug,
    name: VERONA.name,
    tagline: VERONA.tagline,
    description: VERONA.description,
    base_price: VERONA.base_price,
    design_type: VERONA.design_type,
    has_corner: VERONA.has_corner,
    has_swivel_chair: VERONA.has_swivel_chair,
    featured: VERONA.featured,
    in_stock: VERONA.in_stock,
  };

  if (existing?.id) {
    console.log(`Updating existing ${existing.slug} (${existing.name})`);
    await must("update product", sb.from("products").update(productRow).eq("id", productId));
    await clearChildren(productId);
  } else {
    await must("insert product", sb.from("products").insert(productRow));
  }

  await must(
    "insert variants",
    sb.from("product_variants").insert(
      VERONA.variants.map((v) => ({
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
      VERONA.colours.map((c) => ({
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
      VERONA.fabrics.map((name) => ({
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
      VERONA.extras.map((e) => ({
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
    image_url: asset("/products/verona/scatter-back/3-2-set/grey.webp"),
    sort_order: sort++,
    is_primary: true,
    alt_text: "Verona Scatter Back 3+2 Set in Grey",
  });

  for (const style of STYLES) {
    for (const cfg of CONFIGS) {
      for (const colour of ["grey", "black"]) {
        const styleLabel = style === "scatter-back" ? "Scatter Back" : "High Back";
        images.push({
          id: randomUUID(),
          product_id: productId,
          colour_id: null,
          image_url: asset(`/products/verona/${style}/${cfg}/${colour}.webp`),
          sort_order: sort++,
          is_primary: false,
          alt_text: `Verona ${styleLabel} ${cfg.replace(/-/g, " ")} in ${colour}`,
        });
      }
    }
  }

  await must("insert images", sb.from("product_images").insert(images));

  const check = await must(
    "verify",
    sb
      .from("products")
      .select(
        "id, slug, name, base_price, product_variants(count), product_colours(count), product_fabrics(count), product_extras(count), product_images(count)",
      )
      .eq("slug", VERONA.slug)
      .single(),
  );

  console.log("\nDone. Verona product:", JSON.stringify(check, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
