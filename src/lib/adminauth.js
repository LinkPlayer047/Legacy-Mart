import jwt from "jsonwebtoken";
import connectToDB from "@/lib/db";
import Admin from "@/models/admin";

export async function getAdminFromToken(token) {
  if (!token) return null;

  await connectToDB();

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    return await Admin.findById(decoded.id);
  } catch {
    return null;
  }
}
