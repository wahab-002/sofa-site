import Link from "next/link";
import { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="block group border border-charcoal/10 rounded-lg overflow-hidden hover:border-forest transition-colors"
    >
      <div className="aspect-[4/3] bg-charcoal/5" />
      <div className="p-4 font-body">
        <h3 className="text-charcoal font-medium">{product.name}</h3>
        <p className="text-charcoal/60 text-sm mt-1">from £{product.price_gbp}</p>
      </div>
    </Link>
  );
}
