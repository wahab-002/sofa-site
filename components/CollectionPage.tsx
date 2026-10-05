import Link from "next/link";
import type { ProductSummary } from "@/lib/types";
import ProductGrid from "./ProductGrid";
import Breadcrumb from "./Breadcrumb";
import SofaIllustration, { type IllustrationSpec } from "./SofaIllustration";
import Icon, { WhatsAppIcon } from "./Icon";
import { colourCategories, designCategories, sizeCategories, whatsappLink } from "@/lib/site";

type Props = {
  title: string;
  description: string;
  products: ProductSummary[];
  crumb: string;
  activeHref: string;
  illustration?: { spec: IllustrationSpec; colour: string };
  swatch?: string[];
};

export default function CollectionPage({ title, description, products, crumb, activeHref, illustration, swatch }: Props) {
  const fromPrice = products.length ? Math.min(...products.map((p) => p.from_price)) : null;

  const filters = [
    { label: "All", href: "/shop/all" },
    ...designCategories.map((d) => ({ label: d.label, href: `/shop/${d.slug}` })),
  ];

  return (
    <>
      <section className="container-site pt-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-sand px-6 py-10 md:px-12 md:py-14">
          <div className="relative z-10 max-w-xl">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Sofas", href: "/shop/all" }, { label: crumb }]} />
            <div className="mt-5 flex items-center gap-4">
              {swatch && (
                <span className="flex h-12 w-12 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                  {swatch.map((h) => (
                    <span key={h} className="h-full flex-1" style={{ backgroundColor: h }} />
                  ))}
                </span>
              )}
              <h1 className="font-display text-4xl font-bold text-charcoal md:text-5xl">{title}</h1>
            </div>
            <p className="mt-4 font-body text-lg leading-relaxed text-charcoal/65">{description}</p>
            {fromPrice !== null && (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-body text-sm text-charcoal/70">
                <Icon name="tag" className="h-4 w-4 text-clay" />
                {products.length} {title.toLowerCase().includes("armchair") ? "armchairs" : "sofas"} from{" "}
                <span className="font-semibold text-charcoal">£{fromPrice.toLocaleString("en-GB")}</span>
              </p>
            )}
          </div>
          {illustration && (
            <div className="pointer-events-none absolute -bottom-2 right-[-4%] hidden w-[46%] md:block">
              <SofaIllustration spec={illustration.spec} colour={illustration.colour} className="w-full" />
            </div>
          )}
        </div>
      </section>

      <section className="container-site mt-8">
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 py-1.5 md:mx-0 md:flex-wrap md:p-1.5">
          {filters.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className={`flex-shrink-0 rounded-full px-4 py-2 font-body text-sm ring-1 transition-colors ${
                f.href === activeHref
                  ? "bg-charcoal text-linen ring-charcoal"
                  : "bg-white text-charcoal/75 ring-charcoal/10 hover:ring-charcoal/30"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="container-site mt-8">
        {products.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center ring-1 ring-charcoal/5">
            <p className="font-display text-2xl font-semibold text-charcoal">Nothing here just yet</p>
            <p className="mt-2 font-body text-charcoal/60">New sofas are on the way. Browse the full range in the meantime.</p>
            <Link href="/shop/all" className="btn btn-primary btn-md mt-6">
              Shop all sofas
            </Link>
          </div>
        ) : (
          <ProductGrid
            products={products}
            itemLabel={title.toLowerCase().includes("armchair") ? "armchair" : "sofa"}
          />
        )}
      </section>

      <section className="container-site mt-16 grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 ring-1 ring-charcoal/5 md:p-8">
          <p className="eyebrow">Shop by size</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {sizeCategories.map((s) => {
              const href = `/shop/size/${s.slug}`;
              return (
                <Link
                  key={s.slug}
                  href={href}
                  className={`rounded-full px-4 py-2 font-body text-sm ${
                    href === activeHref ? "bg-charcoal text-linen" : "bg-sand text-charcoal hover:bg-stone"
                  }`}
                >
                  {s.label}
                </Link>
              );
            })}
          </div>
          <p className="eyebrow mt-6">Shop by colour</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {colourCategories.map((c) => {
              const href = `/shop/colour/${c.slug}`;
              return (
                <Link
                  key={c.slug}
                  href={href}
                  className={`flex items-center gap-2 rounded-full px-3 py-2 font-body text-sm ${
                    href === activeHref ? "bg-charcoal text-linen" : "bg-sand text-charcoal hover:bg-stone"
                  }`}
                >
                  <span className="h-4 w-4 rounded-full ring-1 ring-charcoal/15" style={{ backgroundColor: c.hex }} />
                  {c.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Buying Advice & FAQ Accordion for Category SEO */}
      <section className="container-site mt-14 mb-8">
        <div className="rounded-3xl border border-charcoal/10 bg-white p-6 md:p-10">
          <span className="eyebrow text-forest">Shopping Advice</span>
          <h2 className="mt-2 font-display text-2xl font-bold text-charcoal md:text-3xl">
            Ordering Your {title} with Confidence
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3 font-body text-sm text-charcoal/75">
            <div className="rounded-2xl bg-sand/50 p-5">
              <h3 className="font-display text-base font-semibold text-charcoal flex items-center gap-2">
                <Icon name="truck" className="h-4 w-4 text-forest" />
                Free 2-Man UK Delivery
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/65">
                Every {title.toLowerCase()} order includes complimentary 2-man room of choice delivery across mainland UK. Our team brings your new suite straight into your ground-floor living area with zero hidden courier fees.
              </p>
            </div>
            <div className="rounded-2xl bg-sand/50 p-5">
              <h3 className="font-display text-base font-semibold text-charcoal flex items-center gap-2">
                <Icon name="cash" className="h-4 w-4 text-forest" />
                100% Cash on Delivery
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/65">
                Zero deposit required when ordering online or on WhatsApp. You inspect the sofa upholstery, stitching, firmness, and dimensions in your home before handing over payment to our drivers.
              </p>
            </div>
            <div className="rounded-2xl bg-sand/50 p-5">
              <h3 className="font-display text-base font-semibold text-charcoal flex items-center gap-2">
                <Icon name="shield" className="h-4 w-4 text-forest" />
                12-Month Guarantee
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/65">
                Built with reinforced timber frames, high-resilience reflex foam cushions, and durable upholstery compliant with all British Fire Safety standards. Backed by our 12-month structural warranty.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
