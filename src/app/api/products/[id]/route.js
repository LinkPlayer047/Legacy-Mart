import connectToDB from "@/lib/db";
import Product from "@/models/products";

const allowedOrigin = "https://legacy-mart-ap.vercel.app/"; // frontend ka URL

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

// GET single product
export async function GET(req, { params }) {
  try {
    await connectToDB();
    const product = await Product.findById(params.id);
    if (!product)
      return new Response(
        JSON.stringify({ error: "Product not found" }),
        { status: 404, headers: corsHeaders() }
      );
    return new Response(JSON.stringify(product), { status: 200, headers: corsHeaders() });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders() });
  }
}

// PUT / PATCH (edit product)
export async function PUT(req, { params }) {
  try {
    await connectToDB();
    const updateData = await req.json();
    const updatedProduct = await Product.findByIdAndUpdate(params.id, updateData, { new: true });
    if (!updatedProduct)
      return new Response(
        JSON.stringify({ error: "Product not found" }),
        { status: 404, headers: corsHeaders() }
      );
    return new Response(JSON.stringify(updatedProduct), { status: 200, headers: corsHeaders() });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders() });
  }
}

// DELETE product
export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const { id } = params; // ✅ Correct destructure

    console.log("DELETE request received for ID:", id);

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct)
      return new Response(
        JSON.stringify({ error: "Product not found" }),
        { status: 404, headers: corsHeaders() }
      );

    return new Response(
      JSON.stringify({ message: "Product deleted" }),
      { status: 200, headers: corsHeaders() }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders() });
  }
}
