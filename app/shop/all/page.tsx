import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Sofas | The Sofa Hub — Quality UK Sofas with Free Delivery",
  description: "Browse the full The Sofa Hub sofa collection. Corner sofas, 3+2 sets, chesterfields, modular sofas and more. Free UK delivery, cash on delivery.",
};

export default async function ShopAllPage() {
  const products = await getAllProducts();
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-4xl text-charcoal mb-3">All Sofas</h1>
        <p className="font-body text-charcoal/60">{products.length} sofas — free UK delivery on everything</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
