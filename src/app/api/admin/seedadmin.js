import dbConnect from "@/lib/db";
import Admin from "@/models/admin";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  await dbConnect();
  const existing = await Admin.findOne({ email: "admin@example.com" });
  if (existing) return res.status(200).json({ message: "Admin already exists" });

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  const admin = await Admin.create({
    username: "Admin",
    email: "admin@example.com",
    password: hashedPassword
  });

  res.status(201).json({ message: "Admin created", admin });
}
