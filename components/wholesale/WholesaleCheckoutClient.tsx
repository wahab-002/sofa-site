"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import CardBrandBadges from "./CardBrandBadges";
import { formatGbp, getWholesaleProduct, getWholesaleSize } from "@/lib/wholesale";
import {
  WHOLESALE_CART_KEY,
  type ValidatedWholesaleCart,
  type WholesaleCartLine,
} from "@/lib/wholesaleCart";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

function PaymentForm({
  totalGbp,
  onError,
}: {
  totalGbp: number;
  onError: (msg: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    onError("");
    if (!stripe || !elements) return;

    setBusy(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/wholesale/success`,
      },
    });

    if (error) {
      onError(error.message || "Payment could not be completed.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <PaymentElement
        options={{
          layout: "tabs",
          paymentMethodOrder: ["card"],
          fields: {
            billingDetails: {
              name: "auto",
              email: "auto",
              phone: "auto",
              address: "auto",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !elements || busy}
        className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
      >
        {busy ? "Processing payment…" : `Pay ${formatGbp(totalGbp)} securely`}
      </button>
      <p className="text-center text-xs text-charcoal/50">
        Encrypted card payment powered by Stripe. Your card details never touch our servers.
      </p>
    </form>
  );
}

export default function WholesaleCheckoutClient() {
  const router = useRouter();
  const [lines, setLines] = useState<WholesaleCartLine[] | null>(null);
  const [summary, setSummary] = useState<ValidatedWholesaleCart | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"details" | "payment">("details");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(WHOLESALE_CART_KEY);
      if (!raw) {
        setLines([]);
        return;
      }
      const parsed = JSON.parse(raw) as WholesaleCartLine[];
      setLines(Array.isArray(parsed) ? parsed : []);
    } catch {
      setLines([]);
    }
  }, []);

  const previewTotal = useMemo(() => {
    if (!lines?.length) return 0;
    return lines.reduce((sum, line) => {
      const size = getWholesaleSize(line.sizeId);
      return sum + (size?.priceGbp ?? 0) * line.quantity;
    }, 0);
  }, [lines]);

  async function startPayment(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!lines?.length) {
      setError("Your cart is empty. Return to the wholesale form to add items.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/wholesale/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines, email, businessName, phone }),
      });
      const data = (await res.json()) as {
        clientSecret?: string;
        summary?: ValidatedWholesaleCart;
        error?: string;
      };
      if (!res.ok || !data.clientSecret || !data.summary) {
        setError(data.error || "Could not start checkout.");
        setBusy(false);
        return;
      }
      setSummary(data.summary);
      setClientSecret(data.clientSecret);
      setStep("payment");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (lines === null) {
    return (
      <div className="container-site py-16 text-center text-sm text-charcoal/55">Loading checkout…</div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container-site py-16">
        <div className="mx-auto max-w-md rounded-2xl border border-stone/25 bg-white p-8 text-center">
          <h1 className="font-display text-2xl font-bold text-charcoal">Cart empty</h1>
          <p className="mt-3 text-charcoal/65">Add wholesale items before checking out.</p>
          <Link href="/wholesale" className="btn btn-primary mt-6 inline-flex">
            Back to wholesale order
          </Link>
        </div>
      </div>
    );
  }

  const elementsOptions: StripeElementsOptions | undefined = clientSecret
    ? {
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#2F3E33",
            colorBackground: "#ffffff",
            colorText: "#1C1B1A",
            colorDanger: "#b42318",
            borderRadius: "10px",
            fontFamily: "Inter, system-ui, sans-serif",
          },
        },
      }
    : undefined;

  return (
    <div className="bg-linen">
      <div className="container-site py-10 md:py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest/70">
              Secure checkout
            </p>
            <h1 className="mt-1 font-display text-3xl font-bold text-charcoal">Card payment</h1>
            <p className="mt-2 text-sm text-charcoal/60">
              Step {step === "details" ? "1" : "2"} of 2 —{" "}
              {step === "details" ? "Your details" : "Pay by card"}
            </p>
          </div>
          <button
            type="button"
            className="text-sm font-medium text-forest underline-offset-2 hover:underline"
            onClick={() => router.push("/wholesale")}
          >
            ← Edit order
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-stone/25 bg-white p-5 md:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-lg font-semibold text-charcoal">Payment methods</h2>
                <CardBrandBadges />
              </div>
              <p className="mb-5 text-sm text-charcoal/55">
                We accept major debit and credit cards. Enter your details, then pay securely.
              </p>

              {step === "details" ? (
                <form onSubmit={startPayment} className="space-y-4">
                  <label className="block text-sm">
                    <span className="mb-1 block font-medium text-charcoal">Business / shop name</span>
                    <input
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full rounded-xl border border-stone/40 bg-linen/40 px-3 py-2.5 outline-none ring-forest/30 focus:ring-2"
                      placeholder="e.g. North Street Furnishings"
                      autoComplete="organization"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1 block font-medium text-charcoal">Email for receipt</span>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-stone/40 bg-linen/40 px-3 py-2.5 outline-none ring-forest/30 focus:ring-2"
                      placeholder="you@shop.co.uk"
                      autoComplete="email"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1 block font-medium text-charcoal">Phone (optional)</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-stone/40 bg-linen/40 px-3 py-2.5 outline-none ring-forest/30 focus:ring-2"
                      placeholder="07…"
                      autoComplete="tel"
                    />
                  </label>

                  {error && (
                    <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
                      {error}
                    </p>
                  )}

                  {!publishableKey && (
                    <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">
                      Add <code className="font-mono text-xs">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code>{" "}
                      and <code className="font-mono text-xs">STRIPE_SECRET_KEY</code> to{" "}
                      <code className="font-mono text-xs">.env.local</code> to enable live card fields.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={busy || !publishableKey}
                    className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {busy ? "Preparing secure payment…" : "Continue to card details"}
                  </button>
                </form>
              ) : clientSecret && stripePromise && elementsOptions ? (
                <div className="space-y-4">
                  <button
                    type="button"
                    className="text-sm text-forest underline-offset-2 hover:underline"
                    onClick={() => {
                      setStep("details");
                      setClientSecret(null);
                      setError(null);
                    }}
                  >
                    ← Edit business details
                  </button>
                  {error && (
                    <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
                      {error}
                    </p>
                  )}
                  <Elements stripe={stripePromise} options={elementsOptions}>
                    <PaymentForm
                      totalGbp={summary?.totalGbp ?? previewTotal}
                      onError={(msg) => setError(msg || null)}
                    />
                  </Elements>
                </div>
              ) : null}
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-stone/25 bg-white p-5 shadow-sm">
              <h2 className="font-display text-lg font-semibold text-charcoal">Order summary</h2>
              <ul className="mt-4 max-h-80 space-y-3 overflow-y-auto text-sm">
                {(summary?.lines ?? lines).map((line, i) => {
                  const isSummary = "productName" in line;
                  if (isSummary) {
                    return (
                      <li
                        key={`${line.productId}-${line.sizeId}-${line.colourFile}-${i}`}
                        className="flex justify-between gap-3 border-b border-stone/15 pb-2"
                      >
                        <span className="text-charcoal/80">
                          {line.productName} · {line.colourName}
                          {line.styleLabel ? ` · ${line.styleLabel}` : ""}
                          <br />
                          <span className="text-charcoal/55">
                            {line.sizeLabel} × {line.quantity}
                          </span>
                        </span>
                        <span className="font-semibold tabular-nums">
                          {formatGbp(line.lineTotalGbp)}
                        </span>
                      </li>
                    );
                  }
                  const size = getWholesaleSize(line.sizeId);
                  const product = getWholesaleProduct(line.productId);
                  const colourName =
                    product?.colours.find((c) => c.file === line.colourFile)?.name ?? line.colourFile;
                  const styleLabel =
                    line.styleId === "high-back"
                      ? "High Back"
                      : line.styleId === "scatter-back"
                        ? "Scatter Back"
                        : undefined;
                  return (
                    <li
                      key={`${line.productId}-${line.sizeId}-${line.colourFile}-${i}`}
                      className="flex justify-between gap-3 border-b border-stone/15 pb-2"
                    >
                      <span className="text-charcoal/80">
                        {product?.name ?? line.productId} · {colourName}
                        {styleLabel ? ` · ${styleLabel}` : ""}
                        <br />
                        <span className="text-charcoal/55">
                          {size?.label ?? line.sizeId} × {line.quantity}
                        </span>
                      </span>
                      <span className="font-semibold tabular-nums">
                        {formatGbp((size?.priceGbp ?? 0) * line.quantity)}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 flex items-end justify-between border-t border-stone/20 pt-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-charcoal/50">Total due</p>
                  <p className="font-display text-3xl font-bold tabular-nums text-charcoal">
                    {formatGbp(summary?.totalGbp ?? previewTotal)}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
