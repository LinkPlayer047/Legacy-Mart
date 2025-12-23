import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/order";
import { getUserFromToken } from "@/lib/auth";

export async function PATCH(req) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user = await getUserFromToken(token);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { orderId } = await req.json();
    const order = await Order.findById(orderId);

    if (!order) return NextResponse.json({ message: "Order not found" }, { status: 404 });
    if (order.user.toString() !== user._id.toString())
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

    if (order.paymentStatus === "paid")
      return NextResponse.json({ message: "Cannot cancel paid order" }, { status: 400 });

    order.orderStatus = "cancelled";
    await order.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("CANCEL ORDER ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
