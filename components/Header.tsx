"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon, { WhatsAppIcon } from "./Icon";
import Logo from "./Logo";
import { colourCategories, designCategories, sizeCategories, trustPoints, whatsappLink } from "@/lib/site";

export type SofaNavLink = { name: string; href: string };

const quickLinks = [
  { href: "/shop/corner-sofas", label: "Corner Sofas" },
  { href: "/shop/3-2-sofa-sets", label: "3+2 Sets" },
  { href: "/shop/chesterfield-sofas", label: "Chesterfields" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
];

export default function Header({ sofas = [] }: { sofas?: SofaNavLink[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const openMega = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    timeoutRef.current = setTimeout(() => setMegaOpen(false), 150);
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-charcoal text-linen">
        <div className="container-site flex h-9 items-center justify-center gap-8 font-body text-xs md:justify-between">
          <div className="hidden items-center gap-8 md:flex">
            {trustPoints.slice(0, 3).map((t) => (
              <span key={t.title} className="flex items-center gap-2 text-linen/80">
                <Icon name={t.icon} className="h-4 w-4 text-gold" />
                {t.title}
              </span>
            ))}
          </div>
          <p className="md:hidden">
            <span className="text-gold">Free UK delivery</span> · Cash on delivery
          </p>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-1.5 text-linen/80 hover:text-linen md:flex">
            <WhatsAppIcon className="h-3.5 w-3.5 text-whatsapp" />
            Questions? Message us
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b bg-linen/90 backdrop-blur-md transition-shadow ${
          scrolled ? "border-charcoal/10 shadow-soft" : "border-transparent"
        }`}
      >
        <div className="container-site flex h-16 items-center justify-between gap-6 md:h-20">
          <Logo priority />

          <nav className="hidden flex-1 items-center justify-center gap-0 whitespace-nowrap font-body text-[15px] text-charcoal/80 lg:flex xl:gap-1">
            <div onMouseEnter={openMega} onMouseLeave={closeMega}>
              <button
                onClick={() => setMegaOpen((v) => !v)}
                aria-expanded={megaOpen}
                className={`flex items-center gap-1 rounded-full px-3 py-2 transition-colors xl:px-4 ${
                  megaOpen ? "bg-charcoal/[0.06] text-charcoal" : "hover:text-charcoal"
                }`}
              >
                Shop Sofas
                <Icon name="chevron" className={`h-4 w-4 transition-transform ${megaOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
            {quickLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3 py-2 transition-colors hover:text-charcoal xl:px-4 ${
                  pathname === l.href ? "text-charcoal" : ""
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/contact" className="hidden px-3 font-body text-sm text-charcoal/70 hover:text-charcoal md:block lg:hidden xl:block">
              Contact
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary hidden px-5 py-2.5 text-sm sm:inline-flex">
              <WhatsAppIcon className="h-4 w-4" />
              Order on WhatsApp
            </a>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-charcoal/5 lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Icon name="menu" className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mega menu */}
        {megaOpen && (
          <div
            className="absolute inset-x-0 top-full hidden animate-fade-in border-t border-charcoal/5 bg-white shadow-lift lg:block"
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
          >
            <div className="container-site grid grid-cols-12 gap-8 py-8">
              <div className="col-span-4">
                <p className="eyebrow mb-4">Shop by design</p>
                <div className="grid grid-cols-1 gap-1.5 xl:grid-cols-2 xl:gap-2">
                  {designCategories.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/shop/${d.slug}`}
                      className="group flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-sand"
                    >
                      <span className="relative flex h-12 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-sand xl:h-14 xl:w-20">
                        <Image src={d.image} alt="" fill sizes="80px" className="object-cover" />
                      </span>
                      <span>
                        <span className="block font-body text-sm font-semibold text-charcoal">{d.label}</span>
                        <span className="block font-body text-xs text-charcoal/50">{d.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="col-span-2">
                <p className="eyebrow mb-4">By size</p>
                <ul className="space-y-1">
                  {sizeCategories.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/shop/size/${s.slug}`} className="block rounded-lg py-1.5 font-body text-sm text-charcoal/80 hover:text-forest">
                        {s.linkLabel}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2">
                <p className="eyebrow mb-4">By colour</p>
                <ul className="space-y-1">
                  {colourCategories.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/shop/colour/${c.slug}`} className="flex items-center gap-2.5 py-1.5 font-body text-sm text-charcoal/80 hover:text-forest">
                        <span className="h-4 w-4 rounded-full ring-1 ring-charcoal/15" style={{ backgroundColor: c.hex }} />
                        {c.label} Sofas
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-4">
                <p className="eyebrow mb-4">All sofas A–Z</p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                  {sofas.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        className="block rounded-lg py-1.5 font-body text-sm text-charcoal/80 transition-colors hover:text-forest"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-charcoal/5 bg-sand/60">
              <div className="container-site flex items-center justify-between py-3 font-body text-sm">
                <span className="text-charcoal/60">
                  {sofas.length} sofa{sofas.length === 1 ? "" : "s"} · {colourCategories.length} colours
                </span>
                <Link href="/shop/all" className="inline-flex items-center gap-1.5 font-medium text-forest hover:underline">
                  View all sofas <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 animate-fade-in bg-charcoal/40" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm animate-fade-in flex-col bg-linen shadow-lift">
            <div className="flex h-16 items-center justify-between border-b border-charcoal/10 px-5">
              <Logo />
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-charcoal/5"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <Icon name="close" className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6 font-body">
              <p className="eyebrow mb-3">Shop by design</p>
              <div className="grid grid-cols-2 gap-2">
                {designCategories.map((d) => (
                  <Link key={d.slug} href={`/shop/${d.slug}`} className="rounded-2xl bg-white p-3 ring-1 ring-charcoal/5">
                    <span className="relative flex h-16 overflow-hidden rounded-xl">
                      <Image src={d.image} alt="" fill sizes="160px" className="object-cover" />
                      <span className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                      <span className="absolute bottom-1.5 left-2 z-10 text-xs font-semibold text-linen">{d.label}</span>
                    </span>
                  </Link>
                ))}
              </div>

              <p className="eyebrow mb-3 mt-8">By size</p>
              <div className="flex flex-wrap gap-2">
                {sizeCategories.map((s) => (
                  <Link key={s.slug} href={`/shop/size/${s.slug}`} className="rounded-full border border-charcoal/15 bg-white px-4 py-2 text-sm">
                    {s.label}
                  </Link>
                ))}
              </div>

              <p className="eyebrow mb-3 mt-8">By colour</p>
              <div className="flex flex-wrap gap-2">
                {colourCategories.map((c) => (
                  <Link key={c.slug} href={`/shop/colour/${c.slug}`} className="flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-3 py-2 text-sm">
                    <span className="h-4 w-4 rounded-full ring-1 ring-charcoal/15" style={{ backgroundColor: c.hex }} />
                    {c.label}
                  </Link>
                ))}
              </div>

              {sofas.length > 0 && (
                <>
                  <p className="eyebrow mb-3 mt-8">All sofas A–Z</p>
                  <ul className="divide-y divide-charcoal/10 rounded-2xl bg-white ring-1 ring-charcoal/5">
                    {sofas.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} className="flex items-center justify-between px-4 py-3 text-sm text-charcoal hover:text-forest">
                          {s.name}
                          <Icon name="arrow" className="h-3.5 w-3.5 text-charcoal/35" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="mt-8 divide-y divide-charcoal/10 border-y border-charcoal/10 text-base">
                {[
                  { href: "/shop/all", label: "All Sofas" },
                  { href: "/guides", label: "Buying Guides" },
                  { href: "/about", label: "About Us" },
                  { href: "/contact", label: "Contact" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="flex items-center justify-between py-4 text-charcoal">
                    {l.label}
                    <Icon name="arrow" className="h-4 w-4 text-charcoal/40" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-charcoal/10 p-5">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg w-full">
                <WhatsAppIcon className="h-5 w-5" />
                Order on WhatsApp
              </a>
              <p className="mt-3 text-center font-body text-xs text-charcoal/50">Free UK delivery · Cash on delivery</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
