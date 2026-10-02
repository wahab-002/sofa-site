import type {
  Product,
  ProductColour,
  ProductExtra,
  ProductFabric,
  ProductSummary,
  ProductVariant,
  ProductWithDetails,
} from "./types";
import { getProductMedia, mediaColours } from "./productMedia";
import { applyAtalianListingContext } from "./atalian";

const fabrics = (id: string): ProductFabric[] => [
  { id: `${id}-velvet`, product_id: id, name: "Plush Velvet", in_stock: true },
  { id: `${id}-chenille`, product_id: id, name: "Chenille", in_stock: true },
  { id: `${id}-leather`, product_id: id, name: "Leather", in_stock: true },
];

const standardExtras = (id: string): ProductExtra[] => [
  {
    id: `${id}-footstool`,
    product_id: id,
    name: "Footstool",
    price_gbp: 199,
    image_url: null,
    in_stock: true,
  },
  {
    id: `${id}-coffee-table`,
    product_id: id,
    name: "Coffee Table",
    price_gbp: 249,
    image_url: null,
    in_stock: true,
  },
];

const colour = (id: string, name: string, hex: string): ProductColour => ({
  id: `${id}-${name.toLowerCase().replace(/\s+/g, "-")}`,
  product_id: id,
  name,
  hex_code: hex,
  swatch_url: null,
  close_up_url: null,
  in_stock: true,
});

const standardColours = (id: string): ProductColour[] => [
  colour(id, "Light Grey", "#B0ADA8"),
  colour(id, "Dark Grey", "#3D3D3D"),
  colour(id, "Navy", "#1E3A5F"),
  colour(id, "Beige", "#C9B99A"),
  colour(id, "Cream", "#F5F0E8"),
  colour(id, "Black", "#1A1A1A"),
  colour(id, "Brown", "#6B3A2A"),
  colour(id, "Olive", "#4A5240"),
  colour(id, "Chocolate", "#3D1C02"),
  colour(id, "Orange", "#D4774A"),
];

function variants(
  id: string,
  prices: { label: string; seats: number | null; price: number; order: number }[],
): ProductVariant[] {
  return prices.map((p) => ({
    id: `${id}-${p.order}`,
    product_id: id,
    label: p.label,
    seats: p.seats,
    price_gbp: p.price,
    in_stock: true,
    sort_order: p.order,
  }));
}

type Seed = {
  product: Product;
  variants: ProductVariant[];
  colours: ProductColour[];
  fabrics: ProductFabric[];
  extras: ProductExtra[];
};

