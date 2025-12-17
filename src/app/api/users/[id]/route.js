import connectToDB from "@/lib/db";
import User from "@/models/user";
import { getUserFromToken } from "@/lib/adminauth";
import { corsHeaders } from "@/lib/cors";

export async function PATCH(req, { params }) {
  if (req.method === "OPTIONS") {
  return new Response(null, { status: 204, headers: corsHeaders }); // status 204
}


  await connectToDB();

  const token = req.headers.get("authorization")?.split(" ")[1];
  const admin = await getUserFromToken(token);

  if (!admin || admin.role !== "admin") {
    return new Response("Unauthorized", { status: 401, headers: corsHeaders });
  }

  const { role, status } = await req.json();

  const user = await User.findByIdAndUpdate(
    params.id,
    { role, status },
    { new: true }
  ).select("-password -otp");

  return new Response(JSON.stringify({ user }), { headers: corsHeaders });
}
