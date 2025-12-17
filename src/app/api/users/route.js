import connectToDB from "@/lib/db";
import User from "@/models/user";
import { getUserFromToken } from "@/lib/auth";

export async function GET(req) {
  await connectToDB();

  const token = req.headers.get("authorization")?.split(" ")[1];
  const admin = await getUserFromToken(token);

  if (!admin || admin.role !== "admin") {
    return new Response("Unauthorized", { status: 401 });
  }

  const users = await User.find().select("-password -otp");
  return Response.json({ users });
}
