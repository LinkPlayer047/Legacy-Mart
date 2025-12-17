import jwt from "jsonwebtoken";
import connectToDB from "@/lib/db";
import User from "@/models/user";

export async function getUserFromToken(token) {
  if (!token) return null;
  await connectToDB();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return await User.findById(decoded.id);
  } catch {
    return null;
  }
}
