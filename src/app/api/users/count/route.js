import connectToDB from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const totalUsers = await User.countDocuments();
    return NextResponse.json({ totalUsers });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch user count" }, { status: 500 });
  }
}
