import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug, hasPrice, parsePrice } from "@/lib/products";
import type { CartItem } from "@/lib/types";

type StripeCheckoutResponse = {
  error?: { message?: string };
  url?: string;
};

export async function POST(request: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: "Stripe Checkout is ready, but STRIPE_SECRET_KEY has not been configured yet." },
      { status: 503 }
    );
  }

  let payload: { items?: CartItem[] };
  try {
    payload = (await request.json()) as { items?: CartItem[] };
  } catch {
    return NextResponse.json({ error: "Invalid checkout request." }, { status: 400 });
  }

  if (!Array.isArray(payload.items) || !payload.items.length) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const quantities = new Map<string, number>();
  payload.items.forEach((item) => {
    if (!item || typeof item.slug !== "string") return;
    quantities.set(item.slug, 1);
  });

  const lineItems = Array.from(quantities, ([slug, quantity]) => ({
    product: getProductBySlug(slug),
    quantity
  })).filter((entry) => entry.product && hasPrice(entry.product));

  if (!lineItems.length || lineItems.length !== quantities.size) {
    return NextResponse.json(
      { error: "One or more products are unavailable for online checkout." },
      { status: 400 }
    );
  }

  const origin = new URL(request.url).origin;
  const form = new URLSearchParams({
    mode: "payment",
    success_url: `${origin}/cart?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart?checkout=cancelled`,
    billing_address_collection: "required",
    customer_creation: "always"
  });

  lineItems.forEach(({ product, quantity }, index) => {
    if (!product) return;
    form.set(`line_items[${index}][quantity]`, String(quantity));
    form.set(`line_items[${index}][price_data][currency]`, "aud");
    form.set(
      `line_items[${index}][price_data][unit_amount]`,
      String(Math.round(parsePrice(product) * 100))
    );
    form.set(`line_items[${index}][price_data][product_data][name]`, product.name);
    form.set(`line_items[${index}][price_data][product_data][metadata][sku]`, product.sku || "N/A");
  });

  let stripeResponse: Response;
  try {
    stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: form.toString(),
      cache: "no-store"
    });
  } catch {
    return NextResponse.json(
      { error: "Stripe is temporarily unavailable. Please try again." },
      { status: 502 }
    );
  }
  const stripeResult = (await stripeResponse.json()) as StripeCheckoutResponse;

  if (!stripeResponse.ok || !stripeResult.url) {
    return NextResponse.json(
      { error: stripeResult.error?.message || "Stripe Checkout could not be created." },
      { status: 502 }
    );
  }

  return NextResponse.json({ url: stripeResult.url });
}
