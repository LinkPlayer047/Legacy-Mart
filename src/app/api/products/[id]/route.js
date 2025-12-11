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

// GET single product
export async function GET(req, { params }) {
  try {
    await connectToDB();
    const product = await Product.findById(params.id);
    if (!product)
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404, headers: corsHeaders() });
    return new Response(JSON.stringify(product), { status: 200, headers: corsHeaders() });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders() });
  }
}

// PUT / PATCH (edit product with image upload)
export async function PUT(req, { params }) {
  try {
    await connectToDB();
    const data = await req.formData();
    const file = data.get("image");

    let updateData = {
      name: data.get("name"),
      price: data.get("price"),
      description: data.get("description"),
    };

    if (file) {
      try {
        // Cloudinary upload
        const uploadedImage = await cloudinary.uploader.upload(file.path, { folder: "products" });
        updateData.imageUrl = uploadedImage.secure_url;
      } catch (err) {
        // Local fallback
        const uploadDir = path.join(process.cwd(), "public/upload");
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
        const fileName = Date.now() + "-" + file.name;
        const filePath = path.join(uploadDir, fileName);
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(filePath, buffer);
        updateData.imageUrl = `/upload/${fileName}`;
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(params.id, updateData, { new: true });
    if (!updatedProduct)
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404, headers: corsHeaders() });

    return new Response(JSON.stringify(updatedProduct), { status: 200, headers: corsHeaders() });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders() });
  }
}

// DELETE product
export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct)
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404, headers: corsHeaders() });

    return new Response(JSON.stringify({ message: "Product deleted" }), { status: 200, headers: corsHeaders() });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders() });
  }
}