const seeds: Seed[] = [
  {
    product: {
      id: "local-verona",
      slug: "verona-sofa",
      name: "Verona Sofa",
      tagline: "Scatter or high back — soft curves for everyday living",
      description:
        "The Verona is our best-selling family sofa. Choose scatter back for a relaxed look or high back for extra support, in corner, 3+2 and full-set layouts.",
      base_price: 549,
      design_type: "regular",
      has_corner: true,
      has_swivel_chair: false,
      featured: true,
      in_stock: true,
      created_at: "2026-01-01",
    },
    variants: variants("local-verona", [
      { label: "2 Seater", seats: 2, price: 549, order: 1 },
      { label: "3 Seater", seats: 3, price: 649, order: 2 },
      { label: "3+2 Set", seats: 5, price: 899, order: 3 },
      { label: "3+2+1 Full Set", seats: 6, price: 1099, order: 4 },
      { label: "Corner", seats: 5, price: 949, order: 5 },
    ]),
    colours: standardColours("local-verona"),
    fabrics: fabrics("local-verona"),
    extras: standardExtras("local-verona"),
  },
  {
    product: {
      id: "local-oakland",
      slug: "oakland-sofa",
      name: "Oakland Sofa",
      tagline: "Classic studded leather look with deep cushions",
      description:
        "The Oakland brings a traditional scroll-arm silhouette in durable leather-look finishes. Available as corner, sets and individual pieces.",
      base_price: 599,
      design_type: "regular",
      has_corner: true,
      has_swivel_chair: false,
      featured: true,
      in_stock: true,
      created_at: "2026-01-02",
    },
    variants: variants("local-oakland", [
      { label: "2 Seater", seats: 2, price: 599, order: 1 },
      { label: "3 Seater", seats: 3, price: 699, order: 2 },
      { label: "3+2 Set", seats: 5, price: 999, order: 3 },
      { label: "3+2+1 Full Set", seats: 6, price: 1199, order: 4 },
      { label: "Corner", seats: 5, price: 1099, order: 5 },
    ]),
    colours: [
      colour("local-oakland", "Tan", "#9C5A32"),
      colour("local-oakland", "Black", "#2B2927"),
      ...standardColours("local-oakland").filter((c) => !["Black", "Brown"].includes(c.name)),
    ],
    fabrics: [
      { id: "local-oakland-leather", product_id: "local-oakland", name: "Leather", in_stock: true },
      { id: "local-oakland-tech", product_id: "local-oakland", name: "Tech Leather", in_stock: true },
    ],
    extras: standardExtras("local-oakland"),
  },
  {
    product: {
      id: "local-malibu",
      slug: "malibu-sofa",
      name: "Malibu Sofa",
      tagline: "Contemporary lines with gold accents",
      description:
        "Clean modern profiles and soft seating make the Malibu a favourite for bright living rooms. Shop corner layouts and matching sets.",
      base_price: 529,
      design_type: "regular",
      has_corner: true,
      has_swivel_chair: false,
      featured: true,
      in_stock: true,
      created_at: "2026-01-03",
    },
    variants: variants("local-malibu", [
      { label: "2 Seater", seats: 2, price: 529, order: 1 },
      { label: "3 Seater", seats: 3, price: 629, order: 2 },
      { label: "3+2 Set", seats: 5, price: 879, order: 3 },
      { label: "3+2+1 Full Set", seats: 6, price: 1049, order: 4 },
      { label: "Corner", seats: 5, price: 949, order: 5 },
    ]),
    colours: standardColours("local-malibu"),
    fabrics: fabrics("local-malibu"),
    extras: standardExtras("local-malibu"),
  },
  {
    product: {
      id: "local-atalian",
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
      created_at: "2026-01-04",
    },
    variants: variants("local-atalian", [
      { label: "Armchair", seats: 1, price: 399, order: 1 },
      { label: "2 Seater", seats: 2, price: 599, order: 2 },
      { label: "3 Seater", seats: 3, price: 799, order: 3 },
      { label: "3+2 Set", seats: 5, price: 1149, order: 4 },
      { label: "3+2+1 Full Set", seats: 6, price: 1349, order: 5 },
      { label: "Corner", seats: 5, price: 1249, order: 6 },
    ]),
    colours: [
      colour("local-atalian", "Cream", "#F5F0E8"),
      colour("local-atalian", "Grey", "#8A8680"),
      colour("local-atalian", "Black", "#1A1A1A"),
      colour("local-atalian", "Navy", "#1E3A5F"),
      colour("local-atalian", "Brown", "#6B3A2A"),
      colour("local-atalian", "Burgundy", "#6B2D3C"),
      colour("local-atalian", "Green", "#4A5240"),
      colour("local-atalian", "Pink", "#C9A0A8"),
    ],
    fabrics: fabrics("local-atalian"),
    extras: standardExtras("local-atalian"),
  },
  {
    product: {
      id: "local-bishop",
      slug: "bishop-sofa",
      name: "Bishop U-Shape",
      tagline: "Generous U-shape seating for family rooms",
      description:
        "The Bishop U-shape wraps the room with deep seats and plush cushions — built for movie nights and big gatherings.",
      base_price: 1099,
      design_type: "u-shape",
      has_corner: false,
      has_swivel_chair: false,
      featured: true,
      in_stock: true,
      created_at: "2026-01-05",
    },
    variants: variants("local-bishop", [
      { label: "U-Shape", seats: 6, price: 1299, order: 1 },
    ]),
    colours: standardColours("local-bishop"),
    fabrics: fabrics("local-bishop"),
    extras: standardExtras("local-bishop"),
  },
  {
    product: {
      id: "local-borrius",
      slug: "borrius-sofa",
      name: "Borrius Sofa",
      tagline: "Low-profile modular comfort in soft neutrals",
      description:
        "The Borrius is a modern low-profile sofa with a relaxed lounge feel. Ideal as a corner layout for open-plan living.",
      base_price: 549,
      design_type: "modular",
      has_corner: true,
      has_swivel_chair: false,
      featured: true,
      in_stock: true,
      created_at: "2026-01-06",
    },
    variants: variants("local-borrius", [
      { label: "2 Seater", seats: 2, price: 549, order: 1 },
      { label: "3 Seater", seats: 3, price: 649, order: 2 },
      { label: "3+2 Set", seats: 5, price: 899, order: 3 },
      { label: "Corner", seats: 5, price: 999, order: 4 },
    ]),
    colours: standardColours("local-borrius"),
    fabrics: fabrics("local-borrius"),
    extras: standardExtras("local-borrius"),
  },
  {
    product: {
      id: "local-falcon",
      slug: "falcon-sofa",
      name: "Falcon Sofa",
      tagline: "Tufted velvet sets with matching ottoman",
      description:
        "The Falcon pairs classic tufting with soft velvet and a matching glass-top ottoman — a complete living-room set with presence.",
      base_price: 649,
      design_type: "chesterfield",
      has_corner: true,
      has_swivel_chair: false,
      featured: true,
      in_stock: true,
      created_at: "2026-01-07",
    },
    variants: variants("local-falcon", [
      { label: "2 Seater", seats: 2, price: 649, order: 1 },
      { label: "3 Seater", seats: 3, price: 749, order: 2 },
      { label: "3+2 Set", seats: 5, price: 1049, order: 3 },
      { label: "3+2+1 Full Set", seats: 6, price: 1249, order: 4 },
      { label: "Corner", seats: 5, price: 1149, order: 5 },
    ]),
    colours: standardColours("local-falcon"),
    fabrics: fabrics("local-falcon"),
    extras: standardExtras("local-falcon"),
  },
  {
    product: {
      id: "local-lily",
      slug: "lily-sofa",
      name: "Lily Sofa",
      tagline: "Channel-tufted contemporary 3+2 sets",
      description:
        "The Lily features vertical channel detailing and chrome feet for a sharp modern look. Available as matching sets with optional ottoman.",
      base_price: 579,
      design_type: "regular",
      has_corner: false,
      has_swivel_chair: false,
      featured: true,
      in_stock: true,
      created_at: "2026-01-08",
    },
    variants: variants("local-lily", [
      { label: "2 Seater", seats: 2, price: 579, order: 1 },
      { label: "3 Seater", seats: 3, price: 679, order: 2 },
      { label: "3+2 Set", seats: 5, price: 949, order: 3 },
      { label: "3+2+1 Full Set", seats: 6, price: 1129, order: 4 },
    ]),
    colours: standardColours("local-lily"),
    fabrics: fabrics("local-lily"),
    extras: standardExtras("local-lily"),
  },
  {
    product: {
      id: "local-olympia",
      slug: "olympia-sofa",
      name: "Olympia Chesterfield",
      tagline: "Timeless rolled-arm chesterfield sets",
      description:
        "The Olympia is a classic chesterfield with deep buttoning and rolled arms. Choose cream or darker tones for a full living-room set.",
      base_price: 699,
      design_type: "chesterfield",
      has_corner: false,
      has_swivel_chair: false,
      featured: true,
      in_stock: true,
      created_at: "2026-01-09",
    },
    variants: variants("local-olympia", [
      { label: "2 Seater", seats: 2, price: 699, order: 1 },
      { label: "3 Seater", seats: 3, price: 799, order: 2 },
      { label: "3+2 Set", seats: 5, price: 1099, order: 3 },
      { label: "3+2+1 Full Set", seats: 6, price: 1299, order: 4 },
    ]),
    colours: standardColours("local-olympia"),
    fabrics: fabrics("local-olympia"),
    extras: standardExtras("local-olympia"),
  },
];

