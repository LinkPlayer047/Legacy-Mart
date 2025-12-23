import connectToDB from "@/lib/db";
import Order from "@/models/order";
import { getAdminFromToken } from "@/lib/adminauth";
import { corsHeaders } from "@/lib/cors";

export async function GET(req) {
  try {
    await connectToDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    const admin = await getAdminFromToken(token);

    if (!admin) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    const orders = await Order.find()
  .populate("user", "name email")
  .sort({ createdAt: -1 });


    return new Response(JSON.stringify({ orders }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("ADMIN ORDERS ERROR:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch orders" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}