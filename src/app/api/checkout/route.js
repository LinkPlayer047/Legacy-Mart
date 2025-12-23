import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/order";
import Cart from "@/models/cart";
import { getUserFromToken } from "@/lib/auth";

export async function POST(req) {
  try {
    await connectDB();
    const { shipping, products, totalAmount } = await req.json();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user = await getUserFromToken(token);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    // Create order
    const order = await Order.create({
      user: user.id,
      products,
      shipping,
      totalAmount,
    });

    // Optional: clear cart after order
    await Cart.findOneAndUpdate({ user: user.id }, { products: [] });

    return NextResponse.json({ orderId: order._id }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
