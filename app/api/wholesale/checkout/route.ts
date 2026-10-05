import { NextResponse } from "next/server";
import Stripe from "stripe";
import { validateWholesaleCart, type WholesaleCartLine } from "@/lib/wholesaleCart";

export const runtime = "nodejs";

type Body = {
  lines?: WholesaleCartLine[];
  email?: string;
  businessName?: string;
  phone?: string;
};

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      {
        error:
          "Card payments are not configured yet. Add STRIPE_SECRET_KEY (and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) to .env.local.",
      },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const validated = validateWholesaleCart(body.lines ?? []);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const { cart } = validated;
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const businessName = typeof body.businessName === "string" ? body.businessName.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required for the receipt." }, { status: 400 });
  }
  if (!businessName || businessName.length < 2) {
    return NextResponse.json({ error: "Business / shop name is required." }, { status: 400 });
  }

  const stripe = new Stripe(secret);
  const description = cart.lines
    .map((l) => `${l.productName} ${l.sizeLabel}×${l.quantity}`)
    .join("; ")
    .slice(0, 900);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: cart.totalPence,
      currency: "gbp",
      automatic_payment_methods: { enabled: true },
      receipt_email: email,
      description: `Wholesale · ${businessName} · ${description}`,
      metadata: {
        channel: "wholesale",
        businessName,
        phone,
        email,
        itemCount: String(cart.itemCount),
        lines: JSON.stringify(
          cart.lines.map((l) => ({
            productId: l.productId,
            sizeId: l.sizeId,
            colourFile: l.colourFile,
            styleId: l.styleId ?? "",
            qty: l.quantity,
          })),
        ).slice(0, 450),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      summary: cart,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not create payment.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
