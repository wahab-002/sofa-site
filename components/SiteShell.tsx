"use client";

import { usePathname } from "next/navigation";
import Header, { type SofaNavLink } from "./Header";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import Logo from "./Logo";

export default function SiteShell({
  sofas,
  children,
}: {
  sofas: SofaNavLink[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isWholesale = pathname.startsWith("/wholesale");

  if (isWholesale) {
    return (
      <>
        <header className="border-b border-stone/30 bg-linen">
          <div className="container-site flex h-14 items-center md:h-16">
            <Logo linked={false} />
            <p className="ml-3 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/45">
              Wholesale trade
            </p>
          </div>
        </header>
        <main className="min-h-[60vh]">{children}</main>
        <footer className="border-t border-stone/30 bg-linen py-6">
          <p className="container-site text-center text-xs text-charcoal/50">
            © 2026 The Sofa Hub (@thesofahub). All rights reserved.
          </p>
        </footer>
      </>
    );
  }

  return (
    <>
      <Header sofas={sofas} />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
