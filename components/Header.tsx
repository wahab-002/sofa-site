"use client";

import Link from "next/link";
import { useState } from "react";

const categories = [
  { label: "Corner Sofas", href: "/category/corner-sofas" },
  { label: "L-Shape Sofas", href: "/category/l-shape-sofas" },
  { label: "3 Seater", href: "/category/3-seater" },
  { label: "2 Seater", href: "/category/2-seater" },
  { label: "Recliner Sofas", href: "/category/recliner-sofas" },
  { label: "Leather Sofas", href: "/category/leather-sofas" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-charcoal/10 sticky top-0 bg-linen z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="font-display text-xl text-charcoal">
          Your Sofa Co.
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex font-body text-sm gap-6 text-charcoal/80">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="hover:text-forest transition-colors"
            >
              {cat.label}
            </Link>
          ))}
          <Link href="/about" className="hover:text-forest transition-colors">About</Link>
          <Link
            href="/contact"
            className="bg-forest text-linen px-4 py-1.5 rounded-md hover:bg-charcoal transition-colors"
          >
            Order on WhatsApp
          </Link>
        </nav>

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
        <div className="md:hidden border-t border-charcoal/10 bg-linen px-6 py-4 flex flex-col gap-4 font-body text-sm text-charcoal/80">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="hover:text-forest transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {cat.label}
            </Link>
          ))}
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link
            href="/contact"
            className="inline-block bg-forest text-linen px-4 py-2 rounded-md text-center hover:bg-charcoal transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Order on WhatsApp
          </Link>
        </div>
      )}
    </header>
  );
}
