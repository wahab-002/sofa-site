"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WHOLESALE_CART_KEY } from "@/lib/wholesaleCart";

export default function WholesaleSuccessClient({
  paymentIntent,
  redirectStatus,
}: {
  paymentIntent?: string;
  redirectStatus?: string;
}) {
  const [cleared, setCleared] = useState(false);
  const ok = !redirectStatus || redirectStatus === "succeeded";

  useEffect(() => {
    try {
      sessionStorage.removeItem(WHOLESALE_CART_KEY);
    } catch {
      /* ignore */
    }
    setCleared(true);
  }, []);

  return (
    <div className="container-site py-16 md:py-24">
      <div className="mx-auto max-w-lg rounded-2xl border border-stone/25 bg-white p-8 text-center">
        {ok ? (
          <>
            <h1 className="font-display text-2xl font-bold text-charcoal">Payment received</h1>
            <p className="mt-3 text-charcoal/65">
              Thank you. Your wholesale card payment went through. We will confirm fulfilment by
              email.
            </p>
          </>
        ) : (
          <>
            <h1 className="font-display text-2xl font-bold text-charcoal">Payment incomplete</h1>
            <p className="mt-3 text-charcoal/65">
              The payment did not complete. You can return to checkout and try again — no charge was
              taken if the status is not succeeded.
            </p>
          </>
        )}
        {paymentIntent && (
          <p className="mt-2 break-all text-xs text-charcoal/40">Ref: {paymentIntent}</p>
        )}
        {cleared && ok && (
          <p className="mt-2 text-xs text-charcoal/40">Cart cleared for the next order.</p>
        )}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {ok ? (
            <Link href="/wholesale" className="btn btn-primary inline-flex">
              Place another wholesale order
            </Link>
          ) : (
            <>
              <Link href="/wholesale/checkout" className="btn btn-primary inline-flex">
                Back to checkout
              </Link>
              <Link href="/wholesale" className="text-sm font-medium text-forest underline-offset-2 hover:underline">
                Edit order
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
