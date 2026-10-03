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
import { applyAshtonListingContext, ashtonHref } from "./ashton";
import { applyDinoListingContext, dinoHref } from "./dino";
import { applyHarrisonListingContext, harrisonHref } from "./harrison";
import { applyLilyListingContext, lilyHref } from "./lily";
import { applyOlympiaListingContext, olympiaHref } from "./olympia";
import { applyVeronaListingContext, veronaHref } from "./verona";

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
      base_price: 299,
      design_type: "regular",
      has_corner: true,
      has_swivel_chair: true,
      featured: true,
      in_stock: true,
      created_at: "2026-01-01",
    },
    variants: variants("local-verona", [
      { label: "Armchair", seats: 1, price: 299, order: 1 },
      { label: "2 Seater", seats: 2, price: 390, order: 2 },
      { label: "3 Seater", seats: 3, price: 560, order: 3 },
      { label: "3+2 Set", seats: 5, price: 849, order: 4 },
      { label: "3+2+1 Full Set", seats: 6, price: 1249, order: 5 },
      { label: "Corner", seats: 5, price: 949, order: 6 },
    ]),
    // Photos live for Grey + Black; more colours can be added later
    colours: [
      colour("local-verona", "Grey", "#8A8680"),
      colour("local-verona", "Black", "#1A1A1A"),
    ],
    fabrics: fabrics("local-verona"),
    extras: [
      {
        id: "local-verona-footstool",
        product_id: "local-verona",
        name: "Matching Footstool",
        price_gbp: 249,
        image_url: null,
        in_stock: true,
      },
      {
        id: "local-verona-coffee-table",
        product_id: "local-verona",
        name: "Coffee Table",
        price_gbp: 349,
        image_url: null,
        in_stock: true,
      },
      {
        id: "local-verona-swivel",
        product_id: "local-verona",
        name: "Swivel Chair",
        price_gbp: 379,
        image_url: null,
        in_stock: true,
      },
    ],
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
      slug: "bishop-u-shape",
      name: "Bishop U-Shape Sofa",
      tagline: "The ultimate family sofa. Nothing comes close.",
      description:
        "The Bishop U-Shape Sofa transforms any living room into the ultimate gathering space. Seating for the whole family in one generous, sweeping design.",
      base_price: 1199,
      design_type: "u-shape",
      has_corner: false,
      has_swivel_chair: false,
      featured: true,
      in_stock: true,
      created_at: "2026-01-05",
    },
    variants: variants("local-bishop", [
      { label: "Standard U-Shape", seats: 6, price: 1199, order: 1 },
      { label: "Large U-Shape", seats: 7, price: 1499, order: 2 },
    ]),
    colours: standardColours("local-bishop"),
    fabrics: fabrics("local-bishop"),
    extras: standardExtras("local-bishop"),
  },
  {
    product: {
      id: "local-borrius",
      slug: "sloane-borrius-modular",
      name: "Sloane Borrius Modular Sofa",
      tagline: "Build your perfect sofa. Section by section.",
      description:
        "The Sloane Borrius is a modern modular sofa with a relaxed lounge feel. Ideal as a corner layout for open-plan living.",
      base_price: 999,
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
      tagline: "Soft curves. Soft touch.",
      description:
        "The Lily features vertical channel detailing and chrome feet for a sharp modern look. Available as armchair, 2 seater, 3 seater, 3+2 set, full set and corner.",
      base_price: 399,
      design_type: "regular",
      has_corner: true,
      has_swivel_chair: false,
      featured: true,
      in_stock: true,
      created_at: "2026-01-08",
    },
    variants: variants("local-lily", [
      { label: "Armchair", seats: 1, price: 399, order: 1 },
      { label: "2 Seater", seats: 2, price: 579, order: 2 },
      { label: "3 Seater", seats: 3, price: 679, order: 3 },
      { label: "3+2 Set", seats: 5, price: 749, order: 4 },
      { label: "3+2+1 Full Set", seats: 6, price: 899, order: 5 },
      { label: "Corner", seats: 5, price: 849, order: 6 },
    ]),
    colours: [
      colour("local-lily", "Beige", "#C9B99A"),
      colour("local-lily", "Black", "#1A1A1A"),
      colour("local-lily", "Blue", "#3A4F6A"),
    ],
    fabrics: fabrics("local-lily"),
    extras: standardExtras("local-lily"),
  },
  {
    product: {
      id: "local-dino",
      slug: "dino-sofa",
      name: "Dino Sofa",
      tagline: "Ribbed corduroy. Everyday comfort.",
      description:
        "The Dino brings soft corduroy texture and a contemporary silhouette. Available as armchair, 2 seater, 3 seater, 3+2 set, full set and corner in Beige & Brown or Grey & Black.",
      base_price: 399,
      design_type: "regular",
      has_corner: true,
      has_swivel_chair: false,
      featured: true,
      in_stock: true,
      created_at: "2026-01-10",
    },
    variants: variants("local-dino", [
      { label: "Armchair", seats: 1, price: 399, order: 1 },
      { label: "2 Seater", seats: 2, price: 579, order: 2 },
      { label: "3 Seater", seats: 3, price: 679, order: 3 },
      { label: "3+2 Set", seats: 5, price: 749, order: 4 },
      { label: "3+2+1 Full Set", seats: 6, price: 899, order: 5 },
      { label: "Corner", seats: 5, price: 849, order: 6 },
    ]),
    colours: [
      colour("local-dino", "Beige & Brown", "#C4A882"),
      colour("local-dino", "Grey & Black", "#4A4A4A"),
    ],
    fabrics: fabrics("local-dino"),
    extras: standardExtras("local-dino"),
  },
  {
    product: {
      id: "local-olympia",
      slug: "olympia-sofa",
      name: "Olympia Chesterfield",
      tagline: "Timeless rolled-arm chesterfield sets",
      description:
        "The Olympia is a classic chesterfield with deep buttoning and rolled arms. Available as armchair, 2 seater, 3 seater, 3+2 set, full set and corner.",
      base_price: 499,
      design_type: "chesterfield",
      has_corner: true,
      has_swivel_chair: false,
      featured: true,
      in_stock: true,
      created_at: "2026-01-09",
    },
    variants: variants("local-olympia", [
      { label: "Armchair", seats: 1, price: 499, order: 1 },
      { label: "2 Seater", seats: 2, price: 699, order: 2 },
      { label: "3 Seater", seats: 3, price: 799, order: 3 },
      { label: "3+2 Set", seats: 5, price: 1099, order: 4 },
      { label: "3+2+1 Full Set", seats: 6, price: 1299, order: 5 },
      { label: "Corner", seats: 5, price: 1199, order: 6 },
    ]),
    colours: standardColours("local-olympia"),
    fabrics: fabrics("local-olympia"),
    extras: standardExtras("local-olympia"),
  },
  {
    product: {
      id: "local-ashton",
      slug: "ashton-sofa",
      name: "Ashton Sofa",
      tagline: "The UK family room essential.",
      description:
        "The Ashton Sofa is designed for real British living rooms. Generous proportions, solid hardwood frame, and durable everyday fabric make this a forever sofa. Available as armchair, 2 seater, 3 seater, 3+2 set, full set and corner.",
      base_price: 299,
      design_type: "regular",
      has_corner: true,
      has_swivel_chair: false,
      featured: true,
      in_stock: true,
      created_at: "2026-01-10",
    },
    variants: variants("local-ashton", [
      { label: "Armchair", seats: 1, price: 299, order: 1 },
      { label: "2 Seater", seats: 2, price: 390, order: 2 },
      { label: "3 Seater", seats: 3, price: 560, order: 3 },
      { label: "3+2 Set", seats: 5, price: 849, order: 4 },
      { label: "3+2+1 Full Set", seats: 6, price: 1249, order: 5 },
      { label: "Corner", seats: 5, price: 949, order: 6 },
    ]),
    colours: standardColours("local-ashton"),
    fabrics: fabrics("local-ashton"),
    extras: standardExtras("local-ashton"),
  },
  {
    product: {
      id: "local-harrison",
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
      created_at: "2026-01-11",
    },
    variants: variants("local-harrison", [
      { label: "Armchair", seats: 1, price: 279, order: 1 },
      { label: "2 Seater", seats: 2, price: 370, order: 2 },
      { label: "3 Seater", seats: 3, price: 530, order: 3 },
      { label: "3+2 Set", seats: 5, price: 799, order: 4 },
      { label: "3+2+1 Full Set", seats: 6, price: 1199, order: 5 },
      { label: "Corner", seats: 5, price: 899, order: 6 },
    ]),
    colours: standardColours("local-harrison"),
    fabrics: fabrics("local-harrison"),
    extras: standardExtras("local-harrison"),
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
  return summary;
}

