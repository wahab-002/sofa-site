export const dynamic = "force-dynamic";

import Link from "next/link";
import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import SofaIllustration from "@/components/SofaIllustration";
import DesignTiles from "@/components/home/DesignTiles";
import HeroShowcase from "@/components/home/HeroShowcase";
import HowToOrder from "@/components/HowToOrder";
import Faq from "@/components/Faq";
import Icon, { WhatsAppIcon } from "@/components/Icon";
import { colourCategories, formatPrice, sizeCategories, trustPoints, whatsappLink } from "@/lib/site";
import { LOCAL_COLLECTION_COUNT } from "@/lib/localCatalog";
import { getAllGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "The Sofa Hub | Quality UK Sofas at Unbeatable Prices — Free Delivery",
  description:
    "Shop 12 sofa collections at The Sofa Hub. Corner sofas, 3+2 sets, chesterfields and more. Unbeatable UK prices, free delivery, cash on delivery. Order on WhatsApp today.",
};

const reasons = [
  {
    icon: "tag",
    title: "Low prices. Always.",
    desc: "We sell on volume, not margin. You get a quality sofa without paying for a showroom.",
  },
  {
    icon: "home",
    title: "Built for real homes",
    desc: "Solid hardwood frames and deep foam cushions, in fabrics that cope with kids, pets and film nights.",
  },
  {
    icon: "shield",
    title: "Zero risk ordering",
    desc: "No deposit and nothing to pay online. You only pay when your sofa is at your door.",
  },
  {
    icon: "chat",
    title: "Real people, real answers",
    desc: "No bots or call queues. Message us on WhatsApp and talk to the team directly.",
  },
];

