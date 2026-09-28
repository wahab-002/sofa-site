"use client";

import Link from "next/link";
import { useState, useRef } from "react";

const megaMenu = {
  design: [
    { slug: "corner-sofas",       label: "Corner Sofas",        desc: "L-shape & corner designs" },
    { slug: "chesterfield-sofas", label: "Chesterfield Sofas",  desc: "Classic tufted style" },
    { slug: "u-shape-sofas",      label: "U-Shape Sofas",       desc: "Maximum family seating" },
    { slug: "3-2-sofa-sets",      label: "3+2 Sofa Sets",       desc: "Matching sets, great value" },
    { slug: "3-2-1-full-sets",    label: "3+2+1 Full Sets",     desc: "Complete room package" },
    { slug: "modular-sofas",      label: "Modular Sofas",       desc: "Build your perfect layout" },
  ],
  size: [
    { slug: "2-seater", label: "2 Seater Sofas" },
    { slug: "3-seater", label: "3 Seater Sofas" },
    { slug: "4-seater", label: "4 Seater Sofas" },
    { slug: "5-seater", label: "5 Seater Sofas" },
    { slug: "6-seater", label: "6 Seater Sofas" },
  ],
  colour: [
    { slug: "grey-sofas",  label: "Grey Sofas",  hex: "#B0ADA8" },
    { slug: "cream-sofas", label: "Cream Sofas", hex: "#F5F0E8" },
    { slug: "navy-sofas",  label: "Navy Sofas",  hex: "#1E3A5F" },
    { slug: "black-sofas", label: "Black Sofas", hex: "#1A1A1A" },
    { slug: "brown-sofas", label: "Brown Sofas", hex: "#6B3A2A" },
  ],
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMega = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMegaOpen(true);
  };

  const closeMega = () => {
    timeoutRef.current = setTimeout(() => setMegaOpen(false), 150);
  };

  return (
    <header className="border-b border-charcoal/10 sticky top-0 bg-linen z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="font-display text-xl text-charcoal flex-shrink-0">
          The Sofa Hub
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center font-body text-sm gap-1 text-charcoal/80">

          {/* Sofas mega menu trigger */}
          <div
            className="relative"
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
          >
            <button className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${megaOpen ? "bg-charcoal/8 text-charcoal" : "hover:bg-charcoal/5"}`}>
              Sofas
              <svg className={`w-3.5 h-3.5 transition-transform ${megaOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Mega dropdown */}
            {megaOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] bg-white rounded-2xl shadow-2xl border border-charcoal/8 p-6 grid grid-cols-3 gap-6"
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
              >
                {/* By Design */}
                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-charcoal/40 mb-3">By Design</p>
                  <ul className="space-y-1">
                    {megaMenu.design.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/shop/${item.slug}`}
                          className="block px-2 py-2 rounded-lg hover:bg-forest/5 hover:text-forest transition-all"
                          onClick={() => setMegaOpen(false)}
                        >
                          <p className="font-medium text-charcoal text-sm">{item.label}</p>
                          <p className="text-charcoal/45 text-xs">{item.desc}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* By Size */}
                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-charcoal/40 mb-3">By Size</p>
                  <ul className="space-y-1">
                    {megaMenu.size.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/shop/size/${item.slug}`}
                          className="block px-2 py-2 rounded-lg hover:bg-forest/5 hover:text-forest transition-all font-body text-sm text-charcoal hover:text-forest font-medium"
                          onClick={() => setMegaOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-4 border-t border-charcoal/8">
                    <Link
                      href="/shop/all"
                      className="block px-2 py-2 rounded-lg bg-forest/8 hover:bg-forest/15 text-forest font-body text-sm font-semibold transition-all text-center"
                      onClick={() => setMegaOpen(false)}
                    >
                      View All Sofas →
                    </Link>
                  </div>
                </div>

                {/* By Colour */}
                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-charcoal/40 mb-3">By Colour</p>
                  <ul className="space-y-1">
                    {megaMenu.colour.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/shop/colour/${item.slug}`}
                          className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-forest/5 transition-all font-body text-sm text-charcoal hover:text-forest"
                          onClick={() => setMegaOpen(false)}
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-charcoal/15 flex-shrink-0"
                            style={{ backgroundColor: item.hex }}
                          />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <Link href="/shop/all" className="px-4 py-2 rounded-lg hover:bg-charcoal/5 transition-colors">All Sofas</Link>
          <Link href="/about" className="px-4 py-2 rounded-lg hover:bg-charcoal/5 transition-colors">About</Link>
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="font-body text-sm text-charcoal/70 hover:text-charcoal transition-colors"
          >
            Contact
          </Link>
          <a
            href="https://wa.me/447784123321"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-forest text-linen font-body text-sm px-4 py-2 rounded-xl hover:bg-charcoal transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-charcoal transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-charcoal transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-charcoal transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-charcoal/10 bg-linen px-6 py-5 space-y-4 font-body text-sm">
          <p className="text-xs uppercase tracking-widest text-charcoal/40">By Design</p>
          {megaMenu.design.map((item) => (
            <Link key={item.slug} href={`/shop/${item.slug}`} className="block text-charcoal hover:text-forest" onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <div className="border-t border-charcoal/10 pt-4">
            <p className="text-xs uppercase tracking-widest text-charcoal/40 mb-3">By Size</p>
            {megaMenu.size.map((item) => (
              <Link key={item.slug} href={`/shop/size/${item.slug}`} className="block text-charcoal hover:text-forest mb-2" onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-charcoal/10 pt-4 flex flex-col gap-3">
            <Link href="/shop/all" className="font-semibold text-forest" onClick={() => setMenuOpen(false)}>View All Sofas</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            <a href="https://wa.me/447784123321" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-forest text-linen px-4 py-2.5 rounded-xl text-center justify-center">
              Order on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
