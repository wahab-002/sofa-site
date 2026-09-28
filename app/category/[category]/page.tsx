import { getProductsByCategory } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const products = await getProductsByCategory(params.category);
  const title = params.category.replace(/-/g, " ");

  return (
    <div>
      <h1 className="font-display text-3xl text-charcoal capitalize mb-8">{title}</h1>
      {products.length === 0 ? (
        <p className="font-body text-charcoal/60">No sofas in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
