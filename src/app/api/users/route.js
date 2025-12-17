import connectToDB from "@/lib/db";
import User from "@/models/user";
import { getAdminFromToken } from "@/lib/adminauth";

export async function GET(req) {
  await connectToDB();

  const token = req.headers.get("authorization")?.split(" ")[1];
  const admin = getAdminFromToken(token);

  if (!admin) {
    return new Response("Unauthorized", { status: 401 });
  }

  const users = await User.find().select("-password -otp");
  return Response.json({ users });
}
