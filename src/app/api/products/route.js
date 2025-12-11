import connectToDB from "@/lib/db";
import Product from "@/models/products";

const allowedOrigin = "https://legacy-mart-ap.vercel.app";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

// CORS preflight
export async function OPTIONS() {
  return new Response(null, { headers: corsHeaders() });
}

// GET all products
export async function GET() {
  try {
    await connectToDB();
    const products = await Product.find({});
    return new Response(JSON.stringify(products), { status: 200, headers: corsHeaders() });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders() });
  }
}

// POST add new product
export async function POST(req) {
  try {
    await connectToDB();
    const productData = await req.json();

    if (!productData.name || !productData.price) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400, headers: corsHeaders() });
    }

    const newProduct = await Product.create(productData);
    return new Response(JSON.stringify(newProduct), { status: 201, headers: corsHeaders() });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders() });
  }
}
