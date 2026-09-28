import { MetadataRoute } from "next";
import { getAllProductSlugs } from "@/lib/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllProductSlugs();
  const base = "https://thesofahub.co.uk";

  const productUrls = slugs.map((slug) => ({
    url: `${base}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/shop/all`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/shop/corner-sofas`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/shop/chesterfield-sofas`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/shop/u-shape-sofas`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/shop/3-2-sofa-sets`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/shop/modular-sofas`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...productUrls,
  ];
}
