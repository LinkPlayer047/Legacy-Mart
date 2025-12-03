import { getWishlistForUser } from "@/lib/wishlistutils"; // example helper

export async function GET(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  try {
    const items = await getWishlistForUser(token);
    return new Response(JSON.stringify({ items }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch wishlist" }), { status: 500 });
  }
}
