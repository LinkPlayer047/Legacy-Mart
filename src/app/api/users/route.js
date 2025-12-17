import connectToDB from "@/lib/db";
import User from "@/models/user";
import { getUserFromToken } from "@/lib/adminauth";
import { corsHeaders } from "@/lib/cors";

export async function GET(req) {
  if (req.method === "OPTIONS") {
  return new Response(null, { status: 204, headers: corsHeaders });
}


  await connectToDB();

  const token = req.headers.get("authorization")?.split(" ")[1];
  const admin = await getUserFromToken(token);

  if (!admin || admin.role !== "admin") {
    return new Response("Unauthorized", { status: 401, headers: corsHeaders });
  }

  const users = await User.find().select("-password -otp");
  return new Response(JSON.stringify({ users }), { headers: corsHeaders });
}
