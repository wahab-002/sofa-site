import { getProductsBySize } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const sizeMeta: Record<string, { title: string; description: string }> = {
  "2-seater": { title: "2 Seater Sofas UK",  description: "Compact 2 seater sofas at unbeatable prices. Free UK delivery, cash on delivery." },
  "3-seater": { title: "3 Seater Sofas UK",  description: "Classic 3 seater sofas for every home. Great prices, free UK delivery." },
  "4-seater": { title: "4 Seater Sofas UK",  description: "Generous 4 seater sofas for family living. Free UK delivery." },
  "5-seater": { title: "5 Seater Sofas UK",  description: "5 seater sofas at the UK's best prices. Cash on delivery available." },
  "6-seater": { title: "6 Seater Sofas UK",  description: "Extra large 6 seater sofas. Free UK delivery, cash on delivery." },
};

type Props = { params: { size: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = sizeMeta[params.size];
  if (!meta) return {};
  return { title: `${meta.title} | The Sofa Hub`, description: meta.description };
}

export default async function ShopSizePage({ params }: Props) {
  const meta = sizeMeta[params.size];
  if (!meta) return notFound();

  const products = await getProductsBySize(params.size);
  const label = params.size.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-4xl text-charcoal mb-3">{meta.title}</h1>
        <p className="font-body text-charcoal/60 max-w-xl">{meta.description}</p>
        <p className="font-body text-sm text-charcoal/40 mt-2">{products.length} sofas available</p>
      </div>
      {products.length === 0 ? (
        <p className="font-body text-charcoal/50">No sofas in this size yet — check back soon.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
