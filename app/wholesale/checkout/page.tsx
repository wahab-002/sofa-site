import type { Metadata } from "next";
import WholesaleCheckoutClient from "@/components/wholesale/WholesaleCheckoutClient";

export const metadata: Metadata = {
  title: "Wholesale checkout | The Sofa Hub",
  description: "Secure wholesale card checkout.",
  robots: { index: false, follow: false, nocache: true },
};

export default function WholesaleCheckoutPage() {
  return <WholesaleCheckoutClient />;
}
