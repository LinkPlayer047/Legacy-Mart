import connectToDB from "@/lib/db";
import { Order } from "@/models/order";
import { getUserFromToken } from "@/lib/auth";
import { corsHeaders } from "@/lib/cors";

export async function GET(req) {
  try {
    await connectToDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    const admin = await getUserFromToken(token);

    if (!admin || admin.role !== "admin") {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    const orders = await Order.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify({ orders }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch orders" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

// OPTIONS handler for CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}
