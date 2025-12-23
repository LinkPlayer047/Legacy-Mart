import connectToDB from "@/lib/db";
import Order from "@/models/order";
import { getAdminFromToken } from "@/lib/adminauth";
import { corsHeaders } from "@/lib/cors";

// GET single order
export async function GET(req, { params }) {
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

    const order = await Order.findById(params.id)
      .populate("items.product")
      .populate("user"); 

    if (!order) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ order }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("ORDER FETCH ERROR:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch order" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

// PATCH – update order status or payment
export async function PATCH(req, { params }) {
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

    const { orderStatus, paymentStatus, paymentId } = await req.json();

    const order = await Order.findById(params.id);
    if (!order) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
        headers: corsHeaders,
      });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (paymentId) {
      order.paymentId = paymentId;
      order.paidAt = new Date();
    }

    await order.save();

    return new Response(JSON.stringify({ message: "Order updated", order }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("ORDER UPDATE ERROR:", err);
    return new Response(JSON.stringify({ error: "Failed to update order" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

// OPTIONS for CORS preflight
export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
