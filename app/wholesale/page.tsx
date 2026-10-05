import type { Metadata } from "next";
import WholesaleOrderForm from "@/components/wholesale/WholesaleOrderForm";

export const metadata: Metadata = {
  title: "Wholesale trade order | The Sofa Hub",
  description: "Trade wholesale sofa ordering — card payment only.",
  robots: { index: false, follow: false, nocache: true },
};

export default function WholesalePage() {
  return (
    <div className="bg-linen">
      <div className="container-site py-10 md:py-14">
        <header className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest/70">
            Trade only · unlisted
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-charcoal md:text-4xl">
            Wholesale sofa order
          </h1>
          <p className="mt-3 text-charcoal/65">
            For registered shopkeepers. Choose Dino, Atalian Chesterfield, or Verona — colour,
            sizes and quantities. Live total. Pay by card at checkout.
          </p>
          <ul className="mt-4 grid gap-1 text-sm text-charcoal/55 sm:grid-cols-2">
            <li>Armchair £100</li>
            <li>2 Seater £150</li>
            <li>3 Seater £250</li>
            <li>3+2 Set £400</li>
            <li>Corner £400</li>
            <li>Gold Legs (Atalian) £50</li>
          </ul>
        </header>

        <WholesaleOrderForm />
      </div>
    </div>
  );
}
