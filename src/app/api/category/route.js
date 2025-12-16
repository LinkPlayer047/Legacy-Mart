export const runtime = "nodejs";

import connectToDB from "@/lib/db";
import Category from "@/models/category";
import { corsHeaders } from "@/lib/cors";

// Preflight
export async function OPTIONS() {
  return new Response(null, { headers: corsHeaders });
}

// GET all categories
export async function GET() {
  try {
    await connectToDB();
    const categories = await Category.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST new category
export async function POST(req) {
  try {
    await connectToDB();
    const { name } = await req.json();

    if (!name) {
      return new Response(
        JSON.stringify({ error: "Category name is required" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const category = await Category.create({
      name: name.trim(),
    });

    return new Response(JSON.stringify(category), {
      status: 201,
      headers: corsHeaders,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}
