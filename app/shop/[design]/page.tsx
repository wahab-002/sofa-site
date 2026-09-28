import { getProductsByDesign } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const designMeta: Record<string, { title: string; description: string }> = {
  "corner-sofas":       { title: "Corner Sofas UK",        description: "Shop our range of corner sofas. L-shaped designs built for UK living rooms. Free delivery & cash on delivery." },
  "chesterfield-sofas": { title: "Chesterfield Sofas UK",  description: "Classic hand-tufted chesterfield sofas in fabric and leather. Timeless British design delivered to your door." },
  "u-shape-sofas":      { title: "U-Shape Sofas UK",       description: "Generous U-shape sofas for the whole family. Maximum seating, maximum comfort." },
  "3-2-sofa-sets":      { title: "3+2 Sofa Sets UK",       description: "Matching 3 seater and 2 seater sofa sets. Great value, great style." },
  "3-2-1-full-sets":    { title: "3+2+1 Full Sofa Sets UK",description: "Complete sofa sets with 3 seater, 2 seater, and armchair. Everything you need." },
  "modular-sofas":      { title: "Modular Sofas UK",       description: "Build your perfect sofa, section by section. Flexible, stylish, completely yours." },
};

type Props = { params: { design: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = designMeta[params.design];
  if (!meta) return {};
  return { title: `${meta.title} | The Sofa Hub`, description: meta.description };
}

export default async function ShopDesignPage({ params }: Props) {
  const meta = designMeta[params.design];
  if (!meta) return notFound();

  const products = await getProductsByDesign(params.design);

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-4xl text-charcoal mb-3">{meta.title}</h1>
        <p className="font-body text-charcoal/60 max-w-xl">{meta.description}</p>
        <p className="font-body text-sm text-charcoal/40 mt-2">{products.length} sofas available</p>
      </div>
      {products.length === 0 ? (
        <p className="font-body text-charcoal/50">No sofas in this category yet — check back soon.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
