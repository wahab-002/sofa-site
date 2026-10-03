import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { whatsappLink } from "@/lib/site";

type Section = { heading: string; body: ReactNode };

export function policyMetadata(title: string, description: string): Metadata {
  return {
    title: `${title} | The Sofa Hub`,
    description,
  };
}

export default function PolicyLayout({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Section[];
}) {
  return (
    <article className="container-site max-w-3xl pb-20 pt-10 md:pt-16">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-charcoal md:text-5xl">
        {title}
      </h1>
      <p className="mt-5 font-body text-lg leading-relaxed text-charcoal/65">{intro}</p>

      <div className="mt-12 space-y-10">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-2xl font-semibold text-charcoal">{s.heading}</h2>
            <div className="mt-3 space-y-3 font-body text-[15px] leading-relaxed text-charcoal/70">
              {s.body}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-14 border-t border-charcoal/10 pt-8 font-body text-sm text-charcoal/55">
        Questions?{" "}
        <a
          href={whatsappLink("Hi, I have a question about your policies.")}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-forest hover:underline"
        >
          Message us on WhatsApp
        </a>{" "}
        or visit our{" "}
        <Link href="/contact" className="font-medium text-forest hover:underline">
          contact page
        </Link>
        .
      </p>
    </article>
  );
}
