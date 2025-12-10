import dbConnect from "@/lib/db";
import Admin from "@/models/admin";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await dbConnect();

    let exists = await Admin.findOne({ email: "admin@example.com" });
    if (exists) {
      return Response.json({ message: "Admin already exists" }, { status: 200 });
    }

    const hashed = await bcrypt.hash("Admin@123", 10);

    await Admin.create({
      username: "SuperAdmin",
      email: "admin@example.com",
      password: hashed,
      role: "admin",
    });

    return Response.json(
      { message: "Admin Created Successfully!" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
