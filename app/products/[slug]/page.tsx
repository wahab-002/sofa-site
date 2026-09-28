import { getProductBySlug, getRecommendations, getAllProductSlugs } from "@/lib/products";
import ProductConfigurator from "@/components/ProductConfigurator";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} | The Sofa Hub — UK Sofas with Free Delivery`,
    description: `${product.tagline} ${product.description.slice(0, 120)}... From £${product.base_price}. Free UK delivery & cash on delivery.`,
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

  const primaryImage = product.images.find((i) => i.is_primary) ?? product.images[0];
  const otherImages = product.images.filter((i) => i.id !== primaryImage?.id).slice(0, 3);

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="font-body text-sm text-charcoal/50 mb-8 flex gap-2">
        <a href="/" className="hover:text-charcoal transition-colors">Home</a>
        <span>/</span>
        <a href="/shop/all" className="hover:text-charcoal transition-colors">Sofas</a>
        <span>/</span>
        <span className="text-charcoal">{product.name}</span>
      </nav>

      {/* Main product layout */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">

        {/* Left: Images */}
        <div className="space-y-3">
          {/* Primary image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5F3EF]">
            {primaryImage ? (
              <Image
                src={primaryImage.image_url}
                alt={primaryImage.alt_text ?? product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-body text-sm text-charcoal/30">Photos coming soon</p>
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {otherImages.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {otherImages.map((img) => (
                <div key={img.id} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F5F3EF]">
                  <Image
                    src={img.image_url}
                    alt={img.alt_text ?? product.name}
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details + Configurator */}
        <div>
          {/* Badge */}
          <span className="inline-block font-body text-xs uppercase tracking-widest text-forest bg-forest/10 px-3 py-1 rounded-full mb-4">
            {product.design_type === "chesterfield" ? "Chesterfield" :
             product.design_type === "u-shape" ? "U-Shape" :
             product.design_type === "modular" ? "Modular" :
             "Sofa Collection"}
          </span>

          <h1 className="font-display text-3xl md:text-4xl text-charcoal leading-tight mb-2">
            {product.name}
          </h1>

          <p className="font-body text-charcoal/60 text-lg mb-6 leading-relaxed">
            {product.tagline}
          </p>

          <p className="font-display text-2xl text-charcoal mb-8">
            from £{product.base_price.toLocaleString()}
          </p>

          {/* Configurator */}
          <ProductConfigurator
            productName={product.name}
            variants={product.variants}
            colours={product.colours}
            fabrics={product.fabrics}
            extras={product.extras}
            basePrice={product.base_price}
          />

          {/* Description */}
          <div className="mt-8 pt-8 border-t border-charcoal/10">
            <h2 className="font-display text-lg text-charcoal mb-3">About this sofa</h2>
            <p className="font-body text-charcoal/70 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="border-t border-charcoal/10 pt-12">
          <h2 className="font-display text-2xl text-charcoal mb-8">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recommendations.map((rec) => (
              <ProductCard key={rec.id} product={rec} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
