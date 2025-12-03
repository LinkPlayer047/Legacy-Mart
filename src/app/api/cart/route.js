import { getCartItemsForUser } from "@/lib/cartutils"; // example helper

export async function GET(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  try {
    const cartItems = await getCartItemsForUser(token);
    return new Response(JSON.stringify({ items: cartItems }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch cart" }), { status: 500 });
  }
}
