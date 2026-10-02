import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProductBySlug, getRecommendations } from "@/lib/products";
import { ATALIAN_CONFIGS, ATALIAN_DEFAULT_CONFIG, atalianPhoto, getAtalianConfig } from "@/lib/atalian";
import AtalianConfigNav from "@/components/atalian/AtalianConfigNav";
import AtalianConfigurator from "@/components/atalian/AtalianConfigurator";
import Breadcrumb from "@/components/Breadcrumb";
import HowToOrder from "@/components/HowToOrder";
import Faq from "@/components/Faq";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/Icon";

export const dynamic = "force-dynamic";

type Props = { params: { config: string } };

export function generateStaticParams() {
  return ATALIAN_CONFIGS.map((c) => ({ config: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const config = getAtalianConfig(params.config) ?? getAtalianConfig(ATALIAN_DEFAULT_CONFIG)!;
  const product = await getProductBySlug("atalian-sofa");
  if (!product) return {};
  const title = `${product.name} ${config.label} | The Sofa Hub`;
  const description = `${config.label} Atalian Chesterfield in 8 colours. ${product.tagline} Free UK delivery and cash on delivery.`;
  const image = atalianPhoto(config.id, "cream");
  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: image, alt: `${product.name} ${config.label}` }] },
  };
}

export default async function AtalianConfigPage({ params }: Props) {
  const config = getAtalianConfig(params.config);
  if (!config) return notFound();

  const [product, recommendations] = await Promise.all([
    getProductBySlug("atalian-sofa"),
    getRecommendations("atalian-sofa", 4),
  ]);
  if (!product) return notFound();

  const prices = Object.fromEntries(product.variants.map((v) => [v.label, v.price_gbp]));

  return (
    <>
      <AtalianConfigNav active={config.id} prices={prices} />

      <div className="container-site py-8 md:py-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Chesterfield Sofas", href: "/shop/chesterfield-sofas" },
            { label: product.name, href: "/products/atalian-sofa" },
            { label: config.label },
          ]}
        />

        <div className="mt-6">
          <AtalianConfigurator product={product} config={config} />
        </div>

        <div className="mt-16">
          <HowToOrder />
        </div>

        {recommendations.length > 0 && (
          <section className="mt-16">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Keep browsing</p>
                <h2 className="mt-1 font-display text-3xl font-semibold text-charcoal">You may also like</h2>
              </div>
              <Link href="/shop/all" className="hidden items-center gap-1 font-body text-sm font-medium text-forest md:inline-flex">
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

        <div className="mt-16">
          <Faq />
        </div>
      </div>
    </>
  );
}
