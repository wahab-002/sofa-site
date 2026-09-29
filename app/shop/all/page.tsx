import { getAllProducts } from "@/lib/products";
import CollectionPage from "@/components/CollectionPage";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Sofas | The Sofa Hub — Quality UK Sofas with Free Delivery",
  description: "Browse the full The Sofa Hub sofa collection. Corner sofas, 3+2 sets, chesterfields, modular sofas and more. Free UK delivery, cash on delivery.",
};

export default async function ShopAllPage() {
  const products = await getAllProducts();
  return (
    <CollectionPage
      title="All Sofas"
      description="Every sofa in our range, from compact 2 seaters to family-sized U-shapes. Free UK delivery and cash on delivery on everything."
      products={products}
      crumb="All Sofas"
      activeHref="/shop/all"
      illustration={{ spec: { design: "u-shape", arms: "round" }, colour: "#1E3A5F" }}
    />
  );
}
