/**
 * Upsert Atalian Chesterfield from the local catalog into Supabase.
 *
 * Replaces the legacy "Italian Chesterfield" row (slug italian-chesterfield)
 * with the Atalian catalogue (slug atalian-sofa) so shop + /products/atalian-sofa/*
 * stay in sync.
 *
 * Usage:
 *   node --env-file=.env.local scripts/sync-atalian-supabase.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

const SITE = process.env.SITE_URL || "https://sofa-site.vercel.app";
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

const ATALIAN = {
  slug: "atalian-sofa",
  name: "Atalian Chesterfield",
  tagline: "Deep-buttoned chesterfield with slim gold feet",
  description:
    "The Atalian is a statement chesterfield — deep button tufting, soft upholstery and slim metal feet. Available as armchair, 2 seater, 3 seater, 3+2 set, full set and corner.",
  base_price: 399,
  design_type: "chesterfield",
  has_corner: true,
  has_swivel_chair: true,
  featured: true,
  in_stock: true,
  variants: [
    { label: "Armchair", seats: 1, price_gbp: 399, sort_order: 1 },
    { label: "2 Seater", seats: 2, price_gbp: 599, sort_order: 2 },
    { label: "3 Seater", seats: 3, price_gbp: 799, sort_order: 3 },
    { label: "3+2 Set", seats: 5, price_gbp: 1149, sort_order: 4 },
    { label: "3+2+1 Full Set", seats: 6, price_gbp: 1349, sort_order: 5 },
    { label: "Corner", seats: 5, price_gbp: 1249, sort_order: 6 },
  ],
  colours: [
    { name: "Cream", hex_code: "#F5F0E8" },
    { name: "Grey", hex_code: "#8A8680" },
    { name: "Black", hex_code: "#1A1A1A" },
    { name: "Navy", hex_code: "#1E3A5F" },
    { name: "Brown", hex_code: "#6B3A2A" },
    { name: "Burgundy", hex_code: "#6B2D3C" },
    { name: "Green", hex_code: "#4A5240" },
    { name: "Pink", hex_code: "#C9A0A8" },
  ],
  fabrics: ["Plush Velvet", "Chenille", "Leather"],
  extras: [
    { name: "Footstool", price_gbp: 199 },
    { name: "Coffee Table", price_gbp: 249 },
  ],
};

const CONFIGS = ["armchair", "2-seater", "3-seater", "3-2-set", "full-set", "corner"];
const COLOUR_FILES = {
  Cream: "cream",
  Grey: "grey",
  Black: "black",
  Navy: "navy",
  Brown: "brown",
  Burgundy: "burgundy",
  Green: "green",
  Pink: "pink",
};

function abs(path) {
  if (path.startsWith("http")) return path;
  return `${SITE.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
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

async function findTarget() {
  const bySlug = await must(
    "lookup atalian-sofa",
    sb.from("products").select("id, slug, name").eq("slug", ATALIAN.slug).maybeSingle(),
  );
  if (bySlug?.id) return bySlug;

  const legacy = await must(
    "lookup italian-chesterfield",
    sb.from("products").select("id, slug, name").eq("slug", "italian-chesterfield").maybeSingle(),
  );
  return legacy;
}

async function main() {
  console.log(`Syncing Atalian → ${url}`);

  const existing = await findTarget();
  const productId = existing?.id ?? randomUUID();
  const productRow = {
    id: productId,
    slug: ATALIAN.slug,
    name: ATALIAN.name,
    tagline: ATALIAN.tagline,
    description: ATALIAN.description,
    base_price: ATALIAN.base_price,
    design_type: ATALIAN.design_type,
    has_corner: ATALIAN.has_corner,
    has_swivel_chair: ATALIAN.has_swivel_chair,
    featured: ATALIAN.featured,
    in_stock: ATALIAN.in_stock,
  };

  if (existing?.id) {
    console.log(`Updating existing ${existing.slug} (${existing.name}) → ${ATALIAN.slug}`);
    await must("update product", sb.from("products").update(productRow).eq("id", productId));
    await clearChildren(productId);
  } else {
    await must("insert product", sb.from("products").insert(productRow));
  }

  await must(
    "insert variants",
    sb.from("product_variants").insert(
      ATALIAN.variants.map((v) => ({
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
      ATALIAN.colours.map((c) => ({
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
      ATALIAN.fabrics.map((name) => ({
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
      ATALIAN.extras.map((e) => ({
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
    image_url: abs("/products/atalian/full-set/cream.webp"),
    sort_order: sort++,
    is_primary: true,
    alt_text: "Atalian Chesterfield Full Set in Cream",
  });
  for (const cfg of CONFIGS) {
    const label = cfg.replace(/-/g, " ");
    images.push({
      id: randomUUID(),
      product_id: productId,
      colour_id: null,
      image_url: abs(`/products/atalian/${cfg}/cream.webp`),
      sort_order: sort++,
      is_primary: false,
      alt_text: `Atalian Chesterfield ${label} in Cream`,
    });
  }
  for (const [name, file] of Object.entries(COLOUR_FILES)) {
    if (name === "Cream") continue;
    images.push({
      id: randomUUID(),
      product_id: productId,
      colour_id: null,
      image_url: abs(`/products/atalian/corner/${file}.webp`),
      sort_order: sort++,
      is_primary: false,
      alt_text: `Atalian Chesterfield Corner in ${name}`,
    });
  }

  await must("insert images", sb.from("product_images").insert(images));

  const check = await must(
    "verify",
    sb
      .from("products")
      .select(
        "id, slug, name, base_price, has_swivel_chair, product_variants(count), product_colours(count), product_fabrics(count), product_extras(count), product_images(count)",
      )
      .eq("slug", ATALIAN.slug)
      .single(),
  );

  console.log("\nDone. Atalian product:", JSON.stringify(check, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
