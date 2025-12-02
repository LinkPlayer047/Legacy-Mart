import connectToDB from "@/lib/db";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "pending" });
    const completedOrders = await Order.countDocuments({ status: "completed" });
    const revenueData = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } }
    ]);

    return NextResponse.json({
      totalOrders,
      pendingOrders,
      completedOrders,
      revenue: revenueData[0]?.totalRevenue || 0
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
