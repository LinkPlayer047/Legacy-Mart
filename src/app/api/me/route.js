import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";

export async function GET(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserFromToken(token);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    name: user.name,
    email: user.email,
    role: user.role,
  });
}
