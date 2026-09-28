import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <div>
      <section className="py-10">
        <h1 className="font-display text-4xl md:text-5xl text-charcoal max-w-2xl">
          Sofas built for real UK living rooms.
        </h1>
        <p className="font-body text-charcoal/70 mt-4 max-w-lg">
          Quality frames, durable fabric, and cash on delivery — order in minutes over WhatsApp.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-charcoal mb-6">Our Sofas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
