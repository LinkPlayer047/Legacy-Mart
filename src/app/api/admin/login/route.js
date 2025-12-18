import dbConnect from "@/lib/db";
import Admin from "@/models/admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://legacy-mart-ap.vercel.app",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

export async function POST(req) {
  await dbConnect();
  const { email, password } = await req.json();

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return new Response(JSON.stringify({ message: "Admin not found" }), {
      status: 401,
      headers: {
        "Access-Control-Allow-Origin": "https://legacy-mart-ap.vercel.app",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return new Response(JSON.stringify({ message: "Invalid password" }), {
      status: 401,
      headers: {
        "Access-Control-Allow-Origin": "https://legacy-mart-ap.vercel.app",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.ADMIN_JWT_SECRET,
    { expiresIn: "1d" }
  );

  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "https://legacy-mart-ap.vercel.app",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
