import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-charcoal/10 mt-20 bg-charcoal text-linen">
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 font-body text-sm">

        {/* Brand */}
        <div>
          <p className="font-display text-xl mb-3">Your Sofa Co.</p>
          <p className="text-linen/60 leading-relaxed">
            Quality sofas delivered across the UK. Free delivery and cash on delivery on every order.
          </p>
        </div>

        {/* Categories */}
        <div>
          <p className="font-semibold text-linen/80 mb-3 uppercase tracking-wider text-xs">Sofas</p>
          <ul className="space-y-2 text-linen/60">
            <li><Link href="/category/corner-sofas" className="hover:text-linen transition-colors">Corner Sofas</Link></li>
            <li><Link href="/category/l-shape-sofas" className="hover:text-linen transition-colors">L-Shape Sofas</Link></li>
            <li><Link href="/category/3-seater" className="hover:text-linen transition-colors">3 Seater Sofas</Link></li>
            <li><Link href="/category/2-seater" className="hover:text-linen transition-colors">2 Seater Sofas</Link></li>
            <li><Link href="/category/recliner-sofas" className="hover:text-linen transition-colors">Recliner Sofas</Link></li>
            <li><Link href="/category/leather-sofas" className="hover:text-linen transition-colors">Leather Sofas</Link></li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <p className="font-semibold text-linen/80 mb-3 uppercase tracking-wider text-xs">Info</p>
          <ul className="space-y-2 text-linen/60">
            <li><Link href="/about" className="hover:text-linen transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-linen transition-colors">Contact</Link></li>
            <li>
              <a
                href="https://wa.me/447784123321"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-linen transition-colors"
              >
                WhatsApp: +44 7784 123321
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-4 border-t border-linen/10 text-linen/40 text-xs">
        <p>© {new Date().getFullYear()} Your Sofa Co. All rights reserved. Cash on delivery available across the UK.</p>
      </div>
    </footer>
  );
}
