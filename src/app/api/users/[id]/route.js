import connectToDB from "@/lib/db";
import User from "@/models/user";
import { getAdminFromToken } from "@/lib/adminauth";
import { corsHeaders } from "@/lib/cors";

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function PATCH(req, { params }) {
  await connectToDB();

  const token = req.headers.get("authorization")?.split(" ")[1];
  const admin = await getAdminFromToken(token);

  if (!admin) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401, headers: corsHeaders }
    );
  }

  const { role, status } = await req.json();

  const user = await User.findByIdAndUpdate(
    params.id,
    { role, status },
    { new: true }
  ).select("-password -otp");

  return new Response(
    JSON.stringify({ user }),
    { status: 200, headers: corsHeaders }
  );
}
