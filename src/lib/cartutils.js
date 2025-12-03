import Cart from "@/models/cart";
import connectToDB from "./db";
import { getUserFromToken } from "./auth";

export async function getCartItemsForUser(token) {
  const user = await getUserFromToken(token);
  if (!user) return [];

  await connectToDB();

  const cart = await Cart.findOne({ userId: user._id });

  return cart?.items || [];
}
