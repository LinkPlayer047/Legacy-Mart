import connectToDB from "@/lib/db";
import User from "@/models/user";
import { getAdminFromToken } from "@/lib/adminauth";
import { corsHeaders } from "@/lib/cors";

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET(req) {
  await connectToDB();

  const token = req.headers.get("authorization")?.split(" ")[1];
  const admin = await getAdminFromToken(token);

  if (!admin) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401, headers: corsHeaders }
    );
  }

  const users = await User.find().select("-password -otp");

  return new Response(
    JSON.stringify({ users }),
    { status: 200, headers: corsHeaders }
  );
}
