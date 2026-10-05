import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProductBySlug, getRecommendations } from "@/lib/products";
import {
  VERONA_CONFIGS,
  VERONA_DEFAULT_CONFIG,
  VERONA_DEFAULT_STYLE,
  VERONA_STYLES,
  getVeronaConfig,
  getVeronaStyle,
  veronaHref,
  veronaPhoto,
} from "@/lib/verona";
import VeronaConfigNav from "@/components/verona/VeronaConfigNav";
import VeronaConfigurator from "@/components/verona/VeronaConfigurator";
import Breadcrumb from "@/components/Breadcrumb";
import HowToOrder from "@/components/HowToOrder";
import Faq from "@/components/Faq";
import ProductCard from "@/components/ProductCard";
import ProductJsonLd from "@/components/ProductJsonLd";
import ServerProductDescription from "@/components/product/ServerProductDescription";
import Icon from "@/components/Icon";

export const dynamic = "force-dynamic";

type Props = { params: { style: string; config: string } };

export function generateStaticParams() {
  return VERONA_STYLES.flatMap((s) =>
    VERONA_CONFIGS.map((c) => ({ style: s.id, config: c.id })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const style = getVeronaStyle(params.style) ?? getVeronaStyle(VERONA_DEFAULT_STYLE)!;
  const config = getVeronaConfig(params.config) ?? getVeronaConfig(VERONA_DEFAULT_CONFIG)!;
  const product = await getProductBySlug("verona-sofa");
  if (!product) return {};
  const title = `${product.name} ${style.label} ${config.label} | The Sofa Hub`;
  const description = `${style.label} ${config.label} Verona sofa in Grey and Black. ${product.tagline} Free UK delivery and cash on delivery.`;
  const image = veronaPhoto(style.id, config.id, "grey");
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, alt: `${product.name} ${style.label} ${config.label}` }],
    },
  };
}

export default async function VeronaConfigPage({ params }: Props) {
  const style = getVeronaStyle(params.style);
  const config = getVeronaConfig(params.config);
  if (!style || !config) return notFound();

  const [product, recommendations] = await Promise.all([
    getProductBySlug("verona-sofa"),
    getRecommendations("verona-sofa", 4),
  ]);
  if (!product) return notFound();

  const variant = product.variants.find((v) => v.label === config.variantLabel);
  const fromPrice = variant?.price_gbp ?? product.base_price;
  const details = [
    {
      title: "About this sofa",
      body: <p>{product.description}</p>,
      open: true,
    },
    {
      title: "Sizes & options",
      body: (
        <ul className="space-y-1.5">
          {product.variants.map((v) => (
            <li key={v.id} className="flex justify-between border-b border-charcoal/5 pb-1.5">
              <span>{v.label}</span>
              <span className="font-medium text-charcoal">£{v.price_gbp.toLocaleString("en-GB")}</span>
            </li>
          ))}
          <li className="pt-2">
            {`Available in Scatter Back or High Back and ${product.colours.length} colour${
              product.colours.length === 1 ? "" : "s"
            }.`}
          </li>
        </ul>
      ),
    },
    {
      title: "Delivery & payment",
      body: (
        <p>
          Free UK delivery on every order, with most orders dispatched within 7 days. There&apos;s no deposit and nothing to
          pay online. You pay cash on delivery when your sofa arrives.
        </p>
      ),
    },
    {
      title: "Care guide",
      body: (
        <p>
          Plump and rotate cushions regularly to keep their shape. Vacuum fabric with a soft brush attachment and blot
          spills straight away with a clean, damp cloth. Wipe leather with a soft dry cloth and keep it out of direct
          sunlight.
        </p>
      ),
    },
  ];

  return (
    <div className="pb-24 lg:pb-0">
      <ProductJsonLd
        product={product}
        path={veronaHref(style.id, config.id)}
        image={veronaPhoto(style.id, config.id, "grey")}
        fromPrice={fromPrice}
      />
      <div className="container-site pb-6 pt-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "All Sofas", href: "/shop/all" },
            { label: product.name, href: "/products/verona-sofa" },
            { label: config.label },
          ]}
        />
        <VeronaConfigNav style={style.id} config={config.id} />
      </div>

      <section className="container-site">
        <VeronaConfigurator product={product} style={style} config={config}>
          <div className="mt-8 divide-y divide-charcoal/10 border-y border-charcoal/10">
            {details.map((d) => (
              <details key={d.title} className="group py-4" open={d.open}>
                <summary className="flex cursor-pointer items-center justify-between font-display text-lg font-semibold text-charcoal">
                  {d.title}
                  <Icon name="chevron" className="h-5 w-5 text-charcoal/50 transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-3 font-body text-[15px] leading-relaxed text-charcoal/65">{d.body}</div>
              </details>
            ))}
          </div>
        </VeronaConfigurator>
      </section>

      <ServerProductDescription product={product} configLabel={`${style.label} · ${config.label}`} />

      <section className="container-site mt-20">
        <div className="mb-8">
          <p className="eyebrow">Ordering is easy</p>
          <h2 className="section-title mt-2">Three steps to your new sofa</h2>
        </div>
        <HowToOrder compact />
      </section>

      {recommendations.length > 0 && (
        <section className="container-site mt-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Keep browsing</p>
              <h2 className="section-title mt-2">You may also like</h2>
            </div>
            <Link href="/shop/all" className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-forest hover:underline">
              View all sofas <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
            {recommendations.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <section className="container-site mt-20 grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="eyebrow">Good to know</p>
          <h2 className="section-title mt-2">Questions, answered</h2>
        </div>
        <Faq />
      </section>
    </div>
  );
}