function withListingContext(
  products: ProductSummary[],
  ctx: { design?: string; size?: string; colour?: string },
): ProductSummary[] {
  return products.map((p) => {
    if (p.slug === "atalian-sofa") {
      const seed = seeds.find((s) => s.product.slug === "atalian-sofa");
      return applyAtalianListingContext(p, ctx, seed?.variants ?? []);
    }
    if (p.slug === "verona-sofa") {
      const seed = seeds.find((s) => s.product.slug === "verona-sofa");
      return applyVeronaListingContext(p, ctx, seed?.variants ?? []);
    }
    if (p.slug === "lily-sofa") {
      const seed = seeds.find((s) => s.product.slug === "lily-sofa");
      return applyLilyListingContext(p, ctx, seed?.variants ?? []);
    }
    if (p.slug === "dino-sofa") {
      const seed = seeds.find((s) => s.product.slug === "dino-sofa");
      return applyDinoListingContext(p, ctx, seed?.variants ?? []);
    }
    if (p.slug === "olympia-sofa") {
      const seed = seeds.find((s) => s.product.slug === "olympia-sofa");
      return applyOlympiaListingContext(p, ctx, seed?.variants ?? []);
    }
    if (p.slug === "ashton-sofa") {
      const seed = seeds.find((s) => s.product.slug === "ashton-sofa");
      return applyAshtonListingContext(p, ctx, seed?.variants ?? []);
    }
    if (p.slug === "harrison-sofa") {
      const seed = seeds.find((s) => s.product.slug === "harrison-sofa");
      return applyHarrisonListingContext(p, ctx, seed?.variants ?? []);
    }
    return p;
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
  return withListingContext(filtered, { design });
}

export function localProductsBySize(size: string): ProductSummary[] {
  const seatMap: Record<string, number> = {
    armchair: 1,
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
  return withListingContext(filtered, { size });
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
  return withListingContext(filtered, { colour: colourSlug });
}

export function localRecommendations(currentSlug: string, limit = 4): ProductSummary[] {
  return localAllProducts()
    .filter((p) => p.slug !== currentSlug)
    .slice(0, limit);
}

export function localAllSlugs(): string[] {
  return seeds.map((s) => s.product.slug);
}
