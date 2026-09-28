import { getProductsByColour } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
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

  return (
    <div>
      <div className="flex items-center gap-4 mb-10">
        <span className="w-10 h-10 rounded-full border border-charcoal/15 shadow-sm flex-shrink-0"
          style={{ backgroundColor: meta.hex }} />
        <div>
          <h1 className="font-display text-4xl text-charcoal">{meta.title}</h1>
          <p className="font-body text-charcoal/60 mt-1">{products.length} sofas available</p>
        </div>
      </div>
      {products.length === 0 ? (
        <p className="font-body text-charcoal/50">No sofas in this colour yet — check back soon.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
