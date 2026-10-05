import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wholesale checkout cancelled | The Sofa Hub",
  robots: { index: false, follow: false },
};

export default function WholesaleCancelPage() {
  return (
    <div className="container-site py-16 md:py-24">
      <div className="mx-auto max-w-lg rounded-2xl border border-stone/25 bg-white p-8 text-center">
        <h1 className="font-display text-2xl font-bold text-charcoal">Checkout cancelled</h1>
        <p className="mt-3 text-charcoal/65">
          No charge was made. You can return to the wholesale form and try card payment again.
        </p>
        <Link href="/wholesale" className="btn btn-primary mt-8 inline-flex">
          Back to wholesale order
        </Link>
      </div>
    </div>
  );
}
