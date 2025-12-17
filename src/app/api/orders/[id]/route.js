import connectToDB from "@/lib/db";
import { Order } from "@/models/order";
import { getUserFromToken } from "@/lib/auth";

export async function PATCH(req, { params }) {
  try {
    await connectToDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    const admin = await getUserFromToken(token);

    if (!admin || admin.role !== "admin") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const { status } = await req.json();

    const order = await Order.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    return new Response(JSON.stringify({ order }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Update failed" }), {
      status: 500,
    });
  }
}
