import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/order";
import { getUserFromToken } from "@/lib/auth";

export async function GET(req) {
  await connectDB();

  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const user = await getUserFromToken(token);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 });

  return NextResponse.json({ orders }, { status: 200 });
}
