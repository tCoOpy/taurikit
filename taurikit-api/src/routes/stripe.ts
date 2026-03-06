import { Hono } from "hono";
import Stripe from "stripe";
import { Resend } from "resend";
import type { Env } from "../types";

export const stripeRoutes = new Hono<{ Bindings: Env }>();

stripeRoutes.post("/checkout", async (c) => {
  const stripe = new Stripe(c.env.STRIPE_SECRET_KEY);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: c.env.STRIPE_PRICE_ID, quantity: 1 }],
    success_url: "https://taurikit.dev/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://taurikit.dev/#pricing",
    payment_intent_data: {
      metadata: { product: "taurikit" },
    },
  });

  return c.json({ url: session.url });
});

stripeRoutes.get("/session/:sessionId", async (c) => {
  const stripe = new Stripe(c.env.STRIPE_SECRET_KEY);
  const sessionId = c.req.param("sessionId");

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    return c.json({ error: "Payment not completed" }, 402);
  }

  const paymentId = session.payment_intent?.toString();
  if (!paymentId) {
    return c.json({ error: "No payment found" }, 404);
  }

  const license = await c.env.DB.prepare(
    "SELECT key, plan, created_at FROM licenses WHERE stripe_payment_id = ?"
  )
    .bind(paymentId)
    .first<{ key: string; plan: string; created_at: string }>();

  if (!license) {
    return c.json({ error: "License not yet provisioned" }, 404);
  }

  return c.json({ key: license.key, plan: license.plan });
});

stripeRoutes.post("/webhook", async (c) => {
  const stripe = new Stripe(c.env.STRIPE_SECRET_KEY);
  const signature = c.req.header("stripe-signature");

  if (!signature) {
    return c.json({ error: "Missing signature" }, 400);
  }

  const rawBody = await c.req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      c.env.STRIPE_WEBHOOK_SECRET
    );
  } catch {
    return c.json({ error: "Invalid signature" }, 400);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;

    if (!email) {
      return c.json({ error: "No email in session" }, 400);
    }

    const key = generateLicenseKey();

    await c.env.DB.prepare(
      `INSERT INTO licenses (id, email, key, plan, stripe_customer_id, stripe_payment_id)
       VALUES (?, ?, ?, 'standard', ?, ?)`
    )
      .bind(
        crypto.randomUUID(),
        email,
        key,
        session.customer?.toString() ?? null,
        session.payment_intent?.toString() ?? null
      )
      .run();

    const resend = new Resend(c.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "TauriKit <noreply@taurikit.dev>",
      to: email,
      subject: "Your TauriKit License Key",
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 24px; margin-bottom: 16px;">Welcome to TauriKit!</h1>
          <p style="color: #71717a; margin-bottom: 24px;">Your license key is ready. Use it with the CLI to generate projects.</p>
          <div style="background: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <p style="color: #a1a1aa; font-size: 12px; margin: 0 0 8px;">LICENSE KEY</p>
            <code style="color: #fb923c; font-size: 14px; word-break: break-all;">${key}</code>
          </div>
          <div style="background: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 20px;">
            <p style="color: #a1a1aa; font-size: 12px; margin: 0 0 12px;">QUICK START</p>
            <code style="display: block; color: #d4d4d8; font-size: 13px; line-height: 2;">$ curl -fsSL https://taurikit.dev/install.sh | sh<br>$ export TAURIKIT_LICENSE_KEY=${key}<br>$ taurikit new "My App"</code>
          </div>
          <p style="color: #52525b; font-size: 12px; margin-top: 24px;">If you have questions, reply to this email or contact support@taurikit.dev</p>
        </div>
      `,
    });
  }

  return c.json({ received: true });
});

function generateLicenseKey(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join(
    ""
  );
  return `TK-${chunk(hex, 8).join("-").toUpperCase()}`;
}

function chunk(str: string, size: number): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.slice(i, i + size));
  }
  return chunks;
}
