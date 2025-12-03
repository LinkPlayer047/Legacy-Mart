import connectToDB from "@/lib/db";
import User from "@/models/user";
import { getUserFromToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function PUT(req) {
  try {
    await connectToDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token)
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });

    const currentUser = await getUserFromToken(token);
    if (!currentUser)
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
      });

    const { name, email, password } = await req.json();

    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      updateData,
      { new: true }
    ).select("-password");

    return new Response(JSON.stringify({ user: updatedUser }), {
      status: 200,
    });
  } catch (err) {
    console.error("UPDATE USER ERROR →", err);
    return new Response(JSON.stringify({ error: "Failed to update profile" }), {
      status: 500,
    });
  }
}
