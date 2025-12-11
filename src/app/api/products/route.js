import connectToDB from "@/lib/db";
import Product from "@/models/products";
import cloudinary from "@/lib/cloudinary";
import fs from "fs";
import path from "path";

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

// POST add new product (Cloudinary + local fallback)
export async function POST(req) {
  try {
    await connectToDB();
    const data = await req.formData();
    const file = data.get("image");

    let imageUrl = "";

    if (file) {
      try {
        // Cloudinary upload
        const uploadedImage = await cloudinary.uploader.upload(file.path, { folder: "products" });
        imageUrl = uploadedImage.secure_url;
      } catch (err) {
        // Local fallback if Cloudinary fails
        const uploadDir = path.join(process.cwd(), "public/upload");
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
        const fileName = Date.now() + "-" + file.name;
        const filePath = path.join(uploadDir, fileName);
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(filePath, buffer);
        imageUrl = `/upload/${fileName}`;
      }
    }

    const productData = {
      name: data.get("name"),
      price: data.get("price"),
      description: data.get("description"),
      imageUrl,
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
