import connectToDB from "@/lib/db";
import User from "@/models/user";
import { getAdminFromToken } from "@/lib/adminauth";

export async function PATCH(req, { params }) {
  await connectToDB();

  const token = req.headers.get("authorization")?.split(" ")[1];
  const admin = getAdminFromToken(token);

  if (!admin) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { role, status } = await req.json();

  const user = await User.findByIdAndUpdate(
    params.id,
    { role, status },
    { new: true }
  ).select("-password -otp");

  return Response.json({ user });
}
