import connectToDB from "@/lib/db";
import Product from "@/models/products";
import cloudinary from "@/lib/cloudinary";

const allowedOrigin = "https://legacy-mart-ap.vercel.app";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

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

// POST add new product with image upload
export async function POST(req) {
  try {
    await connectToDB();
    const data = await req.formData(); // Expect FormData
    const file = data.get("image");

    let imageUrl = "";
    if (file) {
      const uploadedImage = await cloudinary.uploader.upload(file.path, { folder: "products" });
      imageUrl = uploadedImage.secure_url;
    }

    const productData = {
      name: data.get("name"),
      price: data.get("price"),
      description: data.get("description"),
      imageUrl,
      // add other fields if needed
    };

    if (!productData.name || !productData.price) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400, headers: corsHeaders() });
    }

    const newProduct = await Product.create(productData);
    return new Response(JSON.stringify(newProduct), { status: 201, headers: corsHeaders() });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders() });
  }
}
