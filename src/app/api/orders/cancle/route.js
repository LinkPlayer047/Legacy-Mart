import connectToDB from "@/lib/db";
import { Order } from "@/models/order";
import { getUserFromToken } from "@/lib/auth";

export async function PATCH(req) {
  try {
    await connectToDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    const user = await getUserFromToken(token);

    if (!user)
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });

    const { orderId } = await req.json();

    const order = await Order.findOneAndUpdate(
      { _id: orderId, userId: user._id },
      { status: "cancelled" },
      { new: true }
    );

    return new Response(JSON.stringify({ order }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Cancel failed" }), {
      status: 500,
    });
  }
}
