import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectToDB from "@/lib/db";
import Order from "@/models/order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  await connectToDB();

  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    const rawBody = await req.text();

    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  // ✅ PAYMENT SUCCESS
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const orderId = session.metadata.orderId;
    const paymentIntentId = session.payment_intent;

    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return new NextResponse("Order not found", { status: 404 });
      }

      order.paymentStatus = "paid";
      order.paymentId = paymentIntentId;
      order.paidAt = new Date();

      await order.save();
    } catch (err) {
      console.error("Order update failed:", err);
      return new NextResponse("DB error", { status: 500 });
    }
  }

  return new NextResponse("Webhook received", { status: 200 });
}
