// app/guides/page.tsx - UK Sofa Buying Guides & Advice Hub
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import { getAllGuides } from "@/lib/guides";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Sofa Buying Guides & Advice | The Sofa Hub UK",
  description:
    "Expert UK sofa buying advice: scatter back vs high back cushions, corner sofa room planning, doorway measurement checklists, and fabric care.",
  alternates: {
    canonical: `${SITE_URL}/guides`,
  },
  openGraph: {
    title: "Sofa Buying Guides & Advice | The Sofa Hub UK",
    description: "Expert advice on measuring, styling, and choosing the perfect sofa for your UK home.",
    url: `${SITE_URL}/guides`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <div className="container-site py-8 md:py-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Buying Guides" }]} />

      <div className="mt-8 max-w-3xl">
        <span className="eyebrow">Topical Advice & Expertise</span>
        <h1 className="mt-2 font-display text-4xl font-semibold text-charcoal md:text-5xl">
          UK Sofa Buying & Style Guides
        </h1>
        <p className="mt-4 font-body text-lg text-charcoal/70">
          Everything you need to know before ordering: how to measure your hallways, choose between scatter and high
          backs, and pick the ideal layout for your living space.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((g) => (
          <article
            key={g.slug}
            className="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-charcoal/10 transition-shadow hover:shadow-lift"
          >
            <div className="relative aspect-[16/10] w-full bg-sand">
              <Image
                src={g.featuredImage}
                alt={g.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-charcoal/80 px-3 py-1 font-body text-xs font-semibold text-linen backdrop-blur">
                {g.category}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-2 font-body text-xs text-charcoal/50">
                <span>{g.readingTime}</span>
                <span>•</span>
                <span>Updated Oct 2026</span>
              </div>

              <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-charcoal transition-colors group-hover:text-forest">
                <Link href={`/guides/${g.slug}`}>{g.title}</Link>
              </h2>

              <p className="mt-3 line-clamp-3 font-body text-sm leading-relaxed text-charcoal/70">
                {g.description}
              </p>

              <div className="mt-auto pt-6">
                <Link
                  href={`/guides/${g.slug}`}
                  className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-forest hover:underline"
                >
                  Read Guide <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
