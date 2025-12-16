import { categories } from "@/lib/db"; 

export async function GET(req) {
  // Return all categories
  return new Response(JSON.stringify(categories), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  const body = await req.json();
  const { name } = body;

  if (!name) {
    return new Response(JSON.stringify({ error: "Name is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const newCategory = { id: Date.now(), name };
  categories.push(newCategory); // ya DB insert

  return new Response(JSON.stringify(newCategory), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
