import { getProductBySlug, getRecommendations, getAllProductSlugs } from "@/lib/products";
import ProductConfigurator from "@/components/ProductConfigurator";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";
import HowToOrder from "@/components/HowToOrder";
import Faq from "@/components/Faq";
import Icon from "@/components/Icon";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductMedia } from "@/lib/productMedia";

export const dynamic = "force-dynamic";

type Props = { params: { slug: string } };

const designMeta: Record<string, { label: string; href: string; collection: string }> = {
  chesterfield: { label: "Chesterfield Sofas", href: "/shop/chesterfield-sofas", collection: "Chesterfield Collection" },
  "u-shape": { label: "U-Shape Sofas", href: "/shop/u-shape-sofas", collection: "U-Shape Collection" },
  modular: { label: "Modular Sofas", href: "/shop/modular-sofas", collection: "Modular Collection" },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};
  const title = `${product.name} | The Sofa Hub — UK Sofas with Free Delivery`;
  const description = `${product.tagline} ${product.description.slice(0, 120)}... From £${product.base_price}. Free UK delivery & cash on delivery.`;
  const photo = product.images[0]?.image_url ?? getProductMedia(product.slug)?.cardImage;
  return {
    title,
    description,
    ...(photo && {
      openGraph: { title, description, images: [{ url: photo, alt: product.name }] },
      twitter: { card: "summary_large_image", images: [photo] },
    }),
  };
}

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: Props) {
  const [product, recommendations] = await Promise.all([
    getProductBySlug(params.slug),
    getRecommendations(params.slug, 4),
  ]);

  if (!product) return notFound();

  const design = designMeta[product.design_type];
  const fromPrice = product.variants.length ? Math.min(...product.variants.map((v) => v.price_gbp)) : product.base_price;
  const fabricNames = product.fabrics.map((f) => f.name).join(", ");
  const backStyles = getProductMedia(product.slug)?.styles ?? [];

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
            Available in {product.colours.length} colour{product.colours.length === 1 ? "" : "s"} and {fabricNames}.
          </li>
          {backStyles.length > 1 && (
            <li>Choose a {backStyles.map((s) => s.name).join(" or ")} design at the same price.</li>
          )}
        </ul>
      ),
    },
    {
      title: "Delivery & payment",
      body: (
        <p>
          Free UK delivery on every order, with most orders dispatched within 7 days. There&apos;s no deposit and nothing to pay online. You pay cash on delivery when your sofa arrives.
        </p>
      ),
    },
    {
      title: "Care guide",
      body: (
        <p>
          Plump and rotate cushions regularly to keep their shape. Vacuum fabric with a soft brush attachment and blot spills straight away with a clean, damp cloth. Wipe leather with a soft dry cloth and keep it out of direct sunlight.
        </p>
      ),
    },
  ];

  return (
    <div className="pb-24 lg:pb-0">
      <div className="container-site pb-6 pt-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            design ? { label: design.label, href: design.href } : { label: "Sofas", href: "/shop/all" },
            { label: product.name },
          ]}
        />
      </div>

      <section className="container-site">
        <ProductConfigurator product={product} badge={design?.collection ?? "Sofa Collection"} fromPrice={fromPrice}>
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
        </ProductConfigurator>
      </section>

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
            {recommendations.map((rec, i) => (
              <ProductCard key={rec.id} product={rec} index={i + 1} />
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