export default async function HomePage() {
  const products = await getAllProducts();
  const fromPrice = products.length ? Math.min(...products.map((p) => p.from_price)) : 350;
  const bestSellers = products.slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="container-site grid items-center gap-10 pb-12 pt-8 md:pt-14 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 font-body text-xs font-medium text-charcoal/70 ring-1 ring-charcoal/10">
            <span className="h-2 w-2 rounded-full bg-whatsapp" />
            Free UK delivery on every order
          </p>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] text-charcoal md:text-6xl xl:text-7xl">
            Quality sofas.
            <br />
            <span className="text-forest">Honest</span> prices.
          </h1>
          <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-charcoal/65">
            {LOCAL_COLLECTION_COUNT} collections and 10 colours, from just{" "}
            <span className="font-semibold text-charcoal">{formatPrice(fromPrice)}</span>. No deposit. Order on WhatsApp and pay cash on delivery.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop/all" className="btn btn-primary btn-lg">
              Shop all sofas
              <Icon name="arrow" className="h-5 w-5" />
            </Link>
            <a href={whatsappLink("Hi, I'm looking for a sofa. Can you help?")} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
              <WhatsAppIcon className="h-5 w-5 text-whatsapp" />
              Ask us anything
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-body text-sm text-charcoal/65">
            {["No deposit needed", "Cash on delivery", "Dispatched within 7 days"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Icon name="check" className="h-4 w-4 text-forest" strokeWidth={2.2} />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="animate-fade-up [animation-delay:120ms]">
          <HeroShowcase />
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-charcoal/10 bg-white">
        <div className="container-site grid grid-cols-2 divide-charcoal/10 md:grid-cols-4 md:divide-x">
          {trustPoints.map((t) => (
            <div key={t.title} className="flex items-center gap-3 py-5 md:justify-center md:px-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sand text-forest">
                <Icon name={t.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="font-body text-sm font-semibold text-charcoal">{t.title}</p>
                <p className="font-body text-xs text-charcoal/50">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by design */}
      <section className="container-site py-20">
        <SectionHeading eyebrow="Find your style" title="Shop by design" href="/shop/all" linkLabel="View all sofas" />
        <DesignTiles />
      </section>

      {/* Best sellers */}
      <section className="container-site pb-20">
        <SectionHeading
          eyebrow="Most loved"
          title="Our best sellers"
          subtitle="Hover the swatches to see each sofa in a different colour."
          href="/shop/all"
          linkLabel={`View all ${products.length}`}
        />
        <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {bestSellers.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/shop/all" className="btn btn-secondary btn-lg">
            Browse all {products.length} sofas
            <Icon name="arrow" className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* How to order */}
      <section className="bg-forest py-20 text-linen">
        <div className="container-site">
          <div className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-gold">Simple as 1, 2, 3</p>
              <h2 className="mt-3 font-display text-3xl font-semibold md:text-5xl">No checkout. No card. No stress.</h2>
            </div>
            <p className="font-body text-lg leading-relaxed text-linen/70 md:text-right">
              Ordering a sofa should take minutes, not an afternoon. Here&apos;s how it works.
            </p>
          </div>
          <HowToOrder />
        </div>
      </section>

      {/* Shop by size & colour */}
      <section className="container-site grid gap-5 py-20 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 ring-1 ring-charcoal/5 md:p-10">
          <p className="eyebrow">Measure up</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-charcoal">Shop by size</h2>
          <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {sizeCategories.map((s) => (
              <Link
                key={s.slug}
                href={`/shop/size/${s.slug}`}
                className="group flex flex-col items-center rounded-2xl bg-sand px-1 py-5 text-center transition-colors hover:bg-forest hover:text-linen"
              >
                <span className="font-display text-4xl font-bold leading-none">{s.seats}</span>
                <span className="mt-1 font-body text-xs text-charcoal/55 group-hover:text-linen/70">
                  {s.slug === "armchair" ? "armchair" : "seater"}
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-5 font-body text-sm text-charcoal/55">
            Not sure what fits? Send us your room measurements on WhatsApp and we&apos;ll suggest a size.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 ring-1 ring-charcoal/5 md:p-10">
          <p className="eyebrow">10 colours available</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-charcoal">Shop by colour</h2>
          <div className="mt-8 grid grid-cols-5 gap-2">
            {colourCategories.map((c) => (
              <Link key={c.slug} href={`/shop/colour/${c.slug}`} className="group flex flex-col items-center gap-3 text-center">
                <span className="relative block aspect-square w-full max-w-[84px] overflow-hidden rounded-full ring-1 ring-charcoal/10 transition-transform duration-300 group-hover:scale-105">
                  <span className="absolute inset-0 flex">
                    {c.hexes.map((h) => (
                      <span key={h} className="h-full flex-1" style={{ backgroundColor: h }} />
                    ))}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent" />
                </span>
                <span className="font-body text-sm font-medium text-charcoal">{c.label}</span>
              </Link>
            ))}
          </div>
          <p className="mt-5 font-body text-sm text-charcoal/55">
            Every sofa comes in Plush Velvet, Chenille or Leather, so you get the exact look you want.
          </p>
        </div>
      </section>

      {/* Why us */}
      <section className="container-site pb-20">
        <SectionHeading eyebrow="Why The Sofa Hub" title="Showroom quality, without the showroom price" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div key={r.title} className="rounded-3xl bg-sand p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-forest shadow-soft">
                <Icon name={r.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold text-charcoal">{r.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/60">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Buying Guides */}
      <section className="container-site pb-20">
        <SectionHeading
          eyebrow="Expert Advice"
          title="Sofa Buying & Style Guides"
          subtitle="Tips on sizing, cushion styles and choosing the right sofa for your home."
          href="/guides"
          linkLabel="View all guides"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {getAllGuides().slice(0, 3).map((g) => (
            <article
              key={g.slug}
              className="group flex flex-col rounded-3xl bg-white p-6 ring-1 ring-charcoal/10 transition-shadow hover:shadow-lift"
            >
              <span className="eyebrow text-xs text-forest">{g.category}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-charcoal group-hover:text-forest">
                <Link href={`/guides/${g.slug}`}>{g.title}</Link>
              </h3>
              <p className="mt-2 line-clamp-2 font-body text-xs leading-relaxed text-charcoal/65">
                {g.description}
              </p>
              <div className="mt-4 pt-4 border-t border-charcoal/5 flex items-center justify-between font-body text-xs text-charcoal/50">
                <span>{g.readingTime}</span>
                <Link href={`/guides/${g.slug}`} className="font-semibold text-forest hover:underline">
                  Read →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-site grid gap-10 pb-20 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="eyebrow">Good to know</p>
          <h2 className="section-title mt-2">Questions, answered</h2>
          <p className="mt-4 max-w-sm font-body text-charcoal/60">
            Can&apos;t find what you&apos;re looking for? We&apos;re one message away.
          </p>
          <a href={whatsappLink("Hi, I have a question.")} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-md mt-6">
            <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
            Message us
          </a>
        </div>
        <Faq />
      </section>

      {/* CTA */}
      <section className="container-site">
        <div className="relative overflow-hidden rounded-[2rem] bg-charcoal px-6 py-14 text-center text-linen md:px-16 md:py-20">
          <div className="pointer-events-none absolute -bottom-24 left-1/2 w-[1100px] max-w-none -translate-x-1/2 opacity-[0.045]">
            <SofaIllustration spec={{ design: "u-shape", arms: "round" }} colour="#FAF7F2" className="w-full" />
          </div>
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-semibold md:text-5xl">Your new sofa is a message away</h2>
            <p className="mx-auto mt-4 max-w-lg font-body text-lg text-linen/65">
              Free UK delivery, no deposit, and cash on delivery. Pick a sofa and we&apos;ll handle the rest.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/shop/all" className="btn btn-light btn-lg">
                Shop all sofas
              </Link>
              <a href={whatsappLink("Hi, I'd like to order a sofa.")} target="_blank" rel="noopener noreferrer" className="btn btn-lg bg-whatsapp text-charcoal hover:brightness-95">
                <WhatsAppIcon className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title mt-2">{title}</h2>
        {subtitle && <p className="mt-2 font-body text-charcoal/55">{subtitle}</p>}
      </div>
      {href && linkLabel && (
        <Link href={href} className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-forest hover:underline">
          {linkLabel}
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
