import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectToDB from "@/lib/db";
import Order from "@/models/order";
import { getUserFromToken } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    await connectToDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    const user = await getUserFromToken(token);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { orderId } = await req.json();

    const order = await Order.findById(orderId);
    if (!order || order.user.toString() !== user._id.toString()) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    if (order.paymentStatus === "paid") {
      return NextResponse.json({ message: "Already paid" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: order.customer.email,
      line_items: [
        {
          price_data: {
            currency: "pkr",
            product_data: {
              name: `Order ${order.orderNumber}`,
            },
            unit_amount: order.totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        orderId: order._id.toString(),
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?orderId=${order._id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("STRIPE ERROR:", err);
    return NextResponse.json({ message: "Stripe error" }, { status: 500 });
  }
}
