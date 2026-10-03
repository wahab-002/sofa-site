import type { ProductWithDetails } from "@/lib/types";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Props = {
  product: ProductWithDetails;
  /** Canonical product URL path, e.g. /products/atalian-sofa/full-set */
  path: string;
  image?: string | null;
  fromPrice: number;
};

export default function ProductJsonLd({ product, path, image, fromPrice }: Props) {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const img = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : undefined;

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.slug,
    brand: { "@type": "Brand", name: SITE_NAME },
    ...(img && { image: [img] }),
    offers: {
      "@type": "AggregateOffer",
      url,
      priceCurrency: "GBP",
      lowPrice: fromPrice,
      highPrice: product.variants.length
        ? Math.max(...product.variants.map((v) => v.price_gbp))
        : fromPrice,
      offerCount: Math.max(product.variants.length, 1),
      availability: product.in_stock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: SITE_NAME },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
