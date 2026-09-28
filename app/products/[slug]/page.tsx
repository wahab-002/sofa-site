import { getProductBySlug, sampleProducts } from "@/lib/products";
import WhatsAppButton from "@/components/WhatsAppButton";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return sampleProducts.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="aspect-[4/3] bg-charcoal/5 rounded-lg" />
      <div>
        <h1 className="font-display text-3xl text-charcoal">{product.name}</h1>
        <p className="font-body text-charcoal/60 mt-2">£{product.price_gbp}</p>
        <p className="font-body text-charcoal/80 mt-6 leading-relaxed">{product.description}</p>
        <div className="mt-8">
          <WhatsAppButton productName={product.name} phoneNumber="447784123321" />
        </div>
      </div>
    </div>
  );
}
