import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Quality Sofas UK — Cash on Delivery",
  description:
    "We're a UK sofa specialist delivering quality corner sofas, 3 seater sofas, and sofa sets across the UK with cash on delivery. Order via WhatsApp today.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-4xl text-charcoal mb-6">
        About Us
      </h1>

      <p className="font-body text-charcoal/80 leading-relaxed mb-4">
        We're a UK-based sofa specialist focused on one thing: getting quality sofas into British
        living rooms without the fuss. No showroom markups, no pushy salespeople — just great
        sofas, delivered to your door, with cash on delivery available nationwide.
      </p>

      <p className="font-body text-charcoal/80 leading-relaxed mb-4">
        Every sofa in our range is built on a solid hardwood frame with deep foam cushioning,
        upholstered in durable, everyday fabrics that stand up to real family life — kids, dogs,
        and all.
      </p>

      <p className="font-body text-charcoal/80 leading-relaxed mb-8">
        We keep things simple. Browse online, message us on WhatsApp, and we'll sort the rest.
        No deposit required — pay on delivery when your sofa arrives.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="border border-charcoal/10 rounded-lg p-5">
          <p className="font-display text-2xl text-forest mb-1">COD</p>
          <p className="font-body text-sm text-charcoal/70">Cash on delivery across the UK — pay when it arrives</p>
        </div>
        <div className="border border-charcoal/10 rounded-lg p-5">
          <p className="font-display text-2xl text-forest mb-1">Free</p>
          <p className="font-body text-sm text-charcoal/70">Free UK delivery on all sofas, no hidden charges</p>
        </div>
        <div className="border border-charcoal/10 rounded-lg p-5">
          <p className="font-display text-2xl text-forest mb-1">Fast</p>
          <p className="font-body text-sm text-charcoal/70">Quick delivery — most orders dispatched within 7 days</p>
        </div>
      </div>

      <Link
        href="/contact"
        className="inline-block bg-forest text-linen font-body px-6 py-3 rounded-md hover:bg-charcoal transition-colors"
      >
        Get in Touch on WhatsApp
      </Link>
    </div>
  );
}
