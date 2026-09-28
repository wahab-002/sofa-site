import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-charcoal/10">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-5">
        <Link href="/" className="font-display text-2xl text-charcoal">
          Your Sofa Co.
        </Link>
        <nav className="font-body text-sm flex gap-6 text-charcoal/80">
          <Link href="/category/corner-sofas">Corner Sofas</Link>
          <Link href="/category/3-seater">3 Seater</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
