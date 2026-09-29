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
                {products.length} sofas from <span className="font-semibold text-charcoal">£{fromPrice.toLocaleString("en-GB")}</span>
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
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
          {filters.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className={`flex-shrink-0 rounded-full px-4 py-2 font-body text-sm transition-colors ${
                f.href === activeHref ? "bg-charcoal text-linen" : "bg-white text-charcoal/75 ring-1 ring-charcoal/10 hover:ring-charcoal/30"
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
          <ProductGrid products={products} />
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
        <div className="flex flex-col justify-between rounded-3xl bg-forest p-6 text-linen md:p-8">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-gold">Need a hand?</p>
            <p className="mt-2 font-display text-2xl font-semibold">Not sure which sofa fits your room?</p>
            <p className="mt-2 font-body text-linen/70">Send us your measurements and a photo of your space. We&apos;ll recommend the right size and style.</p>
          </div>
          <a
            href={whatsappLink(`Hi, I'm looking at ${title}. Can you help me choose?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light btn-md mt-6 self-start"
          >
            <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
            Get advice on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
