export const dynamic = "force-dynamic";

import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Sofa Hub | Quality UK Sofas at Unbeatable Prices — Free Delivery",
  description:
    "Shop 12 sofa collections at The Sofa Hub. Corner sofas, 3+2 sets, chesterfields and more. Unbeatable UK prices, free delivery, cash on delivery. Order on WhatsApp today.",
};

const designCategories = [
  { slug: "corner-sofas",       label: "Corner Sofas",       desc: "L-shape & corner designs" },
  { slug: "chesterfield-sofas", label: "Chesterfield Sofas", desc: "Classic tufted style" },
  { slug: "u-shape-sofas",      label: "U-Shape Sofas",      desc: "Maximum family seating" },
  { slug: "3-2-sofa-sets",      label: "3+2 Sofa Sets",      desc: "Matching sets, great value" },
  { slug: "3-2-1-full-sets",    label: "3+2+1 Full Sets",    desc: "Complete room package" },
  { slug: "modular-sofas",      label: "Modular Sofas",      desc: "Build your perfect sofa" },
];

const sizeCategories = [
  { slug: "2-seater", label: "2 Seater", seats: "2" },
  { slug: "3-seater", label: "3 Seater", seats: "3" },
  { slug: "4-seater", label: "4 Seater", seats: "4" },
  { slug: "5-seater", label: "5 Seater", seats: "5" },
  { slug: "6-seater", label: "6 Seater", seats: "6" },
];

const colourCategories = [
  { slug: "grey-sofas",   label: "Grey",   hex: "#B0ADA8" },
  { slug: "cream-sofas",  label: "Cream",  hex: "#F5F0E8" },
  { slug: "navy-sofas",   label: "Navy",   hex: "#1E3A5F" },
  { slug: "black-sofas",  label: "Black",  hex: "#1A1A1A" },
  { slug: "brown-sofas",  label: "Brown",  hex: "#6B3A2A" },
];

const trustPoints = [
  { icon: "🚚", title: "Free UK Delivery",      desc: "On every single order" },
  { icon: "💷", title: "Cash on Delivery",       desc: "Pay when it arrives" },
  { icon: "💬", title: "Order on WhatsApp",      desc: "Speak to a real person" },
  { icon: "🏷️", title: "Unbeatable Prices",     desc: "We don't do overpricing" },
];

const usps = [
  {
    icon: "📦",
    title: "12 Sofa Collections",
    desc: "Corner sofas, chesterfields, modular, U-shapes and more — all under one roof at prices that make sense.",
  },
  {
    icon: "💰",
    title: "Low Prices. Always.",
    desc: "We sell on volume, not margin. That means you get a quality sofa without paying showroom prices.",
  },
  {
    icon: "📱",
    title: "Order in Minutes",
    desc: "No complicated checkout. Pick your sofa, message us on WhatsApp, and we'll sort the rest — cash on delivery.",
  },
];

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <div>
      {/* ── Hero ── */}
      <section className="py-14 md:py-20 border-b border-charcoal/8">
        <div className="inline-block bg-forest/10 text-forest font-body text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-5">
          Free UK Delivery on Everything
        </div>
        <h1 className="font-display text-4xl md:text-6xl text-charcoal max-w-3xl leading-tight mb-5">
          Quality sofas.<br />
          <span className="text-forest">Unbeatable</span> UK prices.
        </h1>
        <p className="font-body text-charcoal/65 text-lg max-w-xl mb-8 leading-relaxed">
          12 sofa collections. Hundreds of colour and fabric combinations. Cash on delivery, no deposit needed. Order straight from WhatsApp.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/shop/all"
            className="inline-block bg-forest text-linen font-body px-7 py-3.5 rounded-xl hover:bg-charcoal transition-colors font-medium"
          >
            Shop All Sofas
          </Link>
          <Link
            href="/shop/corner-sofas"
            className="inline-block border border-charcoal/20 text-charcoal font-body px-7 py-3.5 rounded-xl hover:border-forest hover:text-forest transition-colors"
          >
            Corner Sofas →
          </Link>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="py-6 border-b border-charcoal/8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustPoints.map((t) => (
            <div key={t.title} className="flex items-center gap-3">
              <span className="text-xl flex-shrink-0">{t.icon}</span>
              <div>
                <p className="font-body text-sm font-semibold text-charcoal leading-none">{t.title}</p>
                <p className="font-body text-xs text-charcoal/50 mt-0.5">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Shop by Design ── */}
      <section className="py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-2xl text-charcoal">Shop by Design</h2>
          <Link href="/shop/all" className="font-body text-sm text-forest hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {designCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="group flex flex-col justify-between p-5 rounded-2xl border border-charcoal/10 hover:border-forest hover:bg-forest/5 transition-all duration-300 min-h-[100px]"
            >
              <p className="font-display text-lg text-charcoal group-hover:text-forest transition-colors">
                {cat.label}
              </p>
              <p className="font-body text-sm text-charcoal/50 mt-2">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Shop by Size ── */}
      <section className="py-8 border-t border-charcoal/8">
        <h2 className="font-display text-2xl text-charcoal mb-5">Shop by Size</h2>
        <div className="flex flex-wrap gap-3">
          {sizeCategories.map((s) => (
            <Link
              key={s.slug}
              href={`/shop/size/${s.slug}`}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-charcoal/15 hover:border-forest hover:bg-forest/5 font-body text-sm text-charcoal hover:text-forest transition-all"
            >
              <span className="font-semibold">{s.seats}</span>
              <span className="text-charcoal/60">Seater</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── All Products ── */}
      <section className="py-12 border-t border-charcoal/8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl text-charcoal">All Sofas</h2>
            <p className="font-body text-sm text-charcoal/50 mt-1">
              {products.length} collections — prices from £{Math.min(...products.map(p => p.base_price)).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── Shop by Colour ── */}
      <section className="py-10 border-t border-charcoal/8">
        <h2 className="font-display text-2xl text-charcoal mb-5">Shop by Colour</h2>
        <div className="flex flex-wrap gap-3">
          {colourCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/shop/colour/${c.slug}`}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-charcoal/12 hover:border-charcoal/30 transition-all font-body text-sm text-charcoal"
            >
              <span
                className="w-5 h-5 rounded-full border border-white shadow-sm flex-shrink-0"
                style={{ backgroundColor: c.hex }}
              />
              {c.label} Sofas
            </Link>
          ))}
        </div>
      </section>

      {/* ── Why The Sofa Hub ── */}
      <section className="py-12 border-t border-charcoal/8">
        <h2 className="font-display text-2xl text-charcoal mb-8">Why The Sofa Hub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {usps.map((u) => (
            <div key={u.title} className="p-6 rounded-2xl bg-charcoal text-linen">
              <span className="text-3xl block mb-4">{u.icon}</span>
              <h3 className="font-display text-xl mb-2">{u.title}</h3>
              <p className="font-body text-linen/65 text-sm leading-relaxed">{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-12 border-t border-charcoal/8 text-center">
        <h2 className="font-display text-3xl text-charcoal mb-3">
          Ready to find your sofa?
        </h2>
        <p className="font-body text-charcoal/60 mb-6 max-w-md mx-auto">
          Browse our full collection and order in minutes. Cash on delivery, no deposit, free UK delivery.
        </p>
        <Link
          href="/shop/all"
          className="inline-block bg-forest text-linen font-body px-8 py-4 rounded-xl hover:bg-charcoal transition-colors font-medium text-lg"
        >
          Shop All Sofas
        </Link>
      </section>
    </div>
  );
}
