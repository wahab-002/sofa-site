import type { ArmStyle, IllustrationSpec } from "@/components/SofaIllustration";

const armStyles: Record<string, ArmStyle> = {
  "oakland-sofa": "square",
  "verona-sofa": "slim",
  "falcon-sofa": "square",
  "malibu-sofa": "round",
  "lily-sofa": "round",
  "ashton-sofa": "slim",
  "dino-sofa": "round",
  "harrison-sofa": "square",
  "atalian-sofa": "slim",
  "bishop-sofa": "round",
  "borrius-sofa": "round",
  "olympia-sofa": "slim",
};

const cardDesigns: Record<string, IllustrationSpec["design"]> = {
  "oakland-sofa": "corner",
  "malibu-sofa": "corner",
  "ashton-sofa": "corner",
  "falcon-sofa": "corner",
  "atalian-sofa": "chesterfield",
  "borrius-sofa": "corner",
  "bishop-sofa": "u-shape",
  "olympia-sofa": "chesterfield",
};

type ProductLike = { slug: string; design_type: string };

/** How a product is drawn on grids, before a variant is chosen. */
export function cardIllustration(product: ProductLike): IllustrationSpec {
  const arms = armStyles[product.slug] ?? "square";
  if (product.design_type === "chesterfield") return { design: "chesterfield" };
  if (product.design_type === "u-shape") return { design: "u-shape", arms };
  if (product.design_type === "modular") return { design: "modular", modules: 4 };
  return { design: cardDesigns[product.slug] ?? "sofa", arms };
}

/** How a product is drawn for a specific size/variant on the product page. */
export function variantIllustration(
  product: ProductLike,
  variant: { label: string; seats: number | null } | null,
): IllustrationSpec {
  const base = cardIllustration(product);
  if (!variant) return base;
  if (base.design === "u-shape") return base;
  if (base.design === "modular") return { design: "modular", modules: Math.max(3, Math.min(variant.seats ?? 4, 6)) };

  const style = product.design_type === "chesterfield" ? "chesterfield" : "sofa";
  const arms = base.arms;
  switch (variant.label) {
    case "Corner":
      return { design: "corner", arms };
    case "Armchair":
      return { design: style, pieces: [1], arms };
    case "2 Seater":
      return { design: style, pieces: [2], arms };
    case "3 Seater":
      return { design: style, pieces: [3], arms };
    case "3+2 Set":
      return { design: style, pieces: [3, 2], arms };
    case "3+2+1 Full Set":
      return { design: style, pieces: [3, 2, 1], arms };
    default:
      return { design: style, pieces: [3], arms };
  }
}

/** A pleasant default colour for a card, varied across the grid. */
export function cardColour(product: ProductLike & { colours: { name: string; hex_code: string }[] }, index = 0) {
  if (product.colours.length === 0) return "#B0ADA8";
  const preferred = ["Light Grey", "Navy", "Beige", "Dark Grey", "Olive", "Chocolate", "Cream", "Orange", "Black", "Brown"];
  const name = preferred[index % preferred.length];
  return (product.colours.find((c) => c.name === name) ?? product.colours[0]).hex_code;
}
