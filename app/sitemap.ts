import { MetadataRoute } from "next";
import { getAllProductSlugs } from "@/lib/products";
import { ASHTON_CONFIGS } from "@/lib/ashton";
import { ATALIAN_CONFIGS } from "@/lib/atalian";
import { DINO_CONFIGS } from "@/lib/dino";
import { HARRISON_CONFIGS } from "@/lib/harrison";
import { LILY_CONFIGS } from "@/lib/lily";
import { OLYMPIA_CONFIGS } from "@/lib/olympia";
import { VERONA_CONFIGS, VERONA_STYLES } from "@/lib/verona";
import { colourCategories, designCategories, SITE_URL, sizeCategories } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllProductSlugs();
  const now = new Date();

  const productUrls = slugs.flatMap((slug) => {
    if (slug === "atalian-sofa") {
      return ATALIAN_CONFIGS.map((c) => ({
        url: `${SITE_URL}/products/atalian-sofa/${c.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.85,
      }));
    }
    if (slug === "verona-sofa") {
      return VERONA_STYLES.flatMap((s) =>
        VERONA_CONFIGS.map((c) => ({
          url: `${SITE_URL}/products/verona-sofa/${s.id}/${c.id}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.85,
        })),
      );
    }
    if (slug === "lily-sofa") {
      return LILY_CONFIGS.map((c) => ({
        url: `${SITE_URL}/products/lily-sofa/${c.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.85,
      }));
    }
    if (slug === "dino-sofa") {
      return DINO_CONFIGS.map((c) => ({
        url: `${SITE_URL}/products/dino-sofa/${c.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.85,
      }));
    }
    if (slug === "olympia-sofa") {
      return OLYMPIA_CONFIGS.map((c) => ({
        url: `${SITE_URL}/products/olympia-sofa/${c.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.85,
      }));
    }
    if (slug === "ashton-sofa") {
      return ASHTON_CONFIGS.map((c) => ({
        url: `${SITE_URL}/products/ashton-sofa/${c.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.85,
      }));
    }
    if (slug === "harrison-sofa") {
      return HARRISON_CONFIGS.map((c) => ({
        url: `${SITE_URL}/products/harrison-sofa/${c.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.85,
      }));
    }
    return [
      {
        url: `${SITE_URL}/products/${slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
    ];
  });

  const designUrls = designCategories.map((d) => ({
    url: `${SITE_URL}/shop/${d.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const sizeUrls = sizeCategories.map((s) => ({
    url: `${SITE_URL}/shop/size/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const colourUrls = colourCategories.map((c) => ({
    url: `${SITE_URL}/shop/colour/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/shop/all`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    ...designUrls,
    ...sizeUrls,
    ...colourUrls,
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/delivery`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/returns`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ...productUrls,
  ];
}
