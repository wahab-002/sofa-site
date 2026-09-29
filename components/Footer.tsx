import Link from "next/link";
import Logo from "./Logo";
import Icon, { WhatsAppIcon } from "./Icon";
import { WHATSAPP_DISPLAY, colourCategories, designCategories, sizeCategories, trustPoints, whatsappLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-24 bg-charcoal font-body text-linen">
      {/* Trust strip */}
      <div className="border-b border-linen/10">
        <div className="container-site grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {trustPoints.map((t) => (
            <div key={t.title} className="flex items-center gap-3">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-linen/5 text-gold">
                <Icon name={t.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{t.title}</p>
                <p className="text-xs text-linen/50">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-site grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo light stacked />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-linen/60">
            Quality sofas at honest prices, delivered free across the UK. Order on WhatsApp and pay cash when it arrives.
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-linen/5 px-4 py-3 transition-colors hover:bg-linen/10"
          >
            <WhatsAppIcon className="h-6 w-6 text-whatsapp" />
            <span>
              <span className="block text-xs text-linen/50">Order or ask a question</span>
              <span className="block text-sm font-semibold">{WHATSAPP_DISPLAY}</span>
            </span>
          </a>
        </div>

        <FooterColumn title="Shop by design" className="md:col-span-3">
          {designCategories.map((d) => (
            <FooterLink key={d.slug} href={`/shop/${d.slug}`}>{d.label}</FooterLink>
          ))}
          <FooterLink href="/shop/all">All Sofas</FooterLink>
        </FooterColumn>

        <FooterColumn title="Shop by size" className="md:col-span-2">
          {sizeCategories.map((s) => (
            <FooterLink key={s.slug} href={`/shop/size/${s.slug}`}>{s.label} Sofas</FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Help" className="md:col-span-3">
          <FooterLink href="/about">About Us</FooterLink>
          <FooterLink href="/contact">Contact Us</FooterLink>
          <li className="pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-linen/40">Colours</p>
            <div className="flex gap-2">
              {colourCategories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/shop/colour/${c.slug}`}
                  title={`${c.label} sofas`}
                  className="h-7 w-7 rounded-full ring-1 ring-linen/20 transition-transform hover:scale-110"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </li>
        </FooterColumn>
      </div>

      <div className="border-t border-linen/10">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-linen/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} The Sofa Hub. All rights reserved.</p>
          <p>Free UK delivery · Cash on delivery · No deposit needed</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, className = "", children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-linen/40">{title}</p>
      <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-linen/70 transition-colors hover:text-linen">
        {children}
      </Link>
    </li>
  );
}
