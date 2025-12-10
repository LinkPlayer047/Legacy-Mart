import dbConnect from "@/lib/db";
import Admin from "@/models/admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.status(200).json({ token, admin: { username: admin.username, email: admin.email } });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
