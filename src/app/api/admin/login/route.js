import dbConnect from "@/lib/db";
import Admin from "@/models/admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbConnect();
  const { email, password } = await req.json();

  const admin = await Admin.findOne({ email });
  if (!admin) return new Response(JSON.stringify({ message: "Admin not found" }), { status: 401 });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });

  const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
  return new Response(JSON.stringify({ token, admin: { username: admin.username, email: admin.email } }), { status: 200 });
}
