import Wishlist from "@/models/wishlist";
import connectToDB from "./db";
import { getUserFromToken } from "./auth";

export async function getWishlistForUser(token) {
  const user = await getUserFromToken(token);
  if (!user) return [];

  await connectToDB();

  const wishlist = await Wishlist.findOne({ userId: user._id });

  return wishlist?.items || [];
}