function toSummary(seed: Seed): ProductSummary {
  const { product, variants: vs, colours } = seed;
  const prices = vs.map((v) => v.price_gbp);
  const media = getProductMedia(product.slug);
  const mappedColours = mediaColours(
    product.slug,
    colours.map(({ name, hex_code, swatch_url }) => ({ name, hex_code, swatch_url: swatch_url ?? null })),
    (c) => ({ name: c.name, hex_code: c.hex, swatch_url: c.swatch ?? null }),
  );
  const summary: ProductSummary = {
    ...product,
    colours: mappedColours,
    from_price: prices.length ? Math.min(...prices) : product.base_price,
    set_price: vs.find((v) => v.label === "3+2 Set")?.price_gbp ?? null,
    image: media
      ? { url: media.cardImage, alt: product.name }
      : null,
    href: product.slug === "atalian-sofa" ? "/products/atalian-sofa/full-set" : null,
  };
  return summary;
}

function withAtalianContext(
  products: ProductSummary[],
  ctx: { design?: string; size?: string; colour?: string },
): ProductSummary[] {
  return products.map((p) => {
    if (p.slug !== "atalian-sofa") return p;
    const seed = seeds.find((s) => s.product.slug === "atalian-sofa");
    return applyAtalianListingContext(p, ctx, seed?.variants ?? []);
  });
}

