import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/wholesale", "/wholesale/", "/api/wholesale/"],
    },
    sitemap: "https://www.thesofahub.co.uk/sitemap.xml",
  };
}
