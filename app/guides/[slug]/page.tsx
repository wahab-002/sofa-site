// app/guides/[slug]/page.tsx - Individual Article & Buying Guide Page with Schema
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import WhatsAppButton from "@/components/WhatsAppButton";
import Icon from "@/components/Icon";
import { getAllGuides, getGuideBySlug } from "@/lib/guides";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return {};

  return {
    title: guide.metaTitle,
    description: guide.description,
    alternates: {
      canonical: `${SITE_URL}/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `${SITE_URL}/guides/${guide.slug}`,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: guide.publishedAt,
    },
  };
}

export default function GuideDetailPage({ params }: Props) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  // Structured Data Schema for Article & FAQ
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        datePublished: guide.publishedAt,
        dateModified: guide.publishedAt,
        author: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/brand/logo-horizontal-dark.png`,
          },
        },
        mainEntityOfPage: `${SITE_URL}/guides/${guide.slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <article className="container-site py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Buying Guides", href: "/guides" },
          { label: guide.title },
        ]}
      />

      <header className="mx-auto mt-8 max-w-3xl text-center">
        <span className="eyebrow">{guide.category}</span>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-charcoal sm:text-4xl md:text-5xl">
          {guide.title}
        </h1>
        <div className="mt-4 flex items-center justify-center gap-3 font-body text-sm text-charcoal/60">
          <span>{guide.readingTime}</span>
          <span>•</span>
          <span>By {SITE_NAME} Specialists</span>
        </div>
      </header>

      <div className="relative mx-auto mt-10 aspect-[16/9] max-w-4xl overflow-hidden rounded-3xl bg-sand ring-1 ring-charcoal/10">
        <Image
          src={guide.featuredImage}
          alt={guide.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 896px"
          className="object-cover"
        />
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-12 lg:grid-cols-[1fr_320px]">
        {/* Main Content */}
        <div className="min-w-0 space-y-10 font-body text-charcoal/80">
          {guide.sections.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-charcoal">
                {sec.heading}
              </h2>
              {sec.content.map((p, pIdx) => (
                <p key={pIdx} className="leading-relaxed text-charcoal/75">
                  {p}
                </p>
              ))}
            </section>
          ))}

          {/* FAQs Section */}
          {guide.faqs.length > 0 && (
            <section className="border-t border-charcoal/10 pt-10">
              <h2 className="font-display text-2xl font-semibold text-charcoal">
                Frequently Asked Questions
              </h2>
              <div className="mt-6 space-y-4">
                {guide.faqs.map((faq, i) => (
                  <div key={i} className="rounded-2xl bg-white p-5 ring-1 ring-charcoal/10">
                    <h3 className="font-display text-base font-semibold text-charcoal">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar: Recommended Sofas & WhatsApp Help */}
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl bg-white p-6 ring-1 ring-charcoal/10">
            <p className="eyebrow">Featured Models</p>
            <h3 className="mt-1 font-display text-lg font-semibold text-charcoal">
              Related Sofas
            </h3>
            <div className="mt-4 space-y-4">
              {guide.relatedProducts.map((p) => (
                <div key={p.href} className="rounded-2xl bg-sand/60 p-4">
                  <Link
                    href={p.href}
                    className="font-display text-sm font-semibold text-charcoal hover:text-forest"
                  >
                    {p.name} →
                  </Link>
                  <p className="mt-1 text-xs text-charcoal/60">{p.reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-forest/5 p-6 ring-1 ring-forest/20">
            <span className="eyebrow text-forest">Need Help Choosing?</span>
            <h3 className="mt-1 font-display text-lg font-semibold text-charcoal">
              Ask Our Experts
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-charcoal/65">
              Send us a photo of your living room on WhatsApp and our team will recommend the perfect size and back style.
            </p>
            <div className="mt-5">
              <WhatsAppButton
                message={`Hi The Sofa Hub, I was reading your guide on "${guide.title}" and would like advice on finding the right sofa for my living room.`}
                label="Chat with a Specialist"
              />
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