function toDetails(seed: Seed): ProductWithDetails {
  const media = getProductMedia(seed.product.slug);
  const colours = mediaColours(seed.product.slug, seed.colours, (c, i) => ({
    id: `${seed.product.id}-media-${i}`,
    product_id: seed.product.id,
    name: c.name,
    hex_code: c.hex,
    swatch_url: c.swatch ?? null,
    close_up_url: c.closeUp ?? null,
    in_stock: true,
  }));
  return {
    ...seed.product,
    variants: seed.variants,
    colours,
    fabrics: seed.fabrics,
    images: media
      ? media.photos.map((p, i) => ({
          id: `${seed.product.id}-img-${i}`,
          product_id: seed.product.id,
          colour_id: null,
          image_url: p.src,
          sort_order: i,
          is_primary: i === 0,
          alt_text: p.alt,
        }))
      : [],
    extras: seed.extras,
  };
}

export const LOCAL_COLLECTION_COUNT = seeds.length;

export function localAllProducts(): ProductSummary[] {
  return seeds
    .map(toSummary)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name));
}

export function localProductBySlug(slug: string): ProductWithDetails | null {
  const seed = seeds.find((s) => s.product.slug === slug);
  return seed ? toDetails(seed) : null;
}

export function localProductsByDesign(design: string): ProductSummary[] {
  const all = localAllProducts();
  let filtered = all;
  if (design === "corner-sofas") filtered = all.filter((p) => p.has_corner);
  else if (design === "chesterfield-sofas") filtered = all.filter((p) => p.design_type === "chesterfield");
  else if (design === "u-shape-sofas") filtered = all.filter((p) => p.design_type === "u-shape");
  else if (design === "modular-sofas") filtered = all.filter((p) => p.design_type === "modular");
  else if (design === "3-2-sofa-sets" || design === "3-2-1-full-sets") {
    filtered = all.filter((p) => ["regular", "chesterfield"].includes(p.design_type));
  }
  return withAtalianContext(filtered, { design });
}

export function localProductsBySize(size: string): ProductSummary[] {
  const seatMap: Record<string, number> = {
    "2-seater": 2,
    "3-seater": 3,
    "4-seater": 4,
    "5-seater": 5,
    "6-seater": 6,
  };
  const seats = seatMap[size];
  if (!seats) return [];
  const filtered = seeds
    .filter((s) => s.variants.some((v) => v.seats === seats || (seats >= 5 && (v.seats ?? 0) >= seats)))
    .map(toSummary);
  return withAtalianContext(filtered, { size });
}

export function localProductsByColour(colourSlug: string): ProductSummary[] {
  const colourMap: Record<string, string[]> = {
    "grey-sofas": ["Dark Grey", "Light Grey", "Grey"],
    "cream-sofas": ["Cream", "Beige"],
    "navy-sofas": ["Navy"],
    "black-sofas": ["Black"],
    "brown-sofas": ["Brown", "Chocolate", "Tan"],
  };
  const names = colourMap[colourSlug] || [];
  if (!names.length) return [];
  const filtered = localAllProducts().filter((p) => p.colours.some((c) => names.includes(c.name)));
  return withAtalianContext(filtered, { colour: colourSlug });
}

export function localRecommendations(currentSlug: string, limit = 4): ProductSummary[] {
  return localAllProducts()
    .filter((p) => p.slug !== currentSlug)
    .slice(0, limit);
}

export function localAllSlugs(): string[] {
  return seeds.map((s) => s.product.slug);
}
