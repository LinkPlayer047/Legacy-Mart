import connectToDB from "@/lib/db";
import Category from "@/models/category";

// GET → all categories
export async function GET() {
  await connectToDB();

  const categories = await Category.find().sort({ name: 1 });

  return new Response(
    JSON.stringify({ categories }),
    { status: 200 }
  );
}

// POST → add new category
export async function POST(req) {
  await connectToDB();

  const { name } = await req.json();

  if (!name) {
    return new Response(
      JSON.stringify({ error: "Category name is required" }),
      { status: 400 }
    );
  }

  const exists = await Category.findOne({
    name: new RegExp(`^${name}$`, "i"),
  });

  if (exists) {
    return new Response(
      JSON.stringify({ error: "Category already exists" }),
      { status: 409 }
    );
  }

  const category = await Category.create({ name });

  return new Response(
    JSON.stringify({ category }),
    { status: 201 }
  );
}
