import connectToDB from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectToDB();
    const { email, otp } = await request.json();

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (user.otp.toString() !== otp.toString()) {
      return NextResponse.json({ error: "OTP verification failed" }, { status: 400 });
    }

    user.verified = true;
    user.otp = null;
    await user.save();

    return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
