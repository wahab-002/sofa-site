import { getProductsBySize } from "@/lib/products";
import CollectionPage from "@/components/CollectionPage";
import type { IllustrationSpec } from "@/components/SofaIllustration";
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

const sizeArt: Record<string, IllustrationSpec> = {
  "2-seater": { design: "sofa", pieces: [2], arms: "round" },
  "3-seater": { design: "sofa", pieces: [3], arms: "round" },
  "4-seater": { design: "modular", modules: 4 },
  "5-seater": { design: "sofa", pieces: [3, 2], arms: "round" },
  "6-seater": { design: "corner", arms: "round" },
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
  const label = `${params.size.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())} Sofas`;

  return (
    <CollectionPage
      title={label}
      description={meta.description}
      products={products}
      crumb={label}
      activeHref={`/shop/size/${params.size}`}
      illustration={{ spec: sizeArt[params.size], colour: "#B0ADA8" }}
    />
  );
}
