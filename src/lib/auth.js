import jwt from "jsonwebtoken";
import User from "@/models/user";
import connectToDB from "@/lib/db";

export async function getUserFromToken(token) {
  if (!token) return null;

  await connectToDB();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    return user || null;
  } catch (err) {
    return null;
  }
}
