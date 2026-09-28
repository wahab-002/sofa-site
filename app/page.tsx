import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sofas UK | Quality Corner Sofas, 3 Seater Sofas & More | The Sofa Hub",
  description:
    "Shop quality corner sofas, 3 seater sofas, leather sofas and sofa sets with free UK delivery and cash on delivery. Order in minutes over WhatsApp.",
};

const categories = [
  { label: "Corner Sofas", href: "/category/corner-sofas", desc: "L-shape & corner designs for every room" },
  { label: "L-Shape Sofas", href: "/category/l-shape-sofas", desc: "Space-smart L-shaped seating" },
  { label: "3 Seater", href: "/category/3-seater", desc: "Classic 3 seater & 3+2 sofa sets" },
  { label: "2 Seater", href: "/category/2-seater", desc: "Compact sofas for smaller spaces" },
  { label: "Recliner Sofas", href: "/category/recliner-sofas", desc: "Ultimate comfort with reclining seats" },
  { label: "Leather Sofas", href: "/category/leather-sofas", desc: "Real & faux leather in every style" },
];

const trustPoints = [
  { icon: "🚚", title: "Free UK Delivery", desc: "On every order, no minimum spend" },
  { icon: "💷", title: "Cash on Delivery", desc: "Pay when your sofa arrives" },
  { icon: "💬", title: "Order on WhatsApp", desc: "Speak to a real person, not a chatbot" },
];

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <div>
      {/* Hero */}
      <section className="py-12 md:py-16">
        <h1 className="font-display text-4xl md:text-6xl text-charcoal max-w-2xl leading-tight">
          Quality sofas for real UK living rooms.
        </h1>
        <p className="font-body text-charcoal/70 mt-5 max-w-lg text-lg">
          Free delivery. Cash on delivery. Order in minutes over WhatsApp — no showroom visit needed.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/category/corner-sofas"
            className="inline-block bg-forest text-linen font-body px-6 py-3 rounded-md hover:bg-charcoal transition-colors"
          >
            Shop Corner Sofas
          </Link>
          <Link
            href="/contact"
            className="inline-block border border-charcoal/20 text-charcoal font-body px-6 py-3 rounded-md hover:border-forest hover:text-forest transition-colors"
          >
            Ask on WhatsApp
          </Link>
        </div>
      </section>

      {/* Trust signals */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y border-charcoal/10">
        {trustPoints.map((t) => (
          <div key={t.title} className="flex items-start gap-3 p-2">
            <span className="text-2xl">{t.icon}</span>
            <div>
              <p className="font-body font-semibold text-charcoal text-sm">{t.title}</p>
              <p className="font-body text-charcoal/60 text-sm">{t.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section className="py-10">
        <h2 className="font-display text-2xl text-charcoal mb-6">Browse by Type</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="block border border-charcoal/10 rounded-lg p-5 hover:border-forest hover:bg-forest/5 transition-colors group"
            >
              <p className="font-display text-lg text-charcoal group-hover:text-forest transition-colors">
                {cat.label}
              </p>
              <p className="font-body text-sm text-charcoal/60 mt-1">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="py-4">
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
