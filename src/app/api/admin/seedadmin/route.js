import dbConnect from "@/lib/db";
import Admin from "@/models/admin";
import bcrypt from "bcryptjs";

export async function GET() {
  await dbConnect();

  const exists = await Admin.findOne({ email: "admin@example.com" });
  if (exists) {
    return new Response("Admin already exists");
  }

  const hashed = await bcrypt.hash("Admin@123", 10);

  await Admin.create({
    email: "admin@example.com",
    password: hashed,
    role: "admin",
  });

  return new Response("Admin Created Successfully!");
}
