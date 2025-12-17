import connectToDB from "@/lib/db";
import User from "@/models/user"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectToDB();

    const { email, password } = await request.json();

    console.log("Login attempt:", email);

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET not defined in .env.local");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
  {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role // ✅ ADD THIS
  },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);


    return NextResponse.json({
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
