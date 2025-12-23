import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/user";
import { getUserFromToken } from "@/lib/auth";

export async function GET(req) {
  await connectDB();
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const user = await getUserFromToken(token);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  return NextResponse.json(user, { status: 200 });
}

export async function PATCH(req) {
  await connectDB();
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const user = await getUserFromToken(token);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, phone, address, city } = body;

  user.name = name || user.name;
  user.phone = phone || user.phone;
  user.address = address || user.address;
  user.city = city || user.city;

  await user.save();

  return NextResponse.json(user, { status: 200 });
}
