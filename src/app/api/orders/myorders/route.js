import connectToDB from "@/lib/db";
import { Order } from "@/models/order";
import { getUserFromToken } from "@/lib/adminauth";
import { corsHeaders } from "@/lib/cors";

export async function GET(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    await connectToDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token)
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: corsHeaders,
      });

    const user = await getUserFromToken(token);
    if (!user)
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: corsHeaders,
      });

    const orders = await Order.find({ userId: user._id }).sort({
      createdAt: -1,
    });

    return new Response(JSON.stringify({ orders }), { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error("ORDERS ERROR →", err);
    return new Response(JSON.stringify({ error: "Failed to fetch orders" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}
