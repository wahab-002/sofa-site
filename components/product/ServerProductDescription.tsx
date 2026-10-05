// components/product/ServerProductDescription.tsx
// Server-rendered comprehensive product copy to satisfy crawlers & provide complete buyer details
import Icon from "@/components/Icon";
import type { ProductWithDetails } from "@/lib/types";

type Props = {
  product: ProductWithDetails;
  configLabel?: string;
};

export default function ServerProductDescription({ product, configLabel }: Props) {
  const name = configLabel ? `${product.name} (${configLabel})` : product.name;

  return (
    <section className="container-site mt-14 border-t border-charcoal/10 pt-12">
      <div className="mx-auto max-w-4xl space-y-10">
        <div>
          <span className="eyebrow text-forest">Product Details &amp; Craftsmanship</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-charcoal sm:text-3xl">
            Everything You Need to Know About the {name}
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-charcoal/75">
            {product.description} Built specifically for everyday British homes, the {product.name} balances timeless styling with durable, family-friendly materials designed for modern living.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
            <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold text-charcoal">
              <Icon name="check" className="h-5 w-5 text-forest" />
              Heavy-Duty Frame &amp; Suspension
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/70">
              The internal framework is constructed using sustainably sourced, kiln-dried hardwood timber reinforced with glued, screwed, and dowelled corner blocks. Beneath the seating cushions, heavy-gauge serpentine steel springs provide consistent weight distribution, preventing sagging and ensuring long-lasting bounce-back comfort.
            </p>
          </div>

          <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
            <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold text-charcoal">
              <Icon name="shield" className="h-5 w-5 text-forest" />
              High-Resilience Reflex Foam Cushions
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/70">
              Each seating cushion is moulded from premium high-density reflex foam core and enveloped in a soft layer of Dacron wadding. This dual-layer construction delivers an immediate sink-in plushness while maintaining firm, ergonomic posture support that quickly regains its clean shape after use.
            </p>
          </div>

          <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
            <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold text-charcoal">
              <Icon name="truck" className="h-5 w-5 text-forest" />
              Delivery &amp; Easy Room Access
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/70">
              Every order includes free 2-man room-of-choice mainland UK delivery. Our logistics team brings the sofa straight into your ground-floor living area. All feet are detachable to reduce entry profile height during transit, ensuring smooth passage through standard UK doorways (75cm or wider) and hallways.
            </p>
          </div>

          <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
            <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold text-charcoal">
              <Icon name="cash" className="h-5 w-5 text-forest" />
              100% Cash on Delivery — £0 Deposit
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/70">
              We never take upfront deposits online. You place your order on WhatsApp, receive tracking updates, and only make payment after the delivery drivers have carried the sofa into your home and you have thoroughly inspected the fabric, stitching, and cushion firmness yourself.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-sand/60 p-6 md:p-8">
          <h3 className="font-display text-xl font-semibold text-charcoal">
            Upholstery Care &amp; Certified UK Fire Safety
          </h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-charcoal/70">
            All upholstery fabrics used across our collections comply strictly with British Fire Safety Regulations (BS 5852). To keep your {product.name} looking showroom-fresh, lightly vacuum the fabric weekly with a soft brush attachment. In the event of accidental spills, gently blot with a clean, damp microfibre cloth without rubbing. Avoid using abrasive household chemical cleaners.
          </p>
        </div>
      </div>
    </section>
  );
}
