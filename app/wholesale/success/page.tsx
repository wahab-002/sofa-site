import type { Metadata } from "next";
import WholesaleSuccessClient from "@/components/wholesale/WholesaleSuccessClient";

export const metadata: Metadata = {
  title: "Wholesale payment received | The Sofa Hub",
  robots: { index: false, follow: false },
};

export default function WholesaleSuccessPage({
  searchParams,
}: {
  searchParams: {
    payment_intent?: string;
    payment_intent_client_secret?: string;
    redirect_status?: string;
    session_id?: string;
  };
}) {
  return (
    <WholesaleSuccessClient
      paymentIntent={searchParams.payment_intent ?? searchParams.session_id}
      redirectStatus={searchParams.redirect_status}
    />
  );
}
