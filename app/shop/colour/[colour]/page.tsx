import { getProductsByColour } from "@/lib/products";
import CollectionPage from "@/components/CollectionPage";
import { colourCategories } from "@/lib/site";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const colourMeta: Record<string, { title: string; description: string; hex: string }> = {
  "grey-sofas":  { title: "Grey Sofas UK",  description: "Light grey and dark grey sofas at unbeatable prices. Free UK delivery, cash on delivery.", hex: "#B0ADA8" },
  "cream-sofas": { title: "Cream Sofas UK", description: "Cream and natural-toned sofas for every home. Free delivery, cash on delivery.", hex: "#F5F0E8" },
  "navy-sofas":  { title: "Navy Sofas UK",  description: "Deep navy blue sofas at the UK's best prices. Free delivery, cash on delivery.", hex: "#1E3A5F" },
  "black-sofas": { title: "Black Sofas UK", description: "Classic black sofas in fabric and leather. Unbeatable prices, free UK delivery.", hex: "#1A1A1A" },
  "brown-sofas": { title: "Brown Sofas UK", description: "Warm brown and tan leather sofas. Great prices, free UK delivery.", hex: "#6B3A2A" },
};

type Props = { params: { colour: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = colourMeta[params.colour];
  if (!meta) return {};
  return { title: `${meta.title} | The Sofa Hub`, description: meta.description };
}

export default async function ShopColourPage({ params }: Props) {
  const meta = colourMeta[params.colour];
  if (!meta) return notFound();

  const products = await getProductsByColour(params.colour);
  const category = colourCategories.find((c) => c.slug === params.colour);
  const label = `${category?.label ?? ""} Sofas`.trim();

  return (
    <CollectionPage
      title={label}
      description={meta.description}
      products={products}
      crumb={label}
      activeHref={`/shop/colour/${params.colour}`}
      swatch={category?.hexes ?? [meta.hex]}
      illustration={{ spec: { design: "corner", arms: "round" }, colour: meta.hex }}
    />
  );
}
