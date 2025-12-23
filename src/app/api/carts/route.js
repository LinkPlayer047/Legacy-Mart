import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Cart from "@/models/cart";
import { getUserFromToken } from "@/lib/auth";

export async function GET(req) {
  await connectDB();

  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const user = await getUserFromToken(token);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const cart = await Cart.findOne({ user: user._id }).populate("products.product");

  return NextResponse.json({ items: cart?.products || [] }, { status: 200 });
}
